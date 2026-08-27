# -*- coding: utf-8 -*-
"""문서 본문 생성 (템플릿) — 와일드쿤.
키워드 전달 시 SeoPage 스키마(title/meta/OG/FAQ/hero)로
메인쿤분양 상세 페이지를 생성합니다. 이미지는 3장.
"""

from __future__ import annotations

import hashlib
import json
import os
import random
import string
import time
from datetime import datetime
from typing import Any, Dict, List, Tuple
from urllib.parse import quote

from nearby_geo import extract_region, extract_theme, nearby_areas, nearby_html_blocks, nearby_keyword_csv, nearby_stations
from gemini_gen import DEFAULT_MODEL, build_gemini_page
from hugday_catalog import folder_image_count

BRAND = "와일드쿤"
FARM = "메인쿤분양"
SITE_NAME = "메인쿤분양 와일드쿤"
KAKAO = ""  # 관리자에서 등록한 뒤에만 사이트에 연결. 문서 HTML에는 넣지 않음.
LOCATION = "대한민국 전국"
IMAGE_BASE = "https://image.cattery.co.kr/maincoon"
IMAGE_COUNT = 40
IMAGE_USE = 3  # 히어로 1 + 본문 2
# SEO 본문은 12번부터 마지막까지
DISPLAY_ORDER = list(range(12, IMAGE_COUNT + 1))


def _rng(keyword: str, idx: int) -> random.Random:
    seed = int(hashlib.md5(f"{keyword}|{idx}|hugday".encode()).hexdigest()[:8], 16)
    return random.Random(seed)


def image_urls(count: int, seed: int) -> List[str]:
    rng = random.Random(seed)
    pool = [f"{IMAGE_BASE}/{i:02d}.webp" for i in DISPLAY_ORDER]
    rng.shuffle(pool)
    return pool[:count]


