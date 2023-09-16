import React, { useEffect, useState } from "react";
import { PageController, WidgetsProvider } from "@sitecore-search/react";
import { LanguageContext } from "@/contexts/languageContext";

import type { AppProps } from "next/app";
import type { Environment } from "@sitecore-search/data";
import {
  SEARCH_ENV,
  SEARCH_CUSTOMER_KEY,
  SEARCH_API_KEY,
} from "@/constants/search";
import Header from "@/components/Header";
import locales, { Language } from "@/data/locales";
import useStorage from "@/hooks/useStorage";

export default function App({ Component, pageProps }: AppProps) {
  const [storageLanguage, setStorageLanguage] = useStorage("lang", "en");
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
