export const isRussianLocale = (language) =>
  (language || (typeof window !== "undefined" && window.location?.pathname?.startsWith("/rus") ? "ru" : "en"))
    .toString()
    .split("-")[0] === "ru";

const PHRASES = [
  ["Attractions", "Достопримечательности"], ["More Attractions in", "Другие достопримечательности в"],
  ["Vicinity", "Окрестности"], ["Museums", "Музеи"], ["Leisure", "Досуг"], ["Miscellaneous", "Разное"],
  ["Loading attractions...", "Загрузка достопримечательностей..."], ["Unable to load attractions right now.", "Не удалось загрузить достопримечательности."],
  ["Hotel Type", "Тип отеля"], ["All Types", "Все типы"], ["All Cities", "Все города"], ["All Countries", "Все страны"], ["City", "Город"], ["Country", "Страна"], ["Hotels", "Отели"], ["Economy", "Эконом"], ["Standart", "Стандарт"], ["Deluxe", "Делюкс"],
  ["Terms of Stay", "Условия проживания"], ["Rooms", "Номера"], ["Contact Details", "Контакты"], ["Loading...", "Загрузка..."],
  ["Upcoming Private Departures", "Ближайшие частные туры"], ["Date", "Дата"], ["Status", "Статус"], ["Days", "Дни"], ["Price", "Цена"], ["No upcoming departures found.", "Ближайшие туры не найдены."], ["seats available", "мест доступно"], ["Available", "Доступно"], ["Unavailable", "Недоступно"], ["Private", "Частный"], ["Details", "Подробнее"], ["No tours", "Туров нет"], ["Explore Uzbekistan privately with tailor-made itineraries and discover the Silk Road at your own pace.", "Откройте Узбекистан в частном формате с индивидуальными маршрутами и путешествуйте по Шёлковому пути в удобном для вас темпе."],
  ["Uzbekistan Private Tours", "Частные туры по Узбекистану"], ["Cultural Tours", "Культурные туры"], ["Gastronomy Tours", "Гастрономические туры"], ["Religious Tours", "Религиозные туры"], ["Eco Tours", "Эко-туры"], ["City Tours", "Городские туры"], ["Business Tours", "Деловые туры"],
  ["Tashkent - capital of Uzbekiston", "Ташкент — столица Узбекистана"], ["Tashkent, Uzbekistan", "Ташкент, Узбекистан"], ["Samarkand, Uzbekistan", "Самарканд, Узбекистан"], ["Bukhara, Uzbekistan", "Бухара, Узбекистан"], ["Khiva, Uzbekistan", "Хива, Узбекистан"],
  ["History", "История"], ["Cultural Landmarks", "Культурные достопримечательности"], ["Shopping & Leisure", "Шопинг и досуг"], ["City Transport", "Городской транспорт"], ["Foods in Tashkent", "Еда в Ташкенте"],
  ["Kukeldash Madrasah", "Медресе Кукельдаш"], ["Independence Square", "Площадь Независимости"], ["Amir Timur Museum", "Музей Амира Тимура"], ["Amir Temur Square", "Сквер Амира Темура"], ["Minor Mosque (White Mosque)", "Мечеть Минор (Белая мечеть)"], ["State Museum of History of Uzbekistan", "Государственный музей истории Узбекистана"], ["Khazrati Ali Mosque (Hazrat Imam Complex)", "Мечеть Хазрати Али (комплекс Хазрати Имам)"], ["Chorsu Bazar", "Базар Чорсу"],
  ["Registan Square", "Площадь Регистан"], ["BibiKhanym Mosque", "Мечеть Биби-Ханым"], ["Shahi-Zinda Necropolis", "Некрополь Шахи-Зинда"], ["Gur-Emir Mausoleum", "Мавзолей Гур-Эмир"], ["Siab Bazaar", "Сиабский базар"], ["Public Transport in Samarkand", "Общественный транспорт в Самарканде"], ["Tram System", "Трамвайная система"],
  ["Lyabi-Hauz Ensemble", "Ансамбль Ляби-Хауз"], ["Kalyan Minaret and Mosque", "Минарет и мечеть Калян"], ["Ark Fortress", "Крепость Арк"], ["Samanid Mausoleum", "Мавзолей Саманидов"], ["Bolo-Hauz Mosque", "Мечеть Боло-Хауз"], ["Chor-Minor", "Чор-Минор"], ["Magok-i-Attari Mosque", "Мечеть Магоки-Аттари"], ["Trading Domes (Covered Bazaars)", "Торговые купола (крытые базары)"],
  ["Itchan Kala (Inner Fortress)", "Ичан-Кала (внутренняя крепость)"], ["Kunya-Ark Citadel", "Цитадель Куня-Арк"], ["Islam Khodja Minaret & Madrassah", "Минарет и медресе Ислам-Ходжа"], ["Kalta Minor Minaret", "Минарет Кальта-Минор"], ["Juma Mosque (Friday Mosque)", "Джума-мечеть"], ["Tash-Khauli Palace (Stone Palace)", "Дворец Таш-Хаули"], ["Allakuli Khan Caravanserai and Tim", "Караван-сарай и тим Аллакули-хана"],
  ["Uzbekistan", "Узбекистан"], ["Tashkent", "Ташкент"], ["Samarkand", "Самарканд"], ["Bukhara", "Бухара"], ["Khiva", "Хива"], ["Silk Road", "Шёлковый путь"],
];

export const translateStaticText = (value, language) => {
  if (!isRussianLocale(language) || value == null) return value;
  let text = String(value);
  PHRASES.forEach(([source, target]) => {
    text = text.replaceAll(source, target);
  });
  text = text
    .replace(/\bday\b/gi, "день")
    .replace(/\bdays\b/gi, "дней")
    .replace(/\bseats\b/gi, "мест")
    .replace(/\bTours\b/g, "туры")
    .replace(/\bTour\b/g, "тур");
  return text;
};

export default translateStaticText;
