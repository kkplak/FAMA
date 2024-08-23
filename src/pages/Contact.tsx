import React from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "../components/ContactForm/ContactForm";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
    <div className="container2">
      <div className="contact-box-container">
    <div className="box">
      <h2>{t("introduction")}</h2>
      <p>{t("introductionP")}</p>
    </div>
    <div className="box">
      <h2>{t("meeting")}</h2>
      <p>{t("meetingP")}</p>
    </div>
    <div className="box">
      <h2>{t("ongoingSupport")}</h2>
      <p>{t("ongoingSupportP")}</p>
    </div>
    </div>
  </div>
    <div className='contact-page container'>
      
        <h1>{t("contact")}</h1>
        <p>
            {t("contactUsP")}
          </p>
<ContactForm />

    </div>
    </>
  );
};
export default Contact;
