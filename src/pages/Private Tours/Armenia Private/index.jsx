import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import styles from "./ArmeniaPrivate.module.scss";
import mainImg from "../../../assets/Countries/armenia.jpg";

const STRAPI_BASE = "https://brilliant-passion-7d3870e44b.strapiapp.com";

export default function ArmeniaPrivateTours() {
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
      title: raw.title || raw.name || "",
      price: raw.price ?? raw.pricePerPerson ?? 0,
      startDate: raw.startDate || raw.start_date || null,
      endDate: raw.endDate || raw.end_date || null,
      availableSeats: raw.availableSeats ?? raw.available_seats ?? 0,
      location: raw.location || "",
      daysdescription: raw.daysdescription || "",
      description: extractPlainText(raw.description) || "",
      tour_type:
        raw.tour_type ||
        raw.tourType ||
        raw.type ||
        rawItem.tour_type ||
        rawItem.tourType ||
        "",
      isBestseller: raw.isBestseller || false,
      image: raw.image || null,
    };
  };

  useEffect(() => {
    const url = strapiLocale
      ? `${STRAPI_BASE}/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Armenia`
      : `${STRAPI_BASE}/api/asian-tours?filters[location][$eq]=Armenia`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const list = (data && data.data) || [];
        const normalized = list.map((it) => normalizeTour(it));
        setTours(
          normalized.filter(
            (t) =>
              (t.location || "").toLowerCase().includes("armenia") &&
              (t.tour_type || "").toString().toLowerCase().includes("private")
          )
        );
      })
      .catch(() => setTours([]));
  }, [strapiLocale]);

  useEffect(() => {
    fetch(`${STRAPI_BASE}/api/upload/files`)
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setImages(
          arr.map((img) => {
            const rawUrl =
              img.url ||
              img.formats?.thumbnail?.url ||
              img.formats?.small?.url ||
              "";
            const fullUrl =
              rawUrl.indexOf("http") === 0 ? rawUrl : `${STRAPI_BASE}${rawUrl}`;
            return { ...img, fullUrl };
          })
        );
      })
      .catch(() => setImages([]));
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
  const withDates = tours.filter((t) => t.startDate);
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

  const top10BySeats = [...tours]
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
    if (ttype.includes("cultural")) categories.Cultural.push(t);
    if (ttype.includes("gastronomy") || ttype.includes("food"))
      categories.Gastronomy.push(t);
    if (ttype.includes("relig")) categories.Religious.push(t);
    if (ttype.includes("eco") || ttype.includes("nature"))
      categories.Eco.push(t);
    if (ttype.includes("city")) categories.City.push(t);
    if (ttype.includes("business")) categories.Business.push(t);
  });

  const toggleCategory = (cat) =>
    setOpenCats((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* LEFT */}
          <div className={styles.tours}>
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Armenia" />
            </div>

            <h2>Upcoming Private Departures</h2>
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

            <h2 className={styles.sectionTitle}>Armenia Private Tours</h2>
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
                      ...
                    </p>
                    <div className={styles.metaRow}>
                      <span>{calcDays(tour.startDate, tour.endDate)} Days</span>
                      <span className={styles.dot}>•</span>
                      <span>Private</span>
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
              Discover Armenia privately — explore ancient monasteries, the
              beauty of Lake Sevan, and the hospitality of Yerevan.
            </p>
          </div>

          {/* RIGHT */}
          <aside className={styles.sidebar}>
            <h3>Armenia Private Tours</h3>
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
