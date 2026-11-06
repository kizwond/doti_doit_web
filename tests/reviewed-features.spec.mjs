import {test,expect} from '@playwright/test';
const cases=[
 ['ko','','측정값(직접기록 포함)',['리포트','숫자 강조','다이어리','미니멀'],'언어'],
 ['en','/en','Measured values (includes manual entries)',['Report','Big numbers','Journal','Minimal'],'Language'],
 ['ja','/ja','測定値（手入力を含む）',['レポート','数値を強調','日記','ミニマル'],'言語'],
 ['zh-Hans','/zh-hans','测量值（含手动记录）',['报告','突出数字','日记','极简'],'语言'],
 ['zh-Hant','/zh-hant','測量值（含手動紀錄）',['報告','突出數字','日記','極簡'],'語言'],
 ['es','/es','Mediciones (incluye registros manuales)',['Informe','Cifras grandes','Diario','Minimalista'],'Idioma'],
 ['vi','/vi','Số đo (gồm bản ghi nhập tay)',['Báo cáo','Số nổi bật','Nhật ký','Tối giản'],'Ngôn ngữ'],
];
test('latest feed choices, designs and privacy language links match all seven app locales',async({page})=>{
 test.setTimeout(90000);await page.setViewportSize({width:320,height:860});
 for(const [code,prefix,mixed,designs,aria] of cases){
  await page.goto(prefix+'/records/');
  const main=page.locator('main');await expect(main).toContainText(mixed);
  for(const design of designs)await expect(main).toContainText(design);
  await expect(page.locator('.language-menu summary')).toHaveAttribute('aria-label',aria);
  const policy='https://kizwond.github.io/dotimoti-legal/dotidoit/privacy/'+(prefix?prefix.slice(1)+'/':'');
  await expect(page.locator('footer a[href*="dotimoti-legal"]')).toHaveAttribute('href',policy);
  for(const route of ['/records/','/routines/','/guides/exercise-routine/','/missions/','/faq/','/guides/video-feed/']){
   await page.goto(prefix+route);await expect(page.locator('html')).toHaveAttribute('lang',code);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),code+route).toBe(true);
  }
 }
});
