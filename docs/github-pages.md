# GitHub Pages 배포

홈페이지 주소: https://kizwond.github.io/doti_doit_web/

## 설정

저장소는 공개이며 Settings → Pages → Build and deployment → Source는 **GitHub Actions**다. `.github/workflows/pages.yml`이 main 푸시 또는 workflow_dispatch로 실행된다. README·docs만 변경된 푸시는 배포하지 않는다.

Node 24에서 `npm ci` 후 Pages의 `base_url`을 SITE_URL로 넘겨 공개 빌드와 링크 검사를 실행한다. `dist/`만 artifact로 올리고 github-pages 환경에 배포한다. 소스·문서·검사 결과·로컬 파일은 홈페이지 배포물에 포함하지 않는다. 이 문서와 소스는 공개 저장소에서는 볼 수 있다.

빌드 작업은 contents:read, 배포 작업은 pages:write와 id-token:write만 사용한다. 별도의 PAT나 서버 SSH 키를 저장소·Actions secret에 추가하지 않았다.

## 프로젝트 경로

이 사이트는 도메인 루트가 아니라 `/doti_doit_web/` 아래에 있다. 빌더는 SITE_URL에서 프로젝트 경로를 읽어 페이지·이미지·CSS·favicon·404 복귀 링크에 붙인다. 본문 목차 앵커와 외부 링크는 유지한다. 로고 마스크 경로는 CSS 기준 상대 주소다. canonical·OG URL·사이트맵에도 동일한 주소를 사용한다.

```bash
SITE_URL=https://kizwond.github.io/doti_doit_web npm run build
npm run preview
```

로컬 공개 결과 확인: http://localhost:4173/doti_doit_web/

`npm run dev`는 프로젝트 경로 없는 로컬 미리보기이며 noindex 설정으로 초안을 포함한다. `status: draft`인 새 원고는 공개 빌드에서 제외된다. 공개 페이지에서 제외된 초안으로 링크하면 검사 실패로 배포가 중단된다.

## 콘텐츠

기존 10개 원고와 사용 안내 목록을 공개 대상으로 설정했다. 홈페이지에 수집 폼·분석 도구는 없으며 하단에서 기존 앱 개인정보처리방침을 연결한다. Google Play 연결은 검색 주소를 사용한다. 회사 서버 APK 주소를 설치 링크로 넣지 않는다.

안내는 현재 개발된 제품 구성을 바탕으로 작성했으며, 모든 스토어 설치본이 같은 기능을 제공하는지 확인한 것으로 간주하지 않는다. 설치 페이지에서 앱 버전별 차이를 안내한다. 대표님 의도를 해석한 브랜드 글은 실제 인용이나 창업 일화로 표시하지 않는다.

공개 저장소의 이전 3개 커밋을 대상으로 주요 GitHub 토큰·AWS 액세스 키·개인키 형식을 검사했고 일치하는 파일은 없었다. 전체 비밀정보가 없다는 보장을 뜻하지 않으며, Git 이력을 재작성하지 않았다.

## 검증과 운영

루트 미리보기의 기존 6개 검사와 GitHub 프로젝트 경로의 브라우저 검사 1개를 수행한다. 모바일에서 메뉴 이동·이미지·CSS 로고·본문 목차·404 복귀·사이트맵을 확인한다. 공개 결과는 canonical, 검색 차단 해제, 내부 링크·앵커·CSS 자산을 검사한다.

페이지를 공개해도 검색 결과에 즉시 등록되는 것은 아니다. 프로젝트 경로의 robots.txt는 도메인 루트 robots.txt를 대신하지 않는다. 검색 도구를 연결할 때는 이 사이트의 sitemap.xml 주소를 제출한다.

배포 상태는 저장소 Actions의 ‘홈페이지 배포’ 실행 결과와 공개 URL 응답으로 확인한다. 정식 도메인을 사용할 때는 GitHub Pages의 custom domain 설정을 변경하고 DNS를 연결한다. 다음 빌드는 Pages가 제공하는 base_url을 따르므로 프로젝트 경로도 자동으로 조정된다.
