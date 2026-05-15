"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useScroll } from "framer-motion";

import Navbar from "@/components/Navbar";
import NoiseLayer from "@/components/NoiseLayer";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Heavy WebGL/Canvas components — loaded client-side only
const ScrollyCanvas = dynamic(() => import("@/components/ScrollyCanvas"), { ssr: false });
const Overlay = dynamic(() => import("@/components/Overlay"), { ssr: false });
const AmbientBlobs = dynamic(() => import("@/components/AmbientBlobs"), { ssr: false });
const GhostCursor = dynamic(
  () => import("@/components/GhostCursor").then((m) => m.default ?? m),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  const cinematicContainerRef = useRef<HTMLDivElement>(null);
  
  // Single source of truth for the cinematic scroll progress
  const { scrollYProgress } = useScroll({
    target: cinematicContainerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="relative bg-[#0F0B08] min-h-screen text-white font-sans selection:bg-[#FF7A18]/30">
      <NoiseLayer />
      <AmbientBlobs />
      <Navbar />

      {/* Ghost cursor — desktop only */}
      <GhostCursor
        color="#FF7A18"
        brightness={1.1}
        trailLength={18}
        inertia={0.45}
        grainIntensity={0.04}
        bloomStrength={0.4}
        bloomRadius={0.6}
        bloomThreshold={0}
        fadeDelayMs={300}
        fadeDurationMs={1200}
        edgeIntensity={0}
        zIndex={5}
      />

      {/* 800vh Cinematic Scroll Area */}
      <div ref={cinematicContainerRef} className="relative h-[800vh] w-full">
        <ScrollyCanvas scrollProgress={scrollYProgress} />
        <Overlay scrollProgress={scrollYProgress} />
      </div>

      {/* Additional sections */}
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
