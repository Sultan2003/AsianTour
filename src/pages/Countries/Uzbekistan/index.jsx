import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import styles from "./Uzbekistan.module.scss";
import mainImg from "../../../assets/Countries/uzb.jpg";
import translateTourTitle from "../../../utils/tourTitleTranslations";

const STRAPI_BASE = "https://brilliant-passion-7d3870e44b.strapiapp.com";

const translations = {
  en: {
    upcomingDepartures: "Upcoming Group Departures",
    date: "Date",
    status: "Status",
    days: "Days",
    price: "Price",
    noUpcoming: "No upcoming departures found.",
    seatsAvailable: "seats available",
    available: "Available",
    unavailable: "Unavailable",
    toursTitle: "Uzbekistan Tours",
    dayLabel: "Days",
    group: "Group",
    seats: "seats",
    details: "Details",
    description:
      "Visit Uzbekistan and discover stunning medieval cities with tall minarets reaching into the sky. See local pilgrims in bright robes and experience the lively atmosphere of bustling bazaars.",
    groupTours: "Uzbekistan Group Tours",
    tourSuffix: "Tours",
    noTours: "No tours",
    categories: {
      Cultural: "Cultural",
      Gastronomy: "Gastronomy",
      Religious: "Religious",
      Eco: "Eco",
      City: "City",
      Business: "Business",
    },
  },
  ru: {
    upcomingDepartures: "Ближайшие групповые выезды",
    date: "Дата",
    status: "Статус",
    days: "Дни",
    price: "Цена",
    noUpcoming: "Ближайшие выезды не найдены.",
    seatsAvailable: "мест доступно",
    available: "Доступно",
    unavailable: "Недоступно",
    toursTitle: "Туры по Узбекистану",
    dayLabel: "Дней",
    group: "Группа",
    seats: "мест",
    details: "Подробнее",
    description:
      "Посетите Узбекистан и откройте для себя великолепные средневековые города с высокими минаретами, устремлёнными в небо. Увидьте местных паломников в ярких одеждах и почувствуйте живую атмосферу шумных базаров.",
    groupTours: "Групповые туры по Узбекистану",
    tourSuffix: "туры",
    noTours: "Туров нет",
    categories: {
      Cultural: "Культурные",
      Gastronomy: "Гастрономические",
      Religious: "Религиозные",
      Eco: "Эко",
      City: "Городские",
      Business: "Бизнес",
    },
  },
};

