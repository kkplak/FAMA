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
    <div className="flex items-center justify-between w-full fixed top-0 left-0 z-5 backdrop-blur-md">
  {/* Mobile Menu Button */}
  <button
  className={`relative w-10 h-10 flex items-center justify-center text-white lg:hidden focus:outline-none transition-transform duration-300 ${
    isOpen ? "rotate-90" : "rotate-0"
  }`}
  onClick={toggleMenu}
>
  <div className="absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center 
    ${isOpen ? 'rotate-45 translate-y-1.5' : ''}">
  </div>
  <div className="absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center 
    ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}">
  </div>
</button>


  {/* Mobile Links */}
  <div
  className={`absolute top-14 inset-x-4 bg-[rgba(0,0,0,0.85)] text-white transition-all duration-300 ease-in-out transform ${
    isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
  } rounded-xl p-0 backdrop-blur-xl shadow-lg lg:hidden z-50`}
>
  {/* Navigation Container */}
  <div className="flex items-center justify-between p-4">
    {/* Navigation Links */}
    <Dock className="mobile-dock" direction="middle" animation={false}>
      {renderLink("home", "home")}
      {renderLink("portfolio", "portfolio")}
      {renderLink("offer", "offer")}
      {renderLink("contact", "contact")}
      {renderExternalLink("https://www.instagram.com/fama_film/", "ig")}
      {renderExternalLink("https://www.instagram.com/fama_film/", "vimeo")}
    </Dock>
    <div className="flex h-max self-start pr-6 pt-2">
      <LanguageSwitcher />
    </div>
  </div>
</div>



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
<nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-custom bg-[rgba(0,0,0,0.2)] transition-all duration-300 ease-out">
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
