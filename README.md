# 국제결혼정보 · 한국국제결혼협회

Next.js 15 기반 **한국국제결혼협회** — 믿을 수 있는 국제결혼 업체 정보를 제공하는 안내 사이트입니다. 한 업체를 전면에 노출하지 않습니다.

## 배포 대상 (중요)

**오직 `inchowon58-beep/globalwedding` 저장소와 `www.globalwedding.co.kr` 로만 배포하세요.**
기존 `pupmaincoon` / `enmaincoon` / `puppydoodle` / `doodle` / `catterydoodle` / `muzi` / `eanimal` / `funeral.git` 프로젝트에는 절대 push·deploy 하지 마세요.

| 항목 | 허용 | 금지 |
|------|------|------|
| GitHub | `inchowon58-beep/globalwedding` | `pupmaincoon`, `enmaincoon`, `doodle`, `catterydoodle`, `muzi`, `funeral`, `eanimal` 등 |
| 도메인 | `www.globalwedding.co.kr` | `maincoon.puppytimes.co.kr`, `maincoon.eanimal.kr` 등 |

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

- `NEXT_PUBLIC_SITE_URL` = `https://www.globalwedding.co.kr`
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob — SEO·스폰서 데이터, 사용자가 직접 설정)
- `ADMIN_JWT_SECRET`
- `GEMINI_API_KEY` (선택 — AI 발행)
