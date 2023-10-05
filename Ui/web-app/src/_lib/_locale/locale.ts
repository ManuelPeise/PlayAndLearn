import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import commonEn from "./_resources/common/commonEn.json";
import commonDe from "./_resources/common/commonDe.json";
import memoryEn from "./_resources/memory/memoryEn.json";
import memoryDe from "./_resources/memory/memoryDE.json";

const languages = ["de", "en"];
export const supportedLanguages = {
  de: {
    common: commonDe,
    memory: memoryDe,
  },
  en: {
    common: commonEn,
    memory: memoryEn,
  },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "de",
  fallbackLng: "en",
  resources: supportedLanguages,
});

export const onLanguageChange = (key: number) => {
  i18next.changeLanguage(languages[key]);
};

export default i18next;
