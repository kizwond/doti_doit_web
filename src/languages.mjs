import fs from 'node:fs';
export const languages = [
  { code: 'ko', path: '', name: '한국어', og: 'ko_KR' },
  { code: 'en', path: '/en', name: 'English', og: 'en_US' },
  { code: 'ja', path: '/ja', name: '日本語', og: 'ja_JP' },
  { code: 'zh-Hans', path: '/zh-hans', name: '简体中文', og: 'zh_CN' },
  { code: 'zh-Hant', path: '/zh-hant', name: '繁體中文', og: 'zh_TW' },
  { code: 'es', path: '/es', name: 'Español', og: 'es_ES' },
  { code: 'vi', path: '/vi', name: 'Tiếng Việt', og: 'vi_VN' },
];
export const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const entries = new Map();
for (const [i, line] of fs.readFileSync(new URL('../content/i18n/chrome.tsv',import.meta.url),'utf8').trim().split('\n').entries()) {
  const [key,...values] = line.split('\t');
  if (values.length!==6 || !values.every(Boolean) || entries.has(key)) throw Error(`Invalid chrome translation row ${i+1}`);
  entries.set(key,Object.fromEntries(languages.slice(1).map((l,j)=>[l.code,values[j]])));
}
export function translateChrome(html, language) {
  if(language.code==='ko') return html;
  const translate = text => {
    const key = text.trim();
    if(!/[가-힣]/.test(key)) return text;
    const value=entries.get(key)?.[language.code];
    if(!value) throw Error(`Missing ${language.code} UI translation: ${key}`);
    return text.replace(key,escapeHtml(value));
  };
  return html.replace(/>([^<>]+)</g,(_,text)=>'>'+translate(text)+'<')
    .replace(/\b(aria-label|alt|content)="([^"]*)"/g,(_,attr,text)=>`${attr}="${translate(text)}"`)
    .replace('lang="ko"',`lang="${language.code}"`)
    .replace('content="ko_KR"',`content="${language.og}"`);
}
export function languagePicker(language, route, routes) {
  const options=languages.filter(l=>routes.has(l.path+route));
  return `<details class="language-menu"><summary aria-label="Language / 언어">${escapeHtml(language.name)} <span aria-hidden="true">⌄</span></summary><nav aria-label="Language / 언어">${options.map(l=>`<a lang="${l.code}" hreflang="${l.code}" href="${l.path+route}" ${l.code===language.code?'aria-current="true"':''}>${escapeHtml(l.name)}</a>`).join('')}</nav></details>`;
}
