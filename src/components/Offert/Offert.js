import React, { useRef } from "react";

const Offert = ({ offersData }) => {
  const offersRefs = useRef([]);

  return (
    <div className="offers-container">
      <div className="offer-card" ref={(el) => (offersRefs.current[0] = el)}>
        <h2 className="offer-title">{offersData[0].title}</h2>
        <ul className="offer-list">
          {offersData[0].items.map((item, idx) => (
            <li key={idx} className="offer-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="offer-card" ref={(el) => (offersRefs.current[1] = el)}>
        <h2 className="offer-title">{offersData[1].title}</h2>
        <ul className="offer-list">
          {offersData[1].items.map((item, idx) => (
            <li key={idx} className="offer-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="offer-card" ref={(el) => (offersRefs.current[2] = el)}>
        <h2 className="offer-title">{offersData[2].title}</h2>
        <ul className="offer-list">
          {offersData[2].items.map((item, idx) => (
            <li key={idx} className="offer-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="offer-card" ref={(el) => (offersRefs.current[3] = el)}>
        <h2 className="offer-title">{offersData[3].title}</h2>
        <ul className="offer-list">
          {offersData[3].items.map((item, idx) => (
            <li key={idx} className="offer-item">
              {item}
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default Offert;
