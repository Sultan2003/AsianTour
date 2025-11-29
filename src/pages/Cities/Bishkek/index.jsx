import { useEffect, useState } from "react";
import styles from "./Bishkek.module.scss"; // SAME STYLES
import BishkekHero from "../../../assets/Cities/Bishkek/Bishkek - Capital of Kyrgyzstan.jpg";
import { useNavigate } from "react-router-dom";

/* MAIN IMAGES */
import city1 from "../../../assets/Cities/Bishkek/Ala-Too Square.jpg";
import city2 from "../../../assets/Cities/Bishkek/Bishkek - Capital of Kyrgyzstan.jpg";

/* MOSQUE IMAGES */
import mosque1 from "../../../assets/Cities/Bishkek/Bishkek Central Mosque 1.jpg";
import mosque2 from "../../../assets/Cities/Bishkek/Bishkek Central Mosque 2.jpg";
import mosque3 from "../../../assets/Cities/Bishkek/Bishkek Central Mosque 3.jpg";

/* HISTORICAL */
import burana from "../../../assets/Cities/Bishkek/Burana Tower (near Bishkek).jpg";

/* PHILHARMONIC */
import phil1 from "../../../assets/Cities/Bishkek/Kyrgyz National Philharmonic 1.jpg";
import phil3 from "../../../assets/Cities/Bishkek/Kyrgyz National Philharmonic 3.jpg";
import phil4 from "../../../assets/Cities/Bishkek/Kyrgyz National Philharmonic 4.jpg";

/* VICTORY SQUARE */
import victory from "../../../assets/Cities/Bishkek/Victory-Square-featured_image.jpg";

export default function BishkekPage() {
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
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Kyrgyzstan"
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

  const bishkekTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("bishkek")
  );

  /* ——————————————————————————————
      SECTIONS (Using your DOC content)
     —————————————————————————————— */
  const sections = [
    /* ----------------------------------------------------------
       SECTION 1 — HISTORY & INTRO (from the DOC)
       ---------------------------------------------------------- */
    {
      key: "history",
      title: "About Bishkek",

      paragraphs: [
        "Bishkek, the capital of Kyrgyzstan, is a modern and multicultural city located in the Chüy Valley at the foothills of the Tian Shan mountains.",
        "The city has around 1 million residents — Kyrgyz, Russians, Uzbeks, Ukrainians, Koreans, and others — creating a unique cultural blend.",
        "The people are known for hospitality, calm character, and deep nomadic traditions, mixed with Soviet heritage and modern urban life.",
      ],

      images: [city1, city2],
    },

    /* ----------------------------------------------------------
       SECTION 2 — LANDMARKS (Ala-Too, Victory, Mosque, Philharmonic)
       ---------------------------------------------------------- */
    {
      key: "landmarks",
      title: "Cultural Landmarks",
      paragraphs: ["Ala-Too Square"],
      items: [
        "The central square of Bishkek — originally Lenin Square, built in 1984.",
        "A statue of Manas today replaces the former Lenin statue.",
        "The State Historical Museum stands beside the square.",
      ],
      images: [city1],

      /* Victory Square */
      afterParagraphs: ["Victory Square"],
      afterItems: [
        "Dedicated to WWII victory.",
        "Features a sculpture of a waiting woman under yurt-like granite arches.",
      ],
      afterImages: [victory],

      /* Mosque */
      afterParagraphs1: ["Bishkek Central Mosque"],
      afterItems1: [
        "One of the largest mosques in Central Asia.",
        "Built in Ottoman revival style and opened in 2018.",
      ],
      afterImages1: [mosque1, mosque2, mosque3],

      /* Philharmonic */
      afterParagraphs2: ["Kyrgyz National Philharmonic"],
      afterItems2: [
        "Large Soviet-era concert hall named after Toktogul Satylganov.",
      ],
      afterImages2: [phil1, phil3, phil4],

      /* Burana Tower */
      afterParagraphs3: ["Burana Tower (near Bishkek)"],
      afterItems3: [
        "Ancient minaret located outside Bishkek.",
        "Famous for legends, stone balbals, and a history museum.",
      ],
      afterImages3: [burana],
    },
  ];

  /* 3D CAROUSEL (same as Tashkent) */
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
        <img src={BishkekHero} loading="lazy" className={styles.heroImage} />

        {/* TABLE NAV */}
        <div className={styles.tableNav}>
          <div
            onClick={() =>
              document
                .getElementById("history")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            About Bishkek
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

        {/* SECTIONS LOOP */}
        {sections.map((sec) => (
          <section key={sec.key} id={sec.key} className={styles.section}>
            <h3>{sec.title}</h3>

            {/* MAIN PARAGRAPHS */}
            {sec.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {/* MAIN BULLET LIST */}
            {sec.items && (
              <ul className={styles.bulletList}>
                {sec.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {/* CAROUSEL / SINGLE IMAGE */}
            {sec.images?.length > 1 && <ThreeDCarousel imgs={sec.images} />}
            {sec.images?.length === 1 && (
              <img
                src={sec.images[0]}
                className={styles.singleImage}
                loading="lazy"
              />
            )}

            {/* AFTER GROUP 1 */}
            {sec.afterParagraphs?.map((p, i) => (
              <p key={i}>
                <strong>{p}</strong>
              </p>
            ))}
            {sec.afterItems && (
              <ul className={styles.bulletList}>
                {sec.afterItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {sec.afterImages &&
              (sec.afterImages.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages} />
              ) : (
                sec.afterImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER GROUP 2 */}
            {sec.afterParagraphs1?.map((p, i) => (
              <p key={i}>
                <strong>{p}</strong>
              </p>
            ))}
            {sec.afterItems1 && (
              <ul className={styles.bulletList}>
                {sec.afterItems1.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {sec.afterImages1 &&
              (sec.afterImages1.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages1} />
              ) : (
                sec.afterImages1.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER GROUP 3 */}
            {sec.afterParagraphs2?.map((p, i) => (
              <p key={i}>
                <strong>{p}</strong>
              </p>
            ))}
            {sec.afterItems2 && (
              <ul className={styles.bulletList}>
                {sec.afterItems2.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {sec.afterImages2 &&
              (sec.afterImages2.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages2} />
              ) : (
                sec.afterImages2.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER GROUP 4 */}
            {sec.afterParagraphs3?.map((p, i) => (
              <p key={i}>
                <strong>{p}</strong>
              </p>
            ))}
            {sec.afterItems3 && (
              <ul className={styles.bulletList}>
                {sec.afterItems3.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {sec.afterImages3 &&
              sec.afterImages3.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className={styles.singleImage}
                  loading="lazy"
                />
              ))}
          </section>
        ))}
      </div>

      {/* RIGHT SIDE — SAME AS TASHKENT */}
      <div className={styles.right}>
        {bishkekTours.map((tour) => (
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
