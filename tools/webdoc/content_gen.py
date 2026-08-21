# -*- coding: utf-8 -*-
"""문서 본문 생성 (템플릿) — 국제결혼정보센터.
키워드 전달 시 SeoPage 스키마(title/meta/OG/FAQ/hero)로
국제결혼정보 상세 페이지를 생성합니다. 이미지는 3장.
"""

from __future__ import annotations

import hashlib
import json
import os
import random
import string
import time
from datetime import datetime
from typing import Any, Dict, List
from urllib.parse import quote

from nearby_geo import extract_region, extract_theme, nearby_areas, nearby_html_blocks, nearby_keyword_csv, nearby_stations
from gemini_gen import DEFAULT_MODEL, build_gemini_page

BRAND = "국제결혼정보센터"
FARM = "국제결혼정보"
SITE_NAME = "국제결혼정보센터"
KAKAO = "https://open.kakao.com/o/sxelLqJi"
LOCATION = "대한민국 전국"
IMAGE_BASE = "https://image.cattery.co.kr/weding"
IMAGE_COUNT = 10
IMAGE_USE = 3  # 히어로 1 + 본문 2


def _rng(keyword: str, idx: int) -> random.Random:
    seed = int(hashlib.md5(f"{keyword}|{idx}|infowedding".encode()).hexdigest()[:8], 16)
    return random.Random(seed)


def image_urls(count: int, seed: int) -> List[str]:
    rng = random.Random(seed)
    pool = [f"{IMAGE_BASE}/{i:02d}.webp" for i in range(1, IMAGE_COUNT + 1)]
    rng.shuffle(pool)
    return pool[:count]


def slugify(keyword: str, idx: int) -> str:
    base = "".join(
        c if c.isalnum() or c in "-_" else "-" for c in keyword.lower().replace(" ", "-")
    )
    base = base.strip("-")[:36] or "wedding"
    tail = f"{idx:02d}{''.join(random.choices(string.ascii_lowercase + string.digits, k=4))}"
    return f"{base}-{tail}"


def _page_to_summary(page: Dict[str, Any]) -> Dict[str, str]:
    return {
        "slug": page["slug"],
        "keyword": page.get("keyword") or "",
        "title": page.get("title") or page.get("h1") or page["slug"],
        "metaDescription": page.get("metaDescription") or "",
        "h1": page.get("h1") or page.get("title") or page["slug"],
        "createdAt": page.get("createdAt") or "",
        "updatedAt": page.get("updatedAt") or page.get("createdAt") or "",
    }


