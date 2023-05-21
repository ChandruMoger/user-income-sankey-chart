import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationKN from "./locales/kan/translation.json";
import translationHN from "./locales/hn/translation.json";
// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  kn: {
    translation: translationKN,
  },
  hn: {
    translation: translationHN
  }
};
i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }    
  });

export default i18n;
