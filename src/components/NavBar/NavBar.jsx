import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./../LanguageSwitcher/LanguageSwitcher";
import Sticky from "../Sticky/Sticky";

const NavLeft = ({ language, scrollPosition, windowWidth }) => {
  const { t } = useTranslation();
  // const shouldHide = scrollPosition > 20 && windowWidth < 980;

  return (
    <div className="nav-left">
      {/* {!shouldHide && ( */}
      {/* <img
        className="icon"
        src={`${process.env.PUBLIC_URL}/media/logo-white.png`}
        alt="icon"
      /> */}
      {/* )} */}
      <div className="links">
        <ul>
          <li>
            <Link to={`/${language}/home`}>{t("home")}</Link>
          </li>
          <li>
            <Link to={`/${language}/about-us`}>{t("aboutUs")}</Link>
          </li>
          <li>
            <Link to={`/${language}/contant`}>{t("contact")}</Link>
          </li>
          <li>
            <a
              href="https://www.instagram.com/nickonick_?igsh=MTZhYjZuMzg3bGNm"
              target="_blank"
              rel="noopener noreferrer"
            >
              IG
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

// const NavCenter = ({ scrollPosition, windowWidth }) => {
//   return (
//     <div className={`nav-right `}>
//       <LanguageSwitcher />
//     </div>
//   );
// };

// const NavRight = ({ scrollPosition, windowWidth }) => {
//   const { t, i18n } = useTranslation();
//   const currentLanguage = i18n.language;
//   // const rightClass = scrollPosition > 20 && windowWidth < 980 ? 'hide' : 'show';

//   return (
//     <div className={`nav-right`} style={{ justifyContent: "flex-end" }}>
//       <div className="nav-phone-numbers">
//         {currentLanguage === "pl" ? (
//           <div className="phone-line">
//             <p>
//               <b>{t("lukasz")}</b>
//             </p>
//             <a href={`tel:${t("lukaszPhone")}`}>{t("lukaszPhone")}</a>
//           </div>
//         ) : currentLanguage === "el" ? (
//           <div className="phone-line">
//             <p>
//               <b>{t("ioannis")}</b>
//             </p>
//             <a href={`tel:${t("ioannisPhone")}`}>{t("ioannisPhone")}</a>
//           </div>
//         ) : (
//           <>
//             <div className="phone-line">
//               <p>
//                 <b>{t("lukasz")}</b>
//               </p>
//               <a href={`tel:${t("lukaszPhone")}`}>{t("lukaszPhone")}</a>
//             </div>
//             <div className="phone-line">
//               <p>
//                 <b>{t("ioannis")}</b>
//               </p>
//               <a href={`tel:${t("ioannisPhone")}`}>{t("ioannisPhone")}</a>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

const NavBar = () => {
  const location = useLocation();
  const language = location.pathname.split("/")[1];
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const padding =
    windowWidth < 700
      ? scrollPosition > 20
        ? "0.4% 5%"
        : "2% 5% 8%"
      : scrollPosition > 20
      ? "0.4% 5%"
      : "2% 5%";
  const navbarStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "2% 3%",
    display: "block",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",

    height: "100vh",
    top: 0,
    left: 0,
    zIndex: 1000,
    transition: "0.3s ease-out",
    backdropFilter: "blur(3px)",
  };

  return (
    <nav style={navbarStyle} className="nav-bar">
      <NavLeft
        language={language}
        scrollPosition={scrollPosition}
        windowWidth={windowWidth}
      />
      {/* <NavCenter scrollPosition={scrollPosition} windowWidth={windowWidth} /> */}
      {/* <NavRight scrollPosition={scrollPosition} windowWidth={windowWidth} /> */}
    </nav>
  );
};

export default NavBar;
