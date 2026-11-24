(function(){
'use strict';
const O=window.O,A=O.A,$=s=>document.querySelector(s);
const L=(t,u)=>({t:t,u:u});
const DOC={
council:{k:'CENTRAL COUNCIL',t:'중앙 평의회',x:'조직의 주요 정책과 중요 사안을 결정한다. 중앙 평의회 의장은 아르카디아 벨이다.',r:[L('여행자 데이터베이스','travelers.html')]},
ops:{k:'OPERATIONS',t:'운영 부서',x:'조직의 일상 운영과 행정을 담당한다. 아래 여덟 개 부서가 속해 있다.',r:[]},
d1:{k:'DEPARTMENT',t:'여행자 관리부',x:'여행자 등록, 등급 및 활동을 관리한다.',r:[L('내 프로필','profile.html')]},
d2:{k:'DEPARTMENT',t:'조사 부서',x:'차원 이상 현상과 오염을 조사한다.',r:[L('차원 모니터','monitor.html')]},
d3:{k:'DEPARTMENT',t:'관문 관리부',x:'차원 관문의 개방, 유지, 통제를 담당한다.',r:[L('관문 네트워크','gate-network.html')]},
d4:{k:'DEPARTMENT',t:'의뢰 게시판',x:'탐사·조사·구조 등 여행자가 수행할 임무를 중개한다.',r:[L('의뢰 게시판','requests.html')]},
d5:{k:'DEPARTMENT',t:'기록 보관소',x:'차원과 사건, 여행 기록을 보관한다.',r:[L('기록 보관소','archive.html')]},
d6:{k:'DEPARTMENT',t:'무역 부서',x:'차원 간 물자와 기술 교류를 지원한다.',r:[]},
d7:{k:'DEPARTMENT',t:'안전 관리부',x:'오염과 위험 요소의 격리 및 대응을 담당한다.',r:[L('차원 모니터','monitor.html')]},
d8:{k:'DEPARTMENT',t:'기술 연구부',x:'관문과 차원 이동 기술을 연구한다.',r:[L('허브 소식','bulletin.html')]},
admin:{k:'HUB ZONE',t:'행정 구역',x:'중앙 평의회와 운영 부서의 행정이 이루어지는 구역이다. 여행자 등록과 임무 중개 같은 일상 업무를 처리한다.',r:[L('의뢰 게시판','requests.html'),L('내 프로필','profile.html')]},
trade:{k:'HUB ZONE',t:'상업 구역',x:'여러 차원에서 온 여행자들이 교류하는 구역이다. 무역 부서가 차원 간 물자와 기술 교류를 지원한다.',r:[]},
lab:{k:'HUB ZONE',t:'연구 구역',x:'연구 및 기록 시설이 모여 있는 구역이다. 관문과 차원 이동 기술을 연구하고, 차원과 사건, 여행 기록을 보관한다.',r:[L('기록 보관소','archive.html'),L('허브 소식','bulletin.html')]},
iso:{k:'HUB ZONE · CAUTION',t:'격리 구역',x:'오염과 위험 요소를 격리하고 대응하는 구역이다. 안전 관리부가 담당한다.',r:[L('차원 모니터','monitor.html'),L('아스트라 폴 (봉인)','dimensions.html#astra')]},
rk5:{k:'TRAVELER RANK',t:'5급',x:'방문자가 처음 등록되는 임시 등급이다. 현재 당신의 등급이다.',r:[L('내 프로필','profile.html')]},
rk3:{k:'TRAVELER RANK',t:'3급',x:'베테랑 여행자의 등급이다. 카엘라 린이 3급 여행자로 기록되어 있다.',r:[L('카엘라 린 기록','travelers.html')]},
rkx:{k:'TRAVELER RANK',t:'등급 정보',x:'이 등급의 권한과 승급 조건은 공개되지 않았다. [[기록 없음]]',r:[]},
origin:{k:'FOUNDING RECORD',t:'설립 초기 기록',x:'설립 시기: [[기록 누락]]\n설립자: [[기록 누락]]\n설립 목적의 상세한 역사: [[기록 누락]]\n\n※ 설립 초기 기록의 일부가 존재하지 않습니다.',r:[L('기록 보관소 C-002','archive.html')]}
};
const ap=$('#ap');
const body=s=>s.split(/(\[\[.*?\]\])/g).map(p=>p.startsWith('[[')?'<span class="rx">'+p.slice(2,-2)+'</span>':p.replace(/\n/g,'<br>')).join('');
function open(id){
 const d=DOC[id];if(!d)return;
 ap.innerHTML='<div class="dp"><button class="x" aria-label="닫기">✕</button><p class="kicker mono">'+d.k+'</p><h2>'+d.t+'</h2><p>'+body(d.x)+'</p>'+(d.r.length?'<h3>관련 기록</h3><div class="chips">'+d.r.map(r=>'<a class="chip" href="'+r.u+'" data-go="'+r.u+'">'+r.t+' ↗</a>').join('')+'</div>':'')+'</div>';
 ap.hidden=false;
 if(id==='origin')O.clue('about');
 if(id==='iso'){const h=document.documentElement;h.classList.add('warnlight');A.deny();setTimeout(()=>h.classList.remove('warnlight'),2400)}
}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-d]');if(b){open(b.dataset.d);return}
 if(e.target===ap||e.target.closest('#ap .x'))ap.hidden=true;
});
addEventListener('keydown',e=>{if(e.key==='Escape')ap.hidden=true});
})();
