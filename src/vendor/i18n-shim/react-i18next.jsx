import { useSyncExternalStore } from "react";
import i18n from "./i18next";

export const initReactI18next = { type: "3rdParty", init() {} };

export function useTranslation() {
  useSyncExternalStore(
    (callback) => {
      i18n.on("languageChanged", callback);
      return () => i18n.off("languageChanged", callback);
    },
    () => i18n.language,
    () => i18n.language,
  );

  return { t: i18n.t.bind(i18n), i18n };
}
