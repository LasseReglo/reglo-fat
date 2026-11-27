/* Sluttkontrollskjemaer – Reglo AS
   Hvert skjema er en liste med kontrollpunkter. Kilde = malen i Kvalitetsportal › Produksjon Innkjøp Lager.
   Punkttyper (valgfrie egenskaper på hvert punkt):
     photo:true          bilde påkrevd når punktet merkes JA
     autoJa:true         JA settes automatisk når bilde lagres (bare der kontrollen ER at bilde er tatt)
     measure:{nom,tol,min,max,unit}  måleverdi. tol:null = toleranse ikke fastsatt (manuell vurdering). min/max = grenser
     read:{unit,hint,label,text}     avlest verdi/tekst som skal noteres (ingen automatisk vurdering)
     load:{skjema}       faktisk prøvelast (kg). skjema = last i dagens mal
     load:{factor}       FORELØPIG veiledende last = factor × nominell nyttelast
     mf:true             punkt lagt til fordi forordning (EU) 2023/1230 krever det for hver maskin
     img:'sti'           illustrasjon
   Skjemaegenskaper:
     head: felt i toppen. sigs: signaturer. baseLast: nyttelasten lastene i malen er satt for.
*/
'use strict';
const HEAD_LIFT=[
  {k:'dato',l:'Dato',type:'date'},{k:'prodordre',l:'Produksjonsordre (PO)',req:1},
  {k:'salgsordre',l:'Salgsordre (SO)'},{k:'kunde',l:'Kunde'},
  {k:'serienr',l:'Serienummer',req:1},{k:'nyttelast',l:'Nominell nyttelast',unit:'kg',req:1,num:1},
  {k:'vekt',l:'Vekt ved levering',unit:'kg',num:1},{k:'ekstrautstyr',l:'Ekstrautstyr (varenr og navn)',area:1}];
const HEAD_EFFEX=[
  {k:'dato',l:'Dato',type:'date'},{k:'prodordre',l:'Produksjonsordre / art.nr (PO)',req:1},
  {k:'kunde',l:'Kunde'},{k:'type',l:'Type / varenr',req:1},
  {k:'serienr',l:'Serienummer',req:1},{k:'antall',l:'Antall i serien',num:1}];
const HEAD_EFFEX_V=HEAD_EFFEX.concat([{k:'volt',l:'Volt',seg:['230','120','400']}]);
const HEAD_PAKK=[
  {k:'dato',l:'Dato',type:'date'},{k:'kunde',l:'Kundenavn',req:1},
  {k:'salgsordre',l:'Ordrenummer',req:1},{k:'antall',l:'Antall lifter',num:1,req:1},
  {k:'serienr',l:'Serienummer (ett eller flere)',wide:1}];
const SIG2=[['sig1','Signatur 1 – utført av'],['sig2','Signatur 2 – kontrollert av']];
const SIG1=[['sig1','Kontrollert av']];
const EFFEX_NOTE='Mal: Hvis NEI i noen av punktene skal enheten settes til side og merkes tydelig med IKKE GODKJENT. Informer produksjonssjef på e-post straks avvik er avdekket.';
const MF_NOTE='Punkter krevd av maskinforordningen (EU) 2023/1230 for hver maskin. Lagt til i den digitale versjonen.';

