import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hotelsList.module.scss";

const BASE_URL = "https://brilliant-passion-7d3870e44b.strapiapp.com/api";

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      const res = await fetch(`${BASE_URL}/hotelss?populate=*`);
      const data = await res.json();

      setHotels(data.data || []);
    };

    fetchHotels();
  }, []);

  return (
    <div className={styles.page}>
      <h1>Hotels</h1>

      <div className={styles.grid}>
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className={styles.card}
            onClick={() => navigate(`/hotels/${hotel.slug}`)}
          >
            {hotel.mainImage && <img src={hotel.mainImage.url} />}

            <h3>{hotel.title}</h3>
            <p>{hotel.city}</p>
            <span>{hotel.priceFrom} USD / night</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsList;
