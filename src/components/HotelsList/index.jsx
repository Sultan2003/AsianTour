import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hotelsList.module.scss";

const BASE_URL = "https://brilliant-passion-7d3870e44b.strapiapp.com/api";

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      const res = await fetch(`${BASE_URL}/hotelss?populate=*`);
      const data = await res.json();

      setHotels(data.data || []);
    };

    fetchHotels();
  }, []);

  const hotelTypesOrder = ["Economy", "Standart", "Deluxe"];

  const cities = [
    ...new Set(hotels.map((hotel) => hotel.city).filter(Boolean)),
  ];

  const countries = [
    ...new Set(hotels.map((hotel) => hotel.country).filter(Boolean)),
  ];

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchType = selectedType ? hotel.hotel_type === selectedType : true;

      const matchCity = selectedCity ? hotel.city === selectedCity : true;

      const matchCountry = selectedCountry
        ? hotel.country === selectedCountry
        : true;

      return matchType && matchCity && matchCountry;
    });
  }, [hotels, selectedType, selectedCity, selectedCountry]);

  return (
    <div className={styles.page}>
      <div className={styles.filterBanner}>
        <img
          src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop"
          alt=""
        />

        <div className={styles.overlay}></div>

        <div className={styles.filterBox}>
          <div className={styles.selectWrapper}>
            <label>Hotel Type</label>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>

              {hotelTypesOrder.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <label>City</label>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>

              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <label>Country</label>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">All Countries</option>

              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <h1>Hotels</h1>

      {hotelTypesOrder.map((type) => {
        const sectionHotels = filteredHotels.filter(
          (hotel) => hotel.hotel_type === type,
        );

        if (!sectionHotels.length) return null;

        return (
          <div key={type} className={styles.section}>
            <h2>{type}</h2>

            <div className={styles.grid}>
              {sectionHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className={styles.card}
                  onClick={() => navigate(`/hotels/${hotel.slug}`)}
                >
                  {hotel.mainImage && (
                    <img src={hotel.mainImage.url} alt={hotel.title} />
                  )}

                  <div className={styles.cardContent}>
                    <h3>{hotel.title}</h3>

                    <p>{hotel.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelsList;
