"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Circle } from "lucide-react";
import { useRef } from "react";
import AnimatedHeading from "./AnimatedHeading";
import { GradientBlinds } from "./GradientBlinds";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const experiences = [
    {
      year: "PRESENT",
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
    <section id="timeline" ref={containerRef} className="relative z-20 bg-transparent py-32 px-4 md:px-24 w-full overflow-hidden">
      {/* Gradient Blinds Background Effect */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GradientBlinds
          gradientColors={['#FF7A18', '#C44536', '#16110D']}
          angle={-15}
          noise={0.2}
          blindCount={20}
          blindMinWidth={40}
          spotlightRadius={0.6}
          spotlightSoftness={0.8}
          spotlightOpacity={0.9}
          mouseDampening={0.12}
          distortAmount={2}
          shineDirection="left"
        />
      </div>
      {/* Gradient to blend with section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0B08] via-transparent to-[#0F0B08] z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold tracking-[0.3em] text-[#FF7A18] uppercase mb-4"
        >
          Trajectory
        </motion.h2>
        <AnimatedHeading 
          text="Operational Evolution"
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-24 drop-shadow-[0_0_15px_rgba(255,122,24,0.15)]"
        />

        <div className="relative border-l-2 border-dashed border-[#FF7A18]/20 ml-4 md:ml-0 pb-10">
          
          {/* Animated Warm Running Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute top-0 left-[-2px] w-[2px] bg-gradient-to-b from-[#FF7A18] to-[#FFB347] shadow-[0_0_12px_rgba(255,122,24,0.6)] origin-top z-0"
          >
            {/* Glowing tracer head */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FF7A18] rounded-full shadow-[0_0_15px_rgba(255,122,24,0.8),0_0_30px_rgba(255,122,24,0.4)] border-2 border-white/80 animate-pulse" />
          </motion.div>

          <div className="relative z-10 pt-4">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                className="mb-[30vh] pl-12 md:pl-16 relative group sticky"
                style={{ top: `calc(20vh + ${idx * 1.5}rem)`, zIndex: 20 + idx }}
              >
                {/* Timeline Node */}
                <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-[#0F0B08] border-2 border-[#FF7A18]/60 flex items-center justify-center shadow-[0_0_12px_rgba(255,122,24,0.3)] group-hover:scale-110 group-hover:bg-[#FF7A18]/10 group-hover:border-[#FF7A18] transition-all duration-500 z-10">
                  <Circle className="w-4 h-4 text-[#FF7A18]/70 group-hover:text-[#FF7A18] transition-colors" />
                </div>
                
                {/* Glassmorphism Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, x: 8 }}
                  className="p-8 rounded-2xl bg-[#16110D]/60 border border-white/[0.08] backdrop-blur-xl transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:bg-[#16110D]/80 hover:border-[#FF7A18]/30 hover:shadow-[0_0_35px_rgba(255,122,24,0.1)] relative overflow-hidden transform-gpu"
                >
                  {/* Warm gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A18]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <span className="text-xs font-bold tracking-[0.3em] text-[#FFD6A5]/70 mb-3 block relative z-10">
                    {exp.year}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight relative z-10">
                    {exp.role}
                  </h4>
                  <AnimatedHeading 
                    as="p"
                    text={exp.desc}
                    className="text-white/55 font-light leading-relaxed text-lg relative z-10"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
