import {test,expect} from '@playwright/test';
import fs from 'node:fs/promises';
import {languages} from '../src/languages.mjs';
test('guide contents use consistent labels and relevant readable native crops in seven languages',async({page})=>{
 test.setTimeout(90000);const checks=[];
 for(const language of languages)for(const route of ['/missions/','/routines/','/records/','/guides/start-a-mission/','/guides/walking-records/','/guides/exercise-routine/','/guides/video-feed/']){
  await page.setViewportSize({width:320,height:740});await page.goto(language.path+route);
  const links=page.locator('.article-toc a');expect(await links.count()).toBeGreaterThan(0);
  for(const a of await links.all()){
   expect(await a.innerText()).not.toMatch(/^\s*\d+[.)、．:：]/u);
   const id=decodeURIComponent((await a.getAttribute('href')).slice(1));expect(await page.evaluate(id=>!!document.getElementById(id),id)).toBe(true);
  }
  const figures=page.locator('.guide-detail');expect(await figures.count()).toBeGreaterThanOrEqual(2);
  for(const img of await figures.locator('img').all()){
   await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());
   const r=await img.boundingBox();expect(r.width).toBeGreaterThanOrEqual(230);expect(r.x).toBeGreaterThanOrEqual(0);expect(r.x+r.width).toBeLessThanOrEqual(320);
   expect(await img.evaluate(e=>e.naturalWidth)).toBe(800);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  if(language.code!=='ko')expect(await page.locator('main').innerText()).not.toMatch(/[가-힣]/);
  checks.push({language:language.code,route,figures:await figures.count(),noOverflow:true,contentsWithoutNumbers:true});
 }
 await fs.mkdir('test-results/guide-visuals',{recursive:true});
 for(const [route,width,name]of[['missions',1440,'missions-desktop'],['routines',390,'routines-mobile'],['records',1440,'records-desktop'],['guides/video-feed',390,'video-mobile']]){
  await page.setViewportSize({width,height:1000});await page.goto('/'+route+'/');
  for(const img of await page.locator('img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());}
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'test-results/guide-visuals/'+name+'.png',fullPage:true});
 }
 await fs.writeFile('test-results/guide-visuals/verification.json',JSON.stringify({checks},null,2)+'\n');
});
