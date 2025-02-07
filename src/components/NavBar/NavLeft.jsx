// src/components/NavBar/NavLeft.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./../LanguageSwitcher/LanguageSwitcher";
import { Dock, DockIcon } from "../Dock/Dock";
import MobileLinks from "./MobileLinks";

const NavLeft = ({ language, activeSection, isOpen, toggleMenu }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const renderLink = (id, label) => (
    <DockIcon>
      <Link
        to={`/${language}/home#${id}`}
        className="ml-8 block"
        onClick={() => {
          toggleMenu();
        }}
      >
        {t(label)}
      </Link>
    </DockIcon>
  );

  const renderExternalLink = (url, label) => (
    <DockIcon>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-8 block"
      >
        {t(label)}
      </a>
    </DockIcon>
  );

  return (
    <div className="flex items-center justify-between w-full fixed top-0 left-0  backdrop-blur-md">
      {/* Mobile Menu Button */}
      <button
        className={`relative w-10 h-10 flex items-center justify-center text-white lg:hidden focus:outline-none transition-transform duration-300 ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></div>
        <div
          className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></div>
      </button>

      {/* Mobile Links - separated into its own component */}
      <MobileLinks
        isOpen={isOpen}
        renderLink={renderLink}
        renderExternalLink={renderExternalLink}
      />

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center justify-between w-full text-white">
        <div className="flex items-center space-x-4">
          <Dock direction="middle" animation={true}>
            {renderLink("home", "home")}
            {renderLink("offer", "offer")}
            {renderLink("portfolio", "portfolio")}
            {renderLink("contact", "contact")}
          </Dock>
        </div>
        <div className="flex-shrink-0">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default NavLeft;
