import { useEffect, useState } from "react";
import styles from "./Bukhara.module.scss";
import BukharaImg from "../../../../assets/Cities/Bukhara/Ark Fortress.jpg";
import { useNavigate } from "react-router-dom";

import lyabi from "../../../../assets/Cities/Bukhara/Labi-Xovuz.png";
import lyabi1 from "../../../../assets/Cities/Bukhara/Lyabi-Hauz 3.jpg";
import lyabi2 from "../../../../assets/Cities/Bukhara/Lyabi-Khauz-4.jpg";
import kalyan from "../../../../assets/Cities/Bukhara/Kalyan Minaret and Mosque.jpg";
import kalyan1 from "../../../../assets/Cities/Bukhara/Kalyan Minaret and Mosque 1.jpg";
import kalyan2 from "../../../../assets/Cities/Bukhara/Kalyan Minaret and Mosque 2.jpg";
import ark from "../../../../assets/Cities/Bukhara/Ark Fortress.jpg";
import ark1 from "../../../../assets/Cities/Bukhara/Ark Fortress (2).jpg";
import ark2 from "../../../../assets/Cities/Bukhara/Ark Fortress 3.jpg";
import samadin from "../../../../assets/Cities/Bukhara/Мавзолей Саманидов.png";
import samadin1 from "../../../../assets/Cities/Bukhara/samanid-mausoleum 2.jpg";
import samadin2 from "../../../../assets/Cities/Bukhara/Samanid Mausoleum 3.jpg";
import bolo1 from "../../../../assets/Cities/Bukhara/Bolo hauz Mosque.jpg";
import bolo2 from "../../../../assets/Cities/Bukhara/Bolo-Hauz Mosque 2.jpg";
import bolo3 from "../../../../assets/Cities/Bukhara/Bolo-Hauz Mosque 4.jpg";
import bolo4 from "../../../../assets/Cities/Bukhara/Bolo-Hauz Mosque 4.jpg";
import bolo5 from "../../../../assets/Cities/Bukhara/Bolo-Hauz Mosque 6.jpg";
import chor1 from "../../../../assets/Cities/Bukhara/Chor-Minor.jpg";
import chor2 from "../../../../assets/Cities/Bukhara/Chor-Minor 1.jpg";
import chor3 from "../../../../assets/Cities/Bukhara/Chor-Minor 2.jpg";

import magoki from "../../../../assets/Cities/Bukhara/мечеть Магоки-Аттари.jpg";

import shop from "../../../../assets/Cities/Bukhara/shop.png";
import shop1 from "../../../../assets/Cities/Bukhara/shop1.jpg";
import shop2 from "../../../../assets/Cities/Bukhara/shop3.jpg";
import shop3 from "../../../../assets/Cities/Bukhara/shop4.jpg";
import shop4 from "../../../../assets/Cities/Bukhara/shop5.jpg";

