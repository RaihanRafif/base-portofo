import React from "react";
import { useI18n } from "../i18n/LanguageContext";

const LANGUAGE_LABELS = {
  id: "ID",
  en: "EN",
  ja: "日本語",
};

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
        <button
          key={code}
          type="button"
          className={`lang-btn ${lang === code ? "lang-btn--active" : ""}`}
          onClick={() => setLang(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
