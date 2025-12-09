import { useEffect, useState } from "react";
import styles from "./Baku.module.scss";
import BakuHero from "../../../assets/Cities/Baku/Baku Boulevard (Caspian Sea Promenade) 1.jpg";
import { useNavigate } from "react-router-dom";

/* Ateshgah Fire Temple */
import ate1 from "../../../assets/Cities/Baku/Ateshgah Fire Temple (Surakhani).png";

/* Baku Boulevard */
import boul1 from "../../../assets/Cities/Baku/Baku Boulevard (Caspian Sea Promenade) 1.jpg";
import boul2 from "../../../assets/Cities/Baku/Baku Boulevard (Caspian Sea Promenade) 2.jpg";
import boul3 from "../../../assets/Cities/Baku/Baku Boulevard (Caspian Sea Promenade) 3.jpg";

/* Old City */
import old1 from "../../../assets/Cities/Baku/Baku Old City (Icherisheher) 1.jpg";
import old2 from "../../../assets/Cities/Baku/Baku Old City (Icherisheher) 2.jpg";
import old3 from "../../../assets/Cities/Baku/Baku Old City (Icherisheher) 3.jpg";

/* Flame Towers */
import flame1 from "../../../assets/Cities/Baku/Flame Towers 1.jpg";
import flame2 from "../../../assets/Cities/Baku/Flame Towers 2.jpg";
import flame3 from "../../../assets/Cities/Baku/Flame Towers 3.jpg";

/* Sheki */
import sheki1 from "../../../assets/Cities/Baku/Sheki & Sheki Khan’s Palace 1.jpg";
import sheki2 from "../../../assets/Cities/Baku/Sheki & Sheki Khan’s Palace 2.jpg";
import sheki3 from "../../../assets/Cities/Baku/Sheki & Sheki Khan’s Palace 3.jpg";

export default function BakuPage() {
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
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Azerbaijan"
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

  const bakuTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("baku")
  );

  /* Sections */
  const sections = [
    {
      key: "history",
      title: "History of Azerbaijan",
      paragraphs: [
        "Azerbaijan’s history stretches back thousands of years and reflects its position at the crossroads of Europe and Asia.",
        "In ancient times, the territory was home to Caucasian Albania, an early Christian state.",
        "After the 7th century, Islam spread following Arab conquests.",
        "During the 16th century, Azerbaijan became part of the Safavid Empire founded by Shah Ismail I.",
        "In 1918, Azerbaijan declared the first democratic republic in the Muslim world.",
        "After Soviet rule, Azerbaijan regained independence in 1991 and became a modern energy and tourism hub.",
      ],
      images: [boul1],
    },

    {
      key: "old",
      title: "Baku Old City (Icherisheher)",
      paragraphs: [
        "Baku Old City is the oldest part of the capital and a UNESCO World Heritage Site.",
        "It contains fortress walls, narrow streets, mosques, and caravanserais.",
        "The iconic Maiden Tower and Shirvanshahs Palace stand at its center.",
        "Today it mixes craft shops, tea houses, art galleries, and boutique hotels.",
      ],
      images: [old1, old2, old3],
    },

    {
      key: "flame",
      title: "Flame Towers",
      paragraphs: [
        "The Flame Towers are the most recognizable modern buildings of Azerbaijan.",
        "Completed in 2012, they symbolize the country’s fire heritage.",
        "At night, LED screens display flames, water, and the national flag.",
        "They overlook the Caspian Sea and dominate Baku’s skyline.",
      ],
      images: [flame1, flame2, flame3],
    },

    {
      key: "boulevard",
      title: "Baku Boulevard (Caspian Sea Promenade)",
      paragraphs: [
        "Baku Boulevard is one of the longest seaside promenades in the world.",
        "It was originally built in 1909 and is now a modern leisure zone.",
        "It includes parks, cafés, gondola canals, and the Carpet Museum.",
        "In the evening, the boulevard lights up with Flame Tower views.",
      ],
      images: [boul1, boul2, boul3],
    },

    {
      key: "ateshgah",
      title: "Ateshgah Fire Temple (Surakhani)",
      paragraphs: [
        "Ateshgah is a 17th–18th century fire worship temple near Baku.",
        "It was used by Hindu, Sikh, and Zoroastrian pilgrims.",
        "The temple is built around a central fire altar.",
        "Today it serves as a museum and major tourist site.",
      ],
      images: [ate1],
    },

    {
      key: "sheki",
      title: "Sheki & Sheki Khan’s Palace",
      paragraphs: [
        "Sheki is a mountain town known for architecture and crafts.",
        "Sheki Khan’s Palace was built in 1762 as a royal residence.",
        "It features unique stained-glass windows without glue or nails.",
        "The town is a UNESCO World Heritage Site.",
      ],
      images: [sheki1, sheki2, sheki3],
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
        <img src={BakuHero} loading="lazy" className={styles.heroImage} />

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
        {bakuTours.map((tour) => (
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
