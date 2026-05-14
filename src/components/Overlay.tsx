"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { LightBeamButton } from "./LightBeamButton";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: Hero Intro (0% scroll) - Center
  const op1 = useTransform(scrollYProgress, [0, 0.12, 0.20], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.20], [0, -120]);
  const blur1 = useTransform(scrollYProgress, [0.12, 0.20], [0, 12]);

  // Section 2: Statement (30% scroll) - Left Aligned
  const op2 = useTransform(scrollYProgress, [0.22, 0.30, 0.40, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.48], [120, -120]);
  const blur2In = useTransform(scrollYProgress, [0.22, 0.28], [8, 0]);
  const blur2Out = useTransform(scrollYProgress, [0.42, 0.48], [0, 8]);

  // Section 3: Philosophy (60% scroll) - Right Aligned
  const op3 = useTransform(scrollYProgress, [0.52, 0.60, 0.70, 0.76], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.52, 0.76], [120, -120]);
  const blur3In = useTransform(scrollYProgress, [0.52, 0.58], [8, 0]);
  const blur3Out = useTransform(scrollYProgress, [0.72, 0.76], [0, 8]);

  // Section 4: Closing (85% - 100%)
  const op4 = useTransform(scrollYProgress, [0.82, 0.88, 0.96, 1], [0, 1, 1, 0]);
  const scale4 = useTransform(scrollYProgress, [0.82, 1], [0.85, 1.1]);
  const blur4 = useTransform(scrollYProgress, [0.82, 0.88], [10, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none">
      
      {/* Warm glow tracking cursor */}
      <motion.div
        className="fixed top-0 left-0 w-80 h-80 bg-[#FF7A18] rounded-full blur-[140px] opacity-[0.07] pointer-events-none mix-blend-screen"
        animate={{
          x: mousePosition.x - 160,
          y: mousePosition.y - 160,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 150, mass: 0.5 }}
      />

      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none overflow-hidden">
        
        {/* SECTION 1 — Hero Center */}
        <motion.div 
          style={{ opacity: op1, y: y1, filter: useTransform(blur1, (v) => `blur(${v}px)`) }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none"
        >
          <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 drop-shadow-2xl mb-6 leading-[0.9]">
            LALITH D
          </h1>
          <h2 className="text-lg md:text-2xl font-medium tracking-[0.25em] text-[#FF7A18]/90 uppercase mb-8">
            Creative Developer • Cyber Security Professional
          </h2>
          <p className="text-base md:text-lg text-white/50 font-light max-w-lg mx-auto mb-12 leading-relaxed">
            Building immersive digital experiences with precision, creativity, and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pointer-events-auto">
            <LightBeamButton 
              onClick={() => { document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              View Projects
              <svg className="w-4 h-4 text-white/40 group-hover:text-[#FF7A18] group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </LightBeamButton>
            <LightBeamButton 
              onClick={() => { document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="bg-transparent border border-white/10 shadow-none hover:bg-white/[0.08] hover:shadow-none"
              gradientColors={["transparent", "transparent", "transparent"]}
            >
              <span className="text-white/80 group-hover:text-white transition-colors">Get In Touch</span>
            </LightBeamButton>
          </div>
        </motion.div>

        {/* SECTION 2 — Left Aligned */}
        <motion.div 
          style={{ 
            opacity: op2, 
            y: y2,
            filter: useTransform([blur2In, blur2Out], ([a, b]) => `blur(${Math.max(a as number, b as number)}px)`)
          }}
          className="absolute inset-0 flex flex-col items-start justify-center p-8 md:pl-[10%] lg:pl-[15%] w-full pointer-events-none"
        >
          <div className="max-w-2xl xl:max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 drop-shadow-2xl leading-[1.05]">
              I build <br /> <span className="text-[#FF7A18]">digital experiences.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
              Crafting immersive interfaces, secure systems, and visually refined experiences that blend creativity with technology.
            </p>
          </div>
        </motion.div>

        {/* SECTION 3 — Right Aligned */}
        <motion.div 
          style={{ 
            opacity: op3, 
            y: y3,
            filter: useTransform([blur3In, blur3Out], ([a, b]) => `blur(${Math.max(a as number, b as number)}px)`)
          }}
          className="absolute inset-0 flex flex-col items-end justify-center p-8 md:pr-[10%] lg:pr-[15%] w-full text-right pointer-events-none"
        >
          <div className="max-w-2xl xl:max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 drop-shadow-2xl leading-[1.05]">
              Bridging design <br /> and <span className="text-[#FF7A18]">engineering.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
              Combining analytical thinking with cinematic design to craft high-performance digital experiences.
            </p>
          </div>
        </motion.div>

        {/* SECTION 4 — Cinematic Exit */}
        <motion.div 
          style={{ 
            opacity: op4, 
            scale: scale4,
            filter: useTransform(blur4, (v) => `blur(${v}px)`)
          }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-[#0F0B08] via-[#0F0B08]/70 to-transparent pointer-events-none"
        >
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,122,24,0.3)] leading-[1.05]">
            EXPLORE <br /> <span className="text-[#FF7A18]">THE WORK</span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
