import { useEffect, useState } from "react";
import styles from "./Erevan.module.scss";
import ErevanHero from "../../../assets/Cities/Erevan/Eravan.png";
import { useNavigate } from "react-router-dom";

/* Yerevan */
import er1 from "../../../assets/Cities/Erevan/Eravan.png";
import er2 from "../../../assets/Cities/Erevan/Erevan 2.png";

/* Garni Temple */
import garni1 from "../../../assets/Cities/Erevan/Garni Temple 1.jpg";
import garni2 from "../../../assets/Cities/Erevan/Garni Temple 2.jpg";
import garni3 from "../../../assets/Cities/Erevan/Garni Temple 3.jpg";

/* Geghard Monastery */
import geghard2 from "../../../assets/Cities/Erevan/Geghard Monastery 2.jpg";
import geghard3 from "../../../assets/Cities/Erevan/Geghard Monastery 3.jpg";
import geghard5 from "../../../assets/Cities/Erevan/Geghard Monastery 5.jpg";

/* Khor Virap */
import khor1 from "../../../assets/Cities/Erevan/Khor Virap 1.jpg";
import khor2 from "../../../assets/Cities/Erevan/Khor Virap 2.jpg";
import khor3 from "../../../assets/Cities/Erevan/Khor Virap 3.jpg";

/* Lake Sevan */
import sevan1 from "../../../assets/Cities/Erevan/Lake Sevan 1.jpg";
import sevan2 from "../../../assets/Cities/Erevan/Lake Sevan 2.jpg";
import sevan3 from "../../../assets/Cities/Erevan/Lake Sevan 3.jpg";

/* Noravank */
import nor1 from "../../../assets/Cities/Erevan/Noravank Monastery 1.jpg";
import nor2 from "../../../assets/Cities/Erevan/Noravank Monastery 2.jpg";
import nor3 from "../../../assets/Cities/Erevan/Noravank Monastery 3.jpg";

/* Tatev */
import tat1 from "../../../assets/Cities/Erevan/Tatev Monastery & Wings of Tatev 1.jpg";
import tat2 from "../../../assets/Cities/Erevan/Tatev Monastery & Wings of Tatev 2.jpg";
import tat3 from "../../../assets/Cities/Erevan/Tatev Monastery & Wings of Tatev 3.jpg";

/* Zvartnots */
import zv1 from "../../../assets/Cities/Erevan/Zvartnots Cathedral Ruins 1.jpg";
import zv2 from "../../../assets/Cities/Erevan/Zvartnots Cathedral Ruins 2.jpg";
import zv3 from "../../../assets/Cities/Erevan/Zvartnots Cathedral Ruins 3.jpg";

export default function ErevanPage() {
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const makeSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    fetch(
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Armenia"
    )
      .then((r) => r.json())
      .then((d) => setTours(d.data || []));
  }, []);

  useEffect(() => {
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((r) => r.json())
      .then((d) => setImages(d));
  }, []);

  const getTourImage = (tour) => {
    const match = images.filter((img) => img.alternativeText === tour.title);
    return match[0]?.url || "https://via.placeholder.com/400x400";
  };

  const erevanTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("erevan")
  );

  const sections = [
    {
      key: "history",
      title: "History",
      paragraphs: [
        "Armenia is one of the world’s oldest nations, with a cultural legacy dating back over three millennia. The early Armenian state traces its roots to the Kingdom of Urartu (9th–6th century BC), centered around Lake Van.",
        "After the fall of Urartu, Armenians formed their own kingdom, and by the 6th century BC the region became widely known as Armenia. Under Tigranes the Great in the 1st century BC, Armenia briefly became a regional empire stretching from the Mediterranean to the Caspian Sea.",
        "A major turning point in Armenian history occurred in 301 AD, when Armenia became the first country to adopt Christianity as a state religion. This milestone shaped Armenian identity and inspired the creation of the Armenian alphabet in 405 AD by Mesrop Mashtots.",
        "Throughout the Middle Ages, powerful Armenian kingdoms emerged, including Bagratid Armenia and the Cilician Armenian Kingdom, which played key roles in regional trade and culture.",
        "Across the centuries, Armenia was influenced or ruled by major empires including the Byzantine, Persian, Arab, Ottoman, and Russian empires.",
        "One of the darkest chapters in Armenian history is the Armenian Genocide (1915–1917), during which over a million Armenians perished in the Ottoman Empire.",
        "Following brief independence in 1918, Armenia became part of the Soviet Union until its dissolution.",
        "Since declaring independence in 1991, Armenia has developed as a sovereign republic known for its ancient monasteries, dramatic mountain landscapes, and rich cultural heritage.",
      ],
      images: [er1, er2],
    },

    {
      key: "garni",
      title: "Garni Temple",
      paragraphs: [
        "Garni is the only preserved Greco-Roman pagan temple in the region.",
        "It was built in the 1st century AD and stands above the Azat River Gorge.",
      ],
      images: [garni1, garni2, garni3],
    },

    {
      key: "geghard",
      title: "Geghard Monastery",
      paragraphs: [
        "A UNESCO World Heritage Site carved into rock.",
        "Known for its ancient chambers and sacred relics.",
      ],
      images: [geghard2, geghard3, geghard5],
    },

    {
      key: "khor",
      title: "Khor Virap",
      paragraphs: [
        "The most famous viewpoint of Mount Ararat.",
        "Saint Gregory the Illuminator was imprisoned here.",
      ],
      images: [khor1, khor2, khor3],
    },

    {
      key: "sevan",
      title: "Lake Sevan",
      paragraphs: [
        "One of the largest high-altitude freshwater lakes in the world.",
        "A major summer resort with beaches and monasteries.",
      ],
      images: [sevan1, sevan2, sevan3],
    },

    {
      key: "noravank",
      title: "Noravank Monastery",
      paragraphs: [
        "Built in the 13th century among red rock cliffs.",
        "One of Armenia’s most beautiful canyon monasteries.",
      ],
      images: [nor1, nor2, nor3],
    },

    {
      key: "tatev",
      title: "Tatev Monastery & Wings of Tatev",
      paragraphs: [
        "Medieval monastery on a dramatic cliff.",
        "World-famous longest reversible cable car.",
      ],
      images: [tat1, tat2, tat3],
    },

    {
      key: "zvartnots",
      title: "Zvartnots Cathedral Ruins",
      paragraphs: [
        "A unique 7th-century circular cathedral.",
        "UNESCO World Heritage Site.",
      ],
      images: [zv1, zv2, zv3],
    },
  ];

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
      <div className={styles.left}>
        <img src={ErevanHero} loading="lazy" className={styles.heroImage} />

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

        {sections.map((sec) => (
          <section key={sec.key} id={sec.key} className={styles.section}>
            <h3>{sec.title}</h3>
            {sec.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ThreeDCarousel imgs={sec.images} />
          </section>
        ))}
      </div>

      <div className={styles.right}>
        {erevanTours.map((tour) => (
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
