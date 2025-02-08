"use client";
import React from "react";
import { Carousel, Card } from "./AppleCard";
import { useTranslation } from "react-i18next";

const DummyContent = () => {
  return (
    <>
      {[...new Array(3)].map((_, index) => (
        <div
          key={"dummy-content" + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              The first rule of Apple club is that you boast about Apple club.
            </span>{" "}
            Keep a journal, quickly jot down a grocery list, and take amazing
            class notes. Want to convert those notes to text? No problem.
            Langotiya jeetu ka mara hua yaar is ready to capture every thought.
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

export function AppleCardsCarouselDemo() {
  const { t } = useTranslation();

  // Define the data inside the component so that `t` is available
  const data = [
    {
      title: t("slide1H1"),
      src: "/media/offert1.png",
      content: <DummyContent />,
    },
    {
      title: t("slide2H1"),
      src: "/media/offert2.png",
      content: <DummyContent />,
    },
    {
      title: t("slide3H1"),
      src: "/media/offert3.png",
      content: <DummyContent />,
    },
    {
      title: t("slide4H1"),
      src: "/media/offert4.png",
      content: <DummyContent />,
    },
    {
      title: t("slide5H1"),
      src: "/media/offert5.png",
      content: <DummyContent />,
    },
  ];

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      {/* Uncomment or modify the heading as needed */}
      {/* <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know your iSad.
      </h2> */}
      <Carousel items={cards} />
    </div>
  );
}
