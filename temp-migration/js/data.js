const PRODUCTS = [
  {id:'diasslope',name:'DiasSlope',dim:'2B',tag:'Şev Stabilitesi',ico:'slope',
   desc:'Limit denge yöntemleriyle (Bishop, Janbu, Spencer, Morgenstern-Price) 2B şev stabilite analizi ve güvenlik sayısı hesabı.',
   methods:['Bishop','Janbu','Spencer','Morgenstern-Price','Olasılıksal analiz']},
  {id:'diasfem',name:'DiasFEM',dim:'2B',tag:'Sonlu Elemanlar',ico:'mesh',
   desc:'Gerilme–deformasyon ve mukavemet azaltma (SRF) analizleri için 2B sonlu elemanlar geoteknik çözücü.',
   methods:['Gerilme analizi','SRF stabilite','Sızma analizi','Konsolidasyon']},
  {id:'diaswall',name:'DiasWall',dim:'2B',tag:'İstinat Yapıları',ico:'wall',
   desc:'Konsol, ankrajlı ve donatılı zemin istinat duvarlarının tasarımı; devrilme, kayma ve taşıma gücü kontrolleri.',
   methods:['Konsol duvar','Ankrajlı duvar','Donatılı zemin','Deprem tahkiki']},
  {id:'diasfound',name:'DiasFound',dim:'—',tag:'Temel Tasarımı',ico:'found',
   desc:'Yüzeysel temellerde taşıma gücü, oturma, eksantrik ve eğik yük kontrolleriyle güvenli temel boyutlandırma.',
   methods:['Taşıma gücü','Eksantrik yük','Zımbalama','Oturma kontrolü']},
  {id:'diaspile',name:'DiasPile',dim:'2B',tag:'Kazık Analizi',ico:'pile',
   desc:'Düşey ve yatay yük altında tekil/grup kazık taşıma gücü, deplasman ve yapısal kontrol analizleri.',
   methods:['Eksenel kapasite','Yanal yük (p-y)','Grup etkisi','Negatif çevre sürtünmesi']},
  {id:'diassettle',name:'DiasSettle',dim:'—',tag:'Oturma & Konsolidasyon',ico:'settle',
   desc:'Elastik ve konsolidasyon oturmaları, zaman–oturma ilişkisi ve aşırı boşluk suyu basıncı sönümlenmesi.',
   methods:['Elastik oturma','Birincil konsolidasyon','İkincil sıkışma','Zaman–oturma']},
  {id:'diasliq',name:'DiasLiq',dim:'—',tag:'Deprem Geotekniği',ico:'liq',
   desc:'SPT/CPT verisiyle sıvılaşma tetiklenmesi, güvenlik sayısı ve sıvılaşma sonrası oturma değerlendirmesi.',
   methods:['SPT tabanlı','CPT tabanlı','Sıvılaşma sonrası oturma','TBDY 2018 uyumlu']},
  {id:'diasbore',name:'DiasBore',dim:'—',tag:'Veri Yönetimi',ico:'data',
   desc:'Sondaj logları, zemin profilleri ve laboratuvar verilerinin yönetimi; standart formatta çıktı üretimi.',
   methods:['Sondaj logu','Zemin profili','Laboratuvar verisi','Kesit üretimi']},
];

const SOLUTIONS = [
  {id:'sev',name:'Şev & Kazı Stabilitesi',ico:'slope',
   desc:'Doğal şevler, kazılar ve dolgu yapıları için limit denge ve sonlu eleman tabanlı entegre stabilite araçları.',tools:['DiasSlope','DiasFEM']},
  {id:'temel',name:'Temel & Oturma',ico:'found',
   desc:'Yüzeysel ve derin temellerde taşıma gücü, oturma ve zemin–yapı etkileşimi için kapsamlı çözümler.',tools:['DiasFound','DiasSettle','DiasPile']},
  {id:'deprem',name:'Deprem Geotekniği',ico:'liq',
   desc:'Sıvılaşma değerlendirmesi ve dinamik analizlerle TBDY 2018 esaslı deprem geotekniği çözümleri.',tools:['DiasLiq','DiasFEM']},
  {id:'istinat',name:'İstinat Yapıları',ico:'wall',
   desc:'Konsol, ankrajlı ve donatılı zemin istinat sistemlerinin tasarımı ve güvenlik kontrolleri.',tools:['DiasWall','DiasPile']},
  {id:'veri',name:'Veri Yönetimi',ico:'data',
   desc:'Saha ve laboratuvar verisinin tek merkezde toplanması, projeler arası tutarlı raporlanması.',tools:['DiasBore']},
];

