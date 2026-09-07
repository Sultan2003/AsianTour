import React, { useMemo, useState } from "react";
import { historyData } from "./historyData";
import styles from "./HistoryTimeline.module.scss";

const UI = {
  ru: {
    eyebrow: "ИСТОРИЯ · ХРОНОЛОГИЯ",
    title: "Даты Центральной Азии",
    intro: "Профессиональная интерактивная версия исторической хронологии и справочного материала из исходного документа.",
    search: "Поиск по датам и событиям…",
    sections: "Разделы",
    all: "Вся хронология",
    results: "Результаты",
    noResults: "Ничего не найдено.",
    source: "Источник",
    sourceLang: "Язык исходного документа: русский",
    back: "Наверх",
    rows: "записей",
    table: "Таблица",
    readMore: "Подробнее",
  },
  en: {
    eyebrow: "HISTORY · CHRONOLOGY",
    title: "Central Asia Dates",
    intro: "A professional interactive version of the historical chronology and reference material from the supplied source document.",
    search: "Search dates and events…",
    sections: "Sections",
    all: "Full chronology",
    results: "Results",
    noResults: "No results found.",
    source: "Source",
    sourceLang: "Source document language: Russian",
    back: "Back to top",
    rows: "entries",
    table: "Table",
    readMore: "Details",
  },
};

function normalize(value) {
  return String(value ?? "").toLocaleLowerCase();
}

function TimelineItem({ item }) {
  return (
    <article className={styles.timelineItem}>
      <div className={styles.marker} aria-hidden="true" />
      <div className={styles.timelineCard}>
        {item.date && <div className={styles.date}>{item.date}</div>}
        <p>{item.content}</p>
      </div>
    </article>
  );
}

function DataTable({ section, lang }) {
  const rows = section.rows || [];
  if (!rows.length) return null;
  const headers = rows[0];
  const body = rows.slice(1);
  return (
    <div className={styles.tableWrap} role="region" aria-label={section.titleEn} tabIndex="0">
      <table className={styles.dataTable}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h || `${UI[lang].table} ${i + 1}`}</th>)}</tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RichText({ paragraphs }) {
  return (
    <div className={styles.richText}>
      {paragraphs.map((text, index) => {
        const isList = /^[-–—•]\s/.test(text);
        const isHeadingLike = text.length < 110 && !/[.!?]$/.test(text);
        if (isList) return <p className={styles.listLine} key={index}>{text}</p>;
        if (isHeadingLike) return <h3 key={index}>{text}</h3>;
        return <p key={index}>{text}</p>;
      })}
    </div>
  );
}

export default function HistoryTimeline() {
  // If your project already exposes a language context, replace this local state
  // with that context. Keeping it local makes the page independently testable.
  const [lang, setLang] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    return stored === "ru" ? "ru" : "en";
  });
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("main-chronology");

  const t = UI[lang];
  const filteredMain = useMemo(() => {
    const section = historyData.sections.find((s) => s.id === "main-chronology");
    if (!query.trim()) return section?.items || [];
    const q = normalize(query);
    return (section?.items || []).filter((item) => normalize(`${item.date} ${item.content}`).includes(q));
  }, [query]);

  const visibleSections = useMemo(() => {
    if (!query.trim()) return historyData.sections;
    return historyData.sections.filter((section) => {
      if (section.kind === "timeline") return section.items?.some((x) => normalize(`${x.date} ${x.content}`).includes(normalize(query)));
      if (section.kind === "table") return section.rows?.some((row) => row.some((cell) => normalize(cell).includes(normalize(query))));
      return section.paragraphs?.some((p) => normalize(p).includes(normalize(query)));
    });
  }, [query]);

  const changeLang = (next) => {
    setLang(next);
    if (typeof window !== "undefined") localStorage.setItem("lang", next);
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.topbar}>
            <span className={styles.eyebrow}>{t.eyebrow}</span>
            <div className={styles.locale} aria-label="Language">
              <button className={lang === "en" ? styles.activeLocale : ""} onClick={() => changeLang("en")}>EN</button>
              <button className={lang === "ru" ? styles.activeLocale : ""} onClick={() => changeLang("ru")}>RU</button>
            </div>
          </div>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
          <div className={styles.heroMeta}>
            <span>{historyData.source.mainChronologyRows.toLocaleString()} {t.rows}</span>
            <span>•</span>
            <span>{t.sourceLang}</span>
          </div>
          <label className={styles.search}>
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search} />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
          </label>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarInner}>
              <div className={styles.sidebarTitle}>{t.sections}</div>
              <button className={!query && active === "main-chronology" ? styles.navActive : styles.navButton} onClick={() => { setQuery(""); setActive("main-chronology"); document.getElementById("main-chronology")?.scrollIntoView({ behavior: "smooth" }); }}>{t.all}</button>
              {historyData.sections.map((section) => (
                <button key={section.id} className={!query && active === section.id ? styles.navActive : styles.navButton} onClick={() => { setActive(section.id); document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
                  {lang === "ru" ? section.titleRu : section.titleEn}
                </button>
              ))}
            </div>
          </aside>

          <main className={styles.content}>
            {query && <div className={styles.resultBanner}>{t.results}: <strong>{visibleSections.length}</strong></div>}

            {historyData.sections.map((section) => {
              const title = lang === "ru" ? section.titleRu : section.titleEn;
              if (query && !visibleSections.some((x) => x.id === section.id)) return null;
              return (
                <section className={styles.section} id={section.id} key={section.id}>
                  <div className={styles.sectionHeading}>
                    <div>
                      <span className={styles.sectionKicker}>{section.kind === "timeline" ? "TIMELINE" : section.kind === "table" ? "REFERENCE" : "GUIDE"}</span>
                      <h2>{title}</h2>
                    </div>
                    {section.kind === "timeline" && <span className={styles.count}>{(section.id === "main-chronology" ? filteredMain : section.items).length}</span>}
                  </div>

                  {section.kind === "timeline" && (
                    <div className={styles.timeline}>
                      {(section.id === "main-chronology" ? filteredMain : section.items).map((item, index) => <TimelineItem item={item} key={`${item.date}-${index}`} />)}
                    </div>
                  )}
                  {section.kind === "table" && <DataTable section={section} lang={lang} />}
                  {section.kind === "richText" && <RichText paragraphs={section.paragraphs} />}
                  {section.kind === "richTextTable" && <><RichText paragraphs={section.paragraphs} /><DataTable section={{ ...section, rows: section.table }} lang={lang} /></>}
                </section>
              );
            })}

            {query && visibleSections.length === 0 && <div className={styles.empty}>{t.noResults}</div>}
            <footer className={styles.footer}>
              <span>{t.source}: {historyData.source.fileName}</span>
              <span>{t.sourceLang}</span>
            </footer>
          </main>
        </div>
      </div>

      <button className={styles.backTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={t.back}>↑</button>
    </div>
  );
}