export default function BukharaPage() {
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

  /* IMAGES */
  useEffect(() => {
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((r) => r.json())
      .then((d) => setImages(d));
  }, []);

  const getTourImage = (tour) => {
    const match = images.filter((img) => img.alternativeText === tour.title);
    return match[0]?.url || "https://via.placeholder.com/400x400";
  };

  const bukharaTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("bukhara")
  );

  /* --- SECTIONS FROM FILE --- */
  const sections = [
    {
      key: "history",
      title: "History",
      paragraphs: [
        "The history of Bukhara goes back thousands of years, beginning with Aryan settlement in the region. The city of Bukhara, now the capital of the Bukhara Region (viloyat) of Uzbekistan, is located on the Silk Road and has long been a centre of trade, scholarship, culture, and religion.",
        "During the Golden age of Islam, under the rule of Samanids, Bukhara became the intellectual centre of the Islamic world. In medieval times, Bukhara served as the capital of the Khanate of Bukhara and was the birthplace of Imam Bukhari.",
        "UNESCO has listed the historic centre of Bukhara, which contains numerous mosques and madrassas, as one of the World Heritage Sites.",
        "Bukhara functioned as one of the main centres of Persian civilization from its early days in the 6th century BCE. Its architectural and archaeological sites form one of the pillars of Central Asian history and art.",
      ],
      images: [],
    },
    {
      key: "landmarks",
      title: "Cultural Landmarks",
      paragraphs: ["Lyabi-Hauz Ensemble"],
      items: [
        "Lyabi-Hauz Ensemble is one of the most important historical squares in Bukhara, formed around a large water reservoir (hauz).",
        "The complex dates back to the 16th–17th centuries and includes religious and educational buildings. It served as a social and cultural center for residents and travelers.",
        "Lyabi-Hauz remains a popular gathering place reflecting the traditional urban design of Central Asia.",
      ],
      images: [lyabi, lyabi1, lyabi2],

      afterParagraphs: ["Kalyan Minaret and Mosque"],
      afterItems: [
        "The Kalyan Minaret and Mosque are iconic symbols of Bukhara’s Islamic heritage.",
        "Built in the 12th century, the minaret was used both for the call to prayer and as a city landmark.",
        "The mosque complex could accommodate thousands of worshippers during major religious events. Its architectural scale and decorative brickwork demonstrate the advanced engineering of the Karakhanid period.",
      ],
      afterImages: [kalyan, kalyan1, kalyan2],

      afterParagraphs1: ["Ark Fortress"],
      afterItems1: [
        "Ark Fortress is an ancient citadel that served as the political and administrative center of Bukhara for centuries. It was the residence of emirs and housed government offices, courts, and military barracks.",
        "Archaeological evidence indicates continuous use of the fortress from at least the 5th century.",
        "Ark Fortress functions as an open-air museum illustrating the city’s ruling history.",
      ],
      afterImages1: [ark, ark1, ark2],

      afterParagraphs2: ["Samanid Mausoleum"],
      afterItems2: [
        "The Samanid Mausoleum is one of the oldest surviving Islamic monuments in Central Asia, dating to the 9th–10th centuries. It was built as a family tomb for the Samanid dynasty.",
        "The structure is renowned for its symmetrical design and intricate brick patterns. The mausoleum represents a transition between pre-Islamic and Islamic architectural traditions.",
      ],
      afterImages2: [samadin, samadin1, samadin2],

      afterParagraphs3: ["Bolo-Hauz Mosque"],
      afterItems3: [
        "Bolo-Hauz Mosque was constructed in the early 18th century and served as a Friday mosque for the emir and officials. It is famous for its wooden columns decorated with colorful carvings.",
        "The mosque is located near a water pool that enhanced its visual prominence. It remains an important example of traditional Bukharan religious architecture.",
      ],
      afterImages3: [bolo1, bolo2, bolo3, bolo4, bolo5],

      afterParagraphs4: ["Chor-Minor"],
      afterItems4: [
        "Chor-Minor is a unique architectural monument distinguished by its four turquoise-domed towers. ",
        "Built in the early 19th century, it originally served as a gatehouse for a madrasa. Each tower features different decorative elements, symbolizing cultural diversity.",
        "Chor-Minor stands as one of the most recognizable landmarks in Bukhara.",
      ],
      afterImages4: [chor1, chor2, chor3],

      afterParagraphs5: ["Magok-i-Attari Mosque"],
      afterItems5: [
        "Magok-i-Attari Mosque is one of the oldest religious sites in Bukhara, with origins dating back to pre-Islamic times. It was built on the site of an ancient market and later reconstructed as a mosque. ",
        "The building is partially sunken due to centuries of urban development. Its architectural layers reflect the long religious and cultural history of the city.",
      ],
      afterImages5: [magoki],
    },
    {
      key: "shopping",
      title: "Shopping & Leisure",
      paragraphs: ["Trading Domes (Covered Bazaars)"],
      items: [
        "Traditional bazaars perfect for carpets, silk, spices, and souvenirs.",
        "Their history dates back to the Silk Road era.",
        "Domed structures protect goods from heat and rain.",
      ],
      images: [shop, shop1, shop2, shop3, shop4],
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
                <img src={src} alt="" loading="lazy" />
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
          <h1>Bukhara, Uzbekistan</h1>
        </div>
        <img src={BukharaImg} className={styles.heroImage} loading="lazy" />

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
                className={styles.singleImage}
                loading="lazy"
              />
            )}

            {/* AFTER PARAGRAPHS */}
            {sec.afterParagraphs?.map((p, i) => (
              <p
                key={`ap${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems && (
              <ul className={styles.bulletList}>
                {sec.afterItems.map((item, i) => (
                  <li key={`ai${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages &&
              (sec.afterImages.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages} />
              ) : (
                sec.afterImages.map((src, i) => (
                  <img
                    key={`aimg${i}`}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER 1 */}
            {sec.afterParagraphs1?.map((p, i) => (
              <p
                key={`ap1${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems1 && (
              <ul className={styles.bulletList}>
                {sec.afterItems1.map((item, i) => (
                  <li key={`ai1${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages1 &&
              (sec.afterImages1.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages1} />
              ) : (
                sec.afterImages1.map((src, i) => (
                  <img
                    key={`aimg1${i}`}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER 2 */}
            {sec.afterParagraphs2?.map((p, i) => (
              <p
                key={`ap2${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems2 && (
              <ul className={styles.bulletList}>
                {sec.afterItems2.map((item, i) => (
                  <li key={`ai2${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages2 &&
              (sec.afterImages2.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages2} />
              ) : (
                sec.afterImages2.map((src, i) => (
                  <img
                    key={`aimg2${i}`}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER 3 */}
            {sec.afterParagraphs3?.map((p, i) => (
              <p
                key={`ap3${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems3 && (
              <ul className={styles.bulletList}>
                {sec.afterItems3.map((item, i) => (
                  <li key={`ai3${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages3 &&
              (sec.afterImages3.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages3} />
              ) : (
                sec.afterImages3.map((src, i) => (
                  <img
                    key={`aimg3${i}`}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER 4 */}
            {sec.afterParagraphs4?.map((p, i) => (
              <p
                key={`ap4${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems4 && (
              <ul className={styles.bulletList}>
                {sec.afterItems4.map((item, i) => (
                  <li key={`ai4${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages4 &&
              (sec.afterImages4.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages4} />
              ) : (
                sec.afterImages4.map((src, i) => (
                  <img
                    key={`aimg4${i}`}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER 5 */}
            {sec.afterParagraphs5?.map((p, i) => (
              <p
                key={`ap5${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems5 && (
              <ul className={styles.bulletList}>
                {sec.afterItems5.map((item, i) => (
                  <li key={`ai5${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages5 &&
              (sec.afterImages5.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages5} />
              ) : (
                sec.afterImages5.map((src, i) => (
                  <img
                    key={`aimg5${i}`}
                    src={src}
                    className={styles.singleImage}
                    loading="lazy"
                  />
                ))
              ))}
          </section>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>
        {bukharaTours.map((tour) => (
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
