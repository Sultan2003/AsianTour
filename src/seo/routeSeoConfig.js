import { SITE_URL, getAlternateUrls, getCanonicalUrl, normalizePathname, splitLocalePathname } from "./canonical";
import { getSeoBlogPost, seoTourPages } from "./staticSeoPages";
import { staticRouteSeo } from "./staticRouteSeo";

const SITE_NAME = "Go To Central Asia";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
const TWITTER_SITE = "@gotocentralasia";

const routeSeoMap = staticRouteSeo;

// The Russian URLs are independent, crawlable language versions. Keep their
// search snippets in Russian for the core commercial and destination pages
// rather than presenting an English title under a ru hreflang annotation.
const russianSeoOverrides = {
  "/": {
    title: "Туры в Узбекистан 2026: Самарканд, Бухара, Хива | Туроператор",
    description: "Официальный туроператор по Узбекистану. Групповые и авторские туры по Шелковому пути: Ташкент, Самарканд, Бухара, Хива. Поезд Афросиаб. Бронируйте на 2026!",
  },
  "/uzbek-tours": {
    title: "Туры в Узбекистан 2026: цены, программы, экскурсии",
    description: "Лучшие экскурсионные и групповые туры по Узбекистану: Ташкент, Самарканд, Бухара, Хива. Билеты на поезд Афросиаб, отели 4*, лицензированные гиды.",
  },
  "/uzbekistan-private-tours": {
    title: "Индивидуальные туры в Узбекистан | Шёлковый путь",
    description: "Создайте индивидуальный тур в Узбекистан с удобными датами, гидами, отелями и маршрутом через Ташкент, Самарканд, Бухару и Хиву.",
  },
  "/central-asia-tours": {
    title: "Туры по Центральной Азии | Многодневные маршруты",
    description: "Сравните туры по Центральной Азии с Узбекистаном, Казахстаном, Кыргызстаном, Таджикистаном и Туркменистаном.",
  },
  "/silk-road-tours": {
    title: "Туры по Шёлковому пути | Узбекистан и Центральная Азия",
    description: "Путешествуйте по Шёлковому пути через Самарканд, Бухару, Хиву и Ташкент в составе группы или по индивидуальному маршруту.",
  },
  "/uzbekistan": {
    title: "Путеводитель по Узбекистану | Самарканд, Бухара и Хива",
    description: "Планируйте путешествие по Узбекистану: города Шёлкового пути, поезда, базары, памятники, отели, гиды и идеи маршрутов.",
  },
  "/uzbekistan-samarkand": {
    title: "Самарканд: достопримечательности, Регистан, отели, гид",
    description: "Полный путеводитель по Самарканду: площадь Регистан, мавзолей Гур-Эмир, некрополь Шахи-Зинда, билеты на поезд Афросиаб, лучшие рестораны и отели города.",
  },
  "/uzbekistan-bukhara": {
    title: "Бухара: путеводитель, достопримечательности, Пои-Калян",
    description: "Гид по древней Бухаре: ансамбль Пои-Калян, крепость Арк, ансамбль Ляби-Хауз, купола ремесленников, лучшие кафе с пловом и проверенные гостиницы в центре.",
  },
  "/uzbekistan-khiva": {
    title: "Хива и крепость Ичан-Кала: гид, достопримечательности",
    description: "Путеводитель по Хиве: крепость Ичан-Кала, минарет Кальта-Минар, мечеть Джума, дворец Таш-Хаули, билеты, правила фотосъемки и советы для путешественников.",
  },
  "/tour/10-day-uzbekistan-relaxed-group-tour-2026-2027": {
    title: "Тур в Узбекистан на 10 дней: Ташкент, Хива, Бухара, Самарканд",
    description: "Размеренный групповой тур по Узбекистану на 10 дней. Билеты на поезд Афросиаб, отели 4*, русскоязычный гид, мастер-класс в Гиждуване. От $1,150 на 2026 год.",
  },
};

