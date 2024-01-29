import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as frlng from "./fr.json";
import * as enlng from "./en.json";

function initLang() {
  i18n.use(initReactI18next).init({
    resources: {
      fr: frlng,
      en: enlng,
    },
    lng: "fr",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export { initLang };
