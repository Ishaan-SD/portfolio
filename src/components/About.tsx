"use client";

import React from "react";
import { Briefcase, FolderGit, Flame, Users, Sparkles } from "lucide-react";

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description: string;
  glowColor: string;
}

const stats: StatItem[] = [
  {
    icon: Briefcase,
    value: "4+ Years",
    label: "Professional Exp.",
    description: "Building production web apps and digital assets.",
    glowColor: "group-hover:border-violet-500/30 group-hover:shadow-violet-500/10",
  },
  {
    icon: FolderGit,
    value: "50+",
    label: "Projects Completed",
    description: "From lightweight SaaS products to Web3 protocols.",
    glowColor: "group-hover:border-pink-500/30 group-hover:shadow-pink-500/10",
  },
  {
    icon: Flame,
    value: "1.2k+",
    label: "GitHub Commits",
    description: "Highly active development cycle and clean coding style.",
    glowColor: "group-hover:border-amber-500/30 group-hover:shadow-amber-500/10",
  },
  {
    icon: Users,
    value: "99%",
    label: "Client Satisfaction",
    description: "High-grade feedback and reliable product delivery.",
    glowColor: "group-hover:border-emerald-500/30 group-hover:shadow-emerald-500/10",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/20 border-y border-card-border/40">
      {/* Background decoration */}
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-brand-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-bold tracking-wider text-brand-500 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              My Journey
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Bridging the gap between spectacular design and robust engineering
            </h2>
            
            <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-400 leading-relaxed">
              <p>
                I am a designer-minded developer who believes software should not only work flawlessly under the hood, but also feel incredibly refined and delightful to use. 
              </p>
              <p>
                My focus lies in building high-fidelity user experiences using React, Next.js, and modern CSS/Tailwind engines. I specialize in crafting interactive applications, optimized static assets, custom components, and highly structured architectures.
              </p>
              <p>
                Whether I&apos;m writing responsive frontend layouts or architecting serverless API models, I maintain a strict standard of pixel-perfect precision, SEO accessibility, and code readability.
              </p>
            </div>
          </div>

          {/* Right Column: Statistics Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`group relative p-6 rounded-2xl glassmorphism border border-card-border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${stat.glowColor}`}
                >
                  {/* Top line indicator with stat brand color */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/10 text-brand-500 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1 tracking-wide">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-normal">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
