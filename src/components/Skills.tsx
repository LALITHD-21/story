"use client";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedCounter({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2.5, ease: "easeOut", delay });
      return controls.stop;
    }
  }, [inView, value, delay, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Skills() {
  const skills = [
    { name: "Network Security", level: 95 },
    { name: "Penetration Testing", level: 90 },
    { name: "Python", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "Kali Linux", level: 98 },
    { name: "Secure Coding", level: 88 },
  ];

  return (
    <section id="skills" className="relative z-20 bg-transparent py-32 px-8 md:px-24 w-full">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#00D1FF] uppercase mb-4">Core Capabilities</h2>
        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-24 drop-shadow-[0_0_15px_rgba(0,209,255,0.3)]">
          Strategic Technical Expertise
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, type: "spring", stiffness: 60 }}
              whileHover={{ scale: 1.05, translateY: -10 }}
              className="group relative p-8 rounded-3xl bg-[#121212]/80 border border-white/5 overflow-hidden backdrop-blur-3xl hover:border-[#00D1FF]/60 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(0,209,255,0.2)] flex flex-col items-center justify-center text-center transform-gpu cursor-crosshair"
            >
              {/* Cyber Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Live Scanning Laser Line */}
              <motion.div 
                animate={{ top: ["-10%", "110%", "-10%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-[#00D1FF] opacity-0 group-hover:opacity-50 blur-[2px] shadow-[0_0_15px_#00D1FF]"
              />

              {/* Animated HUD radial meter background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Circular Neon Progress & Rotating Elements */}
              <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
                
                {/* Inner Rotating HUD Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border border-dashed border-white/10 group-hover:border-[#00D1FF]/40 transition-colors duration-500"
                />

                {/* Outer Rotating HUD Ring (Reverse) */}
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-10px] rounded-full border border-dotted border-white/5 group-hover:border-[#00D1FF]/20 transition-colors duration-500"
                />

                {/* Background Track */}
                <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                  
                  {/* Glowing Animated Progress Ring */}
                  <motion.circle 
                    cx="50" cy="50" r="42" 
                    stroke="#00D1FF" 
                    strokeWidth="6" 
                    fill="none" 
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0, 263.89" }}
                    whileInView={{ strokeDasharray: `${(skill.level / 100) * 263.89}, 263.89` }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 + idx * 0.1 }}
                    className="drop-shadow-[0_0_10px_#00D1FF] group-hover:drop-shadow-[0_0_20px_#00D1FF] transition-all duration-500"
                  />
                </svg>

                {/* Floating percentage inside with live counter */}
                <div className="absolute inset-0 flex items-center justify-center flex-col z-20">
                  <span className="text-3xl font-black text-white group-hover:text-[#00D1FF] transition-colors tracking-tighter">
                    <AnimatedCounter value={skill.level} delay={0.2 + idx * 0.1} />
                  </span>
                  <span className="text-[10px] text-white/50 tracking-[0.3em] uppercase mt-1 font-bold group-hover:text-[#00D1FF]/70 transition-colors">
                    SYS
                  </span>
                </div>
              </div>

              <h4 className="text-xl font-bold tracking-widest text-white uppercase mb-4 relative z-10 text-shadow-sm">
                {skill.name}
              </h4>
              
              {/* Expanding Underline Effect */}
              <div className="w-12 h-1 bg-[#00D1FF]/30 group-hover:bg-[#00D1FF] group-hover:w-24 group-hover:shadow-[0_0_15px_#00D1FF] transition-all duration-500 rounded-full relative z-10" />
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
