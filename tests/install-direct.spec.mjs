import{test,expect}from'@playwright/test';
import{languages}from'../src/languages.mjs';
test('install actions go directly to Google Play without a repeated landing step',async({page})=>{
 for(const language of languages){
  await page.goto(language.path+'/');
  await expect(page.locator('.studio-start-action a')).toHaveCount(1);
  const store=`https://play.google.com/store/apps/details?id=com.doti.doit&hl=${language.code}`;
  await expect(page.locator('.studio-start-action a')).toHaveAttribute('href',store);
  await expect(page.locator('.header-cta,header a[href*="play.google.com"]')).toHaveCount(0);
  await expect(page.locator('.hero-app-identity .app-launcher')).toBeVisible();
  const linkStyle=await page.locator('.entry-secondary').evaluate(e=>{const s=getComputedStyle(e);return{background:s.backgroundColor,border:s.borderTopWidth,shadow:s.boxShadow};});
  expect(linkStyle).toEqual({background:'rgba(0, 0, 0, 0)',border:'0px',shadow:'none'});
  await expect(page.locator(`a[href="${language.path}/download/"]`)).toHaveCount(0);
  await page.goto(language.path+'/guides/');
  await expect(page.locator('.site-header a[href*="play.google.com"], main a[href*="play.google.com"]')).toHaveCount(0);
  await page.goto(language.path+'/download/');
  await expect(page.locator('main .play-badge')).toHaveCount(1);
  await expect(page.locator('main .play-badge')).toHaveAttribute('href',store);
  await expect(page.locator('main h2,.article-toc,.article-next')).toHaveCount(0);
 }
});
