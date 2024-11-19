import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./../LanguageSwitcher/LanguageSwitcher";
import { Dock, DockIcon } from "../Dock/Dock";

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
        className=" ml-8 block"
      >
        {t(label)}
      </a>
    </DockIcon>
  );

  return (
    <div className="flex items-center justify-between w-full fixed top-0 left-0 z-5 backdrop-blur-md ">
      <button
        className={`text-2xl mt-4 ml-4 mb-4 text-white md:hidden focus:outline-none transition-transform duration-300 ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
        onClick={toggleMenu}
      >
        &#9776;
      </button>

      {/* Mobile Links */}
      <div
        className={`${
          isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        } transition-all duration-500 ease-in-out overflow-hidden md:hidden bg-black bg-opacity-40 backdrop-blur-sm border border-black border-opacity-20 absolute top-full left-0 text-white w-4/12`}
      >
        <div className="flex flex-col items-start space-y-4 md:p-4 rounded">
          <Dock direction="middle" animation={false}>
            {renderLink("home", "home")}
            {renderLink("portfolio", "portfolio")}
            {renderLink("content", "offer")}
            {renderLink("contact", "contact")}
            {renderExternalLink("https://www.instagram.com/fama_film/", "ig")}
            {renderExternalLink(
              "https://www.instagram.com/fama_film/",
              "vimeo"
            )}
          </Dock>
          <div className="md:block flex-shrink-0 mr-4 ml-4 pb-8">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center justify-between w-full text-white">
        <div className="flex items-center space-x-4">
          <Dock direction="middle" animation={true}>
            {renderLink("home", "home")}
            {renderLink("portfolio", "portfolio")}
            {renderLink("content", "offer")}
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

const NavBar = () => {
  const location = useLocation();
  const language = location.pathname.split("/")[1];
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "hero-section", "content", "button-box"];
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-opacity-20 bg-gray-900 transition-all duration-300 ease-out">
      <NavLeft
        language={language}
        activeSection={activeSection}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
      />
    </nav>
  );
};

export default NavBar;
