/* Sluttkontroll (FAT) WALL-MAN – Reglo AS
   Bygget på samme mal som «Årskontroll Wall-Man» (Roy-Henning), tilpasset sluttkontroll før levering.
   Kontrollpunkter: FAT_WM_Norsk + endringer avtalt i ChatGPT-overlevering (belastningsprøver) + ID20-punkter (FORELØPIG). */
'use strict';
const CFG = window.WM_CONFIG || {};
const SKJEMA = 'FAT WALL-MAN – digital prototyp v0.2 (23.11.2026) – IKKE GODKJENT SKJEMA';

/* Elementtyper:
   photo:true        bilde påkrevd (minst ett) når punktet merkes JA
   autoJa:true       JA settes automatisk når bilde lagres (gjelder bare punkter der kontrollen ER at bilde er tatt)
   measure:{nom,tol,unit}  måleverdi; tol:null = toleranse ikke fastsatt -> ingen automatisk vurdering
   load:{skjema,factor}    felt for faktisk prøvelast (kg). skjema = last i dagens skjema (satt for 150 kg). factor = veiledende koeffisient (FORELØPIG)
*/
const SECTIONS = [
  {nr:'1',title:'Montering og merking',bulk:true,items:[
    ['1.1','Håndspakventiler: 2 skruer i enden av håndspaken er satt inn med Loctite 638'],
    ['1.2','Plastplugger er montert i dører og foran på kurv'],
    ['1.3','Gummiprofil på rekkverk er montert'],
    ['1.4','Skilt på kurv og merke for sikkerhetskrok bak i kurv er montert'],
    ['1.5','8 bar-skilt er montert i toppen'],
    ['1.6','Lintra-feste i fronten er montert korrekt'],
    ['1.7','Låseblekk er knekt mot hodet på skruen, slik at skruebevegelse er låst'],
    ['1.8','Snor er montert i nødsenk-spak'],
    ['1.9','Slangeklemmer er montert i riktig retning på toppen av sylinder (servicevennlig)'],
    ['1.10','Det er klaring mellom nylontrinse og avstandsholder'],
    ['1.11','Sideveis shimsing av sylinder er utført'],
    ['1.12','Still-skruer er montert med 44 Nm og merket'],
    ['1.13','Bolter til avstandsrør på utsleide er montert med 44 Nm og merket'],
    ['1.14','Strips er montert på begge sider av beskyttelsestrekk på kabelkjede'],
    ['1.15','Bilde av ferdig montert lift er tatt',{photo:true,autoJa:true}]]},
  {nr:'2',title:'Funksjon og justering',bulk:true,items:[
    ['2.1','Alle bevegelser går riktig vei og korrekt i henhold til styrespak'],
    ['2.2','Lintra-sylinder tømmes når hovedkran stenges'],
    ['2.3','Ut/inn-hastighet er justert'],
    ['2.4','Hastighet på endedemping i bunnen er justert'],
    ['2.5','Det er klaring mellom opp/ned-sleide og bunnstopp'],
    ['2.6','Hastighet på brems er justert'],
    ['2.7','Full vandring på ut/inn-bevegelse'],
    ['2.8','Begge kjeder er like stramme, og kontramutter er tiltrukket'],
    ['2.9','Kurven synker ikke'],
    ['2.10','Hurtigavlufter fungerer'],
    ['2.11','Kjedeslakkventil fungerer'],
    ['2.12','Horn (fløyte) fungerer'],
    ['2.13','Kurvdørene lukker og låser seg selv, kan ikke åpnes utilsiktet og åpner ikke utover',{noBulk:true}],
    ['2.14','Alle bevegelser (opp/ned, ut/inn, sideveis) stopper når betjeningsspaken slippes',{noBulk:true}]]},
  {nr:'3',title:'Belastningsprøver – eksisterende verkstedpraksis',note:'Lastene i teksten er dagens praksis for 150 kg nyttelast. Ikke vurdert som komplett statisk/dynamisk prøving etter maskinforordningen.',items:[
    ['3.1','Belastet løfteprøve med 225 kg er gjennomført (opp og ned gjennom løfteområdet) før innstilling av overlastsikringen',{photo:true,load:{skjema:225}}],
    ['3.2','Overlastsikringen er innstilt og funksjonskontrollert med 200 kg prøvelast, med forventet utløsning/funksjon bekreftet',{load:{skjema:200}}],
    ['3.3','Holdetest med 200 kg i kurven er gjennomført i minst 30 minutter uten unormal synking, skade eller andre tegn på svikt',{load:{skjema:200}}],
    ['3.4','Lufttilførselen er stengt under holdetesten, og det er kontrollert at det ikke oppstår unormal synking eller luftlekkasje']]},
  {nr:'4',title:'Kontrollmål',img:'img/kontrollmal-223.png',items:[
    ['4.1','Kontrollmål fra topp skruehode på bunnseksjon til underkant plate opp/ned-sleide',{measure:{nom:10,tol:null,unit:'mm'}}],
    ['4.2','Opp/ned-sleide går ikke høyere enn 223 mm, målt fra topp stamme med ubemannet kurv. Kontrollmålstrek er markert på stammen etter mal',{measure:{nom:223,tol:5,unit:'mm'}}]]},
  {nr:'5',title:'Belastningsprøving ID20',prelim:true,optional:true,
    note:'FORELØPIG – prøvemetode, prøvelast og akseptkriterier er ikke teknisk godkjent. Registreres som pilot. Veiledende last = koeffisient × nominell nyttelast.',items:[
    ['5.1','Statisk belastningsprøving er gjennomført etter teknisk godkjent prøvemetode, uten skade, varig deformasjon eller andre tegn på svikt',{photo:true,load:{factor:1.25}}],
    ['5.2','Dynamisk prøve opp/ned: løfting og senking gjennom relevant arbeidsområde er gjennomført med godkjent prøvelast uten unormal bevegelse, funksjonsfeil eller skade',{photo:true,load:{factor:1.1}}],
    ['5.3','Dynamisk prøve ut/inn: bevegelsen gjennom relevant arbeidsområde er gjennomført med godkjent prøvelast uten unormal bevegelse, funksjonsfeil eller skade',{photo:true,load:{factor:1.1}}],
    ['5.4','Dynamisk prøve sideveis: bevegelsen gjennom relevant arbeidsområde er gjennomført med godkjent prøvelast uten unormal bevegelse, funksjonsfeil eller skade',{photo:true,load:{factor:1.1}}],
    ['5.5','Maskinen er kontrollert etter dynamisk belastningsprøving uten observerte skader, deformasjoner eller andre tegn på svikt']]},
  {nr:'6',title:'Pakking og utsending',bulk:true,items:[
    ['6.1','Hengelås er montert og nøkler er stripset fast'],
    ['6.2','Aluminiumsdeksel er ferdig, pakket og lagt klar'],
    ['6.3','Gummistoppere, kjede og diverse er sendt med'],
    ['6.4','Typeskilt er montert med produsent og kontaktadresse, modell, serienummer lik denne kontrollen, byggeår og CE-merke',{photo:true}],
    ['6.5','Skilt i kurven viser maks antall personer og maks last, og stemmer med nominell nyttelast på ordren',{photo:true}],
    ['6.6','Bruksanvisning og EU-samsvarserklæring følger med, eller lenke/QR-kode til dem er merket på maskinen'],
    ['6.7','Bilde av ferdig emballert produkt er tatt',{photo:true,autoJa:true}]]}
].map(s=>({...s,items:s.items.map(([nr,text,o])=>Object.assign({nr,text,prelim:!!s.prelim},o||{}))}));
const ALL=SECTIONS.flatMap(s=>s.items.map(it=>Object.assign({sec:s},it)));
const ITEM=nr=>ALL.find(i=>i.nr===nr);

