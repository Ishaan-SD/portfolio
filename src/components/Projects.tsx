"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  title: string;
  category: "Full-Stack" | "Web3" | "Creative UI";
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    title: "Apex SaaS Analytics Dashboard",
    category: "Full-Stack",
    description: "A gorgeous, high-fidelity business intelligence dashboard showcasing interactive real-time widgets, data pipeline visualizers, and customizable multi-tenant analytics models.",
    image: "/dashboard_mockup.png",
    tags: ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS v4"],
    githubUrl: "https://github.com",
    liveUrl: "https://vercel.com",
  },
  {
    title: "Vanguard Immersive Creative Portal",
    category: "Creative UI",
    description: "A premium minimalist showcase platform for modern digital media, photos, and high-art portfolios. Built with high-end typography layout and fluid parallax scroll transitions.",
    image: "/creative_mockup.png",
    tags: ["React 19", "Tailwind CSS v4", "Lucide Icons", "CSS Grid"],
    githubUrl: "https://github.com",
    liveUrl: "https://vercel.com",
  },
  {
    title: "Aetherium Web3 DEX Terminal",
    category: "Web3",
    description: "A futuristic decentralized trading interface detailing complex visual charts, live transactions monitoring, blockchain node integrations, and lightning-fast web socket connections.",
    image: "/web3_mockup.png",
    tags: ["Next.js 16", "Web3.js", "GraphQL", "Tailwind v4", "WebSockets"],
    githubUrl: "https://github.com",
    liveUrl: "https://vercel.com",
  },
];

type ProjectCategory = "All" | "Full-Stack" | "Web3" | "Creative UI";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

  const filteredProjects = projects.filter(
    (proj) => activeFilter === "All" || proj.category === activeFilter
  );

  const filters: ProjectCategory[] = ["All", "Full-Stack", "Web3", "Creative UI"];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950/20">
      {/* Visual neon light backgrounds */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-brand-500/5 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full bg-pink-500/5 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-bold tracking-wider text-brand-500 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Selected Portfolios
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Featured Creations
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A selective gallery of state-of-the-art web products showing comprehensive design execution, frontend aesthetics, and clean engineering.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center items-center gap-2 flex-wrap mb-12">
          {filters.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeFilter === category
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                  : "glassmorphism hover:bg-black/5 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects showcase list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 min-h-[350px]">
          {filteredProjects.map((project, index) => (
            <article
              key={index}
              className="group relative flex flex-col justify-between rounded-3xl glassmorphism border border-card-border overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-500/30 animate-fade-in"
            >
              {/* Card visual showcase header */}
              <div className="relative w-full h-[220px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-card-border/60">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-w-7xl) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={index === 0}
                />
                
                {/* Floating category tag */}
                <span className="absolute top-4 left-4 inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white bg-black/60 backdrop-blur-md border border-white/10">
                  {project.category}
                </span>
              </div>

              {/* Card core description */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Technology Tags Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-zinc-200/60 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border border-zinc-300/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-card-border/60">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-foreground transition-colors group/link cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      Source Code
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors group/link cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