def build_content(keyword: str, idx: int) -> Dict[str, Any]:
    rng = _rng(keyword, idx)
    kw = keyword.strip() or "국제결혼정보"
    heroes = [
        "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요",
        "선금·계약·신원 확인이 빠지면 보류하세요",
        "믿을 수 있는 업체 정보의 기준을 안내합니다",
        "지역만 알려 주셔도 확인 목록을 드립니다",
    ]
    line2_opts = [
        "주의사항 안내",
        "업체 정보 기준",
        "확인 목록",
        "정보 상담",
    ]
    bar_opts = [
        "한 업체를 팔지 않습니다. 확인할 항목을 먼저 보세요",
        "오늘만 할인·계약 없는 선금은 보류 신호입니다",
        "비용이 한 줄이면 항목을 쪼개 물어보세요",
        "카카오톡으로 이어 가는 정보 상담",
    ]
    intro_h2 = [
        f"{kw}, 업체를 보기 전에",
        f"피해야 할 곳부터 정리하는 {kw}",
        f"{kw}에서 믿을 수 있는 업체 정보",
        f"{kw}, 예비고객이 먼저 겪는 문제",
    ]

    title = f"{kw} | 주의할 업체와 확인 항목"
    if len(title) > 60:
        title = f"{kw} | 국제결혼정보"
    region = extract_region(kw)
    theme = extract_theme(kw)
    areas = nearby_areas(region)
    stations = nearby_stations(region)
    meta_desc = (
        f"{kw}에서 어떤 업체를 주의해야 하는지, 믿을 수 있는 업체 정보는 어떻게 보는지 정리합니다. "
        f"한 업체를 홍보하지 않습니다."
    )
    if areas or stations:
        near_bits = " · ".join((areas[:3] + stations[:3])[:4])
        meta_desc = f"{meta_desc} 근방·인근({near_bits}) {theme} 검색 안내."
    if len(meta_desc) > 160:
        meta_desc = meta_desc[:157] + "..."

    variants = ["차분히", "항목별로", "천천히"]
    tone = variants[idx % len(variants)]
    h2_0 = intro_h2[idx % len(intro_h2)]

    sections = [
        {
            "h2": h2_0,
            "paragraphs": [
                f"{kw}를 검색하셨다면, 가장 먼저 확인할 것은 한 업체의 광고가 아니라 피해야 할 공통점입니다. "
                f"국제결혼정보센터는 특정 업체를 전면에 노출하지 않고, {tone} 확인할 항목을 안내합니다.",
                f"선금만 요구하거나 계약이 없거나 ‘오늘만 할인’을 반복하는 곳은 보류하세요. "
                f"안내 사진은 메인 갤러리에서도 이어서 보실 수 있습니다.",
                f"상담에 필요한 정보는 단순합니다. 거주 지역, 희망 국가입니다. "
                f"카카오톡 오픈채팅으로 상담해 주세요.",
            ],
        },
        {
            "h2": f"{kw}에서 믿을 수 있는 업체 정보의 기준",
            "paragraphs": [
                f"국제결혼 비용은 국가, 프로그램, 포함 범위에 따라 달라집니다. "
                f"한 줄 견적만 있으면 항공·숙박·통역·서류를 따로 물어보세요. 단가를 단정하지 않습니다.",
                f"상담 범위는 {LOCATION}입니다. 확인할 항목과 피해야 할 유형을 함께 정리할 수 있습니다.",
                f"{kw}로 찾아오신 분이라면, 주의사항을 본 뒤 카카오톡 상담을 권합니다.",
            ],
        },
        {
            "h2": f"{kw} FAQ와 다음 단계",
            "paragraphs": [
                f"{kw} 상담은 홈페이지 문의 또는 카카오톡 오픈채팅으로 가능합니다. "
                f"지역과 희망 조건만 알려 주셔도 됩니다.",
                f"사진을 더 보고 싶으시면 메인 갤러리로 이동해 주세요. 확인할 항목이 있으면 바로 물어보시면 됩니다.",
            ],
        },
    ]
    faqs = [
        {
            "q": f"{kw} 상담은 어떻게 하나요?",
            "a": "카카오톡 오픈채팅 또는 사이트 하단 문의로 접수합니다. "
            "지역·희망 국가만 알려 주시면 확인 목록을 안내받을 수 있습니다.",
        },
        {
            "q": "여기는 특정 업체를 소개하나요?",
            "a": "아닙니다. 한 국제결혼업체를 전면에 노출하지 않습니다. "
            "주의 신호와 믿을 수 있는 업체 정보의 기준을 안내합니다.",
        },
        {
            "q": f"{kw} 전국에서 이용할 수 있나요?",
            "a": "전국 상담이 가능합니다. 방문이 어려우면 카카오톡으로 확인 항목을 받아 보실 수 있습니다.",
        },
        {
            "q": "어떤 업체를 피해야 하나요?",
            "a": "계약 없이 선금만 요구하거나, 오늘만 할인을 반복하거나, 신원 확인을 미루는 곳은 보류하세요.",
        },
    ]
    now = datetime.utcnow().isoformat() + "Z"
    line2 = line2_opts[idx % len(line2_opts)]
    geo_kw = nearby_keyword_csv(kw)
    meta_keywords = (
        f"{kw}, 국제결혼정보, 국제결혼상담, 국제결혼업체, 국제결혼주의사항, "
        f"국제결혼사기, 국제결혼비용, 국제결혼정보센터"
    )
    if geo_kw:
        meta_keywords = f"{meta_keywords}, {geo_kw}"
    return {
        "slug": slugify(kw, idx),
        "keyword": kw,
        "title": title,
        "metaDescription": meta_desc,
        "metaKeywords": meta_keywords,
        "h1": f"{kw}, 업체를 고르기 전에",
        "heroSubtitle": heroes[idx % len(heroes)],
        "heroBadge": "정보 안내",
        "heroTitleLine1": kw,
        "heroTitleLine2": line2,
        "heroBar": bar_opts[idx % len(bar_opts)],
        "sections": sections,
        "faqs": faqs,
        "images": image_urls(IMAGE_USE, rng.randint(1, 99999)),
        "ctaText": f"{kw} 정보 상담 — 지역·희망 국가만 알려 주세요",
        "nearbyAreas": areas,
        "nearbyStations": stations,
        "regionLabel": region or "",
        "keywordTheme": theme,
        "createdAt": now,
        "updatedAt": now,
    }


