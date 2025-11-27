import { useEffect, useState } from "react";
import styles from "./Tashkent.module.scss";
import Tashkent from "../../../../assets/Cities/tashkent.jpg";
import { useNavigate } from "react-router-dom";

/* History */
import history1 from "../../../../assets/Cities/Tashkent City Images/Old Tashkent.jpg";
import history3 from "../../../../assets/Cities/Tashkent City Images/Old Tashkent 3.jpg";
import history4 from "../../../../assets/Cities/Tashkent City Images/Old Tashkent 4.jpg";

/* Landmarks */
import landmark1 from "../../../../assets/Cities/Tashkent City Images/Kukeldash Madrasah.jpg";
import landmark2 from "../../../../assets/Cities/Tashkent City Images/kukeldash-madrasah 1.jpg";
import landmark4 from "../../../../assets/Cities/Tashkent City Images/kukeldash-madrasah 2.jpg";

import landmark5 from "../../../../assets/Cities/Tashkent City Images/Independence Square 1.jpg";
import landmark6 from "../../../../assets/Cities/Tashkent City Images/independence_square 2.jpg";
import landmark7 from "../../../../assets/Cities/Tashkent City Images/Independence Square.jpg";

import landmark8 from "../../../../assets/Cities/Tashkent City Images/Amir Timur Museum 1.jpg";

import landmark9 from "../../../../assets/Cities/Tashkent City Images/Amir Temur Statue.jpg";

import landmark10 from "../../../../assets/Cities/Tashkent City Images/Minor Mosque (White Mosque) 1.jpg";
import landmark11 from "../../../../assets/Cities/Tashkent City Images/Minor mosque (white mosque) 3.png";
import landmark12 from "../../../../assets/Cities/Tashkent City Images/Minor Mosque (White Mosque) 2.jpg";

import landmark14 from "../../../../assets/Cities/Tashkent City Images/Khazrati Ali Mosque 1.jpg";
import landmark15 from "../../../../assets/Cities/Tashkent City Images/Khazrati Ali Mosque 2.jpg";
import landmark16 from "../../../../assets/Cities/Tashkent City Images/Khazrati Ali Mosque 4.jpg";
import landmark17 from "../../../../assets/Cities/Tashkent City Images/Khazrati Ali Mosque 3.jpg";
import landmark18 from "../../../../assets/Cities/Tashkent City Images/Khazrati Ali Mosque 5.jpg";

/* Food */
import food1 from "../../../../assets/Cities/Tashkent City Images/Osh (2).jpg";
import food2 from "../../../../assets/Cities/Tashkent City Images/Plov 1.jpg";
import food3 from "../../../../assets/Cities/Tashkent City Images/Самса.jpg";

/* Shopping */
import landmark13 from "../../../../assets/Cities/Tashkent City Images/State Museum of History.jpg";

import shopping1 from "../../../../assets/Cities/Tashkent City Images/Bazar Chorsu 3.webp";
import shopping2 from "../../../../assets/Cities/Tashkent City Images/Bazar Chorsu 2.jpg";
import shopping3 from "../../../../assets/Cities/Tashkent City Images/Bazar Chorsu 4.jpg";

import transport1 from "../../../../assets/Cities/Tashkent City Images/Tashkent Subway Station.jpg";
import transport2 from "../../../../assets/Cities/Tashkent City Images/Alisher Navio Subway Station.jpg";
import transport3 from "../../../../assets/Cities/Tashkent City Images/Kosmonavtlar Subway Station.jpg";
import transport4 from "../../../../assets/Cities/Tashkent City Images/Mustaqillik Maydoni  Subway Station.jpg";
import transport5 from "../../../../assets/Cities/Tashkent City Images/Yunus Rajabiy Subway Station.jpg";
import transport6 from "../../../../assets/Cities/Tashkent City Images/Paxtakor Subway Station.png";

