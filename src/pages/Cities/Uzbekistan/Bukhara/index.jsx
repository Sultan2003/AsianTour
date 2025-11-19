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
        "A picturesque square centered around a pond, surrounded by historic madrasas and tea houses.",
        "A great spot to relax and enjoy traditional architecture.",
      ],
      images: [lyabi, lyabi1, lyabi2],

      afterParagraphs: ["Kalyan Minaret and Mosque"],
      afterItems: [
        "The iconic 12th-century minaret, part of the Po-i-Kalyan complex.",
        "Famous as the ‘Tower of Death’ historically, offering stunning views.",
      ],
      afterImages: [kalyan, kalyan1, kalyan2],

      afterParagraphs1: ["Ark Fortress"],
      afterItems1: [
        "An ancient citadel that served as residence of Bukhara’s rulers.",
        "Contains museums and preserved royal chambers.",
      ],
      afterImages1: [ark, ark1, ark2],

      afterParagraphs2: ["Samanid Mausoleum"],
      afterItems2: [
        "One of the oldest Islamic monuments in Central Asia.",
        "Known for its incredible baked brickwork from the 9th–10th centuries.",
      ],
      afterImages2: [samadin, samadin1, samadin2],

      afterParagraphs3: ["Bolo-Hauz Mosque"],
      afterItems3: [
        "Famous for elegant wooden pillars and peaceful courtyard.",
      ],
      afterImages3: [bolo1, bolo2, bolo3, bolo4, bolo5],

      afterParagraphs4: ["Chor-Minor"],
      afterItems4: ["A small but unique mosque with four distinct minarets."],
      afterImages4: [chor1, chor2, chor3],

      afterParagraphs5: ["Magok-i-Attari Mosque"],
      afterItems5: [
        "Built over a Zoroastrian temple, showcasing layers of Bukhara’s history.",
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
      <div className={styles.left}>
        <img src={BukharaImg} className={styles.heroImage} />

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
              <img src={sec.images[0]} className={styles.singleImage} />
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
      </div>
    </div>
  );
}
