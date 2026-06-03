"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-in" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom-in";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  variant = "slide-up",
  delay = 0,
  duration = 750,
  threshold = 0.05,
  once = true,
}: ScrollRevealProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsIntersecting(true);
      return;
    }

    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once && currentRef) {
            observer.unobserve(currentRef);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const getVariantStyles = () => {
    switch (variant) {
      case "fade-in":
        return isIntersecting ? "opacity-100" : "opacity-0";
      case "slide-up":
        return isIntersecting
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10";
      case "slide-down":
        return isIntersecting
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10";
      case "slide-left":
        return isIntersecting
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-10";
      case "slide-right":
        return isIntersecting
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-10";
      case "zoom-in":
        return isIntersecting
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95";
      default:
        return "";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all cubic-bezier(0.16, 1, 0.3, 1) ${getVariantStyles()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
