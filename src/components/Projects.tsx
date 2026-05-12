"use client";
import { Star, GitFork } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const repos = [
    {
      name: "FESTENTRY",
      desc: "Event management and smart QR-based entry verification platform designed for seamless concert and event access control.",
      language: "TypeScript",
      color: "bg-[#3178c6]",
      updated: "Updated 2 days ago",
      stars: 42
    },
    {
      name: "NagarikAI",
      desc: "AI-powered civic assistance platform focused on intelligent public service interaction and digital governance support.",
      language: "Python",
      color: "bg-[#3572A5]",
      updated: "Updated 5 days ago",
      stars: 128
    },
    {
      name: "NexaHire",
      desc: "Modern recruitment and hiring interface with elegant UI/UX and optimized candidate management workflows.",
      language: "TypeScript",
      color: "bg-[#3178c6]",
      updated: "Updated 1 week ago",
      stars: 84
    },
    {
      name: "CivicGuide-AI",
      desc: "Smart AI navigation and citizen guidance platform delivering real-time public information assistance.",
      language: "Python",
      color: "bg-[#3572A5]",
      updated: "Updated 2 weeks ago",
      stars: 256
    },
    {
      name: "PeakFuel-AI",
      desc: "AI-driven fitness and performance optimization system focused on energy tracking and intelligent health insights.",
      language: "JavaScript",
      color: "bg-[#f1e05a]",
      updated: "Updated 1 month ago",
      stars: 67
    }
  ];

  return (
    <section id="projects" className="relative z-20 bg-transparent py-32 px-8 md:px-24 w-full">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 flex flex-col items-start justify-between">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#00D1FF] uppercase mb-4">Operations</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Featured Repositories
          </h3>
          <div className="w-24 h-[1px] bg-white/20 mt-10" />
        </div>

        <div className="flex flex-col gap-6">
          {repos.map((repo, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, type: "spring", stiffness: 80 }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl bg-[#0d1117]/80 border border-white/[0.08] backdrop-blur-xl transition-all duration-300 hover:bg-[#161b22] hover:border-[#00D1FF]/60 hover:shadow-[0_0_40px_rgba(0,209,255,0.2)] hover:-translate-y-2 cursor-pointer overflow-hidden transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-2xl font-bold text-[#58a6ff] tracking-tight group-hover:text-[#00D1FF] transition-colors duration-300">
                    {repo.name}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full border border-white/20 text-xs font-medium text-white/60">
                    Public
                  </span>
                </div>
                
                <p className="text-white/60 leading-relaxed text-sm md:text-base font-light mb-6 max-w-3xl">
                  {repo.desc}
                </p>

                <div className="flex items-center gap-6 text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${repo.color} shadow-[0_0_8px_${repo.color}]`} />
                    <span>{repo.language}</span>
                  </div>
                  <div className="hidden md:flex items-center gap-1.5 hover:text-[#58a6ff] transition-colors">
                    <Star className="w-4 h-4" /> {repo.stars}
                  </div>
                  <div className="hidden md:flex items-center gap-1.5 hover:text-[#58a6ff] transition-colors">
                    <GitFork className="w-4 h-4" /> {Math.floor(repo.stars / 4)}
                  </div>
                  <div>
                    {repo.updated}
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 md:mt-0 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-6 md:gap-4 border-t border-white/5 md:border-t-0 pt-6 md:pt-0">
                <div className="flex items-end gap-1 h-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(12)].map((_, i) => {
                    // Deterministic pseudo-random values to prevent hydration mismatches
                    const randomHeight = 20 + (((i * 17 + idx * 31) % 100) / 100) * 80;
                    const randomDuration = 1.5 + (((i * 23 + idx * 13) % 100) / 100);
                    return (
                      <motion.div 
                        key={i}
                        animate={{ height: ["20%", `${randomHeight}%`, "20%"] }}
                        transition={{ duration: randomDuration, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 bg-[#00D1FF] rounded-t-sm shadow-[0_0_5px_#00D1FF]"
                        style={{ height: `${randomHeight}%` }}
                      />
                    );
                  })}
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-[#00D1FF]/10 hover:border-[#00D1FF]/50 hover:text-[#00D1FF] transition-all duration-300">
                  <Star className="w-4 h-4" />
                  Star
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
