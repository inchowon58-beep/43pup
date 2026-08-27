# -*- coding: utf-8 -*-
"""웹 UI용 런타임 상태·발행 파이프라인."""

from __future__ import annotations

import os
import subprocess
import threading
import webbrowser
from datetime import datetime
from typing import Any, Dict, List, Optional
from urllib.parse import urlparse

from blob_sync import load_blob_token, upsert_cattery_page_blob
from hugday_catalog import build_jobs, parse_breed_images, parse_lines
from combo_queue import QueueState, dequeue, fill_cattery_jobs, load_queue, save_queue
from content_gen import write_cattery_job
from gemini_gen import DEFAULT_MODEL, model_choices, test_gemini_key
from indexnow import submit_indexnow
from naver_register import pending_urls, quit_kept_driver, register_urls
from project_paths import project_root, webdoc_dir
from scheduler import WindowScheduler, in_time_window, normalize_hhmm, parse_hhmm
from settings_store import load_settings, queue_path, save_settings


def _public_msg(msg: str) -> str:
    """UI/로그에 노출되는 문구에서 '네이버·웹문서' 표현을 '블로그'로 통일."""
    s = str(msg or "")
    replacements = (
        ("인포씨(네이버)", "인포씨"),
        ("네이버 서치어드바이저", "블로그"),
        ("네이버 등록", "블로그 등록"),
        ("네이버 로그인", "블로그 로그인"),
        ("네이버 자동", "블로그 자동"),
        ("네이버 세션", "블로그 세션"),
        ("네이버 계정", "블로그 계정"),
        ("네이버 상세", "블로그 상세"),
        ("네이버 로그", "블로그 로그"),
        ("[네이버]", "[블로그]"),
        ("미등록 웹문서", "미등록 블로그"),
        ("웹문서 등록", "블로그 등록"),
        ("웹문서", "블로그"),
        ("네이버", "블로그"),
    )
    for a, b in replacements:
        s = s.replace(a, b)
    return s


def _site_origin(url: str) -> str:
    p = urlparse((url or "").strip())
    if p.scheme and p.netloc:
        return f"{p.scheme}://{p.netloc}"
    return (url or "").strip().rstrip("/")


def _group_urls_by_site(urls: List[str]) -> Dict[str, List[str]]:
    buckets: Dict[str, List[str]] = {}
    for u in urls:
        origin = _site_origin(u)
        if not origin:
            continue
        buckets.setdefault(origin, []).append(u)
    return buckets


def open_urls_in_chrome(urls: List[str], *, limit: int = 3) -> str:
    targets = [u for u in urls if u][: max(1, limit)]
    if not targets:
        return "열 URL 없음"
    chrome_candidates = [
        os.path.expandvars(r"%ProgramFiles%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%LocalAppData%\Google\Chrome\Application\chrome.exe"),
    ]
    chrome = next((p for p in chrome_candidates if os.path.isfile(p)), None)
    try:
        if chrome:
            subprocess.Popen([chrome, "--new-window", *targets], close_fds=True)
            return f"Chrome으로 {len(targets)}건 열림"
        for u in targets:
            webbrowser.open(u)
        return f"기본 브라우저로 {len(targets)}건 열림"
    except Exception as e:
        return f"브라우저 열기 실패: {e}"


