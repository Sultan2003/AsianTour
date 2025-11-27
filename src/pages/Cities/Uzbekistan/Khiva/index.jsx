import { useEffect, useState } from "react";
import styles from "./Khiva.module.scss";
import { useNavigate } from "react-router-dom";

/* Hero */
import Khiva from "../../../../assets/Cities/Khiva/Ichan qal'a 1.jpg";

/* HISTORY IMAGES */
import ichanQala1 from "../../../../assets/Cities/Khiva/Ichan qal'a.jpg";
import itchanKala2 from "../../../../assets/Cities/Khiva/Itchan Kala (Inner Fortress) 2.jpg";
import itchanKala3 from "../../../../assets/Cities/Khiva/Ichan qal'a 1.jpg";


/* LANDMARKS */
import islamKhodja1 from "../../../../assets/Cities/Khiva/Islam Khodja Minaret 2.jpg";
import islamKhodja2 from "../../../../assets/Cities/Khiva/Islam Khodja Minaret.jpg";

import kaltaMinor5 from "../../../../assets/Cities/Khiva/Kalta-minor 5.jpg";
import kaltaMinor6 from "../../../../assets/Cities/Khiva/Kalta Minor Minaret 6.jpg";
import kaltaMinor7 from "../../../../assets/Cities/Khiva/Kalta Minor Minaret 7.jpg";
import kaltaMinor8 from "../../../../assets/Cities/Khiva/Kalta Minor Minaret 8.jpg";

import kaltaMinar1 from "../../../../assets/Cities/Khiva/Кальта-Минар.jpg";
import kaltaMinar2 from "../../../../assets/Cities/Khiva/Кальта-Минар 2.jpg";
import kaltaMinar from "../../../../assets/Cities/Khiva/Кальта-Минар 1.jpg";

import juma1 from "../../../../assets/Cities/Khiva/Juma Mosque (Friday Mosque).jpg";
import juma2 from "../../../../assets/Cities/Khiva/Juma Mosque (Friday Mosque) 1.jpg";

import kunya1 from "../../../../assets/Cities/Khiva/Kunya-Ark Citadel 2.jpg";
import kunya2 from "../../../../assets/Cities/Khiva/Kunya-Ark Citadel, Khiva 1.jpg";
import kunya3 from "../../../../assets/Cities/Khiva/Kunya-Ark Citadel, Khiva.png";

import tashkhauli1 from "../../../../assets/Cities/Khiva/Tash-Khauli Palace (Stone Palace) 1.jpg";
import tashkhauli2 from "../../../../assets/Cities/Khiva/Tash-Khauli Palace (Stone Palace).jpg";

import islamMinaret from "../../../../assets/Cities/Khiva/минарет Ислам-Ходжа.JPG";

import pexels500 from "../../../../assets/Cities/Khiva/pexels-axp-photography-500641970-19473605.jpg";



/* PAGE START */
export default function KhivaPage() {
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
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Uzbekistan"
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

  const khivaTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("khiva")
  );

  /* SECTIONS */
  const sections = [
    {
      key: "history",
      title: "History",
      paragraphs: [
        "Khiva is one of the most ancient cities of Uzbekistan, with a history that stretches back more than 2,000 years.",
        "It was an oasis city on the Silk Road and once the capital of the Khiva Khanate.",
        "According to legend, Khiva was founded by Shem, the son of Noah.",
        "Today, the inner city Itchan Kala is a UNESCO World Heritage Site.",
      ],
      images: [],
    },

    {
      key: "landmarks",
      title: "Cultural Landmarks",
      paragraphs: ["Itchan Kala (Inner Fortress)"],
      items: [
        "The heart of Khiva — a walled city with narrow streets and ancient monuments.",
      ],
      images: [ichanQala1, itchanKala2, itchanKala3],

      afterParagraphs: ["Kunya-Ark Citadel"],
      afterItems: [
        "A fortified residence of Khiva’s khans with throne room, mosque, and harem.",
      ],
      afterImages: [kunya1, kunya2, kunya3],

      afterParagraphs1: ["Islam Khodja Minaret & Madrassah"],
      afterItems1: [
        "The tallest minaret in Khiva (56.6 meters).",
        "You can climb to the top for panoramic views.",
      ],
      afterImages1: [islamKhodja1, islamKhodja2, islamMinaret],

      afterParagraphs2: ["Kalta Minor Minaret"],
      afterItems2: [
        "One of the most iconic symbols of Khiva.",
        "Famous for its turquoise tiles and unfinished height.",
      ],
      afterImages2: [
        kaltaMinor5,
        kaltaMinor6,
        kaltaMinor7,
        kaltaMinor8,
        kaltaMinar1,
        kaltaMinar2,
        kaltaMinar,
      ],

      afterParagraphs3: ["Juma Mosque (Friday Mosque)"],
      afterItems3: [
        "Unique for its 213 carved wooden columns.",
        "The interior feels mystical with filtered sunlight.",
      ],
      afterImages3: [juma1, juma2],

      afterParagraphs4: ["Tash-Khauli Palace (Stone Palace)"],
      afterItems4: [
        "Built in the 19th century for Allakuli Khan.",
        "Known for its tilework and courtyards.",
      ],
      afterImages4: [tashkhauli1, tashkhauli2, pexels500],

      afterParagraphs5: ["Allakuli Khan Caravanserai and Tim"],
      afterItems5: [
        "Ancient trading complex where merchants stayed.",
        "Now filled with local handicrafts and souvenirs.",
      ],
      afterImages5: [],
    },

    {
      key: "shopping",
      title: "Shopping & Leisure",
      paragraphs: [
        "Khiva's bazaars and trading domes preserve the spirit of the Silk Road.",
      ],
      items: [
        "Traditional textiles, carpets, ceramics, wood carvings, and souvenirs.",
        "Caravanserai areas now serve as cultural shopping centers.",
      ],
      images: [],
    },
  ];

  /* 3D CAROUSEL */
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

  /* PAGE RETURN */
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={Khiva} loading="lazy" className={styles.heroImage} />

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
          <div
            onClick={() =>
              document
                .getElementById("shopping")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Shopping & Leisure
          </div>
        </div>

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

            {/* AFTER CONTENT */}
            {[
              ["afterParagraphs", "afterItems", "afterImages"],
              ["afterParagraphs1", "afterItems1", "afterImages1"],
              ["afterParagraphs2", "afterItems2", "afterImages2"],
              ["afterParagraphs3", "afterItems3", "afterImages3"],
              ["afterParagraphs4", "afterItems4", "afterImages4"],
              ["afterParagraphs5", "afterItems5", "afterImages5"],
            ].map(([pKey, iKey, imgKey]) => (
              <div key={pKey}>
                {sec[pKey]?.map((p, i) => (
                  <p key={i}>
                    <strong>{p}</strong>
                  </p>
                ))}

                {sec[iKey] && (
                  <ul className={styles.bulletList}>
                    {sec[iKey].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {sec[imgKey] &&
                  (sec[imgKey].length > 1 ? (
                    <ThreeDCarousel imgs={sec[imgKey]} />
                  ) : (
                    sec[imgKey].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        loading="lazy"
                        className={styles.singleImage}
                      />
                    ))
                  ))}
              </div>
            ))}
          </section>
        ))}
      </div>

      <div className={styles.right}>
        {khivaTours.map((tour) => (
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
