export type Language = "en" | "es" | "de" | "it" | "fr" | "zh" | "da" | "ja";

export interface LanguageInfo {
  country: string;
  language: Language;
  label: string;
}

const languages: Record<Language, LanguageInfo> = {
  en: { country: "us", language: "en", label: "English" },
  es: { country: "es", language: "es", label: "Español" },
  de: { country: "de", language: "de", label: "Deutsch" },
  it: { country: "it", language: "it", label: "Italiano" },
  fr: { country: "fr", language: "fr", label: "Français" },
  zh: { country: "cn", language: "zh", label: "中文" },
  da: { country: "dk", language: "da", label: "Dansk" },
  ja: { country: "jp", language: "ja", label: "日本語" },
};

export default languages;
