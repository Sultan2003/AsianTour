import { createContext, useEffect, useState } from "react";
import i18n, { getStrapiLocale } from "../i18n";

export const LanguageContext = createContext();

const normalizeLanguage = (language) => (language || "en").split("-")[0];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(normalizeLanguage(i18n.language));

  useEffect(() => {
    const handleLanguageChange = (language) => {
      const normalized = normalizeLanguage(language);
      setLangState(normalized);
      localStorage.setItem("lang", normalized);
    };

    i18n.on("languageChanged", handleLanguageChange);
    handleLanguageChange(i18n.language);

    return () => i18n.off("languageChanged", handleLanguageChange);
  }, []);

  const setLang = (language) => {
    const normalized = normalizeLanguage(language);
    i18n.changeLanguage(normalized);
    localStorage.setItem("lang", normalized);
    setLangState(normalized);
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, strapiLocale: getStrapiLocale(lang) }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
