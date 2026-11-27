// A styled example, not a captured app screen. Uses the app's actual official-mission feed background.
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const source='../doti_doit/app/src/main/res/drawable-nodpi/doti_record_hea_exercise_3x_week.webp';
const bytes=await fs.readFile(source),data=bytes.toString('base64');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
<image width="800" height="800" href="data:image/webp;base64,${data}"/>
<g font-family="Noto Sans CJK KR, sans-serif" fill="#fff">
<text x="50" y="89" font-size="19" fill="#b8d0dc">오늘의 실천 기록</text>
<text x="50" y="135" font-size="31" font-weight="700">하루 30분 근력 운동하기</text>
<text x="50" y="181" font-size="17" fill="#b8d0dc">26.11.27　18:30 ~ 19:00</text>
<text x="50" y="293" font-size="19" fill="#b8d0dc">운동 시간</text>
<text x="50" y="373" font-size="66" font-weight="700">30<tspan font-size="25" font-weight="400"> 분</tspan></text>
<g transform="translate(515 302) rotate(-9)"><rect width="217" height="70" rx="9" fill="none" stroke="#ffae53" stroke-width="3"/><text x="108" y="45" text-anchor="middle" font-size="24" font-weight="700" fill="#ffae53">오늘도 해냈다!</text></g>
<path d="M50 419H750" stroke="#acc4d4" stroke-opacity=".24"/>
<text x="50" y="466" font-size="19" fill="#b8d0dc">루틴 기록</text>
<g font-size="21"><text x="50" y="513">스쿼트</text><text x="746" y="513" text-anchor="end">15회 × 3세트</text>
<text x="50" y="565">벽 푸시업</text><text x="746" y="565" text-anchor="end">10회 × 3세트</text>
<text x="50" y="617">플랭크</text><text x="746" y="617" text-anchor="end">30초 × 3세트</text></g>
<text x="50" y="724" font-size="24" fill="#ffcf98">어제보다 조금 더 단단해진 하루.</text></g></svg>`;
const output='public/assets/guide-details/record-card-example.svg';await fs.writeFile(output,svg);
await fs.writeFile('docs/qa/2026-11-27-guide-simplification/record-card-provenance.json',JSON.stringify({source,sourceSha256:createHash('sha256').update(bytes).digest('hex'),output,outputSha256:createHash('sha256').update(svg).digest('hex'),kind:'website styling example; original app background with example text and values; not an app screenshot',example:{mission:'하루 30분 근력 운동하기',minutes:30,date:'2026-11-27'},appSourceModified:false},null,2)+'\n');