/* ---------- helpers ---------- */
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const today=()=>{const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const fmtDate=v=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(v||'');return m?`${m[3]}.${m[2]}.${m[1]}`:(v||'')};
const fmtTime=v=>{if(!v)return'';const d=new Date(v);return fmtDate(v)+' '+pad(d.getHours())+':'+pad(d.getMinutes())};
const num=v=>{const n=parseFloat(String(v??'').replace(',','.'));return isFinite(n)?n:null};
const fmtNum=n=>String(Math.round(n*10)/10).replace('.',',');
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const clone=o=>JSON.parse(JSON.stringify(o));
let toastT;function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,3600)}
const ls={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}};

/* ---------- bilder i IndexedDB (localStorage er for lite til bilder) ---------- */
const IDB=(()=>{let dbp=null;const open=()=>dbp||(dbp=new Promise((res,rej)=>{const r=indexedDB.open('wm-fat-photos',1);r.onupgradeneeded=()=>r.result.createObjectStore('p');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}));
  const tx=(mode,fn)=>open().then(db=>new Promise((res,rej)=>{const t=db.transaction('p',mode);const st=t.objectStore('p');const out=fn(st);t.oncomplete=()=>res(out&&out.result!==undefined?out.result:out);t.onerror=()=>rej(t.error)}));
  return{put:(k,v)=>tx('readwrite',s=>{s.put(v,k)}),get:k=>tx('readonly',s=>s.get(k)),del:k=>tx('readwrite',s=>{s.delete(k)})}})();
const photoCache={};
async function photoData(id){if(photoCache[id])return photoCache[id];const v=await IDB.get(id);if(v)photoCache[id]=v;return v}
function shrink(file,max=1600){return new Promise((res,rej)=>{const url=URL.createObjectURL(file);const im=new Image();
  im.onload=()=>{const k=Math.min(1,max/Math.max(im.naturalWidth,im.naturalHeight));const c=document.createElement('canvas');c.width=Math.round(im.naturalWidth*k);c.height=Math.round(im.naturalHeight*k);
    const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(url);res({src:c.toDataURL('image/jpeg',0.78),w:c.width,h:c.height})};
  im.onerror=()=>{URL.revokeObjectURL(url);rej(new Error('Kunne ikke lese bildet'))};im.src=url})}

/* ---------- records (lagret på enheten) ---------- */
const REC_KEY='wm-fat-records-v1',CUR_KEY='wm-fat-current-v1';
function blank(){return{id:newId(),createdAt:new Date().toISOString(),rev:1,
  meta:{dato:today(),prodordre:'',salgsordre:'',kunde:'',serienr:'',nyttelast:'',vekt:'',ekstrautstyr:''},
  na:{},items:{},merknad:'',frigitt:'',
  sig1:{navn:'',dato:today(),img:''},sig2:{navn:'',dato:'',img:''}}}
let records=ls.get(REC_KEY,{});
let state=records[ls.get(CUR_KEY,'')]?Object.assign(blank(),clone(records[ls.get(CUR_KEY,'')])):blank();
const hasContent=s=>!!(s.meta.prodordre||s.meta.serienr||Object.keys(s.items).length||s.sig1.img);
function persistRecords(){if(!ls.set(REC_KEY,records))toast('Lagringsplassen er full. Slett gamle kontroller under «Lagrede».')}
let saveT;
function saveState(){clearTimeout(saveT);saveT=setTimeout(saveNow,350)}
function saveNow(){clearTimeout(saveT);if(!hasContent(state))return;state.updatedAt=new Date().toISOString();records[state.id]=clone(state);persistRecords();ls.set(CUR_KEY,state.id);updateCount();if(!$('#list').hidden)renderList()}
function getPath(p){return p.split('.').reduce((a,k)=>a==null?a:a[k],state)}
function setPath(p,v){const ks=p.split('.');let a=state;for(let i=0;i<ks.length-1;i++){if(a[ks[i]]==null)a[ks[i]]={};a=a[ks[i]]}a[ks[ks.length-1]]=v}
function touched(){if(state.final)return;saveState()}
const iv=nr=>state.items[nr]||(state.items[nr]={});

/* ---------- vurderinger ---------- */
const nominell=s=>num((s||state).meta.nyttelast);
function measureAuto(it,v){if(!it.measure||it.measure.tol==null)return null;const n=num(v);if(n==null)return null;return Math.abs(n-it.measure.nom)<=it.measure.tol?'ja':'nei'}
function loadHint(it,s){s=s||state;const L=it.load;if(!L)return'';const nl=nominell(s);
  if(L.factor){return nl?`Veiledende: ${fmtNum(L.factor)} × ${fmtNum(nl)} kg = ${fmtNum(L.factor*nl)} kg (FORELØPIG, ikke fastsatt)`:'Velg nominell nyttelast øverst for veiledende last'}
  if(L.skjema){return nl&&nl!==150?`Skjemaets ${L.skjema} kg er satt for 150 kg nyttelast. Denne maskinen: ${fmtNum(nl)} kg – avklar prøvelast med Teknisk`:`Skjema: ${L.skjema} kg`}
  return''}
const loadWarn=(it,s)=>!!(it.load&&it.load.skjema&&nominell(s)&&nominell(s)!==150);
function stats(s){let tot=0,done=0;const nei=[];
  SECTIONS.forEach(sec=>{if(s.na[sec.nr])return;sec.items.forEach(it=>{tot++;const v=s.items[it.nr];if(v&&v.s){done++;if(v.s==='nei')nei.push(it)}})});return{tot,done,nei}}
function problems(s){const p=[];const m=s.meta;
  if(!m.prodordre)p.push('Produksjonsordre mangler');if(!m.serienr)p.push('Serienummer mangler');if(!nominell(s))p.push('Nominell nyttelast mangler');
  SECTIONS.forEach(sec=>{if(s.na[sec.nr])return;sec.items.forEach(it=>{const v=s.items[it.nr]||{};
    if(!v.s){p.push(`${it.nr}: ikke besvart`);return}
    if(v.s==='nei'&&!String(v.c||'').trim())p.push(`${it.nr}: NEI krever avviksbeskrivelse`);
    if(v.s==='ir'&&!String(v.c||'').trim()&&(it.photo||it.load||it.measure))p.push(`${it.nr}: I/R krever begrunnelse`);
    if(v.s==='ja'&&it.photo&&!(v.photos||[]).length)p.push(`${it.nr}: bilde mangler`);
    if(v.s==='ja'&&it.measure&&num(v.v)==null)p.push(`${it.nr}: måleverdi mangler`);
    if(v.s==='ja'&&it.load&&num(v.last)==null)p.push(`${it.nr}: faktisk prøvelast mangler`)})});
  const {nei}=stats(s);
  if(!s.frigitt)p.push('Frigivelse (JA/NEI) er ikke valgt');
  if(s.frigitt==='JA'&&nei.length)p.push(`Kan ikke frigis med ${nei.length} NEI-punkt – lukk avvik eller velg NEI`);
  if(!s.sig1.navn||!s.sig1.img)p.push('Signatur 1 (utført av) mangler navn eller signatur');
  if(!s.sig2.navn||!s.sig2.img)p.push('Signatur 2 (kontrollert av) mangler navn eller signatur');
  return p}

