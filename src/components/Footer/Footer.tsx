import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const Layout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="layout">
      <Outlet />
      <footer id="contact">
        <div className="contact">
          <div className="contact-text">
            <h2>{t("contactH2")}</h2>
            <h3>{t("contactH3")}</h3>
          </div>
          <div className="contact-people">
            <a href={`tel:${t("famaPhone")}`}>{t("famaPhone")}</a>
            <p>{t("famaMail")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
