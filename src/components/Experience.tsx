"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, Sparkles, GraduationCap } from "lucide-react";

interface TimelineItem {
  type: "work" | "education";
  period: string;
  title: string;
  company: string;
  location: string;
  description: string[];
  tags: string[];
}

const history: TimelineItem[] = [
  {
    type: "work",
    period: "SEP 2025 - PRESENT",
    title: "Software Engineer",
    company: "IAV India Tech Pvt Ltd",
    location: "Pune, India",
    description: [
      "Built an MCP-powered Confluence Chatbot enabling enterprise knowledge retrieval from Confluence while enforcing user authorization and access-control policies.",
      "Developed an Excel-to-JIRA migration automation tool using Python to convert large PO datasets into structured JIRA epics through preprocessing, filtering, and data mapping workflows.",
      "Engineered a German-to-English Excel Translation Pipeline using Selenium automation and enterprise translation services while preserving spreadsheet formatting, signal names, variables, and domain-specific keywords using masking techniques and exception handling.",
      "Automated Volkswagen Incident Handler testcase generation using Python, Pandas, configurable templates, placeholder-driven workflows, logging, and Codebeamer integration.",
      "Engineered Volkswagen Data Manager Testcase Automation solutions involving ADAS systems, Linux environments, networking concepts, and HIL execution.",
      "Designed automation approaches using Python and AI-driven workflows for intelligent testcase generation and automated execution on shared Berlin-based test rigs."
    ],
    tags: ["MCP", "LLM Applications", "Python", "Selenium", "Pandas", "Codebeamer", "Jira", "Confluence", "Linux", "Automotive Systems"],
  },
  {
    type: "education",
    period: "2024 - 2025",
    title: "PG Diploma in Big Data Analytics (DBDA)",
    company: "Sunbeam CDAC (Pune)",
    location: "Pune, Maharashtra",
    description: [
      "Specialized in high-scale data analytics frameworks, distributed data systems, and database warehousing structures.",
      "Graduated with an aggregate CPI score of 74%."
    ],
    tags: ["Big Data", "Apache Spark", "Hadoop", "Hive", "Cassandra", "MySQL"],
  },
  {
    type: "work",
    period: "DEC 2022 - FEB 2025",
    title: "Executive Survey Programmer",
    company: "IPSOS",
    location: "Mumbai, India",
    description: [
      "Developed and scripted complex multi-market consumer insights surveys using IBM SPSS Dimensions.",
      "Queried, validated, and analyzed production data pipelines using SQL/DMQuery to generate key insights.",
      "Worked closely with international project managers to design client-specific report formats and troubleshoot live system bugs."
    ],
    tags: ["IBM SPSS Dimensions", "SQL", "DMQuery", "Data Validation", "Survey Engineering"],
  },
  {
    type: "education",
    period: "2018 - 2022",
    title: "B.E. in Computer Engineering",
    company: "Mumbai University (Bharathi Vidyapeeth)",
    location: "Mumbai, Maharashtra",
    description: [
      "Built a solid grounding in core computer science disciplines: Data Structures, Algorithms, Operating Systems, and DBMS.",
      "Graduated with a cumulative GPA of 8.11 / 71.93%."
    ],
    tags: ["Computer Engineering", "Data Structures", "Algorithms", "Databases", "C/C++", "Java"],
  },
  {
    type: "education",
    period: "2016 - 2018",
    title: "HSC (Higher Secondary Certificate)",
    company: "CKT College (Maharashtra Board)",
    location: "Navi Mumbai, India",
    description: ["Focused on Science stream (Physics, Chemistry, Mathematics, and Electronics). Secured 58%."],
    tags: ["Physics", "Chemistry", "Mathematics", "Electronics"],
  },
  {
    type: "education",
    period: "2016",
    title: "SSC (Secondary School Certificate)",
    company: "Carmel Convent High School (Maharashtra Board)",
    location: "Navi Mumbai, India",
    description: ["Graduated with an aggregate school score of 83%."],
    tags: ["General Sciences", "Mathematics", "Languages"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-zinc-100/30 dark:bg-black/40">
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
                {role.type === "work" ? (
                  <Briefcase className="w-4 h-4" />
                ) : (
                  <GraduationCap className="w-4 h-4" />
                )}
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
