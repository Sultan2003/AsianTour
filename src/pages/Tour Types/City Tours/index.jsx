import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./CityTours.module.scss";

const STRAPI_BASE = "https://brilliant-passion-7d3870e44b.strapiapp.com";

export default function CityTours() {
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

  // ✅ Filter tours that have "City" in tour_type
  const cityTours = tours.filter((tour) =>
    tour.tour_type?.toLowerCase().includes("city")
  );

  // ✅ Separate into group and private city tours
  const groupCityTours = cityTours.filter((tour) =>
    tour.tour_type?.toLowerCase().includes("group")
  );

  const privateCityTours = cityTours.filter((tour) =>
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
              <span>CITY EXPLORATION</span>
              <span>Culture, History & Local Life</span>
            </div>
            <h3 className={styles.title}>{tour.title}</h3>
            <p className={styles.location}>{tour.location}</p>
            <p className={styles.details}>
              {duration} days • Level {tour.level || 1}-{tour.level || 4} •{" "}
              {tour.hotelType || "Comfort Hotels"}
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
          <h1>City Tours</h1>
          <p>
            Discover the essence of each destination through our immersive city
            tours. Experience local culture, iconic landmarks, and vibrant urban
            life with expert guides.
          </p>
          <div className={styles.filters}>
            <button>Destinations</button>
            <button>Dates</button>
            <button>Travelers</button>
            <button className={styles.moreFilters}>More Filters</button>
          </div>
          <div className={styles.resultsCount}>{cityTours.length} Trips</div>
        </div>

        {/* Group City Tours */}
        {groupCityTours.length > 0 && (
          <>
            <h2 className={styles.sectionTitle}>Group City Tours</h2>
            <div className={styles.toursGrid}>
              {renderTours(groupCityTours)}
            </div>
          </>
        )}

        {/* Private City Tours */}
        {privateCityTours.length > 0 && (
          <>
            <h2 className={styles.sectionTitle}>Private City Tours</h2>
            <div className={styles.toursGrid}>
              {renderTours(privateCityTours)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
