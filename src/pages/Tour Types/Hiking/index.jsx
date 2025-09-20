import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom"; 
import styles from "./Hiking.module.scss";
import mainImg from "../../../assets/images/front-img/hiking.avif";

export default function HikingTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    // ✅ Only fetch tours with tour_type = hiking
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[tour_type][$eqi]=hiking`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image (static hiking photo) */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Hiking Tours" />
            </div>

            <h2>Upcoming Hiking Tours</h2>

            <div className={styles.cardsHeader}>
              <div>Status</div>
              <div>Days</div>
              <div>Price</div>
            </div>

            {tours.map((tour) => {
              const statusText = tour.status1 ? "Available" : "Unavailable";

              return (
                <div
                  key={tour.id}
                  className={styles.tourCard}
                  onClick={() => navigate(`/tour/${tour.documentId}`)} 
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.dateBox}>
                    {new Date(tour.startDate).toLocaleDateString()}
                  </div>
                  <div className={styles.tourInfo}>
                    <a href="#" className={styles.title}>
                      {tour.title}
                    </a>
                    <p className={styles.cities}>{tour.location}</p>
                    <a href="#" className={styles.departures}>
                      {tour.availableSeats} seats available
                    </a>
                  </div>
                  <div
                    className={
                      tour.status1 ? styles.available : styles.unavailable
                    }
                  >
                    {statusText}
                  </div>
                  <div>
                    {Math.ceil(
                      (new Date(tour.endDate) - new Date(tour.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </div>
                  <div>${tour.price}</div>
                </div>
              );
            })}

            <p className={styles.description}>
              Join our hiking tours and explore breathtaking mountains, scenic valleys, 
              and hidden trails. Perfect for adventure seekers who want to connect 
              with nature and enjoy the outdoors. Experience Uzbekistan’s landscapes 
              like never before with our guided hiking trips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
