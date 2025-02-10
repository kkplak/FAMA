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
      >
        {t(label)}
      </Link>
    </DockIcon>
  );

  const renderMobileLink = (id, label) => (
    <DockIcon>
      <Link
        to={`/${language}/home#${id}`}
        className="ml-8 block"
        onClick={toggleMenu}
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

      {/* Mobile Links - separated into its own component */}
      <MobileLinks
        isOpen={isOpen}
        renderLink={renderMobileLink}
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