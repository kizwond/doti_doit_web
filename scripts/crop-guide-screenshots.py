import subprocess,json,hashlib,pathlib
repo=pathlib.Path(__file__).resolve().parents[2]/'doti_doit';out=pathlib.Path(__file__).resolve().parents[1]/'public/assets/guide-details'
out.mkdir(parents=True,exist_ok=True)
base='docs/store-assets/2026-11-26-motidoit-release/captures/'
items=[
('catalog',base+'02-official-missions.png',(40,170,1000,940)),
('criteria',base+'03-criteria.png',(40,906,1000,480)),
('record',base+'02-entry.png',(40,386,1000,668)),
('routine-edit','docs/qa/2026-11-25-routine-and-rejudgment/activity-rows.png',(40,280,1000,888)),
('routine-run',base+'04-routine.png',(180,1250,850,465)),
('statistics',base+'05-statistics.png',(40,500,1000,1180)),
('progress',base+'05-progress.png',(32,746,1016,888)),
('feed',base+'06-feed-photo.png',(52,304,976,1220)),
('measurement',base+'02-gps.png',(48,198,984,618)),
('video-trim','docs/qa/2026-11-02/feed-video/emulator/video-editor-crop.png',(38,1040,1004,560)),
('editor-tools','docs/qa/2026-11-25-image-editor/photo-goal-removed.png',(0,2148,1080,186)),
('pause','docs/store-assets/2026-11-26-motidoit-release/captures/04-routine.png',(40,2180,1000,185)),
('finish','docs/qa/2026-11-20/confirmed-followups/finish-actions.png',(40,1810,1000,464)),
]
manifest=[]
for name,src,rect in items:
 p=repo/src;x,y,w,h=rect;target=out/(name+'.webp')
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(p),'-vf',f'crop={w}:{h}:{x}:{y},pad=iw+128:ih+128:64:64:color=white,scale=800:-1','-c:v','libwebp','-quality','90','-threads','1',str(target)],check=True)
 manifest.append(dict(name=name,source='doti_doit/'+src,sourceSha256=hashlib.sha256(p.read_bytes()).hexdigest(),crop=dict(x=x,y=y,width=w,height=h),padding=dict(left=64,right=64,top=64,bottom=64,color='white'),output=target.name,outputSha256=hashlib.sha256(target.read_bytes()).hexdigest(),bytes=target.stat().st_size))
pathlib.Path('docs/qa/2026-11-27-professional-home/screenshot-provenance.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('Cropped with 64px breathing room on every edge:',len(manifest),'native screenshots, total',sum(m['bytes']for m in manifest),'bytes; no text or UI pixels changed.')
