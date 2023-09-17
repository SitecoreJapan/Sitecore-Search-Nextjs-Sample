import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { LanguageContext } from "@/contexts/languageContext";
import { PageController, WidgetsProvider } from "@sitecore-search/react";
import type { Environment } from "@sitecore-search/data";
import type { AppProps } from "next/app";
import useStorage from "@/hooks/useLocalStorage";
import locales, { Language } from "@/data/locales";
import {
  SEARCH_ENV,
  SEARCH_CUSTOMER_KEY,
  SEARCH_API_KEY,
} from "@/constants/search";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  const [storageLanguage, setStorageLanguage] = useStorage(
    "lang",
    "en" as Language
  );
  const [language, setLanguage] = useState<Language>(storageLanguage);

  PageController.getContext().setLocaleLanguage(language);
  PageController.getContext().setLocaleCountry(locales[language].country);

  useEffect(() => {
    PageController.getContext().setLocaleLanguage(language);
    PageController.getContext().setLocaleCountry(locales[language].country);
    setStorageLanguage(language);
  }, [language, setStorageLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <WidgetsProvider
        env={SEARCH_ENV as Environment}
        customerKey={SEARCH_CUSTOMER_KEY}
        apiKey={SEARCH_API_KEY}
      >
        <Header />
        <Component {...pageProps} />
      </WidgetsProvider>
    </LanguageContext.Provider>
  );
}
