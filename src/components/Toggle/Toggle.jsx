import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const ToggleDescription = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const previousScrollPosition = useRef(0);
  const { t, i18n } = useTranslation();

  const toggleDescription = useCallback(() => {
    if (!isOpen) {
      previousScrollPosition.current = window.scrollY;
    }
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  const variants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { type: "tween", duration: 0.4, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeInOut" },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { type: "tween", duration: 0.4, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeInOut" },
      },
    },
  };

  return (
    <div className='toggle-description-container'>
      <motion.div
        variants={variants}
        initial='closed'
        animate={isOpen ? "open" : "closed"}
        style={{ overflow: "hidden" }}
        onAnimationComplete={() => {
          if (!isOpen) {
            window.scrollTo({
              top: previousScrollPosition.current,
              behavior: "smooth",
            });
          }
        }}
        className='toggle-content'
      >
        {description}
      </motion.div>

      <div
        className='toggle-header'
        onClick={toggleDescription}
        role='button'
        aria-expanded={isOpen}
        style={{ cursor: "pointer", display: "block", alignItems: "center" }}
      >
        <span className='toggle-title'>
          {isOpen ? t("toggleMore") : t("toggleLess")}
        </span>
        {/* <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className='toggle-icon'
        >
          <ChevronDown size={25} />
        </motion.div> */}
      </div>
    </div>
  );
};

export default ToggleDescription;
