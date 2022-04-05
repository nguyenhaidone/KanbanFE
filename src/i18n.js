import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_vn from "./translate/vn/common.json";
import common_en from "./translate/en/common.json";

const resources = {
  en: {
    translation: {
      label: {},
      error: {},
      message: {},
      text: common_en,
      content: {}
    }
  },
  vn: {
    translation: {
      label: {},
      error: {},
      message: {},
      text: common_vn,
      content: {}
    }
  }
};

i18n.use(initReactI18next).init({
  resources,

  lng: "en",

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
