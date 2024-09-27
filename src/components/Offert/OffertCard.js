import React, { forwardRef } from "react";

const OfferCard = forwardRef(({ offer }, ref) => {
  return (
    <div className="offer-card" ref={ref}>
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
});

export default OfferCard;
