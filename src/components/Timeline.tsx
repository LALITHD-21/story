"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Crosshair } from "lucide-react";
import { useRef } from "react";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Maps the scroll progress to a percentage string for the line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const experiences = [
    {
      year: "PRESENT",
      role: "Cyber Security Professional",
      desc: "Architecting resilient digital infrastructures and executing advanced threat intelligence operations."
    },
    {
      year: "EDUCATION",
      role: "BCA Degree",
      desc: "Advancing expertise in secure computing, networking, and intelligent system engineering at Vaisiri Institute of Technology and Management."
    },
    {
      year: "CREDENTIALS",
      role: "Certifications",
      desc: "Specialized certifications in cybersecurity, networking, penetration testing, and secure software development."
    },
    {
      year: "ACADEMIC",
      role: "PRE BOARD",
      desc: "Developed analytical and computational foundations through intensive mathematics and technology-focused studies."
    },
    {
      year: "ACADEMIC",
      role: "SSLC",
      desc: "Established early academic excellence and a strong foundation in engineering-oriented problem solving."
    }
  ];

  return (
    <section ref={containerRef} className="relative z-20 bg-transparent py-32 px-8 md:px-24 w-full">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#00D1FF] uppercase mb-4">Trajectory</h2>
        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-24 drop-shadow-[0_0_15px_rgba(0,209,255,0.3)]">
          Operational Evolution
        </h3>

        <div className="relative border-l-2 border-dashed border-[#00D1FF]/30 ml-4 md:ml-0 pb-10">
          
          {/* Animated Solid Neon Running Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute top-0 left-[-2px] w-[2px] bg-[#00D1FF] shadow-[0_0_15px_#00D1FF] origin-top z-0"
          >
            {/* Glowing tracer head tracking down the line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#00D1FF] rounded-full shadow-[0_0_20px_#00D1FF,0_0_40px_#00D1FF] border-2 border-[#ffffff] animate-pulse" />
          </motion.div>

          <div className="relative z-10 pt-4">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                className="mb-20 pl-12 md:pl-16 relative group"
              >
                {/* Animated HUD Node */}
                <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-[#121212] border-2 border-[#00D1FF] flex items-center justify-center shadow-[0_0_15px_#00D1FF] group-hover:scale-125 group-hover:bg-[#00D1FF] transition-all duration-500 z-10">
                  <Crosshair className="w-5 h-5 text-[#00D1FF] group-hover:text-black transition-colors" />
                  {/* Ping animation */}
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#00D1FF] opacity-40 animate-ping group-hover:opacity-0 transition-opacity" />
                </div>
                
                {/* Tactical Glassmorphism Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-white/[0.04] hover:border-[#00D1FF]/60 hover:shadow-[0_0_40px_rgba(0,209,255,0.2)] relative overflow-hidden transform-gpu"
                >
                  {/* Cyber Scanline Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,209,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />
                  
                  <span className="text-xs font-bold tracking-[0.3em] text-[#7EE7FF] mb-3 block">
                    {exp.year}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                    {exp.role}
                  </h4>
                  <p className="text-white/60 font-light leading-relaxed text-lg">
                    {exp.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
