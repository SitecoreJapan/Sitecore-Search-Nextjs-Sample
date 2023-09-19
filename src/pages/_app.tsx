import "@/styles/globals.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { LanguageContext } from "@/contexts/languageContext";
import useStorage from "@/hooks/useLocalStorage";
import locales, { Language } from "@/data/locales";
import { PageController, WidgetsProvider } from "@sitecore-search/react";
import type { Environment } from "@sitecore-search/data";
import {
  SEARCH_ENV,
  SEARCH_CUSTOMER_KEY,
  SEARCH_API_KEY,
} from "@/constants/search";
import Header from "@/components/Header";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <WidgetsProvider
            env={SEARCH_ENV as Environment}
            customerKey={SEARCH_CUSTOMER_KEY}
            apiKey={SEARCH_API_KEY}
          >
            <Header />
            <Component {...pageProps} />
          </WidgetsProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </LanguageContext.Provider>
  );
}
