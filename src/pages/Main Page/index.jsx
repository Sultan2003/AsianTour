import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import React, { lazy, Suspense } from "react";

const HistoricalTimeline = lazy(() => import("../../components/timeline"));

export default function MainPage() {
  const { lang, strapiLocale } = useContext(LanguageContext);
  const t = translations[lang] || translations.en;

  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const navigate = useNavigate();

  // Fetch tours and images
  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data?.data) return;
        // Filter: Only Group tours, exclude City tours
        const filtered = data.data.filter((tour) => {
          const type = (tour.tour_type || "").toLowerCase();
          return type.includes("group") && !type.includes("city");
        });
        setTours(filtered);
      })
      .catch((err) => console.error(err));

    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  // Image slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = {};
        tours.forEach((tour) => {
          const tourImages = images.filter(
            (img) =>
              img.alternativeText?.toLowerCase() === tour.title?.toLowerCase()
          );
          if (tourImages.length > 0) {
            newIndexes[tour.id] =
              ((prevIndexes[tour.id] || 0) + 1) % tourImages.length;
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
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
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
    .slice(0, 8);

  const [loadTimeline, setLoadTimeline] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const timelineElement = document.getElementById("timelineSection");
      if (!timelineElement) return;

      const rect = timelineElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When user scrolls CLOSE to the timeline (250px)
      if (rect.top < windowHeight + 250) {
        setLoadTimeline(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slides = [
    {
      title: "Cultural Tours",
      description:
        "Get around by train, bus, car, ferry, cruise ship, bicycle, skis, or sleigh. Relax and enjoy yourself!",
      image: culturalImg,
      link: "/Cultural-Tours",
    },
    {
      title: "Gastronomy Tours",
      description:
        "Taste the flavors of the world, from street food to fine dining. A journey for your senses!",
      image: gastronomyImg,
      link: "/Gastronomy-Tours",
    },
    {
      title: "Religious Tours",
      description:
        "Visit sacred places and discover spiritual traditions that shaped civilizations.",
      image: religiousImg,
      link: "/Religious-Tours",
    },
    {
      title: "Eco Tours",
      description:
        "Connect with nature, protect biodiversity, and travel responsibly in breathtaking environments.",
      image: ecoImg,
      link: "/Eco-Tours",
    },
    {
      title: "City Tours",
      description:
        "Explore trails, mountains, and valleys while staying active and inspired.",
      image: hikingImg,
      link: "/City-Tours",
    },
    {
      title: "MICE and Business Tours",
      description:
        "Professional, organized, and efficient. Combine business with world-class travel.",
      image: businessImg,
      link: "/Business-Mice-Tours",
    },
  ];

  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className={styles.mainPage}>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
        </div>
      </div>

      {/* ABOUT */}
      <div className={styles.aboutSection}>
        <h2 className={styles.title}>{t.aboutTitle}</h2>
        <p className={styles.text}>{t.aboutText}</p>
      </div>

      {/* TOURS */}
      <div className={styles.tourList}>
        {tours
          .sort((a, b) => b.availableSeats - a.availableSeats)
          .slice(0, 6)
          .map((tour) => {
            const days = calculateDays(tour.startDate, tour.endDate);
            const tourImages = images.filter(
              (img) =>
                img.alternativeText?.toLowerCase() === tour.title?.toLowerCase()
            );
            const currentIndex = imageIndexes[tour.id] || 0;

            return (
              <div
                key={tour.id}
                className={styles.tourCard}
                onClick={() => navigate(`/tour/${tour.documentId}`)}
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
                  {tour.isBestseller && (
                    <div className={styles.badge}>{t.bestseller}</div>
                  )}
                </div>

                <div className={styles.details}>
                  <h2>{tour.title}</h2>
                  <div className={styles.textbtn}>
                    <div className={styles.daysprice}>
                      <p className={styles.days}>
                        {days} {t.days}
                      </p>
                      <p className={styles.price}>
                        {t.fromPrice} {tour.price}
                      </p>
                    </div>
                    <div className={styles.btndiv}>
                      <button className={styles.viewBtn}>
                        {t.viewDetails}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* UPCOMING TOURS */}
      <div className={styles.upcomingSection}>
        <h2>{t.upcomingTitle}</h2>

        <div className={styles.upcomingList}>
          {upcomingTours.map((tour) => {
            const availableSeats = tour.availableSeats;
            const date = new Date(tour.startDate);
            const month = date.toLocaleString(
              lang === "ru" ? "ru-RU" : "en-US",
              {
                month: "short",
              }
            );
            const day = date.getDate();

            return (
              <div
                key={tour.id}
                className={styles.upcomingCard}
                onClick={() => navigate(`/tour/${tour.documentId}`)}
              >
                <div className={styles.dateBox}>
                  <span className={styles.month}>{month}</span>
                  <span className={styles.day}>{day}</span>
                </div>

                <h3 className={styles.tourName}>{tour.title}</h3>

                <div
                  className={`${styles.status} ${
                    availableSeats > 0 ? styles.available : styles.unavailable
                  }`}
                >
                  {availableSeats > 0 ? t.statusAvailable : t.statusUnavailable}
                </div>

                <div className={styles.uDays}>{availableSeats}</div>

                <div className={styles.uPrice}>US$ {tour.price}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROMO SLIDER */}
      <div className={styles.promoSlider}>
        <img
          src={slides[current].image}
          alt={slides[current].title}
          className={styles.backgroundImage}
        />
        <div className={styles.overlay}></div>
        <div className={styles.sliderContent}>
          <h2>{slides[current].title.toUpperCase()}</h2>
          <p>{slides[current].description}</p>
          {slides[current].link && (
            <Link to={slides[current].link} className={styles.readMoreBtn}>
              {t.readMore}
            </Link>
          )}
        </div>
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={prevSlide}
        >
          <ChevronLeft />
        </button>
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={nextSlide}
        >
          <ChevronRight />
        </button>
        <div className={styles.dots}>
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${
                idx === current ? styles.active : ""
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
      <div id="timelineSection" className={styles.timelineSection}>
        <h2 className={styles.title}>Historical Timeline</h2>

        <div className={styles.timelineWrapper}>
          {loadTimeline ? (
            <Suspense fallback={<div>Loading timeline...</div>}>
              <HistoricalTimeline />
            </Suspense>
          ) : (
            <div className={styles.timelinePlaceholder}>
              Scroll to load timeline…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
