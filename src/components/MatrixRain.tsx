"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MatrixRain() {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsActive(customEvent.detail?.active ?? !isActive);
    };

    window.addEventListener("toggle-matrix", handleToggle);
    return () => window.removeEventListener("toggle-matrix", handleToggle);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Characters for Matrix effect
    const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArr = chars.split("");

    const fontSize = 15;
    const columns = canvas.width / fontSize;

    // Drops coordinates
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981"; // Emerald-500
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drops when they reach off-screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Auto close after 30 seconds to save power
    const autoCloseTimer = setTimeout(() => {
      setIsActive(false);
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(autoCloseTimer);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      onClick={() => setIsActive(false)}
      className="fixed inset-0 z-40 bg-black cursor-pointer animate-fade-in"
      title="Click anywhere to exit Matrix mode"
    />
  );
}
