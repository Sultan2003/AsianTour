import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.scss";
import TranslateWidget from "../TranslateWidget/TranslateWidget";

const LANGUAGES = [
  { code: "en", flag: "🇬🇧", nameKey: "language.english", short: "EN" },
  { code: "ru", flag: "🇷🇺", nameKey: "language.russian", short: "RU" },
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const currentCode = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const current = LANGUAGES.find((language) => language.code === currentCode) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  };

  return (
    <div className={styles.switcher} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        aria-label={t("language.label")}
        aria-expanded={open}
      >
        <span>{current.flag}</span>
        <span>{current.short}</span>
        <span>▾</span>
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.options}>
            {LANGUAGES.map((language) => {
              const active = language.code === current.code;
              return (
                <button
                  key={language.code}
                  type="button"
                  className={`${styles.option} ${active ? styles.active : ""}`}
                  onClick={() => changeLanguage(language.code)}
                  role="menuitemradio"
                  aria-checked={active}
                >
                  <span>{language.flag}</span>
                  <span className={styles.name}>{t(language.nameKey)}</span>
                  {active && <span className={styles.check}>✓</span>}
                </button>
              );
            })}
            <TranslateWidget
              buttonClassName={styles.option}
              buttonContent={
                <>
                  <span>🌐</span>
                  <span className={styles.name}>{t("language.googleTranslate")}</span>
                </>
              }
              buttonStyle={null}
              onOpen={() => setOpen(false)}
            />
          </div>
          <button type="button" className={styles.translate} onClick={() => setOpen(false)}>
            {t("language.translate")}
          </button>
        </div>
      )}
    </div>
  );
}
