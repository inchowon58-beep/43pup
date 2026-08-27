# -*- coding: utf-8 -*-
"""로컬 settings.json / queue_state.json 경로·입출력."""

from __future__ import annotations

import json
import os
from typing import Any, Dict

from project_paths import webdoc_dir

DEFAULT_VM_PATH = ""
DEFAULT_SITE_URL = "https://puppytimes.co.kr"


def settings_path() -> str:
    return os.path.join(webdoc_dir(), "settings.json")


def queue_path() -> str:
    return os.path.join(webdoc_dir(), "queue_state.json")


def default_settings() -> Dict[str, Any]:
    return {
        "site_url": DEFAULT_SITE_URL,
        "out_dir": os.path.join(webdoc_dir(), "output"),
        "keywords_text": "메인쿤분양\n메인쿤분양가\n메인쿤크기\n메인쿤성격\n메인쿤키우기\n메인쿤입양\n메인쿤무료분양\n수원메인쿤분양",
        "regions_text": "서울\n부산\n대구\n인천\n광주\n대전\n울산\n수원\n성남\n고양",
        "total_target": "500",
        "daily_limit": "30",
        "order_mode": "random",
        "do_indexnow": False,
        "open_chrome_after": True,
        "schedule_enabled": False,
        "schedule_time": "09:00",
        "auto_naver_register": True,
        "vm_path": "",
        "blob_token": "",
        "naver_id": "",
        "naver_password": "",
        "naver_site": DEFAULT_SITE_URL,
        "site_group": "1",
        "window_start": "07:00",
        "window_end": "22:00",
        "batch_size": "3",
        "extras_text": "분양가\n성격\n키우기\n입양\n특징",
        "breeds_text": "",
        "breed_images_text": "",
        "twocaptcha_api_key": "",
        "naver_daily_limit": "10000",
        "naver_delay_min": "3",
        "naver_delay_max": "8",
        "schedule_last_run_date": "",
        "gen_mode": "template",
        "gemini_api_key": "",
        "gemini_model": "gemini-3.5-flash-lite",
        "gemini_prompt": (
            "톤: 현실적 안내. {keyword}를 제목·H1·본문·FAQ에 자연스럽게 넣으세요.\n"
            "견종·묘종·보호소 전용 안내입니다. 전화번호·공식 사이트 주소는 넣지 마세요. 입점 후 사이트에 표시됩니다.\n"
            "동·구 지역 키워드는 쓰지 마세요. 금지: 가격 단정, 허위, 다른 업체 실명 비방.\n"
        ),
    }


def load_settings() -> Dict[str, Any]:
    path = settings_path()
    base = default_settings()
    if not os.path.isfile(path):
        return base
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, dict):
            base.update(data)
    except (OSError, json.JSONDecodeError):
        pass
    return base


def save_settings(data: Dict[str, Any]) -> None:
    path = settings_path()
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
