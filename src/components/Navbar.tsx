"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Menu, X, Sun, Moon } from "lucide-react";

interface NavItem {
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync theme state with DOM class on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    requestAnimationFrame(() => {
      setTheme(isDark ? "dark" : "light");
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync theme changes with other triggers (like terminal commands)
  useEffect(() => {
    const syncTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };
    window.addEventListener("themechange", syncTheme);
    return () => window.removeEventListener("themechange", syncTheme);
  }, []);

  // Intersection Observer for highlighting active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Focus on the middle of the viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("themechange"));
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the navbar
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
        ? "navbar-glass py-4 shadow-lg"
        : "bg-transparent py-6"
        }`}
    >
      {/* Scroll Progress Bar Indicator */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 transition-all duration-100 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-2 group text-xl font-bold tracking-tight text-foreground"
        >
          <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 group-hover:scale-110 group-hover:border-brand-500/50 transition-all duration-300">
            <Cpu className="w-5 h-5 text-brand-500" />
          </div>
          <span>
            IshaanSD<span className="text-brand-500 font-semibold">.work</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${activeSection === item.id
                ? "text-brand-500"
                : "text-zinc-600 dark:text-zinc-300 hover:text-foreground"
                }`}
            >
              {activeSection === item.id && (
                <span className="absolute inset-0 bg-brand-500/10 rounded-full -z-10 animate-fade-in" />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-card-border hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 text-foreground cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-brand-500" />
            )}
          </button>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 hover:shadow-brand-500/35 transition-all duration-300 uppercase tracking-wider cursor-pointer"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-card-border text-foreground cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-brand-500" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-card-border text-foreground cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mobile-menu-glass border-b border-card-border absolute top-full left-0 right-0 py-6 px-6 flex flex-col gap-4 shadow-xl animate-slide-down">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-base font-semibold py-2 px-4 rounded-xl transition-all duration-300 ${activeSection === item.id
                ? "text-brand-500 bg-brand-500/10"
                : "text-zinc-600 dark:text-zinc-300 hover:text-foreground"
                }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="mt-2 text-center w-full py-3.5 rounded-xl font-bold bg-brand-600 hover:bg-brand-700 text-white transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}