class WebdocRuntime:
    def __init__(self) -> None:
        self.settings: Dict[str, Any] = load_settings()
        if not (self.settings.get("blob_token") or "").strip():
            tok = load_blob_token()
            if tok:
                self.settings["blob_token"] = tok
        self.queue: Optional[QueueState] = load_queue(queue_path())
        self.logs: List[str] = []
        self.naver_logs: List[str] = []
        self.last_urls: List[str] = []
        self.running = False
        self.stop_requested = False
        self.status = "대기 중"
        self.schedule_status = "스케줄: 꺼짐"
        self._scheduler: Optional[WindowScheduler] = None
        self._lock = threading.Lock()
        self.quit_requested = False
        self.admin_unlocked = False
        self._naver_driver = None
        self._skip_window_session = False
        self._respect_window = False
        if self.settings.get("schedule_enabled"):
            self.restart_scheduler()

    def log(self, msg: str) -> None:
        line = f"[{datetime.now().strftime('%H:%M:%S')}] {_public_msg(msg)}"
        self.logs.append(line)
        if len(self.logs) > 500:
            self.logs = self.logs[-500:]

    def log_naver(self, msg: str) -> None:
        """블로그 등록 전용 로그 (관리자 인증 후에만 UI 표시)."""
        line = f"[{datetime.now().strftime('%H:%M:%S')}] {_public_msg(msg)}"
        self.naver_logs.append(line)
        if len(self.naver_logs) > 800:
            self.naver_logs = self.naver_logs[-800:]
        short = msg if len(msg) < 80 else msg[:77] + "…"
        if any(
            k in msg
            for k in (
                "등록 시작",
                "등록 완료",
                "등록 오류",
                "자동 로그인",
                "로그인 실패",
                "로그인 재시도",
                "미등록",
            )
        ):
            self.log(f"[블로그] {_public_msg(short)}")

    def unlock_admin(self, password: str) -> bool:
        if (password or "").strip() == "ybijour80":
            self.admin_unlocked = True
            self.log("관리자 인증 성공 — 블로그 상세 로그 표시")
            return True
        self.admin_unlocked = False
        return False

    def lock_admin(self) -> None:
        self.admin_unlocked = False
        self.log("관리자 로그 잠금")

    def snapshot(self) -> Dict[str, Any]:
        q = self.queue
        pending_n = 0
        try:
            pending_n = len(pending_urls())
        except Exception:
            pending_n = 0
        return {
            "settings": self.settings,
            "status": _public_msg(self.status),
            "schedule_status": _public_msg(self.schedule_status),
            "running": self.running,
            "logs": self.logs[-120:],
            "naver_logs": self.naver_logs[-200:] if self.admin_unlocked else [],
            "admin_unlocked": self.admin_unlocked,
            "pending_naver_count": pending_n,
            "last_urls": self.last_urls,
            "queue": {
                "remaining": q.remaining if q else 0,
                "published_count": q.published_count if q else 0,
                "total_target": q.total_target if q else 0,
                "daily_limit": q.daily_limit if q else 0,
                "days_left": q.days_left if q else 0,
                "summary": self.queue_summary(),
            },
            "gemini_models": model_choices(),
        }

    def queue_summary(self) -> str:
        label = "포옹데이 43곳"
        if not self.queue or not self.queue.pending:
            done = self.queue.published_count if self.queue else 0
            target = self.queue.total_target if self.queue else 0
            return f"큐: 비어 있음 · {label} · 누적 발행 {done}/{target or '—'}"
        q = self.queue
        return f"큐 남음 {q.remaining}건 · {label} · 누적 {q.published_count}/{q.total_target}"

    def _normalize_windows(self) -> None:
        start = normalize_hhmm(str(self.settings.get("window_start") or ""), "07:00") or "07:00"
        end = normalize_hhmm(str(self.settings.get("window_end") or ""), "22:00") or "22:00"
        self.settings["window_start"] = start
        self.settings["window_end"] = end
        self.settings["schedule_time"] = start

    def save_settings(self, data: Dict[str, Any]) -> None:
        prev_enabled = bool(self.settings.get("schedule_enabled"))
        prev_start = str(self.settings.get("window_start") or "")
        prev_end = str(self.settings.get("window_end") or "")
        self.settings.update(data)
        self._normalize_windows()
        enabled = bool(self.settings.get("schedule_enabled"))
        start = str(self.settings.get("window_start") or "07:00")
        end = str(self.settings.get("window_end") or "22:00")
        if enabled and (not parse_hhmm(start) or not parse_hhmm(end)):
            self.log("스케줄 시각 형식 오류 — 예: 07:00")
            self.settings["schedule_enabled"] = False
            enabled = False
        save_settings(self.settings)
        self.log("설정을 저장했습니다.")
        need_restart = (
            enabled != prev_enabled
            or start != prev_start
            or end != prev_end
            or (enabled and not (self._scheduler and self._scheduler.is_alive()))
        )
        if need_restart:
            self.restart_scheduler()

    def test_gemini(self) -> Dict[str, Any]:
        key = str(self.settings.get("gemini_api_key") or "").strip()
        model = str(self.settings.get("gemini_model") or DEFAULT_MODEL).strip()
        ok, msg = test_gemini_key(key, model)
        self.log(f"제미나이 연결 테스트: {msg}")
        return {"ok": ok, "message": msg}

    def build_queue(self) -> Dict[str, Any]:
        extras = parse_lines(str(self.settings.get("extras_text") or "분양가\n성격\n키우기\n입양\n특징"))
        mode = self.settings.get("order_mode") or "random"
        if mode not in ("random", "sequential"):
            mode = "random"
        jobs = build_jobs(extras, shuffle=(mode == "random"))
        if not jobs:
            raise ValueError("사이트 목록을 읽지 못했습니다.")
        self.queue = fill_cattery_jobs(jobs, mode)  # type: ignore[arg-type]
        save_queue(queue_path(), self.queue)
        save_settings(self.settings)
        self.log(f"큐 생성: {self.queue.remaining}건 · 포옹데이 43곳 · 키워드 확장 {len(extras)} · {mode}")
        return {
            "ok": True,
            "remaining": self.queue.remaining,
            "days_left": 0,
            "summary": self.queue_summary(),
        }

    def _batch_size(self) -> int:
        try:
            n = int(str(self.settings.get("batch_size") or "1"))
        except ValueError:
            n = 1
        return max(1, min(20, n))

    def request_stop(self) -> None:
        self.stop_requested = True
        self._skip_window_session = True
        self.status = "중지 요청됨… (곧 중단)"
        self.log("중지 요청 — 생성·업로드·대기·로그인 중이면 바로 끊고 중단합니다.")

    def start_batch(self, *, from_schedule: bool = False) -> bool:
        """발행 시작. 큐에서 꺼내 시작했으면 True."""
        with self._lock:
            if self.running:
                self.log("이미 작업 중입니다.")
                return False
            if from_schedule and self._skip_window_session:
                return False
            if not self.queue or not self.queue.pending:
                if from_schedule:
                    return False
                self.log("발행 큐가 비어 있습니다. 먼저 큐를 만드세요.")
                return False
            if from_schedule and not self._window_open():
                return False
            self.running = True
            self.stop_requested = False
            if not from_schedule:
                self._skip_window_session = False
            self._respect_window = from_schedule
            remain = self.queue.remaining if self.queue else 0
            self.status = f"발행 중… 남은 {remain}건"
            self.log(
                f"발행 시작: 큐 {remain}건"
                + (" (시간창)" if from_schedule else " (지금 발행)")
            )

        def worker() -> None:
            stopped = False
            try:
                urls = self._publish_loop()
                self.last_urls = urls[-40:]
                if self.stop_requested:
                    stopped = True
                    self.log(
                        f"중지됨 · 처리 {len(urls)}건 · 큐 남음 {self.queue.remaining if self.queue else 0}"
                    )
                else:
                    self.log(
                        f"발행 완료: {len(urls)}건 · 큐 남음 {self.queue.remaining if self.queue else 0}"
                    )
            except Exception as e:
                self.log(f"오류: {e}")
            finally:
                self.running = False
                self._respect_window = False
                self.status = "중지됨" if stopped or self.stop_requested else "대기 중"
                self.stop_requested = False
                save_settings(self.settings)
                if self.queue:
                    save_queue(queue_path(), self.queue)
                if not self._window_open() or self._skip_window_session:
                    self._quit_naver_driver()

        threading.Thread(target=worker, daemon=True).start()
        return True

    def _stopped(self) -> bool:
        return bool(self.stop_requested)

    def _window_open(self) -> bool:
        start = str(self.settings.get("window_start") or "07:00")
        end = str(self.settings.get("window_end") or "22:00")
        return in_time_window(start, end)

    def _sync_dir(self) -> str:
        root = project_root()
        if os.path.isfile(os.path.join(root, "package.json")):
            return os.path.join(root, "public", "seo-data")
        return os.path.join(webdoc_dir(), "seo-data")

    def _out_folder(self) -> str:
        out = (self.settings.get("out_dir") or os.path.join(webdoc_dir(), "output")).strip()
        stamp = datetime.now().strftime("%Y%m%d")
        return os.path.join(out, f"hugday_{stamp}")

    def _publish_loop(self) -> List[str]:
        urls: List[str] = []
        tok = (self.settings.get("blob_token") or "").strip()
        if tok:
            os.environ["BLOB_READ_WRITE_TOKEN"] = tok
        folder = self._out_folder()
        sync = self._sync_dir()
        extras = parse_lines(str(self.settings.get("extras_text") or ""))
        breed_images = parse_breed_images(str(self.settings.get("breed_images_text") or ""))
        gen_mode = str(self.settings.get("gen_mode") or "template").strip().lower()
        gemini_model = str(self.settings.get("gemini_model") or DEFAULT_MODEL).strip()
        if gen_mode == "gemini" and not str(self.settings.get("gemini_api_key") or "").strip():
            raise RuntimeError("제미나이 모드인데 API 키가 없습니다. [제미나이] 탭에서 키를 저장하세요.")

        idx = (self.queue.published_count if self.queue else 0) + 1
        opened_preview = False
        batch_n = self._batch_size()
        while True:
            if self._stopped():
                break
            if self._respect_window and not self._window_open():
                self.log("발행 시간이 끝나 중단합니다. 다음 시간창에 이어서 발행합니다.")
                break
            with self._lock:
                if not self.queue or not self.queue.pending:
                    jobs: List[Any] = []
                else:
                    jobs = dequeue(self.queue, batch_n)
                    save_queue(queue_path(), self.queue)
            if not jobs:
                self.log("큐가 비었습니다.")
                break
            batch_urls: List[str] = []
            by_site: Dict[str, List[str]] = {}
            self.log(f"배치 {len(jobs)}건 발행 (설정 {batch_n}건)")
            for job in jobs:
                if self._stopped():
                    break
                if isinstance(job, str):
                    self.log(f"이전 형식 큐 항목은 건너뜁니다: {job}")
                    continue
                remain = self.queue.remaining if self.queue else 0
                self.status = f"발행 중… {job.get('keyword')} · 남음 {remain}"
                try:
                    url = self._publish_job(
                        job,
                        idx,
                        folder,
                        sync,
                        breeds=extras,
                        breed_images=breed_images,
                        gen_mode=gen_mode,
                        gemini_model=gemini_model,
                        register_naver=False,
                    )
                    if url:
                        urls.append(url)
                        batch_urls.append(url)
                        site = str(job.get("siteUrl") or "").rstrip("/")
                        by_site.setdefault(site, []).append(url)
                        self.last_urls = urls[-40:]
                        if self.settings.get("open_chrome_after", True) and not opened_preview:
                            self.log(open_urls_in_chrome([url], limit=1))
                            opened_preview = True
                except Exception as e:
                    self.log(f"발행 실패 ({job.get('keyword')}): {e}")
                idx += 1
            if self.settings.get("auto_naver_register", True) and batch_urls and not self._stopped():
                self.log(f"배치 블로그 등록 {len(batch_urls)}건")
                for site, batch in by_site.items():
                    if self._stopped():
                        break
                    self._run_naver_register(batch, site)
        return urls

    def _publish_job(
        self,
        job: Dict[str, Any],
        idx: int,
        folder: str,
        sync: str,
        *,
        breeds: List[str],
        breed_images: Dict[str, List[str]],
        gen_mode: str,
        gemini_model: str,
        register_naver: bool = True,
    ) -> str:
        if self._stopped():
            return ""
        kw = str(job.get("keyword") or "")
        site = str(job.get("siteUrl") or "").rstrip("/")
        self.log(f"생성: {kw} → {site}")
        url, page = write_cattery_job(
            job,
            idx,
            folder,
            sync,
            breeds=breeds,
            breed_images=breed_images,
            gen_mode=gen_mode,
            gemini_api_key=str(self.settings.get("gemini_api_key") or ""),
            gemini_model=gemini_model,
            gemini_prompt=str(self.settings.get("gemini_prompt") or ""),
            on_log=self.log,
        )
        if self._stopped():
            return url
        tok = (self.settings.get("blob_token") or "").strip()
        if tok:
            ok, msg = upsert_cattery_page_blob(page)
            self.log(f"웹(Blob): {msg}" if ok else f"웹(Blob) 실패: {msg}")
        else:
            self.log("Blob 토큰 없음 — 로컬 seo-data 만 저장")
        if self._stopped():
            return url
        if self.settings.get("do_indexnow", True) and url:
            _ok, msg = submit_indexnow(site, [url])
            self.log(f"IndexNow: {msg}")
        if self._stopped():
            return url
        if register_naver and self.settings.get("auto_naver_register", True) and url:
            self._run_naver_register([url], site)
        return url

    def _quit_naver_driver(self) -> None:
        drv = self._naver_driver
        self._naver_driver = None
        if drv is None:
            return
        self.log_naver("블로그 브라우저 종료")
        quit_kept_driver(drv, on_log=self.log_naver)

    def _on_naver_driver(self, driver) -> None:
        self._naver_driver = driver

    def _run_naver_register(self, urls: List[str], site: str) -> None:
        if not urls:
            return
        try:
            daily = int(str(self.settings.get("naver_daily_limit") or "10000"))
            dmin = float(str(self.settings.get("naver_delay_min") or "3"))
            dmax = float(str(self.settings.get("naver_delay_max") or "8"))
        except ValueError:
            daily, dmin, dmax = 10000, 3.0, 8.0
        nid = str(self.settings.get("naver_id") or "").strip()
        npw = str(self.settings.get("naver_password") or "").strip()
        if not nid or not npw:
            self.log("블로그 아이디·비밀번호가 없어 등록을 건너뜁니다.")
            return
        self.log_naver(f"블로그 등록 시작… {len(urls)}건 · {site}")

        def _call(existing) -> tuple[bool, str]:
            return register_urls(
                urls,
                naver_id=nid,
                naver_password=npw,
                naver_site=site,
                daily_limit=max(1, daily),
                delay_min=dmin,
                delay_max=dmax,
                twocaptcha_api_key=str(self.settings.get("twocaptcha_api_key") or ""),
                on_log=self.log_naver,
                stop_requested=lambda: self.stop_requested,
                login_retries=3 if existing is None else 1,
                keep_browser_open=True,
                existing_driver=existing,
                on_driver=self._on_naver_driver,
            )

        existing = self._naver_driver
        ok, msg = _call(existing)
        if not ok and existing is not None:
            self.log_naver("세션 실패 — 브라우저를 다시 열고 로그인합니다.")
            self._quit_naver_driver()
            ok, msg = _call(None)
        self.log_naver(msg)
        self.log(msg)

    def start_naver_pending(self) -> None:
        """오늘(누적) 미등록 URL만 블로그 수집 요청 — 수동 재시도용."""
        with self._lock:
            if self.running:
                self.log("이미 작업 중입니다.")
                return
            try:
                urls = pending_urls()
            except Exception as e:
                self.log(f"미등록 URL 조회 실패: {e}")
                return
            if not urls:
                self.log("미등록 블로그가 없습니다. (urls.txt 기준 모두 등록 완료)")
                return
            self.running = True
            self.stop_requested = False
            self.status = f"블로그 등록 중… {len(urls)}건"
            self.log(f"오늘 미등록 블로그 등록 요청: {len(urls)}건")

        def worker() -> None:
            try:
                self.last_urls = urls
                grouped = _group_urls_by_site(urls)
                for site, batch in grouped.items():
                    if self._stopped():
                        break
                    self._run_naver_register(batch, site)
            except Exception as e:
                self.log(f"오류: {e}")
            finally:
                self.running = False
                self.status = "대기 중"
                self._quit_naver_driver()

        threading.Thread(target=worker, daemon=True).start()

    def set_schedule_enabled(
        self, enabled: bool, start: str, end: str = "", *, from_settings_save: bool = False
    ) -> None:
        start = normalize_hhmm(start, str(self.settings.get("window_start") or "07:00")) or "07:00"
        end = normalize_hhmm(end, str(self.settings.get("window_end") or "22:00")) or "22:00"
        if enabled and (not parse_hhmm(start) or not parse_hhmm(end)):
            raise ValueError("시각은 HH:MM 형식이어야 합니다. 예: 07:00")
        self.settings["schedule_enabled"] = enabled
        self.settings["window_start"] = start
        self.settings["window_end"] = end
        self.settings["schedule_time"] = start
        if enabled:
            self._skip_window_session = False
            self.log(f"스케줄 ON — 매일 {start}~{end} 동안 큐가 빌 때까지 계속 발행")
        else:
            self.log("스케줄 OFF")
        self.restart_scheduler()
        save_settings(self.settings)

    def restart_scheduler(self) -> None:
        if self._scheduler:
            self._scheduler.stop()
            self._scheduler = None
        if not self.settings.get("schedule_enabled"):
            self.schedule_status = "스케줄: 꺼짐"
            return
        self._normalize_windows()
        self._scheduler = WindowScheduler(
            get_enabled=lambda: bool(self.settings.get("schedule_enabled")),
            get_start=lambda: str(self.settings.get("window_start") or "07:00"),
            get_end=lambda: str(self.settings.get("window_end") or "22:00"),
            is_running=lambda: self.running,
            on_tick=lambda: self.start_batch(from_schedule=True),
            on_close=self._on_window_close,
            on_log=self.log,
            on_status=lambda s: setattr(self, "schedule_status", s),
        )
        self._scheduler.start()

    def _on_window_close(self) -> None:
        self._skip_window_session = False
        if self._respect_window:
            self.stop_requested = True
            self.log("발행 시간 종료 — 다음 시간창까지 대기합니다.")
        if not self.running:
            self._quit_naver_driver()

    def request_quit(self) -> None:
        self.quit_requested = True
        self.stop_requested = True
        self.log("프로그램 종료 요청…")
        try:
            from chrome_ui import close_ui

            close_ui()
        except Exception:
            pass
        self.shutdown()

    def shutdown(self) -> None:
        self.stop_requested = True
        if self._scheduler:
            self._scheduler.stop()
            self._scheduler = None
        self._quit_naver_driver()
        save_settings(self.settings)
        if self.queue:
            save_queue(queue_path(), self.queue)


RUNTIME = WebdocRuntime()
