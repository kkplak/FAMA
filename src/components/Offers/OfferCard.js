import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

const OfferCard = ({ offer }) => {
  // Animation and scroll logic
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div
      className="offer-card"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      <h2 className="offer-title">{offer.title}</h2>
      <ul className="offer-list">
        {offer.items.map((item, idx) => (
          <li key={idx} className="offer-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferCard;
