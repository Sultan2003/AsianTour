// src/context/LanguageContext.js
import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // 👉 mapping for Strapi locales
  const strapiLocale = lang === "ru" ? "ru-RU" : "en";

  return (
    <LanguageContext.Provider value={{ lang, setLang, strapiLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
