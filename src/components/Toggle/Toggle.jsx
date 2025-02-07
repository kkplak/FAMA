import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ToggleDescription = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const previousScrollPosition = useRef(0);

  const toggleDescription = () => {
    if (!isOpen) {
      // Save current scroll position before opening
      previousScrollPosition.current = window.scrollY;
    } else {
      // Restore previous scroll position when closing
      setTimeout(() => {
        window.scrollTo({ top: previousScrollPosition.current, behavior: "smooth" });
      }, 10); // Delay to avoid UI flickering
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="toggle-description-container" ref={contentRef}>
      <motion.div
        initial={{ height: 0, opacity: 0, visibility: "hidden" }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
        transition={{ duration: 0.3 }}
        className="toggle-content"
      >
        {description}
      </motion.div>

      <div className="toggle-header" onClick={toggleDescription}>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="toggle-icon"
        >
          <ChevronDown size={25} />
        </motion.div>
      </div>
    </div>
  );
};

export default ToggleDescription;
