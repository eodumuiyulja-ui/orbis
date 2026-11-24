(function(){
'use strict';
const O=window.O,A=O.A,$=s=>document.querySelector(s);
const NM={ernes:'에르네스 왕국',neon:'네온 베일',earth:'지구-17',chrome:'크롬 유니온',stella:'스텔라 블룸',astra:'아스트라 폴'};
const M=[
{id:'ernes',st:97,co:2,wp:3,gt:'STABLE'},{id:'neon',st:94,co:3,wp:6,gt:'STABLE'},{id:'earth',st:99,co:1,wp:1,gt:'STABLE'},
{id:'chrome',st:98,co:1,wp:2,gt:'STABLE'},{id:'stella',st:93,co:5,wp:8,gt:'STABLE'},{id:'astra',st:11,co:91,wp:76,gt:'SEALED',warn:1}];
const rd=$('#rd');let cnt=1;
let b='';M.forEach((m,i)=>{const a=i/6*Math.PI*2-.6,r=38+(i*17)%46,x=+(Math.cos(a)*r).toFixed(1),y=+(Math.sin(a)*r).toFixed(1),c=m.warn?'#ff4d5e':'#3ee6d8';b+='<circle cx="'+x+'" cy="'+y+'" r="2.6" fill="'+c+'"/>'+(m.warn?'<circle class="wave" cx="'+x+'" cy="'+y+'" r="9" style="stroke:#ff4d5e;animation-delay:0s"/>':'')+'<text x="'+(x+5)+'" y="'+(y-4)+'" fill="#8196ab" font-size="5.5">'+NM[m.id]+'</text>'});
$('#blips').innerHTML=b;
const sw=()=>{O.s.anim?rd.unpauseAnimations():rd.pauseAnimations()};O.hook.push(sw);sw();
const rows=$('#mr'),KS=[['st','STABILITY'],['co','CONTAMINATION'],['wp','SPATIAL WARP']];
rows.innerHTML=M.map(m=>'<div class="mr'+(m.warn?' warn':'')+'" data-id="'+m.id+'"><b>'+NM[m.id]+'</b>'+KS.map(k=>'<div class="mb" data-k="'+k[0]+'"><span class="mono sm">'+k[1]+'</span><div class="bar"><i></i></div><span class="mono v"></span></div>').join('')+'<span class="mono gt '+(m.warn?'sl':'ok')+'">GATE · '+m.gt+'</span></div>').join('');
function paint(){
 M.forEach(m=>{const r=rows.querySelector('[data-id="'+m.id+'"]');KS.forEach(k=>{const e=r.querySelector('[data-k="'+k[0]+'"]'),v=Math.round(m[k[0]]);e.querySelector('i').style.width=v+'%';e.querySelector('.v').textContent=m.odd===k[0]?'??':v+'%';e.classList.toggle('bad',k[0]==='st'?v<50:v>50)})});
 $('#ms').textContent='ANOMALY SIGNALS: '+cnt+' · 갱신 주기 3s · 표시되는 수치는 세계관 연출용 데이터입니다.';
}
const clock=()=>[0,1,2].map(i=>String([new Date().getHours(),new Date().getMinutes(),new Date().getSeconds()][i]).padStart(2,'0')).join(':');
const lg=$('#ml');
function tick(){
 M.forEach(m=>['st','co','wp'].forEach(k=>{m[k]=Math.max(0,Math.min(100,m[k]+Math.random()*4-2))}));
 const r=Math.random(),m=M[Math.random()*5|0];let t,c='';
 if(r<.07){c='odd';t='관측값 불일치 — 원인을 설명할 수 없음';m.odd=['st','co','wp'][Math.random()*3|0];setTimeout(()=>{m.odd=null;paint()},1400);cnt++;O.clue('odd');O.glitch(rows.querySelector('[data-id="'+m.id+'"]'),150)}
 else if(r<.3){c='warn';t='아스트라 폴: 잔류 오염 감지 — 봉인 유지';A.tone(220,.2,'sawtooth',.05)}
 else t=NM[m.id]+': '+['안정성 정상 범위 유지','관문 신호 수신 정상','공간 왜곡 수치 소폭 변동'][Math.random()*3|0];
 paint();
 lg.insertAdjacentHTML('afterbegin','<div class="ml '+c+'"><span class="sm">['+clock()+']</span> '+t+'</div>');
 while(lg.children.length>9)lg.lastElementChild.remove();
}
paint();tick();setInterval(tick,3000);
setInterval(()=>O.glitch($('#vp'),150),11000);
const vp=$('#vp'),stg=O.stage();O.clue('vp');
if(stg>=2)vp.insertAdjacentHTML('beforeend','<div class="ln">SIGNAL ID: TRV-0000-??</div>');
if(stg>=3){vp.insertAdjacentHTML('beforeend','<div class="ln">...</div><div class="ln">VISITOR DETECTED.</div>');if(!O.store.get('orbis_s3')){O.store.set('orbis_s3','1');setTimeout(()=>{const h=document.documentElement;h.classList.add('big');setTimeout(()=>h.classList.remove('big'),650)},900)}}
})();
