"use client";

import React, { useState } from "react";
import { Code2, Layout, Server, Cpu, Database, Smartphone, GitBranch, ShieldCheck } from "lucide-react";

interface Skill {
  name: string;
  category: "Languages & Databases" | "Big Data & DevOps" | "Machine Learning & AI";
  icon: React.ComponentType<{ className?: string }>;
  level: number; // out of 5
  color: string;
  glowClass: string;
}

const skills: Skill[] = [
  // Machine Learning & AI
  {
    name: "MCP & LLM Applications",
    category: "Machine Learning & AI",
    icon: Cpu,
    level: 4,
    color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
    glowClass: "group-hover:border-violet-500/40 group-hover:shadow-violet-500/10",
  },
  {
    name: "Transformers & Gemini API",
    category: "Machine Learning & AI",
    icon: ShieldCheck,
    level: 5,
    color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    glowClass: "group-hover:border-orange-500/40 group-hover:shadow-orange-500/10",
  },
  {
    name: "DistilBERT & Prompt Eng.",
    category: "Machine Learning & AI",
    icon: Cpu,
    level: 4,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    glowClass: "group-hover:border-amber-500/40 group-hover:shadow-amber-500/10",
  },
  // Big Data & DevOps
  {
    name: "Spark, Kafka & Hadoop",
    category: "Big Data & DevOps",
    icon: Server,
    level: 3,
    color: "text-red-500 bg-red-500/10 border-red-500/20",
    glowClass: "group-hover:border-red-500/40 group-hover:shadow-red-500/10",
  },
  {
    name: "Airflow, Delta Lake & Hive",
    category: "Big Data & DevOps",
    icon: GitBranch,
    level: 3,
    color: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20",
    glowClass: "group-hover:border-zinc-500/40 group-hover:shadow-zinc-500/10",
  },
  {
    name: "AWS, Docker & Linux",
    category: "Big Data & DevOps",
    icon: Cpu,
    level: 4,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    glowClass: "group-hover:border-sky-500/40 group-hover:shadow-sky-500/10",
  },
  // Languages & Databases
  {
    name: "Python & SQL",
    category: "Languages & Databases",
    icon: Code2,
    level: 5,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    glowClass: "group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10",
  },
  {
    name: "Java, C/C++ & R",
    category: "Languages & Databases",
    icon: Code2,
    level: 3,
    color: "text-pink-500 bg-pink-500/10 border-pink-500/20",
    glowClass: "group-hover:border-pink-500/40 group-hover:shadow-pink-500/10",
  },
  {
    name: "MySQL, Mongo & NoSQL",
    category: "Languages & Databases",
    icon: Database,
    level: 4,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    glowClass: "group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10",
  },
  {
    name: "Selenium & APIs (Automation)",
    category: "Languages & Databases",
    icon: Layout,
    level: 5,
    color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    glowClass: "group-hover:border-yellow-500/40 group-hover:shadow-yellow-500/10",
  },
  {
    name: "Jira, Confluence",
    category: "Languages & Databases",
    icon: Layout,
    level: 4,
    color: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20",
    glowClass: "group-hover:border-fuchsia-500/40 group-hover:shadow-fuchsia-500/10",
  },
];

type CategoryFilter = "All" | "Languages & Databases" | "Big Data & DevOps" | "Machine Learning & AI";

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  const filteredSkills = skills.filter(
    (skill) => activeFilter === "All" || skill.category === activeFilter
  );

  const filterOptions: CategoryFilter[] = ["All", "Languages & Databases", "Big Data & DevOps", "Machine Learning & AI"];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-zinc-100/30 dark:bg-black/40">
      {/* Decorative background lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-bold tracking-wider text-brand-500 uppercase">
            Technical Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            My Tech Ecosystem
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A curated selection of core languages, distributed processing frameworks, and ML/AI toolsets I leverage to engineer robust intelligence systems.
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex justify-center items-center gap-2 flex-wrap mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${activeFilter === opt
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                  : "glassmorphism hover:bg-black/5 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[280px]">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className={`group relative p-5 rounded-2xl glassmorphism border border-card-border shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-fade-in ${skill.glowClass}`}
              >
                {/* Visual Icon Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Level indicators */}
                <div className="flex flex-col gap-2.5 w-full mt-3">
                  <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                    <span>Proficiency</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-amber-500 font-extrabold text-xs font-mono">{skill.level * 20}%</span>
                  </div>
                  {/* Sleek continuous glowing progress slider track */}
                  <div className="h-2 w-full bg-zinc-200/80 dark:bg-zinc-900/60 rounded-full relative overflow-hidden border border-zinc-300/10 shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-400 transition-all duration-1000 ease-out relative"
                      style={{
                        width: `${skill.level * 20}%`,
                      }}
                    >
                      {/* Animated neon leading glow edge */}
                      <span className="absolute right-0 top-0 h-full w-3 bg-white/40 blur-[2px] rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
