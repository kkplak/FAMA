"use client";

import React, { PropsWithChildren, useRef, useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../../src/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 1.1; // Scaling factor for hover
const DEFAULT_DISTANCE = 80; // The range of effect
const MOBILE_THRESHOLD = 768;

const dockVariants = cva("w-max  flex gap-12 rounded-2xl");

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const mouseX = useMotionValue(Infinity);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < MOBILE_THRESHOLD);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          mouseX: mouseX,
          magnification: magnification,
          distance: distance,
          isMobile: isMobile,
        });
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={isMobile ? undefined : (e) => mouseX.set(e.pageX)}
        onMouseLeave={isMobile ? undefined : () => mouseX.set(Infinity)}
        {...props}
        className={cn(
          dockVariants({ className }),
          {
            flex: !isMobile,
            block: isMobile,
          },
          {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          }
        )}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: any;
  isMobile?: boolean;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

export const DockIcon = ({
  size = 40,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  isMobile = false,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scale = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    isMobile ? [1, 1, 1] : [1, magnification, 1]
  );

  const animatedScale = useSpring(scale, {
    mass: 0.2,
    stiffness: 100,
    damping: 18,
  });

  return (
    <motion.div
      ref={ref}
      style={{ scale: animatedScale }} // Apply scale only, no Y-axis movement
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full nav-icon",
        isMobile ? "block" : "flex",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";
