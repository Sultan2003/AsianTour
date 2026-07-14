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

  ["Tashkent, the capital of Uzbekistan, is one of the oldest cities in Central Asia, with a history spanning over 2,000 years. It began as a small oasis settlement along the Great Silk Road, known in ancient times as Chach or Shash.", "Ташкент, столица Узбекистана, — один из древнейших городов Центральной Азии с историей более 2 000 лет. Он начинался как небольшое оазисное поселение на Великом шёлковом пути, в древности известное как Чач или Шаш."],
  ["Throughout history, Tashkent was ruled by various empires — Persian, Turkic, Mongol, and later the Timurid and Khanate of Kokand. In 1865, it was conquered by the Russian Empire, becoming an important administrative and trade center.", "На протяжении истории Ташкентом управляли разные державы — персидские, тюркские, монгольские, а позднее Тимуриды и Кокандское ханство. В 1865 году он был завоёван Российской империей и стал важным административным и торговым центром."],
  ["During the Soviet era (1917–1991), Tashkent developed rapidly into a major industrial and cultural hub, especially after much of the city was rebuilt following a devastating earthquake in 1966.", "В советскую эпоху (1917–1991) Ташкент быстро развился в крупный промышленный и культурный центр, особенно после того, как значительная часть города была восстановлена после разрушительного землетрясения 1966 года."],
  ["Built in the 16th century, it’s one of Central Asia’s largest and best-preserved madrasahs.", "Построенное в XVI веке, это одно из крупнейших и лучше всего сохранившихся медресе Центральной Азии."],
  ["Located near Chorsu Bazaar — beautiful courtyard, traditional brickwork, and history tours.", "Расположено рядом с базаром Чорсу — красивый внутренний двор, традиционная кирпичная кладка и исторические экскурсии."],
  ["Samarkand was one of the greatest cities of the Silk Road and a capital of Amir Timur’s empire.", "Самарканд был одним из величайших городов Шёлкового пути и столицей империи Амира Тимура."],
  ["Bukhara is one of Central Asia’s best-preserved Silk Road cities, famous for its old town, mosques, madrasahs, minarets and trading domes.", "Бухара — один из лучше всего сохранившихся городов Шёлкового пути в Центральной Азии, известный старым городом, мечетями, медресе, минаретами и торговыми куполами."],
  ["Khiva is famous for Itchan Kala, a walled inner city with minarets, madrasahs, palaces and narrow streets that preserve the atmosphere of the Silk Road.", "Хива известна Ичан-Калой — внутренним городом за крепостными стенами с минаретами, медресе, дворцами и узкими улицами, сохраняющими атмосферу Шёлкового пути."],
  ["Plov (rice with meat and carrots) – national dish", "Плов (рис с мясом и морковью) — национальное блюдо"],
  ["Shashlik (grilled kebabs)", "Шашлык (мясо на гриле)"],
  ["Lagman (noodle soup)", "Лагман (суп с лапшой)"],
  ["Samsa (meat pastry)", "Самса (слоёная выпечка с мясом)"],
  ["These are usually halal and made from fresh local ingredients.", "Обычно эти блюда халяльные и готовятся из свежих местных продуктов."],
  ["Traditional Uzbek Cuisine", "Традиционная узбекская кухня"],
  ["Most locals and tourists love trying:", "Большинство местных жителей и туристов любят пробовать:"],
  ["Tashkent Metro is the oldest and only metro system in Central Asia, opened in 1977.", "Ташкентское метро — старейшая и единственная система метро в Центральной Азии, открытая в 1977 году."],
  ["Tashkent Metro opened in 1977.", "Ташкентское метро открылось в 1977 году."],
  ["It is the oldest and only metro system in Central Asia.", "Это старейшая и единственная система метро в Центральной Азии."],
  ["It’s clean, safe, cheap (around $0.10 per ride), and beautifully decorated — every station has unique architecture and mosaics.", "Оно чистое, безопасное, недорогое (около 0,10 доллара за поездку) и красиво оформленное — каждая станция имеет уникальную архитектуру и мозаики."],
  ["There are 4 main lines connecting almost all city districts and tourist spots.", "Есть 4 основные линии, соединяющие почти все районы города и туристические места."],
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
