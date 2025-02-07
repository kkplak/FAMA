import React, { useState, useLayoutEffect, useEffect, useRef } from "react";

interface StickyProps {
  children: React.ReactNode;
  offset: number;
}

const Sticky: React.FC<StickyProps> = ({ children, offset }) => {
  const [isSticky, setIsSticky] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const originalPositionRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Function to calculate the element's initial position
  const setInitialPosition = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      originalPositionRef.current = window.scrollY + rect.top;
    }
  };

  useLayoutEffect(() => {
    setInitialPosition();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

      animationFrameRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const shouldStick = scrollTop >= originalPositionRef.current - offset;

        if (shouldStick !== isSticky) {
          setIsSticky(shouldStick);
        }
      });
    };

    const handleResize = () => {
      setInitialPosition();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [offset, isSticky]);

  return (
    <div
      ref={elementRef}
      className={isSticky ? "sticky-fama" : ""}
      style={{
        position: isSticky ? "fixed" : "absolute",
        top: isSticky ? `${offset}px` : "auto",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 45,
        transition: isSticky ? "none" : "top 0.3s ease-out", 
      }}
    >
      {children}
    </div>
  );
};

export default Sticky;
