import { useEffect, useState } from "react";
import styles from "./Tashkent.module.scss";
import Tashkent from "../../../../assets/Cities/tashkent.jpg";
import { useNavigate } from "react-router-dom";

export default function TashkentPage() {
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  // Fetch tours (only Tashkent)
  useEffect(() => {
    fetch(
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Tashkent"
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, []);

  // Fetch images
  useEffect(() => {
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, []);

  const getTourImage = (tour) => {
    const tourImages = images.filter(
      (img) => img.alternativeText === tour.title
    );
    return tourImages.length
      ? tourImages[0].url
      : "https://via.placeholder.com/400x400";
  };

  const extraLinks = [
    "Tashkent Hotels",
    "Tashkent Tours",
    "Exhibitions & Events",
    "Tashkent Trains",
    "Tashkent Transfers",
    "Airport Transfers",
    "Car Rental",
  ];

  return (
    <div className={styles.container}>
      {/* Left Side */}
      <div className={styles.left}>
        <img
          src={Tashkent}
          alt="Amir Temur Square"
          className={styles.heroImage}
        />
        <h2>Things to Do and Sightseeing Tours in Tashkent</h2>
        <ul className={styles.links}>
          <li>1. Tours</li>
          <li>2. History</li>
          <li>3. Things to do</li>
          <li>4. Entertainment, parks, and shopping</li>
          <li>5. Food</li>
          <li>6. City transport</li>
          <li>7. How to get to Tashkent</li>
          <li>8. Languages spoken in Tashkent</li>
          <li>9. Currency</li>
          <li>10. Security</li>
        </ul>
        <p>
          Tashkent is the capital of Uzbekistan and is a metropolis of over 2.5
          million people. The city is set out as a grid of straight, wide
          streets and avenues, interspersed with many green areas (parks,
          squares, and gardens) and fountains.
        </p>
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        {tours.map((tour) => (
          <div
            key={tour.id}
            className={styles.tourCard}
            onClick={() => navigate(`/tour/${tour.documentId}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={getTourImage(tour)}
              alt={tour.title}
              className={styles.tourImage}
            />
            <div className={styles.tourInfo}>
              <h3>{tour.title}</h3>
              <p>
                {tour.startDate && tour.endDate
                  ? `${new Date(
                      tour.startDate
                    ).toLocaleDateString()} - ${new Date(
                      tour.endDate
                    ).toLocaleDateString()}`
                  : "1 Day"}{" "}
                | Private
              </p>
              <p className={styles.price}>from US$ {tour.price || "N/A"}</p>
              <span className={styles.badge}>All year round</span>
            </div>
          </div>
        ))}

        {/* ✅ Extra Block */}
        <div className={styles.extraBlock}>
          <h3>Explore More in Tashkent</h3>
          <ul>
            {extraLinks.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
