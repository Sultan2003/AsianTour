import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom"; 
import styles from "./Uzbekistan.module.scss";
import mainImg from "../../../assets/images/uzb-registan.jpg";

export default function UzbekistanTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
    const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    // ✅ Only fetch tours with location = Uzbekistan
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Uzbekistan`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    "Tashkent","Samarkand","Bukhara","Khiva","Andijan","Aral Sea","Baysun","Beldersay",
    "Charvak","Chimgan","Fergana","Jizzakh","Karakalpakstan","Karshi","Kokand","Kuva",
    "Margilan","Muynak","Namangan","Navoi","Nukus","Nurata","Rishtan","Sarmish-say Petroglyphs",
    "Shakhimardan","Shakhrisabz","Termez","Urgench","Ustyurt Plateau","Yangiabad"
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image (static import) */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Uzbekistan" />
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
                <div key={tour.id} className={styles.tourCard} onClick={() => navigate(`/tour/${tour.documentId}`)} 
              style={{ cursor: "pointer" }}>
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
              Visit Uzbekistan and discover stunning medieval cities with tall
              minarets reaching into the sky. See local pilgrims in bright,
              colorful robes and experience the lively atmosphere of bustling
              bazaars filled with rich aromas and friendly voices. A trip to
              Uzbekistan is both exciting and welcoming, offering a mix of
              adventure and comfort.
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
