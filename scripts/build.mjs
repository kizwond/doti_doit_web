import fs from "node:fs/promises";
import path from "node:path";
import { Marked } from "marked";
import { layout, home, article, guideIndex } from "../src/templates.mjs";

const preview = process.argv.includes("--preview");
const output = path.resolve("dist");
const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const slug = (s) =>
  s.replace(/[*_`]/g, "").trim().replace(/\s+/g, "-").toLowerCase();
const pages = [];
for (const dir of ["pages", "guides"]) {
  for (const file of (await fs.readdir(`content/${dir}`))
    .filter((f) => f.endsWith(".md"))
    .sort()) {
    const source = await fs.readFile(`content/${dir}/${file}`, "utf8");
    const match = source.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
    if (!match) throw new Error(`Missing front matter: ${file}`);
    const meta = Object.fromEntries(
      match[1].split("\n").map((line) => {
        const pair = line.match(/^(\w+):\s*(.*)$/);
        if (!pair) throw new Error(`Invalid front matter: ${file}`);
        return [pair[1], pair[2].replace(/^"(.*)"$/, "$1")];
      }),
    );
    if (!/^\/(?:[a-z0-9-]+\/)*$/.test(meta.route))
      throw new Error(`Invalid route: ${meta.route}`);
    if (!["draft", "published"].includes(meta.status))
      throw new Error(`Invalid status: ${file}`);
    if (!preview && meta.status !== "published") continue;
    const toc = [];
    const seen = new Set();
    const marked = new Marked({
      renderer: {
        heading({ depth, tokens, text }) {
          let id = slug(text),
            suffix = 2;
          while (seen.has(id)) id = `${slug(text)}-${suffix++}`;
          seen.add(id);
          if (depth === 2) toc.push({ id, title: text });
          return `<h${depth} id="${escape(id)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
        },
        html({ text }) {
          return escape(text);
        },
      },
    });
    pages.push({ ...meta, body: marked.parse(match[2]), toc, kind: dir });
  }
}
if (!pages.some((p) => p.route === "/"))
  throw new Error(
    "공개용 홈 원고가 없습니다. 초안 확인은 npm run build:preview를 사용하세요.",
  );
if (new Set(pages.map((p) => p.route)).size !== pages.length)
  throw new Error("Duplicate routes");
let origin = "";
let basePath = "";
if (!preview) {
  if (!process.env.SITE_URL)
    throw new Error("공개 빌드에는 확정된 SITE_URL이 필요합니다.");
  const url = new URL(process.env.SITE_URL);
  if (
    url.protocol !== "https:" ||
    !/^(?:\/[a-zA-Z0-9_-]+)*\/?$/.test(url.pathname) ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  )
    throw new Error("SITE_URL must be an HTTPS URL with an optional site path");
  basePath = url.pathname.replace(/\/$/, "");
  origin = url.origin + basePath;
}
// Prefix only site-root links/assets. External URLs and in-page anchors stay intact.
const sitePaths = (html) =>
  html.replace(
    /\b(href|src)="\/(?!\/)([^"]*)"/g,
    (_, attribute, target) => `${attribute}="${basePath}/${target}"`,
  );
const guidePage = {
  title: "사용 안내",
  route: "/guides/",
  seo_title: "도티두잇 사용 안내 | 처음 시작하는 미션과 루틴",
  description:
    "첫 미션부터 걷기 기록, 운동 루틴까지. 도티두잇을 내 생활에 맞게 사용하는 방법을 살펴보세요.",
  kind: "index",
};
pages.push(guidePage);
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });
await fs.cp("public", output, { recursive: true });
for (const file of ["styles.css"])
  await fs.copyFile(`src/${file}`, `${output}/${file}`);
for (const page of pages) {
  const content =
    page.route === "/"
      ? home()
      : page.kind === "index"
        ? guideIndex(pages)
        : article(page);
  const dest = path.join(output, page.route, "index.html");
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(
    dest,
    sitePaths(layout(page, content, { preview, origin })),
  );
}
const notFound = {
  title: "페이지를 찾을 수 없어요",
  route: "/404/",
  seo_title: "페이지를 찾을 수 없어요 | 도티두잇",
  description: "도티두잇 홈이나 사용 안내에서 원하는 내용을 찾아보세요.",
};
await fs.writeFile(
  `${output}/404.html`,
  sitePaths(
    layout(
      notFound,
      '<section class="section narrow not-found"><span class="eyebrow">404</span><h1>길을 조금 벗어났네요.</h1><p>홈이나 사용 안내에서 다시 시작해보세요.</p><a class="button" href="/">홈으로 가기 <span aria-hidden="true">↗</span></a></section>',
      { preview: true, origin: "" },
    ),
  ),
);
await fs.writeFile(
  `${output}/robots.txt`,
  preview
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
if (!preview)
  await fs.writeFile(
    `${output}/sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>${escape(origin + p.route)}</loc></url>`).join("")}</urlset>`,
  );
await fs.writeFile(
  `${output}/build-info.json`,
  JSON.stringify(
    {
      mode: preview ? "preview" : "production",
      basePath,
      routes: pages.map((p) => p.route),
    },
    null,
    2,
  ),
);
await fs.writeFile(`${output}/.nojekyll`, "");
console.log(
  `Built ${pages.length} pages (${preview ? "draft preview · noindex" : "production"}) → dist/`,
);
