import {withGuideVisuals,guideLabel} from "./guide-visuals.mjs";
const e = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const arrow = '<span aria-hidden="true">→</span>';
const brand = '<span class="wordmark" aria-hidden="true"><img src="/assets/motidoit-wordmark.webp" width="2172" height="724" alt=""></span>';
const nav = [
  ["/missions/", "미션"],
  ["/routines/", "루틴"],
  ["/records/", "기록과 피드"],
  ["/guides/", "사용 안내"],
];
const link = (href, text, cls = "text-link") =>
  `<a class="${cls}" href="${href}">${text} ${arrow}</a>`;
const playBadge = (language) =>
  `<a class="play-badge" href="https://play.google.com/store/apps/details?id=com.doti.doit&amp;hl=${e(language.code)}"><img src="/assets/play-badges/${language.code}.png" alt="Google Play에서 앱 설치하기" width="646" height="250"></a>`;
const illustration = (name, alt, cls = "") =>
  `<img class="${cls}" src="/assets/${name}.png" alt="${alt}" width="512" height="512" loading="lazy" decoding="async">`;
export function layout(page, content, { preview, origin, styleVersion }) {
  const navlinks = nav
    .map(
      ([href, label]) =>
        `<a href="${href}" ${page.route === href ? 'aria-current="page"' : page.route.startsWith(href) ? 'class="current-section"' : ""}>${label}</a>`,
    )
    .join("");
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(page.seo_title)}</title><meta name="description" content="${e(page.description)}"><meta name="theme-color" content="#f8f7f2">${preview ? '<meta name="robots" content="noindex, nofollow">' : `<link rel="canonical" href="${e(origin + page.route)}">`}<meta property="og:type" content="website"><meta property="og:locale" content="ko_KR"><meta property="og:site_name" content="모티두잇"><meta property="og:title" content="${e(page.seo_title)}"><meta property="og:description" content="${e(page.description)}">${origin ? `<meta property="og:url" content="${e(origin + page.route)}">` : ""}<link rel="icon" href="/favicon.png" type="image/png" sizes="96x96"><link rel="stylesheet" href="/styles.css?brand=7f0955a49b74&amp;v=${e(styleVersion)}"></head>
 <body><a class="skip-link" href="#main">본문으로 바로가기</a><header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="모티두잇 홈">${brand}</a><nav class="desktop-nav" aria-label="주 메뉴">${navlinks}</nav><details class="mobile-menu"><summary aria-label="메뉴 열기"><span></span><span></span></summary><nav aria-label="모바일 메뉴">${navlinks}<a href="/faq/">자주 묻는 질문</a></nav></details></div></header>
 <main id="main">${content}</main>
 <footer class="site-footer"><div class="footer-top"><div><a class="brand" href="/" aria-label="모티두잇 홈">${brand}</a><p>내가 정한 일, 내가 쌓아가는 하루.</p></div><nav aria-label="하단 메뉴"><div><a href="/guides/">사용 안내</a><a href="/faq/">자주 묻는 질문</a><a href="/download/">앱 설치하기</a></div><div><a href="/about/">모티두잇 이야기</a><a href="/dotimoti/"${page.route === "/dotimoti/" ? ' aria-current="page"' : ""}>모티도티</a></div><div><a href="https://kizwond.github.io/dotimoti-legal/dotidoit/privacy/">모티두잇 개인정보처리방침</a><a href="https://kizwond.github.io/dotimoti-legal/dotimoti/privacy/">모티도티 개인정보처리방침</a></div></nav></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} <span>모티두잇</span></span></div></footer></body></html>`;
}
export function home(language) {
  const features = [
    ["/missions/", "criteria", "미션 정하기", "준비된 목표를 고르거나 나만의 목표를 만들어요."],
    ["/routines/", "routine-edit", "루틴 따라 하기", "운동이나 공부에 필요한 활동과 시간을 순서대로 정해요."],
    ["/records/", "progress", "실천 기록하기", "앱으로 측정하거나 직접 입력하고, 사진과 메모를 남겨요."],
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
  <section class="entry-hero">
    <div class="wrap entry-hero-inner">
      <div class="entry-intro">
        <div class="hero-app-identity"><img class="app-launcher" src="/assets/motidoit-app-icon.webp" alt="MotiDoit" width="56" height="56"><p class="studio-eyebrow">작은 실천이 쌓이는 곳</p></div>
        <h1>내 목표를 정하고,<br><span>실천을 기록하세요.</span></h1>
        <p class="studio-description"><span class="studio-description-long">걷기, 운동, 공부처럼 꾸준히 하고 싶은 일을 정해 보세요. 모티두잇에서 실천하고 얼마나 해냈는지 확인할 수 있어요.</span><span class="studio-description-short">내가 정한 일, 내가 쌓아가는 하루.</span></p>
        <div class="entry-actions">${playBadge(language)}${link("/guides/start-a-mission/", "첫 미션 시작하기", "entry-secondary")}</div>
        <div class="studio-principles"><span>나의 목표</span><span>나의 속도</span><span>나의 기록</span></div>
      </div>
      <figure class="entry-example">
        <div class="ui-pop-scene">
          <div class="ui-pop-panel ui-pop-main"><img class="studio-hero-visual" src="/assets/home-record.webp" width="800" height="1159" alt="실제 앱 화면 · 한국어 예시" fetchpriority="high"></div>
          <div class="ui-pop-panel ui-pop-routine" aria-hidden="true"><img src="/assets/guide-details/routine-run.webp" width="800" height="438" alt=""></div>
        </div>
        <figcaption>실제 앱 화면 · 한국어 예시</figcaption>
      </figure>
    </div>
  </section>
  <section class="entry-features wrap" aria-labelledby="entry-features">
    <div class="studio-section-heading"><div><p class="studio-eyebrow">나답게 이어가는 실천</p><h2 id="entry-features">모티두잇으로 할 수 있는 일</h2></div><p>내가 정한 일, 내가 쌓아가는 하루.</p></div>
    <div class="entry-feature-grid">${features.map(([href, image, title, description], i) => `
      <a class="entry-feature" href="${href}">
        <div class="studio-feature-copy"><h3>${title}</h3><p>${description}</p></div>
        <div class="feature-ui-preview" aria-hidden="true"><img src="/assets/guide-details/${image}.webp" width="800" height="${({criteria:384,'routine-edit':710,progress:699})[image]}" alt="" loading="lazy" decoding="async"></div>
        <span class="studio-feature-arrow" aria-hidden="true">→</span>
      </a>`).join("")}
    </div>
  </section>
  <section class="studio-guide-section wrap" aria-labelledby="studio-guides">
    <div class="studio-guide-heading"><p class="studio-eyebrow">한 걸음씩, 차근차근</p><h2 id="studio-guides">사용 안내</h2>${link("/guides/", "사용 안내 모두 보기")}</div>
    <ol class="entry-guide-list">${guides.map(([href, title], i) => `<li><a href="${href}"><span class="studio-guide-number" aria-hidden="true">0${i+1}</span><h3>${title}</h3><span class="studio-guide-arrow" aria-hidden="true">↗</span></a></li>`).join("")}</ol>
  </section>
  <section class="entry-support" aria-label="사용 안내와 자주 묻는 질문">
    <div class="wrap entry-help">
      <div><p class="studio-eyebrow">시작하기 전, 알아두세요</p><h2>자주 묻는 질문</h2>${link("/faq/", "질문과 답 모두 보기")}</div>
      <div class="faq-list">${questions.map(([question, answer]) => `<details><summary>${question}<span class="chevron" aria-hidden="true">⌄</span></summary><p>${answer}</p></details>`).join("")}</div>
    </div>
  </section>
  <section class="studio-start wrap" aria-labelledby="studio-start-title"><img class="studio-start-art" src="/assets/strength.png" width="512" height="512" alt="" loading="lazy"><div><img class="start-app-icon app-launcher" src="/assets/motidoit-app-icon.webp" alt="MotiDoit" width="48" height="48" loading="lazy"><p class="studio-eyebrow">나의 목표, 나의 실천</p><h2 id="studio-start-title">오늘의 작은 실천을<br>시작해 보세요.</h2><p>내가 정한 일, 내가 쌓아가는 하루.</p></div><div class="studio-start-action">${playBadge(language)}</div></section>
  <section class="wrap entry-related" id="dotimoti" aria-label="모티도티 알아보기">
    <div class="moti-symbol"><img src="/assets/motidoti-wordmark.svg?v=7f0955a49b74" width="169" height="43" alt="MotiDoti" class="moti-wordmark"></div>
    <div class="studio-related-copy"><h2>함께 실천하고, 서로 응원해요.</h2><p class="moti-status">새로운 모티도티를 준비하고 있어요.</p></div>
    ${link("/dotimoti/", "모티도티 알아보기")}
  </section>`;
}
const firstMission = ["/guides/start-a-mission/", "첫 미션 시작하기"];
const allGuides = ["/guides/", "사용 안내 모두 보기"];
const nextPages = {
  "/missions/": firstMission,
  "/routines/": ["/guides/exercise-routine/", "운동 루틴 활용하기"],
  "/records/": ["/guides/video-feed/", "동영상 피드 만들기"],
  "/faq/": allGuides,
  "/download/": firstMission,
  "/about/": ["/missions/", "미션 알아보기"],
  "/dotimoti/": ["/", "모티두잇 둘러보기"],
  "/guides/start-a-mission/": ["/download/", "앱 설치하기"],
  "/guides/walking-records/": ["/records/", "기록과 피드"],
  "/guides/exercise-routine/": ["/routines/", "루틴 알아보기"],
  "/guides/video-feed/": ["/records/", "기록과 피드"],
};

