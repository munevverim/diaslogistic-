/* ---------- yardımcılar ---------- */
const $ = s=>document.querySelector(s);
const esc = s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const fmtDate = d=>{ const x=new Date(d); return x.toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'}); };
const ago = d=>{ const s=(Date.now()-new Date(d))/1000; if(s<60)return 'az önce'; if(s<3600)return Math.floor(s/60)+' dk önce';
  if(s<86400)return Math.floor(s/3600)+' saat önce'; if(s<2592000)return Math.floor(s/86400)+' gün önce'; return fmtDate(d); };
const initials = n=>n.trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase();

function toast(m){ 
  const t=$('#toast'); 
  t.textContent=m; 
  t.classList.add('show'); 
  clearTimeout(t._t); 
  t._t=setTimeout(()=>t.classList.remove('show'),2600); 
}

function mdToHtml(src){
  const lines = String(src||'').replace(/\r/g,'').split('\n');
  let html='', inList=false;
  const inline = t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  for(let ln of lines){
    if(/^\s*-\s+/.test(ln)){ if(!inList){html+='<ul>';inList=true;} html+='<li>'+inline(ln.replace(/^\s*-\s+/,''))+'</li>'; continue; }
    if(inList){html+='</ul>';inList=false;}
    if(/^###?\s+/.test(ln)){ html+='<h3>'+inline(ln.replace(/^###?\s+/,''))+'</h3>'; continue; }
    if(ln.trim()==='') continue;
    html+='<p>'+inline(ln)+'</p>';
  }
  if(inList)html+='</ul>';
  return html;
}

/* ---------- ortak görünümler ---------- */
function icoSvg(name,cls){ return `<svg class="${cls||''}" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">${window.ICONS[name]||''}</svg>`; }

/* ---- ANA SAYFA ---- */
function viewHome(){
  return `
  <section class="hero"><div class="wrap"><div class="hero-grid">
    <div>
      <span class="tag">// GEOTEKNİK ANALİZ YAZILIMLARI</span>
      <h1>Zeminin altındaki her soruya <em>Türkçe</em> mühendislik yazılımıyla yanıt.</h1>
      <p class="lead">Dias Logic; şev stabilitesinden temel tasarımına, sıvılaşmadan istinat yapılarına kadar geoteknik mühendislerin günlük iş akışını tek bir entegre yazılım ailesinde toplar.</p>
      <div class="hero-actions">
        <a href="#/yazilimlar" class="btn btn-primary">Yazılımları İncele</a>
        <a href="#/iletisim" class="btn btn-ghost">Ücretsiz Demo</a>
      </div>
      <div class="hero-meta">
        <div><span class="n mono">8</span><b>Entegre modül</b></div>
        <div><span class="n mono">%100</span><b>Türkçe arayüz</b></div>
        <div><span class="n mono">7/24</span><b>Yerel destek</b></div>
      </div>
    </div>
    <div class="section-panel">
      <div class="cap">
        <span><span class="dot"></span><span class="dot b"></span><span class="dot"></span></span>
        <span class="lbl">DiasSlope — sev_kesiti.dsl</span>
      </div>
      ${crossSectionSVG()}
    </div>
  </div></div></section>

  <div class="trust"><div class="wrap">
    <p>Güvenen kurumlar</p>
    <div class="logos">
      <span>İTÜ</span><span>ODTÜ</span><span>Boğaziçi</span><span>KGM</span><span>DSİ</span><span>TMMOB</span>
    </div>
  </div></div>

  <section><div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">Yazılım Ailesi</div>
      <h2>Her geoteknik problem için özel araç</h2>
      <p>Birbiriyle konuşan modüller; tek bir veri modeli, tutarlı arayüz ve sunulabilir raporlar.</p>
    </div>
    <div class="grid cols-4">${window.PRODUCTS.slice(0,8).map(productCard).join('')}</div>
  </div></section>

  <section class="dark"><div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">Çözümler</div>
      <h2>İş akışınıza göre düzenlenmiş</h2>
      <p>Modüllerimizi tekil yazılımlar olarak değil, mühendislik problemlerine yönelik bütünleşik çözümler olarak tasarladık.</p>
    </div>
    <div id="solTabs" class="sol">${window.SOLUTIONS.map((s,i)=>solTab(s,i===0)).join('')}</div>
    <div id="solPanel">${solPanel(window.SOLUTIONS[0])}</div>
  </div></section>

  <section><div class="wrap">
    <div class="sec-head">
      <div class="eyebrow">Neden Dias Logic</div>
      <h2>Yerli mühendisliğin gücü</h2>
    </div>
    <div class="feat">
      ${feature('lang','Tamamen Türkçe','Arayüz, yardım dökümanları ve mühendislik raporları baştan sona Türkçe. Yabancı yazılımların çeviri yükü olmadan çalışın.')}
      ${feature('reg','Yerel yönetmelikler','TBDY 2018, TS ve Eurocode 7 esaslarına uygun hesap ve kontroller modüllere gömülü gelir.')}
      ${feature('fast','Hızlı çözücüler','Optimize edilmiş arama algoritmaları ve sonlu eleman çözücüleri ile saniyeler içinde sonuç.')}
      ${feature('rep','Sunulabilir raporlar','Müşteriye ve denetime hazır, kurumsal şablonlu PDF/Word raporları tek tıkla.')}
      ${feature('support','Yerel destek','Sorularınıza Türkçe ve aynı saat diliminde, geoteknik bilen bir ekipten yanıt.')}
      ${feature('price','Esnek lisans','Tekil modül, paket ve akademik lisans seçenekleriyle bütçenize uygun kullanım.')}
    </div>
  </div></section>

  <section class="stats"><div class="wrap">
    <div><div class="n mono">8</div><div class="l">Geoteknik modül</div></div>
    <div><div class="n mono">%100</div><div class="l">Türkçe arayüz</div></div>
    <div><div class="n mono">4</div><div class="l">Yönetmelik desteği</div></div>
    <div><div class="n mono">7/24</div><div class="l">Yerel teknik destek</div></div>
  </div></section>

  <section><div class="wrap">
    <div class="sec-head" style="display:flex;justify-content:space-between;align-items:end;max-width:100%">
      <div><div class="eyebrow">Blog</div><h2>Geoteknikten notlar</h2></div>
      <a href="#/blog" class="btn btn-ghost btn-sm">Tüm Yazılar →</a>
    </div>
    <div class="grid cols-3">${window.state.blog.slice(0,3).map(blogCard).join('')}</div>
  </div></section>

  <section style="padding-top:0"><div class="wrap">
    <div class="ctaband">
      <div>
        <h2>Yazılımı kendi projenizde deneyin</h2>
        <p>14 günlük ücretsiz deneme ile tüm modüllere tam erişim. Kredi kartı gerekmez.</p>
      </div>
      <div class="acts">
        <a href="#/yazilimlar" class="btn btn-blue">Ücretsiz Deneyin</a>
        <a href="#/iletisim" class="btn btn-light">Bizimle İletişime Geçin</a>
      </div>
    </div>
  </div></section>`;
}

function crossSectionSVG(){
  return `<svg class="csvg" viewBox="0 0 800 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Şev stabilitesi kesiti">
    <defs>
      <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#38B6FF" stop-opacity=".22"/><stop offset="1" stop-color="#38B6FF" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- strata -->
    <path class="stratum" style="animation-delay:.05s" fill="var(--s1)" d="M40,150 L380,150 L620,350 L760,350 L760,380 L620,380 L380,195 L40,195 Z"/>
    <path class="stratum" style="animation-delay:.18s" fill="var(--s2)" d="M40,195 L380,195 L620,380 L760,380 L760,420 L620,420 L380,300 L40,300 Z"/>
    <path class="stratum" style="animation-delay:.31s" fill="var(--s3)" d="M40,300 L380,300 L620,420 L760,420 L760,460 L620,460 L380,400 L40,400 Z"/>
    <path class="stratum" style="animation-delay:.44s" fill="var(--s4)" d="M40,400 L380,400 L620,460 L760,460 L760,500 L40,500 Z"/>
    <!-- model frame -->
    <path d="M40,150 L380,150 L620,350 L760,350" fill="none" stroke="#2E2E30" stroke-width="2.4"/>
    <rect x="40" y="150" width="720" height="350" fill="none" stroke="#cdd6de" stroke-width="1"/>
    <!-- groundwater -->
    <g class="gw">
      <path d="M40,250 Q400,272 760,332" fill="none" stroke="#1577C2" stroke-width="1.5" stroke-dasharray="6 5"/>
      <path d="M52,250 l8,0 l-4,7 z" fill="#1577C2"/><path d="M50,243 h12" stroke="#1577C2" stroke-width="1.5"/>
      <text x="68" y="247" class="mono" font-size="12" fill="#1577C2">YASS</text>
    </g>
    <!-- sliding mass -->
    <path class="mass" fill="url(#gw)" d="M395,150 L620,350 L645,352 C560,430 430,400 360,330 C355,250 360,190 395,150 Z" opacity=".9"/>
    <!-- slip surface -->
    <path class="slipline" d="M395,150 C360,210 350,300 360,330 C430,400 560,430 645,352" fill="none" stroke="#1278C2" stroke-width="2.4" stroke-dasharray="8 6"/>
    <circle cx="395" cy="150" r="4" fill="#1278C2"/><circle cx="645" cy="352" r="4" fill="#1278C2"/>
    <!-- labels -->
    <text x="60" y="178" class="mono" font-size="12.5" fill="#7a6a4d">Dolgu</text>
    <text x="60" y="255" class="mono" font-size="12.5" fill="#7a6a4d">Kil</text>
    <text x="60" y="355" class="mono" font-size="12.5" fill="#7a6a4d">Kum</text>
    <text x="60" y="455" class="mono" font-size="12.5" fill="#5f6a74">Kaya</text>
    <!-- Fs pill -->
    <g class="fspill" transform="translate(470,238)">
      <rect x="0" y="0" width="118" height="46" rx="9" fill="#fff" stroke="#bfe3ff" stroke-width="1.5"/>
      <text x="14" y="20" class="mono" font-size="11" fill="#8A8F96">GÜVENLİK SAYISI</text>
      <text x="14" y="38" class="mono" font-weight="700" font-size="18" fill="#1278C2"><tspan id="fsVal">1.00</tspan></text>
      <circle cx="100" cy="29" r="8" fill="#2BB673"/><path d="M96,29 l3,3 l5,-6" stroke="#fff" stroke-width="1.6" fill="none"/>
    </g>
  </svg>`;
}

function animateFs(){
  const el = document.getElementById('fsVal'); if(!el) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){ el.textContent='1.42'; return; }
  let v=1.0; const target=1.42; const t=setInterval(()=>{ v+=0.02; if(v>=target){v=target;clearInterval(t);} el.textContent=v.toFixed(2); },28);
}

function productCard(p){
  return `<a href="#/yazilim/${p.id}" class="card prod">
    <div class="ico">${icoSvg(p.ico)}</div>
    <div class="ptag">${esc(p.tag)}${p.dim!=='—'?`<span class="badge">${p.dim}</span>`:''}</div>
    <h3>${esc(p.name)}</h3>
    <p>${esc(p.desc)}</p>
    <span class="more">Detaylar</span>
  </a>`;
}

function solTab(s,on){
  return `<button class="soltab ${on?'on':''}" data-sol="${s.id}" onclick="selectSol('${s.id}')">
    <div class="si">${icoSvg(s.ico)}</div><h4>${esc(s.name)}</h4><small>${s.tools.length} modül</small>
  </button>`;
}

function solPanel(s){
  return `<div class="solpanel">
    <div>
      <h3>${esc(s.name)}</h3>
      <p style="color:#9aa6b2;margin:.7rem 0 0">${esc(s.desc)}</p>
      <ul>${s.tools.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>
    </div>
    <div class="pic">${icoSvg(s.ico,'')}<div style="width:90px;height:90px;color:var(--blue)">${icoSvg(s.ico)}</div></div>
  </div>`;
}

window.selectSol = function(id){
  const s = window.SOLUTIONS.find(x=>x.id===id); if(!s) return;
  document.querySelectorAll('#solTabs .soltab').forEach(b=>b.classList.toggle('on',b.dataset.sol===id));
  document.getElementById('solPanel').innerHTML = solPanel(s);
};

function feature(ic,t,d){
  const map={lang:'<path d="M4 5h16M9 3v2M11 5c0 5-3 9-7 11M7 8c0 3 3 6 7 7M14 20l4-9 4 9M15.5 17h5"/>',
    reg:'<path d="M9 3h6l1 3h3v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h3zM9 12l2 2 4-4"/>',
    fast:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    rep:'<path d="M7 3h7l5 5v13H7zM14 3v5h5M9 13h7M9 17h5"/>',
    support:'<path d="M4 13a8 8 0 0 1 16 0M4 13v3a2 2 0 0 0 2 2M20 13v3M12 21a3 3 0 0 0 3-3"/>',
    price:'<path d="M12 2v20M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7"/>'};
  return `<div class="f"><div class="fi"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">${map[ic]}</svg></div><h4>${t}</h4><p>${d}</p></div>`;
}

function blogCard(p){
  return `<a href="#/blog/${p.id}" class="post">
    <div class="cover" style="background:${window.COVERS[p.cover||0]}"><span class="ct">${esc(p.category)}</span>${p.emoji||'📄'}</div>
    <div class="pb">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>
      <div class="meta"><span>${esc(p.author)}</span>·<span>${fmtDate(p.date)}</span></div>
    </div>
  </a>`;
}

/* ---- YAZILIMLAR ---- */
function viewProducts(){
  return `${pageHd('Yazılımlar','Yazılım Ailesi','Geoteknik mühendisliğin her alanı için tasarlanmış, birbiriyle entegre çalışan modüller.')}
  <div class="page"><div class="wrap">
    <div class="grid cols-3">${window.PRODUCTS.map(productCard).join('')}</div>
    <div style="margin-top:46px" class="ctaband">
      <div><h2>Hangi modül size uygun?</h2><p>İhtiyacınızı anlatın, doğru paketi birlikte belirleyelim.</p></div>
      <div class="acts"><a href="#/iletisim" class="btn btn-blue">Danışmanlık Talep Et</a></div>
    </div>
  </div></div>`;
}

function viewProduct(id){
  const p = window.PRODUCTS.find(x=>x.id===id); if(!p) return view404();
  const rel = window.PRODUCTS.filter(x=>x.tag===p.tag && x.id!==p.id).slice(0,3);
  return `${pageHd(p.name, p.tag, p.desc)}
  <div class="page"><div class="wrap">
    <p class="crumb"><a href="#/yazilimlar">Yazılımlar</a> / ${esc(p.name)}</p>
    <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:36px;align-items:start">
      <div>
        <h2 style="font-size:1.6rem;margin-bottom:.8rem">Öne çıkan özellikler</h2>
        <div class="grid" style="gap:12px">
          ${p.methods.map(m=>`<div class="card" style="padding:16px 18px;flex-direction:row;align-items:center;gap:12px">
            <span style="color:var(--ok)">✔</span><b style="font-weight:600">${esc(m)}</b></div>`).join('')}
        </div>
        <h2 style="font-size:1.6rem;margin:34px 0 .8rem">Genel bakış</h2>
        <p style="color:var(--ink-2)">${esc(p.desc)} ${esc(p.name)}, Dias Logic veri modeliyle tam entegre çalışır; diğer modüllerle aynı proje dosyasını paylaşır ve sonuçlarını sunulabilir raporlara dönüştürür.</p>
      </div>
      <div class="formcard">
        <div class="ico" style="width:54px;height:54px;border-radius:13px;background:var(--blue-050);display:flex;align-items:center;justify-content:center;border:1px solid #d4ecff;margin-bottom:16px">${icoSvg(p.ico)}</div>
        <h3 style="margin-bottom:.4rem">${esc(p.name)} ${p.dim!=='—'?`<span class="badge">${p.dim}</span>`:''}</h3>
        <p style="color:var(--ink-2);font-size:.9rem;margin-bottom:18px">${esc(p.tag)}</p>
        <a href="#/iletisim" class="btn btn-primary btn-block" style="margin-bottom:10px">Ücretsiz Deneyin</a>
        <a href="#/iletisim" class="btn btn-ghost btn-block">Fiyat Teklifi Al</a>
      </div>
    </div>
    ${rel.length?`<h2 style="font-size:1.5rem;margin:50px 0 18px">İlgili modüller</h2><div class="grid cols-3">${rel.map(productCard).join('')}</div>`:''}
  </div></div>`;
}

/* ---- ÇÖZÜMLER ---- */
function viewSolutions(){
  return `${pageHd('Çözümler','Mühendislik Çözümleri','Modüllerimizi, karşılaştığınız geoteknik problemlere göre gruplandırdık.')}
  <div class="page"><div class="wrap">
    <div class="grid" style="gap:20px">
      ${window.SOLUTIONS.map(s=>`<div class="card" style="display:grid;grid-template-columns:60px 1fr auto;gap:20px;align-items:center;padding:24px">
        <div class="ico" style="width:54px;height:54px;border-radius:13px;background:var(--blue-050);display:flex;align-items:center;justify-content:center;border:1px solid #d4ecff">${icoSvg(s.ico)}</div>
        <div><h3 style="margin-bottom:.3rem">${esc(s.name)}</h3><p style="color:var(--ink-2);font-size:.92rem;margin:0">${esc(s.desc)}</p>
          <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.7rem">${s.tools.map(t=>{const pr=window.PRODUCTS.find(x=>x.name===t);return `<a href="#/yazilim/${pr?pr.id:''}" class="chip on" style="font-size:.78rem">${esc(t)}</a>`}).join('')}</div>
        </div>
        <a href="#/yazilimlar" class="btn btn-ghost btn-sm">İncele →</a>
      </div>`).join('')}
    </div>
  </div></div>`;
}

/* ---- BLOG ---- */
function viewBlog(){
  const cats = ['Tümü', ...new Set(window.state.blog.map(p=>p.category))];
  const list = window.state.blogFilter==='Tümü' ? window.state.blog : window.state.blog.filter(p=>p.category===window.state.blogFilter);
  return `${pageHd('Blog','Geoteknikten Notlar','Teknik yazılar, yönetmelik güncellemeleri ve yazılım ipuçları.')}
  <div class="page"><div class="wrap">
    <div class="cats">${cats.map(c=>`<button class="chip ${window.state.blogFilter===c?'on':''}" onclick="setBlogFilter('${esc(c)}')">${esc(c)}</button>`).join('')}</div>
    ${list.length?`<div class="bloglist">${list.map(blogCard).join('')}</div>`
      :`<div class="empty"><div class="ee">📭</div>Bu kategoride henüz yazı yok.</div>`}
  </div></div>`;
}

window.setBlogFilter = function(c){ window.state.blogFilter=c; render(); };

function viewArticle(id){
  const p = window.state.blog.find(x=>x.id===id); if(!p) return view404();
  const more = window.state.blog.filter(x=>x.id!==id).slice(0,3);
  return `<div class="page" style="padding-top:40px"><div class="wrap"><div class="article">
    <p class="crumb"><a href="#/blog">Blog</a> / ${esc(p.category)}</p>
    <div class="cover" style="background:${window.COVERS[p.cover||0]}">${p.emoji||'📄'}</div>
    <h1>${esc(p.title)}</h1>
    <div class="ameta"><span class="chip on" style="font-size:.74rem;padding:.25rem .6rem">${esc(p.category)}</span>
      <span>${esc(p.author)}</span>·<span>${fmtDate(p.date)}</span></div>
    <div class="body">${mdToHtml(p.body)}</div>
  </div>
  ${more.length?`<div style="max-width:760px;margin:50px auto 0"><h3 style="margin-bottom:18px">Diğer yazılar</h3>
    <div class="grid cols-3">${more.map(blogCard).join('')}</div></div>`:''}
  </div></div>`;
}

/* ---- FORUM ---- */
function viewForum(){
  const counts = {}; window.state.fcats.forEach(c=>counts[c.id]=window.state.topics.filter(t=>t.cat===c.id).length);
  return `${pageHd('Forum','Topluluk','Sorularınızı sorun, deneyimlerinizi paylaşın. Mühendisten mühendise.')}
  <div class="page"><div class="wrap">
    <div class="forum-cats">${window.state.fcats.map(c=>`<div class="fcat">
      <div class="fi">${c.emoji||'💬'}</div>
      <div><h4>${esc(c.name)}</h4><small>${esc(c.desc)} · ${counts[c.id]} konu</small></div>
    </div>`).join('')}</div>
    <div class="atop"><h2 style="font-size:1.4rem">Son konular</h2>
      <button class="btn btn-primary btn-sm" onclick="openNewTopic()">+ Yeni Konu Aç</button></div>
    <div id="newTopicBox"></div>
    ${window.state.topics.length?window.state.topics.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).map(topicRow).join('')
      :`<div class="empty"><div class="ee">💬</div>Henüz konu yok. İlk konuyu siz açın!</div>`}
  </div></div>`;
}

function topicRow(t){
  const cat = window.state.fcats.find(c=>c.id===t.cat);
  return `<a href="#/konu/${t.id}" class="topic">
    <div class="av">${initials(t.author)}</div>
    <div class="tmain">
      <h4>${esc(t.title)}</h4>
      <div class="tm"><span class="tcat">${esc(cat?cat.name:'Genel')}</span><span>${esc(t.author)}</span><span>${ago(t.date)}</span></div>
    </div>
    <div class="rc"><b>${(t.replies||[]).length}</b><small>yanıt</small></div>
  </a>`;
}

window.openNewTopic = function(){
  const box = document.getElementById('newTopicBox'); if(!box) return;
  if(box.innerHTML){ box.innerHTML=''; return; }
  box.innerHTML = `<div class="formcard" style="margin-bottom:18px">
    <div class="field"><label>Kategori</label><select id="ntCat">${window.state.fcats.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select></div>
    <div class="field"><label>Başlık</label><input id="ntTitle" placeholder="Konu başlığı"></div>
    <div class="field"><label>Adınız</label><input id="ntAuthor" placeholder="Görünecek isim"></div>
    <div class="field"><label>Mesajınız</label><textarea id="ntBody" placeholder="Sorunuzu veya paylaşımınızı yazın..."></textarea></div>
    <button class="btn btn-primary" onclick="submitTopic()">Konuyu Yayınla</button>
  </div>`;
};

window.submitTopic = async function(){
  const title=$('#ntTitle').value.trim(), author=$('#ntAuthor').value.trim()||'Misafir', body=$('#ntBody').value.trim(), cat=$('#ntCat').value;
  if(!title||!body){ toast('Lütfen başlık ve mesaj girin'); return; }
  const t={id:uid('t'),cat,title,author,body,date:new Date().toISOString(),replies:[]};
  window.state.topics.unshift(t); 
  await window.dbSaveTopics();
  toast('Konu yayınlandı'); location.hash='#/konu/'+t.id;
};

function viewTopic(id){
  const t = window.state.topics.find(x=>x.id===id); if(!t) return view404();
  const cat = window.state.fcats.find(c=>c.id===t.cat);
  const replies = t.replies||[];
  return `<div class="page" style="padding-top:36px"><div class="wrap" style="max-width:840px">
    <p class="crumb"><a href="#/forum">Forum</a> / ${esc(cat?cat.name:'Genel')}</p>
    <h1 style="font-size:1.8rem;letter-spacing:-.02em;margin-bottom:.6rem">${esc(t.title)}</h1>
    <div class="ameta" style="margin-bottom:24px"><span class="tcat">${esc(cat?cat.name:'Genel')}</span>
      <span style="color:var(--ink-3);font-size:.85rem">${replies.length} yanıt</span></div>
    <div class="reply op">
      <div class="av" style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--blue-700));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-family:'Space Grotesk'">${initials(t.author)}</div>
      <div class="rbody"><h5>${esc(t.author)} <span class="op-b">KONUYU AÇAN</span></h5><div class="rt">${ago(t.date)}</div><div class="rc">${esc(t.body)}</div></div>
    </div>
    ${replies.map(r=>`<div class="reply">
      <div class="av" style="width:42px;height:42px;border-radius:50%;background:${r.op?'linear-gradient(135deg,var(--blue),var(--blue-700))':'#cfd6dd'};color:${r.op?'#fff':'#5a6068'};display:flex;align-items:center;justify-content:center;font-weight:700;font-family:'Space Grotesk'">${initials(r.author)}</div>
      <div class="rbody"><h5>${esc(r.author)} ${r.op?'<span class="op-b">KONUYU AÇAN</span>':''}</h5><div class="rt">${ago(r.date)}</div><div class="rc">${esc(r.body)}</div></div>
    </div>`).join('')}
    <div class="formcard" style="margin-top:24px">
      <h3 style="font-size:1.1rem;margin-bottom:14px">Yanıt yaz</h3>
      <div class="field"><label>Adınız</label><input id="rpAuthor" placeholder="Görünecek isim"></div>
      <div class="field"><label>Yanıtınız</label><textarea id="rpBody" placeholder="Düşüncelerinizi paylaşın..."></textarea></div>
      <button class="btn btn-primary" onclick="submitReply('${t.id}')">Yanıtı Gönder</button>
    </div>
  </div></div>`;
}

window.submitReply = async function(tid){
  const t = window.state.topics.find(x=>x.id===tid); if(!t) return;
  const author=$('#rpAuthor').value.trim()||'Misafir', body=$('#rpBody').value.trim();
  if(!body){ toast('Lütfen yanıtınızı yazın'); return; }
  t.replies=t.replies||[]; t.replies.push({id:uid('r'),author,body,date:new Date().toISOString(),op:false});
  await window.dbSaveTopics(); 
  toast('Yanıtınız eklendi'); render();
};

/* ---- HAKKIMIZDA ---- */
function viewAbout(){
  return `${pageHd('Hakkımızda','Dias Logic','Geoteknik mühendisliğe yerli, güçlü ve erişilebilir bir yazılım sunma hedefiyle yola çıktık.')}
  <div class="page"><div class="wrap" style="max-width:820px">
    <div class="body article" style="font-size:1.06rem;color:#33373c">
      <p><strong>Dias Logic</strong>, geoteknik mühendislerin günlük analiz ihtiyaçlarını tek bir entegre yazılım ailesinde toplamak için kuruldu. Amacımız, dünyanın önde gelen geoteknik yazılımlarının sunduğu gücü; <strong>Türkçe arayüz</strong>, <strong>yerel yönetmelik desteği</strong> ve <strong>erişilebilir lisanslama</strong> ile birleştirmek.</p>
      <h3>Misyonumuz</h3>
      <p>Mühendisin diline ve yönetmeliğine uygun, hızlı ve güvenilir araçlar sunmak. Yazılımın bir engel değil, mühendisliğin doğal bir uzantısı olmasını sağlamak.</p>
      <h3>Neye inanıyoruz?</h3>
      <ul>
        <li>İyi yazılım, mühendisin yargısının yerini almaz; onu güçlendirir.</li>
        <li>Şeffaf hesap: her sonucun arkasındaki yöntem görünür ve denetlenebilir olmalı.</li>
        <li>Yerel destek: aynı dili konuşan, problemi anlayan bir ekip.</li>
      </ul>
      <p>Yazılım ailemiz şev stabilitesi, temel tasarımı, oturma, sıvılaşma, istinat yapıları ve veri yönetimini kapsar; sürekli geliştirilmeye devam ediyor.</p>
    </div>
    <div class="ctaband" style="margin-top:40px">
      <div><h2>Ekibimizle tanışın</h2><p>Sorularınız mı var? Sizi dinlemekten memnuniyet duyarız.</p></div>
      <div class="acts"><a href="#/iletisim" class="btn btn-blue">İletişime Geçin</a></div>
    </div>
  </div></div>`;
}

/* ---- İLETİŞİM ---- */
function viewContact(){
  return `${pageHd('İletişim','Bize Ulaşın','Demo talebi, fiyat teklifi veya teknik sorularınız için formu doldurun; en kısa sürede dönüş yapalım.')}
  <div class="page"><div class="wrap" style="display:grid;grid-template-columns:1.3fr 1fr;gap:40px;align-items:start">
    <div class="formcard">
      <div id="contactMsg"></div>
      <div class="frow">
        <div class="field"><label>Ad Soyad</label><input id="cName" placeholder="Adınız"></div>
        <div class="field"><label>Kurum</label><input id="cOrg" placeholder="Şirket / üniversite"></div>
      </div>
      <div class="frow">
        <div class="field"><label>E-posta</label><input id="cMail" type="email" placeholder="ornek@firma.com"></div>
        <div class="field"><label>Konu</label><select id="cTopic"><option>Demo talebi</option><option>Fiyat teklifi</option><option>Teknik soru</option><option>Akademik lisans</option><option>Diğer</option></select></div>
      </div>
      <div class="field"><label>Mesajınız</label><textarea id="cBody" placeholder="Size nasıl yardımcı olabiliriz?"></textarea></div>
      <button class="btn btn-primary" onclick="submitContact()">Mesajı Gönder</button>
    </div>
    <div>
      <div class="card" style="margin-bottom:16px"><h4 style="margin-bottom:.5rem">📧 E-posta</h4><p style="color:var(--ink-2);margin:0">info@diaslogic.com</p></div>
      <div class="card" style="margin-bottom:16px"><h4 style="margin-bottom:.5rem">💬 Forum</h4><p style="color:var(--ink-2);margin:0 0 .6rem">Teknik sorularınız için topluluğumuza katılın.</p><a href="#/forum" class="btn btn-ghost btn-sm">Foruma Git</a></div>
      <div class="card"><h4 style="margin-bottom:.5rem">🎓 Akademik</h4><p style="color:var(--ink-2);margin:0">Üniversiteler için özel lisans paketleri mevcuttur.</p></div>
    </div>
  </div></div>`;
}

window.submitContact = function(){
  const n=$('#cName').value.trim(), m=$('#cMail').value.trim();
  if(!n||!m){ $('#contactMsg').innerHTML='<div class="notice warn">Lütfen ad ve e-posta alanlarını doldurun.</div>'; return; }
  $('#contactMsg').innerHTML='<div class="notice">Teşekkürler! Mesajınız alındı, en kısa sürede dönüş yapacağız. <small>(Demo site — gerçek gönderim için sunucu bağlantısı gerekir.)</small></div>';
  ['cName','cOrg','cMail','cBody'].forEach(i=>{const e=$('#'+i); if(e)e.value='';});
};

/* ============================================================
   YÖNETİCİ PANELİ
   ============================================================ */
function viewAdmin(){
  if(!window.state.isAdmin) return viewLogin();
  return `<div class="page" style="padding-top:36px"><div class="wrap"><div class="admin-shell">
    <div class="aside">
      <div class="who"><b>Yönetici</b>Dias Logic Paneli</div>
      <div class="amenu">
        <button class="${window.state.adminTab==='dash'?'on':''}" onclick="adminTab('dash')">📊 Genel Bakış</button>
        <button class="${window.state.adminTab==='blog'?'on':''}" onclick="adminTab('blog')">📝 Blog Yazıları</button>
        <button class="${window.state.adminTab==='topics'?'on':''}" onclick="adminTab('topics')">💬 Forum Konuları</button>
        <button class="${window.state.adminTab==='cats'?'on':''}" onclick="adminTab('cats')">🗂️ Forum Kategorileri</button>
        <button class="${window.state.adminTab==='settings'?'on':''}" onclick="adminTab('settings')">⚙️ Ayarlar</button>
        <button onclick="adminLogout()" style="color:#e0564f;margin-top:8px">⎋ Çıkış Yap</button>
      </div>
    </div>
    <div class="apanel">${adminPanel()}</div>
  </div></div></div>`;
}

function viewLogin(){
  return `<div class="page"><div class="wrap"><div class="login-wrap">
    <div class="lk"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10V7a6 6 0 0 1 12 0v3M5 10h14v10H5zM12 14v3"/></svg></div>
    <h1 style="font-size:1.6rem;margin-bottom:.4rem">Yönetici Girişi</h1>
    <p style="color:var(--ink-2);margin-bottom:20px;font-size:.92rem">İçerik yönetimi için şifrenizi girin.</p>
    <div id="loginMsg"></div>
    <div class="field"><input id="adminPw" type="password" placeholder="Şifre" onkeydown="if(event.key==='Enter')adminLogin()"></div>
    <button class="btn btn-primary btn-block" onclick="adminLogin()">Giriş Yap</button>
    <p style="color:var(--ink-3);font-size:.78rem;margin-top:16px">Varsayılan şifre: <b class="mono">dias2025</b> — Ayarlar\u2019dan değiştirebilirsiniz.</p>
  </div></div></div>`;
}

window.adminLogin = function(){
  const pw=$('#adminPw').value;
  if(pw===window.state.adminPass){ window.state.isAdmin=true; window.state.adminTab='dash'; render(); toast('Hoş geldiniz'); }
  else { $('#loginMsg').innerHTML='<div class="notice warn">Şifre hatalı. Tekrar deneyin.</div>'; }
};

window.adminLogout = function(){ window.state.isAdmin=false; render(); toast('Çıkış yapıldı'); };
window.adminTab = function(t){ window.state.adminTab=t; window.state.editing=null; render(); };

function adminPanel(){
  if(window.state.adminTab==='dash') return adminDash();
  if(window.state.adminTab==='blog') return window.state.editing!==null?adminBlogForm():adminBlogList();
  if(window.state.adminTab==='topics') return window.state.editing!==null?adminTopicForm():adminTopicList();
  if(window.state.adminTab==='cats') return adminCats();
  if(window.state.adminTab==='settings') return adminSettings();
  return '';
}

function adminDash(){
  const totalReplies = window.state.topics.reduce((s,t)=>s+(t.replies||[]).length,0);
  const stat=(n,l,e)=>`<div class="card" style="text-align:center"><div style="font-size:1.6rem;margin-bottom:6px">${e}</div><div class="mono" style="font-size:2rem;font-weight:700;color:var(--blue-700);font-family:'Space Grotesk'">${n}</div><div style="color:var(--ink-2);font-size:.85rem">${l}</div></div>`;
  return `<div class="atop"><h2>Genel Bakış</h2></div>
    <div class="grid cols-4" style="margin-bottom:26px">
      ${stat(window.state.blog.length,'Blog yazısı','📝')}${stat(window.state.topics.length,'Forum konusu','💬')}
      ${stat(totalReplies,'Toplam yanıt','↩️')}${stat(window.state.fcats.length,'Kategori','🗂️')}
    </div>
    <div class="card"><h3 style="margin-bottom:.5rem">Hızlı işlemler</h3>
      <p style="color:var(--ink-2);font-size:.9rem;margin-bottom:14px">Buradan içerik ekleyebilir, mevcut yazı ve konuları düzenleyebilirsiniz.</p>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" onclick="newPost()">+ Yeni Blog Yazısı</button>
        <button class="btn btn-ghost btn-sm" onclick="newTopic()">+ Yeni Forum Konusu</button>
        <button class="btn btn-ghost btn-sm" onclick="adminTab('cats')">Kategori Yönet</button>
      </div>
    </div>`;
}

/* --- blog yönetimi --- */
function adminBlogList(){
  return `<div class="atop"><h2>Blog Yazıları</h2><button class="btn btn-primary btn-sm" onclick="newPost()">+ Yeni Yazı</button></div>
    ${window.state.blog.length?window.state.blog.map(p=>`<div class="arow">
      <div class="ai">${p.emoji||'📄'}</div>
      <div class="am"><b>${esc(p.title)}</b><small>${esc(p.category)} · ${fmtDate(p.date)} · ${esc(p.author)}</small></div>
      <div class="aact">
        <button class="icbtn" onclick="editPost('${p.id}')">Düzenle</button>
        <button class="icbtn del" onclick="delPost('${p.id}')">Sil</button>
      </div></div>`).join(''):`<div class="empty"><div class="ee">📝</div>Henüz yazı yok.</div>`}`;
}

window.newPost = function(){ window.state.adminTab='blog'; window.state.editing={id:null,title:'',category:'Teknik',author:'Dias Logic Ekibi',emoji:'📄',cover:0,date:new Date().toISOString().slice(0,10),summary:'',body:''}; render(); };
window.editPost = function(id){ const p=window.state.blog.find(x=>x.id===id); window.state.adminTab='blog'; window.state.editing=JSON.parse(JSON.stringify(p)); render(); };
window.delPost = async function(id){ if(!confirm('Bu yazıyı silmek istediğinize emin misiniz?'))return;
  window.state.blog=window.state.blog.filter(x=>x.id!==id); 
  await window.dbSaveBlog(); 
  toast('Yazı silindi'); render(); 
};

function adminBlogForm(){
  const e=window.state.editing; const emojis=['📄','⛰️','🌊','🧱','🏗️','📐','🔬','📊','⚙️','🪨'];
  return `<div class="atop"><h2>${e.id?'Yazıyı Düzenle':'Yeni Blog Yazısı'}</h2><button class="btn btn-ghost btn-sm" onclick="adminTab('blog')">← Geri</button></div>
  <div class="formcard">
    <div class="field"><label>Başlık</label><input id="f_title" value="${esc(e.title)}" placeholder="Yazı başlığı"></div>
    <div class="frow">
      <div class="field"><label>Kategori</label><input id="f_cat" value="${esc(e.category)}" placeholder="örn. Teknik"></div>
      <div class="field"><label>Yazar</label><input id="f_author" value="${esc(e.author)}"></div>
    </div>
    <div class="frow">
      <div class="field"><label>Tarih</label><input id="f_date" type="date" value="${esc(e.date)}"></div>
      <div class="field"><label>Kapak rengi</label><select id="f_cover">${window.COVERS.map((c,i)=>`<option value="${i}" ${e.cover==i?'selected':''}>Tema ${i+1}</option>`).join('')}</select></div>
    </div>
    <div class="field"><label>Kapak simgesi</label>
      <div id="emojiPick" style="display:flex;gap:.4rem;flex-wrap:wrap">${emojis.map(em=>`<button type="button" class="icbtn" style="font-size:1.1rem;${e.emoji===em?'border-color:var(--blue);background:var(--blue-050)':''}" onclick="pickEmoji('${em}')">${em}</button>`).join('')}</div>
    </div>
    <div class="field"><label>Özet</label><textarea id="f_summary" style="min-height:70px" placeholder="Kart üzerinde görünecek kısa özet">${esc(e.summary)}</textarea></div>
    <div class="field"><label>İçerik</label><textarea id="f_body" style="min-height:260px" placeholder="Yazı içeriği...">${esc(e.body)}</textarea>
      <div class="hint">Biçimlendirme: <b class="mono">## Başlık</b> · <b class="mono">- madde</b> · <b class="mono">**kalın**</b> · boş satır = yeni paragraf</div></div>
    <div style="display:flex;gap:.6rem">
      <button class="btn btn-primary" onclick="savePost()">${e.id?'Değişiklikleri Kaydet':'Yazıyı Yayınla'}</button>
      <button class="btn btn-ghost" onclick="adminTab('blog')">İptal</button>
    </div>
  </div>`;
}

window.pickEmoji = function(em){ window.state.editing.emoji=em; render(); };

window.savePost = async function(){
  const e=window.state.editing;
  e.title=$('#f_title').value.trim(); e.category=$('#f_cat').value.trim()||'Genel';
  e.author=$('#f_author').value.trim()||'Dias Logic Ekibi'; e.date=$('#f_date').value||new Date().toISOString().slice(0,10);
  e.cover=parseInt($('#f_cover').value)||0; e.summary=$('#f_summary').value.trim(); e.body=$('#f_body').value;
  if(!e.title){ toast('Lütfen bir başlık girin'); return; }
  if(!e.summary) e.summary = e.body.slice(0,140);
  if(e.id){ const i=window.state.blog.findIndex(x=>x.id===e.id); window.state.blog[i]=e; toast('Yazı güncellendi'); }
  else { e.id=uid('p'); window.state.blog.unshift(e); toast('Yazı yayınlandı'); }
  await window.dbSaveBlog(); 
  window.state.editing=null; render();
};

/* --- forum konu yönetimi --- */
function adminTopicList(){
  const sorted=window.state.topics.slice().sort((a,b)=>new Date(b.date)-new Date(a.date));
  return `<div class="atop"><h2>Forum Konuları</h2><button class="btn btn-primary btn-sm" onclick="newTopic()">+ Yeni Konu</button></div>
    ${sorted.length?sorted.map(t=>{const c=window.state.fcats.find(x=>x.id===t.cat);return `<div class="arow">
      <div class="ai">💬</div>
      <div class="am"><b>${esc(t.title)}</b><small>${esc(c?c.name:'—')} · ${esc(t.author)} · ${(t.replies||[]).length} yanıt · ${fmtDate(t.date)}</small></div>
      <div class="aact">
        <a class="icbtn" href="#/konu/${t.id}">Görüntüle</a>
        <button class="icbtn" onclick="editTopic('${t.id}')">Düzenle</button>
        <button class="icbtn del" onclick="delTopic('${t.id}')">Sil</button>
      </div></div>`}).join(''):`<div class="empty"><div class="ee">💬</div>Henüz konu yok.</div>`}`;
}

window.newTopic = function(){ window.state.adminTab='topics'; window.state.editing={id:null,cat:window.state.fcats[0]?.id,title:'',author:'Dias Logic Ekibi',body:'',date:new Date().toISOString().slice(0,10),replies:[]}; render(); };
window.editTopic = function(id){ const t=window.state.topics.find(x=>x.id===id); window.state.adminTab='topics'; window.state.editing=JSON.parse(JSON.stringify(t)); render(); };
window.delTopic = async function(id){ if(!confirm('Bu konuyu silmek istediğinize emin misiniz?'))return;
  window.state.topics=window.state.topics.filter(x=>x.id!==id); 
  await window.dbSaveTopics(); 
  toast('Konu silindi'); render(); 
};

function adminTopicForm(){
  const e=window.state.editing;
  return `<div class="atop"><h2>${e.id?'Konuyu Düzenle':'Yeni Forum Konusu'}</h2><button class="btn btn-ghost btn-sm" onclick="adminTab('topics')">← Geri</button></div>
  <div class="formcard">
    <div class="frow">
      <div class="field"><label>Kategori</label><select id="t_cat">${window.state.fcats.map(c=>`<option value="${c.id}" ${e.cat===c.id?'selected':''}>${esc(c.name)}</option>`).join('')}</select></div>
      <div class="field"><label>Yazar</label><input id="t_author" value="${esc(e.author)}"></div>
    </div>
    <div class="field"><label>Başlık</label><input id="t_title" value="${esc(e.title)}" placeholder="Konu başlığı"></div>
    <div class="field"><label>İçerik</label><textarea id="t_body" style="min-height:160px" placeholder="Konu metni...">${esc(e.body)}</textarea></div>
    ${e.id&&(e.replies||[]).length?`<div class="field"><label>Yanıtlar (${e.replies.length})</label>
      ${e.replies.map(r=>`<div class="arow"><div class="am"><b>${esc(r.author)}</b><small>${esc(r.body).slice(0,80)}</small></div>
        <button class="icbtn del" onclick="delReply('${e.id}','${r.id}')">Sil</button></div>`).join('')}</div>`:''}
    <div style="display:flex;gap:.6rem">
      <button class="btn btn-primary" onclick="saveTopic()">${e.id?'Kaydet':'Konuyu Yayınla'}</button>
      <button class="btn btn-ghost" onclick="adminTab('topics')">İptal</button>
    </div>
  </div>`;
}

window.saveTopic = async function(){
  const e=window.state.editing;
  e.cat=$('#t_cat').value; e.author=$('#t_author').value.trim()||'Dias Logic Ekibi';
  e.title=$('#t_title').value.trim(); e.body=$('#t_body').value.trim();
  if(!e.title||!e.body){ toast('Başlık ve içerik gerekli'); return; }
  if(!e.date.includes('T')) e.date=new Date(e.date).toISOString();
  if(e.id){ const i=window.state.topics.findIndex(x=>x.id===e.id); window.state.topics[i]=e; toast('Konu güncellendi'); }
  else { e.id=uid('t'); e.date=new Date().toISOString(); e.replies=[]; window.state.topics.unshift(e); toast('Konu yayınlandı'); }
  await window.dbSaveTopics(); 
  window.state.editing=null; render();
};

window.delReply = async function(tid,rid){ 
  const t=window.state.topics.find(x=>x.id===tid); if(!t)return;
  t.replies=t.replies.filter(r=>r.id!==rid); 
  await window.dbSaveTopics();
  window.state.editing=JSON.parse(JSON.stringify(t)); toast('Yanıt silindi'); render(); 
};

/* --- kategori yönetimi --- */
function adminCats(){
  return `<div class="atop"><h2>Forum Kategorileri</h2></div>
    <div class="formcard" style="margin-bottom:18px">
      <h3 style="font-size:1.05rem;margin-bottom:14px">Yeni kategori ekle</h3>
      <div class="frow">
        <div class="field"><label>Simge (emoji)</label><input id="nc_emoji" value="📁" maxlength="2"></div>
        <div class="field"><label>Kategori adı</label><input id="nc_name" placeholder="örn. Sıvılaşma"></div>
      </div>
      <div class="field"><label>Açıklama</label><input id="nc_desc" placeholder="Kısa açıklama"></div>
      <button class="btn btn-primary" onclick="addCat()">Kategori Ekle</button>
    </div>
    ${window.state.fcats.map(c=>`<div class="arow"><div class="ai">${c.emoji}</div>
      <div class="am"><b>${esc(c.name)}</b><small>${esc(c.desc)} · ${window.state.topics.filter(t=>t.cat===c.id).length} konu</small></div>
      <button class="icbtn del" onclick="delCat('${c.id}')">Sil</button></div>`).join('')}`;
}

window.addCat = async function(){
  const name=$('#nc_name').value.trim(); if(!name){ toast('Kategori adı gerekli'); return; }
  window.state.fcats.push({id:uid('c'),name,emoji:$('#nc_emoji').value.trim()||'📁',desc:$('#nc_desc').value.trim()||''});
  await window.dbSaveFCats(); 
  toast('Kategori eklendi'); render();
};

window.delCat = async function(id){
  if(window.state.topics.some(t=>t.cat===id)){ if(!confirm('Bu kategoride konular var. Yine de silinsin mi? (Konular kategorisiz kalır)'))return; }
  else if(!confirm('Kategoriyi silmek istediğinize emin misiniz?'))return;
  window.state.fcats=window.state.fcats.filter(c=>c.id!==id); 
  await window.dbSaveFCats(); 
  toast('Kategori silindi'); render();
};

/* --- ayarlar --- */
function adminSettings(){
  return `<div class="atop"><h2>Ayarlar</h2></div>
  <div class="formcard" style="max-width:480px">
    <h3 style="font-size:1.05rem;margin-bottom:14px">Yönetici şifresini değiştir</h3>
    <div id="pwMsg"></div>
    <div class="field"><label>Mevcut şifre</label><input id="s_old" type="password"></div>
    <div class="field"><label>Yeni şifre</label><input id="s_new" type="password"></div>
    <button class="btn btn-primary" onclick="changePass()">Şifreyi Güncelle</button>
  </div>
  <div class="formcard" style="max-width:480px;margin-top:18px">
    <h3 style="font-size:1.05rem;margin-bottom:8px">Verileri sıfırla</h3>
    <p style="color:var(--ink-2);font-size:.88rem;margin-bottom:14px">Tüm blog ve forum içeriğini başlangıç değerlerine döndürür.</p>
    <button class="btn btn-ghost" style="color:#e0564f;border-color:#f1c0bc" onclick="resetData()">Başlangıç verilerine dön</button>
  </div>`;
}

window.changePass = async function(){
  const o=$('#s_old').value, n=$('#s_new').value.trim();
  if(o!==window.state.adminPass){ $('#pwMsg').innerHTML='<div class="notice warn">Mevcut şifre yanlış.</div>'; return; }
  if(n.length<4){ $('#pwMsg').innerHTML='<div class="notice warn">Yeni şifre en az 4 karakter olmalı.</div>'; return; }
  await window.dbSavePass(n); 
  $('#pwMsg').innerHTML='<div class="notice">Şifre güncellendi.</div>'; toast('Şifre değiştirildi');
};

window.resetData = async function(){
  if(!confirm('Tüm içerik başlangıç değerlerine dönecek. Emin misiniz?'))return;
  await window.dbResetAllData();
  toast('Veriler sıfırlandı'); render();
};

function pageHd(title,eyebrow,sub){
  return `<div class="page-hd"><div class="wrap">
    <div class="eyebrow">${esc(eyebrow)}</div>
    <h1>${esc(title)}</h1>${sub?`<p>${esc(sub)}</p>`:''}
  </div></div>`;
}

function view404(){
  return `<div class="page"><div class="wrap"><div class="empty">
    <div class="ee">🧭</div><h2>Sayfa bulunamadı</h2>
    <p>Aradığınız içerik taşınmış olabilir.</p><a href="#/" class="btn btn-primary btn-sm" style="margin-top:12px">Ana Sayfaya Dön</a>
  </div></div></div>`;
}

/* ============================================================
   YÖNLENDİRME & RENDER
   ============================================================ */
function render(){
  const hash = location.hash || '#/';
  const seg = hash.replace(/^#\//,'').split('/');
  const root = seg[0]||'';
  let html='';
  switch(root){
    case '': html=viewHome(); break;
    case 'yazilimlar': html=viewProducts(); break;
    case 'yazilim': html=viewProduct(seg[1]); break;
    case 'cozumler': html=viewSolutions(); break;
    case 'blog': html=seg[1]?viewArticle(seg[1]):viewBlog(); break;
    case 'forum': html=viewForum(); break;
    case 'konu': html=viewTopic(seg[1]); break;
    case 'hakkimizda': html=viewAbout(); break;
    case 'iletisim': html=viewContact(); break;
    case 'yonetici': html=viewAdmin(); break;
    default: html=view404();
  }
  document.getElementById('app').innerHTML=html;
  // aktif nav
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active', (a.dataset.r||'')===root));
  // hero animasyonu
  if(root===''){ setTimeout(animateFs,300); }
  window.scrollTo({top:0,behavior:'instant'in window?'instant':'auto'});
  // mobil menü kapat
  document.getElementById('mobileMenu').classList.remove('open');
}

/* mobil menü */
document.getElementById('burger').addEventListener('click',()=>document.getElementById('mobileMenu').classList.toggle('open'));
document.getElementById('mobileMenu').addEventListener('click',e=>{ if(e.target.tagName==='A')document.getElementById('mobileMenu').classList.remove('open'); });

window.addEventListener('hashchange',render);

(async function init(){
  await window.loadData();
  render();
})();
