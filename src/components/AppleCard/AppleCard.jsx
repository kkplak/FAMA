"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight, IconX } from "@tabler/icons-react";

import { cn } from "../../../src/lib/utils";
import { useOutsideClick } from "../../hooks/outside-click";

// Provide context for Carousel
export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className='relative w-full'>
        <div className='flex justify-end gap-2 mr-10 hidden md:flex'>
          <button
            className='relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50'
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowLeft className='h-6 w-6 text-gray-500' />
          </button>
          <button
            className='relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50'
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowRight className='h-6 w-6 text-gray-500' />
          </button>
        </div>
        <div
          className='flex w-full overflow-x-scroll overscroll-x-auto pn-10 pt-20 md:pt-10 md:pb-10 scroll-smooth [scrollbar-width:none]'
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              // remove max-w-4xl if you want the carousel to span the full width of its container
              "max-w-7xl mx-auto"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className='last:pr-[5%] md:last:pr-[5%]  rounded-3xl'
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      {/* Modal view */}
      <AnimatePresence>
        {open && (
          <div className='fixed inset-0 h-screen z-50 overflow-auto'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0'
            />
            <motion.div
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl relative'
            >
              <button
                onClick={handleClose}
                className='sticky top-4 right-0 ml-auto h-8 w-8 bg-black dark:bg-white rounded-full flex items-center justify-center'
              >
                <IconX className='h-6 w-6 text-neutral-100 dark:text-neutral-900' />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className='text-base font-medium text-black dark:text-white'
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className='text-2xl md:text-5xl  text-neutral-700 mt-4 dark:text-white'
              >
                {card.title}
              </motion.p>
              <div className='py-10'>{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Closed card view */}
      <div className='w-56 md:w-96'>
        {/* Card element (clickable image) */}
        <motion.button
          layoutId={layout ? `card-${card.title}` : undefined}
          onClick={handleOpen}
          className='block rounded-3xl pointer-events-none overflow-hidden bg-gray-100 dark:bg-neutral-900 w-full'
        >
          <div className='w-full aspect-[7/10] relative'>
            <BlurImage
              src={card.src}
              alt={card.title}
              className='object-cover w-full h-full'
            />
          </div>
        </motion.button>

        {/* Text container outside of the card element */}
        <div className='mt-4 p-2'>
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className='text-sm md:text-base font-medium text-white-700'
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className='text-xl md:text-3xl  text-white-900 mt-2'
          >
            {card.title}
          </motion.p>
        </div>
      </div>
    </>
  );
};
export const BlurImage = ({ src, className, alt, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "transition duration-300 w-full h-full",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      alt={alt || "Card image"}
      loading='lazy'
      decoding='async'
      {...rest}
    />
  );
};
