import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";
import pa from "./locales/pa.json";
import ka from "./locales/ka.json";
import gu from "./locales/gu.json";
import ur from "./locales/ur.json"; // <-- Urdu added

const LANG_KEY = "APP_LANGUAGE";

// AUTO DETECT OR LOAD SAVED LANGUAGE
const getInitialLanguage = async () => {
  // 1. If user manually selected a language before → use it
  const storedLang = await AsyncStorage.getItem(LANG_KEY);
  if (storedLang) return storedLang;

  // 2. Detect device language
  const deviceLang = RNLocalize.getLocales()[0]?.languageCode;

  const supported = ["en", "hi", "mr", "pa", "ka", "gu", "ur"];

  return supported.includes(deviceLang) ? deviceLang : "en";
};

getInitialLanguage().then((lang) => {
  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: "v3",
      lng: lang,
      fallbackLng: "en",
      resources: {
        en: { translation: en },
        hi: { translation: hi },
        mr: { translation: mr },
        pa: { translation: pa },
        ka: { translation: ka },
        gu: { translation: gu },
        ur: { translation: ur }, // <-- Urdu included
      },
      interpolation: { escapeValue: false },
    });
});

// Function to change language manually
export const changeLanguage = async (lang) => {
  await AsyncStorage.setItem(LANG_KEY, lang);

  // AUTO HANDLE RTL LANGUAGES
  if (lang === "ur") {
    // Urdu is RTL
    import("react-native").then(({ I18nManager }) => {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    });
  } else {
    import("react-native").then(({ I18nManager }) => {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    });
  }

  i18n.changeLanguage(lang);
};

export default i18n;