def write_html(page: Dict[str, Any], site_url: str) -> str:
    imgs = page.get("images") or []
    hero = imgs[0] if imgs else ""
    sections = ""
    for i, sec in enumerate(page["sections"]):
        ps = "".join(f"<p>{p}</p>" for p in sec["paragraphs"])
        sections += f"<section><h2>{sec['h2']}</h2>{ps}</section>"
        if i < 2 and i + 1 < len(imgs):
            sections += (
                f'<figure><img src="{imgs[i+1]}" alt="{page["keyword"]} 국제결혼정보 {i+2}" '
                f'loading="lazy"/></figure>'
            )
    faqs = "".join(
        f"<details><summary>{f['q']}</summary><p>{f['a']}</p></details>" for f in page["faqs"]
    )
    nearby = nearby_html_blocks(page.get("keyword") or "", page.get("regionLabel") or None)
    url = f"{site_url.rstrip('/')}/guide/{page['slug']}"
    og = hero or ""
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8"/>
<title>{page['title']}</title>
<meta name="description" content="{page['metaDescription']}"/>
<meta name="keywords" content="{page['metaKeywords']}"/>
<link rel="canonical" href="{url}"/>
<meta property="og:type" content="article"/>
<meta property="og:title" content="{page['title']}"/>
<meta property="og:description" content="{page['metaDescription']}"/>
<meta property="og:url" content="{url}"/>
<meta property="og:image" content="{og}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="{page['title']}"/>
<meta name="twitter:description" content="{page['metaDescription']}"/>
<meta name="twitter:image" content="{og}"/>
</head>
<body>
<header><a href="{site_url}">{SITE_NAME}</a></header>
<article>
<h1>{page['h1']}</h1>
<p>{page['heroSubtitle']}</p>
{sections}
<section><h2>자주 묻는 질문</h2>{faqs}</section>
{nearby}
<p><a href="{KAKAO}">{page['ctaText']}</a></p>
</article>
</body>
</html>"""


def generate_batch(
    keywords: List[str],
    out_dir: str,
    site_url: str,
    sync_public: str = "",
    stop_requested=None,
    gen_mode: str = "template",
    gemini_api_key: str = "",
    gemini_model: str = DEFAULT_MODEL,
    gemini_prompt: str = "",
    on_log=None,
) -> List[str]:
    os.makedirs(out_dir, exist_ok=True)
    pages_dir = os.path.join(out_dir, "pages")
    os.makedirs(pages_dir, exist_ok=True)
    slugs: List[str] = []
    entries: List[Dict[str, str]] = []
    urls: List[str] = []
    n = len(keywords)
    gemini_gap = 2.8
    for i, kw in enumerate(keywords, 1):
        if stop_requested and stop_requested():
            break
        use_gemini = (gen_mode or "template").strip().lower() == "gemini"
        if use_gemini:
            if on_log:
                on_log(f"[{i}/{n}] 제미나이 생성 시작: {kw}")
            try:
                page = build_gemini_page(
                    kw,
                    i,
                    api_key=gemini_api_key,
                    model=gemini_model or DEFAULT_MODEL,
                    user_prompt=gemini_prompt or "",
                    slugify_fn=slugify,
                    image_urls_fn=image_urls,
                    on_log=on_log,
                )
                if on_log:
                    on_log(f"[{i}/{n}] 제미나이 완료: {page.get('slug')}")
            except Exception as exc:
                if on_log:
                    on_log(f"[{i}/{n}] 제미나이 실패 → 기본 양식: {kw} · {exc}")
                page = build_content(kw, i)
                page["generatedBy"] = "template-fallback"
        else:
            page = build_content(kw, i)
            page["generatedBy"] = "template"
        slugs.append(page["slug"])
        entries.append(_page_to_summary(page))
        with open(os.path.join(pages_dir, f"{page['slug']}.json"), "w", encoding="utf-8") as f:
            json.dump(page, f, ensure_ascii=False, indent=2)
        html = write_html(page, site_url)
        with open(os.path.join(out_dir, f"{page['slug']}.html"), "w", encoding="utf-8") as f:
            f.write(html)
        urls.append(f"{site_url.rstrip('/')}/guide/{quote(page['slug'])}")
        index = {
            "slugs": slugs,
            "entries": entries,
            "updatedAt": datetime.utcnow().isoformat() + "Z",
        }
        with open(os.path.join(out_dir, "index.json"), "w", encoding="utf-8") as f:
            json.dump(index, f, ensure_ascii=False, indent=2)
        if use_gemini and i < n:
            if on_log:
                on_log(f"[{i}/{n}] 다음 글까지 {gemini_gap:.0f}초 대기")
            left = float(gemini_gap)
            while left > 0:
                if stop_requested and stop_requested():
                    break
                step = min(0.5, left)
                time.sleep(step)
                left -= step
    if not urls:
        return []
    index = {
        "slugs": slugs,
        "entries": entries,
        "updatedAt": datetime.utcnow().isoformat() + "Z",
    }
    with open(os.path.join(out_dir, "index.json"), "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
    with open(os.path.join(out_dir, "urls.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(urls))
    if sync_public:
        pub_pages = os.path.join(sync_public, "pages")
        os.makedirs(pub_pages, exist_ok=True)
        existing: Dict[str, Any] = {"slugs": [], "entries": [], "updatedAt": ""}
        idx_path = os.path.join(sync_public, "index.json")
        if os.path.isfile(idx_path):
            with open(idx_path, encoding="utf-8") as f:
                existing = json.load(f)
        by_slug = {e["slug"]: e for e in (existing.get("entries") or []) if e.get("slug")}
        for slug, entry in zip(slugs, entries):
            if stop_requested and stop_requested():
                break
            src = os.path.join(pages_dir, f"{slug}.json")
            dst = os.path.join(pub_pages, f"{slug}.json")
            with open(src, encoding="utf-8") as f:
                data = f.read()
            with open(dst, "w", encoding="utf-8") as f:
                f.write(data)
            by_slug[slug] = entry
            if slug in existing.get("slugs", []):
                existing["slugs"].remove(slug)
            existing.setdefault("slugs", []).insert(0, slug)
        existing["entries"] = [by_slug[s] for s in existing["slugs"] if s in by_slug]
        existing["updatedAt"] = datetime.utcnow().isoformat() + "Z"
        with open(idx_path, "w", encoding="utf-8") as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)
    return urls
