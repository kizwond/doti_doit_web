const e = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const arrow = '<span aria-hidden="true">↗</span>';
const brand = '<span class="wordmark" aria-hidden="true"></span>';
const nav = [
  ["/about/", "도티두잇 이야기"],
  ["/missions/", "미션"],
  ["/routines/", "루틴"],
  ["/records/", "기록과 피드"],
  ["/guides/", "사용 안내"],
];
const link = (href, text, cls = "text-link") =>
  `<a class="${cls}" href="${href}">${text} ${arrow}</a>`;
const illustration = (name, alt, cls = "") =>
  `<img class="${cls}" src="/assets/${name}.png" alt="${alt}" width="512" height="512" loading="lazy" decoding="async">`;
export function layout(page, content, { preview, origin }) {
  const navlinks = nav
    .map(
      ([href, label]) =>
        `<a href="${href}" ${page.route === href ? 'aria-current="page"' : ""}>${label}</a>`,
    )
    .join("");
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(page.seo_title)}</title><meta name="description" content="${e(page.description)}"><meta name="theme-color" content="#faf9f5">${preview ? '<meta name="robots" content="noindex, nofollow">' : `<link rel="canonical" href="${e(origin + page.route)}">`}<meta property="og:type" content="website"><meta property="og:locale" content="ko_KR"><meta property="og:site_name" content="도티두잇"><meta property="og:title" content="${e(page.seo_title)}"><meta property="og:description" content="${e(page.description)}">${origin ? `<meta property="og:url" content="${e(origin + page.route)}">` : ""}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"></head>
 <body><a class="skip-link" href="#main">본문으로 바로가기</a><header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="도티두잇 홈">${brand}</a><nav class="desktop-nav" aria-label="주 메뉴">${navlinks}</nav><a class="header-cta" href="/download/">시작하기 ${arrow}</a><details class="mobile-menu"><summary aria-label="메뉴 열기"><span></span><span></span></summary><nav aria-label="모바일 메뉴">${navlinks}<a href="/faq/">자주 묻는 질문</a></nav></details></div></header>
 <main id="main">${content}</main>
 <footer class="site-footer"><div class="footer-top"><div><a class="brand" href="/" aria-label="도티두잇 홈">${brand}</a><p>내가 정한 일, 내가 쌓아가는 하루.</p></div><nav aria-label="하단 메뉴"><a href="/about/">도티두잇 이야기</a><a href="/guides/">사용 안내</a><a href="/faq/">자주 묻는 질문</a><a href="/download/">시작하기</a><a href="https://kizwond.github.io/dotimoti-legal/dotidoit/privacy/">개인정보처리방침</a></nav></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} 도티두잇</span><span>하고 싶은 일을, 오늘의 실천으로.</span></div></footer></body></html>`;
}
export function home() {
  return `
 <section class="hero wrap"><div class="hero-copy"><p class="eyebrow"><span class="orange-dot"></span> 나의 일상을 움직이는 작은 시작</p><h1>하고 싶은 일을,<br>오늘의 <span class="accent-word">실천으로.</span></h1><p class="hero-description">조금 더 걷기, 운동하기, 마음 전하기.<br>나에게 중요한 일을 정하고<br class="mobile-break"> 도티두잇과 하나씩 해보세요.</p><div class="hero-actions">${link("/download/", "도티두잇 시작하기", "button")}${link("/guides/", "어떻게 사용하는지 볼까요?")}</div><p class="hero-footnote">목표를 정하고 · 순서대로 실천하고 · 나의 기록으로 남기고</p></div>
 <div class="hero-visual"><div class="visual-caption"><span>오늘은 이런 일을 해볼까요?</span><span aria-hidden="true">✳</span></div><div class="mission-preview"><div class="preview-head"><span>나의 미션</span><span class="mini-dots" aria-hidden="true">•••</span></div><div class="walking-preview">${illustration("walking", "공원에서 가볍게 걷는 사람")}<div><span class="small-label">내 속도에 맞춰, 차근차근</span><h2>하루 10,000보 걷기</h2><p>오늘도 한 걸음 가까이.</p></div></div><div class="sample-progress"><div><strong>7,200 <span>/ 10,000보</span></strong><span>72%</span></div><div class="progress-track"><span></span></div></div><div class="mini-mission">${illustration("parents", "마음을 전하는 가족")}<div><h3>부모님께 사랑한다 말하기</h3><p>생각났을 때, 한마디 전해요.</p></div><span aria-hidden="true">♡</span></div></div><p class="example-label">이해를 돕기 위해 구성한 화면과 기록 예시입니다.</p></div></section>
 <section class="everyday section wrap" aria-labelledby="everyday-title"><div class="section-heading"><div><p class="eyebrow">일상의 다양한 순간에</p><h2 id="everyday-title">운동도, 작은 약속도.<br>내가 하고 싶은 일이니까.</h2></div><p>큰 결심만 미션이 되는 건 아니에요.<br>오늘 생활에 넣고 싶은 일 하나면 충분해요.</p></div><div class="life-grid">${[
   ["walking", "걷기", "점심 먹고, 한 정거장 더."],
   ["strength", "근력 운동", "나를 위한 시간을 조금씩."],
   ["running", "달리기", "생각을 비우고 가볍게."],
   ["parents", "마음 전하기", "미뤄둔 한마디를 오늘."],
 ]
   .map(
     ([img, title, desc]) =>
       `<a href="/missions/" class="life-item">${illustration(img, `${title} 미션 일러스트`)}<div><h3>${title}</h3><p>${desc}</p></div><span aria-hidden="true">↗</span></a>`,
   )
   .join("")}</div></section>
 <section class="chapter chapter-mission"><div class="wrap split"><div class="chapter-copy"><p class="eyebrow"><span class="chapter-number">01</span> 미션 · 내가 하고 싶은 일</p><h2>목표의 기준은<br>내 생활에 맞게.</h2><p>누군가에게는 만 보, 나에게는 칠천 보.<br>준비된 미션에서 시작해도 좋고,<br>나만의 미션을 만들어도 좋아요.</p><p>얼마나 할지, 무엇을 남길지 정하고<br>시작하는 이유도 내 말로 적어보세요.</p>${link("/missions/", "미션 자세히 알아보기")}</div><div class="goal-note"><span class="note-kicker">나의 작은 약속</span><h3>조금 더 가볍게<br>출근하고 싶어서.</h3><div class="note-rule"></div><dl><div><dt>하고 싶은 일</dt><dd>하루 7,000보 걷기</dd></div><div><dt>나의 세부목표</dt><dd>가까운 거리는 걸어보기</dd></div></dl><span class="note-bottom">내가 정한 목표로 시작해요 <span aria-hidden="true">↗</span></span></div></div></section>
 <section class="chapter wrap split routine-section"><div class="routine-demo"><div class="routine-title"><span class="small-label">수행 순서 예시</span><h3>걷고, 달리고, 숨 고르기.</h3><span class="routine-pill">나에게 맞춰 조절하기</span></div><ol class="routine-steps"><li><span class="step-time">05:00</span><div><strong>가볍게 걷기</strong><span>천천히 몸을 깨워요</span></div><span class="step-dot"></span></li><li class="active-step"><span class="step-time">03:00</span><div><strong>편안한 속도로 달리기</strong><span>나만의 페이스로</span></div><span class="step-dot"></span></li><li><span class="step-time">02:00</span><div><strong>걸으며 숨 고르기</strong><span>잠깐 쉬어가는 시간</span></div><span class="step-dot"></span></li></ol><div class="repeat-note"><span aria-hidden="true">↻</span> 필요한 만큼 묶어서 반복해요</div></div><div class="chapter-copy"><p class="eyebrow"><span class="chapter-number">02</span> 루틴 · 실천하는 순서</p><h2>다음에 뭘 할지,<br>미리 정해두면 편하죠.</h2><p>준비부터 본운동, 휴식과 마무리까지.<br>여러 활동을 하나의 순서로 묶어보세요.</p><p>도티 루틴에서 가져오거나 직접 구성하고,<br>활동별 시간과 반복을 조절할 수 있어요.</p>${link("/routines/", "루틴 자세히 알아보기")}</div></section>
 <section class="record-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow"><span class="chapter-number">03</span> 기록 · 오늘이 쌓이는 곳</p><h2>숫자로 남기고,<br>내 이야기로 기억해요.</h2></div><div><p>얼마나 했는지도, 그날의 기분도.<br>실천은 기록으로, 생각은 사진과 메모로 남겨요.</p>${link("/records/", "기록과 피드 알아보기")}</div></div><div class="record-layout"><div class="journal"><span class="journal-date">어느 기분 좋은 오후</span><p>늘 지나치던 길인데<br>오늘은 조금 다르게 보였다.</p><div class="journal-illustration">${illustration("walking", "산책길에서 남기는 하루의 기록")}<span>산책의 좋은 점:<br>마음도 같이 가벼워진다.</span></div><div class="journal-footer"><span>내 기록, 내 이야기</span><span aria-hidden="true">♡</span></div></div><div class="record-methods"><details open><summary><span>지금 시작한다면, 측정하기</span><span class="chevron" aria-hidden="true">⌄</span></summary><p>수행을 시작하고 필요한 데이터를 측정해요. 마친 뒤 결과를 확인하고 저장하면 됩니다.</p></details><details><summary><span>이미 마쳤다면, 직접 입력하기</span><span class="chevron" aria-hidden="true">⌄</span></summary><p>수행날짜와 필요한 값을 남겨요. 나누어 수행했다면 각각의 시각과 결과를 입력할 수 있어요.</p></details><details><summary><span>하루 걸음수는, 자동기록 연결하기</span><span class="chevron" aria-hidden="true">⌄</span></summary><p>총 걸음수 또는 스마트폰 미사용 시간이 성공 기준일 때 사용할 수 있어요. 해당 기능의 동의와 권한, 기기 지원이 필요합니다.</p></details><div class="record-aside">미션을 하지 않은 날에도 괜찮아요.<br>사진과 메모만으로 피드를 남길 수 있어요.</div></div></div></div></section>
 <section class="story-section wrap"><p class="eyebrow">도티두잇에 담고 싶은 생각</p><h2>잘한 날도, 다시 시작하는 날도.<br>내가 중요하게 생각한 일을<br>이어갈 수 있도록.</h2><p>다른 사람이 보기 좋은 목표보다, 내가 해보고 싶은 일.<br>도티두잇은 그 마음이 생활 속 작은 실천으로 이어지기를 바랍니다.</p>${link("/about/", "도티두잇 이야기 읽기")}</section>
 <section class="guide-section section wrap"><div class="section-heading"><div><p class="eyebrow">처음이라면, 여기서부터</p><h2>하나씩 알아가도 괜찮아요.</h2></div>${link("/guides/", "사용 안내 모두 보기")}</div><div class="guide-links">${[
   [
     "01",
     "첫 미션 시작하기",
     "목표를 고르고 첫 기록을 남기기",
     "start-a-mission",
   ],
   [
     "02",
     "걷기 기록하기",
     "하루 걸음수와 한 번의 산책 구분하기",
     "walking-records",
   ],
   [
     "03",
     "운동 루틴 활용하기",
     "목표와 수행 순서를 함께 준비하기",
     "exercise-routine",
   ],
 ]
   .map(
     ([n, t, d, url]) =>
       `<a href="/guides/${url}/"><span class="guide-number">${n}</span><div><h3>${t}</h3><p>${d}</p></div>${arrow}</a>`,
   )
   .join("")}</div></section>
 <section class="faq-section section wrap"><div><p class="eyebrow">궁금한 점이 있나요?</p><h2>시작 전에<br>많이 묻는 질문.</h2>${link("/faq/", "질문과 답 모두 보기")}</div><div class="faq-list"><details><summary>미션이 있어야만 사용할 수 있나요?<span class="chevron" aria-hidden="true">⌄</span></summary><p>미션 없이 바로 측정할 수 있어요. 피드에서도 미션을 연결하지 않고 사진과 메모를 남길 수 있습니다.</p></details><details><summary>모든 활동이 자동으로 기록되나요?<span class="chevron" aria-hidden="true">⌄</span></summary><p>자동기록은 총 걸음수 또는 스마트폰 미사용 시간이 성공 기준일 때 제공됩니다. 다른 활동은 측정하거나 직접 입력해 남길 수 있어요.</p></details><details><summary>저장한 기록이 자동으로 공유되나요?<span class="chevron" aria-hidden="true">⌄</span></summary><p>기록 저장과 외부 공유는 별개입니다. 다른 사람에게 보내고 싶을 때 공유할 앱과 상대를 선택하세요.</p></details></div></section>
 <section class="closing"><div class="wrap"><p>내일의 큰 결심보다, 오늘의 작은 시작.</p><h2>오늘 해보고 싶은 일,<br class="mobile-break"> 하나만 골라볼까요?</h2>${link("/download/", "도티두잇 시작하기", "button button-light")}</div></section>`;
}
export function article(page) {
  const category =
    page.kind === "guides" ? "차근차근, 사용 안내" : "도티두잇 알아보기";
  const toc = page.toc
    .map(({ id, title }) => `<a href="#${e(id)}">${e(title)}</a>`)
    .join("");
  const image = {
    "/missions/": "parents",
    "/routines/": "running",
    "/records/": "walking",
    "/about/": "breathing",
    "/download/": "walking",
  }[page.route];
  return `<div class="article-shell wrap"><div class="breadcrumbs"><a href="/">홈</a><span aria-hidden="true">/</span>${page.kind === "guides" ? '<a href="/guides/">사용 안내</a><span aria-hidden="true">/</span>' : ""}<span>${e(page.title)}</span></div><div class="article-grid"><article class="prose"><p class="eyebrow">${category}</p>${image ? `<div class="article-illustration">${illustration(image, `${e(page.title)} 소개 일러스트`)}</div>` : ""}${page.body}${page.route === "/download/" ? `<div class="download-box"><strong>Android에서 시작하기</strong><p>Google Play에서 ‘도티두잇’을 검색해보세요.<br>스토어에서 제공되는 기능과 기기 호환성을 확인할 수 있어요.</p><a class="button" href="https://play.google.com/store/search?q=%EB%8F%84%ED%8B%B0%EB%91%90%EC%9E%87&amp;c=apps&amp;hl=ko" target="_blank" rel="noopener noreferrer">Google Play에서 검색 <span class="sr-only">(새 창)</span>${arrow}</a></div>` : ""}</article><aside class="article-toc"><span class="small-label">이 페이지에서</span><nav aria-label="본문 목차">${toc}</nav><a class="toc-help" href="/faq/">궁금한 점이 더 있나요? ${arrow}</a></aside></div><div class="article-next"><div><span class="small-label">이제 한 번 해볼까요?</span><h2>나의 생활에 맞는 첫 실천.</h2></div>${link(page.route === "/download/" ? "/guides/" : "/download/", page.route === "/download/" ? "사용 안내 읽기" : "설치와 시작 안내", "button")}</div></div>`;
}
export function guideIndex(pages) {
  const guides = pages
    .filter((p) => p.kind === "guides")
    .sort(
      (a, b) =>
        [
          "/guides/start-a-mission/",
          "/guides/walking-records/",
          "/guides/exercise-routine/",
        ].indexOf(a.route) -
        [
          "/guides/start-a-mission/",
          "/guides/walking-records/",
          "/guides/exercise-routine/",
        ].indexOf(b.route),
    );
  return `<section class="section wrap guide-index"><p class="eyebrow">내 생활에 맞게, 하나씩</p><h1>처음부터 잘 몰라도<br>괜찮아요.</h1><p class="intro">목표를 정하고, 실천하고, 돌아보기.<br>필요한 순간에 하나씩 찾아 읽어보세요.</p><div class="guide-links">${guides.map((p, i) => `<a href="${p.route}"><span class="guide-number">0${i + 1}</span><div><h2>${e(p.title)}</h2><p>${e(p.description)}</p></div>${arrow}</a>`).join("")}</div><div class="topic-links">${[
    ["/missions/", "미션 알아보기"],
    ["/routines/", "루틴 알아보기"],
    ["/records/", "기록과 피드"],
    ["/faq/", "자주 묻는 질문"],
  ]
    .map(([url, title]) => link(url, title))
    .join("")}</div></section>`;
}
