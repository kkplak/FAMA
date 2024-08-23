import React from "react";
import { useTranslation } from "react-i18next";

const LifeInsurance: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className='insurance-page container'>
      <h1>{t("lifeInsurance")}</h1>
      <p>{t("lifeInsuranceDescriptionLong")}</p>
    </div>
  );
};
export default LifeInsurance;
