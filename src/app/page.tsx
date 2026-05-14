import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import NoiseLayer from "@/components/NoiseLayer";
import AmbientBlobs from "@/components/AmbientBlobs";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GhostCursor from "@/components/GhostCursor";

export default function Home() {
  return (
    <main className="relative bg-[#0F0B08] min-h-screen text-white font-sans selection:bg-[#FF7A18]/30">
      <NoiseLayer />
      <AmbientBlobs />
      <Navbar />

      {/* Ghost cursor — smoky warm trail following the mouse */}
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

      {/* 500vh Cinematic Scroll Area */}
      <div className="relative h-[500vh] w-full">
        <ScrollyCanvas />
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
