"use client";

import { RefObject, useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../src/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement>; // Container ref
  fromRef: RefObject<HTMLElement>;
  toRef: RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "black",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const [gradientCoordinates, setGradientCoordinates] = useState({
    initial: { x1: "0%", x2: "0%", y1: "0%", y2: "0%" },
    animate: { x1: "0%", x2: "0%", y1: "0%", y2: "0%" },
  });

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`;
        setPathD(d);

        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

        let initialGradientCoordinates;
        let animateGradientCoordinates;

        if (isHorizontal) {
          if (reverse) {
            initialGradientCoordinates = {
              x1: "100%",
              x2: "0%",
              y1: "0%",
              y2: "0%",
            };
            animateGradientCoordinates = {
              x1: "0%",
              x2: "-100%",
              y1: "0%",
              y2: "0%",
            };
          } else {
            initialGradientCoordinates = {
              x1: "0%",
              x2: "100%",
              y1: "0%",
              y2: "0%",
            };
            animateGradientCoordinates = {
              x1: "100%",
              x2: "200%",
              y1: "0%",
              y2: "0%",
            };
          }
        } else {
          if (reverse) {
            initialGradientCoordinates = {
              x1: "0%",
              x2: "0%",
              y1: "100%",
              y2: "0%",
            };
            animateGradientCoordinates = {
              x1: "0%",
              x2: "0%",
              y1: "0%",
              y2: "-100%",
            };
          } else {
            initialGradientCoordinates = {
              x1: "0%",
              x2: "0%",
              y1: "0%",
              y2: "100%",
            };
            animateGradientCoordinates = {
              x1: "0%",
              x2: "0%",
              y1: "100%",
              y2: "200%",
            };
          }
        }

        setGradientCoordinates({
          initial: initialGradientCoordinates,
          animate: animateGradientCoordinates,
        });
      }
    };

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Call the updatePath initially to set the initial path
    updatePath();

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
    reverse,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={gradientCoordinates.initial}
          animate={gradientCoordinates.animate}
          transition={{
            delay,
            duration,
            ease: [0.1, 0.1, 0.1, 0.1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop
            offset="10%"
            stopColor={gradientStartColor}
            stopOpacity="0"
          ></stop>
          <stop
            offset="20%"
            stopColor={gradientStartColor}
            stopOpacity="1"
          ></stop>
          <stop
            offset="80%"
            stopColor={gradientStopColor}
            stopOpacity="1"
          ></stop>
          <stop
            offset="40%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