const ICONS = {
  slope:'<path d="M3 19h18M3 19 14 7l3 3 4-5"/><path d="M14 7l-4 12"/>',
  mesh:'<path d="M4 20 12 4l8 16zM4 20h16M8 12h8M9.5 8h5"/>',
  wall:'<path d="M3 21h18M5 21V9h6v12M11 15h8v6M7 12h2M7 18h2M14 18h2"/>',
  found:'<path d="M3 9h18l-2 4H5zM5 13v6M19 13v6M5 19h14M12 4v5"/>',
  pile:'<path d="M3 7h18M8 7v13M16 7v13M8 11h8M8 15h8M12 4v3"/>',
  settle:'<path d="M3 6h18M3 6c0 4 18 4 18 0M3 6v8c0 4 18 4 18 0V6M12 11v6"/>',
  liq:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11zM9 14a3 3 0 0 0 3 3"/>',
  data:'<path d="M4 6c0-1.5 3.6-2.5 8-2.5S20 4.5 20 6s-3.6 2.5-8 2.5S4 7.5 4 6zM4 6v12c0 1.5 3.6 2.5 8 2.5s8-1 8-2.5V6M4 12c0 1.5 3.6 2.5 8 2.5s8-1 8-2.5"/>',
};

const COVERS = [
  'linear-gradient(135deg,#38B6FF,#1577C2)',
  'linear-gradient(135deg,#2E2E30,#454a52)',
  'linear-gradient(135deg,#1893E6,#0c4f7d)',
  'linear-gradient(135deg,#5ec3ff,#2e2e30)'
];

const SEED_BLOG = [
  {id:'p1',title:'Şev Stabilitesinde Limit Denge mi, Sonlu Elemanlar mı?',category:'Teknik',author:'Dias Logic Ekibi',
   emoji:'⛰️',cover:0,date:'2025-05-28',
   summary:'Klasik dilim yöntemleriyle (LEM) sonlu elemanlar (FEM) yaklaşımı arasındaki farkları, hangi durumda hangisinin tercih edilmesi gerektiğini ele alıyoruz.',
   body:`Geoteknik mühendisliğinde şev stabilitesi, en sık karşılaşılan analiz problemlerinden biridir. İki temel yaklaşım öne çıkar: limit denge yöntemleri (LEM) ve sonlu elemanlar yöntemi (FEM).

## Limit Denge Yöntemleri

Bishop, Janbu, Spencer ve Morgenstern-Price gibi dilim yöntemleri, varsayılan bir kayma yüzeyi boyunca kuvvet ve moment dengesi kurar. **Hızlı**, sezgisel ve onlarca yıldır pratikte sınanmış yöntemlerdir.

- Kritik kayma yüzeyini otomatik arama
- Olasılıksal (probabilistik) analiz imkanı
- Düşük hesaplama maliyeti

## Sonlu Elemanlar Yöntemi

FEM, kayma yüzeyini önceden varsaymaz; gerilme–deformasyon alanını çözerek göçme mekanizmasının kendiliğinden oluşmasını sağlar. Mukavemet azaltma tekniği (SRF) ile güvenlik sayısı elde edilir.

## Hangisini Seçmeli?

Basit geometriler ve hızlı parametrik çalışmalar için LEM yeterlidir. Karmaşık zemin–yapı etkileşimi, kademeli kazı veya deformasyon kontrolü gerektiren durumlarda FEM tercih edilmelidir. DiasSlope ve DiasFEM, her iki yaklaşımı da tek bir iş akışında sunar.`},
  {id:'p2',title:'TBDY 2018\u2019e Göre Sıvılaşma Değerlendirmesinde 3 Kritik Nokta',category:'Yönetmelik',author:'Dias Logic Ekibi',
   emoji:'🌊',cover:2,date:'2025-04-15',
   summary:'Türkiye Bina Deprem Yönetmeliği kapsamında sıvılaşma analizinde sıkça gözden kaçan üç önemli detayı inceliyoruz.',
   body:`Sıvılaşma, deprem geotekniğinin en kritik konularından biridir. TBDY 2018 ile birlikte değerlendirme esasları netleşti, ancak uygulamada bazı noktalar hâlâ gözden kaçıyor.

## 1. Doğru İvme Değerinin Seçimi

Sıvılaşma tetiklenmesinde kullanılan zemin yüzeyi ivmesi, sahaya özgü tasarım spektrumundan türetilmelidir. Genel harita değerlerinin doğrudan kullanılması hatalı sonuçlar doğurabilir.

## 2. İnce Dane İçeriği Düzeltmesi

SPT tabanlı yöntemlerde ince dane içeriği (FC) düzeltmesi, güvenlik sayısını doğrudan etkiler. **DiasLiq**, FC düzeltmesini saha verisinden otomatik uygular.

## 3. Sıvılaşma Sonrası Oturma

Tetiklenme analizinin yanı sıra sıvılaşma sonrası oturmaların da hesaplanması gerekir. Bu, üstyapı performansı için belirleyicidir.

Doğru bir sıvılaşma değerlendirmesi, hem güvenli hem de ekonomik temel tasarımının anahtarıdir.`},
  {id:'p3',title:'İstinat Duvarı Tasarımında Sık Yapılan 5 Hata',category:'Pratik',author:'Dias Logic Ekibi',
   emoji:'🧱',cover:1,date:'2025-03-02',
   summary:'Konsol ve ankrajlı istinat duvarlarının tasarımında mühendislerin en çok düştüğü hataları ve bunlardan nasıl kaçınılacağını derledik.',
   body:`İstinat yapıları, görünüşte basit olsalar da tasarım hatalarına oldukça açıktır. İşte en sık karşılaşılan beş hata:

## 1. Zemin Suyu Basıncının İhmali

Drenajı yetersiz duvarlarda biriken su, tasarım yüklerini ciddi şekilde artırır. Hidrostatik basınç mutlaka dikkate alınmalıdır.

## 2. Yanlış Aktif/Pasif Basınç Katsayısı

Duvar hareketine bağlı olarak aktif veya pasif durum seçimi kritik öneme sahiptir.

## 3. Temel Taşıma Gücü Kontrolünün Atlanması

Devrilme ve kaymaya odaklanırken taban basıncının taşıma gücünü aşması gözden kaçabilir.

## 4. Deprem Yükünün Eksik Modellenmesi

TBDY 2018 kapsamında Mononobe-Okabe yaklaşımıyla dinamik itki hesaba katılmalıdır.

## 5. Global Stabilitenin Kontrol Edilmemesi

Duvarın kendisi güvenli olsa bile, tüm sistemin şev stabilitesi sağlanmalıdır. **DiasWall** ve **DiasSlope** birlikte bu kontrolü kolaylaştırır.`},
];

