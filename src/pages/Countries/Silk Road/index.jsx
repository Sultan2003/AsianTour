import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom"; 
import styles from "./SilkRoad.module.scss";
import mainImg from "../../../assets/Countries/Silkroad.jpg";

export default function SilkRoadTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Silk Road`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    // Uzbekistan
    "Samarkand","Bukhara","Khiva","Tashkent","Shahrisabz",
    // Kazakhstan
    "Turkistan","Almaty","Shymkent",
    // Kyrgyzstan
    "Osh","Bishkek","Uzgen","Tash Rabat Caravanserai",
    // Tajikistan
    "Khujand","Istaravshan","Panjakent",
    // Turkmenistan
    "Merv","Konye-Urgench","Ashgabat"
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image (static import) */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Silk Road" />
            </div>

            <h2>Upcoming Group Departures</h2>

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
              Step into history and explore the legendary Silk Road. Travel through
              Samarkand, Bukhara, and Khiva in Uzbekistan, follow ancient caravan
              routes in Kyrgyzstan and Tajikistan, and uncover the heritage of
              Turkmenistan and Kazakhstan. The Silk Road offers an unforgettable
              journey through bustling bazaars, timeless architecture, and cultural
              crossroads that shaped the world.
            </p>
          </div>

          <div className={styles.sidebar}>
            <h3>Travel Destinations</h3>
            <ul>
              {destinations.map((d, i) => (
                <li key={i}>
                  <a href="#">{d}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
