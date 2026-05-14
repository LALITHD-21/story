"use client";
import { Star, GitFork } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import ExplodedGallery from "./ExplodedGallery";

export default function Projects() {
  const repos = [
    {
      name: "FESTENTRY",
      desc: "Event management and smart QR-based entry verification platform designed for seamless concert and event access control.",
      language: "TypeScript",
      color: "bg-[#3178c6]",
      updated: "Updated 2 days ago",
      stars: 42,
      url: "https://github.com/LALITHD-21/FESTENTRY.git"
    },
    {
      name: "NagarikAI",
      desc: "AI-powered civic assistance platform focused on intelligent public service interaction and digital governance support.",
      language: "Python",
      color: "bg-[#3572A5]",
      updated: "Updated 5 days ago",
      stars: 128,
      url: "https://github.com/LALITHD-21/NagarikAI.git"
    },
    {
      name: "NexaHire",
      desc: "Modern recruitment and hiring interface with elegant UI/UX and optimized candidate management workflows.",
      language: "TypeScript",
      color: "bg-[#3178c6]",
      updated: "Updated 1 week ago",
      stars: 84,
      url: "https://github.com/LALITHD-21/NexaHire.git"
    },
    {
      name: "CivicGuide-AI",
      desc: "Smart AI navigation and citizen guidance platform delivering real-time public information assistance.",
      language: "Python",
      color: "bg-[#3572A5]",
      updated: "Updated 2 weeks ago",
      stars: 256,
      url: "https://github.com/LALITHD-21/CivicGuide-AI.git"
    },
    {
      name: "PeakFuel-AI",
      desc: "AI-driven fitness and performance optimization system focused on energy tracking and intelligent health insights.",
      language: "JavaScript",
      color: "bg-[#f1e05a]",
      updated: "Updated 1 month ago",
      stars: 67,
      url: "https://github.com/LALITHD-21/PeakFuel-AI.git"
    },
    {
      name: "AegisAI-SOC-Workspace",
      desc: "Advanced AI-powered Security Operations Center workspace for threat detection and incident response.",
      language: "TypeScript",
      color: "bg-[#3178c6]",
      updated: "Updated on Apr 11",
      stars: 115,
      url: "https://github.com/LALITHD-21/AegisAI-SOC-Workspace.git"
    }
  ];

  return (
    <section id="projects" className="relative z-20 bg-transparent py-32 px-8 md:px-24 w-full">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 flex flex-col items-start justify-between">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#FF7A18] uppercase mb-4">Operations</h2>
          <AnimatedHeading 
            text="Featured Repositories"
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
          />
        </div>

        <div className="w-full">
          <ExplodedGallery items={repos} />
        </div>
      </div>
    </section>
  );
}
