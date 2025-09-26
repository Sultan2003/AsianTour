import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom"; 
import styles from "./Tajikistan.module.scss";
import mainImg from "../../../assets/Countries/tajikistan.jpg";

export default function TajikistanTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Tajikistan`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    "Dushanbe","Khujand","Istaravshan","Kulob","Pamir Mountains","Khorog",
    "Murghab","Fann Mountains","Panjakent","Iskanderkul Lake","Nurek Dam",
    "Wakhan Valley","Seven Lakes","Yagnob Valley","Sarazm","Bartang Valley",
    "Shahriston Pass","Hissar Fortress","Varzob","Garm","Danghara",
    "Romit Gorge","Zeravshan Valley","Lake Karakul","Fergana Valley"
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image (static import) */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Tajikistan" />
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
              Explore Tajikistan, a land of rugged mountains, alpine lakes, and
              ancient Silk Road history. Discover the Pamir Highway, trek
              through the breathtaking Fann Mountains, and experience the warmth
              of Tajik hospitality in remote villages. Tajikistan offers a true
              adventure for nature lovers and cultural explorers alike.
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
