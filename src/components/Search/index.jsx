import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Search.module.scss";

const STRAPI_BASE = "https://brilliant-passion-7d3870e44b.strapiapp.com";
const API_URL = `${STRAPI_BASE}/api/asian-tours?populate=*`;

// Convert "03/27/2026" → "2026-03-27"
const normalizeSlashDate = (str) => {
  if (!str || typeof str !== "string") return null;
  const m = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return str;
  const [_, mm, dd, yyyy] = m;
  return `${yyyy}-${mm}-${dd}`;
};

// Extract plain text (used when reading description blocks)
const extractPlainText = (desc) => {
  if (!desc) return "";
  if (typeof desc === "string") return desc;
  if (Array.isArray(desc))
    return desc
      .map((b) =>
        b.children ? b.children.map((c) => c.text || "").join("") : ""
      )
      .join(" ");
  return "";
};

// Normalize Strapi item (top-level or attributes)
const normalizeTour = (rawItem) => {
  const raw = rawItem.attributes || rawItem;

  return {
    id: rawItem.id,
    documentId: rawItem.documentId || raw.documentId || rawItem.id,

    title: raw.title || "",
    price: raw.price ?? 0,
    availableSeats: raw.availableSeats ?? 0,

    startDate: raw.startDate || null,
    endDate: raw.endDate || null,

    location: raw.location || "",
    tour_type: raw.tour_type || "",

    description: raw.description || [], // keep as array
    daysdescription: raw.daysdescription || "",

    image: raw.image || null,
  };
};

