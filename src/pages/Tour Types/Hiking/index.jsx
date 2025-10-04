import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./Hiking.module.scss";

export default function HikingTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // ✅ Fetch hiking tours
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[tour_type][$eqi]=hiking`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));

    // ✅ Fetch all media (images)
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.header}>
          <h1>Hiking & Walking Tours</h1>
          <p>
            We’ve been exploring the world’s wild trails and ancient footpaths
            for more than three decades, crafting each hiking adventure to offer
            an unfiltered connection to the cultures and landscapes of your
            destination.
          </p>
          <div className={styles.filters}>
            <button>Destinations</button>
            <button>Dates</button>
            <button>Travelers</button>
            <button className={styles.moreFilters}>More Filters</button>
          </div>
          <div className={styles.resultsCount}>{tours.length} Trips</div>
        </div>

        {/* Tour Cards */}
        <div className={styles.toursGrid}>
          {tours.map((tour) => {
            const duration =
              Math.ceil(
                (new Date(tour.endDate) - new Date(tour.startDate)) /
                  (1000 * 60 * 60 * 24)
              ) || 0;

            // ✅ Match image by alternativeText === tour.title
            const tourImages = images.filter(
              (img) => img.alternativeText === tour.title
            );
            const imageUrl = tourImages.length
              ? tourImages[0].url
              : "https://via.placeholder.com/400x250";

            return (
              <div
                key={tour.id}
                className={styles.card}
                onClick={() => navigate(`/tour/${tour.documentId}`)}
              >
                {/* Cover Image */}
                <div className={styles.imageWrapper}>
                  <img src={imageUrl} alt={tour.title} />
                  {tour.isNew && <span className={styles.newTag}>NEW</span>}
                </div>

                {/* Card Content */}
                <div className={styles.cardBody}>
                  <div className={styles.tags}>
                    <span>HIKING & WALKING</span>
                    <span>Couples, Friends & Solos</span>
                  </div>
                  <h3 className={styles.title}>{tour.title}</h3>
                  <p className={styles.location}>{tour.location}</p>
                  <p className={styles.details}>
                    {duration} days • Level {tour.level || 1}-{tour.level || 4}{" "}
                    • {tour.hotelType || "Casual Hotels"}
                  </p>
                  <p className={styles.price}>From ${tour.price}/person</p>
                </div>

                <div className={styles.quickLook}>Quick Look</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
