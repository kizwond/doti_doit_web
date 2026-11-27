// The heading order is part of each translated guide's content contract. Anchors remain unchanged.
// Images contain native app pixels only; crop provenance is checked in with the source documentation.
const visualSteps={
 '/missions/':{0:'catalog',1:'criteria',2:'record',4:'feed'},
 '/routines/':{0:'routine-edit',1:'routine-edit',2:'pause',3:'criteria'},
 '/records/':{0:'statistics',1:'progress',3:'feed',4:'editor-tools'},
 '/guides/start-a-mission/':{0:'catalog',1:'criteria',2:'record',4:'feed'},
 '/guides/walking-records/':{0:'measurement',1:'criteria',2:'measurement',3:'progress'},
 '/guides/exercise-routine/':{0:'criteria',1:'routine-edit',2:'routine-run',3:'pause',4:'finish'},
 '/guides/video-feed/':{1:'video-trim',3:'video-trim'},
 '/faq/':{2:'catalog',7:'record',12:'measurement',15:'video-trim'},
 '/about/':{0:'progress'},
};
const dimensions={"catalog":[800,752],"criteria":[800,384],"editor-tools":[800,138],"feed":[800,1000],"finish":[800,371],"measurement":[800,502],"pause":[800,148],"progress":[800,699],"record":[800,534],"routine-edit":[800,710],"routine-run":[800,438],"statistics":[800,944],"video-trim":[800,446]};
export function withGuideVisuals(page){
 const steps=visualSteps[page.route];if(!steps)return page.body;
 const blocks=page.body.split(/(?=<h2\s)/);let index=-1;
 return blocks.map(block=>{
  if(!block.startsWith('<h2 '))return block;
  const key=steps[++index];if(!key)return block;
  const title=page.toc[index]?.title.replace(/^\s*\d+[.)、．:：]\s*/u,'')||page.title;
  const safeTitle=title.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const [width,height]=dimensions[key];
  return `<section class="guide-step" data-guide-visual="${key}"><div class="guide-step-copy">${block}</div>
   <figure class="guide-detail guide-detail-${key}"><div class="guide-detail-stage"><img src="/assets/guide-details/${key}.webp" width="${width}" height="${height}" alt="${safeTitle}" loading="lazy"></div>
    <figcaption>실제 앱 화면 · 한국어 예시</figcaption></figure></section>`;
 }).join('');
}
