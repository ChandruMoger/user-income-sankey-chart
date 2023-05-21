import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from './Select';
import Logo from "./Logo";
const options = [
  {
    value: "en",
    title: "English"
  },
  {
    value: "kn",
    title: "Kannada"
  },
  {
    value: "hn",
    title: "Hindi"
  },
];
const Header = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('en')

  const handleLanguageChange = (e) => {
    const { value } = e.target;
    setLang(value);
    i18n.changeLanguage(value);
  };

  // Langauage Selector Component
  const LangSelector = () => {
    return <div className="d-flex column-gap-10">
        <label className="text-white" data-testid="lan-select-label" htmlFor="select-lang">{t("select-lang")}</label>
        <Select      
          id="select-lang"
          selected={lang}
          options={options}
          onChange={handleLanguageChange}
        />
      </div>
  }
  return (
    <header className="header p-2 d-flex justify-content-between align-items-center">
      <Logo classes="w-150" />      
      <LangSelector />
    </header>
  );
};

export default Header;
