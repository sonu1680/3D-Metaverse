"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  el?: React.ElementType;
  animation?: "fade" | "slide-up" | "glow";
  delay?: number;
}

const textVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  glow: {
    hidden: { opacity: 0, textShadow: "0 0 0px rgba(11, 240, 252, 0)" },
    visible: {
      opacity: 1,
      textShadow: [
        "0 0 8px rgba(11, 240, 252, 0.5), 0 0 12px rgba(11, 240, 252, 0.3)",
        "0 0 16px rgba(11, 240, 252, 0.7), 0 0 24px rgba(11, 240, 252, 0.5)",
        "0 0 8px rgba(11, 240, 252, 0.5), 0 0 12px rgba(11, 240, 252, 0.3)",
      ],
      transition: {
        textShadow: {
          repeat: Infinity,
          duration: 3,
        },
      },
    },
  },
};

export const AnimatedText = ({
  text,
  className = "",
  once = true,
  el: Wrapper = "div",
  animation = "fade",
  delay = 0,
}: AnimatedTextProps) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay * i },
    }),
  };

  const child = textVariants[animation];

  return (
    <Wrapper className={className}>
      <motion.div
        style={{ display: "inline-block" }}
        variants={container}
        initial="hidden"
        animate="visible"
        exit="hidden"
        viewport={{ once }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={child}
            style={{ display: "inline-block", marginRight: "0.4em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </Wrapper>
  );
};