/* ---------- rendering ---------- */
const PEN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
const CAM='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
function field(label,path,type='text',opts={}){
  return `<label class="f${opts.wide?' wide':''}"><span>${label}${opts.req?' <b class="req">*</b>':''}</span><input id="f-${path.replace(/\./g,'-')}" data-path="${path}" type="${type}" value="${esc(getPath(path))}" ${opts.attrs||''}></label>`}
function seg(path,opts){const v=getPath(path)||'';
  return `<div class="seg" data-path="${path}" role="group">${opts.map(o=>`<button type="button" data-v="${esc(o)}" aria-pressed="${v===o}">${esc(o)}</button>`).join('')}</div>`}
function photoStrip(it){const ph=(state.items[it.nr]||{}).photos||[];
  return `<div class="thumbs" data-thumbs="${it.nr}">${ph.map(p=>`<span class="th" data-pid="${p.id}"><img alt="Bilde ${it.nr}" data-src="${p.id}"><button type="button" class="thdel" aria-label="Slett bilde">×</button></span>`).join('')}</div>`}
function itemHTML(it){
  const v=state.items[it.nr]||{};const showC=!!v.c||v.s==='nei';const ph=(v.photos||[]).length;
  const b=(s,t,c)=>`<button type="button" class="st ${c}" data-s="${s}" aria-pressed="${v.s===s}">${t}</button>`;
  const tags=(it.prelim?'<span class="tag pre">FORELØPIG</span>':'')+(it.photo?'<span class="tag">Bilde påkrevd</span>':'');
  let extra='';
  if(it.measure){const m=it.measure;const auto=measureAuto(it,v.v);
    extra+=`<div class="xrow"><label class="mini"><span>Måleverdi</span><span class="unit"><input data-val="${it.nr}" data-k="v" type="text" inputmode="decimal" value="${esc(v.v)}"><em>${m.unit}</em></span></label>
      <span class="xhint ${m.tol==null?'warn':''}">${m.tol==null?`Nominelt ${m.nom} ${m.unit}. Toleranse ikke fastsatt – vurder og merk manuelt`:`Krav: ${m.nom} ± ${m.tol} ${m.unit}`}${auto?` · <b class="${auto}">${auto==='ja'?'innenfor':'UTENFOR'}</b>`:''}</span></div>`}
  if(it.load){extra+=`<div class="xrow"><label class="mini"><span>Faktisk prøvelast</span><span class="unit"><input data-val="${it.nr}" data-k="last" type="text" inputmode="decimal" value="${esc(v.last)}"><em>kg</em></span></label>
      <span class="xhint${loadWarn(it)?' warn':''}" data-lh="${it.nr}">${esc(loadHint(it))}</span></div>`}
  return `<div class="item s-${v.s||'none'}" data-nr="${it.nr}"><span class="nr">${it.nr}</span><span class="lbl">${esc(it.text)}${tags?`<span class="tags">${tags}</span>`:''}</span>
    <div class="acts">${it.photo?`<label class="pbtn${ph?' has':''}" aria-label="Ta eller velg bilde for ${it.nr}">${CAM}<span class="pc">${ph||''}</span><input type="file" accept="image/*" data-photo="${it.nr}" hidden></label>`:''}${b('ja','JA','st-ok')}${b('nei','NEI','st-avvik')}${b('ir','I/R','st-ia')}<button type="button" class="cbtn${v.c?' has':''}" aria-label="Kommentar til ${it.nr}" aria-expanded="${showC}">${PEN}</button></div>
    ${extra?`<div class="xtra">${extra}</div>`:''}
    ${it.photo?photoStrip(it):''}
    <textarea class="cmt" data-comment="${it.nr}" rows="2" placeholder="${v.s==='nei'?'Beskriv avviket (påkrevd)':'Kommentar til '+it.nr}" ${showC?'':'hidden'}>${esc(v.c)}</textarea></div>`}
function sectionHTML(sec){const na=!!state.na[sec.nr];
  return `<section class="sec${na?' is-na':''}${sec.prelim?' prelim':''}" data-sec="${sec.nr}"><header class="sec-h"><span class="sec-nr">${sec.nr}</span><h2>${sec.title}${sec.prelim?' <span class="tag pre">FORELØPIG</span>':''}</h2>
    <span class="sec-count" data-count="${sec.nr}"></span><div class="sec-tools">${sec.optional?`<button type="button" class="chip na-toggle" aria-pressed="${na}">Ikke utført</button>`:''}${sec.bulk?'<button type="button" class="chip allok">Resten JA</button>':''}</div></header>
    ${sec.note?`<p class="secnote">${esc(sec.note)}</p>`:''}
    <div class="sec-body">${sec.img?`<details class="ref"><summary>Vis illustrasjon for kontrollmål</summary><img src="${sec.img}" alt="Illustrasjon kontrollmål 223 mm"></details>`:''}${sec.items.map(itemHTML).join('')}</div></section>`}
function sigHTML(n,title){const k='sig'+n;
  return `<div class="sigcol"><h3>${title}</h3><div class="grid">${field('Navn',k+'.navn','text',{req:1})}${field('Dato',k+'.dato','date')}</div>
    <div class="sigbox"><canvas id="${k}" data-sig="${k}" aria-label="Signaturfelt ${n}"></canvas><div class="sigline"></div><span class="sigl">Signer med fingeren</span><button type="button" class="chip sigclr" data-clr="${k}">Tøm</button></div></div>`}
