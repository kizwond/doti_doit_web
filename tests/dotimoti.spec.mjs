import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import { languages } from '../src/languages.mjs';

test('DotiMoti introduction is discoverable and localized without suggesting a released app', async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 320, height: 860 });
  for (const language of languages) {
    const prefix = language.path;
    await page.goto(prefix + '/');
    const section = page.locator('#dotimoti');
    await expect(section).toBeVisible();
    await expect(section.locator('.moti-status')).not.toBeEmpty();
    await section.locator('a').click();
    await expect(page).toHaveURL(new RegExp(prefix + '/dotimoti/$'));
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', language.code);
    await expect(page.locator('.prose > p strong').first()).toBeVisible();
    await expect(page.locator('.prose a[href*="downloads/"]')).toHaveCount(0);
    await expect(page.locator('.download-box')).toHaveCount(0);
    await expect(page.locator('.article-next a')).toHaveAttribute('href', prefix + '/');
    await expect(page.locator('.desktop-nav a[aria-current="page"]')).toHaveAttribute('href', prefix + '/dotimoti/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (language.code !== 'ko') expect(await page.locator('main').innerText()).not.toMatch(/[가-힣]/);
    const toc = page.locator('.article-toc a[href^="#"]').first();
    await toc.click();
    const anchor = await toc.getAttribute('href');
    await expect(page.locator(`[id="${decodeURIComponent(anchor.slice(1))}"]`)).toBeInViewport();
  }
});

test('new navigation and product section fit small phones, tablets and desktops', async ({ page }) => {
  test.setTimeout(90000);
  await fs.mkdir('test-results/dotimoti', { recursive: true });
  for (const prefix of ['', '/en', '/es']) {
    for (const width of [320, 390, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 960 });
      await page.goto(prefix + '/');
      await page.locator('#dotimoti').scrollIntoViewIfNeeded();
      await expect.poll(() => page.locator('#dotimoti img').evaluateAll(images => images.every(i => i.complete && i.naturalWidth > 0))).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), prefix + '/' + width).toBe(true);
      expect(await page.locator('.header-inner').evaluate(el => el.scrollWidth <= el.clientWidth), 'header ' + prefix + '/' + width).toBe(true);
      if (!prefix && [390, 1440].includes(width)) await page.locator('#dotimoti').screenshot({ path: `test-results/dotimoti/home-section-${width}.png` });
    }
  }
});
