import {test,expect} from '@playwright/test';
import {languages} from '../src/languages.mjs';

test('both apps have distinct public policies in the reader language without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:860}});
 const page=await context.newPage();
 try{
  for(const language of languages){
   await page.goto('http://127.0.0.1:4173'+language.path+'/dotimoti/');
   for(const app of ['dotidoit','dotimoti']){
    const href=`https://kizwond.github.io/dotimoti-legal/${app}/privacy/${language.code==='ko'?'':language.path.slice(1)+'/'}`;
    await expect(page.locator('.site-footer a[href="'+href+'"]')).toHaveCount(1);
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }finally{await context.close();}
});
