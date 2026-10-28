# 도티두잇 홈페이지

도티두잇을 소개하고 사용 방법을 안내하는 홈페이지입니다.
원격 저장소: `git@github.com:kizwond/doti_doit_web.git` · 기본 브랜치: `main`

## 현재 구현

홈, 이야기, 미션, 루틴, 기록과 피드, FAQ, 설치 안내, 사용 안내 목록, 가이드 3개까지 **11개 페이지**를 구현했습니다. 원고는 아직 초안이며 현재 결과물은 검색 수집을 차단한 로컬 미리보기입니다. 공개 호스팅에는 배포하지 않았습니다.

홈은 생활 속 예시 → 미션 → 루틴 → 기록 → 브랜드 이야기 → 사용 안내 → FAQ 순서입니다. 실제 앱 테마 이미지를 사용했으며 설명용 미션·기록 예시는 실제 앱 캡처와 구분해 표시합니다. 로고의 ‘잇’은 주황색입니다.

## 실행

Node.js 22 이상이 필요합니다. 잠금 파일을 포함합니다.

```bash
npm ci
npm run dev
```

`http://localhost:4173`에서 확인합니다. 서버는 로컬 호스트에만 바인딩됩니다. 다른 포트가 필요하면 `PORT=4174 npm run dev`로 실행합니다.

소스나 원고를 수정한 뒤에는 `npm run build:preview`를 실행하고 브라우저를 새로 고칩니다. 별도 프런트엔드 프레임워크나 실행 중 API는 사용하지 않으며, 정적 HTML/CSS와 브라우저 기본 메뉴·접기로 동작합니다.

## 검사

```bash
npm run build:preview
npm run check
npx playwright install chromium
npm test
```

페이지 제목·본문·내부 링크·이미지·목차 앵커·초안 검색 차단을 검사합니다. 브라우저 검사는 320px 전체 페이지, JavaScript 비활성 상태의 메뉴·접기, 가이드 이동, 설치 검색 링크, 404, 초안 공개 방지를 확인합니다. 화면 캡처는 `test-results/screenshots/`에 생성하며 Git에서는 제외합니다.

## 공개 빌드

원고의 `status: draft`는 공개 결과물에서 제외합니다. 현재 모든 원고가 초안이므로 `npm run build`는 의도적으로 실패하고 기존 미리보기를 보존합니다.

공개 설치본의 기능·메뉴와 원고를 대조한 뒤 준비된 원고를 `status: published`로 바꾸고, 확정한 HTTPS 도메인을 `SITE_URL`에 설정합니다.

```bash
SITE_URL=https://실제로-확정한-도메인 npm run build
```

공개 빌드는 canonical·사이트맵·robots를 생성하고 링크 검사를 수행합니다. 연결된 페이지 중 초안이 빠져 링크가 끊기면 검사가 실패하므로 그 결과물을 배포하면 안 됩니다. 홈페이지 원고를 공개 상태로 바꾸는 것은 실제 대표님 발언이나 창업 일화를 새로 만들어 넣는다는 뜻이 아닙니다.

공개 설치 링크는 현재 Google Play **검색**입니다. 확인되지 않은 상세 주소나 회사 서버 APK 주소를 사용하지 않았습니다. 운영자·문의처·개인정보처리방침 등의 확정 정보와 공유 미리보기 이미지, 도메인·호스팅은 공개 준비 때 반영할 항목입니다.

## 구조

- `content/pages/`, `content/guides/`: 페이지별 원고·주소·검색 메타데이터
- `src/templates.mjs`: 홈 화면, 공통 레이아웃, 원고 페이지
- `src/styles.css`: 반응형 화면과 앱 브랜드 색상
- `public/assets/`: 앱 저장소에서 가져온 일러스트와 로고
- `scripts/build.mjs`: Markdown → 정적 HTML, 초안/공개 분리
- `scripts/serve.mjs`: 로컬 미리보기 서버
- `scripts/check.mjs`, `tests/`: 문서 연결 및 브라우저 검사
- `dist/`: 생성 결과, Git 제외
- `docs/`: 제작 방향·편집 근거·인계

홈 원고의 제목·설명은 `content/pages/home.md`에서 읽고, 홈의 화면용 요약 문구와 구성은 `src/templates.mjs`에서 관리합니다. 다른 9개 원고의 본문은 Markdown에서 생성합니다. 사용 안내 목록은 자동으로 생성합니다.

- [홈페이지 구성](docs/website-plan.md)
- [제품 근거와 의도 해석](docs/editorial-basis.md)
- [구현 인계](docs/2026-10-28-website-implementation.md)
