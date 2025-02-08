"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "./AppleCard"; // Your existing Apple Card components
import Box from "../Box/Box"; // Your Box component with its Box.css styling
import { useTranslation } from "react-i18next";

// Example dummy content used in the Apple Card (desktop) layout.
const DummyContent = () => {
  return (
    <>
      {[...new Array(3)].map((_, index) => (
        <div
          key={`dummy-content-${index}`}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              The first rule of Apple club is that you boast about Apple club.
            </span>{" "}
            Keep a journal, quickly jot down a grocery list, and take amazing
            class notes.
          </p>
          <img
            src="https://assets.aceternity.com/macbook.png"
            alt="Macbook mockup from Aceternity UI"
            height="500"
            width="500"
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      ))}
    </>
  );
};

export function AppleCardsCarouselDemo2() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  // Listen for window resizes to determine if we're in mobile view (<768px)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  // Data for the mobile "box" layout.
  const mobileData = [
    {
      iconPath: t("homeOffer1Src"),
      title: t("homeOffer1Title"),
      description: t("homeOffer1Copy"),
    },
    {
      iconPath: t("homeOffer2Src"),
      title: t("homeOffer2Title"),
      description: t("homeOffer2Copy"),
    },
    {
      iconPath: t("homeOffer3Src"),
      title: t("homeOffer3Title"),
      description: t("homeOffer3Copy"),
    },
  ];

  // Create the items array for the Carousel based on the viewport.
  const items = 
    mobileData.map((data, index) => (
        // Wrap each Box slide in a div that forces a wider width (e.g., 90% of viewport width)
        <div key={index} className="w-[70vw]">
          <Box
            iconPath={data.iconPath}
            title={data.title}
            description={data.description}
          />
        </div>
      ))
    

  return (
    <div className="w-full h-full flex lg:hidden">
      <Carousel items={items} />
    </div>
  );
}
