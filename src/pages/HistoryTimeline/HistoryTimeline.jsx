import React, { useEffect, useMemo, useState } from "react";
import { historyData } from "./historyData";
import styles from "./HistoryTimeline.module.scss";

const UI = {
  ru: {
    eyebrow: "ИСТОРИЯ · ХРОНОЛОГИЯ",
    title: "Даты Центральной Азии",
    intro: "Интерактивная историческая хронология Узбекистана и Центральной Азии.",
    search: "Поиск по датам и событиям…",
    sections: "Разделы",
    all: "Вся хронология",
    results: "Найдено",
    noResults: "По вашему запросу ничего не найдено.",
    entries: "записей",
    reference: "СПРАВКА",
    timeline: "ХРОНОЛОГИЯ",
    guide: "МАТЕРИАЛ",
    clear: "Очистить",
    back: "Наверх",
  },
  en: {
    eyebrow: "HISTORY · CHRONOLOGY",
    title: "Central Asia Dates",
    intro: "An interactive historical chronology of Uzbekistan and Central Asia.",
    search: "Search dates and events…",
    sections: "Sections",
    all: "Full chronology",
    results: "Results",
    noResults: "No results found for your search.",
    entries: "entries",
    reference: "REFERENCE",
    timeline: "CHRONOLOGY",
    guide: "MATERIAL",
    clear: "Clear",
    back: "Back to top",
  },
};

const getLanguage = (prop) => {
  if (prop === "ru" || prop === "en") return prop;
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("lang") === "ru" ? "ru" : "en";
};

const text = (value, lang) => {
  if (value && typeof value === "object") return value[lang] || value.en || value.ru || "";
  return String(value ?? "");
};

const normalize = (value) => String(value ?? "").toLocaleLowerCase().normalize("NFKC");

function TimelineItem({ item, lang, index }) {
  const date = text(item.date, lang);
  const content = text(item.content, lang);

  return (
    <article className={styles.timelineItem}>
      <div className={styles.timelineRail} aria-hidden="true">
        <span className={styles.marker}>{index + 1}</span>
      </div>
      <div className={styles.timelineCard}>
        {date && <div className={styles.date}>{date}</div>}
        {content && <p>{content}</p>}
      </div>
    </article>
  );
}

