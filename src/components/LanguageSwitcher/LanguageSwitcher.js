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

  const [dropdownOpen, setDropdownOpen] = useState(false);



  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    navigate(`/${lang}/${currentPath}`);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div>
     
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
 
    </div>
  );
};

export default LanguageSwitcher;