const FORMS=[
/* ======================= LIFTER ======================= */
{id:'wallman',kat:'Lifter',navn:'WALL-MAN',tittel:'SLUTTKONTROLL (FAT) WALL-MAN',kort:'WALL-MAN',kilde:'FAT WM Norsk 5 (26.11.2026), språkvasket 27.11.2026',
 fileKey:'WM',noIR:true,d5:true,
 note:'Formål: Å bekrefte og dokumentere at WALL-MAN Standard er korrekt montert, merket og funksjonstestet, og at produktet oppfyller definerte akseptkriterier før frigivelse. FAT gjennomføres som siste QA-steg etter ferdig montering og før enheten godkjennes for utsendelse/levering. Nei eller verdi utenfor grensen på en sikkerhetsrad betyr at FAT-en ikke er godkjent.',
 head:[{k:'dato',l:'Dato',type:'date'},{k:'salgsordre',l:'SO No (salgsordre)',req:1},{k:'prodordre',l:'PO No (produksjonsordre)',req:1},
   {k:'kunde',l:'Customer (kunde)',req:1},{k:'serienr',l:'Serial No (serienummer)',req:1},
   {k:'vekt',l:'Vekt inkl. aluminiumsdeksel',unit:'kg',num:1},{k:'ekstrautstyr',l:'Ekstrautstyr (varenr og navn)',area:1}],
 sigs:[['sig1','Dato/Signatur 1 – testet av'],['sig2','Dato/Signatur 2 – godkjent av']],sections:[
  {nr:'A',title:'Montering og merking',items:[
    ['1','Alle håndspakventiler: er de 2 skruene i enden av håndspaken satt inn med Loctite 638?'],
    ['2','Er det montert plastplugger i dører og foran på kurv?'],
    ['3','Er gummiprofil på rekkverk montert?'],
    ['4','Er skiltet på kurven og merket for sikkerhetskrok bak i kurven montert?'],
    ['5','Er 8 bar-skiltet montert i toppen?'],
    ['6','Er Lintra-festet i fronten montert korrekt?'],
    ['7','Er låseblekket knekt mot skruehodet, slik at skruen er låst?'],
    ['8','Er det montert snor i nødsenkspaken?'],
    ['9','Er slangeklemmene montert i riktig retning på toppen av sylinderen (servicevennlig)?'],
    ['10','Er det klaring mellom nylontrinsen og avstandsholderen?'],
    ['11','Er sylinderen shimset sideveis?'],
    ['12','Er stillskruene montert med 44 Nm og merket?'],
    ['13','Er settskruene på forsterkningsrøret forseglet med lakk? (Gjelder bare lift med forsterkningsrør.)',{ir:true,irHint:'«Ikke aktuelt» bare når liften ikke har forsterkningsrør'}],
    ['14','Er boltene til avstandsrøret på utsleiden montert med 44 Nm og merket?'],
    ['15','Er strips montert på begge sider av beskyttelsestrekket på kabelkjeden?']]},
  {nr:'B',title:'Funksjon og justering',items:[
    ['16','Går alle bevegelser riktig vei i henhold til styrespaken?'],
    ['17','Blir Lintra-sylinderen tømt når hovedkranen stenges?'],
    ['18','Er ut/inn-hastigheten justert?'],
    ['19','Er hastigheten på endedempingen i bunnen justert?'],
    ['20','Er det klaring mellom opp/ned-sleiden og bunnstoppen?'],
    ['21','Er hastigheten på bremsen justert?'],
    ['22','Er det full vandring på ut/inn-bevegelsen?'],
    ['23','Er begge kjedene like stramme, og er kontramutrene dratt til?'],
    ['24','Er det kontrollert at kurven ikke synker?'],
    ['25','Fungerer hurtigavlufteren?'],
    ['26','Fungerer kjedeslakkventilen? Stopper den senkingen ved slakt kjede, både når det senkes fra kurven og fra nødsenken på masten?',{safety:true}],
    ['27','Fungerer hornet (fløyten)?'],
    ['28','Lukker og låser døren seg selv fra helt åpen stilling?',{safety:true}],
    ['29','Stopper og holder sidebremsen når spaken slippes, og når lufttilførselen stenges?',{safety:true}],
    ['30','Nødsenk på masten: senkes kurven når nødsenken betjenes fra bakken, og er kurven synlig derfra?',{safety:true}]]},
  {nr:'C',title:'Lastprøver og overlast',note:'Rekkefølgen 32–41 er fast: statisk, dynamisk, overlast justeres ned, overlast innerst og ytterst, varsel, senking, forsegling, tetthet. Et punkt åpnes når forrige er besvart. Den dynamiske prøven kjøres med den høye innstillingen fra montering; overlasten kobles ikke ut.',items:[
    ['31','Er prøvelodd med kjent, merket vekt brukt i lastprøvene?'],
    ['32','Statisk prøve: er 225 kg satt i kurven mens den står stille, i 30 min, uten varig deformasjon, sprekker eller synk?',{safety:true,seq:true}],
    ['33','Dynamisk prøve: kjøres før overlastsikringen justeres ned. Er alle bevegelser (opp/ned, inn/ut, sideveis) kjørt over hele slaglengden med 165 kg i kurven, uten at overlasten slår ut? Stopper og holder bevegelsene?',{safety:true,seq:true}],
    ['34','Er overlastsikringen justert ned etter den dynamiske prøven (veiledende ca. 175 kg innerst)?',{seq:true}],
    ['35','Overlast, kurv innerst: løftes 150 kg normalt, og utløser overlasten over 150 kg og senest ved 180 kg? Legg på lodd i trinn på høyst 5 kg.',{safety:true,seq:true,valueOnly:true,measure:{gt:150,max:180,unit:'kg',label:'Utløser ved'}}],
    ['36','Overlast, kurv ytterst: løftes 150 kg normalt, og utløser overlasten over 150 kg og senest ved 180 kg? Legg på lodd i trinn på høyst 5 kg.',{safety:true,seq:true,valueOnly:true,measure:{gt:150,max:180,unit:'kg',label:'Utløser ved'}}],
    ['37','Varsel ved overlast (innerst og ytterst): er lydsignal og visuell indikator aktive så lenge overlasten varer, stopper de når lasten tas av, og er løft sperret?',{safety:true,seq:true}],
    ['38','Med overlast utløst: kan kurven senkes med spaken i kurven, og med nødsenken på masten?',{safety:true,seq:true}],
    ['39','Er overlastinnstillingen forseglet med sikringslakk?',{safety:true,seq:true,photo:true}],
    ['40','Er regulatoren under kurven forseglet med sikringslakk?',{safety:true,seq:true,photo:true}],
    ['41','Er tetthetstest med 150 kg i kurven i 30 minutter utført, uten lekkasje?',{safety:true,seq:true,valueOnly:true,measure:{max:100,unit:'mm',label:'Synk'}}],
    ['42','Er kuleventilen stengt i 30 minutter?']]},
  {nr:'D',title:'Avslutning, kontrollmål og bilder',items:[
    ['43','Er hengelåsen montert og nøklene stripset fast?'],
    ['44','Er aluminiumsdekselet ferdig, pakket og lagt klart?'],
    ['45','Er gummistoppere, kjede og diverse sendt med?'],
    ['46','Kontrollmål fra toppen av skruehodet på bunnseksjonen til underkanten av platen på opp/ned-sleiden. (Noteres; godkjent når kontrollmålet 223 mm under er innenfor toleransen.)',{valueOnly:true,measure:{unit:'mm',label:'Måleverdi',record:true}}],
    ['47','Kontrollmål i monteringen: 223 mm (± 5 mm). Kontroller at opp/ned-sleiden ikke går høyere enn 223 mm, målt fra toppen av stammen med ubemannet kurv. Marker kontrollmålstreken på stammen etter malen.',{valueOnly:true,measure:{nom:223,tol:5,unit:'mm',label:'Måleverdi'},img:'img/kontrollmal-223.png'}],
    ['48','Er det tatt bilder av ferdig montert lift og av forseglingene (overlast og regulator)?',{photoSlots:[{k:'lift',l:'Ferdig montert lift'},{k:'overlast',l:'Overlastforsegling'},{k:'regulator',l:'Regulatorforsegling'}],autoJa:true}]]}
 ]},

{id:'wallmanxl',kat:'Lifter',navn:'WALL-MAN XL',tittel:'SLUTTKONTROLL (FAT) WALL-MAN XL',kort:'WALL-MAN XL',kilde:'FAT WM XL.xls (testdel)',
 head:HEAD_LIFT.concat([{k:'variant',l:'Type/variant (f.eks. WALL-MAN XL 1300/125)'}]),defLast:250,baseLast:250,sigs:SIG2,sections:[
  {nr:'1',title:'Montering og merking',items:[
    ['1.1','Plastplugger er montert i dører og foran på kurv'],
    ['1.2','Lintra-feste i fronten er montert rett'],
    ['1.3','8 bar-skilt er montert på toppen'],
    ['1.4','Skilt på kurv og merke for sikkerhetskrok bak i kurv er montert'],
    ['1.5','Høyde fra gulv til underkant C-profil skinne oppe',{read:{unit:'mm',label:'Målt'}}]]},
  {nr:'2',title:'Funksjon og justering',items:[
    ['2.1','Alle bevegelser går riktig vei'],
    ['2.2','Hastighet på brems er justert'],
    ['2.3','Lintra-sylinder tømmes når hovedkran stenges'],
    ['2.4','Hurtigavlufter virker'],
    ['2.5','Ut/inn-hastighet er justert'],
    ['2.6','Full vandring på ut/inn-bevegelse'],
    ['2.7','Det er klaring mellom opp/ned-sleide og bunnstopp'],
    ['2.8','Begge kjeder er like stramme, og kontramutter er tiltrukket'],
    ['2.9','Horn (fløyte) virker'],
    ['2.10','Kjedeslakkventil virker'],
    ['2.11','Hastighet på endedemping i bunnen er justert']]},
  {nr:'3',title:'Belastningsprøver – eksisterende verkstedpraksis',note:'Lastene i teksten er dagens praksis for 250 kg nyttelast (375 kg = 1,5 ×, 275 kg = 1,1 ×). Ikke vurdert som komplett statisk/dynamisk prøving etter maskinforordningen.',items:[
    ['3.1','Prøveløft med 375 kg i kurven er gjennomført',{photo:true,load:{skjema:375}}],
    ['3.2','Overlastsikringen er justert med 275 kg last',{load:{skjema:275}}],
    ['3.3','Tetthetstest er utført, minst 1/2 time'],
    ['3.4','Kontrollert at kurven ikke synker'],
    ['3.5','Kran er stengt i minst 1/2 time']]},
  {nr:'4',title:'Maskinforordningen',note:MF_NOTE,items:[
    ['4.1','Kurvdørene lukker og låser seg selv, kan ikke åpnes utilsiktet og åpner ikke utover',{mf:true}],
    ['4.2','Alle bevegelser stopper når betjeningsspaken slippes',{mf:true}],
    ['4.3','Typeskilt er montert med produsent og kontaktadresse, modell, serienummer lik denne kontrollen, byggeår og CE-merke',{photo:true,mf:true}],
    ['4.4','Skilt i kurven viser maks antall personer og maks last, og stemmer med nominell nyttelast på ordren',{photo:true,mf:true,lastskilt:true}],
    ['4.5','Bruksanvisning og EU-samsvarserklæring følger med, eller lenke/QR-kode til dem er merket på maskinen',{mf:true}]]},
  {nr:'5',title:'Pakking og utsending',items:[
    ['5.1','Hengelås er montert og nøkler er stripset fast'],
    ['5.2','Transportsikringslapper er satt på'],
    ['5.3','Slangestump på lufttilførsel er tatt av'],
    ['5.4','Eske med styrehjul og brems oppe er sendt med'],
    ['5.5','Merkelapp «Band her» er satt på (4 stk)']]}
 ]},

{id:'liftman',kat:'Lifter',navn:'LIFTMAN',tittel:'SLUTTKONTROLL (FAT) LIFTMAN',kort:'LIFTMAN',kilde:'FAT Lift-Man',
 head:HEAD_LIFT.concat([{k:'variant',l:'Variant',seg:['STD (AM000023)','Twin Wheels (AM002997)'],req:1}]),defLast:null,baseLast:null,sigs:SIG2,sections:[
  {nr:'1',title:'Montering og merking',items:[
    ['1.1','Stripete tape er montert foran, bak og på tårn'],
    ['1.2','Plastplugg er montert i gjengehull til sylinder på tannhjulsholder'],
    ['1.3','Kontramutter er montert på stramming av drivkjede'],
    ['1.4','Skilt på styrepanelplate er montert'],
    ['1.5','Nummerskilt/typeskilt med CE er montert, med produsent og kontaktadresse, modell, serienummer lik denne kontrollen og byggeår',{photo:true,mf:true}],
    ['1.6','Nødsenkskilt er montert'],
    ['1.7','Maks 8 bar-skilt er montert'],
    ['1.8','Små skilt for maks belastning på hjul er montert'],
    ['1.9','Ring for sikkerhetssele er montert'],
    ['1.10','Galvplate under kurv (deksel under kurv) er montert'],
    ['1.11','Gummiplate på stigtrinn er montert'],
    ['1.12','Hansen hankobling på slangetilførsel (Nederman) er montert'],
    ['1.13','Styrespak er montert (på siden av tårn)'],
    ['1.14','Vaterlibelle er montert (på bunnseksjon)'],
    ['1.15','Plastplugg i papirstativ er montert, og stativ er sendt med'],
    ['1.16','Alle skruer er merket']]},
  {nr:'2',title:'Funksjon og justering',items:[
    ['2.1','Styring er justert med laser'],
    ['2.2','Hastighet på styring er justert'],
    ['2.3','Klaring mellom bunnplate og flatt bak på kurv',{measure:{nom:15,tol:null,unit:'mm'}}],
    ['2.4','Endedemper på løftesylinder virker'],
    ['2.5','Hastighet opp',{read:{unit:'s',label:'Målt'}}],
    ['2.6','Hastighet ned',{read:{unit:'s',label:'Målt'}}],
    ['2.7','Brems er justert riktig'],
    ['2.8','Sideveisslakk på kurv i tårn er riktig'],
    ['2.9','Drivmotor går riktig vei'],
    ['2.10','Interlocksystem virker (én betjening av gangen)'],
    ['2.11','Hurtigavlufter virker'],
    ['2.12','Kjedeslakkventil virker'],
    ['2.13','Kjedebruddsventil virker'],
    ['2.14','Nødsenkventil virker'],
    ['2.15','Horn (fløyte) virker'],
    ['2.16','Testet at kurven ikke synker']]},
  {nr:'3',title:'Maskinforordningen',note:MF_NOTE+' Malen har ingen belastningsprøve – se merknad i appen.',items:[
    ['3.1','Kurvdør/port lukker og låser seg selv og kan ikke åpnes utilsiktet (merk I/R hvis kurven ikke har dør)',{mf:true}],
    ['3.2','Alle bevegelser stopper når betjeningsspaken slippes',{mf:true}],
    ['3.3','Skilt i kurven viser maks antall personer og maks last, og stemmer med nominell nyttelast på ordren',{photo:true,mf:true,lastskilt:true}],
    ['3.4','Bruksanvisning og EU-samsvarserklæring følger med, eller lenke/QR-kode til dem er merket på maskinen',{mf:true}]]},
  {nr:'4',title:'Utsending',items:[
    ['4.1','Hengelås er sendt med, og nøkler er stripset fast']]}
 ]},

/* Utgått revisjon – bare for visning av eldre poster laget før 27.11.2026 */
{id:'wallman_v05',hidden:true,kat:'Lifter',navn:'WALL-MAN (skjema v0.5, utgått)',tittel:'SLUTTKONTROLL (FAT) WALL-MAN',kort:'WALL-MAN',kilde:'FAT WM Norsk',
 head:HEAD_LIFT,defLast:150,baseLast:150,sigs:SIG2,sections:[
  {nr:'1',title:'Montering og merking',items:[
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
  {nr:'2',title:'Funksjon og justering',items:[
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
    ['2.13','Kurvdørene lukker og låser seg selv, kan ikke åpnes utilsiktet og åpner ikke utover',{mf:true}],
    ['2.14','Alle bevegelser (opp/ned, ut/inn, sideveis) stopper når betjeningsspaken slippes',{mf:true}]]},
  {nr:'3',title:'Belastningsprøver – eksisterende verkstedpraksis',note:'Lastene i teksten er dagens praksis for 150 kg nyttelast. Ikke vurdert som komplett statisk/dynamisk prøving etter maskinforordningen.',items:[
    ['3.1','Belastet løfteprøve med 225 kg er gjennomført (opp og ned gjennom løfteområdet) før innstilling av overlastsikringen',{photo:true,load:{skjema:225}}],
    ['3.2','Overlastsikringen er innstilt og funksjonskontrollert med 200 kg prøvelast, med forventet utløsning/funksjon bekreftet',{load:{skjema:200}}],
    ['3.3','Holdetest med 200 kg i kurven er gjennomført i minst 30 minutter uten unormal synking, skade eller andre tegn på svikt',{load:{skjema:200}}],
    ['3.4','Lufttilførselen er stengt under holdetesten, og det er kontrollert at det ikke oppstår unormal synking eller luftlekkasje']]},
  {nr:'4',title:'Kontrollmål',items:[
    ['4.1','Kontrollmål fra topp skruehode på bunnseksjon til underkant plate opp/ned-sleide',{measure:{nom:10,tol:null,unit:'mm'}}],
    ['4.2','Opp/ned-sleide går ikke høyere enn 223 mm, målt fra topp stamme med ubemannet kurv. Kontrollmålstrek er markert på stammen etter mal',{measure:{nom:223,tol:5,unit:'mm'},img:'img/kontrollmal-223.png'}]]},
  {nr:'5',title:'Belastningsprøving ID20',prelim:true,optional:true,
    note:'FORELØPIG – prøvemetode, prøvelast og akseptkriterier er ikke teknisk godkjent. Registreres som pilot. Veiledende last = koeffisient × nominell nyttelast.',items:[
    ['5.1','Statisk belastningsprøving er gjennomført etter teknisk godkjent prøvemetode, uten skade, varig deformasjon eller andre tegn på svikt',{photo:true,load:{factor:1.25}}],
    ['5.2','Dynamisk prøve opp/ned: løfting og senking gjennom relevant arbeidsområde er gjennomført med godkjent prøvelast uten unormal bevegelse, funksjonsfeil eller skade',{photo:true,load:{factor:1.1}}],
    ['5.3','Dynamisk prøve ut/inn: bevegelsen gjennom relevant arbeidsområde er gjennomført med godkjent prøvelast uten unormal bevegelse, funksjonsfeil eller skade',{photo:true,load:{factor:1.1}}],
    ['5.4','Dynamisk prøve sideveis: bevegelsen gjennom relevant arbeidsområde er gjennomført med godkjent prøvelast uten unormal bevegelse, funksjonsfeil eller skade',{photo:true,load:{factor:1.1}}],
    ['5.5','Maskinen er kontrollert etter dynamisk belastningsprøving uten observerte skader, deformasjoner eller andre tegn på svikt']]},
  {nr:'6',title:'Pakking og utsending',items:[
    ['6.1','Hengelås er montert og nøkler er stripset fast'],
    ['6.2','Aluminiumsdeksel er ferdig, pakket og lagt klar'],
    ['6.3','Gummistoppere, kjede og diverse er sendt med'],
    ['6.4','Typeskilt er montert med produsent og kontaktadresse, modell, serienummer lik denne kontrollen, byggeår og CE-merke',{photo:true,mf:true}],
    ['6.5','Skilt i kurven viser maks antall personer og maks last, og stemmer med nominell nyttelast på ordren',{photo:true,mf:true,lastskilt:true}],
    ['6.6','Bruksanvisning og EU-samsvarserklæring følger med, eller lenke/QR-kode til dem er merket på maskinen',{mf:true}],
    ['6.7','Bilde av ferdig emballert produkt er tatt',{photo:true,autoJa:true}]]}
 ]},

/* ======================= AVSUG / EFFEX ======================= */
{id:'mb190',kat:'Avsug (EFFEX)',navn:'MB-190 U/A/M/BIA',tittel:'KONTROLLSKJEMA NR. 17 – MB-190',kort:'MB-190',kilde:'FAT Kontrollskjema 17 MB-190',
 head:HEAD_EFFEX_V,sigs:[['sig1','Test kontrollert (sign 1)'],['sig2','Pakking kontrollert (sign 2)']],note:'Hensikt: Funksjonstesten skal sjekke at begge motorer starter, at start/stopp-funksjoner testes og godkjennes, og at korrekt utstyr er vedlagt. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Før test',items:[
    ['1.1','Måleutstyr er sjekket FØR denne produksjonsserien']]},
  {nr:'2',title:'Montering og visuell kontroll',items:[
    ['2.1','Kretskort er riktig koblet (ledn. nr. 7): 230 V til X1:1, 120 V til X1:3'],
    ['2.2','Filter er montert'],
    ['2.3','Alle klebemerker er påsatt'],
    ['2.4','Serienummer er påført og riktig'],
    ['2.5','Rensesystem er montert og sjekket for slark'],
    ['2.6','Renseplugg er montert'],
    ['2.7','Føtter er montert og fastskrudd'],
    ['2.8','Overflaten er fri for riper og skader'],
    ['2.9','Finish og detaljarbeid er OK']]},
  {nr:'3',title:'Elektrisk sikkerhet',items:[
    ['3.1','Jordkontinuitet 10 A, 5 s',{measure:{max:150,unit:'mΩ'}}],
    ['3.2','Isolasjonsprøve mellom primærkobling og jord (min. 1600 V AC)',{measure:{max:1,unit:'mA'}}]]},
  {nr:'4',title:'Funksjonstest',items:[
    ['4.1','Funksjonstest er utført og godkjent'],
    ['4.2','Primærstrøm',{read:{unit:'A',label:'Avlest',hint:'220 V: 9–10 A · 120 V: 15–17 A'}}],
    ['4.3','Autostart ved maks 70 A og stopp 9–13 s etter sveisestopp (enhet med auto start/stopp)',{measure:{min:9,max:13,unit:'s'}}],
    ['4.4','Undertrykk er målt',{read:{unit:'mmVS',label:'Avlest',hint:'1900 ved 230 V / 1800 ved 120 V'}}],
    ['4.5','Måleutstyr er sjekket ETTER denne produksjonsserien']]},
  {nr:'5',title:'Pakking',items:[
    ['5.1','Emballasjen er fri for skader'],
    ['5.2','Riktig manual er vedlagt'],
    ['5.3','Slangepakke 5 m er vedlagt og riktig montert'],
    ['5.4','4 stk. reservebørster er vedlagt (ulike typer for 230 V og 120 V)'],
    ['5.5','Samsvarserklæring er vedlagt']]}
 ]},

{id:'f150',kat:'Avsug (EFFEX)',navn:'Filterenhet F-150 / F-200',tittel:'KONTROLLSKJEMA NR. 25 – FILTERENHET F-150 / F-200',kort:'F-150-F-200',kilde:'FAT Kontrollskjema F150 og F200',
 head:HEAD_EFFEX.concat([{k:'ar',l:'År'}]),sigs:SIG1,note:'Hensikt: Funksjonstesten skal sjekke alle funksjoner samt visuell kontroll. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Kontrollpunkter',items:[
    ['1.1','Filter er vedlagt',{read:{text:true,label:'Type'}}],
    ['1.2','Alle klebemerker er påsatt (logostripe, logo, inn-/utløpsanvisning, trykkluft, dataskilt)'],
    ['1.3','Riktige data er påført dataskiltet'],
    ['1.4','Støvtønne med vogn, pose og lokk er montert'],
    ['1.5','Motflens for utblås med skruer er lagt med'],
    ['1.6','Hjørnelister er påsatt dobbeltsidig tape (F150)'],
    ['1.7','Alle løse deler er pakket med (motflens, skruer, trykkluftslange, slangeklemmer)'],
    ['1.8','Funksjonstest er utført'],
    ['1.9','Skjøter mellom ren og skitten side er fuget'],
    ['1.10','Sikkerhetsventil er montert'],
    ['1.11','Lakk og finish er OK'],
    ['1.12','Manual, monteringsanvisning og samsvarserklæring er vedlagt']]}
 ]},