const formatSegment = (segment) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const buildFallbackSeo = (pathname) => {
  if (pathname.startsWith("/tour/") || pathname.startsWith("/private-tour/")) {
    const isPrivateTour = pathname.startsWith("/private-tour/");
    const slug = pathname.replace(isPrivateTour ? "/private-tour/" : "/tour/", "");
    const tour = seoTourPages.find((item) => item.slug === slug);
    const tourName = tour?.h1 || formatSegment(slug);

    return {
      title: tour?.title || `${tourName} | ${SITE_NAME}`,
      description:
        tour?.description ||
        `Explore itinerary details, inclusions, and booking options for ${tourName} with ${SITE_NAME}.`,
      type: "article",
      tour,
    };
  }

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "");
    const post = getSeoBlogPost(slug);

    if (post) {
      return {
        title: post.title,
        description: post.description,
        type: "article",
      };
    }
  }


  if (pathname.startsWith("/hotels/")) {
    const hotelSlug = pathname.replace("/hotels/", "");
    const hotelName = formatSegment(hotelSlug);

    return {
      title: `${hotelName} Hotel | ${SITE_NAME}`,
      description: `View rooms, terms of stay, contact details, and booking information for ${hotelName}.`,
      type: "article",
    };
  }

  if (pathname.startsWith("/weather/")) {
    const countrySlug = pathname.replace("/weather/", "");
    const destination = formatSegment(countrySlug);

    return {
      title: `${destination} Weather Forecast | ${SITE_NAME}`,
      description: `Check current and upcoming weather trends for ${destination} to better plan your travel dates.`,
    };
  }

  const readable = pathname
    .split("/")
    .filter(Boolean)
    .map(formatSegment)
    .join(" | ");

  return {
    title: readable ? `${readable} | ${SITE_NAME}` : `${SITE_NAME}`,
    description:
      "Explore destinations, tour styles, travel tips, and booking options for Central Asia and nearby regions.",
  };
};

const getBreadcrumbs = (pathname) => {
  const parts = pathname.split("/").filter(Boolean);

  return parts.map((part, index) => {
    const url = `${SITE_URL}/${parts.slice(0, index + 1).join("/")}`;

    return {
      name: formatSegment(part),
      item: url,
    };
  });
};