// Convert a Strapi file to a usable URL
const makeFullUrl = (file) => {
  if (!file) return null;
  const url =
    file.url ||
    file?.formats?.small?.url ||
    file?.formats?.thumbnail?.url ||
    "";
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_BASE}${url}`;
};

export default function SearchPage() {
  const locationHook = useLocation();
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATES
  const [destinations, setDestinations] = useState([]);
  const [month, setMonth] = useState("");
  const [type, setType] = useState("");

  // Load filters from URL
  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);
    const d = params.get("destinations");

    setDestinations(d ? d.split(",") : []);
    setMonth(params.get("month") || "");
    setType(params.get("type") || "");
  }, [locationHook.search]);

  // Fetch tours
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        const list = json?.data || [];
        setTours(list.map((t) => normalizeTour(t)));
      } catch (e) {
        console.error("Error loading tours:", e);
      }
      setLoading(false);
    };
    fetchTours();
  }, []);

  // Fetch images for matching (like Uzbekistan page)
  useEffect(() => {
    fetch(`${STRAPI_BASE}/api/upload/files`)
      .then((res) => res.json())
      .then((arr) => {
        if (!Array.isArray(arr)) return;
        setImages(
          arr.map((img) => ({
            ...img,
            fullUrl: makeFullUrl(img),
            alt: (img.alternativeText || "").toLowerCase().trim(),
            nameLower: (img.name || "").toLowerCase().trim(),
          }))
        );
      })
      .catch(() => {});
  }, []);

  // match image where alternativeText == title
  const getImageForTitle = (title) => {
    if (!title) return null;
    const t = title.toLowerCase().trim();

    const found =
      images.find((img) => img.alt === t) ||
      images.find((img) => img.nameLower.includes(t));

    return found ? found.fullUrl : null;
  };

  const imageOrPlaceholder = (title) =>
    getImageForTitle(title) ||
    `https://via.placeholder.com/400x400?text=${encodeURIComponent(
      title.slice(0, 24)
    )}`;

  // Extract multiple dates from description array
  const extractMultipleDates = (tour) => {
    const blocks = tour.description || [];
    const dates = [];

    blocks.forEach((block) => {
      const text = block?.children?.[0]?.text || "";
      const matches = [
        ...text.matchAll(/startDate:\s*"([^"]+)"[, ]+endDate:\s*"([^"]+)"/g),
      ];

      matches.forEach((m) => {
        dates.push({
          startDate: normalizeSlashDate(m[1]),
          endDate: normalizeSlashDate(m[2]),
        });
      });
    });

    return dates;
  };

  // Return only dates belonging to selected month
  const getDatesForSelectedMonth = (tour, selectedMonth) => {
    if (!selectedMonth) return [];

    const list = [];

    // Main date
    if (tour.startDate) {
      const m = new Date(tour.startDate).toLocaleString("en-US", {
        month: "short",
      });
      if (m === selectedMonth) {
        list.push({
          startDate: tour.startDate,
          endDate: tour.endDate,
        });
      }
    }

    // Extra dates
    const extra = extractMultipleDates(tour);
    extra.forEach((d) => {
      const m = new Date(d.startDate).toLocaleString("en-US", {
        month: "short",
      });
      if (m === selectedMonth) list.push(d);
    });

    return list;
  };

  // Update URL
  const updateURL = (d, m, t) => {
    const params = new URLSearchParams();
    if (d.length > 0) params.set("destinations", d.join(","));
    if (m) params.set("month", m);
    if (t) params.set("type", t);
    navigate(`/search?${params.toString()}`);
  };

  // Filter Actions
  const handleDestinationChange = (d) => {
    let updated = [...destinations];
    updated = updated.includes(d)
      ? updated.filter((x) => x !== d)
      : [...updated, d];

    setDestinations(updated);
    updateURL(updated, month, type);
  };

  const handleMonthChange = (m) => {
    setMonth(m);
    updateURL(destinations, m, type);
  };

  const handleTypeChange = (t) => {
    setType(t);
    updateURL(destinations, month, t);
  };

  // FILTERING
  const filteredTours = tours
    .filter((tour) => {
      const c = tour.location || "";
      return destinations.length === 0 || destinations.includes(c);
    })
    .filter((tour) => {
      if (!month) return true;

      // Check main date
      if (tour.startDate) {
        const m = new Date(tour.startDate).toLocaleString("en-US", {
          month: "short",
        });
        if (m === month) return true;
      }

      // Check in extra
      return extractMultipleDates(tour).some((d) => {
        const m = new Date(d.startDate).toLocaleString("en-US", {
          month: "short",
        });
        return m === month;
      });
    })
    .filter((tour) => {
      if (!type) return true;
      const mainType = tour.tour_type?.split(",")[0].trim();
      return mainType === type;
    });

  return (
    <div className={styles.background} >
    <div className={styles.searchPage}>
      {/* LEFT RESULTS */}
      <div className={styles.results}>
        <h2>Search Results</h2>

        {loading ? (
          <p>Loading tours…</p>
        ) : (
          <p>{filteredTours.length} tour(s) found</p>
        )}

        {!loading &&
          filteredTours.map((tour) => {
            const datesForMonth = getDatesForSelectedMonth(tour, month);

            return (
              <div
                key={tour.id}
                className={styles.bigTourCard}
                onClick={() => navigate(`/tour/${tour.documentId}`)}
              >
                <div className={styles.bigImg}>
                  <img src={imageOrPlaceholder(tour.title)} alt={tour.title} />
                </div>

                <div className={styles.bigInfo}>
                  <h3 className={styles.bigTitle}>{tour.title}</h3>

                  {/* Date section */}
                  {month ? (
                    <>
                      {datesForMonth.length > 0 ? (
                        <p className={styles.summary}>
                          <b>Dates in {month}:</b>
                          <br />
                          {datesForMonth.map((d, i) => (
                            <span key={i}>
                              {d.startDate} → {d.endDate}
                              <br />
                            </span>
                          ))}
                        </p>
                      ) : (
                        <p className={styles.summary}>
                          No dates available for {month}.
                        </p>
                      )}
                    </>
                  ) : (
                    <p className={styles.summary}>
                      {tour.startDate} → {tour.endDate}
                    </p>
                  )}

                  <div className={styles.metaRow}>
                    <span>{tour.location}</span>
                    <span className={styles.dot}>•</span>
                    <span>{tour.tour_type}</span>
                    <span className={styles.dot}>•</span>
                    <span>{tour.availableSeats} seats</span>
                  </div>

                  <div className={styles.bottomRow}>
                    <div className={styles.price}>US$ {tour.price}</div>
                    <button className={styles.detailsBtn}>Details</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* RIGHT FILTERS */}
      <aside className={styles.rightFilters}>
        <h3>Filters</h3>

        <div className={styles.filterBlock}>
          <h4>Destinations</h4>
          {[
            "Uzbekistan",
            "Kazakhstan",
            "Kyrgyzstan",
            "Tajikistan",
            "Turkmenistan",
          ].map((d) => (
            <label key={d}>
              <input
                type="checkbox"
                checked={destinations.includes(d)}
                onChange={() => handleDestinationChange(d)}
              />
              {d}
            </label>
          ))}
        </div>

        <div className={styles.filterBlock}>
          <h4>Departure Month</h4>
          <select
            value={month}
            onChange={(e) => handleMonthChange(e.target.value)}
          >
            <option value="">Any</option>
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterBlock}>
          <h4>Tour Type</h4>
          {["Group", "Private"].map((t) => (
            <label key={t}>
              <input
                type="radio"
                name="type"
                checked={type === t}
                onChange={() => handleTypeChange(t)}
              />
              {t}
            </label>
          ))}
        </div>
      </aside>
    </div>
    </div>
  );
}
