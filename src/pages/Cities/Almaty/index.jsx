import { useEffect, useState } from "react";
import styles from "./Almaty.module.scss";
import AlmatyHero from "../../../assets/Cities/Almaty/Almaty City.jpg";
import { useNavigate } from "react-router-dom";

/* HISTORY */
import history1 from "../../../assets/Cities/Almaty/Almaty City.jpg";

/* LANDMARKS */
import asc1 from "../../../assets/Cities/Almaty/Ascension Cathedral (Zenkov Cathedral) 1.jpg";
import asc2 from "../../../assets/Cities/Almaty/Ascension Cathedral (Zenkov Cathedral) 2.jpg";
import asc3 from "../../../assets/Cities/Almaty/Ascension Cathedral (Zenkov Cathedral) 3.jpg";

import memory from "../../../assets/Cities/Almaty/Memory of glory (Almaty).jpg";
import museum from "../../../assets/Cities/Almaty/Museum of Folk Instruments. Almaty.jpg";

export default function AlmatyPage() {
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const makeSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  /* TOURS API */
  useEffect(() => {
    fetch(
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Kazakhstan"
    )
      .then((r) => r.json())
      .then((d) => setTours(d.data || []));
  }, []);

  /* IMAGES API */
  useEffect(() => {
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((r) => r.json())
      .then((d) => setImages(d));
  }, []);

  const getTourImage = (tour) => {
    const match = images.filter((img) => img.alternativeText === tour.title);
    return match[0]?.url || "https://via.placeholder.com/400x400";
  };

  const almatyTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("almaty")
  );

  /* ALMATY CONTENT */
  const sections = [
    {
      key: "history",
      title: "History of Almaty",
      paragraphs: [
        "Almaty, formerly known as Alma-Ata, is the largest city in Kazakhstan and one of the most important cultural and economic centers of Central Asia.",
        "It was the capital of Kazakhstan until 1997 and remains the country's main hub for finance, art, education, and tourism.",
        "The city lies at the foothills of the Trans-Ili Alatau mountains, giving it one of the most picturesque urban landscapes in the region.",
      ],
      images: [history1],
    },

    {
      key: "landmarks",
      title: "Cultural Landmarks",
      paragraphs: ["Ascension Cathedral (Zenkov Cathedral)"],
      items: [
        "One of the tallest wooden churches in the world — built entirely without nails.",
        "Constructed in 1907; survived major earthquakes due to its unique engineering.",
        "Located inside Panfilov Park; one of Almaty’s main attractions.",
      ],
      images: [asc1, asc2, asc3],

      afterParagraphs: ["Memory of Glory (Almaty)"],
      afterItems: [
        "A patriotic memorial complex dedicated to soldiers of WWII.",
        "Located in the heart of Panfilov Park.",
        "Famous for its eternal flame and expressive granite sculptures.",
      ],
      afterImages: [memory],

      afterParagraphs1: ["Museum of Folk Instruments (Almaty)"],
      afterItems1: [
        "A unique museum showcasing traditional Kazakh musical instruments.",
        "Located inside a beautifully preserved wooden building in Panfilov Park.",
        "Features the famous dombra, kobyz, sybyzgy, and more.",
      ],
      afterImages1: [museum],
    },
  ];

  /* 3D CAROUSEL (original logic from Tashkent) */
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
            let pos = diff;

            return (
              <div
                key={i}
                className={styles.slide}
                style={{ "--pos": pos }}
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
        <img src={AlmatyHero} loading="lazy" className={styles.heroImage} />

        {/* TABLE NAVIGATION */}
        <div className={styles.tableNav}>
          <div
            onClick={() =>
              document
                .getElementById("history")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            History
          </div>
          <div
            onClick={() =>
              document
                .getElementById("landmarks")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Cultural Landmarks
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        {sections.map((sec) => (
          <section key={sec.key} id={sec.key} className={styles.section}>
            <h3>{sec.title}</h3>

            {sec.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {sec.items && (
              <ul className={styles.bulletList}>
                {sec.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {sec.images?.length > 1 && <ThreeDCarousel imgs={sec.images} />}
            {sec.images?.length === 1 && (
              <img
                src={sec.images[0]}
                loading="lazy"
                className={styles.singleImage}
              />
            )}

            {/* AFTER PARAGRAPHS */}
            {sec.afterParagraphs?.map((p, i) => (
              <p key={`ap${i}`}>
                <strong>{p}</strong>
              </p>
            ))}

            {sec.afterItems && (
              <ul className={styles.bulletList}>
                {sec.afterItems.map((item, i) => (
                  <li key={`ai${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages && sec.afterImages.length > 0 && (
              <img
                src={sec.afterImages[0]}
                className={styles.singleImage}
                loading="lazy"
              />
            )}

            {/* AFTER GROUP 1 */}
            {sec.afterParagraphs1?.map((p, i) => (
              <p key={`ap1${i}`}>
                <strong>{p}</strong>
              </p>
            ))}

            {sec.afterItems1 && (
              <ul className={styles.bulletList}>
                {sec.afterItems1.map((item, i) => (
                  <li key={`ai1${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages1 && sec.afterImages1.length > 0 && (
              <img
                src={sec.afterImages1[0]}
                className={styles.singleImage}
                loading="lazy"
              />
            )}
          </section>
        ))}
      </div>

      {/* RIGHT SIDE (Tours) */}
      <div className={styles.right}>
        {almatyTours.map((tour) => (
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
