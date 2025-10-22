import { useEffect, useMemo, useRef, useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Tourdetail.module.scss";
import translations from "../../translations/tourdetail";

const STRAPI_BASE = "https://brilliant-passion-7d3870e44b.strapiapp.com";

export default function TourIdPage() {
  const { documentId } = useParams();
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);

  // --- Related tours (right sidebar) state ---
  const [relatedTours, setRelatedTours] = useState([]);
  const [relatedCategories, setRelatedCategories] = useState({});
  const [openCats, setOpenCats] = useState({});
  const [files, setFiles] = useState([]);

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
        // find tour by documentId
        const found = (data?.data || []).find(
          (t) => t.documentId?.toString() === documentId
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

        // Remove the current tour from related list (if present)
        const filtered = normalized.filter((tItem) => {
          const isSameTour =
            String(tItem.documentId) === String(tour.documentId);
          const sameLocation = (tItem.location || "")
            .toString()
            .toLowerCase()
            .includes((tour.location || "").toString().toLowerCase());
          const isPrivate = (tItem.tour_type || "")
            .toString()
            .toLowerCase()
            .includes("private");

          return !isSameTour && sameLocation && !isPrivate;
        });

        // categorize exactly same as UzbekistanTours
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

        // dedupe within each category
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

  // --- Extract Array of dates & prices ---
  const parsedArray = useMemo(() => {
    if (!Array.isArray(tour?.description)) return [];
    const arrayText = tour.description
      .map((node) => node?.children?.map((c) => c.text).join("") ?? "")
      .join(" ");
    const match = arrayText.match(/Array\s*=\s*\[([\s\S]*?)\];/);
    if (!match) return [];
    try {
      const arrStr = "[" + match[1] + "]";
      const jsonReady = arrStr
        .replace(/(\b\w+\b)\s*:/g, '"$1":')
        .replace(/'/g, '"');
      const parsed = JSON.parse(jsonReady);
      return parsed;
    } catch (err) {
      console.error("Failed to parse array:", err);
      return [];
    }
  }, [tour]);

  // accordion
  const [open, setOpen] = useState([]);
  useEffect(() => {
    setOpen(parsedDays.map(() => false));
  }, [parsedDays]);

  // --- Fetch Reviews ---
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!tour?.title) return;

    fetch(`${STRAPI_BASE}/api/reviews-plural?locale=${strapiLocale}&populate=*`)
      .then((r) => r.json())
      .then((data) => {
        const all = data?.data || [];
        const matched = all.filter(
          (r) => r.Title?.trim() === tour.title?.trim()
        );
        setReviews(matched);
      })
      .catch(console.error);
  }, [tour?.title, strapiLocale]);

  const toggle = (i) =>
    setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const scrollTo = (ref) => {
    if (!ref?.current) return;
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // grouped years for dates/prices table
  const groupedByYear = parsedArray.reduce((acc, item) => {
    const year = new Date(item.startDate).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});
  const years = Object.keys(groupedByYear).sort();
  const currentYear = new Date().getFullYear();
  const [activeYear, setActiveYear] = useState(
    years.includes(String(currentYear))
      ? currentYear
      : Number(years[years.length - 1]) || currentYear
  );

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
          backgroundImage:
            tourImages?.length && tourImages[currentIndex]?.url
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
                let fullText = tour.description
                  .map(
                    (node) =>
                      node?.children?.map?.((c) => c.text).join("") ?? ""
                  )
                  .join("\n");

                // Remove the entire Array = [...] and Accommodation = [...] blocks
                fullText = fullText
                  .replace(/Array\s*=\s*\[[\s\S]*?\];?/g, "")
                  .replace(/Accomodation\s*=\s*\[[\s\S]*?\];?/g, "")
                  .trim();

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
                            <td data-label="Start Date">{formattedStart}</td>
                            <td data-label="End Date">{formattedEnd}</td>
                            <td
                              data-label="Status"
                              className={
                                isAvailable ? styles.available : styles.soldout
                              }
                            >
                              {isAvailable ? "Available" : "Sold out"}
                            </td>
                            <td data-label="Price">US$ {item.price}</td>
                            <td data-label="Book">
                              <button
                                className={`${styles.bookBtn} ${
                                  isAvailable
                                    ? styles.availableBtn
                                    : styles.soldoutBtn
                                }`}
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

          {/* ACCOMMODATION */}
          {Array.isArray(tour.description) &&
            (() => {
              const descText = tour.description
                .map(
                  (node) => node?.children?.map?.((c) => c.text).join("") ?? ""
                )
                .join("\n");

              const match = descText.match(
                /Accomodation\s*=\s*\[([\s\S]*?)\];/
              );
              if (!match) return null;

              // Split by '}' or ',' between accommodation objects
              const objectBlocks = match[1]
                .split(/}\s*,\s*{|\n|},/)
                .map((b) => b.replace(/[\[\]{}]/g, "").trim())
                .filter((b) => b.includes("City"));

              const accommodations = objectBlocks.map((block) => {
                const cityMatch = block.match(/City\s*:\s*([^,]+)\s*,/);
                const hotelsMatch = block.match(/Hotels\s*:\s*([\s\S]+)/);
                return {
                  city: cityMatch ? cityMatch[1].trim() : "",
                  hotels: hotelsMatch
                    ? hotelsMatch[1]
                        .split(",")
                        .map((h) => h.trim())
                        .filter(Boolean)
                    : [],
                };
              });

              return (
                <section className={styles.accommodationSection}>
                  <h2>Accommodation:</h2>
                  <div className={styles.accommodationTable}>
                    {accommodations.map((a, i) => (
                      <div key={i} className={styles.accommodationRow}>
                        <div className={styles.cityRow}>
                          {a.city} <span>- 2 nights</span>
                        </div>
                        <div className={styles.hotelList}>
                          {a.hotels.join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })()}

          {/* REVIEW FORM */}

          {showReviewForm && (
            <section className={styles.reviewForm}>
              <h3>Write your review</h3>

              {/* local files state and handlers */}
              {/* Place these hooks near other useState declarations at top of component:
      const [files, setFiles] = useState([]); */}
              {/* If you haven't added it yet, add `const [files, setFiles] = useState([]);` near other states. */}

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const title = tour?.title || "Unknown Tour";

                  const TELEGRAM_BOT_TOKEN =
                    "7509089585:AAFlUQJVRK3qtgLN4FVWHwEPeahjfv2oFpY";
                  const TELEGRAM_CHAT_ID = "-1003082651864";

                  // Build message (include current tour title)
                  const message = `
📍 *New Tour Review!*
🏷️ *Tour:* ${title}
👤 *Author:* ${formData.get("author")}
⭐ *Rating:* ${formData.get("rating")}
📅 *Visited:* ${formData.get("visitedDate")}
📝 *Review:* ${formData.get("reviewText")}
💭 *Visited Text:* ${formData.get("visitedText")}
`;

                  try {
                    // send text
                    await fetch(
                      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          chat_id: TELEGRAM_CHAT_ID,
                          text: message,
                          parse_mode: "Markdown",
                        }),
                      }
                    );

                    // send files from files state
                    for (const file of files) {
                      // skip very large files (Telegram limits: photos ~10MB, videos <=50MB)
                      if (file.size > 50 * 1024 * 1024) {
                        console.warn("Skipping file >50MB:", file.name);
                        continue;
                      }

                      const fd = new FormData();
                      fd.append("chat_id", TELEGRAM_CHAT_ID);

                      if (file.type.startsWith("video/")) {
                        fd.append("video", file);
                        await fetch(
                          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`,
                          {
                            method: "POST",
                            body: fd,
                          }
                        );
                      } else {
                        fd.append("photo", file);
                        await fetch(
                          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
                          {
                            method: "POST",
                            body: fd,
                          }
                        );
                      }
                    }

                    alert("✅ Review sent successfully!");
                    e.target.reset();
                    setFiles([]);
                  } catch (err) {
                    console.error("Failed to send review:", err);
                    alert(
                      "❌ Failed to send review. Check console for details."
                    );
                  }
                }}
              >
                <input
                  name="author"
                  type="text"
                  placeholder="Your name"
                  required
                />
                <div className={styles.rowInputs}>
                  <input name="visitedDate" type="date" required />
                  <input
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Rating (1–5)"
                    required
                  />
                </div>

                <input
                  name="visitedText"
                  type="text"
                  placeholder="Where/when you visited"
                />
                <textarea
                  name="reviewText"
                  rows="4"
                  placeholder="Write your review..."
                  required
                />

                {/* Drop zone uses files state handlers below (add them near other handlers) */}
                <div
                  className={styles.dropZone}
                  onDrop={(e) => {
                    e.preventDefault();
                    const dtFiles = Array.from(e.dataTransfer.files || []);
                    if (dtFiles.length) {
                      // merge with existing files
                      setFiles((prev) => [...prev, ...dtFiles]);
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    // open hidden input
                    const input = document.getElementById("mediaInput");
                    if (input) input.click();
                  }}
                >
                  <p>
                    📸 Drag & drop images or videos here, or click to upload
                  </p>
                  <input
                    id="mediaInput"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const chosen = Array.from(e.target.files || []);
                      if (chosen.length)
                        setFiles((prev) => [...prev, ...chosen]);
                    }}
                  />
                </div>

                {/* Preview + remove */}
                {files.length > 0 && (
                  <div className={styles.preview}>
                    {files.map((file, idx) => (
                      <div key={idx} className={styles.previewItem}>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() =>
                            setFiles((prev) => prev.filter((_, i) => i !== idx))
                          }
                        >
                          ❌
                        </button>

                        {file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                          />
                        ) : (
                          <video src={URL.createObjectURL(file)} controls />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button type="submit">Submit Review</button>
              </form>
            </section>
          )}
          <section ref={reviewsRef} className={styles.tabContent}>
            <div className={styles.reviewwrite}>
              <h2>{t.reviews}</h2>
              <span
                className={styles.writeReviewLink}
                onClick={() => setShowReviewForm((prev) => !prev)}
              >
                Write your own review...
              </span>
            </div>
            {reviews.length === 0 ? (
              <p>{t.noReviews}</p>
            ) : (
              reviews.map((rev) => {
                const text =
                  rev.ReviewText?.map((p) =>
                    p.children?.map((c) => c.text).join("")
                  ).join(" ") || "";

                const date = new Date(rev.VisitedDate).toLocaleDateString(
                  "en-GB",
                  {
                    month: "long",
                    year: "numeric",
                  }
                );

                const imgs = rev.ReviewMedias || [];

                return (
                  <div key={rev.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <strong>Author:</strong> {rev.Author} &nbsp;|&nbsp;
                      <strong>Rating:</strong> {rev.Rating}
                      <span style={{ float: "right" }}>
                        <strong>Visited:</strong> {date}
                      </span>
                    </div>
                    <div className={styles.reviewBody}>
                      <p>{text}</p>
                      <div className={styles.reviewImages}>
                        {imgs.map((img) => (
                          <img
                            key={img.id}
                            src={img.url}
                            alt={img.alternativeText || ""}
                            className={styles.reviewImg}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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
            <h3>{tour.location} Group Tours</h3>

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
                        onClick={() => {
                          navigate(`/tour/${tItem.documentId}`);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
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
