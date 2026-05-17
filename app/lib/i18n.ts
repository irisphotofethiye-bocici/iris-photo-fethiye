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
  "features.c2.title": { en: "Fine Art Prints",         tr: "Sanat Baskıları" },
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
  "products.necklace.title":    { en: "Iris Necklace",          tr: "İris Kolye" },
  "products.necklace.subtitle": { en: "Silver or gold plated",  tr: "Gümüş veya altın kaplama" },
  "products.necklace.desc":     {
    en: "Single or double pendant in silver or gold-plated finish. Chain length: 42, 45 or 50 cm. Your iris, worn every day.",
    tr: "Gümüş veya altın kaplama tek ya da çift kolye ucu. Zincir uzunluğu: 42, 45 veya 50 cm. İrisiniz, her gün üstünüzde.",
  },
  "products.bracelet.title":    { en: "Iris Bracelet",            tr: "İris Bileklik" },
  "products.bracelet.subtitle": { en: "Handmade in Fethiye",      tr: "Fethiye'de el yapımı" },
  "products.bracelet.desc":     {
    en: "Navy cord with gold bezel, gold box chain with double bezel, or silver box chain with adjustable single bezel.",
    tr: "Altın çerçeveli lacivert kordon, çift çerçeveli altın zincir veya ayarlanabilir tek çerçeveli gümüş zincir.",
  },
  "products.keychain.title":    { en: "Iris Keychain",           tr: "İris Anahtarlık" },
  "products.keychain.subtitle": { en: "Gold plated · Glass dome", tr: "Altın kaplama · Cam kubbe" },
  "products.keychain.desc":     {
    en: "Gold-plated keychain with a glass dome cabochon holding your iris photograph. A small everyday reminder.",
    tr: "İris fotoğrafınızı tutan cam kubbeli, altın kaplama anahtarlık. Küçük ama günlük bir hatırlatıcı.",
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
  "findus.hours":    { en: "Every day 15:00 – 24:00",               tr: "Her gün 15:00 – 24:00" },
  "findus.weather":  { en: "Weather permitting",                    tr: "Hava durumuna göre" },
  "findus.maps":     { en: "Open in Google Maps →",                 tr: "Google Maps'te Aç →" },

  // Footer
  "footer.rights": { en: "All rights reserved.", tr: "Tüm hakları saklıdır." },
};

export function t(lang: Lang, key: string): string {
  return strings[key]?.[lang] ?? strings[key]?.en ?? key;
}