{id:'fu',kat:'Avsug (EFFEX)',navn:'Filterenhet FU 20-40-60-80',tittel:'KONTROLLSKJEMA – FILTERENHET TYPE FU',kort:'FU',kilde:'FAT Kontrollskjema FU-filter enheter 20-40-60-80',
 head:HEAD_EFFEX,sigs:SIG1,note:'Hensikt: Funksjonstesten skal kontrollere alle funksjoner samt visuell kontroll. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Kontrollpunkter',items:[
    ['1.1','Filter er montert',{read:{text:true,label:'Type'}}],
    ['1.2','Rensemekanismer roterer'],
    ['1.3','Luftkoblinger er fri for lekkasje'],
    ['1.4','Skruer for benfeste er montert'],
    ['1.5','Dataskilt og klistremerker er påsatt'],
    ['1.6','Pakninger på topp, dør, tønne og kon er på plass'],
    ['1.7','Ring i topplokk er fuget/helsveiset'],
    ['1.8','Anleggsring for kon er fuget/helsveiset'],
    ['1.9','Lakk og finish er OK'],
    ['1.10','Drifts- og vedlikeholdsanvisning er vedlagt'],
    ['1.11','Spole for magnetventil er 24 V DC'],
    ['1.12','Lakktykkelse er riktig',{measure:{min:50,unit:'µm'}}],
    ['1.13','Støvpose med lokk er lagt i støvtønne'],
    ['1.14','Hull for øyebolt er blendet på topplokk'],
    ['1.15','Blindplugg er satt i øvre manometerfeste'],
    ['1.16','Sikkerhetsventil er montert og justert (gjelder FU-S)']]}
 ]},

