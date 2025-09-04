import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import styles from "./Tourdetail.module.scss";
import Footer from "../../components/Footer";

export default function TourIdPage() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // refs for sticky nav
  const itineraryRef = useRef(null);
  const pricesRef = useRef(null);
  const requestRef = useRef(null);
  const reviewsRef = useRef(null);

  // fetch data
  useEffect(() => {
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours")
      .then((r) => r.json())
      .then((data) => {
        const found = data.data.find((t) => t.id.toString() === id);
        setTour(found || null);
      })
      .catch(console.error);

    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((r) => r.json())
      .then(setImages)
      .catch(console.error);
  }, [id]);

  // auto-rotate hero
  useEffect(() => {
    if (!tour) return;
    const tourImgs = images.filter((img) => img.alternativeText === tour.title);
    if (!tourImgs.length) return;
    const int = setInterval(
      () => setCurrentIndex((p) => (p + 1) % tourImgs.length),
      4000
    );
    return () => clearInterval(int);
  }, [tour, images]);

  const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return Math.ceil((e - s) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // Parse itinerary safely (runs even if tour is null)
  const parsedDays = useMemo(() => {
    if (!tour?.daysdescription) return [];
    const src = tour.daysdescription.trim();
    const blocks = [];
    const re = /(?:^|\n)(Day\s*\d+:[^\n]*)\n([\s\S]*?)(?=\nDay\s*\d+:|$)/g;
    let m;
    while ((m = re.exec(src)) !== null) {
      blocks.push({
        title: m[1].trim(),
        body: m[2].trim(),
      });
    }
    return blocks;
  }, [tour?.daysdescription]);

  // accordion state
  const [open, setOpen] = useState([]);
  useEffect(() => {
    setOpen(parsedDays.map(() => false));
  }, [parsedDays]);

  const toggle = (i) =>
    setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  // nav scroll with offset
  const scrollTo = (ref) => {
    if (!ref?.current) return;
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // show loading until tour exists
  if (!tour) {
    return (
      <div className={styles.tourPage}>
        <Header />
        <p className={styles.loading}>Loading tour details…</p>
      </div>
    );
  }

  const days = calculateDays(tour.startDate, tour.endDate);
  const tourImages = images.filter((img) => img.alternativeText === tour.title);

  return (
    <div className={styles.tourPage}>
      <Header />

      {/* HERO */}
      <div
        className={styles.hero}
        style={{
          backgroundImage: tourImages.length
            ? `url(${tourImages[currentIndex].url})`
            : "url(/no-image.png)",
        }}
      >
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <h1>{tour.title}</h1>
          <p>
            {days} Days • {tour.location}
          </p>
          {tour.status1 && <span className={styles.heroBadge}>Bestseller</span>}
        </div>
      </div>

      {/* NAV */}
      <div className={styles.tabsNav}>
        <button onClick={() => scrollTo(itineraryRef)}>Itinerary</button>
        <button onClick={() => scrollTo(pricesRef)}>Dates & Prices</button>
        <button onClick={() => scrollTo(requestRef)}>Request</button>
        <button onClick={() => scrollTo(reviewsRef)}>Reviews</button>
      </div>

      {/* MAIN */}
      <div className={styles.content}>
        <div className={styles.infoSection}>
          {/* Description */}
          <section className={styles.tabContent}>
            <h2>Tour Overview</h2>
            {Array.isArray(tour.description) &&
              tour.description.map((node, i) => {
                const txt =
                  node?.children?.map?.((c) => c.text).join("") ?? "";
                if (!txt.trim()) return null;
                return <p key={i}>{txt}</p>;
              })}
          </section>

          {/* Itinerary */}
          <section ref={itineraryRef} className={styles.tabContent}>
            <div className={styles.itineraryHeader}>
              <h2>Tour Itinerary</h2>
            </div>
            <div className={styles.accordion}>
              {parsedDays.map((d, idx) => (
                <div key={idx} className={styles.accItem}>
                  <button
                    className={`${styles.accHead} ${
                      open[idx] ? styles.open : ""
                    }`}
                    onClick={() => toggle(idx)}
                  >
                    <span className={styles.dayTitle}>{d.title}</span>
                    <span className={styles.chev} />
                  </button>
                  <div
                    className={`${styles.accPanel} ${
                      open[idx] ? styles.show : ""
                    }`}
                  >
                    <p>{d.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Prices */}
          <section ref={pricesRef} className={styles.tabContent}>
            <h2>Dates & Prices</h2>
            <ul className={styles.priceList}>
              <li>
                <span>Start date</span>
                <strong>{formatDate(tour.startDate)}</strong>
              </li>
              <li>
                <span>End date</span>
                <strong>{formatDate(tour.endDate)}</strong>
              </li>
              <li className={styles.priceRow}>
                <span>Price</span>
                <strong>US${tour.price}</strong>
              </li>
              <li>
                <span>Available seats</span>
                <strong>{tour.availableSeats}</strong>
              </li>
            </ul>
          </section>

          {/* Request */}
{/* Request */}
<section ref={requestRef} className={styles.tabContent}>
  <h2>Tour Enquiry</h2>
  <p>We use this information solely for the purpose of corresponding regarding your travel.</p>
  
  <form
    className={styles.enquiryForm}
    onSubmit={async (e) => {
      e.preventDefault();

      const form = e.target;
      const title = form[0].value;
      const firstName = form[1].value;
      const lastName = form[2].value;
      const citizenship = form[3].value;
      const email = form[4].value;
      const phone = form[5].value;
      const date = form[6].value;
      const travelers = form[7].value;
      const comments = form[8].value;

      const message = `
📩 *New Tour Enquiry*
🏷️ Title: ${title}
👤 Name: ${firstName} ${lastName}
🌍 Citizenship: ${citizenship}
📧 Email: ${email}
📞 Phone: ${phone}
🗓️ Date: ${date}
👥 Travelers: ${travelers}
💬 Comments: ${comments || "None"}
`;

      try {
        await fetch(
          `https://api.telegram.org/bot7509089585:AAFlUQJVRK3qtgLN4FVWHwEPeahjfv2oFpY/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: "-1003082651864",
              text: message,
              parse_mode: "Markdown",
            }),
          }
        );
        alert("✅ Request sent successfully! We will contact you soon.");
        form.reset();
      } catch (err) {
        console.error(err);
        alert("❌ Failed to send request. Please try again.");
      }
    }}
  >
    {/* Contact Details */}
    <div className={styles.sectionTitle}>Contact Details</div>

    <div className={styles.formRow}>
      <select required defaultValue="">
        <option value="" disabled>Title</option>
        <option value="Mr.">Mr.</option>
        <option value="Ms.">Ms.</option>
        <option value="Mrs.">Mrs.</option>
        <option value="Dr.">Dr.</option>
      </select>
      <input type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />
      <input type="text" placeholder="Citizenship" required />
    </div>

    <div className={styles.formRow}>
      <input type="email" placeholder="E-mail" required />
      <input type="tel" placeholder="Phone (+code)" required />
    </div>

    {/* Travel Info */}
    <div className={styles.sectionTitle}>Travel Info</div>

    <div className={styles.formRow}>
      <input type="date" defaultValue="2025-12-09" required />
      <select required defaultValue="1">
        <option value="1">1 Traveler</option>
        <option value="2">2 Travelers</option>
        <option value="3">3 Travelers</option>
        <option value="4">4+ Travelers</option>
      </select>
    </div>

    <textarea placeholder="Comments and questions" rows="4" />

    <button className={styles.requestBtn} type="submit">
      Request More Info
    </button>
  </form>
</section>



          {/* Reviews */}
          <section ref={reviewsRef} className={styles.tabContent}>
            <h2>Reviews</h2>
            <p>No reviews yet.</p>
          </section>
        </div>

        {/* Right card */}
        <div className={styles.detailsCard}>
          <h2>{tour.title}</h2>
          <div className={styles.price}>US${tour.price}</div>

          <div className={styles.infoLine}>
            <span>Days</span>
            <span>{days}</span>
          </div>
          <div className={styles.infoLine}>
            <span>Start</span>
            <span>{formatDate(tour.startDate)}</span>
          </div>
          <div className={styles.infoLine}>
            <span>End</span>
            <span>{formatDate(tour.endDate)}</span>
          </div>
          <div className={styles.infoLine}>
            <span>Seats</span>
            <span>{tour.availableSeats}</span>
          </div>

          <button className={styles.bookBtn}>Book Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
