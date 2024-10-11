import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./../LanguageSwitcher/LanguageSwitcher";
import { Dock, DockIcon } from "../Dock/Dock"; // Named imports

const NavLeft = ({ language, activeSection, isOpen, toggleMenu }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center  justify-between w-full fixed top-0 left-0 z-5 bg-transparent p-6">
      {/* Hamburger menu button for mobile */}
      <button
        className={`text-2xl ml-4  text-white md:hidden focus:outline-none transition-transform duration-300 ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
        onClick={toggleMenu}
      >
        &#9776;
      </button>

      {/* Links container for mobile with slide-down animation */}
      <div
        className={`${
          isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        } transition-all  duration-500 ease-in-out overflow-hidden md:hidden bg-black bg-opacity-40 backdrop-blur-sm border border-black border-opacity-20 absolute top-full left-0 text-white w-4/12`}
      >
        <div className="flex flex-col items-start space-y-4 md:p-4 rounded">
          <Dock direction="middle" animation={false}>
            {/* Disable animation on mobile */}
            <DockIcon>
              <Link
                to="#home"
                className="py-4 ml-4 block"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("home")
                    .scrollIntoView({ behavior: "smooth" });
                  toggleMenu(); // Close menu after click
                }}
              >
                {t("home")}
              </Link>
            </DockIcon>
            <DockIcon>
              <Link
                to="#portfolio"
                className="py-4 ml-4 block"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("portfolio")
                    .scrollIntoView({ behavior: "smooth" });
                  toggleMenu();
                }}
              >
                {t("portfolio")}
              </Link>
            </DockIcon>
            <DockIcon>
              <Link
                to="#content"
                className="py-4 ml-4 block"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("content")
                    .scrollIntoView({ behavior: "smooth" });
                  toggleMenu();
                }}
              >
                {t("offer")}
              </Link>
            </DockIcon>
            <DockIcon>
              <Link
                to="#contact"
                className="py-4 ml-4 block"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" });
                  toggleMenu();
                }}
              >
                {t("contact")}
              </Link>
            </DockIcon>
            <DockIcon>
              <a
                href="https://www.instagram.com/fama_film/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 ml-4 block"
              >
                {t("ig")}
              </a>
            </DockIcon>
            <DockIcon>
              <a
                href="https://www.instagram.com/fama_film/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 ml-4 block"
              >
                {t("vimeo")}
              </a>
            </DockIcon>
          </Dock>
          <div className=" md:block flex-shrink-0 mr-4 ml-4 pb-8">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center justify-between w-full text-white">
        <div className="flex items-center space-x-4">
          <Dock direction="middle" animation={true}>
            <DockIcon>
              <Link
                to="#home"
                className="py-4 md:py-0 block"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("home")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("home")}
              </Link>
            </DockIcon>
            <DockIcon>
              <Link
                to="#portfolio"
                className="py-4 md:py-0 block"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("portfolio")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("portfolio")}
              </Link>
            </DockIcon>
            <DockIcon>
              <Link
                to="#content"
                className="py-4 md:py-0 block"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("content")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("offer")}
              </Link>
            </DockIcon>
            <DockIcon>
              <Link
                to="#contact"
                className="py-4 md:py-0 block"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("contact")}
              </Link>
            </DockIcon>
            <DockIcon>
              <a
                href="https://www.instagram.com/fama_film/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 md:py-0 block"
              >
                {t("ig")}
              </a>
            </DockIcon>
            <DockIcon>
              <a
                href="https://www.instagram.com/fama_film/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 md:py-0 block"
              >
                {t("vimeo")}
              </a>
            </DockIcon>
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-opacity-70 bg-gray-900 transition-all duration-300 ease-out">
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
