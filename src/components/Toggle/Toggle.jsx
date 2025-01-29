import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ToggleDescription = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDescription = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="toggle-description-container"   >
      <div
        className="toggle-header "
        onClick={toggleDescription}
     
      >
        {/* <h3 className="toggle-title"  >{title}</h3> */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="toggle-icon"
         
        >
          <ChevronDown size={25} />
        </motion.div>
      </div>
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
    </div>
  );
};

export default ToggleDescription;
