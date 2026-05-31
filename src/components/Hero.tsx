"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Code, Sparkles, Terminal } from "lucide-react";

const words = ["intuitive", "responsive", "performant", "beautiful"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // Typist animation logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[wordIndex];
    const speed = isDeleting ? 40 : 100;

    if (!isDeleting && currentText === fullWord) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 100);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? fullWord.substring(0, prev.length - 1)
            : fullWord.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  // Card mouse movement tracking for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within the element
    const y = e.clientY - rect.top;  // y coordinate within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalize values to -10 to +10 degrees rotation
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden grid-bg radial-bg"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Information */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glassmorphism text-xs font-semibold tracking-wider text-brand-500 border border-brand-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            AVAILABLE FOR CONTRACT & FULL-TIME
          </div>

          {/* Headline Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground">
            I build interfaces
            <br />
            that are{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 min-w-[200px]">
              {currentText}
              <span className="absolute -right-1.5 bottom-1.5 w-1 h-8 sm:h-10 bg-brand-500 animate-pulse border-r-2 border-brand-500 animate-typing" />
            </span>
          </h1>

          {/* Description Subtext */}
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-400">
            Hey, I&apos;m <strong className="text-foreground font-semibold">Alex Rivers</strong>. 
            I&apos;m a creative engineer specializing in high-performance web architecture, premium user interfaces, and interactive details. I bring code and design together to craft spectacular digital experiences.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="flex items-center justify-center gap-2 w-full sm:w-auto h-13 px-8 rounded-full font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20 hover:shadow-brand-500/35 transition-all duration-300 group cursor-pointer"
            >
              Explore My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="relative group/btn w-full sm:w-auto">
              {/* Glowing Background layer */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-60 group-hover/btn:opacity-90 group-hover/btn:blur-lg transition-all duration-300" />
              
              {/* Actual Button */}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="relative flex items-center justify-center gap-2 w-full sm:w-auto h-13 px-8 rounded-full font-bold bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 hover:from-brand-500 hover:via-purple-500 hover:to-pink-500 text-white transition-all duration-300 cursor-pointer"
              >
                Let&apos;s Connect
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Premium 3D Interactive Card */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
            }}
            className="w-full max-w-md h-[400px] rounded-3xl glassmorphism glow-effect border border-card-border shadow-2xl p-6 flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing hover:shadow-brand-500/10"
          >
            {/* Window header */}
            <div className="flex items-center justify-between pb-4 border-b border-card-border/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                <Terminal className="w-3.5 h-3.5" />
                alex_profile.ts
              </div>
              <div className="w-12" /> {/* spacer */}
            </div>

            {/* Code Body */}
            <div className="flex-1 py-6 font-mono text-xs sm:text-sm leading-relaxed overflow-y-auto select-none">
              <p className="text-pink-500 dark:text-pink-400">
                <span className="text-blue-500 dark:text-blue-400 font-medium">const</span> developer = {"{"}
              </p>
              <div className="pl-4">
                <p>
                  name: <span className="text-emerald-500 dark:text-emerald-400">{"\"Alex Rivers\""}</span>,
                </p>
                <p>
                  role: <span className="text-emerald-500 dark:text-emerald-400">{"\"Full-Stack Creative\""}</span>,
                </p>
                <p>
                  skills: <span className="text-zinc-400">{"[\"React\", \"NextJS\", \"TypeScript\", \"Node\"]"}</span>,
                </p>
                <p>
                  passion: <span className="text-emerald-500 dark:text-emerald-400">{"\"Crafting pixel-perfect designs\""}</span>,
                </p>
                <p className="text-amber-500 dark:text-amber-400">
                  loc: <span className="text-emerald-500 dark:text-emerald-400">{"\"San Francisco, CA\""}</span>
                </p>
              </div>
              <p className="text-pink-500 dark:text-pink-400">{"};"}</p>

              <div className="mt-6 p-3 rounded-xl bg-brand-500/5 border border-brand-500/10 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-normal">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-300">Quick tip:</span> Hover and move your cursor over this card to watch it respond in 3D perspective space!
                </p>
              </div>
            </div>

            {/* Code Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-card-border/60 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
              <div className="flex items-center gap-1">
                <Code className="w-3.5 h-3.5 text-brand-500" />
                <span>UTF-8</span>
              </div>
              <span>TypeScript React</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
