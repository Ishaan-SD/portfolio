"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, Sparkles } from "lucide-react";

interface Role {
  period: string;
  title: string;
  company: string;
  location: string;
  description: string[];
  tags: string[];
}

const history: Role[] = [
  {
    period: "2024 - PRESENT",
    title: "Senior Creative Engineer",
    company: "Nexus Interactive Agency",
    location: "San Francisco, CA (Remote)",
    description: [
      "Oversee architectural design and execution of production frontend applications using React 19 and Next.js.",
      "Redesigned key client portals, improving Core Web Vitals performance benchmarks by over 40% and increasing accessibility compliance.",
      "Engineered high-performance internal component libraries styled with modular Tailwind CSS tokens, drastically cutting project delivery times."
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "A11y"],
  },
  {
    period: "2022 - 2024",
    title: "Full-Stack Software Engineer",
    company: "Helix FinTech Group",
    location: "New York, NY",
    description: [
      "Engineered robust PostgreSQL data models and optimized query handling using Prisma ORM.",
      "Collaborated on backend security architectures, token authentication systems, and serverless route handlers.",
      "Configured AWS ECS container tasks and configured CI/CD build scripts for direct Vercel and AWS deployments."
    ],
    tags: ["Node.js", "GraphQL", "PostgreSQL", "Prisma", "AWS", "Docker"],
  },
  {
    period: "2020 - 2022",
    title: "Frontend Web Developer",
    company: "Prism Creative Studios",
    location: "Los Angeles, CA",
    description: [
      "Constructed immersive web experiences, portfolio visualizers, and marketing landing pages.",
      "Translated high-fidelity Figma drawings into exact, fluidly responsive HTML structures and custom CSS designs.",
      "Integrated search engine optimization best practices and descriptive metadata markup to double page visibility."
    ],
    tags: ["JavaScript", "React", "CSS Modules", "HTML5", "SEO", "Figma"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-zinc-100/30 dark:bg-black/40 border-t border-card-border/40">
      {/* Background glowing elements */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-bold tracking-wider text-brand-500 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            My Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Professional Experience
          </h2>
          <p className="max-w-lg text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A linear timeline of my technical career history, detailing critical milestones, creative roles, and technologies deployed.
          </p>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l-2 border-brand-500/20 dark:border-brand-500/10 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          
          {history.map((role, index) => (
            <div key={index} className="relative group">
              
              {/* Central Timeline Point Node */}
              <div className="absolute -left-[45px] md:-left-[53px] top-1.5 p-2 rounded-full bg-background border-2 border-brand-500 text-brand-500 shadow-md group-hover:scale-115 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Timeline Card */}
              <div className="group relative p-6 md:p-8 rounded-3xl glassmorphism border border-card-border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-500/30">
                
                {/* Visual Glow Gradient Accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-purple-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card Title Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-brand-500 transition-colors duration-300">
                      {role.title}
                    </h3>
                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-300">
                      {role.company}
                    </span>
                  </div>
                  
                  {/* Period tag */}
                  <span className="inline-flex items-center gap-1.5 self-start md:self-center px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 border border-brand-500/15 text-brand-500 tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    {role.period}
                  </span>
                </div>

                {/* Location Badge */}
                <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 mb-6 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  {role.location}
                </div>

                {/* Key Accomplishments bullets */}
                <ul className="list-none space-y-3 mb-6 text-sm sm:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed text-left pl-0">
                  {role.description.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-brand-500 before:rounded-full">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Technologies Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-card-border/60">
                  {role.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-zinc-200/60 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border border-zinc-300/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