def slugify(keyword: str, idx: int) -> str:
    base = "".join(
        c if c.isalnum() or c in "-_" else "-" for c in keyword.lower().replace(" ", "-")
    )
    base = base.strip("-")[:36] or "maincoon"
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
    kw = keyword.strip() or "메인쿤분양"
    heroes = [
        "진열된 얼굴의 크기·기질·분양가를 먼저 맞춰 보세요",
        "성체 크기와 기질을 본 뒤 상담합니다",
        "메인쿤분양 사진과 키우기 하루를 함께 드립니다",
        "지역만 알려 주셔도 상담 일정을 안내합니다",
    ]
    line2_opts = [
        "와일드쿤",
        "분양 안내",
        "크기·성격",
        "키우기",
    ]
    bar_opts = [
        "메인쿤 특징·크기·분양가를 보고 조건을 정해 보세요",
        "성체 크기와 성격을 먼저 본 뒤 상담합니다",
        "분양가가 한 줄이면 혈통·성별을 쪼개 물어보세요",
        "사진을 본 뒤 문의로 이어 가는 메인쿤분양 상담",
    ]
    intro_h2 = [
        f"{kw}, 집을 고르기 전에",
        f"크기와 성격부터 정리하는 {kw}",
        f"{kw}에서 메인쿤분양 안내",
        f"{kw}, 특징과 키우기를 함께",
    ]

    title = f"{kw} | 와일드쿤 메인쿤분양"
    if len(title) > 60:
        title = f"{kw} | 메인쿤분양"
    region = extract_region(kw)
    theme = extract_theme(kw)
    areas = nearby_areas(region)
    stations = nearby_stations(region)
    meta_desc = (
        f"{kw} 메인쿤분양을 와일드쿤에서 안내합니다. "
        f"메인쿤 특징·크기·분양가를 본 뒤 일정과 과정을 확인하세요."
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
                f"{kw}를 검색하셨다면, 가장 먼저 확인할 것은 ‘우리 집에 큰 고양이가 맞나’입니다. "
                f"와일드쿤은 메인쿤분양을 진열된 얼굴에 {tone} 맞춰 드립니다.",
                f"수컷은 성체 6~12kg, 암컷은 4~8kg 전후의 대형묘로 2~4년에 걸쳐 자랍니다. "
                f"분양 중인 아이 사진은 메인 갤러리에서도 이어서 보실 수 있습니다.",
                f"상담에 필요한 정보는 단순합니다. 거주 지역, 희망 성별·크기입니다. "
                f"사이트에서 사진을 보신 뒤 상담해 주세요.",
            ],
        },
        {
            "h2": f"{kw}에서 분양가와 확인할 항목",
            "paragraphs": [
                f"메인쿤분양가는 혈통, 성별, 털색, 시기에 따라 달라집니다. "
                f"한 줄 견적만 있으면 포함 항목을 따로 물어보세요. 단가를 단정하지 않습니다.",
                f"상담 범위는 {LOCATION}입니다. 성격·키우기·입양 순서를 함께 정리할 수 있습니다.",
                f"{kw}로 찾아오신 분이라면, 얼굴을 본 뒤 와일드쿤 상담을 권합니다.",
            ],
        },
        {
            "h2": f"{kw} FAQ와 다음 단계",
            "paragraphs": [
                f"{kw} 상담은 사진을 본 뒤 이어 가면 됩니다. "
                f"지역과 희망 성별, 함께 지낼 가족만 알려 주셔도 됩니다.",
                f"사진을 더 보고 싶으시면 메인 갤러리로 이동해 주세요. 확인할 항목이 있으면 바로 물어보시면 됩니다.",
            ],
        },
    ]
    faqs = [
        {
            "q": f"{kw} 상담은 어떻게 하나요?",
            "a": "지역·희망 성별 또는 크기만 알려 주시면 일정을 안내받을 수 있습니다.",
        },
        {
            "q": "여기는 어떤 곳인가요?",
            "a": "와일드쿤은 메인쿤분양을 진열된 얼굴 기준으로 안내하는 곳입니다. "
            "특징·크기·성격·분양가를 정리하고 아이들 얼굴을 먼저 보여 드립니다.",
        },
        {
            "q": f"{kw} 전국에서 이용할 수 있나요?",
            "a": "전국 상담이 가능합니다. 방문이 어려우면 문의로 일정을 받아 보실 수 있습니다.",
        },
        {
            "q": "메인쿤 크기는 어느 정도인가요?",
            "a": "대형묘로, 수컷 성체 6~12kg·암컷 4~8kg 전후입니다. 천천히 자라므로 성체 크기를 기준으로 공간을 보시면 됩니다.",
        },
    ]
    now = datetime.utcnow().isoformat() + "Z"
    line2 = line2_opts[idx % len(line2_opts)]
    geo_kw = nearby_keyword_csv(kw)
    meta_keywords = (
        f"{kw}, 메인쿤분양, 메인쿤분양가, 메인쿤크기, 메인쿤성격, 메인쿤키우기, 와일드쿤"
    )
    if geo_kw:
        meta_keywords = f"{meta_keywords}, {geo_kw}"
    return {
        "slug": slugify(kw, idx),
        "keyword": kw,
        "title": title,
        "metaDescription": meta_desc,
        "metaKeywords": meta_keywords,
        "h1": f"{kw}, 골라 보기 전에",
        "heroSubtitle": heroes[idx % len(heroes)],
        "heroBadge": "분양 안내",
        "heroTitleLine1": kw,
        "heroTitleLine2": line2,
        "heroBar": bar_opts[idx % len(bar_opts)],
        "sections": sections,
        "faqs": faqs,
        "images": image_urls(IMAGE_USE, rng.randint(1, 99999)),
        "ctaText": f"{kw} 상담 — 지역·희망 조건만 알려 주세요",
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
                f'<figure><img src="{imgs[i+1]}" alt="{page["keyword"]} 메인쿤분양 {i+2}" '
                f'loading="lazy"/></figure>'
            )
    faqs = "".join(
        f"<details><summary>{f['q']}</summary><p>{f['a']}</p></details>" for f in page["faqs"]
    )
    nearby = nearby_html_blocks(page.get("keyword") or "", page.get("regionLabel") or None)
    url = f"{site_url.rstrip('/')}/guide/{page['slug']}"
    og = hero or ""
    kakao_href = (KAKAO or "").strip()
    cta_html = (
        f'<p><a href="{kakao_href}">{page["ctaText"]}</a></p>'
        if kakao_href
        else f"<p>{page['ctaText']}</p>"
    )
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
{cta_html}
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


def cattery_image_pool(breed: str, breed_images: Dict[str, List[str]]) -> List[str]:
    urls = breed_images.get(breed) or []
    if urls:
        return list(urls)
    neva = [f"https://image.cattery.co.kr/neva/{i:02d}.webp" for i in range(1, 46)]
    main = [f"https://image.cattery.co.kr/maincoon/{i:02d}.webp" for i in range(1, 46)]
    return neva + main


def pick_cattery_images(keyword: str, breed: str, breed_images: Dict[str, List[str]], count: int = 3) -> List[str]:
    pool = cattery_image_pool(breed, breed_images)
    rng = random.Random(int(hashlib.md5(f"{keyword}|cattery".encode()).hexdigest()[:8], 16))
    shuffled = list(pool)
    rng.shuffle(shuffled)
    return shuffled[:count] if shuffled else image_urls(count, 1)


