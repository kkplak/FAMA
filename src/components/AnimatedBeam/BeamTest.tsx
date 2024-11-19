"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "../../../src/lib/utils";
import { AnimatedBeam } from "./AnimatedBeam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full  items-center justify-center   bg-background p-10 md:shadow-xl"
      ref={containerRef}
    >
      {/* Container for the four Circles */}
      <div className="flex z-10 flex-row justify-between items-center w-full h-full">
        <div className="offer-card card-1" ref={div1Ref}>
          <h2 className="offer-title">Planowanie i logistyka</h2>
          <ul className="offer-list"></ul>
        </div>

        <div className="offer-card card-2" ref={div2Ref}>
          <h2 className="offer-title">Produkcja wideo</h2>
          <ul className="offer-list"></ul>
        </div>
        <div className="offer-card card-3" ref={div3Ref}>
          <h2 className="offer-title">Relacje z wydarzen</h2>
          <ul className="offer-list"></ul>
        </div>
        <div className="offer-card card-4" ref={div4Ref}>
          <h2 className="offer-title">Postprodukcja</h2>
          <ul className="offer-list"></ul>
        </div>
      </div>

      {/* Beams connecting the Circles */}
      <AnimatedBeam
        duration={8}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
      />
      <AnimatedBeam
        duration={8}
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
      />
      <AnimatedBeam
        duration={8}
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
      />
    </div>
  );
}
