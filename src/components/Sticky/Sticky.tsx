import React, { useState, useEffect, useRef } from "react";

interface StickyProps {
  children: React.ReactNode;
  offset: number; // Distance from the top when the element should stick
}

const Sticky: React.FC<StickyProps> = ({ children, offset }) => {
  const [isSticky, setIsSticky] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const originalPositionRef = useRef<number>(0);

  // Calculates and stores the element's initial position relative to the document
  const setInitialPosition = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      originalPositionRef.current = window.scrollY + rect.top;
    }
  };

  useEffect(() => {
    // Set the initial position when the component mounts
    setInitialPosition();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Determine if the element should be sticky
      const shouldStick = scrollTop > originalPositionRef.current - offset;
      // Update state only if there's a change
      if (shouldStick !== isSticky) {
        setIsSticky(shouldStick);
      }
    };

    // Add event listeners for scroll and resize
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", setInitialPosition);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setInitialPosition);
    };
    // Only depend on the offset prop; originalPosition is maintained via ref
  }, [offset, isSticky]);

  return (
    <div
      ref={elementRef}
      className={isSticky ? "sticky-fama" : ""}
      style={{
        position: isSticky ? "fixed" : "absolute",
        top: isSticky ? `${offset}px` : "50%",
        left: "50%",
        transform: isSticky ? "translateX(-50%)" : "translate(-50%, -50%)",
        zIndex: 45,
      }}
    >
      {children}
    </div>
  );
};

export default Sticky;
