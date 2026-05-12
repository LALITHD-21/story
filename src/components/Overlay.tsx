"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Strict Parallax & Scroll Mapping

  // Section 1: Intro (0% scroll peak) - Center
  const op1 = useTransform(scrollYProgress, [0, 0.15, 0.20], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.20], [0, -150]); // Moves slightly faster/slower than scroll

  // Section 2: About (30% scroll peak) - Left Aligned
  const op2 = useTransform(scrollYProgress, [0.22, 0.28, 0.38, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.45], [150, -150]);

  // Section 3: Philosophy (60% scroll peak) - Right Aligned
  const op3 = useTransform(scrollYProgress, [0.50, 0.58, 0.68, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.50, 0.75], [150, -150]);

  // Section 4: Exit (80% - 100%)
  const op4 = useTransform(scrollYProgress, [0.80, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const scale4 = useTransform(scrollYProgress, [0.80, 1], [0.8, 1.2]);

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
      
      {/* Glow tracking cursor */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-[#00D1FF] rounded-full blur-[150px] opacity-10 pointer-events-none mix-blend-screen"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 200, mass: 0.5 }}
      />

      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none overflow-hidden">
        
        {/* SECTION 1 - Center Aligned */}
        <motion.div 
          style={{ opacity: op1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 pt-[20vh] text-center pointer-events-none"
        >
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl mb-4">
            LALITH D
          </h1>
          <h2 className="text-xl md:text-3xl font-medium tracking-widest text-[#00D1FF] uppercase mb-6">
            Creative Developer • Cyber Security
          </h2>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-xl mx-auto mb-10">
            Architecting resilient digital infrastructures.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto">
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-[#00D1FF]/20 hover:border-[#00D1FF] hover:shadow-[0_0_20px_rgba(0,209,255,0.35)] transition-all duration-300 backdrop-blur-md">
              View Operations
            </button>
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
              Initiate Contact
            </button>
          </div>
        </motion.div>

        {/* SECTION 2 - Left Aligned */}
        <motion.div 
          style={{ opacity: op2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center p-8 md:pl-[10%] lg:pl-[15%] w-full pointer-events-none"
        >
          <div className="max-w-2xl xl:max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 drop-shadow-2xl">
              Cybersecurity. <br /> <span className="text-[#00D1FF]">Intelligence.</span>
            </h2>
            <p className="text-xl md:text-3xl text-white/70 font-light leading-relaxed">
              Securing the digital frontier with strategic defense and intelligent architecture.
            </p>
          </div>
        </motion.div>

        {/* SECTION 3 - Right Aligned */}
        <motion.div 
          style={{ opacity: op3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center p-8 md:pr-[10%] lg:pr-[15%] w-full text-right pointer-events-none"
        >
          <div className="max-w-2xl xl:max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 drop-shadow-2xl">
              Bridging design <br /> and <span className="text-[#00D1FF]">engineering.</span>
            </h2>
            <p className="text-xl md:text-3xl text-white/70 font-light leading-relaxed">
              Combining analytical rigor with creative innovation to craft secure, high-performance systems and immersive digital experiences.
            </p>
          </div>
        </motion.div>

        {/* SECTION 4 - Exit Center */}
        <motion.div 
          style={{ opacity: op4, scale: scale4 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-[#240000] via-[#240000]/80 to-transparent pointer-events-none"
        >
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(0,209,255,0.5)]">
            ENTER THE <br /> DIGITAL FRONTIER
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