{id:'fx325',kat:'Avsug (EFFEX)',navn:'FX-3-25 / MB300',tittel:'KONTROLLSKJEMA NR. 22 – FX-3-25 / MB300',kort:'FX-3-25',kilde:'FAT Kontrollskjema FX 3-25 (EF000036 og 49)',
 head:HEAD_EFFEX_V,sigs:SIG1,note:'Hensikt: Funksjonstesten skal kontrollere alle funksjoner samt visuell kontroll. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Kontrollpunkter',items:[
    ['1.1','Filtertønne over og under er komplett med filter og håndtak (filtertype 750390)'],
    ['1.2','Alle klebemerker er påsatt (logo, strømpil, inlet, omdreiningspil, compressed air)'],
    ['1.3','Dataskilt er riktig utfylt og vedlagt'],
    ['1.4','Funksjonstest av vifte er utført'],
    ['1.5','Enheten er testet med trykkluft/rensing (magnetventil)'],
    ['1.6','Ledning til motor er koblet (4 × 1,5 mm²)'],
    ['1.7','Gitter er montert på luftinntak'],
    ['1.8','Tilførselskabel er montert (4 × 1,5 mm²)'],
    ['1.9','Motorvern er vedlagt',{read:{unit:'A',label:'Innstilt'}}],
    ['1.10','Ledning til magnetventil er koblet (3 × 0,75 mm²)'],
    ['1.11','Lakk og finish er OK'],
    ['1.12','Sikkerhetsventil er montert (6,5 bar)']]},
  {nr:'2',title:'Målinger',items:[
    ['2.1','Maks undertrykk',{read:{unit:'mmVS',label:'Målt',hint:'Referanse FX-3-25: 2300 mmVS'}}],
    ['2.2','Maks luftvolum',{read:{unit:'m³/t',label:'Målt',hint:'Referanse FX-3-25: 260 m³/t'}}]]}
 ]},

