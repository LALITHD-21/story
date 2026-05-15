"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import { useRef } from "react";
import AnimatedHeading from "./AnimatedHeading";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  const missionFontWeight = useTransform(scrollYProgress, [0, 1], [300, 800]);

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
            className="absolute inset-[-20px] rounded-full border border-dashed border-[#FF7A18]/40"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] rounded-full border border-dotted border-[#FFD6A5]/30"
          />
          {/* Glow Pulse */}
          <div className="absolute inset-0 rounded-full bg-[#FF7A18]/10 blur-[50px] group-hover:bg-[#FF7A18]/20 transition-all duration-700" />
          
          {/* Holographic Border / Image Container */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-full h-full rounded-full border border-white/10 overflow-hidden backdrop-blur-2xl bg-[#0F0B08]/80 shadow-[0_0_30px_rgba(255,122,24,0.2)] flex items-center justify-center p-2"
          >
            <div className="w-full h-full rounded-full bg-[#16110D] border border-white/5 flex items-center justify-center overflow-hidden relative">
               <div className="absolute inset-0 bg-[#FF7A18]/10 mix-blend-overlay z-10 pointer-events-none" />
               <img src="/profile.jpg" alt="LALITH D" className="w-full h-full object-cover object-center relative z-0" />
            </div>
          </motion.div>

          {/* Removed Floating Particles */}
        </motion.div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col items-start relative z-10">
          <AnimatedHeading 
            text="Engineering immersive digital experiences."
            className="text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,122,24,0.2)] mb-4 max-w-lg"
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 mb-10 text-white/60 text-sm font-medium tracking-widest uppercase mt-6"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF7A18]" />
              <AnimatedHeading as="span" text="Tumakuru, Karnataka, India" />
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#FF7A18]" />
              <AnimatedHeading as="span" text="Tumkur University" />
            </div>
          </motion.div>

          <AnimatedHeading 
            as="p"
            text="I’m LALITH D — a creative developer and cyber security enthusiast passionate about crafting immersive digital experiences that merge cinematic design, high-performance engineering, and secure modern technology. I specialize in building visually striking, interactive systems that not only look exceptional but also deliver seamless functionality, speed, and reliability. With a strong focus on innovation and refined user experience, I transform ideas into futuristic digital products that leave a lasting impact."
            className="text-white/90 text-xl md:text-2xl font-semibold leading-relaxed mb-8 max-w-3xl tracking-tight"
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-[#4ADE80]/5 border border-[#4ADE80]/20 backdrop-blur-md relative overflow-hidden group cursor-default shadow-[0_0_30px_rgba(74,222,128,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <motion.p 
              style={{ fontWeight: missionFontWeight }}
              className="text-[#4ADE80] text-lg relative z-10 tracking-[0.2em] uppercase"
            >
              Transforming bold ideas into secure, immersive, and high-performance digital realities
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
