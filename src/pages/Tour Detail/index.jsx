import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import styles from "./Tourdetail.module.scss";

export default function TourIdPage() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch all tours and find by ID
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours")
      .then((res) => res.json())
      .then((data) => {
        const foundTour = data.data.find((t) => t.id.toString() === id);
        setTour(foundTour || null);
      })
      .catch((err) => console.error(err));

    // Fetch all images
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Auto carousel
  useEffect(() => {
    if (!tour) return;

    const tourImages = images.filter(
      (img) => img.alternativeText === tour.title
    );

    if (tourImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tourImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [tour, images]);

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  if (!tour) {
    return (
      <div className={styles.tourPage}>
        <Header />
        <p>Loading tour details...</p>
      </div>
    );
  }

  const days = calculateDays(tour.startDate, tour.endDate);
  const tourImages = images.filter((img) => img.alternativeText === tour.title);

  return (
    <div className={styles.tourPage}>
      <Header />

      {/* Hero Carousel */}
      <div
        className={styles.hero}
        style={{
          backgroundImage: tourImages.length
            ? `url(${tourImages[currentIndex].url})`
            : "url(https://via.placeholder.com/1200x600?text=No+Image)",
        }}
      >
        <div className={styles.heroContent}>
          <h1>{tour.title}</h1>
          <p>
            {days} Days | {tour.location}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Info */}
        <div className={styles.infoSection}>
          <div className={styles.tabContent}>
            <h2>Tour Description</h2>
            <p>{tour.daysdescription}</p>
            {Array.isArray(tour.description) &&
              tour.description.map((desc, idx) => (
                <p key={idx}>{desc.children?.map((c) => c.text).join("")}</p>
              ))}
          </div>
        </div>

        {/* Right Details Card */}
        <div className={styles.detailsCard}>
          <h2>{tour.title}</h2>
          <div className={styles.price}>US${tour.price}</div>
          <div className={styles.infoLine}>
            <span>Days:</span>
            <span>{days}</span>
          </div>
          <div className={styles.infoLine}>
            <span>Start Date:</span>
            <span>{tour.startDate}</span>
          </div>
          <div className={styles.infoLine}>
            <span>End Date:</span>
            <span>{tour.endDate}</span>
          </div>
          <div className={styles.infoLine}>
            <span>Available Seats:</span>
            <span>{tour.availableSeats}</span>
          </div>
          {tour.status1 && <div className={styles.badge}>Bestseller</div>}
          <button className={styles.bookBtn}>Book Now</button>
        </div>
      </div>
    </div>
  );
}
