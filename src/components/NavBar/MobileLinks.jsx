// src/components/NavBar/MobileLinks.js

import React from "react";
import { Dock } from "../Dock/Dock";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const MobileLinks = ({ isOpen, renderLink, renderExternalLink }) => {
  return (
    <div
      className={`
        fixed top-14 inset-x-4
        bg-[rgba(0,0,0,0.6)] text-white
        transition-all duration-300 ease-in-out transform
        ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}
        rounded-xl p-0 backdrop-blur-xl shadow-lg
        z-50
      `}
    >
      {/* Navigation Container */}
      <div className="flex items-center justify-between p-4">
        {/* Navigation Links */}
        <Dock className="mobile-dock" direction="middle" animation={false}>
          {renderLink("home", "home")}
          {renderLink("offer", "offer")}
          {renderLink("portfolio", "portfolio")}
          {renderLink("contact", "contact")}
          {renderExternalLink("https://www.instagram.com/fama_film/", "ig")}
          {renderExternalLink("https://www.instagram.com/fama_film/", "vimeo")}
        </Dock>

        <div className="flex h-max self-start pr-6 pt-2">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default MobileLinks;
