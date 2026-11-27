const e = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const arrow = '<span aria-hidden="true">→</span>';
const brand = '<span class="wordmark" aria-hidden="true"><img src="/assets/motidoit-wordmark.png" width="2172" height="724" alt=""></span>';
const nav = [
  ["/missions/", "미션"],
  ["/routines/", "루틴"],
  ["/records/", "기록과 피드"],
  ["/guides/", "사용 안내"],
];
const link = (href, text, cls = "text-link") =>
  `<a class="${cls}" href="${href}">${text} ${arrow}</a>`;
const playBadge = (language) =>
  `<a class="play-badge" href="https://play.google.com/store/apps/details?id=com.doti.doit&amp;hl=ko"><img src="/assets/play-badges/${language.code}.png" alt="Google Play에서 앱 설치하기" width="646" height="250"></a>`;
const illustration = (name, alt, cls = "") =>
  `<img class="${cls}" src="/assets/${name}.png" alt="${alt}" width="512" height="512" loading="lazy" decoding="async">`;
export function layout(page, content, { preview, origin }) {
  const navlinks = nav
    .map(
      ([href, label]) =>
        `<a href="${href}" ${page.route === href ? 'aria-current="page"' : ""}>${label}</a>`,
    )
    .join("");
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(page.seo_title)}</title><meta name="description" content="${e(page.description)}"><meta name="theme-color" content="#faf9f5">${preview ? '<meta name="robots" content="noindex, nofollow">' : `<link rel="canonical" href="${e(origin + page.route)}">`}<meta property="og:type" content="website"><meta property="og:locale" content="ko_KR"><meta property="og:site_name" content="모티두잇"><meta property="og:title" content="${e(page.seo_title)}"><meta property="og:description" content="${e(page.description)}">${origin ? `<meta property="og:url" content="${e(origin + page.route)}">` : ""}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css?brand=4e4454f9bc30"></head>
 <body${page.route === "/" || page.route === "/download/" ? ' class="entry-page"' : ""}><a class="skip-link" href="#main">본문으로 바로가기</a><header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="모티두잇 홈">${brand}</a><nav class="desktop-nav" aria-label="주 메뉴">${navlinks}</nav><a class="header-cta" href="/download/">설치 안내 ${arrow}</a><details class="mobile-menu"><summary aria-label="메뉴 열기"><span></span><span></span></summary><nav aria-label="모바일 메뉴">${navlinks}<a href="/faq/">자주 묻는 질문</a></nav></details></div></header>
 <main id="main">${content}</main>
 <footer class="site-footer"><div class="footer-top"><div><a class="brand" href="/" aria-label="모티두잇 홈">${brand}</a><p>내가 정한 일, 내가 쌓아가는 하루.</p></div><nav aria-label="하단 메뉴"><a href="/about/">모티두잇 이야기</a><a href="/guides/">사용 안내</a><a href="/faq/">자주 묻는 질문</a><a href="/dotimoti/"${page.route === "/dotimoti/" ? ' aria-current="page"' : ""}>모티도티</a><a href="/download/">시작하기</a><a href="https://kizwond.github.io/dotimoti-legal/dotidoit/privacy/">모티두잇 개인정보처리방침</a><a href="https://kizwond.github.io/dotimoti-legal/dotimoti/privacy/">모티도티 개인정보처리방침</a></nav></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} <span>모티두잇</span></span><span>하고 싶은 일을, 오늘의 실천으로.</span></div></footer></body></html>`;
}
export function home(language) {
  const features = [
    ["/missions/", "walking", "미션 정하기", "준비된 목표를 고르거나 나만의 목표를 만들어요."],
    ["/routines/", "strength", "루틴 따라 하기", "운동이나 공부에 필요한 활동과 시간을 순서대로 정해요."],
    ["/records/", "running", "실천 기록하기", "앱으로 측정하거나 직접 입력하고, 사진과 메모를 남겨요."],
  ];
  const guides = [
    ["/guides/start-a-mission/", "첫 미션 시작하기"],
    ["/guides/walking-records/", "걷기 기록하기"],
    ["/guides/exercise-routine/", "운동 루틴 활용하기"],
    ["/guides/video-feed/", "동영상 피드 만들기"],
  ];
  const questions = [
    ["미션이 있어야만 사용할 수 있나요?", "미션 없이 바로 측정할 수 있어요. 피드에서도 미션 없이 사진·동영상과 메모를 남길 수 있습니다."],
    ["모든 활동이 자동으로 기록되나요?", "자동기록은 총 걸음수 또는 마지막 휴대폰 사용 종료가 성공 기준일 때 제공됩니다. 다른 활동은 측정하거나 직접 입력해 남길 수 있어요."],
    ["저장한 기록이 자동으로 공유되나요?", "기록 저장과 외부 공유는 별개입니다. 다른 사람에게 보내고 싶을 때 공유할 앱과 상대를 선택하세요."],
  ];
  return `
  <section class="entry-hero wrap">
    <div class="entry-intro">
      <h1>내 목표를 정하고,<br><span>실천을 기록하세요.</span></h1>
      <p>걷기, 운동, 공부처럼 꾸준히 하고 싶은 일을 정해 보세요. 모티두잇에서 실천하고 얼마나 해냈는지 확인할 수 있어요.</p>
      <div class="entry-actions">${playBadge(language)}${link("/guides/start-a-mission/", "첫 미션 시작하기", "entry-secondary")}</div>
    </div>
    <figure class="entry-example">
      <div class="entry-art">
        <img src="/assets/walking.png" width="1254" height="1254" alt="">
        <div class="entry-result">
          <strong>하루 10,000보 걷기</strong>
          <p><b>7,200</b> <span>/ 10,000보</span></p>
          <div class="entry-progress" aria-hidden="true"><span></span></div>
        </div>
      </div>
      <figcaption>걷기 미션 기록 예시</figcaption>
    </figure>
  </section>
  <section class="entry-features wrap" aria-labelledby="entry-features">
    <h2 id="entry-features">모티두잇으로 할 수 있는 일</h2>
    <div class="entry-feature-grid">${features.map(([href, image, title, description]) => `
      <a class="entry-feature" href="${href}">
        ${illustration(image, "")}
        <div><h3>${title}</h3><p>${description}</p></div>
        ${arrow}
      </a>`).join("")}
    </div>
  </section>
  <section class="entry-support" aria-label="사용 안내와 자주 묻는 질문">
    <div class="wrap entry-help">
      <div>
        <h2>사용 안내</h2>
        <ul class="entry-guide-list">${guides.map(([href, title]) => `<li>${link(href, title)}</li>`).join("")}</ul>
        ${link("/guides/", "사용 안내 모두 보기")}
      </div>
      <div>
        <h2>자주 묻는 질문</h2>
        <div class="faq-list">${questions.map(([question, answer]) => `
          <details><summary>${question}<span class="chevron" aria-hidden="true">⌄</span></summary><p>${answer}</p></details>`).join("")}
        </div>
        ${link("/faq/", "질문과 답 모두 보기")}
      </div>
    </div>
  </section>
  <section class="wrap entry-related" id="dotimoti" aria-label="모티도티 알아보기">
    <div class="moti-symbol"><img src="/assets/motidoti-wordmark.svg?v=9b333cca8289" width="169" height="39" alt="MotiDoti" class="moti-wordmark"></div>
    <p class="moti-status">새로운 모티도티를 준비하고 있어요.</p>
    ${link("/dotimoti/", "모티도티 알아보기")}
  </section>`;
}
export function article(page) {
  const isDownload = page.route === "/download/";
  const category =
    page.kind === "guides" ? "차근차근, 사용 안내" : page.route === "/dotimoti/" ? "모티도티 알아보기" : "모티두잇 알아보기";
  const toc = page.toc
    .map(({ id, title }) => `<a href="#${e(id)}">${e(title)}</a>`)
    .join("");
  const image = {
    "/missions/": "parents",
    "/routines/": "running",
    "/records/": "walking",
    "/about/": "breathing",
    "/dotimoti/": "moti-sprouts",
  }[page.route];
  const installCard = `<section class="download-box" aria-labelledby="install-title">
    <div><h2 id="install-title">앱 설치하기</h2><p>Android 기기의 설치 가능 여부는 Google Play에서 확인할 수 있어요.</p></div>
    ${playBadge(page.language)}
  </section>`;
  const body = isDownload ? page.body.replace("</h1>", "</h1>" + installCard) : page.body;
  return `
  <div class="article-shell wrap${isDownload ? " install-page" : ""}">
    <div class="breadcrumbs">
      <a href="/">홈</a><span aria-hidden="true">/</span>
      ${page.kind === "guides" ? '<a href="/guides/">사용 안내</a><span aria-hidden="true">/</span>' : ""}
      <span>${e(page.title)}</span>
    </div>
    <div class="article-grid">
      <article class="prose">
        ${isDownload ? "" : `<p class="eyebrow">${category}</p>`}
        ${image ? `<div class="article-illustration">${illustration(image, page.route === "/dotimoti/" ? "모티도티의 두 새싹" : "모티두잇 활동 일러스트")}</div>` : ""}
        ${body}
      </article>
      ${isDownload ? "" : `<aside class="article-toc">
        <span class="small-label">이 페이지에서</span>
        <nav aria-label="본문 목차">${toc}</nav>
        <a class="toc-help" href="/faq/">궁금한 점이 더 있나요? ${arrow}</a>
      </aside>`}
    </div>
    <div class="article-next">
      <div><span class="small-label">${page.route === "/dotimoti/" ? "같은 마음, 두 가지 시작" : "이제 한 번 해볼까요?"}</span><h2>나의 생활에 맞는 첫 실천.</h2></div>
      ${page.route === "/dotimoti/" ? link("/", "모티두잇 둘러보기", "button") : link(isDownload ? "/guides/" : "/download/", isDownload ? "사용 안내 읽기" : "설치와 시작 안내", "button")}
    </div>
  </div>`;
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
          "/guides/video-feed/",
        ].indexOf(a.route) -
        [
          "/guides/start-a-mission/",
          "/guides/walking-records/",
          "/guides/exercise-routine/",
          "/guides/video-feed/",
        ].indexOf(b.route),
    );
  return `<section class="section wrap guide-index">
    <h1>사용 안내</h1>
    <div class="guide-links">${guides.map((page) => `
      <a href="${page.route}"><div><h2>${e(page.title)}</h2><p>${e(page.description)}</p></div>${arrow}</a>`).join("")}</div>
    <div class="topic-links">${[
    ["/missions/", "미션 알아보기"],
    ["/routines/", "루틴 알아보기"],
    ["/records/", "기록과 피드"],
    ["/faq/", "자주 묻는 질문"],
  ]
    .map(([url, title]) => link(url, title))
    .join("")}</div></section>`;
}
