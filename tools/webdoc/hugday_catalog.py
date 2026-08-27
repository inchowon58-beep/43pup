# -*- coding: utf-8 -*-
"""포옹데이 43 사이트 카탈로그 · 키워드 잡 생성."""

from __future__ import annotations

import random
import re
import sys
from pathlib import Path
from typing import Any, Dict, List

from project_paths import project_root, webdoc_dir

PARENT = "puppytimes.co.kr"

DEFAULT_EXTRAS = ["분양가", "성격", "키우기", "입양", "특징"]


def _sites_ts() -> Path:
    meipass = getattr(sys, "_MEIPASS", None)
    cands = []
    if meipass:
        cands.append(Path(meipass) / "hugday-sites.ts")
    cands.append(Path(webdoc_dir()) / "hugday-sites.ts")
    cands.append(Path(project_root()) / "src" / "lib" / "hugday-sites.ts")
    cands.append(Path(__file__).resolve().parent / "hugday-sites.ts")
    for p in cands:
        if p.is_file():
            return p
    return cands[-1]


def load_sites() -> List[Dict[str, str]]:
    text = _sites_ts().read_text(encoding="utf-8")
    # ROWS tuples: ["이름", "folder", "kind", ...
    rows = re.findall(
        r'\["([^"]+)", "([^"]+)", "(dog|cat|shelter)"',
        text,
    )
    out: List[Dict[str, str]] = []
    for name, folder, kind in rows:
        slug = f"{folder}pet"
        keyword = name if kind == "shelter" else f"{name}분양"
        out.append(
            {
                "name": name,
                "folder": folder,
                "kind": kind,
                "slug": slug,
                "host": f"{slug}.{PARENT}",
                "siteUrl": f"https://{slug}.{PARENT}",
                "keyword": keyword,
                "title": f"{keyword} 포옹데이",
            }
        )
    return out


def parse_lines(text: str) -> List[str]:
    out: List[str] = []
    seen = set()
    for line in (text or "").splitlines():
        s = line.strip()
        if not s or s.startswith("#") or s in seen:
            continue
        seen.add(s)
        out.append(s)
    return out


def build_keywords(site: Dict[str, str], extras: List[str]) -> List[str]:
    name = site["name"]
    kind = site["kind"]
    kws: List[str] = []
    seen = set()

    def add(k: str) -> None:
        if k and k not in seen:
            seen.add(k)
            kws.append(k)

    if kind == "shelter":
        add(name)
        add(f"{name}입양")
        add(f"{name}후원")
        for e in extras:
            add(f"{name}{e}")
    else:
        add(f"{name}분양")
        for e in extras:
            if e == "분양":
                continue
            add(f"{name}{e}" if e.startswith("분양") else f"{name}{e}")
        add(f"{name}분양가")
        add(f"{name}성격")
        add(f"{name}키우기")
    return kws


def parse_breed_images(text: str) -> Dict[str, List[str]]:
    mapping: Dict[str, List[str]] = {}
    for line in (text or "").splitlines():
        raw = line.strip()
        if not raw or raw.startswith("#") or "|" not in raw:
            continue
        breed, rest = raw.split("|", 1)
        breed = breed.strip()
        urls: List[str] = []
        for part in rest.split(","):
            u = part.strip()
            if not u:
                continue
            if u.endswith("/"):
                urls.extend([f"{u}{i:02d}.webp" for i in range(1, 46)])
            else:
                urls.append(u)
        if breed and urls:
            mapping[breed] = urls
    return mapping


def build_jobs(extras: List[str] | None = None, *, shuffle: bool = True) -> List[Dict[str, Any]]:
    extra = extras if extras else DEFAULT_EXTRAS
    jobs: List[Dict[str, Any]] = []
    for site in load_sites():
        for kw in build_keywords(site, extra):
            jobs.append(
                {
                    "keyword": kw,
                    "region": site["name"],
                    "slug": site["slug"],
                    "host": site["host"],
                    "siteUrl": site["siteUrl"],
                    "folder": site["folder"],
                    "kind": site["kind"],
                }
            )
    if shuffle:
        random.shuffle(jobs)
    return jobs
