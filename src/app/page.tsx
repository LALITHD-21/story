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

export default function Home() {
  return (
    <main className="bg-[#240000] min-h-screen text-white font-sans selection:bg-[#00D1FF]/30">
      <NoiseLayer />
      <AmbientBlobs />
      <Navbar />
      
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
