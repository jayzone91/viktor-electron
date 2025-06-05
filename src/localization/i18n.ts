import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "de-DE",
  resources: {
    en: {
      translation: {
        appName: "Viktor",
        Close: "Close",
        Minimize: "Minimize",
        Maximize: "Maximize",
        titleHomePage: "Home Page",
        titleSecondPage: "Second Page",
        titleThirdPage: "Third Page",
      },
    },
    "de-DE": {
      translation: {
        appName: "Viktor",
        Close: "Schließen",
        Minimize: "Minimieren",
        Maximize: "Maximieren",
        titleHomePage: "Erste Seite",
        titleSecondPage: "Zweite Seite",
        titleThirdPage: "Dritte Seite",
      },
    },
  },
});
