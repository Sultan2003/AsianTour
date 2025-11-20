import { useEffect, useState } from "react";
import styles from "./Samarkand.module.scss";
import Samarkand from "../../../../assets/Cities/Samarkand/Registan Square Samarkand.jpg";
import { useNavigate } from "react-router-dom";

/* History — sample paths */
import history1 from "../../../../assets/Cities/Samarkand/Registan Square 2.jpg";
import history2 from "../../../../assets/Cities/Samarkand/Registan Square Samarkand.jpg";
import history3 from "../../../../assets/Cities/Samarkand/Registan Square.jpg";

/* Cultural Landmarks — sample paths */
import registan1 from "../../../../assets/Cities/Samarkand/Registan Square 2.jpg";
import registan2 from "../../../../assets/Cities/Samarkand/Registan Square Samarkand.jpg";
import registan3 from "../../../../assets/Cities/Samarkand/Registan Square.jpg";

import bibik1 from "../../../../assets/Cities/Samarkand/Bibi Khanym Mosque 3.jpg";
import bibik2 from "../../../../assets/Cities/Samarkand/Bibi Khanym Mosque 5.jpg";
import bibik3 from "../../../../assets/Cities/Samarkand/Bibi Khanym Mosque.jpg";

import shahizinda1 from "../../../../assets/Cities/Samarkand/Shah i Zinda Necropolis 1.jpg";
import shahizinda2 from "../../../../assets/Cities/Samarkand/Shah i Zinda Necropolis 2.jpg";
import shahizinda3 from "../../../../assets/Cities/Samarkand/Shah i Zinda Necropolis 3.jpg";
import shahizinda4 from "../../../../assets/Cities/Samarkand/shohizinda-196871_1920.jpg";
import shahizinda5 from "../../../../assets/Cities/Samarkand/shohizinda-196879_1920.jpg";

import guremir1 from "../../../../assets/Cities/Samarkand/Gur Emir Mausoleum 1.PNG";
import guremir2 from "../../../../assets/Cities/Samarkand/Gur Emir Mausoleum 3.jpg";
import guremir3 from "../../../../assets/Cities/Samarkand/Gur Emir Mausoleum 4.jpg";

/* Shopping — sample paths */
import siab1 from "../../../../assets/Cities/Samarkand/Siab Bazaar (Market) 1.jpg";
import siab2 from "../../../../assets/Cities/Samarkand/Siab Bazaar (Market) 4.jpg";
import siab3 from "../../../../assets/Cities/Samarkand/Siab Bazaar (Market).png";
import siab4 from "../../../../assets/Cities/Samarkand/siab-bazaar 2.jpg";
import siab5 from "../../../../assets/Cities/Samarkand/siab-bazaar 3.jpg";

/* Transport — sample paths */
import bus1 from "../../../../assets/Cities/Samarkand/Bus Transport.jpg";
import taxi1 from "../../../../assets/Cities/Samarkand/City Transport.jpg";
import tram1 from "../../../../assets/Cities/Samarkand/Tram.jpg";

