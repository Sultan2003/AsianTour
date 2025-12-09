import { useEffect, useState } from "react";
import styles from "./Dushanbe.module.scss";
import DushanbeHero from "../../../assets/Cities/Dushanbe/Dushanbe.jpg";
import { useNavigate } from "react-router-dom";

/* Ismaili Somoni Monument */
import somoni1 from "../../../assets/Cities/Dushanbe/Ismaili Somoni Monument.jpg";

/* National Museum */
import museum1 from "../../../assets/Cities/Dushanbe/National Museum of Tajikistan 1.jpg";

/* Rudaki Park */
import rudaki1 from "../../../assets/Cities/Dushanbe/Rudaki Park 1.png";
import rudaki2 from "../../../assets/Cities/Dushanbe/Rudaki Park 2.png";
import rudaki3 from "../../../assets/Cities/Dushanbe/Rudaki Park 3.jpg";

export default function DushanbePage() {
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
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Tajikistan"
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

  const dushanbeTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("dushanbe")
  );

  /* Sections */
  const sections = [
    {
      key: "history",
      title: "History",
      paragraphs: [
        "Dushanbe, the capital of Tajikistan, began as a small village known for its Monday bazaar, which gave the city its name.",
        "During the 18th and 19th centuries, it remained a modest market town under the Bukharan Emirate.",
        "In 1924, Dushanbe became the capital of the Tajik Autonomous Soviet Socialist Republic and later was renamed Stalinabad.",
        "After independence in 1991, Dushanbe became the capital of independent Tajikistan and continues to modernize.",
      ],
      images: [DushanbeHero],
    },

    {
      key: "somoni",
      title: "Ismaili Somoni Monument",
      paragraphs: [
        "The Ismaili Somoni Monument was built in 1999 to celebrate the 1,000th anniversary of the Samanid dynasty.",
        "It features a 13-meter statue of Ismail Somoni under a massive gilded arch.",
        "Two lions guard the base, symbolizing strength and Tajik statehood.",
      ],
      images: [somoni1],
    },

    {
      key: "museum",
      title: "National Museum of Tajikistan",
      paragraphs: [
        "The National Museum of Tajikistan is one of the largest museums in Central Asia.",
        "It contains collections of Natural History, Ancient History, Modern History, and Art.",
        "Among its highlights are murals from ancient Penjikent and Buddhist monastery reconstructions.",
      ],
      images: [museum1],
    },

    {
      key: "rudaki",
      title: "Rudaki Park",
      paragraphs: [
        "Rudaki Park is a central green park in Dushanbe redesigned in 2008.",
        "At its center stands a statue of the poet Rudaki, the father of Persian-Tajik literature.",
        "It is a favorite place for walking, concerts, and public gatherings.",
      ],
      images: [rudaki1, rudaki2, rudaki3],
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
        <img src={DushanbeHero} loading="lazy" className={styles.heroImage} />

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
        {dushanbeTours.map((tour) => (
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
