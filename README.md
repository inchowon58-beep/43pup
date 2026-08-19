# 포옹의마루 (pet-funeral-info)

Next.js 15 기반 **포옹의마루** — 마지막 포옹을 위한 반려동물 장례·화장·추모 안내 사이트입니다.

## 배포 대상 (중요)

**오직 `muzi01` 저장소와 `rein.agapet.co.kr` 로만 배포하세요.**
기존 `muziga` / `eanimal` / `funeral.git` 프로젝트에는 절대 push·deploy 하지 마세요.

| 항목 | 허용 | 금지 |
|------|------|------|
| GitHub | `inchowon58-beep/muzi01` | `inchowon58-beep/muziga`, `inchowon58-beep/funeral`, `eanimal` 등 |
| 도메인 | `rein.agapet.co.kr` | `funeral.puppytimes.co.kr`, `www.eanimal.kr` |

```bash
npm run check:deploy-target   # muzi01 전용인지 확인
npm run deploy:prod           # 확인 후 Vercel 배포
```

## 로컬 개발

```bash
npm install
npm run dev
```

## 주요 기능

- 메인: 마지막 포옹 · 따뜻한 마루 · 24시 안내
- `/guide/[slug]`: 지역별 SEO 웹문서 (정보 위주)
- **전국 단일 임대(Global Sponsor)**: `/admin/sponsor`에서 모집/임대 전환
- 웹문서 생성기: `tools/webdoc/` (Python)

## 스폰서 관리

`/admin/sponsor`에서:

- **RECRUITING**: 전국 제휴·임대 모집 문구 + 하단 고정 바
- **ACTIVE**: 광고주 업체명·전화·홈페이지 일괄 반영

저장 시 `revalidateTag('global-sponsor')`로 전국 페이지 즉시 반영.

## 이미지 CDN

`https://image.cattery.co.kr/petfuneral/01.webp` ~ `17.webp`

## GitHub

https://github.com/inchowon58-beep/muzi01.git

## 환경 변수

`.env.example` 참고:

- `NEXT_PUBLIC_SITE_URL` = `https://rein.agapet.co.kr`
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob — SEO·스폰서 데이터)
- `ADMIN_JWT_SECRET`
- `GEMINI_API_KEY` (선택 — AI 발행)
