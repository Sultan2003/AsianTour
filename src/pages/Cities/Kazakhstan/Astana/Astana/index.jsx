import { useEffect, useState } from "react";
import styles from "./Astana.module.scss"; // SAME SCSS, same classnames
import { useNavigate } from "react-router-dom";

/* HERO IMAGE */
import Astana from "../../../../../assets/Cities/Kazakhstan/Astana 2.jpg";

/* Botanical Garden */
import botanical1 from "../../../../../assets/Cities/Kazakhstan/Astana Botanical Garden 1.jpg";
import botanical2 from "../../../../../assets/Cities/Kazakhstan/Astana Botanical Garden 2.jpg";
import botanical3 from "../../../../../assets/Cities/Kazakhstan/Astana Botanical Garden 3.jpg";

/* Baiterek Tower */
import baiterek1 from "../../../../../assets/Cities/Kazakhstan/Baiterek Tower 1.jpg";
import baiterek2 from "../../../../../assets/Cities/Kazakhstan/Baiterek Tower 2.jpg";
import baiterek3 from "../../../../../assets/Cities/Kazakhstan/Baiterek Tower 3.jpg";

/* Hazrat Sultan Mosque */
import hazrat1 from "../../../../../assets/Cities/Kazakhstan/Hazrat Sultan Mosque 1.jpg";
import hazrat2 from "../../../../../assets/Cities/Kazakhstan/Hazrat Sultan Mosque 2.jpg";
import hazrat3 from "../../../../../assets/Cities/Kazakhstan/Hazrat Sultan Mosque 3.jpg";
import hazrat4 from "../../../../../assets/Cities/Kazakhstan/Hazrat Sultan Mosque 4.jpg";
import hazrat5 from "../../../../../assets/Cities/Kazakhstan/Hazrat Sultan Mosque 5.jpg";

/* Independence Square */
import independence1 from "../../../../../assets/Cities/Kazakhstan/Independence Square (Kazakh Eli Square) 1.jpg";

/* Khan Shatyr */
import khanShatyr from "../../../../../assets/Cities/Kazakhstan/Khan Shatyr Entertainment Center.jpg";

/* Palace of Peace */
import palacePeace from "../../../../../assets/Cities/Kazakhstan/Palace of Peace and Reconciliation (The Pyramid).jpg";

export default function AstanaPage() {
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  /* TOURS API — Kazakhstan */
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

  const astanaTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("astana")
  );

  /* CAROUSEL COMPONENT (SAME AS TASHKENT) */
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

  /* CONTENT SECTIONS FOR ASTANA */
  const sections = [
    {
      key: "history",
      title: "History",
      paragraphs: [
        "Astana, formerly Akmolinsk, began as a Cossack fort in 1830.",
        "During Soviet times it became Tselinograd under the Virgin Lands campaign.",
        "In 1997, Kazakhstan moved the capital from Almaty to Akmola.",
        "In 1998, the city was renamed Astana, meaning “capital.”",
        "Astana developed rapidly under a master plan by architect Kisho Kurokawa.",
      ],
      images: [],
    },

    /* LANDMARKS */
    {
      key: "landmarks",
      title: "Cultural Landmarks",

      /* BAITEREK */
      paragraphs: ["Baiterek Tower"],
      items: [
        "Symbol of the Tree of Life and the sacred bird Samruk.",
        "Panoramic 360° views of the capital.",
        "One of the most famous icons of Kazakhstan.",
      ],
      images: [baiterek1, baiterek2, baiterek3],

      /* KHAN SHATYR */
      afterParagraphs: ["Khan Shatyr Entertainment Center"],
      afterItems: [
        "Designed by Norman Foster; world’s largest tent structure.",
        "Indoor beach, shops, cafes, and entertainment.",
        "Symbolizes a modern version of the traditional Kazakh yurt.",
      ],
      afterImages: [khanShatyr],

      /* PALACE OF PEACE */
      afterParagraphs1: ["Palace of Peace and Reconciliation (The Pyramid)"],
      afterItems1: [
        "Designed by Norman Foster for interfaith and cultural conferences.",
        "Hosts opera halls, meeting rooms, and cultural exhibitions.",
        "Symbol of unity among nations and religions.",
      ],
      afterImages1: [palacePeace],

      /* HAZRAT SULTAN MOSQUE */
      afterParagraphs2: ["Hazrat Sultan Mosque"],
      afterItems2: [
        "One of the largest mosques in Central Asia.",
        "Features traditional Islamic architecture, domes, and calligraphy.",
        "A spiritual and cultural center of the capital.",
      ],
      afterImages2: [hazrat1, hazrat2, hazrat3, hazrat4, hazrat5],

      /* INDEPENDENCE SQUARE */
      afterParagraphs3: ["Independence Square (Kazakh Eli Square)"],
      afterItems3: [
        "Central ceremonial square of Astana.",
        "Home to the Kazakh Eli monument — symbol of independence.",
        "Surrounded by major cultural and government buildings.",
      ],
      afterImages3: [independence1],

      /* BOTANICAL GARDEN */
      afterParagraphs4: ["Astana Botanical Garden"],
      afterItems4: [
        "One of the largest urban green zones.",
        "Walking paths, diverse plants, and trees from different regions.",
        "A natural contrast to the futuristic architecture of Astana.",
      ],
      afterImages4: [botanical1, botanical2, botanical3],
    },

    /* TRANSPORT */
    {
      key: "transport",
      title: "City Transport",
      paragraphs: [
        "Astana has a modern and efficient transportation system.",
        "The city uses buses, BRT lines, taxis, and modern infrastructure.",
      ],
      items: [
        "Public buses cover entire city.",
        "Modern BRT routes connect districts.",
        "Taxi services include Yandex, Uber, and inDriver.",
      ],
      images: [],
      afterParagraphs: [],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={Astana} loading="lazy" className={styles.heroImage} />

        {/* NAV MENU */}
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
                .getElementById("transport")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            City Transport
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        {sections.map((sec) => (
          <section key={sec.key} id={sec.key} className={styles.section}>
            <h3>{sec.title}</h3>

            {sec.paragraphs?.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
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

            {/* after groups ------------------------- */}
            {sec.afterParagraphs?.map((p, i) => (
              <p
                key={`afterP${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
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

            {/* after group 1 */}
            {sec.afterParagraphs1?.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
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
                    key={`img1${i}`}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* after group 2 */}
            {sec.afterParagraphs2?.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
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

            {/* after group 3 */}
            {sec.afterParagraphs3?.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems3 && (
              <ul className={styles.bulletList}>
                {sec.afterItems3.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages3 &&
              (sec.afterImages3.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages3} />
              ) : (
                sec.afterImages3.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* after group 4 */}
            {sec.afterParagraphs4?.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems4 && (
              <ul className={styles.bulletList}>
                {sec.afterItems4.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages4 &&
              (sec.afterImages4.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages4} />
              ) : (
                sec.afterImages4.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}
          </section>
        ))}
      </div>

      {/* RIGHT SIDE — SAME AS TASHKENT */}
      <div className={styles.right}>
        {astanaTours.map((tour) => (
          <div
            key={tour.id}
            className={styles.tourCard}
            
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
