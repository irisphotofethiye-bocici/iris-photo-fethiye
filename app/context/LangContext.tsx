"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Lang, t as translate } from "@/app/lib/i18n";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("iris-lang");
    if (saved === "en" || saved === "tr") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("iris-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: (key) => translate(lang, key) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
