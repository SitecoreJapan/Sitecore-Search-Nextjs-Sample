import { createContext } from "react";

import type { Language } from "@/data/locales";

export const LanguageContext = createContext({
  language: "",
  setLanguage: (l: Language) => {},
});

export interface ILanguageContext {
  language: string;
  setLanguage: (t: Language) => void;
}
