# 메인쿤분양 · 쿤하우스

Next.js 15 기반 **메인쿤분양 쿤하우스** — 메인쿤 특징·크기·분양가·성격을 한집 기준으로 안내하는 사이트입니다.

## 배포 대상 (중요)

**오직 `inchowon58-beep/maincooninfo` 저장소와 `maincoon.infocs.co.kr` 로만 배포하세요.**
기존 `maincoondmc` / `maincoonag` / `smpinfo` / `infowedding` / `pruwedding` / `dmcwedding` / `globalwedding` / `pupmaincoon` / `doodle` / `muzi` / `eanimal` / `funeral.git` 프로젝트에는 절대 push·deploy 하지 마세요.

| 항목 | 허용 | 금지 |
|------|------|------|
| GitHub | `inchowon58-beep/maincooninfo` | `maincoondmc`, `maincoonag`, `smpinfo`, `infowedding`, `pruwedding`, `dmcwedding`, `globalwedding`, `pupmaincoon`, `doodle`, `muzi`, `funeral`, `eanimal` 등 |
| 도메인 | `maincoon.infocs.co.kr` | `maincoon.dmcmusic.co.kr`, `maincoon.agapet.co.kr` 등 이전 브랜드 도메인 |

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

- `NEXT_PUBLIC_SITE_URL` = `https://maincoon.infocs.co.kr`
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob — SEO·스폰서 데이터, 사용자가 직접 설정)
- `ADMIN_JWT_SECRET`
- `GEMINI_API_KEY` (선택 — AI 발행)

카카오톡 상담 URL은 코드에 넣지 않습니다. 관리자 스폰서 설정에서 등록한 뒤에만 버튼이 나옵니다.
