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
    /* ================= HISTORY ================= */
    {
      key: "history",
      title: "History",
      paragraphs: [],
      items: [
        "The city began as a small settlement called Akmolinsk, founded in 1830 as a Cossack fort.",
        "During Soviet times, under the Virgin Lands campaign, it became Tselinograd.",
        "After Kazakhstan gained independence, in 1997, the capital was moved from Almaty to Akmola.",
        "In 1998, Akmola was renamed Astana, which literally means “capital” in Kazakh.",
        "The city has rapidly modernized, growing in population, size, and infrastructure.",
        "There is a master plan for the city designed by the Japanese architect Kisho Kurokawa, giving much of its distinctive futuristic look.",
        "The city began as a small settlement called Akmolinsk, founded in 1830 as a Cossack fort.",
        "During Soviet times, under the Virgin Lands campaign, it became known as Tselinograd.",
        "After Kazakhstan gained independence, in 1997, the capital was moved from Almaty to Akmola.",
        "In 1998, Akmola was renamed Astana, which literally means “capital” in Kazakh.",
        "The city has rapidly modernized, growing in population, size, and infrastructure.",
        "There is a master plan for the city designed by the Japanese architect Kisho Kurokawa, giving much of Astana its distinctive futuristic look.",
      ],
      images: [],
    },

    /* ================= LANDMARKS ================= */
    {
      key: "landmarks",
      title: "Cultural Landmarks",

      /* BAITEREK */
      paragraphs: ["Baiterek Tower"],
      items: [
        "Baiterek Tower is the main symbol of Astana, representing the Kazakh legend of the Tree of Life and the sacred bird Samruk.",
        "The tower offers panoramic views of the modern capital from its glass observation deck.",
        "Its futuristic design reflects Kazakhstan’s vision for progress and national identity.",
        "It is one of the most visited attractions in the city.",
      ],
      images: [baiterek1, baiterek2, baiterek3],

      /* KHAN SHATYR */
      afterParagraphs: ["Khan Shatyr Entertainment Center"],
      afterItems: [
        "Khan Shatyr is a giant tent-shaped complex designed by Norman Foster and serves as a major cultural and recreational hub.",
        "Inside, visitors find shops, cafes, and even an indoor sandy beach.",
        "The building symbolizes the traditional Kazakh yurt in a modern form.",
        "It stands as one of Astana’s architectural icons.",
      ],
      afterImages: [khanShatyr],

      /* PALACE OF PEACE */
      afterParagraphs1: ["Palace of Peace and Reconciliation (The Pyramid)"],
      afterItems1: [
        "This pyramid-shaped building hosts international peace, cultural, and interfaith events.",
        "Designed by Norman Foster, it symbolizes unity among different nations and religions.",
        "Inside, there are conference halls, an opera hall, and cultural exhibitions.",
        "It is considered one of the most meaningful structures in the capital.",
      ],
      afterImages1: [palacePeace],

      /* HAZRAT SULTAN MOSQUE */
      afterParagraphs2: ["Hazrat Sultan Mosque"],
      afterItems2: [
        "The Hazrat Sultan Mosque is one of the largest in Central Asia and features traditional Islamic architecture.",
        "It includes beautifully decorated domes, spacious prayer halls, and ornate calligraphy.",
        "The mosque serves as both a spiritual and cultural center for visitors and locals.",
        "It is a key landmark representing Kazakh religious heritage.",
      ],
      afterImages2: [hazrat1, hazrat2, hazrat3, hazrat4, hazrat5],

      /* INDEPENDENCE SQUARE */
      afterParagraphs3: ["Independence Square (Kazakh Eli Square)"],
      afterItems3: [
        "Independence Square is the central ceremonial area of Astana, used for national events and celebrations.",
        "The Kazakh Eli monument, located here, symbolizes the country’s strength and unity.",
        "Surrounding buildings include major cultural and government institutions.",
        "It is an important gathering place for public life in the capital.",
      ],
      afterImages3: [independence1],

      /* TRIUMPHAL ARCH */
      afterParagraphs4: ["Triumphal Arch Mäñgilik El"],
      afterItems4: [
        "The Triumphal Arch symbolizes Kazakhstan’s independence and aspirations for a bright future.",
        "It features artistic sculptures representing history, culture, and peace.",
        "The structure stands as a gateway to the modern part of the city.",
        "It is a popular spot for photos and city tours.",
      ],
      afterImages4: [],

      /* BOTANICAL GARDEN */
      afterParagraphs5: ["Astana Botanical Garden"],
      afterItems5: [
        "The Botanical Garden is one of the largest urban green zones in the city, offering peaceful walking paths and diverse plant collections.",
        "It features flora from different regions of the world, including Asia, Europe, and North America.",
        "The garden is designed for both recreation and environmental education.",
        "It provides a natural contrast to Astana’s futuristic architecture.",
      ],
      afterImages5: [botanical1, botanical2, botanical3],

      /* JETISU PARK */
      afterParagraphs6: ["Jetisu Park"],
      afterItems6: [
        "Jetisu Park reflects the natural landscapes and culture of the Jetisu region of Kazakhstan.",
        "It contains fountains, bike paths, playgrounds, and large green spaces for families.",
        "The park blends cultural symbolism with modern recreational design.",
        "It is a popular place for relaxation and outdoor activities.",
      ],
      afterImages6: [],
    },

    /* ================= TRANSPORT ================= */
    {
      key: "transport",
      title: "City Transport",
      paragraphs: [
        "Astana has a modern and efficient transportation system.",
        "The city uses buses, BRT lines, taxis, and modern infrastructure.",
      ],
      items: [
        "Public buses cover the entire city.",
        "Modern BRT routes connect different districts.",
        "Taxi services include Yandex, Uber, and inDriver.",
      ],
      images: [],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.h1text}>
          <h1>Astana, Kazakhstan</h1>
        </div>
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
          <div key={tour.id} className={styles.tourCard}>
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
