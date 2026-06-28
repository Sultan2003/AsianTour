export default class LanguageDetector {
  type = "languageDetector";
  init() {}
  detect() { return localStorage.getItem("lang") || navigator.language || "en"; }
  cacheUserLanguage(language) { localStorage.setItem("lang", (language || "en").split("-")[0]); }
}
