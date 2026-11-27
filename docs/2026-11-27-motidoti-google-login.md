# 모티도티 Google 로그인 안내 — 2026-11-27

모티도티 소개 페이지 7개 언어에 Google 로그인·이메일 인증 가입, Google 비밀번호 미수집, 기존 계정 연결 시 비밀번호 확인을 안내한다. 기본 신원 범위만 사용하며 기존 계정의 기록을 다른 계정에 자동 병합하지 않는다.

함께 확인한 계정 삭제 링크가 기존 Mongo 서비스 주소에 남아 있어 7개 언어 모두 새 PostgreSQL API의 `/dotimoti-api/next/account/delete/`로 맞췄다. 공개 개인정보처리방침의 기존 주소는 유지한다.

검증: 공개 SITE_URL로91페이지 생성·4093개 로컬 링크/에셋/앵커 검사 통과. 번역 JSON은 `/dotimoti/` 항목만 변경했음을 기존 커밋과 비교했다. 모티두잇 본문·로고·Analytics 설정은 변경하지 않는다.

앱/실제 Google 인증·공개 프리뷰 결과는 `doti_moti/docs/handoffs`의 Google 로그인 최종 인계를 따른다. 정식 Play/AAB와 AWS는 이번 작업 대상이 아니다.
