import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./../LanguageSwitcher/LanguageSwitcher";

const NavLeft = ({ language, activeSection }) => {
  const { t } = useTranslation();

  return (
    <div className="nav-left">
      <div className="links">
        <ul>
          <li>
            <Link
              to="#home"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("home")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("home")}
            </Link>
            {activeSection === "home" && <span className="dot" />}
          </li>
          <li>
            <Link
              to="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("portfolio")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("portfolio")}
            </Link>
            {activeSection === "portfolio" && <span className="dot" />}
          </li>
          <li>
            <Link
              to="#content"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("content")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("offer")}
            </Link>
            {activeSection === "content" && <span className="dot" />}
          </li>
          <li>
            <Link
              to="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("contact")}
            </Link>
            {activeSection === "contact" && <span className="dot" />}
          </li>
          <li>
            <a
              href="https://www.instagram.com/nickonick_?igsh=MTZhYjZuMzg3bGNm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("IG")}
            </a>
          </li>
        </ul>
      </div>
      <div className="language-container">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

const NavBar = () => {
  const location = useLocation();
  const language = location.pathname.split("/")[1];
  const [activeSection, setActiveSection] = useState("home");

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

  const navbarStyle = {
    padding: "2% 3%",
    display: "block",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    transition: "0.3s ease-out",
    backdropFilter: "blur(5px)",
    width: "-moz-available",
  };

  return (
    <nav style={navbarStyle} className="nav-bar">
      <NavLeft language={language} activeSection={activeSection} />
    </nav>
  );
};

export default NavBar;
