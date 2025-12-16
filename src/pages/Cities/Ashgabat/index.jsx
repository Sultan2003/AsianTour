import { useEffect, useState } from "react";
import styles from "./Ashgabat.module.scss";
import AshgabatHero from "../../../assets/Cities/Ashgabat/Ashgabat.jpg";
import { useNavigate } from "react-router-dom";

/* Independence Monument */
import ind1 from "../../../assets/Cities/Ashgabat/Independence Monument.png";

export default function AshgabatPage() {
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
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Turkmenistan"
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

  const ashgabatTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("ashgabat")
  );

  /* SECTIONS */
  const sections = [
    {
      key: "history",
      title: "History of Ashgabat",
      paragraphs: [
        "Ashgabat, the capital of Turkmenistan, was founded in 1881 as a Russian garrison town on the site of a small Turkmen village. It rapidly grew in importance thanks to its strategic location on caravan routes and later the Trans-Caspian Railway.",
        "In 1919, it was briefly renamed Poltoratsk, but by 1927 it returned to its original name, Ashgabat.",
        "The city was almost completely destroyed in a devastating earthquake in 1948, and was rebuilt according to a regular, planned layout.",
        "In Soviet times, it became the administrative, cultural, and scientific center of the Turkmen SSR.",
        "After Turkmenistan became independent in 1991, Ashgabat underwent a dramatic transformation under its leaders, especially Saparmurat Niyazov, who initiated grand construction projects across the city.",
        "The city is now famous for having one of the densest concentrations of white marble buildings in the world.",
        "According to the Turkmen Ministry of Foreign Affairs, Ashgabat is a major political, economic, and cultural hub and was officially recognized for its unique architecture.",
        "Its name may come from a legendary love story — in Turkmen folklore, “Ashgabat” is linked to a tale of two lovers whose suffering created a spring and symbolic city of love.",
      ],
    },

    {
      key: "independence",
      title: "Independence Monument & Independence Park",
      items: [
        "Independence Monument (and associated Independence Park) — this monument was built to celebrate Turkmenistan’s independence and stands as one of the country’s most important national symbols.",
        "The monument itself is a tall column topped with a gilded crescent and stars, representing the unity of the main Turkmen tribes.",
        "The base is styled somewhat like a traditional yurt (inspired by Turkmen heritage), while the surrounding park and gated ceremonial avenue host statues of national heroes, notable leaders, poets, and cultural figures.",
        "Inside the monument building there is a “Museum of Independence” which exhibits items related to Turkmenistan’s path to sovereignty.",
      ],
      images: [ind1],
    },

    {
      key: "neutrality",
      title: "Arch of Neutrality",
      afterItems1: [
        "Arch of Neutrality (also sometimes called Monument of Neutrality) was built in 1998 to mark the country’s official policy of neutrality in international affairs.",
        "The structure originally stood in central Ashgabat; its distinctive three-pylon “tripod” arch was topped by a 12-meter gilded statue of the country’s first president, which — famously — rotated to always face the sun.",
        "Because of urban redesign and political changes, the monument was later moved to the southern outskirts of the city — though it remains a major landmark and still offers a panoramic view of Ashgabat from its observation platform.",
      ],
    },

    {
      key: "museum",
      title: "State Museum of History of Turkmenistan",
      afterItems2: [
        "State Museum of History of Turkmenistan (sometimes called National Museum) is the main museum institution in Ashgabat dedicated to preserving the country’s history, culture, and ethnography.",
        "Its collection spans archaeology, ethnography, cultural heritage, art, and historical artifacts; it showcases ancient finds, traditional life exhibits, and more recent history of Turkmenistan.",
        "As such, the museum serves both as a cultural-educational institution and a major tourist attraction for those wanting to understand Turkmen history from ancient times to modern independence.",
      ],
    },

    {
      key: "carpet",
      title: "Turkmen Carpet Museum",
      afterItems3: [
        "Turkmen Carpet Museum is a specialized museum in Ashgabat devoted entirely to the art of Turkmen carpet weaving.",
        "It houses one of the world’s largest collections of Turkmen carpets, featuring rare antique examples and massive ceremonial carpets woven by master artisans.",
        "Each design represents tribal symbolism, regional patterns, and centuries-old traditions passed down through generations.",
        "The museum also holds a Guinness World Record for the world’s largest handwoven carpet.",
      ],
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
          <h1>Ashgabat, Turkmenistan</h1>
        </div>
        <img src={AshgabatHero} loading="lazy" className={styles.heroImage} />

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

      {/* RIGHT SIDE — Tours */}
      <div className={styles.right}>
        {ashgabatTours.map((tour) => (
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
