"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Code, Sparkles, Terminal } from "lucide-react";

const words = ["distributed", "automated", "intelligent", "scalable"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const [activeTab, setActiveTab] = useState<"code" | "terminal">("code");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: "",
      output: (
        <span className="text-zinc-500 dark:text-zinc-400">
          Welcome to Ishaan&apos;s Interactive Shell! 💻
          <br />
          Type <span className="text-brand-500 font-bold">help</span> to view available commands.
        </span>
      ),
    },
  ]);

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll terminal log to bottom
  useEffect(() => {
    if (activeTab === "terminal" && terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs, activeTab]);

  const focusTerminalInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-zinc-500 dark:text-zinc-400 text-left">
            <p>Available commands:</p>
            <p>  <span className="text-brand-500 font-bold">about</span>    - Brief intro bio details</p>
            <p>  <span className="text-brand-500 font-bold">skills</span>   - Primary technologies stack</p>
            <p>  <span className="text-brand-500 font-bold">projects</span> - Highlighted creations</p>
            <p>  <span className="text-brand-500 font-bold">contact</span>  - Connect pathways</p>
            <p>  <span className="text-brand-500 font-bold">clear</span>    - Clear console logs</p>
          </div>
        );
        break;
      case "about":
        output = (
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-left">
            I am a Software Engineer specializing in AI automation, LLM/MCP applications, and data pipelines. I design scalable, intelligent architectures linking AI and enterprise production.
          </p>
        );
        break;
      case "skills":
        output = (
          <p className="text-zinc-500 dark:text-zinc-400 text-left">
            MCP & LLM Apps, Transformers, Python, Spark, Kafka, Selenium, Docker, SQL, APIs.
          </p>
        );
        break;
      case "projects":
        output = (
          <div className="space-y-1 text-zinc-500 dark:text-zinc-400 text-left">
            <p>1. Emotion Support Chatbot (DistilBERT & Gemini)</p>
            <p>2. Real-Time Human Activity Pipeline (Kafka & Spark)</p>
            <p>3. Facial Lie Detection CV Model (OpenCV)</p>
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="space-y-1 text-zinc-500 dark:text-zinc-400 text-left font-mono">
            <p>Email: ishaandoddamani@gmail.com</p>
            <p>Phone: +91 8850356096</p>
          </div>
        );
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        output = (
          <p className="text-red-500 text-left">
            Command not recognized: &apos;{cmd}&apos;. Type &apos;help&apos; for list.
          </p>
        );
    }

    setTerminalLogs((prev) => [...prev, { command: terminalInput, output }]);
    setTerminalInput("");
  };

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
            I build systems
            <br />
            that are{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 min-w-[200px]">
              {currentText}
              <span className="absolute -right-1.5 bottom-1.5 w-1 h-8 sm:h-10 bg-brand-500 animate-pulse border-r-2 border-brand-500 animate-typing" />
            </span>
          </h1>

          {/* Description Subtext */}
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-400">
            Hey, I&apos;m <strong className="text-foreground font-semibold">Ishaan Doddamani</strong>. 
            I&apos;m a Software Engineer specializing in AI automation, enterprise LLM applications (MCP), backend systems, and automated test pipelines. I design scalable solutions that combine robust data engineering with state-of-the-art intelligent automation.
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-full blur-md opacity-35 group-hover/btn:opacity-60 transition-all duration-300 animate-fluid-gradient bg-[length:200%_auto]" />
              
              {/* Actual Button */}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="relative flex items-center justify-center gap-2 w-full sm:w-auto h-13 px-8 rounded-full font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 hover:from-amber-500 hover:via-yellow-400 hover:to-orange-500 text-white transition-all duration-300 cursor-pointer animate-fluid-gradient bg-[length:200%_auto] shadow-md"
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
            className="w-full max-w-md h-[420px] rounded-3xl glassmorphism glow-effect border border-card-border shadow-2xl p-6 flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing hover:shadow-brand-500/10"
          >
            {/* Window header */}
            <div className="flex items-center justify-between pb-4 border-b border-card-border/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-zinc-200/50 dark:bg-zinc-900/60 border border-card-border/30 font-mono text-[10px] sm:text-xs">
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-2 py-0.5 rounded-md transition-all duration-200 cursor-pointer ${
                    activeTab === "code"
                      ? "bg-brand-600 text-white font-bold"
                      : "text-zinc-500 hover:text-foreground"
                  }`}
                >
                  ishaan_profile.ts
                </button>
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`px-2 py-0.5 rounded-md transition-all duration-200 cursor-pointer ${
                    activeTab === "terminal"
                      ? "bg-brand-600 text-white font-bold"
                      : "text-zinc-500 hover:text-foreground"
                  }`}
                >
                  terminal.sh
                </button>
              </div>
              <div className="w-12 md:block hidden" /> {/* spacer */}
            </div>

            {/* Content Body */}
            {activeTab === "terminal" ? (
              /* Terminal Shell Body */
              <div
                onClick={focusTerminalInput}
                className="flex-1 py-4 font-mono text-xs leading-normal overflow-y-auto text-left flex flex-col justify-between cursor-text select-text scrollbar-thin"
              >
                <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                  {terminalLogs.map((log, index) => (
                    <div key={index} className="space-y-1">
                      {log.command !== "" && (
                        <div className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                          <span className="text-emerald-500 font-bold">guest@ishaan:~$</span>
                          <span>{log.command}</span>
                        </div>
                      )}
                      <div>{log.output}</div>
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 border-t border-card-border/40 pt-3 mt-2">
                  <span className="text-emerald-500 font-bold shrink-0">guest@ishaan:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-foreground caret-brand-500 font-mono text-xs p-0 focus:ring-0 focus:border-none"
                    placeholder="type command (e.g. help)..."
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </form>
              </div>
            ) : (
              /* TypeScript Code Body */
              <div className="flex-1 py-5 font-mono text-xs leading-relaxed overflow-y-auto select-none text-left">
                <p className="text-pink-500 dark:text-pink-400">
                  <span className="text-blue-500 dark:text-blue-400 font-medium">const</span> engineer = {"{"}
                </p>
                <div className="pl-4">
                  <p>
                    name: <span className="text-emerald-500 dark:text-emerald-400">{"\"Ishaan Doddamani\""}</span>,
                  </p>
                  <p>
                    role: <span className="text-emerald-500 dark:text-emerald-400">{"\"AI & Backend Engineer\""}</span>,
                  </p>
                  <p>
                    skills: <span className="text-zinc-400">{"[\"MCP\", \"Python\", \"APIs\", \"Selenium\", \"Spark\", \"Docker\"]"}</span>,
                  </p>
                  <p>
                    passion: <span className="text-emerald-500 dark:text-emerald-400">{"\"Automating complex workflows\""}</span>,
                  </p>
                  <p className="text-amber-500 dark:text-amber-400">
                    loc: <span className="text-emerald-500 dark:text-emerald-400">{"\"Navi Mumbai, India\""}</span>
                  </p>
                </div>
                <p className="text-pink-500 dark:text-pink-400">{"};"}</p>

                <div className="mt-5 p-3 rounded-xl bg-brand-500/5 border border-brand-500/10 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-normal">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-300">Quick tip:</span> Toggle the <span className="font-semibold text-brand-500">terminal.sh</span> tab at the top to query this card directly!
                  </p>
                </div>
              </div>
            )}

            {/* Window Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-card-border/60 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
              {activeTab === "terminal" ? (
                <>
                  <div className="flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-brand-500" />
                    <span>sh</span>
                  </div>
                  <span>Shell Console</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-brand-500" />
                    <span>UTF-8</span>
                  </div>
                  <span>TypeScript</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
