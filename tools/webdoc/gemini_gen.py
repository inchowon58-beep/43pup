# -*- coding: utf-8 -*-
"""Gemini API로 SeoPage JSON 생성 — 웹문서생성기 전용."""

from __future__ import annotations

import json
import re
import time
from typing import Any, Callable, Dict, List, Optional, Tuple

from google import genai

from nearby_geo import extract_region, extract_theme, nearby_areas, nearby_keyword_csv, nearby_stations

BRAND = "국제웨딩컨설팅"
FARM = "국제결혼정보"
SITE_NAME = "국제웨딩컨설팅"
KAKAO = "https://open.kakao.com/o/sxelLqJi"
LOCATION = "대한민국 전국"

GEMINI_MODELS: List[Dict[str, str]] = [
    {"id": "gemini-3.5-flash-lite", "label": "gemini-3.5-flash-lite · 대량 발행/초저비용"},
    {"id": "gemini-3.6-flash", "label": "gemini-3.6-flash · 속도·문장 균형 주력"},
    {"id": "gemini-3.7-flash", "label": "gemini-3.7-flash · 최신 고성능 Flash"},
    {"id": "gemini-3.1-pro", "label": "gemini-3.1-pro · 고품질 장문·추론"},
]

DEFAULT_MODEL = "gemini-3.5-flash-lite"

DEFAULT_USER_PROMPT = """톤: 현실적이고 안내형. 사실(주의 신호·확인 항목)은 분명히.
이 문서는 여러 곳에 임대되는 정보 사이트에 실리므로 특정 국제결혼업체 홍보·실명 비방 금지.
키워드에 지역명이 있으면 그 지역에서 업체를 고르기 전 독자 시점으로 쓰세요.
포지션: 한 업체를 노출하지 않음. 믿을 수 있는 업체 정보의 기준, 피해야 할 곳(선금·계약 없음·오늘만 할인).
전화번호 넣지 마세요. 상담은 카카오톡만.
{keyword}를 제목·H1·본문·FAQ에 자연스럽게 넣으세요.
"""

SYSTEM_SEO_RULES = f"""당신은 국제결혼 정보를 안내하는 작가입니다.
이 문서는 여러 곳에 임대되므로 특정 업체 홍보로 쓰지 마세요.
업체명 '{BRAND}'는 남용하지 마세요. 한 상호를 추천하지 마세요.

상담: 카카오톡 오픈채팅 ({KAKAO})
다룰 정보: 피해야 할 업체 공통점, 믿을 수 있는 업체 정보의 기준, 확인 순서, 한 줄 견적을 쪼개는 질문
범위: {LOCATION}

[SEO]
- title 50~60자. 메인 키워드를 앞에 두고 주의·업체 정보 중 하나를 포함. 브랜드명 남용 금지.
- metaDescription 140~160자. 키워드 + 국제결혼정보 + 주의사항. 카카오톡은 한 번만. 광고 문장 금지.
- metaKeywords 8~12개, 쉼표 구분. 키워드·국제결혼·국제결혼정보·국제결혼업체 포함.
- h1에 메인 키워드 포함. title과 완전히 같지 않게.
- 본문 3개 섹션. 각 h2는 서로 다른 각도(업체를 보기 전/피해야 할 곳/믿을 정보 기준).
- 각 문단 140자 이상. 키워드 과다반복 금지. 자연 반복만.

[OG]
- og:title = title, og:description = metaDescription 로 쓸 수 있게 완결된 문장.
- heroSubtitle는 한글 한 문장. 한 업체 홍보 아님 + 확인 항목.

[AEO]
- FAQ 4개. 실제 검색 질문형(특정 업체 소개 여부, 피해야 할 곳, 비용, 상담 등).
- 답변은 80자 이상, 한 질문에 한 주제. 첫 문장에서 바로 답. 가격 단정 금지.

[금지]
- 가격 단정, 특정 업체 실명 비방, 허위 후기.
- 전화번호·0505 등 연락처 숫자.
- JSON 이외 설명·마크다운 금지.

아래 JSON 스키마만 출력하세요.
{{
  "title": "문자열",
  "metaDescription": "문자열",
  "metaKeywords": "쉼표 구분 문자열",
  "h1": "문자열",
  "heroSubtitle": "문자열",
  "sections": [
    {{"h2": "소제목1", "paragraphs": ["문단","문단","문단"]}},
    {{"h2": "소제목2", "paragraphs": ["문단","문단","문단"]}},
    {{"h2": "소제목3", "paragraphs": ["문단","문단"]}}
  ],
  "faqs": [
    {{"q": "질문1", "a": "답변"}},
    {{"q": "질문2", "a": "답변"}},
    {{"q": "질문3", "a": "답변"}},
    {{"q": "질문4", "a": "답변"}}
  ],
  "ctaText": "카카오톡 오픈채팅 상담 안내 문장"
}}
"""


