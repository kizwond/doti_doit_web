import { expect } from '@playwright/test';

// Visit each illustration: images outside the viewport intentionally load lazily.
export async function expectImagesToLoad(page) {
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  }
}
