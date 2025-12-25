import { useEffect, useMemo, useRef, useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Tourdetail.module.scss";
import translations from "../../translations/tourdetail";

const STRAPI_BASE = "https://brilliant-passion-7d3870e44b.strapiapp.com";

export default function PrivateTourIdPage() {
  const [selectedPriceType, setSelectedPriceType] = useState("Standard");

  const { slug } = useParams();
  const makeSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { strapiLocale } = useContext(LanguageContext);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // --- Related tours (right sidebar) state ---
  const [relatedTours, setRelatedTours] = useState([]);
  const [relatedCategories, setRelatedCategories] = useState({});
  const [openCats, setOpenCats] = useState({});

  // refs for sticky nav
  const itineraryRef = useRef(null);
  const pricesRef = useRef(null);
  const requestRef = useRef(null);
  const reviewsRef = useRef(null);
  const LINK_WORDS = [
    // ✅ Main pages
    { word: "Home", url: "/" },
    { word: "About Us", url: "/about" },
    { word: "Contact", url: "/contact" },
    { word: "Search", url: "/search" },
    { word: "Visa Policy", url: "/visa-policy" },
    { word: "Transfers", url: "/Asian-Tour-Transfer" },

    // ✅ Country tours
    { word: "Uzbekistan Tours", url: "/Uzbek-Tours" },
    { word: "Kazakhstan Tours", url: "/Kazakh-Tours" },
    { word: "Kyrgyzstan Tours", url: "/Kyrgyz-Tours" },
    { word: "Tajikistan Tours", url: "/Tajik-Tours" },
    { word: "Turkmenistan Tours", url: "/Turkmen-Tours" },
    { word: "Central Asia Tours", url: "/Central-Asia-Tours" },
    { word: "Silk Road Tours", url: "/Silk-Road-Tours" },
    { word: "Caucasus Tours", url: "/Caucas-Tours" },
    { word: "Armenia Tours", url: "/Armenia-Tours" },
    { word: "Azerbaijan Tours", url: "/Azerbaijan-Tours" },
    { word: "Georgia Tours", url: "/Georgia-Tours" },

    // ✅ Destinations (country pages)
    { word: "Uzbekistan", url: "/Uzbekistan" },
    { word: "Kazakhstan", url: "/Kazakhstan" },
    { word: "Kyrgyzstan", url: "/Kyrgyzstan" },
    { word: "Tajikistan", url: "/Tajikistan" },
    { word: "Turkmenistan", url: "/Turkmenistan" },
    { word: "Central Asia", url: "/Central-Asia" },
    { word: "Silk Road", url: "/Silk-Road" },
    { word: "Caucasus", url: "/Caucasus" },
    { word: "Armenia", url: "/Armenia" },
    { word: "Azerbaijan", url: "/Azerbaijan" },
    { word: "Georgia", url: "/Georgia" },

    // ✅ City pages
    { word: "Tashkent", url: "/Uzbekistan-Tashkent" },
    { word: "Samarkand", url: "/Uzbekistan-Samarkand" },
    { word: "Bukhara", url: "/Uzbekistan-Bukhara" },
    { word: "Khiva", url: "/Uzbekistan-Khiva" },
    { word: "Astana", url: "/Kazakhstan-Astana" },
    { word: "Almaty", url: "/Kazakhstan-Almaty" },
    { word: "Bishkek", url: "/Kyrgyzstan-Bishkek" },
    { word: "Tbilisi", url: "/Georgia-Tbilisi" },

    // ✅ Tour types
    { word: "City Tours", url: "/City-Tours" },
    { word: "Cultural Tours", url: "/Cultural-Tours" },
    { word: "Gastronomy Tours", url: "/Gastronomy-Tours" },
    { word: "Religious Tours", url: "/Religious-Tours" },
    { word: "Eco Tours", url: "/Eco-Tours" },
    { word: "Business Tours", url: "/Business-Mice-Tours" },

    // ✅ Private tours
    { word: "Uzbekistan Private Tours", url: "/Uzbekistan-Private-Tours" },
    { word: "Kazakhstan Private Tours", url: "/Kazakhstan-Private-Tours" },
    { word: "Silk Road Private Tours", url: "/Silk-Road-Private-Tours" },
    { word: "Central Asia Private Tours", url: "/Central-Asia-Private-Tours" },
    { word: "Kyrgyzstan Private Tours", url: "/Kyrgyzstan-Private-Tours" },
    { word: "Tajikistan Private Tours", url: "/Tajikistan-Private-Tours" },
    { word: "Turkmenistan Private Tours", url: "/Turkmenistan-Private-Tours" },
    { word: "Armenia Private Tours", url: "/Armenia-Private-Tours" },
    { word: "Azerbaijan Private Tours", url: "/Azerbaijan-Private-Tours" },
    { word: "Georgia Private Tours", url: "/Georgia-Private-Tours" },
    { word: "Caucasus Private Tours", url: "/Caucasus-Private-Tours" },
  ];

  const STYLED_WORDS = [
    { word: "", className: styles.importantWord },
    { word: "", className: styles.luxuryWord },
  ];

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
        const found = (data?.data || []).find((t) => {
          const rawTitle = t.attributes?.title || t.title || "";
          return makeSlug(rawTitle) === slug;
        });

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
  }, [slug, strapiLocale]);

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
          const isGroup = (tItem.tour_type || "")
            .toString()
            .toLowerCase()
            .includes("group");

          return !isSameTour && sameLocation && !isGroup;
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

  const days = calculateDays(tour?.startDate, tour?.endDate);
  const isOneDayTour = days === 1;

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

  const parsedPriceInclude = useMemo(() => {
    if (!Array.isArray(tour?.description)) return null;

    const fullText = tour.description
      .map((n) => n?.children?.map((c) => c.text).join("") ?? "")
      .join("\n");

    const match = fullText.match(/Priceinclude\s*=\s*\[([\s\S]*?)\]/i);
    if (!match) return null;

    const block = match[1];

    const does = [];
    const doesNot = [];

    const lines = block
      .replace(/Does:/i, "DOES:")
      .replace(/Doesnot:/i, "DOESNOT:")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let current = null;

    lines.forEach((line) => {
      if (line.includes("DOES:")) {
        current = "does";
        return;
      }
      if (line.includes("DOESNOT:")) {
        current = "doesNot";
        return;
      }

      if (current === "does") does.push(line.replace(/;$/, ""));
      if (current === "doesNot") doesNot.push(line.replace(/;$/, ""));
    });

    return { does, doesNot };
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

  const scrollToRequest = () => {
    scrollTo(requestRef);
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

  const oneDayPrices = useMemo(() => {
    if (!isOneDayTour) return [];

    return parsedArray.map((row) => ({
      persons: row.persons,
      price: row.Standard ?? row.Economy ?? row.Deluxe,
    }));
  }, [parsedArray, isOneDayTour]);

  if (!tour) {
    return (
      <div className={styles.tourPage}>
        <p className={styles.loading}>Loading tour details…</p>
      </div>
    );
  }

  const tourImages = images.filter((img) => img.alternativeText === tour.title);

  const tourVideo = images.find(
    (file) =>
      file.mime.startsWith("video/") &&
      file.caption &&
      file.caption.trim().toLowerCase() === tour.title.trim().toLowerCase()
  );

  const processTextBeforeRender = (rawText) => {
    if (!rawText) return null;

    const lines = rawText.split("\n");

    return lines.map((line, lineIndex) => {
      const trimmedLine = line.trim();

      // ✅ SPECIAL STYLE ONLY FOR "Tour itinerary:"
      if (trimmedLine.toLowerCase() === "tour itinerary:") {
        return (
          <h3 key={lineIndex} className={styles.itineraryLine}>
            {trimmedLine}
          </h3>
        );
      }

      let parts = [line];

      // 🔗 Apply LINKS
      LINK_WORDS.forEach(({ word, url }) => {
        parts = parts.flatMap((part, i) => {
          if (typeof part !== "string") return part;

          const regex = new RegExp(`(${word})`, "gi");
          const split = part.split(regex);

          return split.map((chunk, idx) =>
            chunk.toLowerCase() === word.toLowerCase() ? (
              <a
                key={`${word}-${i}-${idx}`}
                href={url}
                className={styles.autoLink}
              >
                {chunk}
              </a>
            ) : (
              chunk
            )
          );
        });
      });

      // ✨ Apply STYLED WORDS
      STYLED_WORDS.forEach(({ word, className }) => {
        parts = parts.flatMap((part, i) => {
          if (typeof part !== "string") return part;

          const regex = new RegExp(`(${word})`, "gi");
          const split = part.split(regex);

          return split.map((chunk, idx) =>
            chunk.toLowerCase() === word.toLowerCase() ? (
              <span key={`${word}-${i}-${idx}`} className={className}>
                {chunk}
              </span>
            ) : (
              chunk
            )
          );
        });
      });

      return (
        <p key={lineIndex} className={styles.processedParagraph}>
          {parts}
        </p>
      );
    });
  };

  const hasValidItinerary = (() => {
    if (!tour?.daysdescription) return false;

    const text = tour.daysdescription.trim();

    // split by any whitespace
    const words = text.split(/\s+/);

    // ❌ hide ONLY if exactly one word and it's "empty"
    if (words.length === 1 && words[0].toLowerCase() === "empty") {
      return false;
    }

    // ✅ show in all other cases
    return true;
  })();

  return (
    <div className={styles.tourPage}>
      {/* HERO */}
      <div className={styles.heroContainer}>
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

        {/* Vertical Gallery */}
        {tourImages.length > 1 && (
          <div className={styles.verticalGallery}>
            {tourImages.map((img, idx) => (
              <div
                key={idx}
                className={`${styles.thumb} ${
                  idx === currentIndex ? styles.active : ""
                }`}
                onClick={() => setCurrentIndex(idx)}
              >
                <img
                  src={img.url}
                  alt={img.alternativeText || `Image ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        )}
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

          {/* Overview */}
          <section className={styles.tabContent}>
            <h2>{t.overview}</h2>

            {(() => {
              if (!Array.isArray(tour.description)) return null;

              let fullText = tour.description
                .map(
                  (node) => node?.children?.map((c) => c.text).join("") ?? ""
                )
                .join("\n");

              fullText = fullText.replace(/Array\s*=\s*\[[\s\S]*?\];?/gi, "");
              fullText = fullText.replace(
                /Accomodation\s*=\s*\[[\s\S]*?\];?/gi,
                ""
              );
              fullText = fullText.replace(
                /Priceinclude\s*=\s*\[[\s\S]*?\];?/gi,
                ""
              );

              return processTextBeforeRender(fullText);
            })()}
          </section>

          {/* Itinerary */}
          {hasValidItinerary && (
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
                      <div className={styles.itineraryText}>
                        {processTextBeforeRender(d.body)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ACCOMMODATION */}
          {Array.isArray(tour.description) &&
            (() => {
              const descText = tour.description
                .map(
                  (node) => node?.children?.map?.((c) => c.text).join("") ?? ""
                )
                .join("\n");

              const match = descText.match(
                /Accomodation\s*=\s*\[([\s\S]*?)\];/i
              );
              if (!match) return null;

              // Split into object-like blocks. Use a strict split for `},{` variants.
              const objectBlocks = match[1]
                .split(/}\s*,\s*{/) // split between objects
                .map((b) => b.replace(/^[\s\[{]+|[\s\]}]+$/g, "").trim()) // remove leftover braces/brackets
                .filter((b) => /City\s*:/i.test(b)); // only blocks that contain City

              const accommodations = objectBlocks.map((block) => {
                // Get City
                const cityMatch = block.match(/City\s*:\s*([^,}]+)/i);
                const city = cityMatch ? cityMatch[1].trim() : "";

                // Get Days (number)
                const daysMatch = block.match(/Days\s*:\s*([0-9]+)/i);
                const days = daysMatch ? Number(daysMatch[1]) : null;

                // Get Hotels — capture up to the Days token (if present)
                // Use non-greedy match and lookahead for Days or end of block
                const hotelsMatch = block.match(
                  /Hotels\s*:\s*([\s\S]*?)(?=(\s*Days\s*:)|$)/i
                );
                let hotelsRaw = hotelsMatch ? hotelsMatch[1].trim() : "";

                // Remove any accidental 'Days: X' appearing inside hotelsRaw (safety)
                hotelsRaw = hotelsRaw.replace(/Days\s*:\s*[0-9]+/gi, "").trim();

                const hotels = {};

                const economyMatch = hotelsRaw.match(
                  /Economy\s*:\s*"([^"]+)"/i
                );
                const standardMatch = hotelsRaw.match(
                  /Standard\s*:\s*"([^"]+)"/i
                );
                const deluxeMatch = hotelsRaw.match(/Deluxe\s*:\s*"([^"]+)"/i);

                if (economyMatch) hotels.Economy = economyMatch[1];
                if (standardMatch) hotels.Standard = standardMatch[1];
                if (deluxeMatch) hotels.Deluxe = deluxeMatch[1];

                return { city, hotels, days };
              });

              return (
                <section className={styles.accommodationSection}>
                  <h2>Accommodation:</h2>
                  <div className={styles.accommodationTable}>
                    {accommodations.map((a, i) => (
                      <div key={i} className={styles.accommodationRow}>
                        {/* show days next to city (top) */}
                        <div className={styles.cityRow}>
                          <strong>{a.city}</strong>{" "}
                          <span className={styles.days}>
                            {" "}
                            - {a.days ?? "-"} nights
                          </span>
                        </div>

                        {/* hotels list (Days token removed) */}
                        <div className={styles.hotelList}>
                          {a.hotels && Object.keys(a.hotels).length
                            ? Object.entries(a.hotels).map(
                                ([type, hotelStr]) => (
                                  <div key={type} className={styles.hotelGroup}>
                                    <span className={styles.hotelType}>
                                      {type}:
                                    </span>

                                    {hotelStr.split("/").map((hotel, idx) => (
                                      <span
                                        key={idx}
                                        className={styles.hotelItem}
                                      >
                                        {idx > 0 && " / "}
                                        {hotel.trim()}
                                      </span>
                                    ))}
                                  </div>
                                )
                              )
                            : "No hotels provided"}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })()}

          {/* ✅ PRICE INCLUDES / EXCLUDES — MATCHED WITH TAB STYLE */}
          {parsedPriceInclude && (
            <section className={styles.tabContent}>
              <h2>Price Includes & Excludes</h2>

              <div className={styles.priceIncludeWrapper}>
                {/* ✅ INCLUDES */}
                <div className={styles.priceIncludeBox}>
                  <h3 className={styles.priceIncludeTitle}>
                    ✅ Price includes:
                  </h3>
                  <ul>
                    {parsedPriceInclude.does.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* ❌ EXCLUDES */}
                <div className={styles.priceExcludeBox}>
                  <h3 className={styles.priceExcludeTitle}>
                    ❌ Price doesn’t include:
                  </h3>
                  <ul>
                    {parsedPriceInclude.doesNot.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* DATES & PRICES */}
          <section ref={pricesRef} className={styles.tabContent}>
            <h2>Prices, per person</h2>

            {/* ✅ 1-DAY TOUR */}
            {isOneDayTour && (
              <div className={styles.oneDayPriceList}>
                {oneDayPrices.map((item, i) => (
                  <div className={styles.oneDayRow}>
                    <div className={styles.personprice}>
                      <span>{item.persons}</span>
                      <strong>US$ {item.price}</strong>
                    </div>
                    <div className={styles.oneDayPrice}>
                      <button
                        className={styles.oneDayRequest}
                        onClick={() => {
                          setSelectedBooking({
                            persons: item.persons,
                            standard: item.price,
                          });
                          setShowBookingModal(true);
                        }}
                      >
                        Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ✅ MULTI-DAY TOUR (existing table) */}
            {!isOneDayTour && parsedArray.length > 0 && (
              <div className={styles.datesTableSection}>
                <div className={styles.datesTableWrapper}>
                  <table className={styles.datesTable}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Economy</th>
                        <th>Standard</th>
                        <th>Deluxe</th>
                        <th>Request</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedArray.map((row, index) => (
                        <tr key={index}>
                          <td>{row.persons}</td>
                          <td>US$ {row.Economy}</td>
                          <td>US$ {row.Standard}</td>
                          <td>US$ {row.Deluxe}</td>
                          <td>
                            <button
                              className={styles.bookBtn}
                              onClick={() => {
                                setSelectedBooking({
                                  persons: row.persons,
                                  economy: row.Economy,
                                  standard: row.Standard,
                                  deluxe: row.Deluxe,
                                });
                                setSelectedPriceType("Standard"); // reset default
                                setShowBookingModal(true);
                              }}
                            >
                              Request
                            </button>
                          </td>
                        </tr>
                      ))}
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

            {/* SHORT PRICE TABLE */}
            {/* SHORT PRICE TABLE – CLEANED + ALIGNED */}
            {/* ✅ 1-DAY TOUR — SIMPLE LIST */}
            {isOneDayTour && (
              <div className={styles.shortOneDay}>
                {oneDayPrices.map((item, i) => (
                  <div key={i} className={styles.shortOneDayRow}>
                    <span>{item.persons}</span>
                    <strong>US$ {item.price}</strong>
                  </div>
                ))}
              </div>
            )}

            {/* ✅ MULTI-DAY TOUR — EXISTING TABLE */}
            {!isOneDayTour && (
              <table className={styles.shortPrice}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Economy</th>
                    <th>Standard</th>
                    <th>Deluxe</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedArray.map((row, index) => (
                    <tr key={index}>
                      <td>{row.persons}</td>
                      <td>{row.Economy}</td>
                      <td>{row.Standard}</td>
                      <td>{row.Deluxe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {tourVideo && (
            <div className={styles.videoContainer}>
              <h3>{t.videoTitle || "Travel Route Map"}</h3>

              <div
                className={styles.videoPreview}
                onClick={() => setShowVideoModal(true)}
              >
                <video
                  controls={false}
                  preload="none"
                  poster={
                    tourImages?.length
                      ? tourImages[0].url
                      : "/placeholder-video-thumbnail.jpg"
                  }
                  width="100%"
                  style={{
                    borderRadius: "10px",
                    marginTop: "10px",
                    maxHeight: "250px",
                    objectFit: "cover",
                    backgroundColor: "#000",
                    cursor: "pointer",
                  }}
                >
                  <source
                    src={
                      tourVideo.url.startsWith("http")
                        ? tourVideo.url
                        : `${STRAPI_BASE}${tourVideo.url}`
                    }
                    type="video/mp4"
                  />
                </video>

                <div className={styles.playOverlay}>▶</div>
              </div>
            </div>
          )}

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
                      <span>{isOpen ? "▾" : "▸"}</span>
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
                          const slug = makeSlug(tItem.title);
                          navigate(`/Private-tour/${slug}`);
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
      {showVideoModal && (
        <div
          className={styles.videoModalOverlay}
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className={styles.videoModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setShowVideoModal(false)}
            >
              ×
            </button>

            <video
              controls
              autoPlay
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                maxHeight: "80vh",
              }}
            >
              <source
                src={
                  tourVideo.url.startsWith("http")
                    ? tourVideo.url
                    : `${STRAPI_BASE}${tourVideo.url}`
                }
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      )}

      {showBookingModal && selectedBooking && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeModal}
              onClick={() => setShowBookingModal(false)}
            >
              ×
            </button>

            <h2>Book This Tour</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const fullName = formData.get("fullName");
                const email = formData.get("email");

                const message = `
New Private Tour Booking Request

Tour: ${tour.title}
Location: ${tour.location}

Persons: ${selectedBooking.persons}
Economy: ${selectedBooking.economy || "-"}
Standard: ${selectedBooking.standard || "-"}
Deluxe: ${selectedBooking.deluxe || "-"}

Guest Name: ${fullName}
Guest Email: ${email}
          `;

                try {
                  await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      access_key: "86fb5231-beba-4945-826b-7728bb77b4db",
                      to: "reservation@gotocentralasia.com",
                      subject: "New Private Tour Booking Request",
                      text: message,
                    }),
                  });

                  alert(
                    "Your request has been sent to reservation@gotocentralasia.com. We will contact you soon."
                  );
                  setShowBookingModal(false);
                } catch (error) {
                  alert("Failed to send. Please try again.");
                }
              }}
            >
              <label>Full Name</label>
              <input name="fullName" required type="text" />

              <label>Email</label>
              <input name="email" required type="email" />

              <label>Tour</label>
              <input value={tour.title} readOnly />

              <label>Persons</label>
              <input value={selectedBooking.persons} readOnly />

              <label>Select Package</label>

              <div className={styles.priceOptions}>
                <label>
                  <input
                    type="radio"
                    name="priceType"
                    value="Standard"
                    checked={selectedPriceType === "Standard"}
                    onChange={() => setSelectedPriceType("Standard")}
                  />
                  Standard — {selectedBooking.standard}
                </label>

                <label>
                  <input
                    type="radio"
                    name="priceType"
                    value="Economy"
                    checked={selectedPriceType === "Economy"}
                    onChange={() => setSelectedPriceType("Economy")}
                  />
                  Economy — {selectedBooking.economy}
                </label>

                <label>
                  <input
                    type="radio"
                    name="priceType"
                    value="Deluxe"
                    checked={selectedPriceType === "Deluxe"}
                    onChange={() => setSelectedPriceType("Deluxe")}
                  />
                  Deluxe — {selectedBooking.deluxe}
                </label>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Booking Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
