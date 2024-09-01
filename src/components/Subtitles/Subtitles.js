import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Subtitles = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false); 

  const contentKeys = ["homeL1", "homeL2", "homeL3", "homeL4", "homeL5", "homeL6"];

  useEffect(() => {
   
    const startTimeout = setTimeout(() => {
      setHasStarted(true); 
    }, 5000);

    let interval;
    if (hasStarted) {
     
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % contentKeys.length);
      }, 6000); 
    }

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [hasStarted, contentKeys.length]);

  const subtitleText = hasStarted ? t(contentKeys[currentIndex]) : "";

  return (
    <div style={{ ...subtitleStyle, backgroundColor: subtitleText ? "rgba(0, 0, 0, 0.3)" : "transparent" }}>
      {subtitleText}
    </div>
  );
};

const subtitleStyle = {
  position: "sticky",
  bottom: "10%",
  width: "100%",
  textAlign: "center",
  fontSize: "24px",
  color: "white",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  padding: "10px",
  transition: "background-color 0.3s ease",
};

export default Subtitles;
