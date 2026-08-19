# 두들리안 (pet-funeral-info)

Next.js 15 기반 **두들리안** — 우리 집에 올 골든두들 분양 안내 사이트입니다.

## 배포 대상 (중요)

**오직 `catterydoodle` 저장소와 `doodle.cattery.co.kr` 로만 배포하세요.**
기존 `muzi02` / `muzi01` / `muziga` / `eanimal` / `funeral.git` 프로젝트에는 절대 push·deploy 하지 마세요.

| 항목 | 허용 | 금지 |
|------|------|------|
| GitHub | `inchowon58-beep/catterydoodle` | `muzi02`, `muzi01`, `muziga`, `funeral`, `eanimal` 등 |
| 도메인 | `doodle.cattery.co.kr` | `rein.cattery.co.kr`, `rein.agapet.co.kr`, `funeral.puppytimes.co.kr` |

```bash
npm run check:deploy-target   # catterydoodle 전용인지 확인
npm run deploy:prod           # 확인 후 Vercel 배포
```

## 로컬 개발

```bash
npm install
npm run dev
```

## 주요 기능

- 메인: 골든두들 분양 · 두들갤러리 · 입양 과정
- `/guide/[slug]`: 지역별 SEO 웹문서 (골든두들 분양 안내)
- **전국 단일 임대(Global Sponsor)**: `/admin/sponsor`에서 모집/임대 전환
- 웹문서 생성기: `tools/webdoc/` (Python)

## 스폰서 관리

`/admin/sponsor`에서:

- **RECRUITING**: 전국 제휴·임대 모집 문구 + 하단 고정 바
- **ACTIVE**: 광고주 업체명·전화·홈페이지 일괄 반영

저장 시 `revalidateTag('global-sponsor')`로 전국 페이지 즉시 반영.

## 이미지 CDN

`https://image.cattery.co.kr/doodle/01.webp` ~ `40.webp`

## GitHub

https://github.com/inchowon58-beep/catterydoodle.git

## 환경 변수

`.env.example` 참고:

- `NEXT_PUBLIC_SITE_URL` = `https://doodle.cattery.co.kr`
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob — SEO·스폰서 데이터)
- `ADMIN_JWT_SECRET`
- `GEMINI_API_KEY` (선택 — AI 발행)
