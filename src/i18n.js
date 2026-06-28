import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";

const normalizeLanguage = (language) => (language || "en").split("-")[0];

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ru: { translation: ru },
      },
      fallbackLng: "en",
      supportedLngs: ["en", "ru"],
      load: "languageOnly",
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
        lookupLocalStorage: "lang",
        caches: ["localStorage"],
        convertDetectedLanguage: normalizeLanguage,
      },
    });
}

export const getStrapiLocale = (language = i18n.language) =>
  normalizeLanguage(language) === "ru" ? "ru-RU" : "en";

export default i18n;
