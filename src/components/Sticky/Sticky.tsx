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

  // Calculate the element's original position only when not sticky
  const setInitialPosition = () => {
    if (elementRef.current && !isSticky) {
      const rect = elementRef.current.getBoundingClientRect();
      originalPositionRef.current = window.scrollY + rect.top;
    }
  };

  // On mount, compute the original position
  useLayoutEffect(() => {
    setInitialPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

      animationFrameRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const shouldStick = scrollTop >= originalPositionRef.current - offset;

        // Use a functional state update to avoid stale closure issues.
        setIsSticky((prevSticky) =>
          prevSticky !== shouldStick ? shouldStick : prevSticky
        );
      });
    };

    const handleResize = () => {
      // Only update original position if not sticky.
      if (!isSticky) {
        setInitialPosition();
      }
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
        position: isSticky ? "fixed" : "static", // Use static to keep natural flow when not sticky
        top: isSticky ? `${offset}px` : undefined,
        left: isSticky ? "50%" : undefined,
        transform: isSticky ? "translateX(-50%)" : undefined,
        zIndex: isSticky ? 45 : undefined,
        transition: isSticky ? "none" : "top 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default Sticky;
