import { useEffect, useState, useRef } from "react";
import styles from "./Tashkent.module.scss";
import Tashkent from "../../../../assets/Cities/tashkent.jpg";
import { useNavigate } from "react-router-dom";

/* History */
import history1 from "../../../../assets/Cities/Tashkent City Images/Old Tashkent.jpg";
import history2 from "../../../../assets/Cities/Tashkent City Images/Old Tashkent 2.jpg";
import history3 from "../../../../assets/Cities/Tashkent City Images/Old Tashkent 3.jpg";
import history4 from "../../../../assets/Cities/Tashkent City Images/Old Tashkent 4.jpg";

/* Landmarks */
import landmark1 from "../../../../assets/Cities/Tashkent City Images/Kukeldash Madrasah.jpg";
import landmark2 from "../../../../assets/Cities/Tashkent City Images/Khazrati Ali Mosque 4.jpg";
import landmark3 from "../../../../assets/Cities/Tashkent City Images/Khazrati Ali Mosque 5.jpg";
import landmark4 from "../../../../assets/Cities/Tashkent City Images/Khazrati Ali Mosque 1.jpg";

/* Food */
import food1 from "../../../../assets/Cities/Tashkent City Images/Osh (2).jpg";
import food2 from "../../../../assets/Cities/Tashkent City Images/Somsa.jpg";
import food3 from "../../../../assets/Cities/Tashkent City Images/Самса.jpg";

/* Shopping */
import shopping1 from "../../../../assets/Cities/Tashkent City Images/State Museum of History.jpg";
import shopping2 from "../../../../assets/Cities/Tashkent City Images/Minor Mosque (White Mosque) 1.jpg";

export default function TashkentPage() {
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

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

  const tashkentTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("tashkent")
  );

  /* CONTENT SECTIONS */
  const sections = [
    {
      key: "history",
      title: "History",
      paragraphs: [
        "Tashkent, the capital of Uzbekistan, is one of the oldest cities in Central Asia.",
        "Throughout history, Tashkent was ruled by various empires and became a major cultural hub.",
      ],
      images: [history1, history2, history3, history4],
    },
    {
      key: "landmarks",
      title: "Cultural Landmarks",
      paragraphs: [
        "Tashkent is home to many remarkable cultural sites.",
        "From ancient madrasahs to modern museums, the city is rich in wonders.",
      ],
      items: [
        "Kukeldash Madrasah",
        "Minor Mosque",
        "State Museum of History",
        "Khazrati Ali Mosque",
      ],
      images: [landmark1, landmark2, landmark3, landmark4],
    },
    {
      key: "food",
      title: "Foods in Tashkent",
      paragraphs: [
        "Tashkent's food scene ranges from street vendors to luxury restaurants.",
        "Try plov, samsa, lagman, and more.",
      ],
      images: [food1, food2, food3],
    },
    {
      key: "shopping",
      title: "Shopping & Leisure",
      paragraphs: [
        "Chorsu Bazaar is a historical landmark of trade.",
        "Modern malls and cultural venues are also popular.",
      ],
      images: [shopping1, shopping2],
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
            const diff = i - active;

            // wrap-around logic
            let pos =
              diff === 0
                ? 0
                : diff === 1 || diff === -imgs.length + 1
                ? 1
                : diff === -1 || diff === imgs.length - 1
                ? -1
                : Math.sign(diff) * 2;

            return (
              <div
                key={i}
                className={styles.slide}
                style={{ "--pos": pos }}
                onClick={() => setActive(i)}
              >
                <img src={src} alt="" />
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
      {/* LEFT SIDE — ALL CONTENT */}
      <div className={styles.left}>
        <img src={Tashkent} className={styles.heroImage} />

        <h2>Things to Do and Sightseeing Tours in Tashkent</h2>

        <ul className={styles.links}>
          <li>1. Tours</li>
          <li>2. History</li>
          <li>3. Things to do</li>
          <li>4. Entertainment, parks, and shopping</li>
          <li>5. Food</li>
          <li>6. City transport</li>
          <li>7. How to get to Tashkent</li>
          <li>8. Languages spoken</li>
          <li>9. Currency</li>
          <li>10. Security</li>
        </ul>

        <p>
          Tashkent is the capital of Uzbekistan and a metropolis of over 2.5
          million people.
        </p>

        {/* ALL SECTIONS */}
        {sections.map((sec) => (
          <section key={sec.key} className={styles.section}>
            <h3>{sec.title}</h3>

            {sec.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {sec.items && (
              <ul className={styles.bulletList}>
                {sec.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {sec.images.length > 1 ? (
              <ThreeDCarousel imgs={sec.images} />
            ) : (
              sec.images.length === 1 && (
                <img src={sec.images[0]} className={styles.singleImage} />
              )
            )}
          </section>
        ))}
      </div>

      {/* RIGHT SIDE — TOURS ONLY */}
      <div className={styles.right}>
        {tashkentTours.map((tour) => (
          <div
            key={tour.id}
            className={styles.tourCard}
            onClick={() => navigate(`/tour/${tour.documentId}`)}
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

        <div className={styles.extraBlock}>
          <h3>Explore More in Tashkent</h3>
          <ul>
            <li>Tashkent Hotels</li>
            <li>Tashkent Tours</li>
            <li>Events & Exhibitions</li>
            <li>Tashkent Trains</li>
            <li>Airport Transfers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