def default_user_prompt() -> str:
    return DEFAULT_USER_PROMPT.strip() + "\n"


def model_choices() -> List[Dict[str, str]]:
    return list(GEMINI_MODELS)


def _extract_json(text: str) -> Dict[str, Any]:
    raw = (text or "").strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)```", raw)
    if fence:
        raw = fence.group(1).strip()
    start = raw.find("{")
    end = raw.rfind("}")
    if start < 0 or end <= start:
        raise ValueError("제미나이 응답에서 JSON을 찾지 못했습니다.")
    return json.loads(raw[start : end + 1])


class GeminiRateLimitError(RuntimeError):
    """429 / quota 초과 — 잠시 후 재시도."""


def generate_gemini_json(
    keyword: str,
    api_key: str,
    model: str = DEFAULT_MODEL,
    user_prompt: str = "",
    timeout: int = 90,
) -> Dict[str, Any]:
    key = (api_key or "").strip()
    if not key:
        raise ValueError("제미나이 API 키가 없습니다.")
    kw = (keyword or "").strip() or "국제결혼정보"
    extra = (user_prompt or "").replace("{keyword}", kw).strip()
    user_text = f"메인 키워드: {kw}\n"
    if extra:
        user_text += "\n[추가 작성 지시]\n" + extra + "\n"
    user_text += "\n위 규칙과 스키마에 맞는 JSON만 출력하세요."
    mid = (model or "").strip() or DEFAULT_MODEL

    client = genai.Client(api_key=key)
    try:
        response = client.models.generate_content(
            model=mid,
            contents=user_text,
            config={
                "system_instruction": SYSTEM_SEO_RULES,
                "response_mime_type": "application/json",
                "max_output_tokens": 8192,
            },
        )
    except Exception as exc:
        raw = str(exc)
        if "429" in raw or "RESOURCE_EXHAUSTED" in raw or "quota" in raw.lower():
            raise GeminiRateLimitError(raw) from exc
        raise

    text = getattr(response, "text", None) or ""
    if not str(text).strip():
        raise RuntimeError("제미나이 본문이 비었습니다.")
    return _extract_json(str(text))


def test_gemini_key(api_key: str, model: str = DEFAULT_MODEL) -> Tuple[bool, str]:
    key = (api_key or "").strip()
    if not key:
        return False, "API 키가 비어 있습니다. 제미나이 탭에 키를 붙여 넣은 뒤 다시 테스트하세요."
    mid = (model or "").strip() or DEFAULT_MODEL
    try:
        client = genai.Client(api_key=key)
        client.models.generate_content(
            model=mid,
            contents="Reply with the single word OK.",
            config={"max_output_tokens": 16},
        )
        return True, f"연결 성공 · 모델 {mid}"
    except Exception as exc:
        return False, str(exc)


def assemble_from_gemini(
    keyword: str,
    data: Dict[str, Any],
    *,
    slugify_fn: Callable[..., str],
    image_urls_fn: Callable[[int, int], List[str]],
    idx: int,
) -> Dict[str, Any]:
    from datetime import datetime

    kw = (keyword or "").strip() or "국제결혼정보"
    region = extract_region(kw)
    theme = extract_theme(kw)
    areas = nearby_areas(region)
    stations = nearby_stations(region)
    geo_kw = nearby_keyword_csv(kw)

    title = str(data.get("title") or f"{kw} | 주의할 업체와 확인 항목")[:80]
    meta_desc = str(data.get("metaDescription") or "")
    if not meta_desc:
        meta_desc = (
            f"{kw} 안내 — 한 업체를 홍보하지 않습니다. 확인할 항목을 보고 카카오톡으로 상담하세요."
        )
    if areas or stations:
        near_bits = " · ".join((areas[:3] + stations[:3])[:4])
        if near_bits not in meta_desc:
            meta_desc = f"{meta_desc} 근방·인근({near_bits}) {theme} 검색 안내."
    meta_kw = str(data.get("metaKeywords") or "")
    if geo_kw and geo_kw not in meta_kw:
        meta_kw = f"{meta_kw}, {geo_kw}" if meta_kw else geo_kw

    sections = []
    for sec in data.get("sections") or []:
        if not isinstance(sec, dict):
            continue
        h2 = str(sec.get("h2") or "").strip()
        paras = [str(p).strip() for p in (sec.get("paragraphs") or []) if str(p).strip()]
        if h2 and paras:
            sections.append({"h2": h2, "paragraphs": paras})
    faqs = []
    for f in data.get("faqs") or []:
        if not isinstance(f, dict):
            continue
        q, a = str(f.get("q") or "").strip(), str(f.get("a") or "").strip()
        if q and a:
            faqs.append({"q": q, "a": a})

    now = datetime.utcnow().isoformat() + "Z"
    seed = abs(hash(f"{kw}|{idx}|gemini")) % 99999 + 1
    return {
        "slug": slugify_fn(kw, idx),
        "keyword": kw,
        "title": title,
        "metaDescription": meta_desc[:180],
        "metaKeywords": meta_kw,
        "h1": str(data.get("h1") or f"{kw}, 업체를 고르기 전에"),
        "heroSubtitle": str(data.get("heroSubtitle") or "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요"),
        "heroBadge": str(data.get("heroBadge") or "정보 안내"),
        "heroTitleLine1": kw,
        "heroTitleLine2": str(data.get("heroTitleLine2") or "국제웨딩컨설팅"),
        "heroBar": str(data.get("heroBar") or "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요."),
        "sections": sections,
        "faqs": faqs,
        "images": image_urls_fn(3, seed),
        "ctaText": str(data.get("ctaText") or f"{kw} 정보 상담 — 지역·희망 국가만 알려 주세요"),
        "nearbyAreas": areas,
        "nearbyStations": stations,
        "regionLabel": region or "",
        "keywordTheme": theme,
        "generatedBy": "gemini",
        "geminiModel": "",
        "createdAt": now,
        "updatedAt": now,
    }


def build_gemini_page(
    keyword: str,
    idx: int,
    *,
    api_key: str,
    model: str,
    user_prompt: str,
    slugify_fn: Callable[..., str],
    image_urls_fn: Callable[[int, int], List[str]],
    retries: int = 3,
    on_log: Optional[Callable[[str], None]] = None,
) -> Dict[str, Any]:
    last_err: Optional[Exception] = None
    for attempt in range(1, max(1, retries) + 1):
        try:
            data = generate_gemini_json(keyword, api_key, model=model, user_prompt=user_prompt)
            page = assemble_from_gemini(
                keyword, data, slugify_fn=slugify_fn, image_urls_fn=image_urls_fn, idx=idx
            )
            page["geminiModel"] = model
            if not page["sections"] or not page["faqs"]:
                raise ValueError("섹션 또는 FAQ가 비었습니다.")
            return page
        except GeminiRateLimitError as exc:
            last_err = exc
            wait = min(45.0, 8.0 * attempt)
            if on_log:
                on_log(f"제미나이 한도 — {wait:.0f}초 대기 후 재시도 ({keyword} · {attempt}/{retries})")
            time.sleep(wait)
        except Exception as exc:
            last_err = exc
            if on_log:
                on_log(f"제미나이 실패 ({keyword} · {attempt}/{retries}): {exc}")
            if attempt < retries:
                time.sleep(1.6 * attempt)
    raise RuntimeError(str(last_err) if last_err else "제미나이 생성 실패")
