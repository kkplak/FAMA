import React, { useState } from "react";
import "./Slider.css"; // Add your styles here

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, slides.length - 3));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="parent-container">
    <div className="slider-container">
      <div className="slider-wrapper">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {slides.map((slide, index) => (
            <div className="slide" key={index}>
              <img src={slide.image} alt={slide.alt} className="slide-image" />
              <div className="text-box">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </div>
    <div className="slider-btns">
    <button className="slider-btn left" onClick={handlePrev} aria-label="Previous Slide">
        &#9664;
      </button>
      <button className="slider-btn right" onClick={handleNext} aria-label="Next Slide">
        &#9654;
      </button>
      </div>
    </div>
  );
};

export default Slider;