const SEED_FCATS = [
  {id:'c1',name:'Genel',emoji:'💬',desc:'Geoteknik mühendisliği üzerine genel sohbet ve duyurular'},
  {id:'c2',name:'Şev Stabilitesi',emoji:'⛰️',desc:'Şev analizleri, LEM ve FEM uygulamaları'},
  {id:'c3',name:'Temel & Oturma',emoji:'🏗️',desc:'Temel tasarımı, taşıma gücü ve oturma soruları'},
  {id:'c4',name:'Yazılım Kullanımı',emoji:'🖥️',desc:'Dias Logic yazılımlarıyla ilgili kullanım soruları'},
  {id:'c5',name:'Lisans & Destek',emoji:'🔑',desc:'Lisanslama, kurulum ve teknik destek'},
];

const SEED_TOPICS = [
  {id:'t1',cat:'c2',title:'DiasSlope\u2019da kritik kayma yüzeyi araması ne kadar sürmeli?',
   author:'Mehmet A.',date:'2025-05-20',
   body:'Büyük bir model üzerinde çalışıyorum ve otomatik kayma yüzeyi araması uzun sürüyor. Izgara çözünürlüğünü düşürmek dışında öneriniz var mı?',
   replies:[
     {id:'r1',author:'Dias Logic Destek',date:'2025-05-20',op:false,body:'Merhaba, öncelikle arama ızgarasını ilgilendiğiniz bölgeye odaklamanızı öneririz. Ayrıca "akıllı arama" seçeneğini etkinleştirirseniz kritik bölge çevresinde yoğunlaşarak süreyi belirgin şekilde kısaltır.'},
     {id:'r2',author:'Mehmet A.',date:'2025-05-21',op:true,body:'Akıllı arama ile süre yarıdan fazla düştü, teşekkürler!'},
   ]},
  {id:'t2',cat:'c3',title:'Konsolidasyon oturması için zaman parametresi nasıl belirlenir?',
   author:'Zeynep K.',date:'2025-05-12',
   body:'DiasSettle ile birincil konsolidasyon oturmasını hesaplıyorum ancak cv değerinin proje genelinde nasıl seçileceği konusunda kararsızım. Laboratuvar verisi sınırlı.',
   replies:[
     {id:'r3',author:'Prof. Dr. Ahmet Y.',date:'2025-05-13',op:false,body:'Sınırlı veri durumunda ödometre testlerinden elde edilen cv aralığının alt sınırını esas almak güvenli tarafta kalmanızı sağlar. Tabaka bazında ayrı değerler tanımlamanızı öneririm.'},
   ]},
];

// Global window objesine bağlayalım ki diğer dosyalardan kolayca erişilsin
window.PRODUCTS = PRODUCTS;
window.SOLUTIONS = SOLUTIONS;
window.ICONS = ICONS;
window.COVERS = COVERS;
window.SEED_BLOG = SEED_BLOG;
window.SEED_FCATS = SEED_FCATS;
window.SEED_TOPICS = SEED_TOPICS;
