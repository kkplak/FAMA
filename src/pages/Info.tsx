import React from "react";
import { useTranslation } from "react-i18next";
import LogoSlider from "../components/LogoSlider/LogoSlider";
import { useParams } from "react-router-dom";
const Info: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  React.useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div className='container info'>
      <h1>
        <p>{t("infoHeader")}</p>
      </h1>
      <div className='image-container'>
        <img src={process.env.PUBLIC_URL + "/profile.png"} alt='logo' />
      </div>
      <p>{t("infoContent")}</p> <p>{t("infoContent")}</p>
      <p>{t("infoContent")} </p> <p>{t("infoContent")} </p>
      <p>{t("infoContent")} </p> <p>{t("infoContent")} </p>
      <LogoSlider />
    </div>
  );
};
export default Info;
