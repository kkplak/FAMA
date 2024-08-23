// src/components/ButtonBox/ButtonBox.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ButtonBox.css";

interface ButtonBoxProps {
  icon: string;
  titleKey: string; 
  descriptionKey: string; 
  link: string;
}

const ButtonBox: React.FC<ButtonBoxProps> = ({
  icon,
  titleKey,
  descriptionKey,
  link,
}) => {
  const { t } = useTranslation();

  return (
    <Link to={link} className='button-box'>
      <img src={icon} alt={`${t(titleKey)} icon`} className='button-box-icon' />
      <h3 className='button-box-title'>{t(titleKey)}</h3>
      <p className='button-box-description'>{t(descriptionKey)}</p>
    </Link>
  );
};

export default ButtonBox;
