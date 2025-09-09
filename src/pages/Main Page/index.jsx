import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./MainPage.module.scss";

export default function MainPage() {
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours")
      .then((res) => res.json())
      .then((data) => setTours(data.data))
      .catch((err) => console.error(err));

    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, []);

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

  return (
    <div className={styles.mainPage}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Discover the Silk Road</h1>
          <p>with expertly crafted tours by a local operator</p>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h2 className={styles.title}>Our Curated Asian Journeys</h2>
        <p className={styles.text}>
          Asian Tour is a boutique tour operator specializing in authentic and personalized travel
          experiences across Asia. As a trusted and highly rated company, we place your safety and
          comfort at the heart of every journey. Through our expert local partnerships, we create
          meaningful adventures that leave lasting memories.
        </p>
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
              onClick={() => navigate(`/tour/${tour.id}`)} 
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
                {tour.isBestseller && <div className={styles.badge}>Bestseller</div>}
              </div>

              <div className={styles.details}>
                <h2>{tour.title}</h2>
                <div className={styles.textbtn}>
                  <div className={styles.daysprice}>
                    <p className={styles.days}>{days} Days</p>
                    <p className={styles.price}>from US${tour.price}</p>
                  </div>
                  <div className={styles.btndiv}>
                    <button className={styles.viewBtn}>View Details</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 👉 Contact Section */}
      <div className={styles.contactSection}>
        <p>Indecisive about your next adventure? Want something tailor-made just for you?</p>
        <p>
          Click that <b>'Contact Us'</b> button, fill out the form, and let us do the rest. <br />
          Your dream trip is just a click away!
        </p>
        <button className={styles.contactBtn} onClick={() => navigate('/contact')}>Contact Us</button>
      </div>

      {/* 👉 Upcoming Tours Section */}
      <div className={styles.upcomingSection}>
        <h2>Upcoming Popular Group Tour Dates 2025</h2>

        <div className={styles.upcomingWrapper}>
          <div className={styles.upcomingList}>
            {upcomingTours.map((tour) => {
              const days = calculateDays(tour.startDate, tour.endDate);
              const date = new Date(tour.startDate);
              const month = date.toLocaleString("en-US", { month: "short" });
              const day = date.getDate();
              const countries =
                Array.isArray(tour.countries) ? tour.countries.join(", ") : tour.countries || "";
              const departures = tour.departures || 0;

              return (
                <div
                  key={tour.id}
                  className={styles.upcomingCard}
                  onClick={() => navigate(`/tour/${tour.id}`)}
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

                  <div className={styles.status}>Available</div>
                  <div className={styles.uDays}>{days}</div>
                  <div className={styles.uPrice}>US$ {tour.price}</div>
                </div>
              );
            })}
          </div>

          <div className={styles.upcomingSideImage} role="img" aria-label="Upcoming tours image" />
        </div>
      </div>
    </div>
  );
}
