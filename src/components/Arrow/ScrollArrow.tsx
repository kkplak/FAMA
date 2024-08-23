import React, { useEffect, useState } from 'react';
import './ScrollArrow.css';


const ScrollArrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0 && isVisible) {
      setIsVisible(false);
      sessionStorage.setItem('hasSeenArrow', 'true');
    }
  };

  useEffect(() => {
    const hasSeenArrow = sessionStorage.getItem('hasSeenArrow');

    if (!hasSeenArrow) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      window.addEventListener('scroll', handleScroll);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="scroll-arrow">
      <img src={`${process.env.PUBLIC_URL}/media/DownArrow.svg`} alt="Scroll down arrow" />
    </div>
  );
};

export default ScrollArrow;