{id:'fx540',kat:'Avsug (EFFEX)',navn:'FX-5-40 / MB500 (Stauffer)',tittel:'KONTROLLSKJEMA NR. 23 – FX-5-40 / MB500',kort:'FX-5-40',kilde:'FAT Kontrollskjema FX 5-40 Stauffer (EF000065)',
 head:HEAD_EFFEX_V,sigs:SIG1,note:'Hensikt: Funksjonstesten skal sjekke alle funksjoner samt visuell kontroll. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Kontrollpunkter',items:[
    ['1.1','Filtertønne over/under er komplett med filter, rensevisp og håndtak',{read:{text:true,label:'Filtertype'}}],
    ['1.2','Ledning til magnetventil er montert (3 × 0,75 mm²)'],
    ['1.3','Alle klebemerker er påsatt (logo, strømpil, inlet, omdreiningspil)'],
    ['1.4','Funksjonstest er utført'],
    ['1.5','Ledning til motor er montert (4 × 2,5 mm²)'],
    ['1.6','Trykkluft er testet (magnetventil)'],
    ['1.7','Remmer er strammet og remdeksel påsatt'],
    ['1.8','Gitter er montert på luftinntak'],
    ['1.9','Tilførselskabel er montert (4 × 2,5 mm²)'],
    ['1.10','Motorvern er vedlagt',{read:{unit:'A',label:'Innstilt'}}],
    ['1.11','Alle lufttilslutninger er uten lekkasje'],
    ['1.12','Lakk og finish er OK'],
    ['1.13','Sikkerhetsventil er montert (6,5 bar)']]},
  {nr:'2',title:'Målinger',items:[
    ['2.1','Maks undertrykk',{read:{unit:'mmVS',label:'Målt',hint:'Referanse FX-5-40: 2100 mmVS'}}],
    ['2.2','Maks luftvolum',{read:{unit:'m³/t',label:'Målt',hint:'Referanse FX-5-40: 500 m³/t'}}]]}
 ]},

