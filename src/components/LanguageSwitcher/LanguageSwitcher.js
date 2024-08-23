import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import "./LanguageSwitcher.css"; 

const languages = {
  en: "EN",
  pl: "PL",
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/").slice(2).join("/");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 980);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    navigate(`/${lang}/${currentPath}`);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div>
      {!isMobile ? (
        <div className='language-switcher'>
             <span
            onClick={() => handleLanguageChange("pl")}
            className={`language-text ${i18n.language === "pl" ? "active" : ""}`}
          >
            {languages["pl"]}
          </span> |
          <span
            onClick={() => handleLanguageChange("en")}
            className={`language-text ${i18n.language === "en" ? "active" : ""}`}
          >
            {languages["en"]}
          </span>
       
        </div>
      ) : (
        <div className={`language-switcher-dropdown ${dropdownOpen ? 'open' : ''}`}>
          <div className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {languages[i18n.language]}
          </div>
          <div className="dropdown-content">
            {Object.entries(languages).map(([lang, label]) => (
              <div key={lang} onClick={() => handleLanguageChange(lang)}>
                {label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
