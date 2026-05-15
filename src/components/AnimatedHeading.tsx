"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  highlightWord?: string;
  highlightClass?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export default function AnimatedHeading({ text, className = "", highlightWord, highlightClass, as = "h3" }: AnimatedHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    },
  };

  const MotionTag = motion[as as keyof typeof motion] as React.ElementType;

  return (
    <MotionTag
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
    >
      {words.map((word, wordIdx) => {
        const isHighlighted = highlightWord && word.includes(highlightWord);
        return (
          <span 
            key={wordIdx} 
            className={isHighlighted ? highlightClass : ""}
            style={{ display: "inline-flex", flexWrap: "nowrap" }}
          >
            {Array.from(word).map((char, charIdx) => (
              <span
                key={`${wordIdx}-${charIdx}`}
                style={{ overflow: "hidden", display: "inline-block" }}
              >
                <motion.span
                  variants={child}
                  style={{ 
                    display: "inline-block", 
                    whiteSpace: "pre",
                    willChange: "transform, opacity" 
                  }}
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </span>
        );
      })}
    </MotionTag>
  );
}
