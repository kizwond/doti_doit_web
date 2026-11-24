import {test,expect} from '@playwright/test';
const cases=[
 ['ko','','관리데이터',['리포트','숫자 강조','다이어리','미니멀'],'언어'],
 ['en','/en','Management data',['Report','Big numbers','Journal','Minimal'],'Language'],
 ['ja','/ja','管理データ',['レポート','数値を強調','日記','ミニマル'],'言語'],
 ['zh-Hans','/zh-hans','管理数据',['报告','突出数字','日记','极简'],'语言'],
 ['zh-Hant','/zh-hant','管理資料',['報告','突出數字','日記','極簡'],'語言'],
 ['es','/es','Datos de gestión',['Informe','Cifras grandes','Diario','Minimalista'],'Idioma'],
 ['vi','/vi','Dữ liệu quản lý',['Báo cáo','Số nổi bật','Nhật ký','Tối giản'],'Ngôn ngữ'],
];
test('latest feed choices, designs and privacy language links match all seven app locales',async({page})=>{
 test.setTimeout(90000);await page.setViewportSize({width:320,height:860});
 for(const [code,prefix,mixed,designs,aria] of cases){
  await page.goto(prefix+'/records/');
  const main=page.locator('main');await expect(main).toContainText(new RegExp(mixed,'i'));
  for(const design of designs)await expect(main).toContainText(design);
  await expect(page.locator('.language-menu summary')).toHaveAttribute('aria-label',aria);
  const policy='https://kizwond.github.io/dotimoti-legal/dotidoit/privacy/'+(prefix?prefix.slice(1)+'/':'');
  await expect(page.locator('footer a[href*="dotidoit/privacy/"]')).toHaveAttribute('href',policy);
  for(const route of ['/records/','/routines/','/guides/exercise-routine/','/missions/','/faq/','/guides/video-feed/']){
   await page.goto(prefix+route);await expect(page.locator('html')).toHaveAttribute('lang',code);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),code+route).toBe(true);
  }
 }
});
