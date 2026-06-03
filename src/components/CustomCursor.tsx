"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const trailRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports touch input
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsHidden(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer");

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  // Smooth trailing logic using linear interpolation
  useEffect(() => {
    if (isHidden) return;

    let frameId: number;

    const followMouse = () => {
      const dx = position.x - trailRef.current.x;
      const dy = position.y - trailRef.current.y;

      // Elastic speed interpolation factor
      trailRef.current.x += dx * 0.16;
      trailRef.current.y += dy * 0.16;

      setTrailPosition({ x: trailRef.current.x, y: trailRef.current.y });

      frameId = requestAnimationFrame(followMouse);
    };

    frameId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(frameId);
  }, [position, isHidden]);

  if (isHidden) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out bg-brand-500`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) ${
            isClicked ? "scale(0.5)" : isHovered ? "scale(1.5) bg-pink-500" : "scale(1)"
          }`,
        }}
      />
      {/* Outer Spring Circle Follower */}
      <div
        className={`fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isClicked
            ? "border-pink-500 bg-pink-500/10 scale-75"
            : isHovered
            ? "border-brand-500 bg-brand-500/5 scale-150"
            : "border-brand-500/40"
        } border`}
        style={{
          transform: `translate3d(${trailPosition.x}px, ${trailPosition.y}px, 0)`,
        }}
      />
    </>
  );
}
