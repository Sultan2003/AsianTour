import { useEffect, useMemo, useRef, useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Tourdetail.module.scss";
import translations from "../../translations/tourdetail";

const STRAPI_BASE = "https://brilliant-passion-7d3870e44b.strapiapp.com";

export default function PrivateTourIdPage() {
  const { documentId } = useParams();
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();

  // --- Related tours (right sidebar) state ---
  const [relatedTours, setRelatedTours] = useState([]);
  const [relatedCategories, setRelatedCategories] = useState({});
  const [openCats, setOpenCats] = useState({});

  // refs for sticky nav
  const itineraryRef = useRef(null);
  const pricesRef = useRef(null);
  const requestRef = useRef(null);
  const reviewsRef = useRef(null);

  const t =
    translations[
      strapiLocale.startsWith("ru")
        ? "ru"
        : strapiLocale.startsWith("uz")
        ? "uz"
        : "en"
    ];

  // helper: extract plain text from Strapi rich text blocks
  const extractPlainText = (desc) => {
    if (!desc) return "";
    if (typeof desc === "string") return desc;
    if (Array.isArray(desc)) {
      return desc
        .map((block) =>
          block.children ? block.children.map((c) => c.text || "").join("") : ""
        )
        .join(" ");
    }
    if (typeof desc === "object") {
      return Object.values(desc)
        .map((v) => (typeof v === "string" ? v : ""))
        .join(" ");
    }
    return "";
  };

  // normalize tour item (handles top-level or attributes shape)
  const normalizeTour = (rawItem) => {
    const raw = rawItem.attributes ? rawItem.attributes : rawItem;

    return {
      id: rawItem.id || raw.id || Math.random().toString(36).slice(2),
      documentId:
        raw.documentId || rawItem.documentId || raw.slug || rawItem.id,
      title: raw.title || raw.name || rawItem.title || rawItem.name || "",
      price: raw.price ?? raw.pricePerPerson ?? rawItem.price ?? 0,
      startDate:
        raw.startDate ||
        raw.start_date ||
        raw.date ||
        rawItem.startDate ||
        rawItem.start_date ||
        null,
      endDate:
        raw.endDate ||
        raw.end_date ||
        rawItem.endDate ||
        rawItem.end_date ||
        null,
      availableSeats:
        raw.availableSeats ??
        raw.available_seats ??
        raw.available ??
        rawItem.availableSeats ??
        rawItem.available ??
        0,
      location: raw.location || raw.place || rawItem.location || "",
      daysdescription: raw.daysdescription || rawItem.daysdescription || "",
      description: extractPlainText(raw.description) || raw.description || "",
      tour_type:
        (raw.tour_type ?? raw.tourType ?? raw.type) ||
        rawItem.tour_type ||
        rawItem.tourType ||
        "",
      isBestseller: raw.isBestseller || raw.bestseller || false,
      image: raw.image || raw.cover || null,
    };
  };

  // fetch data: tour list (to find the selected tour) and images
  useEffect(() => {
    fetch(`${STRAPI_BASE}/api/asian-tours?locale=${strapiLocale}`)
      .then((r) => r.json())
      .then((data) => {
        // find ONLY private tours
        const allTours = (data?.data || []).map((t) => normalizeTour(t));
        const privateTours = allTours.filter((t) =>
          (t.tour_type || "").toLowerCase().includes("private")
        );

        // find tour by documentId
        const found = privateTours.find(
          (t) => String(t.documentId) === String(documentId)
        );

        setTour(found || null);
      })
      .catch(console.error);

    fetch(`${STRAPI_BASE}/api/upload/files`)
      .then((r) => r.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setImages(arr);
      })
      .catch(console.error);
  }, [documentId, strapiLocale]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [documentId]);

  // --- Fetch related tours by location once tour is loaded ---
  useEffect(() => {
    if (!tour?.location) {
      setRelatedTours([]);
      setRelatedCategories({});
      return;
    }

    const locationValue = encodeURIComponent(tour.location);

    const url = strapiLocale
      ? `${STRAPI_BASE}/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=${locationValue}`
      : `${STRAPI_BASE}/api/asian-tours?filters[location][$eq]=${locationValue}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const list = (data && data.data) || [];
        const normalized = list.map((it) => normalizeTour(it));

        // Only include private tours
        const privateTours = normalized.filter((tItem) =>
          (tItem.tour_type || "").toLowerCase().includes("private")
        );

        // Remove the current tour from related list (if present)
        const filtered = privateTours.filter(
          (tItem) =>
            String(tItem.documentId) !== String(tour.documentId) &&
            (tItem.location || "")
              .toString()
              .toLowerCase()
              .includes((tour.location || "").toString().toLowerCase())
        );

        // categorize same as UzbekistanTours
        const cats = {
          Cultural: [],
          Gastronomy: [],
          Religious: [],
          Eco: [],
          City: [],
          Business: [],
        };

        filtered.forEach((tItem) => {
          const ttype = (tItem.tour_type || "").toString().toLowerCase();
          const pushIf = (cat) => cats[cat].push(tItem);

          if (
            ttype.includes("cultural") ||
            ttype.includes("culture") ||
            ttype.includes("heritage")
          )
            pushIf("Cultural");

          if (
            ttype.includes("gastronomy") ||
            ttype.includes("food") ||
            ttype.includes("culinary")
          )
            pushIf("Gastronomy");

          if (
            ttype.includes("relig") ||
            ttype.includes("pilgrim") ||
            ttype.includes("mosque") ||
            ttype.includes("temple")
          )
            pushIf("Religious");

          if (ttype.includes("eco") || ttype.includes("nature")) pushIf("Eco");

          if (ttype.includes("city") || ttype.includes("urban")) pushIf("City");

          if (
            ttype.includes("business") ||
            ttype.includes("mice") ||
            ttype.includes("conference")
          )
            pushIf("Business");
        });

        // dedupe
        Object.keys(cats).forEach((k) => {
          const seen = {};
          cats[k] = cats[k].filter((it) => {
            if (seen[it.id]) return false;
            seen[it.id] = true;
            return true;
          });
        });

        setRelatedTours(filtered);
        setRelatedCategories(cats);
      })
      .catch((err) => {
        console.error("Failed to load related tours:", err);
        setRelatedTours([]);
        setRelatedCategories({});
      });
  }, [tour?.location, strapiLocale]);

  const toggleCategory = (cat) =>
    setOpenCats((prev) => ({ ...prev, [cat]: !prev[cat] }));

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
    if (!start || !end) return 1;
    try {
      const s = new Date(start);
      const e = new Date(end);
      const days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 1;
    } catch {
      return 1;
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const parsedArray = Array.isArray(tour?.attributes?.gallery)
    ? tour.attributes.gallery
    : (() => {
        try {
          return JSON.parse(tour?.attributes?.gallery || "[]");
        } catch {
          return [];
        }
      })();

  const parsedDays = useMemo(() => {
    if (!tour?.daysdescription) return [];
    const src = tour.daysdescription.trim();
    const blocks = [];
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

  const [open, setOpen] = useState([]);
  useEffect(() => {
    setOpen(parsedDays.map(() => false));
  }, [parsedDays]);

  const toggle = (i) =>
    setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  if (!tour) {
    return (
      <div className={styles.tourPage}>
        <p className={styles.loading}>Loading Private tour details…</p>
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
          {/* Overview */}
          <section className={styles.tabContent}>
            <h2>{t.overview}</h2>
            {Array.isArray(tour.description) &&
              (() => {
                // Combine all description texts into one big string first
                let fullText = tour.description
                  .map(
                    (node) =>
                      node?.children?.map?.((c) => c.text).join("") ?? ""
                  )
                  .join("\n");

                // Remove the entire Array = [...] block (even if multiline)
                fullText = fullText
                  .replace(/Array\s*=\s*\[[\s\S]*?\];?/g, "")
                  .trim();

                // Split back into paragraphs for display
                const cleanParagraphs = fullText.split(/\n+/).filter(Boolean);

                return cleanParagraphs.map((txt, i) => <p key={i}>{txt}</p>);
              })()}
          </section>

          {/* Itinerary */}
          <section ref={itineraryRef} className={styles.tabContent}>
            <h2>{t.itinerary}</h2>
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

          {/* DATES & PRICES */}
          <section ref={pricesRef} className={styles.tabContent}>
            <h2>{t.datesPrices}</h2>

            <div className={styles.pricesBox}>
              <div className={styles.priceItem}>
                <span>{t.startDate}</span>
                <strong>{formatDate(tour.startDate)}</strong>
              </div>
              <div className={styles.priceItem}>
                <span>{t.endDate}</span>
                <strong>{formatDate(tour.endDate)}</strong>
              </div>
              <div className={styles.priceItem}>
                <span>{t.seats}</span>
                <strong
                  style={{
                    color: tour.availableSeats > 0 ? "green" : "red",
                    fontWeight: 600,
                  }}
                >
                  {tour.availableSeats > 0 ? "Available" : "Sold out"}
                </strong>
              </div>
              <div className={`${styles.priceItem} ${styles.highlight}`}>
                <span>{t.price}</span>
                <strong>US${tour.price}</strong>
              </div>
            </div>

            {parsedArray.length > 0 && (
              <div className={styles.datesTableSection}>
                <div className={styles.yearTabs}>
                  {years.map((year) => (
                    <button
                      key={year}
                      className={`${styles.yearTab} ${
                        Number(year) === activeYear ? styles.active : ""
                      }`}
                      onClick={() => setActiveYear(Number(year))}
                    >
                      {year}
                    </button>
                  ))}
                </div>

                <div className={styles.datesTableWrapper}>
                  <table className={styles.datesTable}>
                    <thead>
                      <tr>
                        <th>Tour Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Book</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedByYear[activeYear]?.map((item) => {
                        const isAvailable = Number(item.availableSeats) > 0;
                        const formattedStart = new Date(
                          item.startDate
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });
                        const formattedEnd = new Date(
                          item.endDate
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });

                        return (
                          <tr key={item.id}>
                            <td>{formattedStart}</td>
                            <td>{formattedEnd}</td>
                            <td
                              className={
                                isAvailable ? styles.available : styles.soldout
                              }
                            >
                              {isAvailable ? "Available" : "Sold out"}
                            </td>
                            <td>US$ {item.price}</td>
                            <td>
                              <button
                                className={styles.bookBtn}
                                disabled={!isAvailable}
                              >
                                Book
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* Request (ENQUIRY) */}
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
                  alert(
                    "✅ Request sent successfully! We will contact you soon."
                  );
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
                  <option value="" disabled>
                    {t.title}
                  </option>
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
        <div>
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

          {/* === RELATED TOURS SIDEBAR (matching Uzbekistan page behaviour) === */}
          <aside className={styles.sidebar} style={{ marginTop: 18 }}>
            <h3>{tour.location} Private Tours</h3>

            {Object.keys(relatedCategories).map((cat) => {
              const items = relatedCategories[cat] || [];
              const isOpen = !!openCats[cat];
              return (
                <div
                  key={cat}
                  className={`${styles.catBlock} ${isOpen ? styles.open : ""}`}
                  style={{ marginBottom: 12 }}
                >
                  <div
                    className={styles.catTitle}
                    onClick={() => toggleCategory(cat)}
                  >
                    <span>{cat} Tours</span>
                    <div className={styles.catMeta}>
                      <span className={styles.count}>({items.length})</span>
                      <span className={styles.chev}>{isOpen ? "▾" : "▸"}</span>
                    </div>
                  </div>

                  <ul className={styles.catList}>
                    {items.length === 0 && (
                      <li className={styles.catEmpty}>No tours</li>
                    )}
                    {items.slice(0, 8).map((tItem) => (
                      <li
                        key={tItem.id}
                        className={styles.catItem}
                        onClick={() =>
                          navigate(`/Private-tour/${tItem.documentId}`)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {tItem.title}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </aside>
        </div>
      </div>
    </div>
  );
}
