"use client";

import React from "react";
import { Cpu, ArrowUp, Mail } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
    <footer className="bg-zinc-100/50 dark:bg-black/20 py-16 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center gap-10">

        {/* Row 1: Logo & Scroll to Top */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pb-8">

          {/* Logo brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
          >
            <div className="p-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-500">
              <Cpu className="w-4 h-4" />
            </div>
            <span>
              IshaanSD<span className="text-brand-500 font-semibold">.work</span>
            </span>
          </a>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border border-card-border hover:border-brand-500/40 text-zinc-600 dark:text-zinc-400 hover:text-brand-500 transition-all duration-300 cursor-pointer"
          >
            Back To Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Row 2: Navigations Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {["home", "about", "skills", "projects", "experience", "contact"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className="text-sm font-semibold capitalize text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors duration-300"
            >
              {id === "home" ? "Home" : id}
            </a>
          ))}
        </div>

        {/* Row 3: Networks & Copyright */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
          {/* Copyright description */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            &copy; {new Date().getFullYear()} Ishaan Doddamani. All rights reserved. Built with Next.js & Tailwind CSS v4.
          </p>

          {/* Icon channels */}
          <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
            <a
              href="https://github.com/Ishaan-SD"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ishaan-doddamani-31971a186/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:ishaandoddamani@gmail.com"
              className="hover:text-foreground transition-colors"
              aria-label="Email Direct"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