function DataTable({ section, lang }) {
  const rows = section.rows || section.table || [];
  if (!rows.length) return null;

  return (
    <div className={styles.tableShell} role="region" tabIndex={0}>
      <table className={styles.dataTable}>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const value = text(cell, lang);
                return rowIndex === 0
                  ? <th key={cellIndex} scope="col">{value}</th>
                  : <td key={cellIndex}>{value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RichText({ paragraphs, lang }) {
  return (
    <div className={styles.richText}>
      {(paragraphs || []).map((paragraph, index) => {
        const value = text(paragraph, lang).trim();
        if (!value) return null;

        const isList = /^[-–—•]\s/.test(value);
        const isHeadingLike = value.length < 100 && !/[.!?]$/.test(value) && !/[,;:]/.test(value);

        if (isList) return <p className={styles.listLine} key={index}>{value}</p>;
        if (isHeadingLike) return <h3 key={index}>{value}</h3>;
        return <p key={index}>{value}</p>;
      })}
    </div>
  );
}

export default function HistoryTimeline({ lang: langProp }) {
  const [lang, setLang] = useState(() => getLanguage(langProp));
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("main-chronology");

  useEffect(() => {
    if (langProp === "ru" || langProp === "en") {
      setLang(langProp);
      return;
    }

    const sync = () => {
      const value = window.localStorage.getItem("lang");
      if (value === "ru" || value === "en") setLang(value);
    };

    window.addEventListener("storage", sync);
    window.addEventListener("languagechange", sync);
    const timer = window.setInterval(sync, 300);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("languagechange", sync);
      window.clearInterval(timer);
    };
  }, [langProp]);

  const t = UI[lang];

  const sections = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return historyData.sections;

    return historyData.sections.map((section) => {
      if (section.kind === "timeline") {
        return {
          ...section,
          items: (section.items || []).filter((item) =>
            normalize(`${text(item.date, lang)} ${text(item.content, lang)}`).includes(q)
          ),
        };
      }

      if (section.kind === "table") {
        return {
          ...section,
          rows: (section.rows || []).filter((row) =>
            row.some((cell) => normalize(text(cell, lang)).includes(q))
          ),
        };
      }

      if (section.kind === "richTextTable") {
        return {
          ...section,
          paragraphs: (section.paragraphs || []).filter((p) => normalize(text(p, lang)).includes(q)),
          table: (section.table || []).filter((row) =>
            row.some((cell) => normalize(text(cell, lang)).includes(q))
          ),
        };
      }

      return {
        ...section,
        paragraphs: (section.paragraphs || []).filter((p) => normalize(text(p, lang)).includes(q)),
      };
    }).filter((section) => {
      if (section.kind === "timeline") return section.items.length;
      if (section.kind === "table") return section.rows.length;
      if (section.kind === "richTextTable") return section.paragraphs.length || section.table.length;
      return section.paragraphs.length;
    });
  }, [query, lang]);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const kindLabel = (kind) =>
    kind === "timeline" ? t.timeline : kind === "table" ? t.reference : t.guide;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.intro}>
          <div className={styles.introCopy}>
            <span className={styles.eyebrow}>{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
          </div>
          <div className={styles.introMark} aria-hidden="true">
            <span>CA</span>
            <i />
          </div>
        </section>

        <div className={styles.toolbar}>
          <label className={styles.search}>
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              aria-label={t.search}
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label={t.clear}>×</button>
            )}
          </label>
          <div className={styles.resultCount}>
            <strong>{query ? sections.reduce((n, s) => n + (s.items?.length || s.rows?.length || s.paragraphs?.length || 0), 0) : historyData.source.mainChronologyRows}</strong>
            <span>{query ? t.results : t.entries}</span>
          </div>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <div className={styles.sidebarHeading}>{t.sections}</div>
              <button
                type="button"
                className={active === "main-chronology" && !query ? styles.navActive : styles.navButton}
                onClick={() => { setQuery(""); scrollTo("main-chronology"); }}
              >
                <span>01</span>{t.all}
              </button>
              {historyData.sections.map((section, index) => (
                <button
                  type="button"
                  key={section.id}
                  className={active === section.id && !query ? styles.navActive : styles.navButton}
                  onClick={() => scrollTo(section.id)}
                >
                  <span>{String(index + 2).padStart(2, "0")}</span>
                  {text(section.title, lang)}
                </button>
              ))}
            </div>
          </aside>

          <main className={styles.content}>
            {query && !sections.length && (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>⌕</div>
                <h2>{t.noResults}</h2>
                <button type="button" onClick={() => setQuery("")}>{t.clear}</button>
              </div>
            )}

            {sections.map((section) => (
              <section className={styles.section} id={section.id} key={section.id}>
                <div className={styles.sectionHeading}>
                  <div>
                    <span className={styles.sectionKicker}>{kindLabel(section.kind)}</span>
                    <h2>{text(section.title, lang)}</h2>
                  </div>
                  {section.kind === "timeline" && <span className={styles.count}>{section.items.length}</span>}
                </div>

                {section.kind === "timeline" && (
                  <div className={styles.timeline}>
                    {section.items.map((item, index) => (
                      <TimelineItem key={`${text(item.date, lang)}-${index}`} item={item} lang={lang} index={index} />
                    ))}
                  </div>
                )}

                {section.kind === "table" && <DataTable section={section} lang={lang} />}
                {section.kind === "richText" && <RichText paragraphs={section.paragraphs} lang={lang} />}
                {section.kind === "richTextTable" && (
                  <>
                    <RichText paragraphs={section.paragraphs} lang={lang} />
                    <DataTable section={section} lang={lang} />
                  </>
                )}
              </section>
            ))}
          </main>
        </div>
      </div>

      <button type="button" className={styles.backTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={t.back}>
        ↑
      </button>
    </div>
  );
}
