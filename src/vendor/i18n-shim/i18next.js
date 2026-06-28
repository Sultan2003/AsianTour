let currentLanguage = localStorage.getItem("lang") || "en";
let resources = {};
const listeners = new Set();
const i18n = {
  isInitialized: false,
  language: currentLanguage,
  resolvedLanguage: currentLanguage,
  use() { return this; },
  init(options = {}) {
    resources = options.resources || {};
    this.isInitialized = true;
    return Promise.resolve(this);
  },
  changeLanguage(language) {
    currentLanguage = (language || "en").split("-")[0];
    this.language = currentLanguage;
    this.resolvedLanguage = currentLanguage;
    localStorage.setItem("lang", currentLanguage);
    listeners.forEach((listener) => listener(currentLanguage));
    return Promise.resolve(this);
  },
  on(event, listener) { if (event === "languageChanged") listeners.add(listener); },
  off(event, listener) { if (event === "languageChanged") listeners.delete(listener); },
  t(key) {
    return key.split('.').reduce((value, part) => value?.[part], resources[currentLanguage]?.translation) ??
      key.split('.').reduce((value, part) => value?.[part], resources.en?.translation) ?? key;
  },
};
export default i18n;
