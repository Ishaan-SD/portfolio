"use client";

import React, { useEffect, useRef, useState } from "react";

const tagList = [
  "MCP", "LLM Apps", "Python", "Transformers", "Gemini API", 
  "Apache Spark", "Apache Kafka", "Hadoop", "Airflow", "Docker", 
  "Selenium", "SQL", "MongoDB", "NoSQL", "Java", "C/C++", "Pandas",
  "Linux", "APIs", "Delta Lake", "Machine Learning", "NLP"
];

interface Tag {
  text: string;
  x: number;
  y: number;
  z: number;
}

export default function SkillCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveredTagRef = useRef<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const depth = 350;
    let radius = 140;

    let angleX = 0.003;
    let angleY = 0.003;
    let targetAngleX = 0.003;
    let targetAngleY = 0.003;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Distribute tags uniformly over the sphere
    const count = tagList.length;
    const tags: Tag[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      tags.push({
        text: tagList[i],
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      });
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (parent) {
        const size = Math.min(parent.offsetWidth, 400);
        canvas.width = size;
        canvas.height = size;
        radius = size * 0.35;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Rotate points
    const rotatePointsX = (tag: Tag, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = tag.y * cos - tag.z * sin;
      const z1 = tag.z * cos + tag.y * sin;
      tag.y = y1;
      tag.z = z1;
    };

    const rotatePointsY = (tag: Tag, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = tag.x * cos - tag.z * sin;
      const z1 = tag.z * cos + tag.x * sin;
      tag.x = x1;
      tag.z = z1;
    };

    // Main animation loop
    const update = () => {
      const cxLocal = canvas.width / 2;
      const cyLocal = canvas.height / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly interpolate current speeds to target speeds
      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;

      // Sort tags by depth (z) to draw back-to-front (painter's algorithm)
      const sortedTags = [...tags].sort((a, b) => b.z - a.z);

      const isDark = document.documentElement.classList.contains("dark");

      for (let i = 0; i < sortedTags.length; i++) {
        const tag = sortedTags[i];

        // Apply rotation
        if (!isDragging) {
          rotatePointsX(tag, angleX);
          rotatePointsY(tag, angleY);
        }

        // Perspective Projection
        const scale = depth / (depth + tag.z);
        const screenX = tag.x * scale + cxLocal;
        const screenY = tag.y * scale + cyLocal;

        // Render Tag
        const size = Math.round((scale * 12) + 4);
        const opacity = (scale - 0.5) * 1.3;
        
        ctx.font = `bold ${size}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (hoveredTagRef.current === tag.text) {
          ctx.fillStyle = "#10b981"; // Emerald-500
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#10b981";
        } else {
          ctx.fillStyle = isDark
            ? `rgba(228, 228, 231, ${Math.min(opacity, 0.95)})` // Zinc-200
            : `rgba(63, 63, 70, ${Math.min(opacity, 0.95)})`; // Zinc-700
          ctx.shadowBlur = 0;
        }

        ctx.fillText(tag.text, screenX, screenY);
      }

      // Slowly decay target angles back to default slow drift
      if (!isDragging) {
        targetAngleX *= 0.98;
        targetAngleY *= 0.98;
        if (Math.abs(targetAngleX) < 0.002) targetAngleX = 0.002;
        if (Math.abs(targetAngleY) < 0.002) targetAngleY = 0.002;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    // Interactive controls (mouse move targets rotation speed)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const cxLocal = canvas.width / 2;
      const cyLocal = canvas.height / 2;

      if (isDragging) {
        const dx = x - startX;
        const dy = y - startY;
        
        // Rotate tags manually based on drag delta
        const dragScale = 0.005;
        tags.forEach((tag) => {
          rotatePointsY(tag, dx * dragScale);
          rotatePointsX(tag, dy * dragScale);
        });

        startX = x;
        startY = y;
      } else {
        // Influence speed depending on hover offset
        targetAngleY = (x - cxLocal) * 0.00004;
        targetAngleX = (y - cyLocal) * 0.00004;

        // Check if mouse is hovering over any tag
        let matchedTag: string | null = null;
        const depth = 350;

        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i];
          const scale = depth / (depth + tag.z);
          const screenX = tag.x * scale + cxLocal;
          const screenY = tag.y * scale + cyLocal;

          const size = Math.round((scale * 12) + 4);
          const width = ctx.measureText(tag.text).width;
          const height = size;

          if (
            x >= screenX - width / 2 - 4 &&
            x <= screenX + width / 2 + 4 &&
            y >= screenY - height / 2 - 4 &&
            y <= screenY + height / 2 + 4
          ) {
            matchedTag = tag.text;
            break;
          }
        }
        hoveredTagRef.current = matchedTag;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Touch events for mobile support
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (isDragging) {
        if (e.cancelable) e.preventDefault();
        const dx = x - startX;
        const dy = y - startY;
        
        const dragScale = 0.008;
        tags.forEach((tag) => {
          rotatePointsY(tag, dx * dragScale);
          rotatePointsX(tag, dy * dragScale);
        });

        startX = x;
        startY = y;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      startX = touch.clientX - rect.left;
      startY = touch.clientY - rect.top;
    };

    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleMouseUp);

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center p-4 relative"
    >
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing max-w-full touch-none"
      />
    </div>
  );
}
