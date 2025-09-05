import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../../components/Header";
import styles from "./MainPage.module.scss";
import Footer from "../../components/Footer";

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

  return (
    <div className={styles.mainPage}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Discover the Silk Road</h1>
          <p>with expertly crafted tours by a local operator</p>
        </div>
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
                    <div
                      key={img.id}
                      className={styles.imageSlide}
                      style={{
                        backgroundImage: `url(${img.url})`,
                        opacity: idx === currentIndex ? 1 : 0,
                      }}
                    />
                  ))
                ) : (
                  <div
                    className={styles.imageSlide}
                    style={{
                      backgroundImage: "url(https://via.placeholder.com/400x250?text=No+Image)",
                      opacity: 1,
                    }}
                  />
                )}
                {tour.isBestseller && <div className={styles.badge}>Bestseller</div>}
              </div>

              <div className={styles.details}>
                <div>
                <h2>{tour.title}</h2>
                </div>
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

      {/* 👉 New Contact Section */}
      <div className={styles.contactSection}>
        <p>Indecisive about your next adventure? Want something tailor-made just for you?</p>
        <p>
          Click that <b>'Contact Us'</b> button, fill out the form, and let us do the rest. <br />
          Your dream trip is just a click away!
        </p>
        <button className={styles.contactBtn} onClick={() => navigate('/contact')}>Contact Us</button>
      </div>
    </div>
  );
}
