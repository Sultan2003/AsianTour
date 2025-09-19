import { useEffect, useMemo, useRef, useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { useParams } from "react-router-dom";
import styles from "./Tourdetail.module.scss";
import translations from "../../translations/tourdetail";

export default function TourIdPage() {
  const { documentId } = useParams();
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { strapiLocale } = useContext(LanguageContext);

  // refs for sticky nav
  const itineraryRef = useRef(null);
  const pricesRef = useRef(null);
  const requestRef = useRef(null);
  const reviewsRef = useRef(null);

  const t = translations[
    strapiLocale.startsWith("ru")
      ? "ru"
      : strapiLocale.startsWith("uz")
      ? "uz"
      : "en"
  ];

  // fetch data
  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}`
    )
      .then((r) => r.json())
      .then((data) => {
        const found = data.data.find(
          (t) => t.documentId.toString() === documentId
        );
        setTour(found || null);
      })
      .catch(console.error);

    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((r) => r.json())
      .then(setImages)
      .catch(console.error);
  }, [documentId, strapiLocale]);

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

  // Parse itinerary safely
  const parsedDays = useMemo(() => {
    if (!tour?.daysdescription) return [];
    const src = tour.daysdescription.trim();
    const blocks = [];

    // word for "Day"
    let dayWord = "Day";
    if (strapiLocale.startsWith("ru")) dayWord = "День";
    if (strapiLocale.startsWith("uz")) dayWord = "Kun";

    const re = new RegExp(
      `(?:^|\\n)(${dayWord}\\s*\\d+:[^\\n]*)\\n([\\s\\S]*?)(?=\\n${dayWord}\\s*\\d+:|$)`,
      "g"
    );

    let m;
    while ((m = re.exec(src)) !== null) {
      blocks.push({
        title: m[1].trim(),
        body: m[2].trim(),
      });
    }
    return blocks;
  }, [tour?.daysdescription, strapiLocale]);

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

  if (!tour) {
    return (
      <div className={styles.tourPage}>
        <p className={styles.loading}>Loading tour details…</p>
      </div>
    );
  }

  const days = calculateDays(tour.startDate, tour.endDate);
  const tourImages = images.filter((img) => img.alternativeText === tour.title);

  return (
    <div className={styles.tourPage}>
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
            {days} {t.days} • {tour.location}
          </p>
          {tour.status1 && (
            <span className={styles.heroBadge}>{t.bestseller}</span>
          )}
        </div>
      </div>

      {/* NAV */}
      <div className={styles.tabsNav}>
        <button onClick={() => scrollTo(itineraryRef)}>{t.itinerary}</button>
        <button onClick={() => scrollTo(pricesRef)}>{t.datesPrices}</button>
        <button onClick={() => scrollTo(requestRef)}>{t.enquiry}</button>
        <button onClick={() => scrollTo(reviewsRef)}>{t.reviews}</button>
      </div>

      {/* MAIN */}
      <div className={styles.content}>
        <div className={styles.infoSection}>
          {/* Description */}
          <section className={styles.tabContent}>
            <h2>{t.overview}</h2>
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
              <h2>{t.itinerary}</h2>
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
            <h2>{t.datesPrices}</h2>
            <ul className={styles.priceList}>
              <li>
                <span>{t.startDate}</span>
                <strong>{formatDate(tour.startDate)}</strong>
              </li>
              <li>
                <span>{t.endDate}</span>
                <strong>{formatDate(tour.endDate)}</strong>
              </li>
              <li className={styles.priceRow}>
                <span>{t.price}</span>
                <strong>US${tour.price}</strong>
              </li>
              <li>
                <span>{t.seats}</span>
                <strong>{tour.availableSeats}</strong>
              </li>
            </ul>
          </section>

          {/* Request */}
          <section ref={requestRef} className={styles.tabContent}>
            <h2>{t.enquiry}</h2>
            <p>{t.enquiryInfo}</p>

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
                    `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        chat_id: "<YOUR_CHAT_ID>",
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
              <div className={styles.sectionTitle}>{t.contactDetails}</div>

              <div className={styles.formRow}>
  <select required defaultValue="">
    <option value="" disabled>{t.title}</option>
    <option value="Mr.">{t.honorifics.mr}</option>
    <option value="Ms.">{t.honorifics.ms}</option>
    <option value="Mrs.">{t.honorifics.mrs}</option>
    <option value="Dr.">{t.honorifics.dr}</option>
  </select>
  <input type="text" placeholder={t.firstName} required />
  <input type="text" placeholder={t.lastName} required />
  <input type="text" placeholder={t.citizenship} required />
</div>

<div className={styles.formRow}>
  <input type="email" placeholder={t.email} required />
  <input type="tel" placeholder={t.phone} required />
</div>

<div className={styles.formRow}>
  <input type="date" required />
  <select required defaultValue="1">
    <option value="1">{t.travelers.one}</option>
    <option value="2">{t.travelers.two}</option>
    <option value="3">{t.travelers.three}</option>
    <option value="4">{t.travelers.four}</option>
  </select>
</div>


              <textarea placeholder={t.comments} rows="4" />

              <button className={styles.requestBtn} type="submit">
                {t.requestBtn}
              </button>
            </form>
          </section>

          {/* Reviews */}
          <section ref={reviewsRef} className={styles.tabContent}>
            <h2>{t.reviews}</h2>
            <p>{t.noReviews}</p>
          </section>
        </div>

        {/* Right card */}
        <div className={styles.detailsCard}>
          <h2>{tour.title}</h2>
          <div className={styles.price}>US${tour.price}</div>

          <div className={styles.infoLine}>
            <span>{t.days}</span>
            <span>{days}</span>
          </div>
          <div className={styles.infoLine}>
            <span>{t.start}</span>
            <span>{formatDate(tour.startDate)}</span>
          </div>
          <div className={styles.infoLine}>
            <span>{t.end}</span>
            <span>{formatDate(tour.endDate)}</span>
          </div>
          <div className={styles.infoLine}>
            <span>{t.availableSeats}</span>
            <span>{tour.availableSeats}</span>
          </div>

          <button className={styles.bookBtn}>{t.bookNow}</button>
        </div>
      </div>
    </div>
  );
}
