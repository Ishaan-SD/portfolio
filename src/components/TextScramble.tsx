"use client";

import React, { useEffect, useState, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
}

export default function TextScramble({ text, className = "", scrambleOnMount = true }: TextScrambleProps) {
  const [displayVal, setDisplayVal] = useState(text);
  const isScrambling = useRef(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayVal((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        isScrambling.current = false;
      }

      iteration += 1 / 3;
    }, 25);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scramble();
            }
          });
        },
        { threshold: 0.1 }
      );
      if (triggerRef.current) observer.observe(triggerRef.current);
      return () => observer.disconnect();
    }
  }, [text, scrambleOnMount]);

  return (
    <span
      ref={triggerRef}
      onMouseEnter={scramble}
      className={`cursor-default ${className}`}
    >
      {displayVal}
    </span>
  );
}
