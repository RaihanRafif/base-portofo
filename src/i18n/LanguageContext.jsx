// src/i18n/LanguageContext.jsx

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const SUPPORTED = ["en", "id", "ja"];

function detectInitialLang() {
  try {
    const saved = window.localStorage.getItem("lang");
    if (saved && SUPPORTED.includes(saved)) return saved;

    const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (nav.startsWith("id")) return "id";
    if (nav.startsWith("ja")) return "ja";
    return "en";
  } catch {
    return "en";
  }
}

function getByPath(obj, path) {
  if (!obj || !path) return undefined;
  const parts = String(path).split(".").filter(Boolean);
  let cur = obj;
  for (const p of parts) {
    if (cur && Object.prototype.hasOwnProperty.call(cur, p)) cur = cur[p];
    else return undefined;
  }
  return cur;
}

function interpolate(str, vars) {
  if (typeof str !== "string" || !vars) return str;
  let out = str;
  for (const [k, v] of Object.entries(vars)) {
    const re = new RegExp(`{{\\s*${k}\\s*}}`, "g");
    out = out.replace(re, String(v));
  }
  return out;
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLang);

  useEffect(() => {
    try {
      window.localStorage.setItem("lang", lang);
    } catch {
      // ignore
    }

    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo(() => {
    const t = (key, vars) => {
      const active = translations[lang];
      const fallback = translations.en;
      const raw = getByPath(active, key) ?? getByPath(fallback, key);
      if (raw == null) return String(key);
      if (typeof raw === "string") return interpolate(raw, vars);
      return raw;
    };

    /**
     * Localize an arbitrary value from data.js.
     *
     * Supported shapes:
     * - string
     * - array (strings or language-mapped items)
     * - language map object: { en, id, ja }
     *
     * Fallback order: current lang -> en -> id -> ja -> "".
     */
    const l = (value, vars) => {
      if (value == null) return value;

      if (typeof value === "string") {
        return interpolate(value, vars);
      }

      if (Array.isArray(value)) {
        return value.map((v) => l(v, vars));
      }

      if (typeof value === "object") {
        const candidate = value?.[lang] ?? value?.en ?? value?.id ?? value?.ja;
        const resolved =
          candidate == null || candidate === ""
            ? value?.en ?? value?.id ?? value?.ja ?? ""
            : candidate;
        return l(resolved, vars);
      }

      return String(value);
    };

    return {
      lang,
      setLang: (next) => setLang(SUPPORTED.includes(next) ? next : "en"),
      supported: SUPPORTED,
      t,
      l,
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return ctx;
}
