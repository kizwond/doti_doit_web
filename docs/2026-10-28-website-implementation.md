# 홈페이지 화면 구현 인계

2026-10-28. 앱 Preview 332 배포 후 사용자의 ‘홈페이지 작업 다시 이어가자’ 요청으로 기존 원고를 실제 홈페이지로 구현했다. 앱 저장소와 앱 배포는 변경하지 않았다.

## 결과

- 홈, 이야기, 미션, 루틴, 기록과 피드, FAQ, 설치 안내, 사용 안내 목록, 가이드 3개: 11개 주소.
- 차분한 크림색 바탕·짙은 청록 본문·주황 강조. 앱의 테마 일러스트와 기존 워드마크 형태를 사용한다.
- 첫 화면의 미션 수치와 카드, 루틴 순서, 기록 문장은 설명용 예시이며 실제 사용자의 데이터나 앱 화면 캡처가 아니다. 화면에 예시임을 표시했다.
- 데스크톱 메뉴와 모바일 메뉴, 본문 목차, 기록 방법·FAQ 접기, 실제 가이드 이동, Google Play 검색 연결, 404 화면.
- 외부 폰트·추적·API 없이 정적 HTML로 주요 내용을 읽을 수 있다. 메뉴·접기는 JavaScript 없이 동작한다.

## 원고와 빌드

원고는 `status: draft` 그대로다. `npm run dev` / `npm run build:preview`로 초안을 포함한 미리보기를 만든다. 모든 미리보기 페이지에 noindex/nofollow, robots Disallow를 넣는다. 공개 빌드는 draft를 제외하고, 공개 홈이 없으면 dist를 지우기 전에 실패한다.

공개 전 사이트 도메인과 공개할 원고를 확정해야 한다. `SITE_URL`은 경로·검색어·인증 정보 없는 HTTPS origin만 허용한다. 공개 빌드는 canonical/사이트맵/robots를 생성하고 내부 링크를 검사한다. 외부 공개나 호스팅 등록은 이번 작업에서 하지 않았다.

브랜드 이야기는 앞선 대표님 요청에서 해석한 제안이다. 가짜 인터뷰·창업 경험·후기·통계를 넣지 않았다. 앱 기능 설명은 기존 Preview 331 원고를 유지하고 332의 시간 복구 수정은 홈페이지 기능 설명에 영향을 주지 않는다. 스토어 공개 버전과의 일치 여부는 아직 확인하지 않았다.

## 이미지 출처

`../doti_doit/app/src/main/res/drawable-nodpi/`에서 복사했다.

| 원본 | 홈페이지 |
| --- | --- |
| official_walk_10k.png | public/assets/walking.png |
| official_strength.png | public/assets/strength.png |
| official_running.png | public/assets/running.png |
| official_parents_love.png | public/assets/parents.png |
| official_breathing.png | public/assets/breathing.png |
| doti_doit_wordmark.png | public/assets/wordmark.png |

원본 워드마크 파일의 마지막 글자는 예전 청록색이다. 홈페이지에서는 알파 마스크로 원래 글자 모양만 사용하고 CSS에서 앞부분 파랑·‘잇’ 주황(#ff673f)을 적용했다. 원본 앱 파일을 수정하지 않았다.

## 확인

- 11개 페이지, 360개 내부 링크·이미지·목차 앵커, 고유 제목·설명·H1·한국어 lang·미리보기 검색 차단 검사 통과.
- 브라우저·빌드 검사 6개 통과. 320px 전체 페이지 넘침·이미지 로딩, JavaScript 없이 모바일 메뉴·접기, 가이드·목차 이동, 설치 링크·404 복귀, 공개 빌드 초안 제외·미리보기 보존 및 일부 문서만 공개했을 때 끊긴 링크 검출, canonical·사이트맵 생성.
- 1440 / 768 / 390px 홈 및 390px 미션 페이지 캡처 생성. 홈의 데스크톱·모바일 캡처를 직접 열어 배치 확인.
- WebKit/Safari·실제 iPhone/Android 브라우저는 이번에 검사하지 않았다.
- `npm ci`용 package-lock 포함. Node 22 이상, marked 18.1.2, Playwright 1.64.1.

## 다음 작업

화면을 함께 보고 문구와 밀도를 조정할 수 있다. 실제 스토어 앱 기능 대조, 검증된 상세 설치 URL, 운영자/문의/정책 링크, 공유 미리보기 이미지, 도메인·호스팅 연결을 마친 뒤 공개한다. 내부 서버 APK 설치 주소는 홈페이지에 넣지 않는다. 현재 홈은 설명용 화면 예시를 사용하므로 실제 앱 화면을 넣을 때는 공개용 예시 데이터로 새로 캡처한다.
