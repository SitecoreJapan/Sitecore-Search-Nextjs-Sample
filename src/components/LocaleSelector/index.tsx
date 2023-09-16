import { useEffect, useContext } from "react";
import languages, { Language } from "@/data/locales"; // データをインポート
import { LanguageContext, ILanguageContext } from "@/contexts/languageContext";

export default function LocaleSelector() {
  const { language, setLanguage } =
    useContext<ILanguageContext>(LanguageContext);

  // ページが読み込まれた際にlocalStorageから言語を読み込む
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(
      "lang"
    ) as Language | null;
    if (savedLanguage && languages[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // ドロップダウンリストの変更ハンドラ
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value as Language;
    setLanguage(newLanguage);
    // 言語をlocalStorageに保存
    window.localStorage.setItem("lang", newLanguage);
  };

  return (
    <div>
      <select onChange={handleLanguageChange} value={language || ""}>
        <option value="">Select a language</option>
        {Object.keys(languages).map((key) => (
          <option key={key} value={key}>
            {languages[key as Language].label}
          </option>
        ))}
      </select>
      <p></p>
    </div>
  );
}
