# 230 지역 고양이분양 캐터리

지역 서브도메인(`{지역}cat.marketstore.co.kr`)으로 운영하는 고양이분양 캐터리 사이트입니다.

## 배포 대상 (중요)

**오직 `inchowon58-beep/230cat` 저장소로만 올리세요.**  
`maincoonmar` / `maincoon.marketstore.co.kr`(와일드쿤) 및 이전 브랜드 저장소·도메인은 사용하지 않습니다.

| 항목 | 허용 | 금지 |
|------|------|------|
| GitHub | `inchowon58-beep/230cat` | `maincoonmar`, `mainyou`, `maincoonpshop`, `maincooninfo`, `maincoondmc`, `maincoonag` 등 |
| 도메인 | `{지역}cat.marketstore.co.kr` | `maincoon.marketstore.co.kr` 및 이전 브랜드 도메인 |

예: 부천 → `puchoncat.marketstore.co.kr`

```bash
npm run check:deploy-target
```

## 로컬 개발

```bash
npm install
npm run dev
```

미리보기: `/cattery/puchoncat`

## 환경 변수

`.env.example` 참고. 각 지역 사이트 주소는 요청 Host를 씁니다. `maincoon.marketstore.co.kr` 은 넣지 마세요.

카카오톡 상담 URL은 코드에 넣지 않습니다. 관리자 스폰서 설정에서 등록한 뒤에만 버튼이 나옵니다.
