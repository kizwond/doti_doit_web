import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import { spawnSync } from "node:child_process";
const routes = [
  "/",
  "/about/",
  "/missions/",
  "/routines/",
  "/records/",
  "/faq/",
  "/download/",
  "/guides/",
  "/guides/start-a-mission/",
  "/guides/walking-records/",
  "/guides/exercise-routine/",
];
test("every page works on small phones and has no overflow or missing assets", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBe(true);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every((i) => i.complete && i.naturalWidth > 0),
          ),
      )
      .toBe(true);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  }
  expect(errors).toEqual([]);
});
test("mobile navigation and explanations work with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await page.getByLabel("메뉴 열기").click();
  await page
    .getByRole("navigation", { name: "모바일 메뉴" })
    .getByRole("link", { name: "루틴", exact: true })
    .click();
  await expect(page).toHaveURL(/\/routines\/$/);
  await page.goto("http://127.0.0.1:4173/");
  await page.locator(".faq-list summary").first().click();
  await expect(page.locator(".faq-list details").first()).toHaveAttribute(
    "open",
    "",
  );
  await page.locator(".faq-list summary").first().click();
  await expect(page.locator(".faq-list details").first()).not.toHaveAttribute(
    "open",
    "",
  );
  await context.close();
});
test("desktop and mobile overview screenshots", async ({ page }) => {
  await fs.mkdir("test-results/screenshots", { recursive: true });
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.evaluate(() => scrollTo(0, 0));
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/screenshots/home-${width}.png`,
      fullPage: true,
    });
    if (width === 1440 || width === 390)
      await page.screenshot({
        path: `test-results/screenshots/home-${width === 1440 ? "desktop" : "mobile"}-top.png`,
      });
  }
  await page.goto("/missions/");
  await page.screenshot({
    path: "test-results/screenshots/missions-390.png",
    fullPage: true,
  });
});
test("guide links, anchors, store search and missing-page handling", async ({
  page,
}) => {
  await page.goto("/guides/");
  await page.getByRole("link", { name: /01 첫 미션 시작하기/ }).click();
  await expect(page).toHaveURL(/\/guides\/start-a-mission\/$/);
  await page
    .getByRole("navigation", { name: "본문 목차" })
    .getByRole("link", { name: "목표와 기록 항목 확인하기" })
    .click();
  await expect(
    page.locator("h2").filter({ hasText: "목표와 기록 항목 확인하기" }),
  ).toBeInViewport();
  await page.goto("/download/");
  const store = page.getByRole("link", { name: /Google Play에서 검색/ });
  await expect(store).toHaveAttribute(
    "href",
    /^https:\/\/play.google.com\/store\/search/,
  );
  expect((await page.goto("/not-a-page/")).status()).toBe(404);
  await page.getByRole("link", { name: /홈으로 가기/ }).click();
  await expect(page).toHaveURL("http://127.0.0.1:4173/");
});
test("production build excludes drafts without deleting the existing preview", async () => {
  const before = await fs.readFile("dist/index.html", "utf8");
  const result = spawnSync(process.execPath, ["scripts/build.mjs"], {
    encoding: "utf8",
  });
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain("공개용 홈 원고가 없습니다");
  expect(await fs.readFile("dist/index.html", "utf8")).toBe(before);
});

test("production emits canonical/sitemap and excludes remaining drafts", async () => {
  const os = await import("node:os");
  const path = await import("node:path");
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "doti-web-build-"));
  try {
    for (const dir of ["content", "src", "scripts", "public"])
      await fs.cp(dir, path.join(root, dir), { recursive: true });
    await fs.symlink(
      path.resolve("node_modules"),
      path.join(root, "node_modules"),
      "dir",
    );
    for (const dir of ["pages", "guides"])
      for (const name of await fs.readdir(path.join(root, "content", dir))) {
        if (!name.endsWith(".md") || name === "faq.md") continue;
        const file = path.join(root, "content", dir, name);
        await fs.writeFile(
          file,
          (await fs.readFile(file, "utf8")).replace(
            "status: draft",
            "status: published",
          ),
        );
      }
    const build = () =>
      spawnSync(process.execPath, ["scripts/build.mjs"], {
        cwd: root,
        env: { ...process.env, SITE_URL: "https://doti.example.invalid" },
        encoding: "utf8",
      });
    expect(build().status).toBe(0);
    await expect(
      fs.access(path.join(root, "dist/faq/index.html")),
    ).rejects.toThrow();
    const partial = spawnSync(process.execPath, ["scripts/check.mjs"], {
      cwd: root,
      encoding: "utf8",
    });
    expect(partial.status).not.toBe(0);
    expect(partial.stderr).toContain("missing page /faq/");
    const faq = path.join(root, "content/pages/faq.md");
    await fs.writeFile(
      faq,
      (await fs.readFile(faq, "utf8")).replace(
        "status: draft",
        "status: published",
      ),
    );
    expect(build().status).toBe(0);
    const complete = spawnSync(process.execPath, ["scripts/check.mjs"], {
      cwd: root,
      encoding: "utf8",
    });
    expect(complete.status, complete.stderr).toBe(0);
    const html = await fs.readFile(
      path.join(root, "dist/missions/index.html"),
      "utf8",
    );
    expect(html).toContain(
      '<link rel="canonical" href="https://doti.example.invalid/missions/">',
    );
    expect(html).not.toContain("noindex");
    expect(
      await fs.readFile(path.join(root, "dist/sitemap.xml"), "utf8"),
    ).toContain("https://doti.example.invalid/guides/start-a-mission/");
    expect(
      await fs.readFile(path.join(root, "dist/robots.txt"), "utf8"),
    ).toContain("Allow: /");
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
