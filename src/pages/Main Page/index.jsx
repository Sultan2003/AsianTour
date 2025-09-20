import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./MainPage.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import culturalImg from "../../assets/images/front-img/cultural.avif";
import gastronomyImg from "../../assets/images/front-img/gastronomy.avif";
import religiousImg from "../../assets/images/front-img/religious.avif";
import ecoImg from "../../assets/images/front-img/eco.jpg";
import hikingImg from "../../assets/images/front-img/hiking.avif";
import businessImg from "../../assets/images/front-img/business.avif";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations/mainpage";

export default function MainPage() {
  const { lang , strapiLocale } = useContext(LanguageContext); 
  const t = translations[lang] || translations.en;

  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data))
      .catch((err) => console.error(err));

    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = {};
        tours.forEach((tour) => {
          const tourImages = images.filter((img) => img.alternativeText === tour.title);
          if (tourImages.length > 0) {
            newIndexes[tour.id] = ((prevIndexes[tour.id] || 0) + 1) % tourImages.length;
          }
        });
        return { ...prevIndexes, ...newIndexes };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [tours, images]);

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const upcomingTours = [...tours]
    .filter((tour) => {
      try {
        return new Date(tour.startDate) > new Date();
      } catch {
        return false;
      }
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 5);

  const slides = [
    {
      title: "Cultural Tours",
      description: "Get around by train, bus, car, ferry, cruise ship, bicycle, skis, or sleigh. Relax and enjoy yourself!",
      image: culturalImg
    },
    {
      title: "Gastronomy Tours",
      description: "Taste the flavors of the world, from street food to fine dining. A journey for your senses!",
      image: gastronomyImg
    },
    {
      title: "Religious Tours",
      description: "Visit sacred places and discover spiritual traditions that shaped civilizations.",
      image: religiousImg
    },
    {
      title: "Eco Tours",
      description: "Connect with nature, protect biodiversity, and travel responsibly in breathtaking environments.",
      image: ecoImg
    },
    {
      title: "Hiking",
      description: "Explore trails, mountains, and valleys while staying active and inspired.",
      image: hikingImg
    },
    {
      title: "MICE and Business Tours",
      description: "Professional, organized, and efficient. Combine business with world-class travel.",
      image: businessImg
    },
  ];

  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className={styles.mainPage}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h2 className={styles.title}>{t.aboutTitle}</h2>
        <p className={styles.text}>{t.aboutText}</p>
      </div>

      <div className={styles.tourList}>
        {tours.map((tour) => {
          const days = calculateDays(tour.startDate, tour.endDate);
          const tourImages = images.filter((img) => img.alternativeText === tour.title);
          const currentIndex = imageIndexes[tour.id] || 0;

          return (
            <div
              key={tour.id}
              className={styles.tourCard}
              onClick={() => navigate(`/tour/${tour.documentId}`)} 
              style={{ cursor: "pointer" }}
            >
              <div className={styles.image}>
                {tourImages.length > 0 ? (
                  tourImages.map((img, idx) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt={tour.title}
                      className={styles.imageSlide}
                      style={{ opacity: idx === currentIndex ? 1 : 0 }}
                      loading="lazy"
                    />
                  ))
                ) : (
                  <img
                    src="https://via.placeholder.com/400x250?text=No+Image"
                    alt="No tour available"
                    className={styles.imageSlide}
                    style={{ opacity: 1 }}
                    loading="lazy"
                  />
                )}
                {tour.isBestseller && <div className={styles.badge}>{t.bestseller}</div>}
              </div>

              <div className={styles.details}>
                <h2>{tour.title}</h2>
                <div className={styles.textbtn}>
                  <div className={styles.daysprice}>
                    <p className={styles.days}>{days} {t.days}</p>
                    <p className={styles.price}>{t.fromPrice} {tour.price}</p>
                  </div>
                  <div className={styles.btndiv}>
                    <button className={styles.viewBtn}>{t.viewDetails}</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 👉 Upcoming Tours Section */}
      <div className={styles.upcomingSection}>
        <h2>{t.upcomingTitle}</h2>

        <div className={styles.upcomingWrapper}>
          {/* Header */}
          <div className={styles.upcomingHeader}>
            <div>{t.upcomingHeader.date}</div>
            <div>{t.upcomingHeader.departures}</div>
            <div>{t.upcomingHeader.status}</div>
            <div>{t.upcomingHeader.seats}</div>
            <div>{t.upcomingHeader.price}</div>
          </div>

          {/* List of tours */}
          <div className={styles.upcomingList}>
            {upcomingTours.map((tour) => {
              const availableSeats = tour.availableSeats;
              const date = new Date(tour.startDate);
              const month = date.toLocaleString(lang === "ru" ? "ru-RU" : "en-US", { month: "short" });
              const day = date.getDate();
              const countries =
                Array.isArray(tour.countries) ? tour.countries.join(", ") : tour.countries || "";
              const departures = tour.location || 0;

              return (
                <div
                  key={tour.id}
                  className={styles.upcomingCard}
                  onClick={() => navigate(`/tour/${tour.documentId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.dateBox}>
                    <span className={styles.month}>{month}</span>
                    <span className={styles.day}>{day}</span>
                  </div>

                  <div className={styles.upcomingDetails}>
                    <h3 className={styles.tourName}>{tour.title}</h3>
                    <p className={styles.countries}>{countries}</p>
                    <p className={styles.departures}>{departures} more departures &gt;&gt;&gt;</p>
                  </div>

                  <div className={styles.status}>{t.statusAvailable}</div>
                  <div className={styles.uDays}>{availableSeats}</div>
                  <div className={styles.uPrice}>US$ {tour.price}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.promoSlider}>
        <img src={slides[current].image} alt={slides[current].title} className={styles.backgroundImage} />

        <div className={styles.overlay}></div>
        <div className={styles.sliderContent}>
          <h2>{slides[current].title.toUpperCase()}</h2>
          <p>{slides[current].description}</p>
          <button className={styles.readMoreBtn}>{t.readMore}</button>
        </div>

        <button className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
          <ChevronLeft />
        </button>
        <button className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
          <ChevronRight />
        </button>

        <div className={styles.dots}>
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${idx === current ? styles.active : ""}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
