import { useEffect, useState } from "react";
import styles from "./Erevan.module.scss";
import ErevanHero from "../../../assets/Cities/Erevan/Eravan.png";
import { useNavigate } from "react-router-dom";

/* Yerevan */
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
      items: [
        "Armenia is one of the world’s oldest nations, with a cultural legacy dating back over three millennia. The early Armenian state traces its roots to the Kingdom of Urartu (9th–6th century BC), centered around Lake Van.",
        "After the fall of Urartu, Armenians formed their own kingdom, and by the 6th century BC the region became widely known as Armenia. Under Tigranes the Great in the 1st century BC, Armenia briefly became a regional empire stretching from the Mediterranean to the Caspian Sea.",
        "A major turning point in Armenian history occurred in 301 AD, when Armenia became the first country to adopt Christianity as a state religion. This milestone shaped Armenian identity and inspired the creation of the Armenian alphabet in 405 AD by Mesrop Mashtots.",
        "Throughout the Middle Ages, powerful Armenian kingdoms emerged, including Bagratid Armenia and the Cilician Armenian Kingdom, which played key roles in regional trade and culture.",
        "Across the centuries, Armenia was influenced or ruled by major empires including the Byzantine, Persian, Arab, Ottoman, and Russian empires.",
        "One of the darkest chapters in Armenian history is the Armenian Genocide (1915–1917), during which over a million Armenians perished in the Ottoman Empire.",
        "Following brief independence in 1918, Armenia became part of the Soviet Union until its dissolution.",
        "Since declaring independence in 1991, Armenia has developed as a sovereign republic known for its ancient monasteries, dramatic mountain landscapes, and rich cultural heritage.",
      ],
      images: [],
    },

    {
      key: "garni",
      title: "Garni Temple",
      items: [
        "Garni Temple is the only preserved Greco-Roman colonnaded temple in Armenia. ",
        "Built in the 1st century AD, it was dedicated to the sun god Mihr. The temple stands dramatically above the Azat River gorge, offering panoramic views of the surrounding mountains.",
        "Garni Temple represents Armenia’s pre-Christian heritage and classical architectural influence. It remains one of the country’s most visited historical landmarks.",
      ],
      images: [garni1, garni2, garni3],
    },

    {
      key: "geghard",
      title: "Geghard Monastery",
      afterItems: [
        "Geghard Monastery is a UNESCO World Heritage Site carved partially into solid rock. ",
        "Dating back to the 4th century, it is renowned for its unique rock-cut churches and chambers.",
        "The monastery was an important spiritual and cultural center of medieval Armenia. Its name means “Monastery of the Spear,” linked to the Holy Lance.",
        "Geghard is admired for its harmony with the natural landscape and acoustic interiors.",
      ],
      afterImages: [geghard2, geghard3, geghard5],
    },

    {
      key: "khor",
      title: "Khor Virap",
      afterItems1: [
        "Khor Virap is a historic monastery located near the Armenian-Turkish border with iconic views of Mount Ararat. It is closely associated with Saint Gregory the Illuminator, who was imprisoned here in the 4th century.",
        "The site played a key role in the adoption of Christianity as Armenia’s state religion. Today, Khor Virap is an important pilgrimage and tourist destination. ",
        "Its location makes it one of the most photographed sites in Armenia.",
      ],
      afterImages1: [khor1, khor2, khor3],
    },

    {
      key: "sevan",
      title: "Lake Sevan",
      afterItems2: [
        "Lake Sevan is the largest freshwater lake in Armenia and one of the highest alpine lakes in the world.",
        "Situated at an altitude of about 1,900 meters, it is a vital source of water and biodiversity ",
        "Lake Sevan plays an important role in Armenia’s ecology, economy, and tourism. It is a popular destination for summer отдых and cultural visits. The lake is surrounded by beaches, monasteries, and resort towns. ",
      ],
      afterImages2: [sevan1, sevan2, sevan3],
    },
    {
      key: "noravank",
      title: "Noravank Monastery",
      afterItems3: [
        "Noravank Monastery is a 13th-century religious complex set within a dramatic red rock canyon. It was an important spiritual and cultural center during medieval times.",
        "The monastery is known for its intricate stone carvings and the two-storey Surb Astvatsatsin Church. ",
        "Noravank is closely associated with the architect and sculptor Momik. Its scenic location makes it one of Armenia’s most picturesque monuments.",
      ],
      afterImages3: [nor1, nor2, nor3],
    },

    {
      key: "tatev",
      title: "Tatev Monastery & Wings of Tatev",
      afterItems4: [
        "Tatev Monastery is a 9th-century monastic complex located on a cliff edge in southern Armenia. It once served as a major religious and educational center.",
        "The monastery is accessible via the Wings of Tatev, the world’s longest reversible aerial tramway. ",
        "This engineering achievement offers breathtaking views of the Vorotan Gorge. Together, they form one of Armenia’s top cultural and adventure tourism attractions.",
      ],
      afterImages4: [tat1, tat2, tat3],
    },

    {
      key: "zvartnots",
      title: "Zvartnots Cathedral Ruins",
      afterItems5: [
        "Zvartnots Cathedral Ruins are the remains of a 7th-century circular cathedral near Yerevan.",
        "The site is a UNESCO World Heritage Site recognized for its innovative architectural design.",
        "Although destroyed by an earthquake, the ruins reveal advanced engineering techniques of early Armenian architecture. ",
        "Zvartnots once symbolized the power of the Armenian Church. Today, it is an important archaeological and historical landmark.",
      ],
      afterImages5: [zv1, zv2, zv3],
    },
    {
      key: "Yerevan Republic Square & Cascade Complex",
      title: "Yerevan Republic Square & Cascade Complex",
      afterItems6: [
        "Zvartnots Cathedral Ruins are the remains of a 7th-century circular cathedral near Yerevan.",
        "The site is a UNESCO World Heritage Site recognized for its innovative architectural design.",
        "Although destroyed by an earthquake, the ruins reveal advanced engineering techniques of early Armenian architecture. ",
        "Zvartnots once symbolized the power of the Armenian Church. Today, it is an important archaeological and historical landmark.",
      ],
      afterImages6: [er2],
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
        <div className={styles.h1text}>
          <h1>Yerevan - capital of Armenia</h1>
        </div>
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
            {/* AFTER GROUP 5 */}
            {sec.afterParagraphs4?.map((p, i) => (
              <p key={i}>
                <strong>{p}</strong>
              </p>
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
            {/* AFTER GROUP 6 */}
            {sec.afterParagraphs5?.map((p, i) => (
              <p key={i}>
                <strong>{p}</strong>
              </p>
            ))}
            {sec.afterItems5 && (
              <ul className={styles.bulletList}>
                {sec.afterItems5.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {sec.afterImages5 &&
              (sec.afterImages5.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages5} />
              ) : (
                sec.afterImages5.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}
            {sec.afterItems6 && (
              <ul className={styles.bulletList}>
                {sec.afterItems6.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {sec.afterImages6 &&
              (sec.afterImages6.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages6} />
              ) : (
                sec.afterImages6.map((src, i) => (
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
