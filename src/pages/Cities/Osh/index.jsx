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
      title: "Hystory of Osh",
      paragraphs: [
        "Osh is one of the oldest cities in Central Asia, often called the “Southern Capital” of Kyrgyzstan.",
        "Located in the fertile Fergana Valley, it has been a major trading center on the Silk Road for more than 3,000 years.",
        "The city’s life revolves around a mix of ancient traditions, vibrant bazaars, and a strong multicultural atmosphere shaped by Kyrgyz, Uzbek, Tajik, and other communities who have lived here for centuries.",
        "At the heart of Osh stands Sulayman-Too Sacred Mountain, a UNESCO World Heritage Site and one of the most important spiritual places in the region.",
        "Pilgrims climb the mountain for its panoramic views and its centuries-old shrines and caves associated with Islamic history and local legends.",
        "Below the mountain lies Jayma Bazaar, one of the largest and oldest markets in Central Asia, where merchants have traded silk, spices, fabrics, fruits, and handmade goods for generations.",
      ],

      images: [],
    },

    {
      key: "sulayman",
      title: "Sulayman-Too Sacred Mountain (UNESCO)",
      paragraphs: [],
      items: [
        "Sulayman-Too Sacred Mountain is a UNESCO World Heritage Site and the most important cultural landmark of Osh.",
        "The mountain has been a place of pilgrimage for over a thousand years. It contains ancient petroglyphs, shrines, and historical pathways. ",
        "Sulayman-Too represents a unique blend of spiritual traditions and cultural history in Central Asia.",
      ],

      images: [sul1],
    },

    {
      key: "jayma",
      title: "Jayma Bazaar",
      paragraphs: [],
      afterItems: [
        "Jayma Bazaar is one of the oldest and largest markets in southern Kyrgyzstan. ",
        "Located along the Ak-Buura River, it has served as a trading center since the Silk Road era. ",
        "The bazaar offers a wide range of local products, including food, textiles, and handicrafts. It remains a vital part of daily economic and social life in Osh.",
      ],
      afterImages: [jayma1, jayma2, jayma3],
    },

    {
      key: "museum",
      title: "Osh National Historical & Archaeological Museum",
      paragraphs: [],
      afterItems1: [
        "The Osh National Historical and Archaeological Museum is located within the Sulayman-Too mountain complex.",
        "The museum showcases artifacts dating from ancient times to the medieval period. Its exhibits highlight the cultural development of the Fergana Valley.",
        "The museum is an important center for historical research and education.",
      ],
      afterImages1: [museum1],
    },

    {
      key: "yurt",
      title: "Osh Three-Storey Yurt (Ethnographic Complex)",
      paragraphs: [],
      afterItems2: [
        "The Osh Three-Storey Yurt is a modern ethnographic complex inspired by traditional Kyrgyz dwellings. It represents nomadic culture through architecture, exhibitions, and cultural events",
        "The structure symbolizes hospitality and national identity. It serves as a venue for festivals and educational programs in Osh.",
      ],
      afterImages2: [yurt1],
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
        <div className={styles.h1text}>
          <h1>Osh, Kyrgyzystan</h1>
        </div>
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
              <img src={sec.images[0]} className={styles.singleImage} />
            )}

            {/* afterParagraphs */}
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
                  <img key={i} src={src} className={styles.singleImage} />
                ))
              ))}
            {/* AFTER PARAGRAPHS */}
            {sec.afterParagraphs?.map((p, i) => (
              <p
                key={`ap${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems && (
              <ul className={styles.bulletList}>
                {sec.afterItems.map((item, i) => (
                  <li key={`ai${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages &&
              (sec.afterImages.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages} />
              ) : (
                sec.afterImages.map((src, i) => (
                  <img
                    key={`aimg${i}`}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER 1 */}
            {sec.afterParagraphs1?.map((p, i) => (
              <p
                key={`ap1${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems1 && (
              <ul className={styles.bulletList}>
                {sec.afterItems1.map((item, i) => (
                  <li key={`ai1${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages1 &&
              (sec.afterImages1.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages1} />
              ) : (
                sec.afterImages1.map((src, i) => (
                  <img
                    key={`aimg1${i}`}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER 2 */}
            {sec.afterParagraphs2?.map((p, i) => (
              <p
                key={`ap2${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems2 && (
              <ul className={styles.bulletList}>
                {sec.afterItems2.map((item, i) => (
                  <li key={`ai2${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages2 &&
              (sec.afterImages2.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages2} />
              ) : (
                sec.afterImages2.map((src, i) => (
                  <img
                    key={`aimg2${i}`}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}
            {/* same for afterParagraphs1, 2, 3 */}
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
