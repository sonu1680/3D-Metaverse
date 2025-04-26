"use client";

import React from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export const MotionSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: MotionSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getDirectionalVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay: delay,
        },
      },
    };

    switch (direction) {
      case "up":
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, y: 40 },
          visible: { ...baseVariants.visible, y: 0 },
        };
      case "down":
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, y: -40 },
          visible: { ...baseVariants.visible, y: 0 },
        };
      case "left":
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, x: 40 },
          visible: { ...baseVariants.visible, x: 0 },
        };
      case "right":
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, x: -40 },
          visible: { ...baseVariants.visible, x: 0 },
        };
      case "none":
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={getDirectionalVariants()}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};