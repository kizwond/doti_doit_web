import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
const root = path.resolve("dist");
const info = JSON.parse(await fs.readFile(`${root}/build-info.json`, "utf8"));
const files = new Map();
for (const route of info.routes)
  files.set(
    route,
    await fs.readFile(path.join(root, route, "index.html"), "utf8"),
  );
const titles = new Set();
let links = 0;
for (const [route, html] of files) {
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    `${route}: expected one H1`,
  );
  assert(html.includes('lang="ko"'), `${route}: Korean language declaration`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), `${route}: unique title`);
  titles.add(title);
  assert(html.includes('<meta name="description"'), `${route}: description`);
  if (info.mode === "preview")
    assert(
      html.includes('content="noindex, nofollow"'),
      `${route}: draft indexing blocked`,
    );
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(
      raw.replaceAll("&amp;", "&"),
      `https://example.invalid${route}`,
    );
    if (url.origin !== "https://example.invalid") {
      assert.equal(url.protocol, "https:");
      continue;
    }
    const dest = decodeURIComponent(url.pathname);
    if (files.has(dest)) {
      if (url.hash)
        assert(
          files
            .get(dest)
            .includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `${route}: missing anchor ${raw}`,
        );
    } else {
      assert(!dest.endsWith("/"), `${route}: missing page ${raw}`);
      await fs.access(path.join(root, dest));
    }
    links++;
  }
}
console.log(
  `Checked ${files.size} pages: headings, metadata, ${links} local links/assets/anchors, draft indexing.`,
);
