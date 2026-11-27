import {test,expect} from '@playwright/test';
import fs from 'node:fs/promises';
import {expectImagesToLoad} from './image-check.mjs';
const languages=[['ko',''],['en','/en'],['ja','/ja'],['zh-Hans','/zh-hans'],['zh-Hant','/zh-hant'],['es','/es'],['vi','/vi']];

test('all 91 pages keep their language, readable layout and working images at 320px', async({page})=>{
 test.setTimeout(150000);
 await page.setViewportSize({width:320,height:800});
 const info=JSON.parse(await fs.readFile('dist/build-info.json','utf8'));
 expect(info.routes).toHaveLength(91);
 for(const route of info.routes){
  expect((await page.goto(route)).status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  const code=languages.find(([,p])=>p && route.startsWith(p+'/'))?.[0] || 'ko';
  await expect(page.locator('html')).toHaveAttribute('lang',code);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route).toBe(true);
  expect(await page.locator('.language-menu a').count()).toBe(7);
  const text=await page.locator('main').innerText();
  if(code!=='ko')expect(text,route).not.toMatch(/[가-힣]/);
  await expectImagesToLoad(page);
  const base=languages.find(([language])=>language===code)[1];
  if(route===base+'/' || route===base+'/download/'){
   const install=page.locator('main .play-badge');
   await expect(install).toHaveAttribute('href',`https://play.google.com/store/apps/details?id=com.doti.doit&hl=${code}`);
   await expect(install.locator('img')).toHaveAttribute('src',`/assets/play-badges/${code}.png`);
   if(route===base+'/'){
    await expect(page.locator('.entry-actions a[href$="/guides/start-a-mission/"]')).toHaveAttribute('href',base+'/guides/start-a-mission/');
    expect(await page.locator('.entry-feature').evaluateAll(links=>links.map(link=>link.getAttribute('href')))).toEqual(['/missions/','/routines/','/records/'].map(path=>base+path));
   }
  }
 }
});

test('language links retain the current article and navigation works without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const page=await context.newPage();
 try{
  await page.goto('http://127.0.0.1:4173/records/');
  for(const [code,prefix] of languages){
   await page.locator('.language-menu summary').click();
   await page.locator(`.language-menu a[lang="${code}"]`).click();
   await expect(page).toHaveURL(`http://127.0.0.1:4173${prefix}/records/`);
   await expect(page.locator('html')).toHaveAttribute('lang',code);
   await expect(page.locator('.language-menu a[aria-current]')).toHaveAttribute('lang',code);
   // Follow a content link and keep the selected locale.
   await page.locator(`.prose a[href="${prefix}/missions/"]`).click();
   await expect(page).toHaveURL(`http://127.0.0.1:4173${prefix}/missions/`);
   await page.goto(`http://127.0.0.1:4173${prefix}/records/`);
  }
 }finally{await context.close();}
});

test('localized home and language-menu screenshots',async({page})=>{
 await fs.mkdir('test-results/screenshots',{recursive:true});
 for(const [code,prefix] of languages){
  for(const width of [390,1440]){
   await page.setViewportSize({width,height:1000});
   await page.goto(prefix+'/');
   await page.locator('footer').scrollIntoViewIfNeeded();
   await page.evaluate(()=>scrollTo(0,0));
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${code}/${width}`).toBe(true);
   await page.screenshot({path:`test-results/screenshots/${code}-${width}.png`,fullPage:true});
  }
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto('/ja/records/');
 await page.locator('.language-menu summary').click();
 await page.screenshot({path:'test-results/screenshots/ja-language-menu.png'});
});
