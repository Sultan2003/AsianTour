import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./AttractionDetails.module.scss";

const STRAPI_URL = "https://brilliant-passion-7d3870e44b.strapiapp.com";

export default function AttractionDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const lang = localStorage.getItem("lang") || "en";
  const strapiLocale = lang === "ru" ? "ru-RU" : "en";

  const [attraction, setAttraction] = useState(null);
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);

  const makeSlug = (title) =>
    title
      ?.toLowerCase()
      ?.replace(/[^a-z0-9]+/g, "-")
      ?.replace(/^-+|-+$/g, "");

  const getImageUrl = (image) => {
    if (!image?.url) return "";
    if (image.url.startsWith("http://") || image.url.startsWith("https://")) {
      return image.url;
    }
    return `${STRAPI_URL}${image.url}`;
  };

  useEffect(() => {
    fetch(
      `${STRAPI_URL}/api/attractions?locale=${strapiLocale}&filters[slug][$eq]=${slug}&populate[heroImage]=true&populate[contentBlocks][populate][image]=true`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        setAttraction(data.data?.[0] || null);
      });
  }, [slug, strapiLocale]);

  useEffect(() => {
    fetch(
      `${STRAPI_URL}/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Uzbekistan`
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredTours = (data.data || []).filter(
          (tour) =>
            tour.tour_type?.includes("Group") &&
            !tour.tour_type?.includes("City Tour")
        );
        setTours(filteredTours.slice(0, 3));
      })
      .catch(console.error);
  }, [strapiLocale]);

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/upload/files`)
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch(console.error);
  }, []);

  const getTourImage = (tour) => {
    const match = images.find((img) => img.alternativeText === tour.title);
    if (!match?.url) return "https://via.placeholder.com/400x250";
    return getImageUrl(match);
  };

  if (!attraction) {
    return <div className={styles.loading}>Loading…</div>;
  }

  return (
    <div className={styles.container}>
      {/* ── Left column ── */}
      <div className={styles.left}>
        {/* Hero */}
        <div className={styles.heroWrap}>
          {attraction.heroImage?.url && (
            <img
              src={getImageUrl(attraction.heroImage)}
              alt={attraction.title}
              className={styles.heroImage}
            />
          )}
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>{attraction.title}</h1>
          </div>
        </div>

        {/* Short description */}
        {attraction.shortDescription && (
          <div
            className={styles.shortDescription}
            dangerouslySetInnerHTML={{ __html: attraction.shortDescription }}
          />
        )}

        {/* Content blocks */}
        {attraction.contentBlocks?.map((block) => (
          <section key={block.id} className={styles.section}>
            {block.title && <h3>{block.title}</h3>}

            {block.image?.url && (
              <img
                src={getImageUrl(block.image)}
                alt={block.title}
                className={styles.singleImage}
              />
            )}

            {block.content && (
              <div className={styles.content}>
                {Array.isArray(block.content)
                  ? block.content.map((item, idx) => (
                      <p key={idx}>
                        {item.children?.map((child) => child.text || "").join("")}
                      </p>
                    ))
                  : block.content}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* ── Right sidebar ── */}
      <div className={styles.right}>
        <p className={styles.sidebarLabel}>Related Tours</p>

        {tours.map((tour) => (
          <div
            key={tour.id}
            className={styles.tourCard}
            onClick={() => navigate(`/tour/${makeSlug(tour.title)}`)}
          >
            <img
              src={getTourImage(tour)}
              alt={tour.title}
              className={styles.tourImage}
            />

            <div className={styles.tourInfo}>
              <h3>{tour.title}</h3>

              <div className={styles.tourMeta}>
                <span className={styles.tourDate}>
                  {tour.startDate &&
                    new Date(tour.startDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                </span>
                <span className={styles.price}>
                  from ${tour.price || "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
