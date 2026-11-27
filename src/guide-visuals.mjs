// Section labels match their contents links; original anchor IDs remain unchanged.
// Images contain native app pixels only; crop provenance is checked in with the source documentation.
const visualSteps={
 '/missions/':{0:'catalog',1:'criteria',2:'record',4:'feed'},
 '/routines/':{1:'routine-edit',2:'pause',3:'criteria'},
 '/records/':{0:'statistics',1:'progress',3:'feed',4:'editor-example'},
 '/guides/start-a-mission/':{0:'catalog',1:'criteria',2:'record',4:'feed'},
 '/guides/walking-records/':{1:'criteria',2:'measurement',3:'progress'},
 '/guides/exercise-routine/':{0:'criteria',1:'routine-edit',2:'routine-run',3:'pause',4:'finish'},
 '/guides/video-feed/':{1:'video-trim'},
 '/faq/':{2:'catalog',7:'record',12:'measurement',15:'video-trim'},
};
const dimensions={"catalog":[800,757],"criteria":[800,431],"record":[800,565],"routine-edit":[800,721],"routine-run":[800,485],"statistics":[800,928],"progress":[800,710],"feed":[800,977],"measurement":[800,537],"video-trim":[800,486],"editor-tools":[800,208],"finish":[800,420],"pause":[800,222]};
export const guideLabel=title=>title.replace(/^\s*\d+[.)、．:：]\s*/u,'');
export function withGuideVisuals(page){
 const steps=visualSteps[page.route]??{};
 const body=page.body.replace(/(<h2\b[^>]*>)\s*\d+[.)、．:：]\s*/gu,'$1');
 const blocks=body.split(/(?=<h2\s)/);let index=-1;
 return blocks.map(block=>{
  if(!block.startsWith('<h2 '))return block;
  const key=steps[++index];if(!key)return `<section class="guide-section"><div class="guide-step-copy">${block}</div></section>`;
  const title=guideLabel(page.toc[index]?.title||page.title);
  const safeTitle=title.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const [width,height]=key==='editor-example'?[800,800]:dimensions[key];
  const image=key==='editor-example'?'record-card-example.svg':key+'.webp';
  const tools=key==='editor-example'?'<img class="editor-toolbar" src="/assets/guide-details/editor-tools.webp" width="800" height="208" alt="" loading="lazy">':'';
  const caption=key==='editor-example'?'기록 카드 꾸미기 예시 · 한국어':'실제 앱 화면 · 한국어 예시';
  return `<section class="guide-section guide-step" data-guide-visual="${key}"><div class="guide-step-copy">${block}</div>
   <figure class="guide-detail guide-detail-${key}"><div class="guide-detail-stage"><img src="/assets/guide-details/${image}" width="${width}" height="${height}" alt="${safeTitle}" loading="lazy">${tools}</div>
    <figcaption>${caption}</figcaption></figure></section>`;
 }).join('');
}
