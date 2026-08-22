# -*- coding: utf-8 -*-
"""발행기 UI를 별도 Chrome 창으로 열고, 종료 시 그 창만 닫는다."""

from __future__ import annotations

import os
import subprocess
import webbrowser
from typing import Optional

from project_paths import webdoc_dir

_chrome_proc: Optional[subprocess.Popen] = None


def _find_chrome() -> Optional[str]:
    candidates = [
        os.path.expandvars(r"%ProgramFiles%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%LocalAppData%\Google\Chrome\Application\chrome.exe"),
    ]
    return next((p for p in candidates if os.path.isfile(p)), None)


def profile_dir() -> str:
    return os.path.join(webdoc_dir(), "chrome-ui-profile")


def open_ui(url: str) -> None:
    global _chrome_proc
    chrome = _find_chrome()
    profile = profile_dir()
    os.makedirs(profile, exist_ok=True)
    if chrome:
        _chrome_proc = subprocess.Popen(
            [
                chrome,
                f"--user-data-dir={profile}",
                "--no-first-run",
                "--no-default-browser-check",
                f"--app={url}",
            ],
            close_fds=True,
        )
        return
    webbrowser.open(url, new=1)


def close_ui() -> None:
    global _chrome_proc
    if _chrome_proc is not None and _chrome_proc.poll() is None:
        try:
            _chrome_proc.terminate()
        except OSError:
            pass
        try:
            _chrome_proc.wait(timeout=3)
        except Exception:
            try:
                _chrome_proc.kill()
            except OSError:
                pass
    _chrome_proc = None
    profile = os.path.abspath(profile_dir()).lower()
    try:
        out = subprocess.check_output(
            [
                "wmic",
                "process",
                "where",
                "name='chrome.exe'",
                "get",
                "ProcessId,CommandLine",
                "/FORMAT:LIST",
            ],
            text=True,
            errors="replace",
        )
    except (OSError, subprocess.CalledProcessError):
        return
    current_cmd = ""
    for raw in out.splitlines():
        line = raw.strip()
        if line.lower().startswith("commandline="):
            current_cmd = line.split("=", 1)[-1].lower()
        elif line.lower().startswith("processid="):
            try:
                pid = int(line.split("=", 1)[-1])
            except ValueError:
                current_cmd = ""
                continue
            if profile in current_cmd:
                subprocess.run(
                    ["taskkill", "/F", "/T", "/PID", str(pid)],
                    capture_output=True,
                    check=False,
                )
            current_cmd = ""
