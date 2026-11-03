import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
const cases=[['ko','','미션 기록하기','측정해서 기록하기','일시정지'],['en','/en','Record mission','Measure and record','Pause'],['ja','/ja','ミッションを記録','計測して記録','一時停止'],['zh-Hans','/zh-hans','记录任务','测量并记录','暂停'],['zh-Hant','/zh-hant','記錄任務','測量並記錄','暫停'],['es','/es','Registrar misión','Medir y registrar','Pausa'],['vi','/vi','Ghi lại nhiệm vụ','Đo và ghi lại','Tạm dừng']];
test('current recording, routine changes and card defaults in seven languages', async({page})=>{
 test.setTimeout(120000);
 await page.setViewportSize({width:320,height:860});
 await fs.mkdir('test-results/current-recording',{recursive:true});
 for(const [code,prefix,record,measure,pause] of cases){
  for(const route of ['/missions/','/routines/','/records/','/guides/start-a-mission/','/guides/exercise-routine/','/faq/']){
   await page.goto(prefix+route);
   await expect(page.locator('html')).toHaveAttribute('lang',code);
   const main=page.locator('main');
   const text=await main.innerText();
   if(route==='/records/'){expect(text).toMatch(/0[%％]/);expect(text).not.toMatch(/50\s*[%％]/);}
   if(route==='/guides/start-a-mission/' || route==='/faq/'){await expect(main).toContainText(record);await expect(main).toContainText(measure);}
   if(route==='/guides/exercise-routine/'){await expect(main).toContainText('BPM');await expect(main).toContainText(pause);}
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),code+route).toBe(true);
  }
  await page.screenshot({path:`test-results/current-recording/${code}-routine.png`,fullPage:true});
 }
});
