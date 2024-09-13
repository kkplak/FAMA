"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "../../../src/lib/utils";

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export default function WordFadeIn({
  words,
  delay = 0.05,
  variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },
  className,
}: WordFadeInProps) {
  const _words = words.split(" ");

  // Reference to the element we want to observe
  const ref = useRef(null);

  // Detect if the component is in view
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.h1
      ref={ref} // Attach the ref to this element
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // Only animate if in view
      className={cn(
        "font-display text-center text-l font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-l md:leading-[5rem]",
        className
      )}
    >
      {_words.map((word, i) => (
        <motion.span key={word} variants={variants} custom={i}>
          {word}{" "}
        </motion.span>
      ))}
    </motion.h1>
  );
}
