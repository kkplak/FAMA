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
            {/* <h4> Selecting the right insurance can benefint you and your family. </h4> */}
            <div className="contact-people">
              {currentLanguage === "pl" ? (
                <div className="contact-people-pl">
                  <p className="people-name">
                    <b>{t("lukaszBergel")}</b>
                  </p>
                  <a href={`tel:${t("lukaszPhone")}`}>{t("lukaszPhone")}</a>
                  <p>{t("lukaszMail")}</p>
                </div>
              ) : currentLanguage === "el" ? (
                <div>
                  <p className="people-name">
                    <b>{t("ioannisSarafidis")}</b>
                  </p>
                  <a href={`tel:${t("ioannisPhone")}`}>{t("ioannisPhone")}</a>
                  <p>{t("ioannisMail")}</p>
                </div>
              ) : (
                <div className="contact-people-en">
                  <div>
                    <p className="people-name">
                      <b>{t("ioannisSarafidis")}</b>
                    </p>
                    <a href={`tel:${t("ioannisPhone")}`}>{t("ioannisPhone")}</a>
                    <p>{t("ioannisMail")}</p>
                  </div>
                  <div>
                    <p className="people-name">
                      <b>{t("lukaszBergel")}</b>
                    </p>
                    <a href={`tel:${t("lukaszPhone")}`}>{t("lukaszPhone")}</a>
                    <p>{t("lukaszMail")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