export default function TashkentPage() {
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

  const tashkentTours = tours.filter((t) =>
    (t.tour_type || "").toLowerCase().includes("tashkent")
  );

  /* CONTENT SECTIONS */
  const sections = [
    {
      key: "history",
      title: "History",
      paragraphs: [
        "Tashkent, the capital of Uzbekistan, is one of the oldest cities in Central Asia, with a history spanning over 2,000 years. It began as a small oasis settlement along the Great Silk Road, known in ancient times as Chach or Shash.",
        "Throughout history, Tashkent was ruled by various empires — Persian, Turkic, Mongol, and later the Timurid and Khanate of Kokand. In 1865, it was conquered by the Russian Empire, becoming an important administrative and trade center.",
        "During the Soviet era (1917–1991), Tashkent developed rapidly into a major industrial and cultural hub, especially after much of the city was rebuilt following a devastating earthquake in 1966.",
        "During the Soviet era (1917–1991), Tashkent developed rapidly into a major industrial and cultural hub, especially after much of the city was rebuilt following a devastating earthquake in 1966.",
      ],

      images: [history1, history3, history4],
    },
    {
      key: "landmarks",
      title: "Cultural Landmarks",
      paragraphs: ["Kukeldash Madrasah"],
      items: [
        "Built in the 16th century, it’s one of Central Asia’s largest and best-preserved madrasahs.",
        "Located near Chorsu Bazaar — beautiful courtyard, traditional brickwork, and history tours.",
      ],
      images: [landmark1, landmark2, landmark4],
      afterParagraphs: ["Independence Square"],
      afterItems: [
        "Mustaqillik Maydoni, or Independence Square, is the main square of Tashkent and a symbol of Uzbekistan’s freedom. It was formerly called Lenin Square but was renamed after the country gained independence in 1991. ",
        "Located near Chorsu Bazaar — beautiful courtyard, traditional brickwork, and history tours.",
      ],
      afterImages: [landmark6, landmark5, landmark7],

      afterParagraphs1: ["Amir Timur Museum"],
      afterItems1: [
        "The Amir Timur Museum in Tashkent is dedicated to the life and legacy of Amir Timur (Tamerlane), the great 14th-century conqueror and founder of the Timurid Empire. ",
        "Opened in 1996, it features a stunning blue-domed building inspired by traditional Islamic architecture. ",
        "Inside, the museum displays historical manuscripts, weapons, maps, and artifacts related to Timur’s era. It stands as a symbol of Uzbekistan’s rich history and national pride. ",
      ],
      afterImages1: [landmark8],

      afterParagraphs2: ["Amir Temur Square"],
      afterItems2: [
        "Amir Temur Square is one of the most famous landmarks in Tashkent, located in the heart of the city.",
        "At its center stands a bronze statue of Amir Temur on horseback, symbolizing strength and unity. ",
        "The square is surrounded by important buildings such as the Hotel Uzbekistan, Tashkent State University of Law, and the Amir Temur Museum. It serves as a popular meeting place and a cultural symbol of Uzbekistan’s proud history.",
      ],
      afterImages2: [landmark9],

      afterParagraphs3: ["Minor Mosque (White Mosque)"],
      afterItems3: [
        "Modern (opened in 2014), but stunning white marble and blue domes make it a must-see.",
        "Peaceful, located along the Ankhor Canal — great for photography.",
      ],
      afterImages3: [landmark11, landmark10, landmark12],

      afterParagraphs4: ["State Museum of History of Uzbekistan"],
      afterItems4: [
        "Holds artifacts from ancient Khorezm, Sogdiana, and Bactria civilizations.",
        "Tells the story of Uzbekistan from prehistoric to Soviet times. ",
      ],
      afterImages4: [landmark13],

      afterParagraphs5: ["Khazrati Ali Mosque"],
      afterItems5: [
        "Near the Hazrat Imam Complex; a less-crowded alternative with a peaceful atmosphere.",
        "Offers insight into Islamic architecture and local traditions",
      ],
      afterImages5: [
        landmark14,
        landmark15,
        landmark16,
        landmark17,
        landmark18,
      ],
    },

    {
      key: "food",
      title: "Foods in Tashkent",

      /* MAIN PARAGRAPHS */
      paragraphs: [
        "<strong>Traditional Uzbek Cuisine</strong>",
        "Most locals and tourists love trying:",
      ],

      /* MAIN LIST */
      items: [
        "Plov (rice with meat and carrots) – national dish",
        "Shashlik (grilled kebabs)",
        "Lagman (noodle soup)",
        "Samsa (meat pastry)",
        "These are usually halal and made from fresh local ingredients.",
      ],

      images: [food1, food2, food3],

      /* -----------------------------------------
      AFTER GROUP 1 — VEGETARIAN OPTIONS
  ------------------------------------------*/
      afterParagraphs: [
        [
          "🥗 <strong> Options for Vegetarians and Healthy Eaters</strong>",
          "While Uzbek cuisine is meat-heavy, Tashkent offers:",
        ],
      ],

      afterItems: [
        [
          "Salads and vegetable soups in most restaurants",
          "Pumpkin samsa, vegetable lagman, and non (bread)",
          "International cafés with vegan and vegetarian menus (Breadly, Angel’s Food Café, Coffee & Milk)",
        ],
      ],

      /* -----------------------------------------
      AFTER GROUP 2 — TEA CULTURE
  ------------------------------------------*/
      afterParagraphs1: [["🍵 <strong>Tea Culture & Desserts</strong>"]],

      afterItems1: [
        [
          "Green tea is the most common drink, served everywhere.",
          "Desserts include chak-chak (honey snack), halva, and baklava.",
          "Many cafés serve Uzbek sweets with coffee — perfect for relaxing afternoons.",
        ],
      ],
    },
    {
      key: "shopping",
      title: "Shopping & Leisure",

      paragraphs: ["<strong>Chorsu Bazar</strong>"],

      items: [
        "The Chorsu Bazar in Tashkent is one of the oldest and most famous bazaars in Central Asia, a true symbol of the city where modernity blends with the traditions of the past.",
        "Its history spans several centuries, dating back to the 14th century, when, under the reign of Tamerlane (Timur), Tashkent became an important trading hub on the Great Silk Road.",
        "Even then, the site of today's Chorsu was bustling with trade, and the bazaar itself was renowned far beyond the city's borders.",
        "The market received its name 'Chorsu,' which means 'four roads' in Persian, due to its location at the intersection of caravan routes.",
        "In the 16th century, during the reign of the Shaybanids, the market gained even greater significance: domes were erected to protect goods from the scorching sun and rain.",
        "One of these domes, renovated and rebuilt in the 20th century, has become the market's symbol, preserving its historical architecture.",
        "Today, the market is located beneath a majestic turquoise dome, which has become its signature feature.",
        "This dome houses numerous stalls offering a wide variety of goods: fresh fruits, vegetables, spices, meat, dairy products, dried fruits, and nuts.",
      ],

      images: [shopping2, shopping3, shopping1],
    },
    {
      key: "transport",
      title: "City Transport",

      paragraphs: [
        "<strong>1. Metro (Subway) — Tashkent Only</strong>",
        "Tashkent Metro is the oldest and only metro system in Central Asia, opened in 1977.",
      ],
      /* FIRST LIST */
      items: [
        "Tashkent Metro opened in 1977.",
        "It is the oldest and only metro system in Central Asia.",
      ],

      images: [transport1],

      
      afterItems: [
        "It’s clean, safe, cheap (around $0.10 per ride), and beautifully decorated — every station has unique architecture and mosaics.",
        "There are 4 main lines connecting almost all city districts and tourist spots.",
        "Best stations to see: Kosmonavtlar, Alisher Navoi, Pakhtakor, Mustaqillik Maydoni, Yunus Rajabiy Subway Station.",
      ],

     
      afterImages: [transport2, transport3, transport4, transport5, transport6], // Carousel group
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
            // circular distance between slides
            let diff = (i - active + imgs.length) % imgs.length;

            // shift range from [0, imgs.length-1] to negative/positive center
            if (diff > imgs.length / 2) diff -= imgs.length;

            // Now diff is -2, -1, 0, 1, 2 for 5 images
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

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={Tashkent} loading="lazy" className={styles.heroImage} />

        {/* NEW TABLE NAVIGATION */}
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
                .getElementById("food")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Foods in Tashkent
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

        {/* ALL SECTIONS (UNLIMITED PARAGRAPHS + IMAGES SUPPORT) */}
        {sections.map((sec) => (
          <section key={sec.key} id={sec.key} className={styles.section}>
            <h3>{sec.title}</h3>

            {/* BEFORE ITEMS PARAGRAPHS */}
            {sec.paragraphs?.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {/* ITEMS (main list) */}
            {sec.items && (
              <ul className={styles.bulletList}>
                {sec.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {/* CAROUSEL */}
            {sec.images?.length > 1 && <ThreeDCarousel imgs={sec.images} />}

            {/* SINGLE IMAGE */}
            {sec.images?.length === 1 && (
              <img
                src={sec.images[0]}
                loading="lazy"
                className={styles.singleImage}
              />
            )}

            {/* AFTER CAROUSEL PARAGRAPHS */}
            {sec.afterParagraphs?.map((p, i) => (
              <p
                key={`afterP${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {/* AFTER ITEMS */}
            {sec.afterItems && (
              <ul className={styles.bulletList}>
                {sec.afterItems.map((item, i) => (
                  <li key={`afterItem${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {/* AFTER IMAGES */}
            {sec.afterImages &&
              sec.afterImages.length > 0 &&
              (sec.afterImages.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages} />
              ) : (
                sec.afterImages.map((src, i) => (
                  <img
                    key={`afterImg${i}`}
                    src={src}
                    loading="lazy"
                    className={styles.singleImage}
                    alt=""
                  />
                ))
              ))}

            {/* AFTER PARAGRAPHS 1 */}
            {sec.afterParagraphs1?.map((p, i) => (
              <p
                key={`afterParagraphs1${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {/* AFTER ITEMS 1 */}
            {sec.afterItems1 && (
              <ul className={styles.bulletList}>
                {sec.afterItems1.map((item, i) => (
                  <li key={`afterItem1${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {/* AFTER IMAGES 1 */}
            {sec.afterImages1 &&
              sec.afterImages1.length > 0 &&
              (sec.afterImages1.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages1} />
              ) : (
                sec.afterImages1.map((src, i) => (
                  <img
                    key={`afterImg1${i}`}
                    src={src}
                    className={styles.singleImage}
                    alt=""
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER PARAGRAPHS 2 */}
            {sec.afterParagraphs2?.map((p, i) => (
              <p
                key={`afterParagraphs2${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {/* AFTER ITEMS 2 */}
            {sec.afterItems2 && (
              <ul className={styles.bulletList}>
                {sec.afterItems2.map((item, i) => (
                  <li key={`afterItem2${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {/* AFTER IMAGES 2 */}
            {sec.afterImages2 &&
              sec.afterImages2.length > 0 &&
              (sec.afterImages2.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages2} />
              ) : (
                sec.afterImages2.map((src, i) => (
                  <img
                    key={`afterImg2${i}`}
                    src={src}
                    className={styles.singleImage}
                    alt=""
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER PARAGRAPHS 3 */}
            {sec.afterParagraphs3?.map((p, i) => (
              <p
                key={`afterParagraphs3${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {/* AFTER ITEMS 3 */}
            {sec.afterItems3 && (
              <ul className={styles.bulletList}>
                {sec.afterItems3.map((item, i) => (
                  <li key={`afterItem3${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {/* AFTER IMAGES 3 */}
            {sec.afterImages3 &&
              sec.afterImages3.length > 0 &&
              (sec.afterImages3.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages3} />
              ) : (
                sec.afterImages3.map((src, i) => (
                  <img
                    key={`afterImg3${i}`}
                    src={src}
                    className={styles.singleImage}
                    alt=""
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER PARAGRAPHS 4 */}
            {sec.afterParagraphs4?.map((p, i) => (
              <p
                key={`afterParagraphs4${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {/* AFTER ITEMS 4 */}
            {sec.afterItems4 && (
              <ul className={styles.bulletList}>
                {sec.afterItems4.map((item, i) => (
                  <li key={`afterItem4${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {/* AFTER IMAGES 4 */}
            {sec.afterImages4 &&
              sec.afterImages4.length > 0 &&
              (sec.afterImages4.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages4} />
              ) : (
                sec.afterImages4.map((src, i) => (
                  <img
                    key={`afterImg4${i}`}
                    src={src}
                    className={styles.singleImage}
                    alt=""
                    loading="lazy"
                  />
                ))
              ))}

            {/* AFTER PARAGRAPHS 5 */}
            {sec.afterParagraphs5?.map((p, i) => (
              <p
                key={`afterParagraphs5${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {/* AFTER ITEMS 5 */}
            {sec.afterItems5 && (
              <ul className={styles.bulletList}>
                {sec.afterItems5.map((item, i) => (
                  <li key={`afterItem5${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {/* AFTER IMAGES 5 */}
            {sec.afterImages5 &&
              sec.afterImages5.length > 0 &&
              (sec.afterImages5.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages5} />
              ) : (
                sec.afterImages5.map((src, i) => (
                  <img
                    key={`afterImg5${i}`}
                    src={src}
                    className={styles.singleImage}
                    alt=""
                    loading="lazy"
                  />
                ))
              ))}
          </section>
        ))}
      </div>

      {/* RIGHT SIDE — DO NOT TOUCH */}
      <div className={styles.right}>
        {tashkentTours.map((tour) => (
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
