import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

test('all seven languages include the video guide and matching privacy link without mobile overflow', async ({ page }) => {
  const info = JSON.parse(await fs.readFile('dist/build-info.json', 'utf8'));
  await page.setViewportSize({ width: 320, height: 740 });
  for (const language of info.languages) {
    for (const route of ['/records/', '/guides/video-feed/', '/faq/']) {
      const response = await page.goto(language.path + route);
      expect(response.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', language.code);
      expect(await page.locator('main').innerText()).toContain('MP4');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const policyPath = language.code === 'ko' ? '' : language.path.slice(1) + '/';
      await expect(page.locator('footer a[href*="dotidoit/privacy/"]')).toHaveAttribute('href', 'https://kizwond.github.io/dotimoti-legal/dotidoit/privacy/' + policyPath);
      await expect(page.locator('.language-menu a')).toHaveCount(7);
    }
    await page.goto(language.path + '/guides/video-feed/');
    await expect(page.locator('main')).toContainText('512MB');
    await expect(page.locator('main')).toContainText('ZIP');
    await page.screenshot({ path: `artifacts/video-guide-${language.code}-320.png`, fullPage: true });
  }
});