def infer_breed(keyword: str, breeds: List[str]) -> str:
    for b in sorted(breeds, key=len, reverse=True):
        if b and b in keyword:
            return b
    return ""


def build_cattery_content(
    keyword: str,
    idx: int,
    *,
    region_name: str,
    region_slug: str,
    images: List[str],
    kind: str = "",
    folder: str = "",
) -> Dict[str, Any]:
    rng = _rng(keyword + region_slug + folder, idx)
    kw = keyword.strip()
    city = region_name
    now = datetime.utcnow().isoformat() + "Z"
    title = f"{kw} | {city} 포옹데이"
    if len(title) > 60:
        title = f"{kw} | 포옹데이"
    leads = [
        f"{kw} 안내. {city} 기질·관리·집 환경을 확인하고 포옹데이에서 입양 전 노트를 보세요.",
        f"{city} {kw}. 사진만 보지 말고 생활 리듬부터 맞춰 보세요.",
        f"{kw} | 포옹데이. {city} 입양 전 확인할 항목을 정리했습니다.",
    ]
    meta = leads[idx % len(leads)]
    if len(meta) > 158:
        meta = meta[:157] + "…"
    imgs = images[:3] or image_urls(3, idx)
    p1 = [
        f"{city}에서 {kw}을 찾으실 때 외모만 보지 마시고, 생활 리듬과 관리 시간부터 그려 보시면 선택이 분명해집니다.",
        f"{kw}은 {city}마다 같은 문장을 쓰지 않습니다. 이 글은 기질과 집 환경을 먼저 적습니다.",
        f"{city} {kw}를 고를 때 흔한 오해는 어린 얼굴이 곧 성체라는 점입니다. 성장 후 관리량을 먼저 보세요.",
    ]
    p2 = [
        f"분양가는 시기·개체에 따라 달라 이 글에 단가를 박지 않습니다. {city} 상담에서 포함 항목부터 맞춰 드립니다.",
        f"한 줄 가격보다 포함 항목이 중요합니다. {kw} 상담에서 월령·건강 기록을 함께 맞춰 드립니다.",
        f"무료분양 문구만 강조되면 서류를 따로 확인하세요. {city} {kw} 안내는 단가를 박지 않습니다.",
    ]
    p3 = [
        f"이 페이지는 {kw} 전용 노트입니다. 연락처는 입점 후 이 사이트에 표시됩니다.",
        f"이 사이트는 {city} 전용입니다. 다른 견종·묘종 페이지와 본문을 나눠 두었습니다.",
        f"포옹데이 {city} 노트는 {kw}만 다룹니다. 동·구 지역 키워드는 쓰지 않습니다.",
    ]
    shelter_note = "보호 중인 아이는 품종이 한 가지로 묶이지 않습니다. 지금 이 아이의 안정부터 보세요." if kind == "shelter" else ""
    return {
        "slug": kw,
        "keyword": kw,
        "regionSlug": region_slug,
        "regionName": city,
        "title": title,
        "metaDescription": meta,
        "metaKeywords": f"{kw}, {city}, 포옹데이, 분양, 기질, 키우기",
        "h1": kw,
        "heroSubtitle": f"{city} {kw}을 알아볼 때 확인하는 노트입니다.",
        "heroBadge": city,
        "heroTitleLine1": kw,
        "heroTitleLine2": "포옹데이",
        "heroBar": f"{city} 분양 상담",
        "sections": [
            {
                "h2": f"{kw}, 입양 전에 볼 점",
                "paragraphs": [
                    p1[rng.randrange(len(p1))],
                    p2[rng.randrange(len(p2))],
                    *( [shelter_note] if shelter_note else [] ),
                    p3[rng.randrange(len(p3))],
                ],
            },
            {
                "h2": f"{city}에서 {kw} 진행 순서",
                "paragraphs": [
                    f"1단계는 이 글에서 {kw} 기본 안내를 확인하는 일입니다.",
                    "2단계는 입점 안내의 연락처로 희망 시기를 알리는 일입니다.",
                    f"3단계는 아이 확인 후 입양입니다. {kw}은 보호자 결정이 먼저입니다.",
                ],
            },
            {
                "h2": f"{kw} FAQ",
                "paragraphs": [
                    f"{city}와 희망 시기만 알려 주셔도 상담이 시작됩니다.",
                    f"같은 브랜드라도 {city} 페이지 본문은 {kw}에 맞춰 따로 두었습니다.",
                ],
            },
        ],
        "faqs": [
            {
                "q": f"{kw}은 어떻게 문의하나요?",
                "a": "입점 후 이 사이트에 표시되는 연락처로 희망 시기만 알려 주셔도 됩니다.",
            },
            {
                "q": f"{city} 전용 안내인가요?",
                "a": f"이 글은 {kw} 전용이며, 일정은 포옹데이 상담에서 안내합니다.",
            },
            {
                "q": "공식 홈페이지는 어디인가요?",
                "a": "입점 업체의 안내는 이 사이트에 표시됩니다.",
            },
        ],
        "images": imgs,
        "ctaText": "입점 안내 확인",
        "createdAt": now,
        "updatedAt": now,
        "generatedBy": "hugday-template",
    }


