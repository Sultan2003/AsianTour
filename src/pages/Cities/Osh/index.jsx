import { useEffect, useState } from "react";
import styles from "./Osh.module.scss";
import OshHero from "../../../assets/Cities/Osh/Osh.jpg";
import { useNavigate } from "react-router-dom";

/* Jayma Bazaar */
import jayma1 from "../../../assets/Cities/Osh/Jayma Bazaar 1.jpg";
import jayma2 from "../../../assets/Cities/Osh/Jayma Bazaar 2.jpg";
import jayma3 from "../../../assets/Cities/Osh/Jayma Bazaar 3.jpg";

/* Osh National Museum */
import museum1 from "../../../assets/Cities/Osh/Osh National Historical and Archaeological Museum Complex.png";

/* Osh City */
import osh1 from "../../../assets/Cities/Osh/Osh.jpg";

/* Sulayman-Too */
import sul1 from "../../../assets/Cities/Osh/Sulayman-Too Sacred Mountain.jpg";

/* Yurt */
import yurt1 from "../../../assets/Cities/Osh/yurt.jpg";

export default function OshPage() {
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const makeSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  /* Fetch Tours */
  useEffect(() => {
    fetch(
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Kyrgyzstan"
    )
      .then((r) => r.json())
      .then((d) => setTours(d.data || []));
  }, []);

  /* Fetch Uploaded Images */
  useEffect(() => {
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((r) => r.json())
      .then((d) => setImages(d));
  }, []);

  const getTourImage = (tour) => {
    const match = images.filter((img) => img.alternativeText === tour.title);
    return match[0]?.url || "https://via.placeholder.com/400x400";
  };

  const oshTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("osh")
  );

  /* Sections */
  const sections = [
    {
      key: "history",
      title: "Osh – The Southern Capital of Kyrgyzstan",
      paragraphs: [
        "Osh is one of the oldest cities in Central Asia, often called the Southern Capital of Kyrgyzstan.",
        "Located in the fertile Fergana Valley, it has been a major trading center on the Silk Road for more than 3,000 years.",
        "The city’s life revolves around a mix of ancient traditions, vibrant bazaars, and a strong multicultural atmosphere shaped by Kyrgyz, Uzbek, Tajik, and other communities.",
      ],
      images: [osh1],
    },

    {
      key: "sulayman",
      title: "Sulayman-Too Sacred Mountain (UNESCO)",
      paragraphs: [
        "The main symbol of Osh and one of the most sacred mountains in Central Asia.",
        "Visitors climb to the top for panoramic views of the city and explore ancient shrines, caves, and the small historical museum built inside the mountain.",
      ],
      images: [sul1],
    },

    {
      key: "jayma",
      title: "Jayma Bazaar",
      paragraphs: [
        "One of the oldest Silk Road bazaars, famous for its lively atmosphere.",
        "Travelers come here to see traditional trade culture and buy spices, dried fruits, fabrics, handicrafts, and local food.",
      ],
      images: [jayma1, jayma2, jayma3],
    },

    {
      key: "museum",
      title: "Osh National Historical & Archaeological Museum",
      paragraphs: [
        "Located at the base of Sulayman-Too, this museum shows thousands of years of Osh’s history.",
        "It includes artifacts from ancient settlements, nomadic traditions, and Islamic culture.",
      ],
      images: [museum1],
    },

    {
      key: "yurt",
      title: "Osh Three-Storey Yurt (Ethnographic Complex)",
      paragraphs: [
        "A modern cultural complex designed like a giant traditional yurt.",
        "It showcases Kyrgyz culture, crafts, and traditional performances.",
      ],
      images: [yurt1],
    },
  ];

  /* 3D Carousel */
  function ThreeDCarousel({ imgs }) {
    const [active, setActive] = useState(0);
    const next = () => setActive((active + 1) % imgs.length);
    const prev = () => setActive((active - 1 + imgs.length) % imgs.length);

    return (
      <div className={styles.carouselContainer}>
        <button className={styles.arrow} onClick={prev}>
          ‹
        </button>

        <div className={styles.carousel3d}>
          {imgs.map((src, i) => {
            let diff = (i - active + imgs.length) % imgs.length;
            if (diff > imgs.length / 2) diff -= imgs.length;
            return (
              <div
                key={i}
                className={styles.slide}
                style={{ "--pos": diff }}
                onClick={() => setActive(i)}
              >
                <img src={src} loading="lazy" alt="" />
              </div>
            );
          })}
        </div>

        <button className={styles.arrow} onClick={next}>
          ›
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <img src={OshHero} loading="lazy" className={styles.heroImage} />

        {/* TABLE NAV */}
        <div className={styles.tableNav}>
          {sections.map((s) => (
            <div
              key={s.key}
              onClick={() =>
                document
                  .getElementById(s.key)
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              {s.title}
            </div>
          ))}
        </div>

        {/* SECTIONS */}
        {sections.map((sec) => (
          <section key={sec.key} id={sec.key} className={styles.section}>
            <h3>{sec.title}</h3>

            {sec.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {sec.images.length > 1 ? (
              <ThreeDCarousel imgs={sec.images} />
            ) : (
              <img
                src={sec.images[0]}
                className={styles.singleImage}
                loading="lazy"
              />
            )}
          </section>
        ))}
      </div>

      {/* RIGHT SIDE — Tours */}
      <div className={styles.right}>
        {oshTours.map((tour) => (
          <div
            key={tour.id}
            className={styles.tourCard}
            onClick={() => navigate(`/tour/${makeSlug(tour.title)}`)}
          >
            <img src={getTourImage(tour)} className={styles.tourImage} />
            <div className={styles.tourInfo}>
              <h3>{tour.title}</h3>
              <p>
                {tour.startDate &&
                  new Date(tour.startDate).toLocaleDateString()}
              </p>
              <p className={styles.price}>from ${tour.price || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
