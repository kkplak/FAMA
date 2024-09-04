import React, { useState, useEffect, useRef } from "react";

interface StickyProps {
  children: React.ReactNode;
  offset: number; // Distance from the top when the element should stick
}

const Sticky: React.FC<StickyProps> = ({ children, offset }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [originalPosition, setOriginalPosition] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY;

        // Set sticky when the scroll position is past the original position minus the offset
        if (scrollTop > originalPosition - offset) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    const setInitialPosition = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setOriginalPosition(window.scrollY + rect.top);
      }
    };

    // Set initial position
    setInitialPosition();

    // Add event listeners for scroll and resize
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", setInitialPosition); // Adjust position on resize

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setInitialPosition);
    };
  }, [offset, originalPosition]);

  return (
    <div
      ref={elementRef}
      className={isSticky ? "sticky-fama" : ""}
      style={{
        position: isSticky ? "fixed" : "absolute",
        top: isSticky ? `${offset}px` : "50%",
        left: "50%",
        transform: isSticky ? "translateX(-50%)" : "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
};

export default Sticky;