{id:'mb300',kat:'Avsug (EFFEX)',navn:'MB-300A',tittel:'KONTROLLSKJEMA NR. 27 – MB-300A',kort:'MB-300A',kilde:'FAT Kontrollskjema MB-300',
 head:HEAD_EFFEX_V,sigs:SIG1,note:'Hensikt: Testen skal dekke full kontroll av funksjon samt visuell kontroll. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Kontrollpunkter',items:[
    ['1.1','Filtertønne er komplett med filter, håndtak og pakning',{read:{text:true,label:'Filtertype'}}],
    ['1.2','Alle spiroskjøter og filtertønne er fuget'],
    ['1.3','Alle klebemerker er påsatt (logo, strømpil, inlet, skilt for brytere)'],
    ['1.4','Funksjonstest er utført'],
    ['1.5','Renseintervall er riktig innstilt (0,4 s ON og 2 min OFF)'],
    ['1.6','Drifts- og vedlikeholdsmanual er vedlagt'],
    ['1.7','Elektriske koblinger er OK'],
    ['1.8','Gitter er montert på kjøleåpning for motor'],
    ['1.9','Tilførselskabel er montert'],
    ['1.10','Motorvern er riktig innstilt',{read:{unit:'A',label:'Innstilt'}}],
    ['1.11','Alle lufttilslutninger er uten lekkasje'],
    ['1.12','Lakk og finish er OK'],
    ['1.13','Lufttrykk er riktig innstilt (4 bar)'],
    ['1.14','Forsinker for auto start/stopp er innstilt (30 s)'],
    ['1.15','Forsinker for OFF-line rensing er innstilt (5 min)']]},
  {nr:'2',title:'Målinger',items:[
    ['2.1','Maks undertrykk',{read:{unit:'mmVS',label:'Målt',hint:'Referanse MB-300A: 2300 mmVS'}}]]}
 ]},

{id:'mb500',kat:'Avsug (EFFEX)',navn:'MB-500A',tittel:'KONTROLLSKJEMA NR. 26 – MB-500A',kort:'MB-500A',kilde:'FAT Kontrollskjema Mb-500',
 head:HEAD_EFFEX_V,sigs:SIG1,note:'Hensikt: Funksjonstesten skal kontrollere alle funksjoner samt visuell kontroll. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Kontrollpunkter',items:[
    ['1.1','Filtertønne er komplett med filter, håndtak, pakning og rensevisp',{read:{text:true,label:'Filtertype'}}],
    ['1.2','Alle spiroskjøter og filtertønne er fuget'],
    ['1.3','Alle klebemerker er påsatt (logo, strømpil, inlet, skilt for brytere)'],
    ['1.4','Funksjonstest er utført'],
    ['1.5','Renseintervall er riktig innstilt (2 s ON og 2 min OFF)'],
    ['1.6','Drifts- og vedlikeholdsmanual er vedlagt'],
    ['1.7','Remmer er strammet og remdeksel påsatt'],
    ['1.8','Gitter er montert på kjøleåpning for motor'],
    ['1.9','Tilførselskabel er montert'],
    ['1.10','Motorvern er riktig innstilt',{read:{unit:'A',label:'Innstilt'}}],
    ['1.11','Alle lufttilslutninger er uten lekkasje'],
    ['1.12','Lakk og finish er OK'],
    ['1.13','Lufttrykk er riktig innstilt (4 bar)'],
    ['1.14','Forsinker for auto start/stopp er innstilt (30 s)'],
    ['1.15','Forsinker for OFF-line rensing er innstilt (5 min)']]},
  {nr:'2',title:'Målinger',items:[
    ['2.1','Maks undertrykk',{read:{unit:'mmVS',label:'Målt',hint:'Referanse MB-500A: 2100 mmVS'}}]]}
 ]},

