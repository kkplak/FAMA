import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const Layout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className='layout'>
      <Outlet />
      <footer id='contact'>
        <div className='contact'>
          <div className='contact-text'>
            <h1>{t("contactH2")}</h1>
            <h2>{t("contactH3")}</h2>
          </div>
          <div className='contact-people'>
            <a href={`tel:${t("famaPhone")}`}>{t("famaPhone")}</a>
            <a href='mailto:fama@famafilm.com'>{t("famaMail")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
