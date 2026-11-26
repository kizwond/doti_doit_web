# 홈페이지 방문 통계 — 2026-11-26

사용자는 홈페이지 방문자 수를 담당자가 확인할 수 있게 Google Analytics 연결을 요청했다. 최초 개인 Gmail의 기존 Firebase 속성 화면에서 출발했으나, 이후 회사 계정으로 다시 진행하라고 명시했다. 회사 계정용 브라우저에서 사용자가 직접 로그인했고, 필수 직원 수1~10명을 확인받았다. Google Analytics 대한민국 서비스 약관·데이터 처리 약관 동의도 사용자가 승인한 뒤 계정·속성을 생성했다.

## 담당자가 보는 곳

- [Analytics 홈페이지 통계 열기](https://analytics.google.com/analytics/web/#/a417478783p565876445/reports/intelligenthome)
- **회사 구글 계정으로 로그인**한 뒤 계정 ‘모티두잇’, 속성 ‘모티두잇 홈페이지’를 선택한다. 기존 개인 계정의 `opensky-agent-chat` Firebase 속성은 변경하지 않았다.
- 홈에서 활성 사용자·조회수·이벤트 수와 최근30분 활성 사용자를 볼 수 있다. 보고서에서는 방문일·페이지·유입 경로 등을 확인한다. 홈페이지 내부의 별도 관리자 로그인 화면은 만들지 않았다.
- 회사 계정 소유자가 필요할 때 다른 담당자에게 Analytics 조회 권한을 부여할 수 있다. 이번 작업에서 제3자에게 권한을 추가하지 않았다.

## 계정과 데이터 소스

- 계정417478783 / 속성565876445 / 웹 스트림16417767917.
- 측정 ID **G-MLG7D07X8Q**, URL **https://kizwond.github.io/doti_doit_web/**. 측정 ID는 HTML과 Google 태그 요청에 공개되는 식별자이며 계정 접근 비밀번호나 API 비밀키가 아니다.
- 계정·속성 이름은 모티두잇을 사용한다. 웹사이트의 기존 원고·브랜드·주소를 이번 통계 작업을 이유로 바꾸지는 않았다.
- 대한민국 시간(UTC+9), 대한민국 원(KRW), 인터넷 및 통신, 직원1~10명, 웹/앱 트래픽 파악 목표로 설정했다.
- 계정의 선택적 데이터 공유4개는 모두 OFF. 웹 스트림의 향상된 측정도 실제 생성 후 다시 확인해 OFF로 저장했다. 기본 상태로 새 스트림에 다시 켜지는 동작이 있어 생성 화면의 선택만으로 완료를 선언하지 않았다.
- Android·iOS 앱 데이터 스트림, 광고 연결, Firebase 연결, 결제·유료 상품 구독을 추가하지 않았다.

## 홈페이지 동작

- 실제 공개 페이지91개에서만 통계 코드를 넣는다. 404·로컬 미리보기·빈 ID에서는 Google 통계를 실행하지 않는다. 빌드의 ID 형식 검증은 기존 출력 삭제 전에 수행한다.
- 방문자가 **통계 허용**을 선택한 뒤 Google 태그를 로드한다. 허용 전과 거절 상태에서는 Google 태그 요청·통계 이벤트가 없다. 페이지와 메뉴는 거절해도 정상 이용할 수 있다.
- 목적·수집 정보·Google 데이터 처리 안내 링크·30일 쿠키·선택 변경 경로를7개 언어로 제공한다. 선택은 이 브라우저에180일 보관한다. 앱의 개인 수행기록을 가져오거나 전송하지 않는다.
- 하단 **방문 통계 설정**에서 변경한다. 이미 허용한 방문자가 거절하면 이 사이트의 `doti_web_` 통계 쿠키만 삭제하고, Google 태그가 메모리에 남지 않도록 페이지를 새로고침한다. 다른 사이트/서비스 쿠키는 삭제하지 않는다. 이미 수집한 집계가 동의 철회로 소급 삭제되는 것은 아니다.
- 개인화 광고·Google signals를 사용하지 않는다. 통계 쿠키는 host-only·해당 사이트 경로로 제한하고30일 유효기간을 설정한다.
- `page_view`는 페이지당1개를 명시적으로 보낸다. 페이지 주소의 쿼리·해시는 제외하고 유입 사이트는 origin만 남긴다. Google Play 상세 링크 클릭은 `play_store_click`과 앱 패키지명만 보낸다. **버튼 클릭 수는 실제 설치 수가 아니다.**
- 최근 Google 태그의 자동 초기화가 스트림별 `config`보다 먼저 실행되어 중복 페이지 조회와 기본 URL이 전송되는 동작을 실제 수신 검사에서 발견했다. 공식 권고에 따라 페이지 조회 억제·개인화·쿠키·URL 설정을 **전역 `gtag('set')`에 먼저 지정**하고 스트림에도 적용했다. 실제 Google 응답에서 조회1개와 쿼리/해시가 빠진 주소, 프로젝트 경로의 전용 쿠키를 다시 확인했다. Google의 기본 세션·첫 방문 이벤트는 별도로 표시될 수 있다.
- 동의하지 않거나 광고 차단기로 차단된 방문, 봇 등 모든 방문을 정확히 세는 서비스가 아니다. 연결 이전의 방문 이력을 복원하지 않는다. 쿠키 삭제·기기/브라우저 변경에 따라 같은 사람이 다른 방문자로 집계될 수 있다.

## 변경 파일과 검증

- `analytics.config.json`: 홈페이지 전용 측정 ID. 필요하면 환경변수 `GA_MEASUREMENT_ID`로 덮어쓴다. GitHub Actions의 별도 비밀키나 회사 Google 로그인 정보를 저장소에 넣지 않는다.
- `scripts/build.mjs`: 정상 공개 빌드의 모든 언어 페이지에 한 번만 설정·지연 스크립트를 삽입하고 기존 프로젝트 경로를 유지한다.
- `public/analytics.js`, `src/styles.css`: 통계 동의·7언어 설명·철회·최소 이벤트 수집.
- `tests/analytics.spec.mjs`: 미동의/거절 시 요청0, 허용 후 페이지1회, URL 정보 최소화, Play 클릭1회, 철회 후 태그 미실행 및 다른 쿠키 보존,7언어320px 화면 확인.
- 기존 생산 빌드 테스트의 임시 저장소에도 새 설정 파일을 복사하도록 fixture를 갱신했다. 새 의존 파일이 없는 상태에서 빌드가 중단되는 검사 환경 문제를 수정했다.
- 관련 브라우저 검사13개 중10개는 최초 실행에서 통과했고, 위 fixture 보정 후 실패한 생산 빌드3개를 다시 실행해 모두 통과했다. 별도 최초 Analytics3개도 통과했다. 공개 HTML91개·프로젝트 경로·404 제외를 확인했다.

배포와 실제 수신 확인은 후속 결과에 추가한다. 앱 APK·백엔드·개인 계정의 기존 Firebase 속성은 이번 대상이 아니다.

## 배포·실제 수신 확인 완료

- 구현 커밋 `b8717d1`, Google 태그 초기화 순서 보정 커밋 **`1c65759`**를 main에 푸시했다. [최종 Pages 배포45733952230](https://github.com/kizwond/doti_doit_web/actions/runs/45733952230)이 success다. 이후 추가한 것은 검증·인계 자료뿐이다.
- 공개 페이지91개를 HTTPS GET으로 확인했고, 실제 공개 `analytics.js`·`styles.css`의 전체 해시를 로컬 소스와 대조했다. 404는 통계 제외다. [공개 확인](qa/2026-11-26-website-analytics/public-verification.json).
- **실제 공개 사이트 + 회사 설정용 Chrome**에서 허용 전 Google 요청0건, 허용 후 `page_view` **1건**과 `play_store_click` **1건**, 측정 ID 일치 및 Google HTTP204 응답을 확인했다. 전송 주소에 테스트 쿼리·해시가 포함되지 않고 쿠키가 사이트 경로 `/doti_doit_web/`에만 만들어지는 것도 확인했다. [실제 전송 확인](qa/2026-11-26-website-analytics/real-collection.json).
- 회사 Analytics 홈에서 **최근30분 활성 사용자1명**, 국가 South Korea를 실제로 확인했다. [화면](qa/2026-11-26-website-analytics/analytics-realtime.png) · [확인 기록](qa/2026-11-26-website-analytics/analytics-dashboard-confirmation.json). 초기 통계에는 설정 검증용 접속·클릭이 일부 포함된다.
- 새 속성의 누적 일별 보고서·‘수신 데이터 없음’ 안내는 Google 처리 후 갱신된다. 실시간 사용자 수는 먼저 표시되는 것을 확인했다. 초기 안내가 즉시 사라지는 것과 실제 태그 수신을 같은 것으로 판단하지 않는다.
- Google 태그 초기화 보정 후 Analytics3개 검사를 다시 통과했다. [로컬 검사 요약](qa/2026-11-26-website-analytics/local-verification.json). [공개 동의 UI](qa/2026-11-26-website-analytics/public-consent.png).

회사 로그인 비밀번호·인증 코드·Google 계정 쿠키·비밀키는 저장소나 검증 자료에 넣지 않았다. 검증용 브라우저에는 회사 계정의 Analytics 홈을 열어두었다. 개인 Gmail의 Firebase 속성은 변경하지 않았다.

## 참고한 공식 문서

- [웹 Analytics 설정](https://support.google.com/analytics/answer/14183469?hl=ko)
- [동의 모드](https://developers.google.com/tag-platform/security/guides/consent)
- [쿠키·개인화 설정](https://developers.google.com/analytics/devguides/collection/ga4/reference/config)
- [Google의 개인정보 공개 요구사항](https://support.google.com/analytics/answer/7318509?hl=ko)
- [변경된 태그 초기화와 config 처리](https://support.google.com/analytics/answer/18411054?hl=en)