function renderForm(){
  const f=state.final;
  $('#form').innerHTML=`
  ${f?`<div class="lockbar"><span><b>Fullført og låst</b> ${esc(fmtTime(state.finalAt))} · Revisjon ${state.rev}. Rettelser gjøres som ny revisjon, ikke ved å endre denne.</span><button class="btn small" type="button" data-act="rev">Lag rettet revisjon</button></div>`:''}
  <div class="card"><div class="grid">
    ${field('Dato','meta.dato','date')}${field('Produksjonsordre (PO)','meta.prodordre','text',{req:1})}
    ${field('Salgsordre (SO)','meta.salgsordre')}${field('Kunde','meta.kunde')}
    ${field('Serienummer','meta.serienr','text',{req:1})}
    <div class="f"><span class="lbl-s">Nominell nyttelast <b class="req">*</b></span>${seg('meta.nyttelast',['150','200','225'])}</div>
    <label class="f"><span>Vekt inkl. aluminiumsdeksel</span><span class="unit"><input data-path="meta.vekt" type="text" inputmode="decimal" value="${esc(state.meta.vekt)}"><em>kg</em></span></label>
    <label class="f wide"><span>Ekstrautstyr (varenr og navn)</span><textarea data-path="meta.ekstrautstyr" rows="2">${esc(state.meta.ekstrautstyr)}</textarea></label>
  </div></div>
  ${SECTIONS.map(sectionHTML).join('')}
  <section class="sec"><header class="sec-h"><h2>Merknader</h2></header>
    <label class="f"><textarea data-path="merknad" rows="3" placeholder="Andre merknader, utført retting av avvik …">${esc(state.merknad)}</textarea></label></section>
  <section class="sec"><header class="sec-h"><h2>Frigivelse og signatur</h2></header>
    <div class="concl">
      <div class="avvlist" id="avvList" hidden></div>
      <div class="row"><span>Alle kontrollpunkter utført – produktet frigis for levering</span>${seg('frigitt',['JA','NEI'])}</div>
      <div class="sigs">${sigHTML(1,'Signatur 1 – utført av')}${sigHTML(2,'Signatur 2 – kontrollert av')}</div>
    </div>
    <div class="problist" id="probList" hidden></div>
    <div class="endacts">${f?'':'<button class="btn" type="button" data-act="check">Sjekk utfylling</button><button class="btn primary" type="button" data-act="finish">Fullfør og lås</button>'}
      ${f?'<button class="btn" type="button" data-act="pdf">Del / lagre PDF</button><button class="btn primary" type="button" data-act="sp">Last opp til leveransearkiv</button>':''}</div>
    <p class="note" id="spNote"></p>
  </section>`;
  ['sig1','sig2'].forEach(initSignature);loadThumbs();updateProgress();renderSpNote();
  if(f)$('#form').querySelectorAll('input,textarea,button,.seg button').forEach(el=>{if(!el.closest('.endacts')&&!el.closest('.lockbar'))el.disabled=true});
  $('#form').classList.toggle('locked',!!f);
}
async function loadThumbs(){for(const img of document.querySelectorAll('img[data-src]')){const d=await photoData(img.dataset.src);if(d)img.src=d.src;img.removeAttribute('data-src')}}
function updateItem(nr){
  const el=$(`.item[data-nr="${nr}"]`);if(!el)return;const v=state.items[nr]||{};
  el.className='item s-'+(v.s||'none');
  el.querySelectorAll('.st').forEach(b=>b.setAttribute('aria-pressed',String(v.s===b.dataset.s)));
  const ta=el.querySelector('.cmt'),cb=el.querySelector('.cbtn');
  if(v.s==='nei'&&ta.hidden){ta.hidden=false;cb.setAttribute('aria-expanded','true')}
  ta.placeholder=v.s==='nei'?'Beskriv avviket (påkrevd)':'Kommentar til '+nr;
  cb.classList.toggle('has',!!v.c)}
function updateProgress(){
  const {tot,done,nei}=stats(state);
  SECTIONS.forEach(sec=>{const c=$(`[data-count="${sec.nr}"]`);if(!c)return;if(state.na[sec.nr]){c.textContent='';return}
    c.textContent=`${sec.items.filter(i=>state.items[i.nr]&&state.items[i.nr].s).length}/${sec.items.length}`});
  $('#progTxt').textContent=`${done} av ${tot} punkter`;$('#progFill').style.width=(tot?done/tot*100:0)+'%';
  $('#progAvv').textContent=nei.length?`${nei.length} NEI / avvik`:'';$('#progAvv').className=nei.length?'avv':'';
  const al=$('#avvList');if(al){al.hidden=!nei.length;al.innerHTML=nei.length?`<b>Avvik:</b> ${nei.map(it=>esc(it.nr+' '+it.text)).join(' · ')}`:''}}
