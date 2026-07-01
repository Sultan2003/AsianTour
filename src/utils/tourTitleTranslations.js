const RU_PHRASES = [
  [/Central Asia/gi, "Центральная Азия"],
  [/Silk Road/gi, "Шёлковый путь"],
  [/Uzbekistan/gi, "Узбекистан"],
  [/Kazakhstan/gi, "Казахстан"],
  [/Kyrgyzstan/gi, "Кыргызстан"],
  [/Tajikistan/gi, "Таджикистан"],
  [/Turkmenistan/gi, "Туркменистан"],
  [/Caucasus/gi, "Кавказ"],
  [/Armenia/gi, "Армения"],
  [/Azerbaijan/gi, "Азербайджан"],
  [/Georgia/gi, "Грузия"],
  [/Tashkent/gi, "Ташкент"],
  [/Samarkand/gi, "Самарканд"],
  [/Bukhara/gi, "Бухара"],
  [/Khiva/gi, "Хива"],
  [/Almaty/gi, "Алматы"],
  [/Astana/gi, "Астана"],
  [/Bishkek/gi, "Бишкек"],
  [/Osh/gi, "Ош"],
  [/Dushanbe/gi, "Душанбе"],
  [/Ashgabat/gi, "Ашхабад"],
  [/Yerevan|Erevan/gi, "Ереван"],
  [/Baku/gi, "Баку"],
  [/Tbilisi/gi, "Тбилиси"],
  [/Mountains?/gi, "горы"],
  [/Classic/gi, "классический"],
  [/Relaxed/gi, "спокойный"],
  [/Welcome to/gi, "Добро пожаловать в"],
  [/Highlights?/gi, "главные достопримечательности"],
  [/Discovery/gi, "открытие"],
  [/Adventure/gi, "приключенческий"],
  [/Cultural/gi, "культурный"],
  [/Gastronomy|Gastronomic/gi, "гастрономический"],
  [/Religious/gi, "религиозный"],
  [/Eco/gi, "эко"],
  [/City/gi, "городской"],
  [/Business|MICE/gi, "деловой"],
  [/Private/gi, "частный"],
  [/Group/gi, "групповой"],
  [/Tour Packages?/gi, "турпакеты"],
  [/Tours?/gi, "тур"],
  [/Package/gi, "пакет"],
  [/Day/gi, "дневный"],
  [/Days/gi, "дней"],
];

export const translateTourTitle = (title, language) => {
  const detectedLanguage = language || (typeof window !== "undefined" && window.location?.pathname?.startsWith("/rus") ? "ru" : "en");
  if (!title || (detectedLanguage || "en").split("-")[0] !== "ru") return title;
  let translated = String(title);
  RU_PHRASES.forEach(([pattern, replacement]) => {
    translated = translated.replace(pattern, replacement);
  });
  translated = translated
    .replace(/(\d+)\s*дневный/gi, "$1-дневный")
    .replace(/\s+([.,:;!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
  return translated || title;
};

export default translateTourTitle;
