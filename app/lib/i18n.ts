export type Lang = "en" | "tr";

const strings: Record<string, Record<Lang, string>> = {
  // StatusBar
  "status.hours":   { en: "Open every day 15:00 – 24:00",            tr: "Her gün 15:00 – 24:00 arası açık" },
  "status.weather": { en: "Weather permitting · Ölüdeniz Art Street", tr: "Hava durumuna göre · Ölüdeniz Art Sokak" },

  // Nav
  "nav.experience": { en: "Experience", tr: "Deneyim" },
  "nav.products":   { en: "Products",   tr: "Ürünler" },
  "nav.gallery":    { en: "Gallery",    tr: "Galeri" },
  "nav.findUs":     { en: "Find Us",    tr: "Bizi Bulun" },

  // Hero
  "hero.location":     { en: "Ölüdeniz Art Street, Fethiye",    tr: "Ölüdeniz Art Sokak, Fethiye" },
  "hero.heading":      { en: "Your eye.",                        tr: "Gözün." },
  "hero.headingEm":    { en: "Turned into art.",                 tr: "Sanata dönüştü." },
  "hero.body":         {
    en: "Free iris photography session at our Art Street studio. Choose a fine art print, necklace, bracelet or keychain — a truly unique Fethiye souvenir. Walk in, no appointment needed.",
    tr: "Art Sokak stüdyomuzda ücretsiz iris fotoğraf çekimi. Sanat baskısı, kolye, bileklik veya anahtarlık seçin — gerçekten eşsiz bir Fethiye hatırası. Randevu gerekmez, kapıdan girin.",
  },
  "hero.subtext":       {
    en: "The most personal souvenir you'll find in Fethiye.",
    tr: "Fethiye'de bulabileceğiniz en kişisel hediye.",
  },
  "hero.cta.whatsapp": { en: "Book via WhatsApp",  tr: "WhatsApp'tan Rezerve Et" },
  "hero.cta.how":      { en: "How it works",        tr: "Nasıl çalışır" },

  // Features
  "features.title":    { en: "One visit. Three experiences.",      tr: "Bir ziyaret. Üç deneyim." },
  "features.subtitle": {
    en: "Everything happens at our outdoor studio on Ölüdeniz Art Street.",
    tr: "Her şey Ölüdeniz Art Sokak'taki açık hava stüdyomuzda gerçekleşiyor.",
  },
  "features.c1.title": { en: "Free Iris Photography",   tr: "Ücretsiz İris Fotoğrafçılığı" },
  "features.c1.body":  {
    en: "We photograph your iris with our macro lens — completely free. No appointment, no waiting. Just walk into our Art Street studio.",
    tr: "İrisinizi makro lensimizle fotoğraflıyoruz — tamamen ücretsiz. Randevu yok, bekleme yok. Art Sokak stüdyomuza kapıdan girin.",
  },
  "features.c2.title": { en: "Unforgettable Souvenir",   tr: "Unutulmaz Hediye" },
  "features.c2.body":  {
    en: "Your iris on museum-quality fine art paper. Sizes from 13×18 cm up to 50×70 cm, with black or white frame options.",
    tr: "İrisiniz müze kalitesinde sanat kağıdına baskılı. 13×18 cm'den 50×70 cm'e kadar boyutlar, siyah veya beyaz çerçeve seçenekleriyle.",
  },
  "features.c3.title": { en: "Iris Jewellery",          tr: "İris Takısı" },
  "features.c3.body":  {
    en: "Silver or gold-plated necklaces, bracelets and keychains — each holding a tiny photograph of your own eye.",
    tr: "Gümüş veya altın kaplama kolyeler, bileklikler ve anahtarlıklar — her birinde kendi gözünüzün minik fotoğrafı.",
  },

  // Process
  "process.title":    { en: "How it works",                                    tr: "Nasıl çalışır" },
  "process.subtitle": { en: "From walk-in to keepsake in three simple steps.", tr: "Üç basit adımda hatıranızı alın." },
  "process.s1.title": { en: "We photograph your iris", tr: "İrisinizi fotoğraflıyoruz" },
  "process.s1.body":  {
    en: "Sit in front of our macro lens. The session takes about two minutes — no flash, no discomfort.",
    tr: "Makro lensimizin önüne geçin. Çekim yaklaşık iki dakika sürer — flaş yok, rahatsızlık yok.",
  },
  "process.s2.title": { en: "Choose your keepsake", tr: "Hatıranızı seçin" },
  "process.s2.body":  {
    en: "Browse our prints and jewellery samples on the spot. Pick the size, format and style that suits you.",
    tr: "Baskı ve takı örneklerimize yerinde göz atın. Size uygun boyut, format ve stili seçin.",
  },
  "process.s3.title": { en: "Ready same day", tr: "Aynı gün hazır" },
  "process.s3.body":  {
    en: "Most items are printed and assembled within the hour. Take a unique piece of Fethiye home with you.",
    tr: "Çoğu ürün bir saat içinde hazırlanır. Fethiye'den evinize benzersiz bir parça götürün.",
  },

  // Moment
  "moment.badge":    { en: "A shared moment",       tr: "Paylaşılan bir an" },
  "moment.title":    { en: "The perfect",           tr: "Mükemmel" },
  "moment.titleEm":  { en: "Ölüdeniz memory",       tr: "Ölüdeniz hatırası" },
  "moment.body1":    {
    en: "After paragliding from Babadag, a walk along Art Street brings you to us. Families, couples, solo travellers — everyone leaves with something they never expected: a portrait of the most intricate thing about them.",
    tr: "Babadag'dan yamaç paraşütü yaptıktan sonra Art Sokak boyunca bir yürüyüş sizi bize getirir. Aileler, çiftler, yalnız gezginler — herkes hiç beklemedikleri bir şeyle ayrılır: kendilerindeki en gizemli şeyin portresi.",
  },
  "moment.body2":    {
    en: "No two irises are alike. Neither are the stories that bring people here.",
    tr: "Hiçbir iki iris birbirinin aynısı değildir. Buraya insanları getiren hikayeler de öyle.",
  },
  "moment.cta":      { en: "Reserve a slot", tr: "Yer Ayırtın" },

  // Products
  "products.title":    { en: "Choose your keepsake",                          tr: "Hatıranızı seçin" },
  "products.subtitle": { en: "Tap any card to explore photos and options.",   tr: "Fotoğraflar ve seçenekleri görmek için bir karta dokunun." },
  "products.lightbox.cta": { en: "Ask on WhatsApp", tr: "WhatsApp'tan Sor" },

  "products.print.title":    { en: "Fine Art Print",          tr: "Sanat Baskısı" },
  "products.print.subtitle": { en: "Fine art paper · Framed", tr: "Sanat kağıdı · Çerçeveli" },
  "products.print.desc":     {
    en: "Printed on museum-quality fine art paper. Available in 9 sizes from 13×18 cm to 50×70 cm. Black or white frame included.",
    tr: "Müze kalitesinde sanat kağıdına baskılı. 13×18 cm'den 50×70 cm'e kadar 9 farklı boyut. Siyah veya beyaz çerçeve dahil.",
  },
  "products.necklace.title":    { en: "Iris Necklace",                   tr: "İris Kolye" },
  "products.necklace.subtitle": { en: "Stainless steel · 50 cm chain",   tr: "Paslanmaz çelik · 50 cm zincir" },
  "products.necklace.desc":     {
    en: "Stainless steel with a gold-plated finish. Iris size available in 1.2, 1.6, 2 or 2.5 cm. Chain length: 50 cm.",
    tr: "Paslanmaz çelik üzerine altın kaplama. İris boyutu 1,2 / 1,6 / 2 / 2,5 cm seçeneklerinde mevcut. Zincir boyu 50 cm.",
  },
  "products.necklace.desc.1":   {
    en: "Stainless steel with two irises in a single pendant, 2.5 cm. A unique piece for two people — or two eyes. Chain length: 50 cm.",
    tr: "Paslanmaz çelik, tek üründe iki iris, 2,5 cm. İki kişi ya da iki göz için eşsiz bir parça. Zincir boyu 50 cm.",
  },
  "products.necklace.desc.2":   {
    en: "Stainless steel snake chain necklace. Iris size available in 1.2, 1.6, 2 or 2.5 cm. Chain length: 50 cm.",
    tr: "Paslanmaz çelik yılan zincirli kolye. İris boyutu 1,2 / 1,6 / 2 / 2,5 cm seçeneklerinde mevcut. Zincir boyu 50 cm.",
  },
  "products.necklace.desc.3":   {
    en: "Stainless steel double iris pendant, 1.2 cm — compact and elegant. Chain length: 50 cm.",
    tr: "Paslanmaz çelik çift iris kolye ucu, 1,2 cm — küçük ve zarif. Zincir boyu 50 cm.",
  },
  "products.necklace.desc.4":   {
    en: "Stainless steel setting with a leather cord. Iris size available in 1.2, 1.6, 2 or 2.5 cm. Cord length: 50 cm.",
    tr: "Paslanmaz çelik gövde, deri kordon. İris boyutu 1,2 / 1,6 / 2 / 2,5 cm seçeneklerinde mevcut. Kordon boyu 50 cm.",
  },
  "products.bracelet.title":    { en: "Iris Bracelet",            tr: "İris Bileklik" },
  "products.bracelet.subtitle": { en: "Handmade in Fethiye",      tr: "Fethiye'de el yapımı" },
  "products.bracelet.desc":     {
    en: "Made from stainless steel with a gold-plated finish that won't fade or tarnish. The iris comes in 1.2, 1.6 or 2 cm sizes — pick the one that feels right for your wrist. Fully adjustable, so it fits everyone.",
    tr: "Paslanmaz çelik üzerine altın kaplama — solmaz, kararmaz. İris camı 1,2 / 1,6 / 2 cm boyutlarında mevcut, bileğinize en yakışanı seçin. Ayarlanabilir yapısı sayesinde her bileğe uyuyor.",
  },
  "products.bracelet.desc.1":   {
    en: "Handwoven macramé cord with a stainless steel body — natural texture, solid build. Available in 1.2, 1.6 or 2 cm iris sizes. The cord is adjustable, so it sits exactly where you want it.",
    tr: "El örgüsü makrome kordon, paslanmaz çelik gövdeyle buluşuyor — doğal doku, sağlam yapı. İris boyutu: 1,2 / 1,6 / 2 cm. Kordon ayarlanabilir, tam istediğiniz yerde durur.",
  },
  "products.bracelet.desc.2":   {
    en: "A playful mix of colorful cords with a silver or gold-plated stainless steel setting. Three iris sizes: 1.2, 1.6 or 2 cm. Adjustable cord — pick the color combo that matches your vibe.",
    tr: "Renkli iplik örgüsü, gümüş ya da altın kaplama paslanmaz çelik çerçeveyle. İris boyutu: 1,2 / 1,6 / 2 cm. Ayarlanabilir kordon — tarzınıza uyan rengi seçin.",
  },
  "products.bracelet.desc.3":   {
    en: "Simple stainless steel with a clean adjustable cord — understated, everyday, built to last. Available in 1.2, 1.6 or 2 cm iris sizes.",
    tr: "Sade paslanmaz çelik, temiz ayarlanabilir kordonlu — gösterişsiz, günlük, dayanıklı. İris boyutu: 1,2 / 1,6 / 2 cm.",
  },
  "products.bracelet.desc.4":   {
    en: "Stainless steel with an adjustable cord that fits any wrist. Iris size options: 1.2, 1.6 or 2 cm — pick what suits you best.",
    tr: "Paslanmaz çelik, her bileğe uyan ayarlı kordonlu. İris boyutu seçenekleri: 1,2 / 1,6 / 2 cm — size en uygun olanı seçin.",
  },
  "products.keychain.title":    { en: "Iris Keychain",              tr: "İris Anahtarlık" },
  "products.keychain.subtitle": { en: "Stainless steel · Gold plated option", tr: "Paslanmaz çelik · Altın kaplama seçeneği" },
  "products.keychain.desc":     {
    en: "Stainless steel with a gold-plated finish. Available as a single iris or double iris (two-sided). A small everyday reminder of your Fethiye visit.",
    tr: "Paslanmaz çelik üzerine altın kaplama. Tek iris veya çift iris (arkalı önlü) seçeneğiyle mevcut. Fethiye ziyaretinizin küçük günlük hatırlatıcısı.",
  },
  "products.keychain.desc.1":   {
    en: "Stainless steel keychain, 2.5 cm iris. Available as a single iris or double iris (front and back). A solid, everyday carry.",
    tr: "Paslanmaz çelik anahtarlık, 2,5 cm iris. Tek iris veya arkalı önlü çift iris seçeneğiyle mevcut. Sağlam, günlük kullanım için ideal.",
  },

  // Gallery
  "gallery.title":    { en: "Every iris is unique",                                         tr: "Her iris benzersizdir" },
  "gallery.subtitle": { en: "A small selection of irises we have photographed in Fethiye.", tr: "Fethiye'de fotoğrafladığımız irislerden küçük bir seçki." },

  // ShareBar
  "share.label":  { en: "Share the experience:",    tr: "Deneyimi paylaş:" },
  "share.copy":   { en: "Copy link",                tr: "Bağlantıyı kopyala" },
  "share.copied": { en: "Copied!",                  tr: "Kopyalandı!" },

  // FindUs
  "findus.title":    { en: "Find us",                               tr: "Bizi Bulun" },
  "findus.subtitle": { en: "No appointment needed — just walk in.", tr: "Randevu gerekmez — doğrudan gelin." },
  "findus.souvenir": {
    en: "The most personal souvenir on Ölüdeniz Art Street.",
    tr: "Ölüdeniz Art Sokak'taki en kişisel hediye.",
  },
  "findus.hours":    { en: "Every day 15:00 – 24:00",               tr: "Her gün 15:00 – 24:00" },
  "findus.weather":  { en: "Weather permitting",                    tr: "Hava durumuna göre" },
  "findus.maps":     { en: "Open in Google Maps →",                 tr: "Google Maps'te Aç →" },

  // Footer
  "footer.rights": { en: "All rights reserved.", tr: "Tüm hakları saklıdır." },
};

export function t(lang: Lang, key: string): string {
  return strings[key]?.[lang] ?? strings[key]?.en ?? key;
}