{id:'mb1000',kat:'Avsug (EFFEX)',navn:'MB-1000A',tittel:'KONTROLLSKJEMA NR. 28 – MB-1000A',kort:'MB-1000A',kilde:'FAT Kontrollskjema MB-1000',
 head:HEAD_EFFEX_V,sigs:SIG1,note:'Hensikt: Funksjonstesten skal kontrollere alle funksjoner samt visuell kontroll. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Kontrollpunkter',items:[
    ['1.1','Filtertønne er komplett med filter, håndtak, pakning og rensevisp',{read:{text:true,label:'Filtertype'}}],
    ['1.2','Alle spiroskjøter og filtertønne er fuget'],
    ['1.3','Alle klebemerker er påsatt (logo, strømpil, inlet, skilt for brytere)'],
    ['1.4','Funksjonstest er utført (vibrasjonstest, test av undertrykksventil og test av auto start/stopp)'],
    ['1.5','Renseintervall er riktig innstilt (2 s ON og 2 min OFF)'],
    ['1.6','Drifts- og vedlikeholdsmanual er vedlagt'],
    ['1.7','Remmer er strammet og remdeksel påsatt'],
    ['1.8','Gitter er montert på kjøleåpning for motor'],
    ['1.9','Tilførselskabel er montert'],
    ['1.10','Motorvern er riktig innstilt',{read:{unit:'A',label:'Innstilt'}}],
    ['1.11','Alle lufttilslutninger er uten lekkasje'],
    ['1.12','Lakk og finish er OK'],
    ['1.13','Lufttrykk er riktig innstilt (4 bar)'],
    ['1.14','Forsinker for auto start/stopp er innstilt (30 s)'],
    ['1.15','Forsinker for OFF-line rensing er innstilt (5 min)'],
    ['1.16','Tidsblokk for motorforsinkelse er satt inn'],
    ['1.17','Lask for trykkføler er satt inn']]},
  {nr:'2',title:'Målinger',items:[
    ['2.1','Maks undertrykk',{read:{unit:'mmVS',label:'Målt',hint:'Referanse MB-1000A: 2100 mmVS'}}]]}
 ]},

{id:'mbx',kat:'Avsug (EFFEX)',navn:'MBX 500-750-1000',tittel:'KONTROLLSKJEMA NR. 30 – MBX 500-750-1000',kort:'MBX',kilde:'FAT Kontrollskjema MBX 500-750-1000',
 head:HEAD_EFFEX_V,sigs:SIG1,note:'Hensikt: Funksjonstesten skal kontrollere alle funksjoner samt visuell kontroll. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Kontrollpunkter',items:[
    ['1.1','Filtertønne er komplett med filter, håndtak, pakning og rensevisp',{read:{text:true,label:'Filtertype'}}],
    ['1.2','Alle spiroskjøter og filtertønne er fuget'],
    ['1.3','Alle klebemerker er påsatt (logo, strømpil, inlet, skilt for brytere)'],
    ['1.4','Funksjonstest er utført (vibrasjonstest, test av undertrykksventil og test av auto start/stopp)'],
    ['1.5','Drifts- og vedlikeholdsmanual er vedlagt'],
    ['1.6','Gitter er montert på kjøleåpning for motor'],
    ['1.7','Tilførselskabel er montert'],
    ['1.8','Motorvern er riktig innstilt',{read:{unit:'A',label:'Innstilt'}}],
    ['1.9','Alle lufttilslutninger er uten lekkasje'],
    ['1.10','Lakk og finish er OK'],
    ['1.11','Lufttrykk er riktig innstilt (4 bar)'],
    ['1.12','Delay filterclean er stilt inn på 5 min (standard innstilling)'],
    ['1.13','Cleaning mode er riktig: Pressure når trykkregulator er montert, ellers Standard'],
    ['1.14','Frekvens er endret under drift 50 Hz → 20 Hz → 50 Hz uten feil'],
    ['1.15','Test i Auto-modus: bryter for start/stopp er OK'],
    ['1.16','Alarm for tett filter trigger (fjern slange, testkjør i over 7 min)']]},
  {nr:'2',title:'Målinger',items:[
    ['2.1','Maks undertrykk',{read:{unit:'mmVS',label:'Målt',hint:'Malen viser referanse for MB-1000A (2100 mmVS) – bekreft verdi for MBX'}}]]}
 ]},

{id:'spcca',kat:'Avsug (EFFEX)',navn:'SP-CCA',tittel:'KONTROLLSKJEMA NR. 29 – SP-CCA',kort:'SP-CCA',kilde:'FAT Kontrollskjema SP-CCA',
 head:HEAD_EFFEX_V.concat([{k:'ar',l:'År'}]),sigs:SIG1,note:'Hensikt: Funksjonstesten skal kontrollere alle funksjoner samt visuell kontroll. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Komponenter',items:[
    ['1.1','Godkjent vifte og motoroppsett er montert',{read:{text:true,label:'Vifte type/serienr, motortype/serienr'}}],
    ['1.2','Godkjente filterenheter er installert',{read:{text:true,label:'Type og antall'}}],
    ['1.3','Godkjent styreskap er installert',{read:{text:true,label:'Type'}}],
    ['1.4','Godkjent startventil er installert',{read:{text:true,label:'Type'}}],
    ['1.5','Kompressor er installert og testet',{read:{text:true,label:'Type, innstilt bar'}}],
    ['1.6','Sequencer er installert og rensefunksjon testet',{read:{text:true,label:'Type, spolespenning'}}]]},
  {nr:'2',title:'Montering',items:[
    ['2.1','Remmene er riktig strammet'],
    ['2.2','PG-nipler er påsatt motor'],
    ['2.3','Hetter for smørenipler er påsatt'],
    ['2.4','Strammeskruer er tiltrukket'],
    ['2.5','Alle klebemerker er påsatt (logo, strømpil, kontrollmerke, utløpsanvisning, rotasjonspiler)'],
    ['2.6','Spirorør er installert og tettet'],
    ['2.7','Alle luftkoblinger er sjekket for lekkasje'],
    ['2.8','Blindlokk på inn- og utblås er montert'],
    ['2.9','Skilt med riktige data er påsatt'],
    ['2.10','Trykktank er festet og drensventil sjekket'],
    ['2.11','Overtrykksventil er testet'],
    ['2.12','Alle skruer og festedetaljer er tiltrukket/festet'],
    ['2.13','Operatørpanel er merket og godkjent'],
    ['2.14','Alle kabelkoblinger er sjekket og godkjent'],
    ['2.15','Alle PG-nipler er tiltrukket'],
    ['2.16','Lakk og finish er OK']]},
  {nr:'3',title:'Dokumentasjon og funksjonstest',items:[
    ['3.1','Manual, samsvarserklæring og koblingsskjemaer er vedlagt'],
    ['3.2','Funksjonstest er utført og OK iht. testprosedyre nr. SPCCA-01']]}
 ]},

