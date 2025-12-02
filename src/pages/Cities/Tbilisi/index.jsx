import { useEffect, useState } from "react";
import styles from "./Tbilisi.module.scss";
import TbilisiHero from "../../../assets/Cities/Tbilisi/Old Tbilisi (Abanotubani & Historic District) 1.jpg";
import { useNavigate } from "react-router-dom";

/* Bridge of Peace */
import bop1 from "../../../assets/Cities/Tbilisi/Bridge of Peace 1.jpg";
import bop2 from "../../../assets/Cities/Tbilisi/Bridge of Peace 2.jpg";
import bop3 from "../../../assets/Cities/Tbilisi/Bridge of Peace 3.jpg";

/* Narikala Fortress */
import nar1 from "../../../assets/Cities/Tbilisi/Narikala Fortress 1.jpg";
import nar2 from "../../../assets/Cities/Tbilisi/Narikala Fortress 2.jpg";
import nar3 from "../../../assets/Cities/Tbilisi/Narikala Fortress 3.jpg";

/* Old Tbilisi */
import old1 from "../../../assets/Cities/Tbilisi/Old Tbilisi (Abanotubani & Historic District) 1.jpg";
import old2 from "../../../assets/Cities/Tbilisi/Old Tbilisi (Abanotubani & Historic District) 2.jpg";
import old3 from "../../../assets/Cities/Tbilisi/Old Tbilisi (Abanotubani & Historic District) 3.jpg";

/* Sameba Cathedral */
import sam1 from "../../../assets/Cities/Tbilisi/Sameba Cathedral (Holy Trinity Cathedral) 1.jpg";
import sam2 from "../../../assets/Cities/Tbilisi/Sameba Cathedral (Holy Trinity Cathedral) 2.jpg";
import sam3 from "../../../assets/Cities/Tbilisi/Sameba Cathedral (Holy Trinity Cathedral) 3.jpg";

/* City View */
import city1 from "../../../assets/Cities/Tbilisi/Tbilisi.jpg";

export default function TbilisiPage() {
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
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Georgia"
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

  const tbilisiTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("tbilisi")
  );

  /* Sections */
  const sections = [
    {
      key: "history",
      title: "History",
      paragraphs: [
        "Tbilisi has over 1,500 years of recorded history and was founded in the 5th century by King Vakhtang I Gorgasali. Legend says he discovered natural hot springs here and decided to build a city.",
        "Due to its location on the Silk Road, Tbilisi became an important trade center connecting Europe and Asia.",
        "Throughout the centuries, Persians, Arabs, Mongols, Turks, and Russians ruled or influenced the city, forming its multicultural identity.",
        "After Georgia regained independence in 1991, Tbilisi transformed into a modern capital while preserving its ancient heritage.",
      ],
      images: [city1],
    },

    /* Narikala Fortress */
    {
      key: "narikala",
      title: "Narikala Fortress",
      paragraphs: [
        "Narikala Fortress is one of Tbilisi’s most iconic and oldest structures, originating from the 4th century.",
        "It was expanded by Persians, Arabs, Mongols, and Georgians throughout history.",
        "The fortress offers the best panoramic views of the Mtkvari River and historic districts.",
        "You can reach it by hiking through the old town or using the cable car from Rike Park.",
      ],
      images: [nar1, nar2, nar3],
    },

    /* Old Tbilisi */
    {
      key: "old",
      title: "Old Tbilisi (Abanotubani & Historic District)",
      paragraphs: [
        "Old Tbilisi is known for its wooden balconies, narrow streets, old bathhouses, and multicultural architecture.",
        "Abanotubani is the famous sulfur bath district — the birthplace of the city.",
        "The neighborhood includes Georgian, Persian, Armenian, and Russian elements, reflecting centuries of coexistence.",
        "Walking here feels like stepping into a living open-air museum.",
      ],
      images: [old1, old2, old3],
    },

    /* Bridge of Peace */
    {
      key: "bridge",
      title: "Bridge of Peace",
      paragraphs: [
        "Opened in 2010, the Bridge of Peace is one of Tbilisi’s most modern and futuristic landmarks.",
        "Its glass and steel structure symbolizes unity and a connection between old and new Tbilisi.",
        "At night, over 10,000 LED lights illuminate the bridge with moving patterns.",
        "It provides stunning views of Narikala Fortress and the Mtkvari River.",
      ],
      images: [bop1, bop2, bop3],
    },

    /* Sameba Cathedral */
    {
      key: "sameba",
      title: "Sameba Cathedral (Holy Trinity Cathedral)",
      paragraphs: [
        "Sameba is one of the largest Orthodox cathedrals in the world and a major symbol of Georgian Christianity.",
        "Completed in 2004, it represents Georgia’s spiritual revival after Soviet rule.",
        "The cathedral’s golden dome is visible from many parts of the city.",
        "The complex includes chapels, a theological academy, and beautiful outdoor areas.",
      ],
      images: [sam1, sam2, sam3],
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
        <img src={TbilisiHero} loading="lazy" className={styles.heroImage} />

        {/* TABLE NAV */}
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
                .getElementById("narikala")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Narikala Fortress
          </div>
          <div
            onClick={() =>
              document
                .getElementById("old")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Old Tbilisi
          </div>
          <div
            onClick={() =>
              document
                .getElementById("bridge")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Bridge of Peace
          </div>
          <div
            onClick={() =>
              document
                .getElementById("sameba")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Sameba Cathedral
          </div>
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
        {tbilisiTours.map((tour) => (
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