function showProblems(){const p=problems(state);const el=$('#probList');el.hidden=false;
  el.innerHTML=p.length?`<b>${p.length} ting må ordnes før kontrollen kan fullføres:</b><ul>${p.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<b class="okt">Alt er utfylt. Kontrollen kan fullføres.</b>';
  el.scrollIntoView({behavior:'smooth',block:'center'});return p}

/* ---------- events ---------- */
const form=$('#form');
form.addEventListener('input',e=>{const t=e.target;if(state.final)return;
  if(t.dataset.path){setPath(t.dataset.path,t.value);if(/^meta\.(prodordre|serienr|dato)$/.test(t.dataset.path))renderSpNote()}
  else if(t.dataset.comment){const nr=t.dataset.comment;iv(nr).c=t.value;t.closest('.item').querySelector('.cbtn').classList.toggle('has',!!t.value)}
  else if(t.dataset.val){const nr=t.dataset.val,it=ITEM(nr);iv(nr)[t.dataset.k]=t.value;
    if(it.measure){const a=measureAuto(it,t.value);if(a){iv(nr).s=a;updateItem(nr);updateProgress()}
      const h=t.closest('.xrow').querySelector('.xhint');const m=it.measure;h.innerHTML=(m.tol==null?`Nominelt ${m.nom} ${m.unit}. Toleranse ikke fastsatt – vurder og merk manuelt`:`Krav: ${m.nom} ± ${m.tol} ${m.unit}`)+(a?` · <b class="${a}">${a==='ja'?'innenfor':'UTENFOR'}</b>`:'')}}
  touched()});
form.addEventListener('change',async e=>{const t=e.target;if(!t.dataset.photo||state.final)return;const nr=t.dataset.photo,it=ITEM(nr);const files=[...t.files];t.value='';
  for(const file of files){try{const d=await shrink(file);const id='p'+newId();await IDB.put(id,d);photoCache[id]=d;const v=iv(nr);(v.photos=v.photos||[]).push({id,t:new Date().toISOString()});
    if(it.autoJa&&!v.s)v.s='ja'}catch(err){toast('Bildet kunne ikke lagres: '+err.message)}}
  const el=$(`.item[data-nr="${nr}"]`);el.querySelector('[data-thumbs]').outerHTML=photoStrip(it);const pb=el.querySelector('.pbtn');const n=(iv(nr).photos||[]).length;pb.classList.toggle('has',!!n);pb.querySelector('.pc').textContent=n||'';
  loadThumbs();updateItem(nr);updateProgress();saveNow();toast(it.autoJa?'Bilde lagret – punktet er merket JA':'Bilde lagret. Merk resultatet selv – bilde alene er ikke bestått prøve')});
form.addEventListener('click',e=>{
  const act=e.target.closest('[data-act]');
  if(act){const a=act.dataset.act;if(a==='pdf')sharePdf();else if(a==='sp')uploadCurrent();else if(a==='check')showProblems();else if(a==='finish')finish();else if(a==='rev')newRevision();return}
  if(state.final)return;
  const sb=e.target.closest('.seg button');
  if(sb){const sg=sb.parentElement,p=sg.dataset.path,v=sb.dataset.v,nv=getPath(p)===v?'':v;setPath(p,nv);sg.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===nv)));
    if(p==='meta.nyttelast')ALL.filter(i=>i.load).forEach(it=>{const h=$(`[data-lh="${it.nr}"]`);if(h){h.textContent=loadHint(it);h.classList.toggle('warn',loadWarn(it))}});
    updateProgress();touched();return}
  const st=e.target.closest('.st');
  if(st){const nr=st.closest('.item').dataset.nr,v=iv(nr);v.s=v.s===st.dataset.s?'':st.dataset.s;updateItem(nr);updateProgress();touched();return}
  const cb=e.target.closest('.cbtn');
  if(cb){const ta=cb.closest('.item').querySelector('.cmt');ta.hidden=!ta.hidden;cb.setAttribute('aria-expanded',String(!ta.hidden));if(!ta.hidden)ta.focus();return}
  const td=e.target.closest('.thdel');
  if(td){const th=td.closest('.th'),nr=th.closest('.item').dataset.nr,pid=th.dataset.pid;if(!confirmArm(td,'Slett?'))return;
    iv(nr).photos=(iv(nr).photos||[]).filter(p=>p.id!==pid);th.remove();IDB.del(pid).catch(()=>{});const pb=$(`.item[data-nr="${nr}"] .pbtn`);const n=iv(nr).photos.length;pb.classList.toggle('has',!!n);pb.querySelector('.pc').textContent=n||'';touched();return}
  const ao=e.target.closest('.allok');
  if(ao){const sec=SECTIONS.find(s=>s.nr===ao.closest('.sec').dataset.sec);let n=0;
    sec.items.forEach(it=>{if(it.photo||it.noBulk)return;const v=iv(it.nr);if(!v.s){v.s='ja';updateItem(it.nr);n++}});
    updateProgress();touched();toast(n?`${n} punkter merket JA${sec.items.some(i=>i.photo||i.noBulk)?' (bilde- og funksjonstestpunkter må tas manuelt)':''}`:'Alle punkter er allerede utfylt');return}
  const na=e.target.closest('.na-toggle');
  if(na){const s=na.closest('.sec'),nr=s.dataset.sec;state.na[nr]=!state.na[nr];s.classList.toggle('is-na',state.na[nr]);na.setAttribute('aria-pressed',String(state.na[nr]));updateProgress();touched();return}
  const clr=e.target.closest('[data-clr]');if(clr){state[clr.dataset.clr].img='';sigRedraw[clr.dataset.clr]();touched();return}
});
function confirmArm(btn,txt){if(btn.dataset.arm){return true}btn.dataset.arm='1';const o=btn.textContent;btn.textContent=txt;btn.classList.add('armed');setTimeout(()=>{if(btn.isConnected){btn.textContent=o;delete btn.dataset.arm;btn.classList.remove('armed')}},3000);return false}
function finish(){saveNow();const p=showProblems();if(p.length)return;
  state.final=true;state.finalAt=new Date().toISOString();records[state.id]=clone(state);persistRecords();renderForm();toast('Kontrollen er fullført og låst');
  setTimeout(()=>$('#spNote').scrollIntoView({behavior:'smooth',block:'center'}),100)}
async function newRevision(){saveNow();const old=state;const n=clone(old);
  Object.assign(n,{id:newId(),createdAt:new Date().toISOString(),rev:(old.rev||1)+1,parentId:old.id,final:false,finalAt:null,frigitt:'',spUrl:'',spFile:'',pending:false,uploadedAt:null,
    sig1:{navn:'',dato:today(),img:''},sig2:{navn:'',dato:'',img:''}});
  for(const nr in n.items){for(const p of (n.items[nr].photos||[])){const d=await photoData(p.id);const id='p'+newId();if(d){await IDB.put(id,d);photoCache[id]=d}p.id=id}}
  state=n;saveNow();renderForm();showTab('form');toast(`Revisjon ${n.rev} opprettet. Ny signering kreves.`)}

/* ---------- signatur ---------- */
const sigRedraw={};
function initSignature(key){
  const cv=document.getElementById(key);if(!cv)return;const ctx=cv.getContext('2d');
  sigRedraw[key]=()=>{const r=cv.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
    cv.width=Math.round(r.width*dpr);cv.height=Math.round(r.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.lineWidth=2.4;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#111';ctx.fillStyle='#111';
    if(state[key].img){const im=new Image();im.onload=()=>ctx.drawImage(im,0,0,r.width,r.height);im.src=state[key].img}};
  sigRedraw[key]();
  let drawing=false,last=null;
  const pt=e=>{const r=cv.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
  cv.addEventListener('pointerdown',e=>{if(state.final)return;drawing=true;try{cv.setPointerCapture(e.pointerId)}catch(_){}last=pt(e);ctx.beginPath();ctx.arc(last.x,last.y,1.2,0,Math.PI*2);ctx.fill();e.preventDefault()});
  cv.addEventListener('pointermove',e=>{if(!drawing)return;const p=pt(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;e.preventDefault()});
  const end=()=>{if(!drawing)return;drawing=false;state[key].img=cv.toDataURL('image/png');if(!state[key].dato)state[key].dato=today();touched()};
  cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
}
let rzT,lastW=window.innerWidth;window.addEventListener('resize',()=>{if(window.innerWidth===lastW)return;lastW=window.innerWidth;clearTimeout(rzT);rzT=setTimeout(()=>Object.values(sigRedraw).forEach(f=>f()),200)});

/* ---------- faner, ny, liste ---------- */
function showTab(which){const f=which==='form';
  $('#tab-form').setAttribute('aria-selected',String(f));$('#tab-list').setAttribute('aria-selected',String(!f));
  $('#form').hidden=!f;$('#list').hidden=f;$('#progRow').hidden=!f;if(!f)renderList();window.scrollTo(0,0)}
$('#tab-form').onclick=()=>showTab('form');$('#tab-list').onclick=()=>{saveNow();showTab('list')};
function openRecord(s){saveNow();state=Object.assign(blank(),clone(s));ls.set(CUR_KEY,state.id);spErr='';renderForm();showTab('form')}
$('#btnNew').onclick=()=>{saveNow();state=blank();ls.set(CUR_KEY,'');spErr='';renderForm();showTab('form');toast(Object.keys(records).length?'Ny sluttkontroll. Tidligere kontroller ligger under «Lagrede».':'Ny sluttkontroll')};
function updateCount(){const n=Object.keys(records).length;$('#savedCount').textContent=n?`(${n})`:''}
function recStatus(r){return !r.final?['wip','Ikke ferdig']:r.frigitt==='JA'?['ok','Frigitt']:['no','Ikke frigitt']}
let delArm=null;
function renderList(){
  updateCount();
  const q=$('#search').value.trim().toLowerCase();
  const all=Object.values(records).sort((a,b)=>String(b.updatedAt||'').localeCompare(String(a.updatedAt||'')));
  const rs=all.filter(r=>!q||[r.meta.kunde,r.meta.serienr,r.meta.prodordre,r.meta.salgsordre,r.sig1&&r.sig1.navn].join(' ').toLowerCase().includes(q));
  const pend=all.filter(r=>r.pending).length;const qn=$('#queueNote');qn.hidden=!pend;qn.textContent=pend?`${pend} kontroll${pend>1?'er':''} venter på opplasting. Det skjer automatisk når du har nett og er logget inn.`:'';
  if(!all.length){$('#recs').innerHTML='<p class="empty">Ingen sluttkontroller på denne enheten ennå. Start en ny under «Kontroll».</p>';return}
  if(!rs.length){$('#recs').innerHTML='<p class="empty">Ingen treff.</p>';return}
  $('#recs').innerHTML=rs.map(r=>{const [c,t]=recStatus(r);const m=r.meta;const {nei}=stats(r);
    const sp=r.pending?'<span class="pill wip">Venter på opplasting</span>':r.spUrl?'<span class="pill ok">I leveransearkiv</span>':'';
    return `<div class="rec" data-id="${esc(r.id)}"><div><h3>SN ${esc(m.serienr||'–')}${r.rev>1?` · rev ${r.rev}`:''}</h3>
      <div class="meta">${[m.prodordre&&'PO '+m.prodordre,m.salgsordre&&'SO '+m.salgsordre,m.kunde,fmtDate(m.dato),r.sig1&&r.sig1.navn].filter(Boolean).map(esc).join(' · ')}${nei.length?` · <b style="color:var(--warn)">${nei.length} avvik</b>`:''}</div></div>
      <div class="pills"><span class="pill ${c}">${t}</span>${sp}</div>
      <div class="ra"><button class="btn small" data-r="open">Åpne</button><button class="btn small danger" data-r="del">${delArm===r.id?'Bekreft sletting':'Slett fra enheten'}</button></div></div>`}).join('');
}
$('#search').addEventListener('input',renderList);
$('#recs').addEventListener('click',e=>{
  const b=e.target.closest('[data-r]');if(!b)return;const id=b.closest('.rec').dataset.id;const r=records[id];if(!r)return;
  if(b.dataset.r==='open'){openRecord(r)}
  else if(b.dataset.r==='del'){
    if(r.final&&!r.spUrl&&delArm!==id){toast('Denne er fullført, men ikke lastet opp. Last opp eller del PDF før du sletter.')}
    if(delArm!==id){delArm=id;renderList();setTimeout(()=>{if(delArm===id){delArm=null;renderList()}},4000);return}
    delArm=null;const used=new Set(Object.values(records).filter(x=>x.id!==id).flatMap(x=>Object.values(x.items).flatMap(v=>(v.photos||[]).map(p=>p.id))));
    Object.values(r.items).forEach(v=>(v.photos||[]).forEach(p=>{if(!used.has(p.id))IDB.del(p.id).catch(()=>{})}));
    delete records[id];persistRecords();if(state.id===id){state=blank();renderForm()}renderList();toast('Kontroll slettet fra enheten')}
});

/* ---------- PDF ---------- */
let logoJpg=null;
function toJpeg(src,w,h){return new Promise(res=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=w||im.naturalWidth;c.height=h||im.naturalHeight;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);try{res(c.toDataURL('image/jpeg',0.85))}catch(e){res(null)}};im.onerror=()=>res(null);im.src=src})}
const logoReady=toJpeg('data:image/svg+xml;charset=utf-8,'+encodeURIComponent($('#logo').outerHTML),600,235).then(d=>logoJpg=d);
const RES={ja:'JA',nei:'NEI',ir:'I/R'};
async function buildPdf(s){
  await logoReady;
  const sig=async k=>s[k].img?await toJpeg(s[k].img,560,140):null;const sig1=await sig('sig1'),sig2=await sig('sig2');
  const {jsPDF}=window.jspdf;const doc=new jsPDF({unit:'mm',format:'a4',compress:true});
  const W=210,M=14,m=s.meta,GREY=[107,107,107],LINE=[208,208,208],WARN=[194,65,12];
  if(logoJpg)doc.addImage(logoJpg,'JPEG',W-M-40,10,40,40*86.469/220.503);
  doc.setFont('helvetica','normal');doc.setFontSize(7.5);doc.setTextColor(...GREY);doc.text(doc.splitTextToSize('Skjema: '+SKJEMA,110),M,13);
  doc.setTextColor(17);doc.setFont('helvetica','bold');doc.setFontSize(17);doc.text('SLUTTKONTROLL (FAT) WALL-MAN',W/2,34,{align:'center'});
  const info=[['Dato',fmtDate(m.dato),'Serienummer',m.serienr],['Produksjonsordre',m.prodordre,'Nominell nyttelast',m.nyttelast?m.nyttelast+' kg':''],
    ['Salgsordre',m.salgsordre,'Vekt inkl. alu-deksel',m.vekt?m.vekt+' kg':''],['Kunde',m.kunde,'Kontrollrevisjon',String(s.rev||1)+(s.final?' · låst '+fmtTime(s.finalAt):' · IKKE FULLFØRT')]];
  doc.setDrawColor(...LINE);doc.setLineWidth(0.2);doc.line(M,40,W-M,40);
  doc.autoTable({startY:41,body:info,theme:'plain',margin:{left:M,right:M},styles:{font:'helvetica',fontSize:9,cellPadding:{top:1.1,bottom:1.1,left:1,right:1},textColor:17},
    columnStyles:{0:{textColor:GREY,cellWidth:30},1:{cellWidth:60},2:{textColor:GREY,cellWidth:36}}});
  let y=doc.lastAutoTable.finalY+1;doc.line(M,y,W-M,y);y+=5;
  if(m.ekstrautstyr){doc.setFontSize(9);doc.setTextColor(...GREY);doc.text('Ekstrautstyr:',M,y);doc.setTextColor(17);const l=doc.splitTextToSize(m.ekstrautstyr,W-2*M-24);doc.text(l,M+24,y);y+=l.length*4+3}
  const body=[];
  SECTIONS.forEach(sec=>{const na=s.na[sec.nr];
    body.push([{content:`${sec.nr}   ${sec.title}${sec.prelim?'  (FORELØPIG – ikke godkjent prøvemetode)':''}${na?'  – ikke utført':''}`,colSpan:5,styles:{fontStyle:'bold',fillColor:[245,247,242]}}]);
    if(na)return;
    sec.items.forEach(it=>{const v=s.items[it.nr]||{};const val=[];
      if(it.measure&&v.v)val.push(`${v.v} ${it.measure.unit}`+(it.measure.tol!=null?` (${it.measure.nom}±${it.measure.tol})`:' (tol. ikke fastsatt)'));
      if(it.load&&v.last)val.push(`Last ${v.last} kg`);
      if((v.photos||[]).length)val.push(`${v.photos.length} bilde${v.photos.length>1?'r':''}`);
      body.push([it.nr,it.text,RES[v.s]||'',val.join('\n'),v.c||''])})});
  doc.autoTable({startY:y,head:[['Nr','Kontrollpunkt','Resultat','Verdi / evidens','Kommentar / avvik']],body,theme:'grid',margin:{left:M,right:M,bottom:18},
    styles:{font:'helvetica',fontSize:8,cellPadding:1.5,lineColor:LINE,lineWidth:0.15,textColor:17,valign:'middle'},
    headStyles:{fillColor:[255,255,255],textColor:17,fontStyle:'bold',lineColor:[17,17,17]},
    columnStyles:{0:{cellWidth:10},1:{cellWidth:80},2:{cellWidth:16,halign:'center'},3:{cellWidth:30},4:{}},
    didParseCell:d=>{if(d.section==='body'&&d.column.index===2){if(d.cell.raw==='NEI'){d.cell.styles.textColor=WARN;d.cell.styles.fontStyle='bold'}else if(d.cell.raw==='JA')d.cell.styles.fontStyle='bold'}}});
  y=doc.lastAutoTable.finalY+7;
  const need=h=>{if(y+h>278){doc.addPage();y=20}};
  doc.setFontSize(10);
  if(s.merknad){const l=doc.splitTextToSize(s.merknad,W-2*M);need(8+l.length*4.2);doc.setFont('helvetica','bold');doc.text('Merknader',M,y);y+=5;doc.setFont('helvetica','normal');doc.setFontSize(9);doc.text(l,M,y);y+=l.length*4.2+5;doc.setFontSize(10)}
  need(58);doc.setDrawColor(...LINE);doc.line(M,y-2,W-M,y-2);y+=3;
  doc.setFont('helvetica','normal');doc.setTextColor(...GREY);doc.text('Alle kontrollpunkter utført – frigitt for levering:',M,y);doc.setTextColor(17);doc.setFont('helvetica','bold');doc.text(s.frigitt||'–',M+82,y);y+=8;
  const sigBlock=(x,title,sg,img)=>{doc.setFontSize(9);doc.setFont('helvetica','bold');doc.setTextColor(17);doc.text(title,x,y);doc.setFont('helvetica','normal');
    doc.text(`${sg.navn||'–'}   ${fmtDate(sg.dato)}`,x,y+5);if(img){try{doc.addImage(img,'JPEG',x,y+7,72,18)}catch(e){}}
    doc.setDrawColor(...GREY);doc.line(x,y+26,x+80,y+26);doc.setFontSize(7.5);doc.setTextColor(...GREY);doc.text('Signatur',x,y+29.5)};
  sigBlock(M,'Signatur 1 – utført av',s.sig1,sig1);sigBlock(W/2+2,'Signatur 2 – kontrollert av',s.sig2,sig2);y+=36;
  /* bildevedlegg */
  const phs=[];SECTIONS.forEach(sec=>{if(s.na[sec.nr])return;sec.items.forEach(it=>((s.items[it.nr]||{}).photos||[]).forEach(p=>phs.push({it,p})))});
  if(phs.length){doc.addPage();y=18;doc.setFont('helvetica','bold');doc.setFontSize(12);doc.setTextColor(17);doc.text(`Bildevedlegg – SN ${m.serienr||'–'}`,M,y);y+=6;
    const cw=(W-2*M-6)/2;let col=0,rowH=0;
    for(const {it,p} of phs){const d=await photoData(p.id);if(!d)continue;const h=Math.min(cw*d.h/d.w,95);const w=h*d.w/d.h;
      if(col===0&&y+h+10>282){doc.addPage();y=18}
      const x=M+col*(cw+6);try{doc.addImage(d.src,'JPEG',x,y,w,h)}catch(e){}
      doc.setFont('helvetica','normal');doc.setFontSize(7.5);doc.setTextColor(...GREY);doc.text(doc.splitTextToSize(`${it.nr} ${it.text} · ${fmtTime(p.t)}`,cw),x,y+h+3.5);
      rowH=Math.max(rowH,h+10);col++;if(col===2){col=0;y+=rowH;rowH=0}}
  }
  const pages=doc.getNumberOfPages();
  for(let i=1;i<=pages;i++){doc.setPage(i);doc.setDrawColor(...LINE);doc.line(M,284,W-M,284);doc.setFontSize(7);doc.setTextColor(...GREY);
    doc.text(`Sluttkontroll WALL-MAN · SN ${m.serienr||'–'} · PO ${m.prodordre||'–'} · rev ${s.rev||1} · Reglo AS, Halumveien 11, 3158 Andebu · Org.nr. 983 148 336 MVA`,W/2,288,{align:'center'});
    doc.text(`Side ${i} av ${pages}`,W-M,292,{align:'right'})}
  return doc.output('blob');
}
const spName=s=>String(s||'').replace(/["*:<>?\/\\|#%]/g,'').replace(/\s+/g,' ').trim().replace(/\.+$/,'');
const pdfName=s=>`FAT WALL-MAN SN ${spName(s.meta.serienr)||'uten-serienr'} PO ${spName(s.meta.prodordre)||'-'} ${fmtDate(s.meta.dato||today())}${(s.rev||1)>1?' rev '+s.rev:''}.pdf`;
async function sharePdf(){
  if(!window.jspdf){toast('PDF-verktøyet er ikke lastet. Åpne appen med nett én gang først.');return}
  saveNow();toast('Lager PDF …');const blob=await buildPdf(state);const name=pdfName(state);
  const file=new File([blob],name,{type:'application/pdf'});
  if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({files:[file],title:name})}catch(e){}return}
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
}

/* ---------- Microsoft-innlogging ---------- */
const configured=!!(CFG.clientId&&!/SETT-INN/i.test(CFG.clientId)&&window.msal&&CFG.leveranseFolderId&&!/SETT-INN/i.test(CFG.leveranseFolderId));
const SCOPES=['Files.ReadWrite.All'];
let msalApp=null,account=null;
async function initAuth(){
  if(!configured){renderWho();return}
  const base=location.origin+location.pathname.replace(/[^/]*$/,'');
  msalApp=new msal.PublicClientApplication({auth:{clientId:CFG.clientId,authority:'https://login.microsoftonline.com/'+(CFG.tenant||'organizations'),redirectUri:CFG.redirectUri||base,navigateToLoginRequestUrl:false},cache:{cacheLocation:'localStorage',storeAuthStateInCookie:true}});
  try{const res=await msalApp.handleRedirectPromise();if(res&&res.account)account=res.account}catch(e){toast('Innloggingen ble avbrutt.')}
  account=account||msalApp.getAllAccounts()[0]||null;if(account)msalApp.setActiveAccount(account);
  renderWho();
  const after=sessionStorage.getItem('wm-fat-after-login');sessionStorage.removeItem('wm-fat-after-login');
  if(account&&after&&records[after]){if(state.id!==after)openRecord(records[after]);uploadCurrent()}
  else processQueue();
}
function renderWho(){
  const w=$('#who');
  if(!configured){w.innerHTML='<span>Leveransearkiv ikke satt opp</span>';return}
  w.innerHTML=account?`<span class="nm">${esc(account.name||account.username)}</span><button class="chip" id="btnLogout" type="button">Logg ut</button>`:`<button class="chip" id="btnLogin" type="button">Logg inn</button>`;
  const li=$('#btnLogin');if(li)li.onclick=()=>login();
  const lo=$('#btnLogout');if(lo)lo.onclick=()=>msalApp.logoutRedirect({account,postLogoutRedirectUri:location.href.split('#')[0]});
}
function login(afterId){saveNow();if(afterId)sessionStorage.setItem('wm-fat-after-login',afterId);return msalApp.loginRedirect({scopes:SCOPES,prompt:'select_account'})}
async function getToken(interactiveFor){
  if(!account)throw{code:'login'};
  try{return(await msalApp.acquireTokenSilent({scopes:SCOPES,account})).accessToken}
  catch(e){if(e instanceof msal.InteractionRequiredAuthError){if(interactiveFor){saveNow();sessionStorage.setItem('wm-fat-after-login',interactiveFor);await msalApp.acquireTokenRedirect({scopes:SCOPES,account})}throw{code:'login'}}
    throw{code:'network',message:e.message}}
}

/* ---------- Leveransearkiv i SharePoint via Microsoft Graph ----------
   Én felles mappe/bibliotek (ikke mappe per maskin). Serienummer og ordrenummer settes som metadata.
   Ferdig PDF overskrives aldri: finnes navnet fra før, lagres den med løpenummer. */
const enc=encodeURIComponent;
async function graph(token,method,path,body,headers){
  let r;try{r=await fetch('https://graph.microsoft.com/v1.0'+path,{method,headers:Object.assign({Authorization:'Bearer '+token},headers||{}),body})}catch(e){throw{code:'network',message:e.message}}
  if(r.status===404)return null;
  if(!r.ok){let msg=r.statusText;try{const j=await r.json();msg=(j.error&&j.error.message)||msg}catch(e){}throw{code:'http',status:r.status,message:msg}}
  if(r.status===202||r.status===204)return{};
  const txt=await r.text();return txt?JSON.parse(txt):{};
}
async function uploadRecord(s,{token}){
  const D=CFG.driveId,P=CFG.leveranseFolderId;let file=pdfName(s);
  for(let i=2;await graph(token,'GET',`/drives/${D}/items/${P}:/${enc(file)}`);i++)file=pdfName(s).replace(/\.pdf$/,` (${i}).pdf`);
  const pdf=await buildPdf(s);
  const up=await graph(token,'PUT',`/drives/${D}/items/${P}:/${enc(file)}:/content?@microsoft.graph.conflictBehavior=fail`,pdf,{'Content-Type':'application/pdf'});
  let metaOk=true;const map=CFG.metadata||{};const fields={};
  Object.entries(map).forEach(([col,key])=>{const v=key==='rev'?String(s.rev||1):s.meta[key];if(v)fields[col]=v});
  if(up&&up.id&&Object.keys(fields).length){try{await graph(token,'PATCH',`/drives/${D}/items/${up.id}/listItem/fields`,JSON.stringify(fields),{'Content-Type':'application/json'})}catch(e){metaOk=false}}
  return{file,webUrl:up&&up.webUrl,metaOk};
}
let spBusy=false,spErr='';
function renderSpNote(){const n=$('#spNote');if(!n)return;
  if(spErr){n.innerHTML=`<span class="err">${esc(spErr)}</span>`;return}
  if(state.pending){n.textContent='Venter på nett. Kontrollen lastes opp automatisk når du har dekning.';return}
  if(state.spUrl){n.innerHTML=`Lastet opp: <a href="${esc(state.spUrl)}" target="_blank" rel="noopener">${esc(state.spFile||'åpne i SharePoint')}</a>${state.metaOk===false?' <span class="err">· Metadata (serienummer/ordre) ble ikke satt – sjekk kolonnene i biblioteket.</span>':''}`;return}
  if(!state.final){n.textContent='PDF og opplasting blir tilgjengelig når kontrollen er fullført og låst.';return}
  if(!configured){n.textContent='Opplasting til leveransearkivet er ikke satt opp ennå. Bruk «Del / lagre PDF».';return}
  n.textContent=`PDF-en legges i ${CFG.leveranseFolderLabel||'leveransearkivet'} med serienummer og ordrenummer som metadata.`;
}
function setSpBtn(t,dis){document.querySelectorAll('[data-act="sp"]').forEach(b=>{b.textContent=t;b.disabled=!!dis})}
function errText(err){
  if(err.code==='network')return 'Ingen kontakt med SharePoint. Kontrollen lastes opp automatisk når du har nett.';
  if(err.code==='http'&&err.status===401)return 'Innloggingen har gått ut. Trykk «Last opp» igjen for å logge inn.';
  if(err.code==='http'&&err.status===403)return 'Brukeren din har ikke skrivetilgang til leveransearkivet. Spør den som administrerer SharePoint.';
  if(err.code==='http'&&err.status===429)return 'SharePoint ber oss vente litt. Prøv igjen om et minutt.';
  return 'SharePoint svarte med en feil: '+String(err.message||err.status||'ukjent').slice(0,200);
}
async function uploadCurrent(){
  if(spBusy)return;spErr='';
  if(!state.final){toast('Fullfør og lås kontrollen først.');return}
  if(!configured){toast('Opplasting er ikke satt opp ennå. Bruk «Del / lagre PDF».');return}
  if(state.spUrl){toast('Denne revisjonen er allerede lastet opp.');return}
  if(!window.jspdf){toast('PDF-verktøyet er ikke lastet. Åpne appen med nett én gang først.');return}
  saveNow();
  if(!account){login(state.id);return}
  spBusy=true;setSpBtn('Laster opp …',true);
  try{
    const token=await getToken(state.id);
    const res=await uploadRecord(state,{token});
    Object.assign(state,{spUrl:res.webUrl||'',spFile:res.file,metaOk:res.metaOk,pending:false,uploadedAt:new Date().toISOString()});records[state.id]=clone(state);persistRecords();
    toast('Lastet opp til leveransearkivet');
  }catch(err){
    if(err.code==='login'){spErr='Du må logge inn på nytt. Trykk «Last opp» igjen.'}
    else if(err.code==='network'){state.pending=true;records[state.id]=clone(state);persistRecords()}
    else spErr=errText(err);
  }finally{spBusy=false;setSpBtn('Last opp til leveransearkiv');renderSpNote()}
}
let queueBusy=false;
async function processQueue(){
  if(queueBusy||!configured||!account||!navigator.onLine)return;
  const pend=Object.values(records).filter(r=>r.pending&&r.final&&!r.spUrl);if(!pend.length)return;
  queueBusy=true;let ok=0;
  try{const token=await getToken();
    for(const r of pend){try{const res=await uploadRecord(r,{token});Object.assign(r,{spUrl:res.webUrl||'',spFile:res.file,metaOk:res.metaOk,pending:false,uploadedAt:new Date().toISOString()});ok++;
      if(state.id===r.id)Object.assign(state,{spUrl:r.spUrl,spFile:r.spFile,metaOk:r.metaOk,pending:false})}catch(e){if(e.code==='network')break}}
    persistRecords();
  }catch(e){}finally{queueBusy=false;if(ok){toast(`${ok} kontroll${ok>1?'er':''} lastet opp`);renderSpNote();if(!$('#list').hidden)renderList()}}
}

/* ---------- nett, installering, oppstart ---------- */
function netState(){$('#offlineTip').hidden=navigator.onLine;if(navigator.onLine)processQueue()}
window.addEventListener('online',netState);window.addEventListener('offline',netState);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')saveNow();else processQueue()});
window.addEventListener('pagehide',saveNow);
(function installTip(){
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const standalone=window.navigator.standalone||matchMedia('(display-mode: standalone)').matches;
  if(ios&&!standalone&&!ls.get('wm-fat-tip-closed',false))$('#installTip').hidden=false;
  $('#tipClose').onclick=()=>{$('#installTip').hidden=true;ls.set('wm-fat-tip-closed',true)};
})();
if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(()=>{});
renderForm();updateCount();netState();initAuth();
