import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./EcoTours.module.scss";

const STRAPI_BASE = "https://brilliant-passion-7d3870e44b.strapiapp.com";

export default function EcoTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const makeSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    fetch(`${STRAPI_BASE}/api/asian-tours?locale=${strapiLocale}`)
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));

    fetch(`${STRAPI_BASE}/api/upload/files`)
      .then((res) => res.json())
      .then((data) => setImages(data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  // ✅ Filter tours that have "Eco" in tour_type
  const ecoTours = tours.filter((tour) =>
    tour.tour_type?.toLowerCase().includes("eco")
  );

  // ✅ Separate into group and private eco tours
  const groupEcoTours = ecoTours.filter((tour) =>
    tour.tour_type?.toLowerCase().includes("group")
  );

  const privateEcoTours = ecoTours.filter((tour) =>
    tour.tour_type?.toLowerCase().includes("private")
  );

  // ✅ Strict match: alternativeText must exactly match tour.title
  const findImageForTour = (tour) => {
    if (!images || images.length === 0) return null;

    const title = (tour.title || "").trim().toLowerCase();

    const match = images.find(
      (img) => (img.alternativeText || "").trim().toLowerCase() === title
    );

    if (!match) return null;

    const url =
      match.url ||
      match.formats?.large?.url ||
      match.formats?.medium?.url ||
      match.formats?.thumbnail?.url ||
      null;

    if (!url) return null;

    if (url.startsWith("http")) return url;
    return `${STRAPI_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  // Helper function for rendering cards
  const renderTours = (list) =>
    list.map((tour) => {
      const duration =
        Math.ceil(
          (new Date(tour.endDate) - new Date(tour.startDate)) /
            (1000 * 60 * 60 * 24)
        ) || 0;

      const imageUrl =
        findImageForTour(tour) || "https://via.placeholder.com/400x250";

      return (
        <div
          key={tour.id}
          className={styles.card}
          onClick={() => navigate(`/tour/${makeSlug(tour.title)}`)}
        >
          <div className={styles.imageWrapper}>
            <img src={imageUrl} alt={tour.title} />
            {tour.isNew && <span className={styles.newTag}>NEW</span>}
          </div>

          <div className={styles.cardBody}>
            <div className={styles.tags}>
              <span>ECO ADVENTURE</span>
              <span>Nature, Wildlife & Sustainability</span>
            </div>
            <h3 className={styles.title}>{tour.title}</h3>
            <p className={styles.location}>{tour.location}</p>
            <p className={styles.details}>
              {duration} days • Level {tour.level || 1}-{tour.level || 4} •{" "}
              {tour.hotelType || "Eco Lodges"}
            </p>
            <p className={styles.price}>From ${tour.price}/person</p>
          </div>

          <div className={styles.quickLook}>Quick Look</div>
        </div>
      );
    });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.header}>
          <h1>Eco Tours</h1>
          <p>
            Reconnect with nature through sustainable eco tours. Explore
            breathtaking landscapes, support local communities, and travel with
            an eco-conscious mindset.
          </p>
          <div className={styles.filters}>
            <button>Destinations</button>
            <button>Dates</button>
            <button>Travelers</button>
            <button className={styles.moreFilters}>More Filters</button>
          </div>
          <div className={styles.resultsCount}>{ecoTours.length} Trips</div>
        </div>

        {/* Group Eco Tours */}
        {groupEcoTours.length > 0 && (
          <>
            <h2 className={styles.sectionTitle}>Group Eco Tours</h2>
            <div className={styles.toursGrid}>{renderTours(groupEcoTours)}</div>
          </>
        )}

        {/* Private Eco Tours */}
        {privateEcoTours.length > 0 && (
          <>
            <h2 className={styles.sectionTitle}>Private Eco Tours</h2>
            <div className={styles.toursGrid}>
              {renderTours(privateEcoTours)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
