import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dock, DockIcon } from "../Dock/Dock";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import MobileLinks from "./MobileLinks";

const NavBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const language = location.pathname.split("/")[1];
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Helper for internal links
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

  // Helper for mobile internal links
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

  // Helper for external links
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

  useEffect(() => {
    // Example: highlight active section on scroll
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
    <>
      {/* The actual <nav> */}
      <nav className="w-full fixed top-0 left-0 z-40 backdrop-blur-xl bg-[rgba(0,0,0,0.2)] transition-all duration-300 ease-out">
        <div className="flex items-center justify-between w-full">
          {/* Mobile Menu Button */}
          <button
            className="relative w-10 h-10 flex flex-col items-center justify-center text-white 
                       lg:hidden focus:outline-none transition-transform duration-300"
            onClick={toggleMenu}
          >
            {/* Top line */}
            <div
              className={`w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform
                ${isOpen ? "translate-x-2 opacity-50" : ""}`}
            />
            {/* Bottom line (shorter), shifted left by default and moves right when toggled */}
            <div
              className={`w-4 h-0.5 bg-white mt-1 transition-all duration-300 ease-in-out transform
                ${isOpen ? "translate-x-3 opacity-50" : "-translate-x-1"}`}
            />
          </button>

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
      </nav>

      {/* Render the mobile menu OUTSIDE the <nav> */}
      <MobileLinks
        isOpen={isOpen}
        renderLink={renderMobileLink}
        renderExternalLink={renderExternalLink}
      />
    </>
  );
};

export default NavBar;