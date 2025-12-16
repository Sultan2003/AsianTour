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
    /* ================= HISTORY ================= */
    {
      key: "history",
      title: "History of Almaty",
      paragraphs: [],
      items: [
        "Almaty, formerly known as Alma-Ata, is the largest city in Kazakhstan and one of the most important cultural and economic centers of Central Asia.",
        "It was the capital of Kazakhstan until 1997 and remains the country's main hub for finance, art, education, and tourism.",
        "The city lies at the foothills of the Trans-Ili Alatau mountains, giving it one of the most picturesque urban landscapes in the region.",

        "Almaty (formerly Verny, then Alma-Ata) is the largest city in Kazakhstan and was the country’s capital until 1997.",
        "Its origins date back to a 19th-century Russian fort called Verny, and over time it developed into a major cultural and commercial hub in the region.",
        "During the Soviet period, many of its important buildings and institutions were built, and the city became a center for education, art, and science.",
        "Today, Almaty is considered the cultural capital of Kazakhstan, with a dense network of theaters, museums, and historic architecture.",
      ],
      images: [],
    },

    /* ================= LANDMARKS ================= */
    {
      key: "landmarks",
      title: "Cultural Landmarks",

      /* ASCENSION CATHEDRAL */
      paragraphs: ["Ascension Cathedral (Zenkov Cathedral)"],
      items: [
        "This is a striking wooden Russian Orthodox cathedral in Panfilov Park, built between 1904–1907.",
        "Despite its wooden structure, it survived a powerful earthquake in 1911 thanks to its special engineering.",
        "It is one of the tallest wooden church buildings in the world, reaching approximately 56 meters in height.",
      ],
      images: [asc1, asc2, asc3],

      /* PARK OF 28 PANFILOV GUARDSMEN / MEMORIAL OF GLORY */
      afterParagraphs: ["Park of 28 Panfilov Guardsmen"],
      afterItems: [
        "This park is named after 28 soldiers from the Panfilov Division who died defending Moscow during World War II.",
        "Within the park, there are several culturally important sites including the Ascension Cathedral, the Memorial of Glory, the Eternal Flame, and other monuments.",
      ],
      afterImages: [],

      /* MUSEUM OF FOLK MUSICAL INSTRUMENTS */
      afterParagraphs1: [],
      afterItems1: [
        "Kazakh Museum of Folk Musical Instruments (Ykhlas Museum)",
        "The museum is located in Park of 28 Panfilov Guardsmen in central Almaty.",
        "It was founded in 1980 and is one of Kazakhstan’s most important cultural institutions.",
        "The building itself is a historic wooden structure built in 1908, reflecting traditional Russian architecture.",
        "The museum is named after Ykhlas Dukenuly, a respected Kazakh musician and composer.",
        "Its collection includes over 1,000 traditional Kazakh musical instruments, making it the largest of its kind in the country.",
        "The displays feature instruments such as dombra, kobyz, sybyzgy, zhetigen, kerney, and many rare regional instruments.",
        "Many instruments belonged to famous musicians, including national artists and legendary performers.",
        "The museum explains the role of music in Kazakh nomadic culture, rituals, battles, and storytelling traditions.",
        "Visitors can see both ancient archaeological instruments and modern versions used in contemporary folk ensembles.",
        "The museum also hosts cultural events, performances, and educational programs dedicated to preserving Kazakhstan’s musical heritage.",
      ],
      afterImages1: [museum],

      /* MEMORIAL OF GLORY */
      afterParagraphs2: ["Memorial of Glory"],
      afterItems2: [
        "Also located in the Park of 28 Panfilov Guardsmen, this memorial complex was opened in 1975 to honor the heroes of World War II.",
        "It includes a triptych of sculptures titled “Feat,” “Oath,” and “Trumpeters of Glory.”",
        "An eternal flame burns at the center of the memorial.",
        "Capsules of earth from Soviet ‘hero cities’ are embedded beneath the monument.",
      ],
      afterImages2: [memory],

      /* KASTEEV MUSEUM */
      afterParagraphs3: ["A. Kasteyev State Museum of Arts"],
      afterItems3: [
        "This is the largest art museum in Kazakhstan.",
        "It is named after the prominent Kazakh painter Abilkhan Kasteev.",
        "The collection includes more than 23,000 works.",
        "Exhibits feature Kazakh and Soviet art, as well as European, East Asian, and decorative art pieces.",
      ],
      afterImages3: [],

      /* MUSEUM OF HISTORY OF ALMATY */
      afterParagraphs4: ["Museum of History of Almaty"],
      afterItems4: [
        "This museum is located in a historic building that once served as the Vernensky orphanage.",
        "It presents the story of Almaty from ancient times to the present day.",
        "Exhibits include archaeology, city development, and major historical events.",
        "One of the key topics covered is the December 1986 protests.",
      ],
      afterImages4: [],
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
        <div className={styles.h1text}>
          <h1>Almaty, Kazakhstan</h1>
        </div>
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
