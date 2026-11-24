(function(){
'use strict';
const O=window.O,A=O.A,$=s=>document.querySelector(s);
const sleep=ms=>new Promise(r=>setTimeout(r,O.s.anim?ms:0));
const gone=O.store.get('orbis_void')==='gone';
const U=['"그 문을 열지 마세요."','"그 문은 이미 열려 있었어요."','"아직... 기억해야 할 게 있어요."'];
const B=[
{id:'B-01',ty:'ALERT',t:'아스트라 폴 봉인 유지 확인',ago:0,rel:['astra'],att:['봉인 차원 지정 기록 (R-014)'],x:'아스트라 폴로의 모든 접근 요청은 계속 거부됩니다. 오염 잔향 기록 열람만 허용되며, 봉인 해제 시도는 허용되지 않습니다. 오염 확산 방지를 위해 현재의 봉인 상태를 유지합니다.'},
{id:'B-02',ty:'NOTICE',t:'신규 여행자 임시 등록 안내',ago:0,rel:[],att:['여행자 등록 안내문'],live:1,x:'방문자는 5급 여행자로 임시 등록됩니다. 의뢰 게시판과 여행 일지는 등록 후 순차적으로 개방됩니다.'},
{id:'B-03',ty:'REPORT',t:'관문 연결 상태 요약',ago:1,rel:['astra'],att:['관문 연결 상태 요약표'],x:gone?'6개 차원 중 5개는 안정적으로 연결되어 있습니다. 1개는 봉인 상태입니다.':'7개 차원 중 5개는 안정적으로 연결되어 있습니다. 1개는 봉인 상태이며, 1개는 관측되지 않습니다.'},
{id:'B-04',ty:'UNKNOWN',t:'[UNKNOWN TRANSMISSION]',ago:2,rel:[],att:[],x:''},
{id:'B-05',ty:'RESEARCH',t:'차원 이동 효율 연구 중간 보고',ago:3,rel:['chrome'],att:['연구 요약본 (공개용)'],x:'기술 연구부는 차원 이동 기술의 효율과 안정성을 높이기 위한 연구를 진행 중입니다. 크롬 유니온의 차원 연구 시설과 좌표 연산 자료를 대조하고 있습니다.'},
{id:'B-06',ty:'NOTICE',t:'차원 은폐 원칙 재공지',ago:4,rel:['earth'],att:['차원 은폐 원칙 지침'],x:'지구-17을 방문하는 여행자는 차원 은폐 원칙을 준수해야 합니다. 오르비스와 차원 이동에 관한 사실을 일반인에게 불필요하게 드러내지 마십시오.'},
{id:'B-07',ty:'REPORT',t:'별의 조각 발생 지역 관측 요약',ago:5,rel:['stella'],att:['마법소녀 활동 기록 대조표'],x:'스텔라 블룸에서 오염된 별의 힘으로 별의 조각이 나타나는 장소가 관측되었습니다. 마법소녀의 활동 기록과 대조해 상황을 확인하고 있습니다.'},
{id:'B-08',ty:'NOTICE',t:'네온 베일 방문자 유의사항',ago:6,rel:['neon'],att:['방문자 유의사항'],x:'네온 베일에는 능력 범죄와 불법 기술 거래가 존재합니다. 블랙 마켓 접근과 비공식 의뢰 수락에 주의하십시오.'}
];
const pad=n=>String(n).padStart(2,'0');
const dt=a=>{const d=new Date(Date.now()-a*864e5);return d.getFullYear()+'.'+pad(d.getMonth()+1)+'.'+pad(d.getDate())};
const dn=id=>window.DIMS.find(d=>d.id===id);
const list=$('#bl');let flt='ALL';
const item=(b,nw,fresh)=>'<article class="item t-'+b.ty+(b.ty==='ALERT'?' alert':'')+(fresh?' rise':'')+'" data-id="'+b.id+'"><button class="hd" aria-expanded="false"><span class="tag mono">'+b.ty+'</span><span>'+b.t+'</span><span class="mono sm dte">'+dt(b.ago)+'</span>'+(nw?'<span class="new mono">NEW</span>':'')+'</button><div class="bd" hidden></div></article>';
const first=!O.store.get('orbis_bul');
function draw(){list.innerHTML=B.filter(b=>(flt==='ALL'||b.ty===flt)&&!(b.live&&first&&!shown)).map(b=>item(b,b.live,0)).join('')}
let shown=false;draw();
if(first){
 setTimeout(()=>{
  shown=true;O.store.set('orbis_bul','1');
  const b=B[1],nb=$('#nb');nb.textContent='NEW NOTICE RECEIVED · '+b.t;nb.hidden=false;A.ok();
  list.insertAdjacentHTML('afterbegin',item(b,1,1));
  setTimeout(()=>{nb.hidden=true},4200);
 },O.s.anim?1800:300);
}
$('#bt').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;flt=b.dataset.f;document.querySelectorAll('#bt button').forEach(x=>x.classList.toggle('on',x===b));draw()});
async function unk(bd){
 const st=O.stage();O.clue('bunk');
 bd.innerHTML='<div class="mono ukn"></div>';const el=bd.firstChild;O.glitch(bd,150);
 for(const l of ['[UNKNOWN TRANSMISSION]','','발신자: 확인되지 않음','수신 위치: 중앙 허브','',U[st-1],'','발신 기록이 존재하지 않습니다.']){
  el.textContent+=l+'\n';A.tick();await sleep(420);
 }
 O.glitch(el,150);
}
list.addEventListener('click',e=>{
 const h=e.target.closest('.hd');if(!h)return;
 const it=h.parentNode,bd=h.nextElementSibling,b=B.find(x=>x.id===it.dataset.id),open=bd.hidden;
 bd.hidden=!open;h.setAttribute('aria-expanded',String(open));
 const nw=h.querySelector('.new');if(open&&nw)nw.remove();
 if(!open||bd.dataset.f)return;
 bd.dataset.f='1';
 if(b.ty==='UNKNOWN'){unk(bd);return}
 bd.innerHTML='<p>'+b.x+'</p>'+(b.att.length?'<p class="mono sm">ATTACHMENTS</p><div class="chips">'+b.att.map(a=>'<span class="chip">[ATT] '+a+'</span>').join('')+'</div>':'')+(b.rel.length?'<p class="mono sm">RELATED DIMENSION</p><div class="chips">'+b.rel.map(r=>'<a class="chip" href="dimensions.html#'+r+'" data-go="dimensions.html#'+r+'">'+dn(r).n+' ↗</a>').join('')+'</div>':'');
});
})();
