"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 300);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrolled / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full glassmorphism border border-card-border shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-brand-500/20 group flex items-center justify-center ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      {/* SVG Circular progress track */}
      <svg className="absolute w-12 h-12 -rotate-90 pointer-events-none">
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="stroke-zinc-200/50 dark:stroke-zinc-800/50 fill-none"
          strokeWidth="2.5"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="stroke-brand-500 fill-none transition-all duration-100"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Up Arrow Icon */}
      <ArrowUp className="w-5 h-5 text-foreground group-hover:text-brand-500 transition-colors duration-300 relative z-10" />
    </button>
  );
}