export const getSeoData = (pathname) => {
  const normalizedPathname = normalizePathname(pathname);
  const { isRussian, pathname: routePathname } = splitLocalePathname(normalizedPathname);
  const page = {
    ...(routeSeoMap[normalizedPathname] || routeSeoMap[routePathname] || buildFallbackSeo(routePathname)),
    ...(isRussian ? russianSeoOverrides[routePathname] : null),
  };
  const canonical = getCanonicalUrl(normalizedPathname);
  const alternates = getAlternateUrls(normalizedPathname);
  const breadcrumbs = [
    { name: "Home", item: SITE_URL },
    ...getBreadcrumbs(routePathname),
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
  };

  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
    description: "Tour operator for Silk Road & Central Asia tours",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Russian"],
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61572084062845",
      "https://www.instagram.com/gotocentralasia/",
      "https://www.youtube.com/@gotocentralasia",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
    },
  };

  const is10DayTour = page.tour?.slug?.includes("10-day-uzbekistan-relaxed");

  const touristTripSchema = page.tour
    ? {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "@id": `${canonical}#trip`,
        name: isRussian && is10DayTour ? "10-дневный размеренный групповой тур по Узбекистану 2026–2027" : page.tour.h1,
        alternateName: isRussian ? page.tour.h1 : "10-дневный размеренный групповой тур по Узбекистану 2026–2027",
        url: canonical,
        description: page.tour.description,
        touristType: ["Cultural travelers", "Silk Road travelers", "Heritage Enthusiasts"],
        subTrip: is10DayTour
          ? [
              {
                "@type": "TouristTrip",
                name: "Tashkent City Discovery",
                itinerary: {
                  "@type": "ItemList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      item: {
                        "@type": "TouristDestination",
                        name: "Tashkent",
                        address: { "@type": "PostalAddress", addressCountry: "UZ", addressLocality: "Tashkent" },
                      },
                    },
                  ],
                },
              },
              {
                "@type": "TouristTrip",
                name: "Khiva Walled Citadel",
                itinerary: {
                  "@type": "ItemList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 2,
                      item: {
                        "@type": "TouristDestination",
                        name: "Ichan-Kala Khiva",
                        address: { "@type": "PostalAddress", addressCountry: "UZ", addressLocality: "Khiva" },
                      },
                    },
                  ],
                },
              },
              {
                "@type": "TouristTrip",
                name: "Historic Bukhara & Gijduvan Ceramics",
                itinerary: {
                  "@type": "ItemList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 3,
                      item: {
                        "@type": "TouristDestination",
                        name: "Bukhara",
                        address: { "@type": "PostalAddress", addressCountry: "UZ", addressLocality: "Bukhara" },
                      },
                    },
                    {
                      "@type": "ListItem",
                      position: 4,
                      item: {
                        "@type": "TouristDestination",
                        name: "Gijduvan Ceramic Workshop",
                        address: { "@type": "PostalAddress", addressCountry: "UZ", addressLocality: "Gijduvan" },
                      },
                    },
                  ],
                },
              },
              {
                "@type": "TouristTrip",
                name: "Samarkand Timurid Capital",
                itinerary: {
                  "@type": "ItemList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 5,
                      item: {
                        "@type": "TouristDestination",
                        name: "Samarkand",
                        address: { "@type": "PostalAddress", addressCountry: "UZ", addressLocality: "Samarkand" },
                      },
                    },
                  ],
                },
              },
            ]
          : undefined,
        offers: {
          "@type": "Offer",
          "@id": `${canonical}#offer`,
          url: canonical,
          price: page.tour.price || "1150",
          priceCurrency: "USD",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          seller: travelAgencySchema,
        },
        provider: travelAgencySchema,
      }
    : null;

  const productSchema = is10DayTour
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${canonical}#product`,
        name: isRussian
          ? "10-дневный размеренный тур по Узбекистану: Ташкент, Хива, Бухара, Самарканд"
          : "10-Day Uzbekistan Relaxed Group Tour Package (2026–2027)",
        image: `${SITE_URL}/assets/images/10-Places/Registan%20Square%20(Samarkand).jpg`,
        description: isRussian
          ? "Размеренный групповой тур по Узбекистану на 10 дней. Билеты на поезд Афросиаб, отели 4*, русскоязычный гид, мастер-класс в Гиждуване. От $1,150."
          : "Comprehensive, all-inclusive 10-day group tour of Uzbekistan featuring Tashkent, Samarkand, Bukhara, Gijduvan, and Khiva with Afrosiyob rail travel.",
        brand: {
          "@type": "Brand",
          name: SITE_NAME,
        },
        offers: {
          "@type": "Offer",
          price: "1150",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: canonical,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "128",
          bestRating: "5",
          worstRating: "1",
        },
      }
    : null;

  const destinationLandmarkSchema =
    routePathname.includes("samarkand") ||
    routePathname.includes("bukhara") ||
    routePathname.includes("khiva") ||
    routePathname === "/" ||
    routePathname === "/uzbek-tours"
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["TouristDestination", "Place"],
              name: isRussian ? "Площадь Регистан, Самарканд" : "Registan Square",
              alternateName: "Registan Square Samarkand",
              description: isRussian
                ? "Главная площадь Самарканда с тремя величественными медресе: Улугбека, Шердор и Тилля-Кари (ЮНЕСКО)."
                : "The historic heart of Samarkand, consisting of three monumental Islamic madrasahs: Ulugh Beg, Sher-Dor, and Tilya-Kori (UNESCO World Heritage).",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Samarkand",
                addressCountry: "UZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 39.6547,
                longitude: 66.9758,
              },
            },
            {
              "@type": ["TouristDestination", "Place"],
              name: isRussian ? "Ансамбль Пои-Калян, Бухара" : "Poi Kalyan Ensemble",
              alternateName: "Poi Kalyan Complex",
              description: isRussian
                ? "Исторический архитектурный ансамбль Бухары с минаретом Калян XII века, мечетью Калян и медресе Мири Араб."
                : "Historic Islamic architectural ensemble in Bukhara containing the 12th-century Kalyan Minaret, Kalyan Mosque, and Mir-i Arab Madrasah.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bukhara",
                addressCountry: "UZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 39.7758,
                longitude: 64.4158,
              },
            },
            {
              "@type": ["TouristDestination", "Place"],
              name: isRussian ? "Крепость Ичан-Кала, Хива" : "Itchan Kala Fortress",
              alternateName: "Ichan Kala Khiva",
              description: isRussian
                ? "Древняя внутренняя крепость Хивы, музей под открытым небом с минаретом Кальта-Минар и мечетью Джума (ЮНЕСКО)."
                : "Ancient fortified inner citadel of Khiva with over 50 historic monuments and Kalta Minor minaret (UNESCO World Heritage).",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Khiva",
                addressCountry: "UZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 41.3783,
                longitude: 60.3639,
              },
            },
          ],
        }
      : null;

  const faqSchema =
    routePathname === "/" ||
    routePathname === "/uzbek-tours" ||
    is10DayTour ||
    routePathname.includes("tour/")
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: isRussian
            ? [
                {
                  "@type": "Question",
                  name: "Какие нормы провоза багажа действуют в скоростном поезде «Афросиаб»?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "На каждого пассажира поезда «Афросиаб» разрешен бесплатный провоз ручной клади весом до 36 кг и габаритами по сумме трех измерений до 200 см. Специальные полки для чемоданов расположены у входных дверей вагонов и над посадочными местами.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Работают ли российские и международные банковские карты в Узбекистане?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Карты международных платежных систем Visa и Mastercard принимаются во всех крупных отелях, ресторанах и супермаркетах. Для покупок на базарах, в чайханах и мелких лавках требуется наличная национальная валюта (узбекский сум). Рубли, доллары и евро можно обменять в любых отделениях банков.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Нужна ли виза в Узбекистан для граждан России, Беларуси и Казахстана?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Для граждан РФ, Беларуси, Казахстана и большинства стран СНГ действует безвизовый режим на срок до 60 дней. Для въезда необходим только действующий заграничный паспорт.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Какой дресс-код принят для туристов при посещении памятников и святынь?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "В городах Узбекистана принята обычная европейская одежда. При входе в действующие мечети и священные мавзолеи (Шахи-Зинда, Бахауддин Накшбанд) колени и плечи должны быть закрыты как у мужчин, так и у женщин. Женщинам рекомендуется иметь легкий платок на голову.",
                  },
                },
              ]
            : [
                {
                  "@type": "Question",
                  name: "What are the baggage allowances on the Afrosiyob high-speed train?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Passengers traveling on the Afrosiyob bullet train are permitted up to 36 kg (79 lbs) of hand luggage with maximum combined dimensions not exceeding 200 cm (length + width + height). Luggage storage racks are located at the end of each carriage and above your seats.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use international Visa and Mastercard credit cards in Uzbekistan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Visa and Mastercard are accepted at major hotels, fine dining restaurants, and boutique craft shops in Tashkent, Samarkand, and Bukhara. However, bazaars, local teahouses, and small souvenir stalls operate strictly in cash (Uzbek Som - UZS). ATMs dispensing USD and Som are widely available.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do US, UK, EU, or Australian passport holders require a visa for Uzbekistan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Citizens of the UK, EU nations, Australia, Canada, and the UAE can visit Uzbekistan visa-free for up to 30 days. US passport holders can easily obtain an electronic visa (e-Visa) via the official government portal prior to arrival for $20 USD.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the recommended dress code when visiting mosques and active shrines?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Uzbekistan is a secular, welcoming country with relaxed everyday dress standards. However, when entering active mosques, mausoleums, and religious complexes (like Shah-i-Zinda or Hazrati Imam), men should wear pants covering the knees, and women should cover their shoulders, knees, and hair with a lightweight scarf.",
                  },
                },
              ],
        }
      : null;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = breadcrumbs.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      }
    : null;

  return {
    ...page,
    siteName: SITE_NAME,
    canonical,
    alternates,
    locale: isRussian ? "ru_RU" : "en_US",
    htmlLang: isRussian ? "ru" : "en",
    image: page.image || DEFAULT_IMAGE,
    type: page.type || "website",
    robots: routePathname === "/booking-form" || routePathname.startsWith("/weather/")
      ? "noindex,follow"
      : page.robots || "index,follow,max-image-preview:large",
    twitterSite: TWITTER_SITE,
    schemas: [
      organizationSchema,
      websiteSchema,
      routePathname === "/" ? travelAgencySchema : null,
      routePathname === "/" ? localBusinessSchema : null,
      touristTripSchema,
      productSchema,
      destinationLandmarkSchema,
      faqSchema,
      breadcrumbSchema,
    ].filter(Boolean),
  };
};
