"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import NoiseLayer from "@/components/NoiseLayer";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Heavy WebGL/Canvas components — loaded client-side only
const ScrollSequence = dynamic(() => import("@/components/ScrollSequence"), { ssr: false });
const Overlay = dynamic(() => import("@/components/Overlay"), { ssr: false });
const AmbientBlobs = dynamic(() => import("@/components/AmbientBlobs"), { ssr: false });
const ParallaxStars = dynamic(() => import("@/components/ParallaxStars"), { ssr: false });

export default function Home() {
  return (
    <main className="relative bg-[#0F0B08] min-h-screen text-white font-sans selection:bg-[#FF7A18]/30">
      <ParallaxStars className="fixed inset-0 z-0" />
      <NoiseLayer />
      <AmbientBlobs />
      <Navbar />


      {/* 800vh Cinematic Scroll Area — increased from 500vh for slower, smoother animation */}
      <div className="relative h-[800vh] w-full">
        <ScrollSequence />
        <Overlay />
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
