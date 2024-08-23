import React from "react";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="container">
      <div className="about-us-header">
        <h1>{t("aboutUs")}</h1>
        <p>{t("aboutUsContent")}</p>
      </div>
      {/* {currentLanguage === "pl" || currentLanguage === "el" ? (
        <div className="people-container">
          <div className="ioannis-container">
            <img src={`${process.env.PUBLIC_URL}/media/img-placeholder.webp`} alt="Ioannis" />
            <h2>{t("ioannis")}</h2>
            <p>{t("aboutIoannis")}</p>
          </div>
          <div className="lukasz-container">
            <img src={`${process.env.PUBLIC_URL}/media/img-placeholder.webp`} alt="Lukasz" />
            <h2>{t("lukasz")}</h2>
            <p>{t("aboutLukasz")}</p>
          </div>
        </div>
      ) : (
        <div className="wrapper">
        <div className="people-container">
        <div className="ioannis-container">
          <img src={`${process.env.PUBLIC_URL}/media/img-placeholder.webp`} alt="Ioannis" />
          <h2>{t("ioannis")}</h2>
        </div>
        <div className="lukasz-container">
          <img src={`${process.env.PUBLIC_URL}/media/img-placeholder.webp`} alt="Lukasz" />
          <h2>{t("lukasz")}</h2>
        
        </div>
       
        </div>
        <p>{t("aboutUsTogetherContent")}</p>
      </div>
      )} */}
      <div className="wrapper">
        {/* <div className="people-container">
          <div className="ioannis-container">
            <img
              src={`${process.env.PUBLIC_URL}/media/ioannis.jpg`}
              alt="Ioannis"
            />
            <h2>{t("ioannisSarafidis")}</h2>
          </div>
          <div className="lukasz-container">
            <img
              src={`${process.env.PUBLIC_URL}/media/lukasz2.jpg`}
              alt="Lukasz"
            />
            <h2>{t("lukaszBergel")}</h2>
          </div>
        </div> */}
        <p>
          {currentLanguage === "pl"
            ? t("aboutLukasz")
            : currentLanguage === "el"
            ? t("aboutIoannis")
            : t("aboutUsTogetherContent")}
        </p>
      </div>
      {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/0xxhJpFK6s0?si=-HOQxwCd61xiF__T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
    </div>
  );
};

export default AboutUs;
