import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import styles from "./centralasia.module.scss";
import mainImg from "../../../assets/Countries/centralasia.webp";

const STRAPI_BASE = "https://brilliant-passion-7d3870e44b.strapiapp.com";

export default function CentralAsiaTours() {
  const ctx = useContext(LanguageContext) || {};
  const strapiLocale = ctx.strapiLocale || ctx.lang || "";
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const [openCats, setOpenCats] = useState({});

  const extractPlainText = (desc) => {
    if (!desc) return "";
    if (typeof desc === "string") return desc;
    if (Array.isArray(desc)) {
      return desc
        .map((block) =>
          block.children ? block.children.map((c) => c.text || "").join("") : ""
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
      tour_type:
        (raw.tour_type ?? raw.tourType ?? raw.type) ||
        rawItem.tour_type ||
        rawItem.tourType ||
        "",
      isBestseller: raw.isBestseller || raw.bestseller || false,
      image: raw.image || raw.cover || null,
    };
  };

  // fetch tours (Central Asia only)
  useEffect(() => {
    const url = strapiLocale
      ? `${STRAPI_BASE}/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Central Asia`
      : `${STRAPI_BASE}/api/asian-tours?filters[location][$eq]=Central Asia`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const list = (data && data.data) || [];
        const normalized = list.map((it) => normalizeTour(it));
        setTours(
          normalized.filter(
            (t) =>
              (t.location || "").toLowerCase().includes("central asia") &&
              (t.tour_type || "").toString().toLowerCase().includes("group")
          )
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

  const getImageForTitle = (title) => {
    if (!title || images.length === 0) return null;
    const t = title.trim().toLowerCase();
    const found =
      images.find(
        (img) => (img.alternativeText || "").trim().toLowerCase() === t
      ) ||
      images.find((img) => (img.name || "").trim().toLowerCase().includes(t));
    return found ? found.fullUrl : null;
  };

  const imageOrPlaceholder = (title) =>
    getImageForTitle(title) ||
    `https://via.placeholder.com/400x400?text=${encodeURIComponent(
      (title || "No Image").slice(0, 24)
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

  const now = new Date();
  const toursWithoutCity = tours.filter(
    (t) => !(t.tour_type || "").toString().toLowerCase().includes("city")
  );
  const withDates = toursWithoutCity.filter((t) => t.startDate);
  const futureSorted = withDates
    .filter((t) => new Date(t.startDate) >= now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const pastSorted = withDates
    .filter((t) => new Date(t.startDate) < now)
    .sort(
      (a, b) =>
        Math.abs(new Date(a.startDate) - now) -
        Math.abs(new Date(b.startDate) - now)
    );
  const upcomingTours = futureSorted.concat(pastSorted).slice(0, 3);

  const top10BySeats = [...toursWithoutCity]
    .sort((a, b) => (b.availableSeats || 0) - (a.availableSeats || 0))
    .slice(0, 10);

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
      ttype.includes("heritage")
    )
      pushIf("Cultural");

    if (
      ttype.includes("gastronomy") ||
      ttype.includes("food") ||
      ttype.includes("culinary")
    )
      pushIf("Gastronomy");

    if (
      ttype.includes("relig") ||
      ttype.includes("pilgrim") ||
      ttype.includes("mosque") ||
      ttype.includes("temple")
    )
      pushIf("Religious");

    if (ttype.includes("eco") || ttype.includes("nature")) pushIf("Eco");

    if (ttype.includes("city") || ttype.includes("urban")) pushIf("City");

    if (
      ttype.includes("business") ||
      ttype.includes("mice") ||
      ttype.includes("conference")
    )
      pushIf("Business");
  });

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
          <div className={styles.tours}>
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Central Asia" />
            </div>

            <h2>Upcoming Group Departures</h2>
            <div className={styles.cardsHeader}>
              <div>Date</div>
              <div></div>
              <div>Status</div>
              <div>Days</div>
              <div>Price</div>
            </div>

            {upcomingTours.length === 0 && (
              <p className={styles.noUpcoming}>No upcoming departures found.</p>
            )}

            {upcomingTours.map((tour) => (
              <div
                key={tour.id}
                className={styles.tourCard}
                onClick={() => navigate(`/tour/${tour.documentId}`)}
              >
                <div className={styles.dateBox}>
                  {tour.startDate
                    ? new Date(tour.startDate).toLocaleDateString()
                    : "-"}
                </div>

                <div className={styles.tourInfo}>
                  <a className={styles.title}>{tour.title}</a>
                  <p className={styles.cities}>{tour.location}</p>
                  <a className={styles.departures}>
                    {tour.availableSeats} seats available
                  </a>
                </div>

                <div
                  className={
                    tour.availableSeats > 0
                      ? styles.available
                      : styles.unavailable
                  }
                >
                  {tour.availableSeats > 0 ? "Available" : "Unavailable"}
                </div>

                <div>{calcDays(tour.startDate, tour.endDate)} days</div>
                <div>US$ {tour.price}</div>
              </div>
            ))}

            <h2 className={styles.sectionTitle}>Central Asia Tours</h2>

            <div className={styles.topGrid}>
              {top10BySeats.map((tour) => (
                <div
                  key={tour.id}
                  className={styles.bigTourCard}
                  onClick={() => navigate(`/tour/${tour.documentId}`)}
                >
                  <div className={styles.bigImg}>
                    <img
                      src={imageOrPlaceholder(tour.title)}
                      alt={tour.title}
                    />
                  </div>

                  <div className={styles.bigInfo}>
                    <h3 className={styles.bigTitle}>{tour.title}</h3>
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
                      <span>{calcDays(tour.startDate, tour.endDate)} Days</span>
                      <span className={styles.dot}>•</span>
                      <span>Group</span>
                      <span className={styles.dot}>•</span>
                      <span>{tour.availableSeats} seats</span>
                    </div>

                    <div className={styles.bottomRow}>
                      <div className={styles.price}>US$ {tour.price}</div>
                      <button className={styles.detailsBtn}>Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.description}>
              Explore the Silk Road through Central Asia: Uzbekistan’s ancient
              cities, Kazakhstan’s vast steppes, Kyrgyzstan’s mountain lakes,
              Tajikistan’s highlands, and Turkmenistan’s desert marvels await
              you. Discover breathtaking landscapes, deep history, and warm
              nomadic hospitality.
            </p>
          </div>

          <aside className={styles.sidebar}>
            <h3>Central Asia Group Tours</h3>
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
                    <span>{cat} Tours</span>
                    <div className={styles.catMeta}>
                      <span className={styles.count}>({items.length})</span>
                      <span className={styles.chev}>{isOpen ? "▾" : "▸"}</span>
                    </div>
                  </div>

                  <ul className={styles.catList}>
                    {items.length === 0 && (
                      <li className={styles.catEmpty}>No tours</li>
                    )}
                    {items.slice(0, 8).map((t) => (
                      <li
                        key={t.id}
                        className={styles.catItem}
                        onClick={() => navigate(`/tour/${t.documentId}`)}
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
