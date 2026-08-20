# 메인쿤분양 · 쿠니네

Next.js 15 기반 **쿠니네** — 메인쿤분양 안내 사이트입니다.

## 배포 대상 (중요)

**오직 `inchowon58-beep/enmaincoon` 저장소와 `maincoon.eanimal.kr` 로만 배포하세요.**
기존 `puppydoodle` / `agadoodle` / `doodlekorea` / `doodle` / `catterydoodle` / `muzi02` / `muzi01` / `muziga` / `eanimal` / `funeral.git` 프로젝트에는 절대 push·deploy 하지 마세요.

| 항목 | 허용 | 금지 |
|------|------|------|
| GitHub | `inchowon58-beep/enmaincoon` | `puppydoodle`, `agadoodle`, `doodlekorea`, `doodle`, `catterydoodle`, `muzi02`, `muzi01`, `muziga`, `funeral`, `eanimal` 등 |
| 도메인 | `maincoon.eanimal.kr` | `doodle.puppyshop.co.kr`, `doodle.agapet.co.kr`, `doodlekorea.puppytimes.co.kr`, `doodle.puppytimes.co.kr` |

```bash
npm run check:deploy-target
npm run deploy:prod
```

## 로컬 개발

```bash
npm install
npm run dev
```

## 환경 변수

`.env.example` 참고:

- `NEXT_PUBLIC_SITE_URL` = `https://maincoon.eanimal.kr`
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob — SEO·스폰서 데이터)
- `ADMIN_JWT_SECRET`
- `GEMINI_API_KEY` (선택 — AI 발행)
