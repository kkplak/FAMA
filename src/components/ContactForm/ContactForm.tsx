import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useTranslation } from "react-i18next";
import "./ContactForm.css";

function ContactForm() {
  const { t, i18n } = useTranslation();

  const [state, handleSubmit] = useForm("xkgwndnd"); // Replace with your Formspree form ID
  if (state.succeeded) {
    return <p>{t("formThanks")}</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        id="name"
        type="text"
        name="name"
        required
        placeholder={t("formName")}
        className="form-input"
      />
      <ValidationError
        prefix="Name"
        field="name"
        errors={state.errors}
        className="form-error"
      />

      <select id="language" name="language" required className="form-select">
        <option value="">{t("formLanguage")}</option>
        <option value="english">{t("formEnglish")}</option>
        <option value="german">{t("formGerman")}</option>
        <option value="polish">{t("formPolish")}</option>
        <option value="greek">{t("formGreek")}</option>
      </select>
      <ValidationError
        prefix="Language"
        field="language"
        errors={state.errors}
        className="form-error"
      />

      <input
        id="phone"
        type="tel"
        name="phone"
        required
        placeholder={t("formNumber")}
        className="form-input"
      />
      <ValidationError
        prefix="Phone"
        field="phone"
        errors={state.errors}
        className="form-error"
      />

      <input
        id="email"
        type="email"
        name="email"
        required
        placeholder={t("formEmail")}
        className="form-input"
      />
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
        className="form-error"
      />

      {/* <textarea
        id="message"
        name="message"
        placeholder="Message"
        className="form-textarea"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
        className="form-error"
      /> */}

      <button type="submit" disabled={state.submitting} className="form-button">
        {t("formSubmit")}
      </button>
    </form>
  );
}

export default ContactForm;
