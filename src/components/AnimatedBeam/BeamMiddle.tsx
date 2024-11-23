"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "../../../src/lib/utils";
import { AnimatedBeam } from "./AnimatedBeam";

export function AnimatedBeamMiddle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);
  const div10Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className=" container-offers relative flex h-max w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl"
      ref={containerRef}
    >
      <div className="flex size-full flex-col  z-10 items-stretch justify-between gap-16">
        <div className="flex flex-row items-center justify-between">
          <div className="offer-card card-1" ref={div1Ref}>
            <h2 className="offer-title">Planowanie i logistyka</h2>
            <ul className="offer-list">
              <li>Pomoc w organizacji lokalizacji zdjęć.</li>
              <li>Casting i dobór odpowiednich aktorów.</li>
              <li>Zarządzanie harmonogramem produkcji.</li>
            </ul>
          </div>
          <div className="offer-card card-2" ref={div5Ref}>
            <h2 className="offer-title">Produkcja wideo</h2>
            <ul className="offer-list">
              <li>Kreacja i realizacja filmów promocyjnych.</li>
              <li>Produkcja filmów korporacyjnych i szkoleniowych.</li>
              <li>Tworzenie teledysków muzycznych.</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="offer-card card-3" ref={div2Ref}>
            <h2 className="offer-title">Relacje z wydarzen</h2>
            <ul className="offer-list">
              <li>
                Zapis wideo konferencji, szkoleń i innych wydarzeń na żywo.
              </li>
              <li>Transmisje na żywo oraz streaming wydarzeń online.</li>
              <li>Tworzenie relacji wideo i podsumowań wydarzeń.</li>
            </ul>
          </div>
          <h3 ref={div4Ref} className="offer-card middle-fama font-bold">
            FAMA
          </h3>
          <div className="offer-card card-4" ref={div6Ref}>
            <h2 className="offer-title">Relacje z wydarzen</h2>
            <ul className="offer-list">
              <li>
                Zapis wideo konferencji, szkoleń i innych wydarzeń na żywo.
              </li>
              <li>Transmisje na żywo oraz streaming wydarzeń online.</li>
              <li>Tworzenie relacji wideo i podsumowań wydarzeń.</li>
            </ul>
          </div>
          <div className="offer-card card-7" ref={div8Ref}>
            <iframe
              className="offer-video-4"
              // width="560"
              // height="315"
              src="https://www.youtube.com/embed/cZxYLJlxeJg?autoplay=1&mute=1&loop=1&playlist=cZxYLJlxeJg"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="offer-card card-8" ref={div9Ref}>
            <iframe
              className="offer-video-4"
              // width="560"
              // height="315"
              src="https://www.youtube.com/embed/3xwy-0rYLZQ?autoplay=1&mute=1&loop=1&playlist=3xwy-0rYLZQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="offer-card card-5" ref={div3Ref}>
            <h2 className="offer-title">Postprodukcja</h2>
            <ul className="offer-list">
              <li>Montaż wideo i dźwięku.</li>
              <li>
                Zapis wideo konferencji, szkoleń i innych wydarzeń na żywo.
              </li>
              <li>Korekcja kolorów i mastering</li>
            </ul>
          </div>
          <div className="offer-card card-6" ref={div7Ref}>
            <h2 className="offer-title">Korekcja kolorów i mastering</h2>
            <ul className="offer-list">
              <li>Montaż wideo i dźwięku.</li>
              <li>Efekty specjalne i animacje.</li>
              <li>Tworzenie relacji wideo i podsumowań wydarzeń.</li>
            </ul>
          </div>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        curvature={0}
        endYOffset={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div8Ref}
        curvature={0}
        endYOffset={0}
        gradientStartColor="#FF0000"
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div9Ref}
        curvature={0}
        endYOffset={0}
        gradientStartColor="#FF0000"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}
