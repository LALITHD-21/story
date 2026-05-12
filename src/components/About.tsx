"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-10, 0]);

  return (
    <section id="about" ref={containerRef} className="relative z-20 bg-transparent py-32 px-8 md:px-24 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side: Profile Image with Holographic Ring & Scroll Animation */}
        <motion.div 
          style={{ scale: imageScale, opacity: imageOpacity, rotate: imageRotate }}
          className="relative w-72 h-72 md:w-96 md:h-96 shrink-0 group"
        >
          {/* Glowing rotating rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] rounded-full border border-dashed border-[#00D1FF]/40"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] rounded-full border border-dotted border-[#7EE7FF]/30"
          />
          {/* Glow Pulse */}
          <div className="absolute inset-0 rounded-full bg-[#00D1FF]/10 blur-[50px] group-hover:bg-[#00D1FF]/20 transition-all duration-700" />
          
          {/* Holographic Border / Image Container */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-full h-full rounded-full border border-white/10 overflow-hidden backdrop-blur-2xl bg-[#121212]/80 shadow-[0_0_30px_rgba(0,209,255,0.2)] flex items-center justify-center p-2"
          >
            <div className="w-full h-full rounded-full bg-[#0B0B0F] border border-white/5 flex items-center justify-center overflow-hidden relative">
               <div className="absolute inset-0 bg-[#00D1FF]/10 mix-blend-overlay z-10 pointer-events-none" />
               <img src="/profile.jpg" alt="LALITH D" className="w-full h-full object-cover object-center relative z-0" />
            </div>
          </motion.div>

          {/* Removed Floating Particles */}
        </motion.div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col items-start relative z-10">
          <motion.h2 
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,209,255,0.2)] mb-4"
          >
            LALITH D
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, type: "spring" }}
            className="text-lg md:text-xl font-medium tracking-wide text-[#00D1FF] leading-relaxed mb-8"
          >
            AI & AGI Engineer | Cybersecurity Enthusiast | AMD Slingshot Ideathon 2nd runner up <br className="hidden md:block" /> 
            CEH Aspirant | Blue Team Specialist | Penetration Tester
          </motion.h3>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 mb-10 text-white/60 text-sm font-medium tracking-widest uppercase"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#00D1FF]" />
              Tumakuru, Karnataka, India
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#00D1FF]" />
              Tumkur University
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-3xl"
          >
            I specialize in cybersecurity, AI-driven systems, and secure digital infrastructure engineering. My focus is on architecting resilient platforms, advanced threat defense mechanisms, and immersive digital experiences that merge innovation with operational precision.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-[#00D1FF]/5 border border-[#00D1FF]/20 backdrop-blur-md relative overflow-hidden group cursor-default shadow-[0_0_30px_rgba(0,209,255,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <p className="text-[#7EE7FF] text-lg font-medium italic relative z-10 tracking-wide">
              “Securing the future through intelligent systems and strategic cyber defense.”
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