def _fs_slug(slug: str) -> str:
    bad = '<>:"/\\|?*'
    s = "".join("_" if c in bad else c for c in (slug or "").strip())
    return s or "page"


def write_cattery_job(
    job: Dict[str, Any],
    idx: int,
    out_dir: str,
    sync_public: str,
    *,
    breeds: List[str],
    breed_images: Dict[str, List[str]],
    gen_mode: str = "template",
    gemini_api_key: str = "",
    gemini_model: str = DEFAULT_MODEL,
    gemini_prompt: str = "",
    on_log=None,
) -> Tuple[str, Dict[str, Any]]:
    """한 잡 발행. (공개 URL, 페이지 JSON) 반환."""
    os.makedirs(out_dir, exist_ok=True)
    pages_dir = os.path.join(out_dir, "pages")
    os.makedirs(pages_dir, exist_ok=True)
    kw = str(job.get("keyword") or "").strip()
    region_name = str(job.get("region") or "")
    region_slug = str(job.get("slug") or "")
    site_url = str(job.get("siteUrl") or "").rstrip("/")
    breed = infer_breed(kw, breeds)
    folder = str(job.get("folder") or "").strip()
    if folder:
        n = folder_image_count(folder)
        pool = [f"https://image.cattery.co.kr/{folder}/{i:02d}.webp" for i in range(1, n + 1)]
        rng = random.Random(int(hashlib.md5(f"{kw}|hugday".encode()).hexdigest()[:8], 16))
        shuffled = list(pool)
        rng.shuffle(shuffled)
        images = shuffled[:3] or [f"https://image.cattery.co.kr/{folder}/01.webp"]
    else:
        images = pick_cattery_images(kw, breed, breed_images, 3)
    use_gemini = (gen_mode or "template").strip().lower() == "gemini"
    if use_gemini:
        if on_log:
            on_log(f"제미나이 생성: {kw} ({site_url})")
        page = build_gemini_page(
            kw,
            idx,
            api_key=gemini_api_key,
            model=gemini_model or DEFAULT_MODEL,
            user_prompt=gemini_prompt or "",
            slugify_fn=lambda k, i: k.strip(),
            image_urls_fn=lambda n, s: images[:n],
        )
        page["slug"] = kw
        page["regionSlug"] = region_slug
        page["regionName"] = region_name
        page["images"] = images
        if not str(page.get("title") or "").startswith(kw):
            page["title"] = f"{kw} | {region_name} 포옹데이"
    else:
        page = build_cattery_content(
            kw,
            idx,
            region_name=region_name,
            region_slug=region_slug,
            images=images,
            kind=str(job.get("kind") or ""),
            folder=folder,
        )
    file_slug = _fs_slug(str(page["slug"]))
    with open(os.path.join(pages_dir, f"{file_slug}.json"), "w", encoding="utf-8") as f:
        json.dump(page, f, ensure_ascii=False, indent=2)
    if sync_public:
        pub_root = os.path.join(sync_public, "r", region_slug)
        pub_pages = os.path.join(pub_root, "pages")
        os.makedirs(pub_pages, exist_ok=True)
        with open(os.path.join(pub_pages, f"{file_slug}.json"), "w", encoding="utf-8") as f:
            json.dump(page, f, ensure_ascii=False, indent=2)
        idx_path = os.path.join(pub_root, "index.json")
        existing: Dict[str, Any] = {"slugs": [], "entries": [], "updatedAt": ""}
        if os.path.isfile(idx_path):
            with open(idx_path, encoding="utf-8") as f:
                existing = json.load(f)
        entry = _page_to_summary(page)
        slugs = [s for s in (existing.get("slugs") or []) if s != page["slug"]]
        slugs.insert(0, page["slug"])
        entries = [e for e in (existing.get("entries") or []) if e.get("slug") != page["slug"]]
        entries.insert(0, entry)
        existing = {
            "slugs": slugs,
            "entries": entries,
            "updatedAt": datetime.utcnow().isoformat() + "Z",
        }
        with open(idx_path, "w", encoding="utf-8") as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)
    return f"{site_url}/guide/{quote(page['slug'])}", page

