import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom"; 
import styles from "./CentralAsia.module.scss";
import mainImg from "../../../assets/Countries/centralasia.webp";

export default function CentralAsiaTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Central Asia`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    // Uzbekistan
    "Tashkent","Samarkand","Bukhara","Khiva","Shahrisabz","Fergana Valley",
    // Kazakhstan
    "Almaty","Astana","Shymkent","Turkistan","Charyn Canyon",
    // Kyrgyzstan
    "Bishkek","Osh","Issyk-Kul Lake","Karakol","Song-Kol Lake",
    // Tajikistan
    "Dushanbe","Khujand","Pamir Highway","Iskanderkul Lake",
    // Turkmenistan
    "Ashgabat","Darvaza Gas Crater","Merv","Konye-Urgench"
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image (static import) */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Central Asia" />
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
              Discover the heart of the Silk Road in Central Asia. Wander through
              Samarkand and Bukhara’s ancient cities, admire Kazakhstan’s wide
              steppes, relax by Kyrgyzstan’s alpine lakes, explore Tajikistan’s
              Pamir Highway, and marvel at Turkmenistan’s desert wonders. Central
              Asia is a land of timeless traditions, diverse cultures, and
              breathtaking landscapes waiting to be explored.
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
