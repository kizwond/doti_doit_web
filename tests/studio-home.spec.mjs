import {test,expect} from '@playwright/test';
import fs from 'node:fs/promises';
test('studio home fits all languages and screen sizes without clipped content',async({page})=>{
 test.setTimeout(60000);const checks=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/google-analytics|googletagmanager/,r=>r.abort());
 for(const lang of ['','en/','ja/','zh-hans/','zh-hant/','es/','vi/'])for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});await page.goto('/'+lang);
  const geometry=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,
   boxes:[...document.querySelectorAll('.entry-intro,.entry-feature,.studio-start-action,.header-inner')].map(e=>{const r=e.getBoundingClientRect();return {name:e.className,left:r.left,right:r.right};}),
   text:[...document.querySelectorAll('.studio-feature-copy')].map(e=>{const r=e.getBoundingClientRect(),p=e.closest('.entry-feature').getBoundingClientRect();return {left:r.left-p.left,right:p.right-r.right,bottom:p.bottom-r.bottom,imageGap:e.closest('.entry-feature').querySelector('.feature-ui-preview img').getBoundingClientRect().top-r.bottom};})}));
  expect(geometry.overflow,lang+width).toBe(false);
  for(const r of geometry.boxes){expect(r.left,lang+width+' '+r.name).toBeGreaterThanOrEqual(-1);expect(r.right,lang+width+' '+r.name).toBeLessThanOrEqual(width+1);}
  for(const r of geometry.text){expect(r.left).toBeGreaterThanOrEqual(0);expect(r.right).toBeGreaterThanOrEqual(0);expect(r.bottom).toBeGreaterThanOrEqual(0);expect(r.imageGap).toBeGreaterThanOrEqual(12);}
  await expect(page.locator('h1')).toHaveCount(1);if(lang)expect(await page.locator('main').innerText()).not.toMatch(/[가-힣]/);
  checks.push({lang:lang||'ko',width,overflow:false,interactiveBoxesInsideViewport:true,featureCopyNotClipped:true});
 }
 await fs.mkdir('test-results/studio-home',{recursive:true});
 for(const [name,width,height]of[['after-desktop',1440,1080],['after-mobile',390,844],['after-tablet',768,1024]]){
  await page.setViewportSize({width,height});await page.goto('/');
  for(const img of await page.locator('img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());}
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'test-results/studio-home/'+name+'.png',fullPage:true});
 }
 expect(errors).toEqual([]);await fs.writeFile('test-results/studio-home/responsive-verification.json',JSON.stringify({checks,consoleErrors:errors,analyticsRequestsBlocked:true},null,2)+'\n');
});