export default function SamarkandPage() {
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const [toursLoading, setToursLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [toursError, setToursError] = useState(null);
  const [imagesError, setImagesError] = useState(null);

  const navigate = useNavigate();

  /* TOURS API */
  useEffect(() => {
    setToursLoading(true);
    setToursError(null);

    fetch(
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Uzbekistan"
    )
      .then((r) => {
        if (!r.ok) throw new Error("Tours request failed");
        return r.json();
      })
      .then((d) => setTours(d.data || []))
      .catch((err) => setToursError(err.message || "Failed to load tours"))
      .finally(() => setToursLoading(false));
  }, []);

  /* IMAGES API */
  useEffect(() => {
    setImagesLoading(true);
    setImagesError(null);

    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((r) => {
        if (!r.ok) throw new Error("Images request failed");
        return r.json();
      })
      .then((d) => setImages(d || []))
      .catch((err) => setImagesError(err.message || "Failed to load images"))
      .finally(() => setImagesLoading(false));
  }, []);

  /* Helper to map tour title -> uploaded image */
  const getTourImage = (tour) => {
    // match by alternativeText or name — fall back to placeholder
    const match =
      images?.filter?.((img) => {
        const alt = (img.alternativeText || "").toLowerCase();
        const name = (img.name || "").toLowerCase();
        const title = (tour.title || "").toLowerCase();
        return (
          alt === title ||
          name === title ||
          alt.includes(title) ||
          name.includes(title)
        );
      }) || [];

    return (
      match[0]?.url || "https://via.placeholder.com/400x300?text=Tour+Image"
    );
  };

  /* Filter tours for Samarkand (same logic as Tashkent page used 'tashkent') */
  const samarkandTours = (tours || []).filter((t) =>
    (t.tour_type || "").toLowerCase().includes("samarkand")
  );

  /* CONTENT SECTIONS */
  const sections = [
    {
      key: "history",
      title: "History",
      paragraphs: [
        "Samarkand is a historic city located in east-central Uzbekistan and is considered one of the oldest settlements in Central Asia. Known as Maracanda in the 4th century BCE, it once served as the capital of Sogdiana before being captured by Alexander the Great in 329 BCE.",
        "Over centuries, Samarkand came under the rule of the Central Asian Turks (6th century CE), the Arabs (8th century), the Samanids (9th–10th centuries), and several Turkic dynasties in the 11th–13th centuries.",
        "In the early 13th century, it was annexed by the Khwārezm-Shāh dynasty but was destroyed by Genghis Khan in 1220.",
        "After rebelling against Mongol control in 1365, the city rose to prominence again as the capital of Timur’s empire — the leading economic and cultural hub of Central Asia.",
        "In 1500, Samarkand was taken over by the Uzbeks and became part of the Bukhara Khanate. By the 18th century, it declined and was uninhabited for decades.",
        "Its revival began in 1887 as a provincial capital of the Russian Empire, later becoming a major railway center.",
        "From 1924 to 1936, Samarkand was the capital of the Uzbek SSR. Today, it blends its medieval core with modern Russian colonial-era districts.",
      ],
      images: [history1, history2, history3],
    },

    {
      key: "landmarks",
      title: "Cultural Landmarks",
      paragraphs: ["Registan Square"],
      items: [
        "The heart of Samarkand — an ensemble of three madrasas forming the most iconic sight of Uzbekistan.",
        "Famous for massive portals, intricate tiles, and majestic domes.",
        "A must-see photo spot, especially at golden hour.",
      ],
      images: [registan1, registan2, registan3],
      afterParagraphs: ["BibiKhanym Mosque"],
      afterItems: [
        "Built in the early 15th century under Timur — one of the largest Islamic buildings of its time.",
        "Impressive both in scale and architectural detail, perfect for history lovers.",
      ],
      afterImages: [bibik1, bibik2, bibik3],
      afterParagraphs1: ["Shahi-Zinda Necropolis"],
      afterItems1: [
        "A magnificent avenue of mausoleums decorated with turquoise tiles.",
        "One of the most photogenic places in Central Asia.",
        "The name means 'The Living King' — a major spiritual site.",
      ],
      afterImages1: [
        shahizinda1,
        shahizinda2,
        shahizinda3,
        shahizinda4,
        shahizinda5,
      ],
      afterParagraphs2: ["Gur-Emir Mausoleum"],
      afterItems2: [
        "The resting place of Timur (Tamerlane) and his descendants.",
        "A masterpiece of Timurid architecture.",
        "Famous for its massive blue dome and richly decorated interior.",
      ],
      afterImages2: [guremir1, guremir2, guremir3],
    },

    {
      key: "shopping",
      title: "Shopping & Leisure",
      paragraphs: ["<strong>Siab Bazaar</strong>"],
      items: [
        "The largest local market in Samarkand.",
        "A great place to experience everyday Uzbek life.",
        "Fresh fruits, spices, dried fruits, bread, handicrafts, and textiles.",
        "An essential stop to feel real Uzbek culture beyond monuments.",
      ],
      images: [siab1, siab2, siab3, siab4, siab5],
    },

    {
      key: "transport",
      title: "City Transport",
      paragraphs: [
        "<strong>Public Transport in Samarkand</strong>",
        "Samarkand has buses, taxis, and a newly restored tram system.",
      ],
      items: [
        "Buses – widely used by locals, very affordable.",
        "Taxis – Yandex Go & MyTaxi are available and convenient.",
      ],
      images: [bus1],
      afterParagraphs: ["Tram System"],
      afterItems: [
        "Samarkand Tram was reopened on April 15, 2017.",
        "The previous system (1947–1973) closed before being revived by presidential order.",
        "A clean and efficient way to move around the city.",
      ],
      afterImages: [tram1, taxi1],
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
      {/* LEFT — main content */}
      <div className={styles.left}>
        <img src={Samarkand} className={styles.heroImage} alt="Samarkand" loading="lazy"/>

        {/* TABLE NAVIGATION */}
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
              <img src={sec.images[0]} className={styles.singleImage} loading="lazy"/>
            )}

            {sec.afterParagraphs?.map((p, i) => (
              <p
                key={`afterP${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems && (
              <ul className={styles.bulletList}>
                {sec.afterItems.map((item, i) => (
                  <li key={`afterItem${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages &&
              (sec.afterImages.length > 1 ? (
                <ThreeDCarousel imgs={sec.afterImages} />
              ) : (
                sec.afterImages.map((src, i) => (
                  <img
                    key={`afterImg${i}`}
                    src={src}
                    className={styles.singleImage}
                    alt=""
                    loading="lazy"
                  />
                ))
              ))}

            {sec.afterParagraphs1?.map((p, i) => (
              <p
                key={`afterParagraphs1${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems1 && (
              <ul className={styles.bulletList}>
                {sec.afterItems1.map((item, i) => (
                  <li key={`afterItem1${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages1 &&
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

            {sec.afterParagraphs2?.map((p, i) => (
              <p
                key={`afterParagraphs2${i}`}
                dangerouslySetInnerHTML={{ __html: `<strong>${p}</strong>` }}
              />
            ))}

            {sec.afterItems2 && (
              <ul className={styles.bulletList}>
                {sec.afterItems2.map((item, i) => (
                  <li key={`afterItem2${i}`}>{item}</li>
                ))}
              </ul>
            )}

            {sec.afterImages2 &&
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
          </section>
        ))}
      </div>

      {/* RIGHT — tours (UNTOUCHED logic but Samarkand filter) */}
      <div className={styles.right}>
        {/* Loading / error states */}
        {toursLoading ? (
          <div className={styles.toursLoading}>Loading tours...</div>
        ) : toursError ? (
          <div className={styles.toursError}>
            Error loading tours: {toursError}
          </div>
        ) : samarkandTours.length === 0 ? (
          <div className={styles.noTours}>No Samarkand tours found.</div>
        ) : (
          samarkandTours.map((tour) => (
            <div
              key={tour.id}
              className={styles.tourCard}
              onClick={() => navigate(`/tour/${tour.documentId}`)}
            >
              <img
                src={getTourImage(tour)}
                className={styles.tourImage}
                alt={tour.title}
              />
              <div className={styles.tourInfo}>
                <h3>{tour.title}</h3>
                <p>
                  {tour.startDate &&
                    new Date(tour.startDate).toLocaleDateString()}
                </p>
                <p className={styles.price}>from ${tour.price || "N/A"}</p>
              </div>
            </div>
          ))
        )}

        {/* Optionally show images API status (helpful for debugging) */}
        {imagesLoading ? (
          <div className={styles.imagesLoading}>Loading images...</div>
        ) : imagesError ? (
          <div className={styles.imagesError}>Images error: {imagesError}</div>
        ) : null}
      </div>
    </div>
  );
}
