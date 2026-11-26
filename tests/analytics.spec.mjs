import {test, expect} from '@playwright/test';
import {languages} from '../src/languages.mjs';

const id='G-TEST123456';
async function fixture(page, language='ko', route='/') {
  const tagRequests=[];
  await page.route('https://www.googletagmanager.com/**',async route=>{
    tagRequests.push(route.request().url());
    await route.fulfill({contentType:'application/javascript',body:'/* Analytics mocked: no real traffic is sent. */'});
  });
  await page.route('http://127.0.0.1:4173/**',async route=>{
    if(route.request().resourceType()!=='document')return route.continue();
    const response=await route.fetch();
    const html=(await response.text()).replace('</head>',`<meta name="ga-measurement-id" content="${id}"><script defer src="/analytics.js" data-site-path="/"></script></head>`);
    await route.fulfill({response,body:html});
  });
  await page.goto(languages.find(l=>l.code===language).path+route+'?email=private@example.test#private');
  await expect(page.locator('html')).toHaveAttribute('lang',language);
  return tagRequests;
}
const events=page=>page.evaluate(()=>Array.from(window.dataLayer||[],args=>Array.from(args)));

test('no tracking before consent, refusal persists, and settings remain available',async({page})=>{
  const requests=await fixture(page);
  await expect(page.locator('#analytics-notice')).toBeVisible();
  expect(requests).toEqual([]);
  expect(await events(page)).toEqual([]);
  await page.getByRole('button',{name:'허용하지 않음',exact:true}).click();
  await expect(page.locator('#analytics-notice')).toBeHidden();
  await page.reload();
  await expect(page.locator('#analytics-notice')).toBeHidden();
  expect(requests).toEqual([]);
  await page.getByRole('button',{name:'방문 통계 설정',exact:true}).click();
  await expect(page.locator('#analytics-notice')).toBeVisible();
});

test('opt-in counts one page view and store click; withdrawal stops tracking and clears only site cookies',async({page})=>{
  const requests=await fixture(page,'ko','/download/');
  await page.getByRole('button',{name:'통계 허용',exact:true}).click();
  await expect.poll(()=>requests.length).toBe(1);
  const queue=await events(page);
  const config=queue.find(e=>e[0]==='config')[2];
  const defaults=queue.find(e=>e[0]==='set')[1];
  expect(defaults).toMatchObject({send_page_view:false,cookie_prefix:'doti_web',cookie_path:'/',allow_google_signals:false,allow_ad_personalization_signals:false});
  expect(queue.findIndex(e=>e[0]==='set')).toBeLessThan(queue.findIndex(e=>e[0]==='js'));
  expect(config.allow_google_signals).toBe(false);
  expect(config.allow_ad_personalization_signals).toBe(false);
  expect(config.page_location).toBe('http://127.0.0.1:4173/download/');
  expect(queue.filter(e=>e[0]==='event'&&e[1]==='page_view')).toHaveLength(1);
  expect(JSON.stringify(queue)).not.toContain('private@example.test');
  await page.evaluate(()=>{
    document.cookie='doti_web_ga=test; path=/';
    document.cookie='_ga_TEST123456=old-property-session; path=/';
    document.cookie='unrelated=keep; path=/';
    document.addEventListener('click',e=>e.preventDefault());
  });
  await page.locator('a[href*="play.google.com/store/apps/details"]').first().click();
  expect((await events(page)).filter(e=>e[0]==='event'&&e[1]==='play_store_click')).toHaveLength(1);
  await page.getByRole('button',{name:'방문 통계 설정',exact:true}).click();
  await Promise.all([page.waitForEvent('load'),page.getByRole('button',{name:'허용하지 않음',exact:true}).click()]);
  await expect(page.locator('#analytics-notice')).toBeHidden();
  expect(requests).toHaveLength(1);
  const cookies=await page.context().cookies();
  expect(cookies.some(c=>c.name==='doti_web_ga')).toBe(false);
  expect(cookies.some(c=>c.name==='_ga_TEST123456')).toBe(false);
  expect(cookies.some(c=>c.name==='unrelated'&&c.value==='keep')).toBe(true);
  expect(await events(page)).toEqual([]);
});

test('all seven languages fit small screens and load no analytics by default',async({browser})=>{
  for(const language of ['ko','en','ja','zh-Hans','zh-Hant','es','vi']) {
    const context=await browser.newContext({viewport:{width:320,height:740}});
    const page=await context.newPage();
    const requests=await fixture(page,language);
    await expect(page.locator('#analytics-notice')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if(language!=='ko')expect(await page.locator('#analytics-notice').innerText()).not.toMatch(/[가-힣]/);
    expect(requests).toEqual([]);
    await context.close();
  }
});
