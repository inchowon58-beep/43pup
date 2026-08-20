@echo off
chcp 65001 >nul
cd /d "%~dp0"
REM 이전 실행 파일명 호환 → 새 등록기로 연결
call "%~dp0쿠니네_웹문서생성기_실행.bat"