export default function UzbekistanTours() {
  const ctx = useContext(LanguageContext) || {};
  const strapiLocale = ctx.strapiLocale || ctx.lang || "";
  const langKey = strapiLocale.startsWith("ru") ? "ru" : "en";
  const t = translations[langKey];
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [openCats, setOpenCats] = useState({}); // accordion state
  const makeSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // helper: extract plain text from Strapi rich text blocks
  const extractPlainText = (desc) => {
    if (!desc) return "";
    if (typeof desc === "string") return desc;
    if (Array.isArray(desc)) {
      return desc
        .map((block) =>
          block.children
            ? block.children.map((c) => c.text || "").join("")
            : "",
        )
        .join(" ");
    }
    if (typeof desc === "object") {
      return Object.values(desc)
        .map((v) => (typeof v === "string" ? v : ""))
        .join(" ");
    }
    return "";
  };

  // normalize tour item (handles top-level or attributes shape)
  const normalizeTour = (rawItem) => {
    const raw = rawItem.attributes ? rawItem.attributes : rawItem;

    return {
      id: rawItem.id || raw.id || Math.random().toString(36).slice(2),
      documentId:
        raw.documentId || rawItem.documentId || raw.slug || rawItem.id,
      title: raw.title || raw.name || rawItem.title || rawItem.name || "",
      price: raw.price ?? raw.pricePerPerson ?? rawItem.price ?? 0,
      startDate:
        raw.startDate ||
        raw.start_date ||
        raw.date ||
        rawItem.startDate ||
        rawItem.start_date ||
        null,
      endDate:
        raw.endDate ||
        raw.end_date ||
        rawItem.endDate ||
        rawItem.end_date ||
        null,
      availableSeats:
        raw.availableSeats ??
        raw.available_seats ??
        raw.available ??
        rawItem.availableSeats ??
        rawItem.available ??
        0,

      location: raw.location || raw.place || rawItem.location || "",
      daysdescription: raw.daysdescription || rawItem.daysdescription || "",
      description: extractPlainText(raw.description) || raw.description || "",
      // tour_type may be top-level or inside attributes — try both
      tour_type:
        (raw.tour_type ?? raw.tourType ?? raw.type) ||
        rawItem.tour_type ||
        rawItem.tourType ||
        "",
      isBestseller: raw.isBestseller || raw.bestseller || false,
      image: raw.image || raw.cover || null,
    };
  };

  // fetch tours (Uzbekistan, only Group tours)
  useEffect(() => {
    const url = strapiLocale
      ? `${STRAPI_BASE}/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Uzbekistan`
      : `${STRAPI_BASE}/api/asian-tours?filters[location][$eq]=Uzbekistan`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const list = (data && data.data) || [];
        const normalized = list.map((it) => normalizeTour(it));

        // ✅ Keep only Uzbekistan + Group tours
        setTours(
          normalized.filter(
            (t) =>
              ["uzbekistan", "узбекистан"].some((location) =>
                (t.location || "").toLowerCase().includes(location),
              ) &&
              ["group", "груп"].some((type) =>
                (t.tour_type || "").toString().toLowerCase().includes(type),
              ),
          ),
        );
      })
      .catch((err) => {
        console.error("Failed to load tours:", err);
        setTours([]);
      });
  }, [strapiLocale]);

  // fetch images (upload/files)
  useEffect(() => {
    fetch(`${STRAPI_BASE}/api/upload/files`)
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        const normalized = arr.map((img) => {
          const rawUrl =
            img.url ||
            img.formats?.thumbnail?.url ||
            img.formats?.small?.url ||
            "";
          const fullUrl =
            rawUrl.indexOf("http") === 0 ? rawUrl : `${STRAPI_BASE}${rawUrl}`;
          return { ...img, fullUrl };
        });
        setImages(normalized);
      })
      .catch((err) => {
        console.error("Failed to load images:", err);
        setImages([]);
      });
  }, []);

  useEffect(() => {
    const url = `${STRAPI_BASE}/api/attractions?filters[country][$eqi]=Uzbekistan&fields[0]=title&fields[1]=slug&sort=title:asc&pagination[pageSize]=50`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const items = (data?.data || []).map((item) => {
          const raw = item?.attributes || item;
          return {
            id: item?.id || raw?.id || Math.random().toString(36).slice(2),
            title: raw?.title || "",
            slug: raw?.slug || "",
          };
        });
        setAttractions(items.filter((item) => item.slug));
      })
      .catch(() => setAttractions([]));
  }, []);

  // find image by alternativeText === tour.title (case-insensitive)
  const getImageForTitle = (title) => {
    if (!title || images.length === 0) return null;
    const t = title.trim().toLowerCase();
    const found =
      images.find(
        (img) => (img.alternativeText || "").trim().toLowerCase() === t,
      ) ||
      images.find((img) => (img.name || "").trim().toLowerCase().includes(t));
    return found ? found.fullUrl : null;
  };

  const imageOrPlaceholder = (title) =>
    getImageForTitle(title) ||
    `https://via.placeholder.com/400x400?text=${encodeURIComponent(
      (title || "No Image").slice(0, 24),
    )}`;

  const calcDays = (start, end) => {
    if (!start || !end) return 1;
    try {
      const s = new Date(start);
      const e = new Date(end);
      const days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 1;
    } catch {
      return 1;
    }
  };

  // === LEFT SIDE: skip "City" tours ===
  const now = new Date();

  // remove city tours for left-side lists
  const toursWithoutCity = tours.filter(
    (t) => !(t.tour_type || "").toString().toLowerCase().includes("city"),
  );

  // UPCOMING: closest 3 tours by startDate
  const withDates = toursWithoutCity.filter((t) => t.startDate);
  const futureSorted = withDates
    .filter((t) => new Date(t.startDate) >= now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const pastSorted = withDates
    .filter((t) => new Date(t.startDate) < now)
    .sort(
      (a, b) =>
        Math.abs(new Date(a.startDate) - now) -
        Math.abs(new Date(b.startDate) - now),
    );
  const upcomingTours = futureSorted.concat(pastSorted).slice(0, 3);

  // TOP 10 by availableSeats (exclude city tours)
  const top10BySeats = [...toursWithoutCity]
    .sort((a, b) => (b.availableSeats || 0) - (a.availableSeats || 0))
    .slice(0, 10);

  // === RIGHT SIDE: categories (only Group tours) ===
  const categories = {
    Cultural: [],
    Gastronomy: [],
    Religious: [],
    Eco: [],
    City: [],
    Business: [],
  };

  tours.forEach((t) => {
    const ttype = (t.tour_type || "").toString().toLowerCase();
    const pushIf = (cat) => categories[cat].push(t);

    if (
      ttype.includes("cultural") ||
      ttype.includes("culture") ||
      ttype.includes("heritage") ||
      ttype.includes("культур")
    )
      pushIf("Cultural");

    if (
      ttype.includes("gastronomy") ||
      ttype.includes("food") ||
      ttype.includes("culinary") ||
      ttype.includes("гастроном") ||
      ttype.includes("кулинар")
    )
      pushIf("Gastronomy");

    if (
      ttype.includes("relig") ||
      ttype.includes("pilgrim") ||
      ttype.includes("mosque") ||
      ttype.includes("temple") ||
      ttype.includes("религи") ||
      ttype.includes("палом") ||
      ttype.includes("мечет") ||
      ttype.includes("храм")
    )
      pushIf("Religious");

    if (ttype.includes("eco") || ttype.includes("nature") || ttype.includes("эко") || ttype.includes("природ")) pushIf("Eco");

    if (ttype.includes("city") || ttype.includes("urban") || ttype.includes("город")) pushIf("City");

    if (
      ttype.includes("business") ||
      ttype.includes("mice") ||
      ttype.includes("conference") ||
      ttype.includes("бизнес") ||
      ttype.includes("конферен")
    )
      pushIf("Business");
  });

  // ensure unique items in each category
  Object.keys(categories).forEach((k) => {
    const map = {};
    categories[k] = categories[k].filter((t) => {
      if (map[t.id]) return false;
      map[t.id] = true;
      return true;
    });
  });

  const toggleCategory = (cat) =>
    setOpenCats((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* LEFT - main content */}
          <div className={styles.tours}>
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Uzbekistan" />
            </div>

            {/* UPCOMING */}
            <h2>{t.upcomingDepartures}</h2>
            <div className={styles.cardsHeader}>
              <div>{t.date}</div>
              <div></div>
              <div>{t.status}</div>
              <div>{t.days}</div>
              <div>{t.price}</div>
            </div>

            {upcomingTours.length === 0 && (
              <p className={styles.noUpcoming}>{t.noUpcoming}</p>
            )}

            {upcomingTours.map((tour) => (
              <div
                key={tour.id}
                className={styles.tourCard}
                onClick={() => navigate(`/tour/${makeSlug(tour.title)}`)}
              >
                <div className={styles.dateBox}>
                  {tour.startDate
                    ? new Date(tour.startDate).toLocaleDateString()
                    : "-"}
                </div>

                <div className={styles.tourInfo}>
                  <a className={styles.title}>{translateTourTitle(tour.title, typeof strapiLocale !== "undefined" ? strapiLocale : (typeof lang !== "undefined" ? lang : undefined))}</a>
                  <p className={styles.cities}>{tour.location}</p>
                  <a className={styles.departures}>
                    {tour.availableSeats} {t.seatsAvailable}
                  </a>
                </div>

                <div
                  className={
                    tour.availableSeats > 0
                      ? styles.available
                      : styles.unavailable
                  }
                >
                  {tour.availableSeats > 0 ? t.available : t.unavailable}
                </div>

                <div>{calcDays(tour.startDate, tour.endDate)} {t.days}</div>

                <div>US$ {tour.price}</div>
              </div>
            ))}

            {/* TOP 10 */}
            <h2 className={styles.sectionTitle}>{t.toursTitle}</h2>

            <div className={styles.topGrid}>
              {top10BySeats.map((tour) => (
                <div
                  key={tour.id}
                  className={styles.bigTourCard}
                  onClick={() => navigate(`/tour/${makeSlug(tour.title)}`)}
                >
                  <div className={styles.bigImg}>
                    <img
                      src={imageOrPlaceholder(tour.title)}
                      alt={translateTourTitle(tour.title, typeof strapiLocale !== "undefined" ? strapiLocale : (typeof lang !== "undefined" ? lang : undefined))}
                    />
                  </div>

                  <div className={styles.bigInfo}>
                    <h3 className={styles.bigTitle}>{translateTourTitle(tour.title, typeof strapiLocale !== "undefined" ? strapiLocale : (typeof lang !== "undefined" ? lang : undefined))}</h3>
                    <p className={styles.summary}>
                      {(
                        (tour.description || "") +
                        " " +
                        (tour.daysdescription || "")
                      ).slice(0, 160)}
                      {((tour.description || "") + (tour.daysdescription || ""))
                        .length > 160
                        ? "..."
                        : ""}
                    </p>

                    <div className={styles.metaRow}>
                      <span>{calcDays(tour.startDate, tour.endDate)} {t.dayLabel}</span>
                      <span className={styles.dot}>•</span>
                      <span>{t.group}</span>
                      <span className={styles.dot}>•</span>
                      <span>{tour.availableSeats} {t.seats}</span>
                    </div>

                    <div className={styles.bottomRow}>
                      <div className={styles.price}>US$ {tour.price}</div>
                      <button className={styles.detailsBtn}>{t.details}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.description}>
              {t.description}
            </p>
          </div>

          {/* RIGHT - sidebar categories */}
          <aside className={styles.sidebar}>
            <h3>{t.groupTours}</h3>

            {Object.keys(categories).map((cat) => {
              const items = categories[cat] || [];
              const isOpen = !!openCats[cat];
              return (
                <div
                  key={cat}
                  className={`${styles.catBlock} ${isOpen ? styles.open : ""}`}
                >
                  <div
                    className={styles.catTitle}
                    onClick={() => toggleCategory(cat)}
                  >
                    <span>{t.categories[cat]} {t.tourSuffix}</span>
                    <div className={styles.catMeta}>
                      <span className={styles.count}>({items.length})</span>
                      <span className={styles.chev}>{isOpen ? "▾" : "▸"}</span>
                    </div>
                  </div>

                  <ul className={styles.catList}>
                    {items.length === 0 && (
                      <li className={styles.catEmpty}>{t.noTours}</li>
                    )}
                    {items.slice(0, 8).map((t) => (
                      <li
                        key={t.id}
                        className={styles.catItem}
                        onClick={() => navigate(`/tour/${makeSlug(t.title)}`)}
                      >
                        {t.title}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </aside>
        </div>
      </div>
    </div>
  );
}
