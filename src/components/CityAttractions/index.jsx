import { useEffect, useMemo, useState } from "react";
import styles from "./CityAttractions.module.scss";

const STRAPI_BASE = "https://brilliant-passion-7d3870e44b.strapiapp.com";

const ATTRACTION_TYPES = [
  { key: "attractions", title: "Attractions" },
  { key: "vicinity", title: "Vicinity" },
  { key: "museums", title: "Museums" },
  { key: "leisure", title: "Leisure" },
  { key: "miscellaneous", title: "Miscellaneous" },
];

const getRawAttraction = (item) => item?.attributes || item || {};

const normalize = (value) =>
  (value || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

const getAttractionType = (item) =>
  normalize(
    item.type ||
      item.Type ||
      item.attraction_type ||
      item.category ||
      item.categories?.[0] ||
      item.attributes?.type ||
      item.attributes?.Type ||
      item.attributes?.attraction_type,
  );

const getAttractionUrl = (item) => {
  const raw = getRawAttraction(item);
  return raw.slug ? `/attractions/${raw.slug}` : "#";
};

const sortByTitle = (a, b) => {
  const titleA = getRawAttraction(a).title || "";
  const titleB = getRawAttraction(b).title || "";
  return titleA.localeCompare(titleB);
};

export default function CityAttractions({ city }) {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cityKey = normalize(city);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(
      `${STRAPI_BASE}/api/attractions?pagination[pageSize]=100&sort=title:asc`,
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error("Attractions request failed");
        return response.json();
      })
      .then((data) => setAttractions(data.data || []))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load attractions");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [cityKey]);

  const groupedAttractions = useMemo(() => {
    const groups = ATTRACTION_TYPES.reduce((acc, type) => {
      acc[type.key] = [];
      return acc;
    }, {});

    attractions.forEach((item) => {
      const raw = getRawAttraction(item);
      const type = getAttractionType(raw);
      const matchedType = ATTRACTION_TYPES.find(
        ({ key }) => type === `${cityKey}-${key}`,
      );

      if (matchedType) groups[matchedType.key].push(item);
    });

    return groups;
  }, [attractions, cityKey]);

  const hasAttractions = ATTRACTION_TYPES.some(
    ({ key }) => groupedAttractions[key]?.length,
  );

  if (loading) {
    return (
      <section className={styles.cityAttractions}>
        <h2>More Attractions in {city}</h2>
        <p className={styles.status}>Loading attractions...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.cityAttractions}>
        <h2>More Attractions in {city}</h2>
        <p className={styles.status}>Unable to load attractions right now.</p>
      </section>
    );
  }

  if (!hasAttractions) return null;

  return (
    <section className={styles.cityAttractions}>
      <h2>More Attractions in {city}</h2>

      {ATTRACTION_TYPES.map(({ key, title }) => {
        const items = [...(groupedAttractions[key] || [])].sort(sortByTitle);
        if (!items.length) return null;

        return (
          <div key={key} className={styles.typeGroup}>
            <h3>{title}</h3>
            <div className={styles.attractionsGrid}>
              {items.map((item) => {
                const raw = getRawAttraction(item);

                return (
                  <a
                    key={raw.slug || raw.id || raw.title}
                    href={getAttractionUrl(item)}
                  >
                    {raw.title}
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