const pageImages = {
  "/missions/": "parents",
  "/routines/": "strength",
  "/records/": "running",
  "/about/": "breathing",
  "/dotimoti/": "moti-sprouts",
  "/guides/start-a-mission/": "parents",
  "/guides/walking-records/": "walking",
  "/guides/exercise-routine/": "strength",
  "/guides/video-feed/": "running",
};

function breadcrumbs(parent, current) {
  return `<nav class="breadcrumbs" aria-label="현재 위치">
    <a href="/">홈</a><span aria-hidden="true">/</span>
    ${parent ? '<a href="/guides/">사용 안내</a><span aria-hidden="true">/</span>' : ""}
    <span aria-current="page">${e(current)}</span>
  </nav>`;
}

export function article(page) {
  const isDownload = page.route === "/download/";
  // Keep the old address usable, without repeating the feature guides or another install step.
  if(isDownload)return `<section class="download-direct wrap"><header class="article-heading"><div><h1>앱 설치하기</h1><p>Android 기기의 설치 가능 여부는 Google Play에서 확인할 수 있어요.</p></div></header>${playBadge(page.language)}</section>`;
  const image = pageImages[page.route];
  const heading = page.heading || `<h1>${e(page.title)}</h1>`;
  const [href, label] = nextPages[page.route] ?? allGuides;
  const toc = page.toc
    .map(({ id, title }) => `<li><a href="#${e(id)}">${e(guideLabel(title))}</a></li>`)
    .join("");
  return `
  <div class="article-shell wrap">
    ${breadcrumbs(page.kind === "guides", page.title)}
    <header class="article-heading${image ? " with-illustration" : ""}">
      <div>${heading}<p>${e(page.description)}</p></div>
      ${image ? illustration(image, "", "article-illustration") : ""}
    </header>
    <div class="article-grid${!toc ? " single-column" : ""}">
      ${!toc ? "" : `<aside class="article-toc">
        <nav aria-label="본문 목차"><p>이 페이지에서</p><ul>${toc}</ul></nav>
      </aside>`}
      <article class="prose${page.route==="/faq/"?" prose-faq":""}">${withGuideVisuals(page)}</article>
      <div class="article-next">${link(href, label, "button")}</div>
    </div>
  </div>`;
}

export function guideIndex(page, pages) {
  const guideRoutes = [
    "/guides/start-a-mission/",
    "/guides/walking-records/",
    "/guides/exercise-routine/",
    "/guides/video-feed/",
  ];
  return `<section class="section wrap guide-index">
    ${breadcrumbs(false, page.title)}
    <header class="article-heading"><div><h1>${e(page.title)}</h1><p>${e(page.description)}</p></div></header>
    <div class="guide-links">${guideRoutes.map((route) => {
      const guide = pages.find((item) => item.route === route);
      if (!guide) return "";
      return `<a href="${route}">
        ${illustration(pageImages[route], "")}
        <div><h2>${e(guide.title)}</h2><p>${e(guide.description)}</p></div>${arrow}
      </a>`;
    }).join("")}</div>
    <div class="topic-links">${link("/faq/", "자주 묻는 질문")}${link("/download/", "앱 설치하기")}</div>
  </section>`;
}
