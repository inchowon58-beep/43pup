# -*- coding: utf-8 -*-
"""문서 본문 생성 (템플릿) — 포옹의마루.
키워드 전달 시 SeoPage 스키마(title/meta/OG/FAQ/hero)로
장례·화장·추모 상세 페이지를 생성합니다. 이미지는 3장.
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

BRAND = "포옹의마루"
FARM = "24시 반려동물 장례"
SITE_NAME = "포옹의마루"
PHONE = "0505-300-7779"
PHONE_TEL = "05053007779"
LOCATION = "대한민국 전국"
IMAGE_BASE = "https://image.cattery.co.kr/petfuneral"
IMAGE_COUNT = 17
IMAGE_USE = 3  # 히어로 1 + 본문 2


def _rng(keyword: str, idx: int) -> random.Random:
    seed = int(hashlib.md5(f"{keyword}|{idx}|cloud".encode()).hexdigest()[:8], 16)
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
    base = base.strip("-")[:36] or "petfuneral"
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
    kw = keyword.strip() or "강아지장례식장"
    heroes = [
        "픽업·안치·화장·추모 순서를 정리했습니다",
        "체중·옵션에 따라 달라지는 비용 항목 안내",
        "아이 몸 두기부터 유골 수습까지",
        "강아지장례 절차·준비 정보",
    ]
    line2_opts = [
        "절차 · 비용 · 준비",
        "픽업 · 화장 · 추모",
        "보호자가 확인할 점",
        "24시 상담 안내",
    ]
    bar_opts = [
        "픽업·안치·화장 순서를 정리했습니다",
        "포함 항목을 먼저 확인하세요",
        "지역·체중만 알려 주시면 됩니다",
        "방문 또는 픽업 일정을 맞출 수 있습니다",
    ]
    intro_h2 = [
        f"{kw}를 찾을 때 먼저 알면 좋은 점",
        f"{kw} 이용 전 아이 몸 두기와 준비",
        f"{kw}, 보호자가 확인하는 기본 정보",
        f"{kw} 절차와 준비물 안내",
    ]

    title = f"{kw} | 절차·비용·준비 안내"
    if len(title) > 60:
        title = f"{kw} | 강아지장례 안내"
    region = extract_region(kw)
    theme = extract_theme(kw)
    areas = nearby_areas(region)
    stations = nearby_stations(region)
    meta_desc = (
        f"{kw} 안내 — 아이 몸 두기, 픽업·안치·화장 순서, 비용이 달라지는 항목을 정리했습니다. "
        f"전국 안내. 문의 {PHONE}."
    )
    if areas or stations:
        near_bits = " · ".join((areas[:3] + stations[:3])[:4])
        meta_desc = f"{meta_desc} 근방·인근({near_bits}) {theme} 검색 안내."
    if len(meta_desc) > 160:
        meta_desc = meta_desc[:157] + "..."

    variants = ["차분히", "꼼꼼히", "따뜻하게"]
    tone = variants[idx % len(variants)]
    h2_0 = intro_h2[idx % len(intro_h2)]

    sections = [
        {
            "h2": h2_0,
            "paragraphs": [
                f"{kw}를 검색하셨다면, 가장 먼저 확인할 것은 아이 몸 두기와 상담에 필요한 정보입니다. "
                f"수건으로 감싸 서늘한 곳에 두고, 지역·체중·희망 시간만 알려 주시면 {tone} 안내받을 수 있습니다.",
                f"반드시 즉시 화장해야 하는 것은 아닙니다. "
                f"옮기기 어려우면 픽업을 요청하고, 방문이 가능하면 식장으로 모시는 방식도 있습니다.",
                f"상담은 전화({PHONE}) 또는 사이트 문의로 가능합니다. 거주 지역·희망 일정·아이 정보를 말씀해 주시면 "
                f"장례 절차를 안내드립니다.",
            ],
        },
        {
            "h2": f"{kw} 비용이 달라지는 이유",
            "paragraphs": [
                f"강아지장례 비용은 체중, 화장 방식, 유골함·추모 옵션, 픽업 거리·시간에 따라 달라집니다. "
                f"같은 키워드라도 아이마다 범위가 달라 단가를 단정하지 않습니다.",
                f"상담 범위는 {LOCATION}입니다. 픽업·장례·화장·유골 수습 일정도 함께 확인할 수 있습니다.",
                f"{kw}로 찾아오신 분이라면, 포함 항목·소요 시간·준비물을 먼저 확인하신 뒤 "
                f"전화 상담을 권합니다. 문의 {PHONE}.",
            ],
        },
        {
            "h2": f"{kw} FAQ와 다음 단계",
            "paragraphs": [
                f"{kw} 상담은 홈페이지 문의 또는 {PHONE} 전화로 가능합니다. "
                f"픽업·장례·화장·추모 모두 같은 번호로 연결됩니다.",
                f"지역과 아이 크기만 알려 주셔도 됩니다. 급하시면 바로, 조금 정리하신 뒤여도 괜찮습니다.",
            ],
        },
    ]
    faqs = [
        {
            "q": f"{kw} 상담은 어떻게 하나요?",
            "a": f"사이트 하단 문의 또는 {PHONE} 전화로 접수합니다. "
            f"상황·희망 일정을 알려주시면 확인 후 안내합니다.",
        },
        {
            "q": f"24시 긴급 픽업이 가능한가요?",
            "a": f"많은 경우 24시 픽업 상담이 가능합니다. "
            f"거주 지역과 상황을 알려주시면 이동 가능한 시간을 안내드립니다.",
        },
        {
            "q": f"{kw} 전국에서 이용할 수 있나요?",
            "a": "전국 상담이 가능합니다. 픽업·장례·화장 일정 조율 후 진행합니다. "
            f"문의 {PHONE}.",
        },
        {
            "q": f"{kw} 문의는 어디로 하나요?",
            "a": f"{PHONE} 또는 사이트 하단 문의입니다. 지역·체중만 알려 주셔도 됩니다.",
        },
    ]
    now = datetime.utcnow().isoformat() + "Z"
    line2 = line2_opts[idx % len(line2_opts)]
    geo_kw = nearby_keyword_csv(kw)
    meta_keywords = (
        f"{kw}, 강아지장례식장, 반려동물장례, 강아지화장, 펫장례, "
        f"24시장례, 긴급픽업, 반려동물추모"
    )
    if geo_kw:
        meta_keywords = f"{meta_keywords}, {geo_kw}"
    return {
        "slug": slugify(kw, idx),
        "keyword": kw,
        "title": title,
        "metaDescription": meta_desc,
        "metaKeywords": meta_keywords,
        "h1": f"{kw} 안내 — 절차와 준비",
        "heroSubtitle": heroes[idx % len(heroes)],
        "heroBadge": "절차 안내",
        "heroTitleLine1": kw,
        "heroTitleLine2": line2,
        "heroBar": bar_opts[idx % len(bar_opts)],
        "sections": sections,
        "faqs": faqs,
        "images": image_urls(IMAGE_USE, rng.randint(1, 99999)),
        "ctaText": f"{kw} 상담 — 지역·체중만 알려 주세요",
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
                f'<figure><img src="{imgs[i+1]}" alt="{page["keyword"]} 장례 {i+2}" '
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
<p><a href="tel:{PHONE_TEL}">{page['ctaText']}</a></p>
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