{id:'sp',kat:'Avsug (EFFEX)',navn:'Avsugstasjon SP/SM/SBMA/SLA',tittel:'KONTROLLSKJEMA NR. 6 – AVSUGSTASJONER SP/SM/SBMA/SLA',kort:'SP-stasjon',kilde:'FAT Kontrollskjema SP-Stasjoner alle typer',
 head:HEAD_EFFEX_V.concat([{k:'ar',l:'År'}]),sigs:SIG1,note:'Hensikt: Funksjonstesten skal sjekke alle funksjoner samt visuell kontroll. '+EFFEX_NOTE,sections:[
  {nr:'1',title:'Kontrollpunkter',items:[
    ['1.1','Godkjent vifte er montert',{read:{text:true,label:'Serienr og type'}}],
    ['1.2','Alle klebemerker er påsatt (logo, strømpil, utløpsanvisning, rotasjonspiler og maskinskilt)'],
    ['1.3','Rotasjonspiler er satt riktig'],
    ['1.4','Vibrasjonstest er utført'],
    ['1.5','Blindlokk på inn- og utblås er montert'],
    ['1.6','Skilt med riktige data er satt på'],
    ['1.7','Vifte/motor er iht. opplysningsskjema'],
    ['1.8','Vibrasjonsdempere er montert'],
    ['1.9','Stusser med pakninger er påsatt'],
    ['1.10','Nøkkel er vedlagt'],
    ['1.11','Remskiver er riktige og på rett plass (motor–vifte)'],
    ['1.12','Kobberrør for smøring er lagt ut og tett'],
    ['1.13','PG-nipler er påsatt motor'],
    ['1.14','Remmene er riktig strammet'],
    ['1.15','Hetter for smørenipler er satt på'],
    ['1.16','Skruer for remstramming er tiltrukket'],
    ['1.17','Lakk og finish er OK'],
    ['1.18','Manual, samsvarserklæring og koblingsskjemaer er vedlagt'],
    ['1.19','Motortype og effekt er notert',{read:{text:true,label:'Motortype, kW'}}]]}
 ]},

{id:'stk',kat:'Avsug (EFFEX)',navn:'STK-vifter',tittel:'KONTROLLSKJEMA – STK-VIFTER',kort:'STK',kilde:'FAT Kontrollskjema STK-Vifter alle typer',
 head:HEAD_EFFEX.filter(h=>h.k!=='antall'),sigs:[['sig1','Kontrollert og godkjent av']],note:'Hensikt: Funksjonstesten skal sjekke at alle funksjoner er kontrollert samt visuelt godkjent. Hvis NEI i noen av punktene – også hvis undertrykk og volum avviker fra angitte data – skal enheten settes til side og merkes IKKE GODKJENT.',sections:[
  {nr:'1',title:'Kontrollpunkter',items:[
    ['1.1','Overflate og finish er OK'],
    ['1.2','Retningspil og maskinskilt er påsatt'],
    ['1.3','Viftelager er smurt'],
    ['1.4','Lager er sjekket og godkjent'],
    ['1.5','Falsklufthull i stuss er boret (STK-10)'],
    ['1.6','Låsesplinter er påsatt / skruer tiltrukket med moment, vifte merket og plombert med lakk'],
    ['1.7','Vibrasjonsmålinger er utført']]},
  {nr:'2',title:'Målte verdier (+10 %)',note:'Referanseverdier fra malen: STK-5: 8,7–9,7 A og 1350–1500 · STK-10: 15–20 A og 2185–2400 · STK-25/STK-40: 19,8–55,2 A og 2090–2310. Kolonnene i malen er uklare – bekreft hvilken verdi som gjelder volum og undertrykk.',items:[
    ['2.1','Ampere innstilt',{read:{unit:'A',label:'Innstilt'}}],
    ['2.2','Volum',{read:{unit:'m³/h',label:'Målt'}}],
    ['2.3','Undertrykk',{read:{unit:'mmVS',label:'Målt'}}]]}
 ]},

/* ======================= PAKKING ======================= */
{id:'pakkwm',kat:'Pakking',navn:'Pakking av WALL-MAN',tittel:'PAKKING AV WALL-MAN',kort:'Pakking WALL-MAN',kilde:'Kontrollskjema Pakking av Wall-man',
 head:HEAD_PAKK,sigs:[['sig1','Kontroll gjennomført av']],nofrigiv:true,sections:[
  {nr:'1',title:'Sjekkpunkter',items:[
    ['1.1','Slangestump på lufttilførsel er tatt av'],
    ['1.2','Eske med gummistropper, kjedefeste og annet tilbehør er sendt med'],
    ['1.3','Hengelås er montert og nøkler stripset fast'],
    ['1.4','Aluminiumsdeksel er ferdig pakket og lagt på pall'],
    ['1.5','Alle løse kolli er lagt på pall'],
    ['1.6','Brukermanual er lagt på pall'],
    ['1.7','Skinner er pakket klart til transport'],
    ['1.8','Transportsikring og transportsikringslapper er satt på'],
    ['1.9','«2×4»-knott er pakket i plast og lagt mellom stamme og avstandsholder'],
    ['1.10','Merkelappen «Band her» er satt på (4 stk)'],
    ['1.11','Pall er stemplet IPC på minimum 2 sider'],
    ['1.12','Sjekkliste for pall til Mattilsynet er utfylt'],
    ['1.13','Bilde av pallen ferdig pakket er tatt',{photo:true,autoJa:true}]]}
 ]},

{id:'pakklm',kat:'Pakking',navn:'Pakking av LIFTMAN',tittel:'PAKKING AV LIFTMAN',kort:'Pakking LIFTMAN',kilde:'Kontrollskjema Pakking av Liftman',
 head:HEAD_PAKK,sigs:[['sig1','Kontroll gjennomført av']],nofrigiv:true,sections:[
  {nr:'1',title:'Sjekkpunkter',items:[
    ['1.1','Funksjonstest er foretatt'],
    ['1.2','Hengelås er montert og nøkkel stripset fast'],
    ['1.3','Liftene er plastet inn'],
    ['1.4','Løfteanvisning er satt på den øverste liften'],
    ['1.5','Alle løse kolli er lagt på pallen'],
    ['1.6','Brukermanualen er lagt på pallen'],
    ['1.7','Merkelapp «Band her» er satt på (4 stk)'],
    ['1.8','Pall er stemplet IPC på minst 2 sider'],
    ['1.9','Bilde av pallen ferdig pakket er tatt',{photo:true,autoJa:true}]]}
 ]}
].map(f=>Object.assign({},f,{sections:f.sections.map(s=>Object.assign({},s,{items:s.items.map(([nr,text,o])=>Object.assign({nr,text,prelim:!!s.prelim},o||{}))}))}));
