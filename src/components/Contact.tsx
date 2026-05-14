"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import { HyperSpeedLoader } from "./HyperSpeedLoader";
import { LightBeamButton } from "./LightBeamButton";

/* ─── Deterministic particle generation (avoids hydration mismatch) ─── */
function generateParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const seed = i * 137.508;
    particles.push({
      width: ((seed * 7) % 4) + 1,
      height: ((seed * 11) % 4) + 1,
      top: (seed * 13) % 100,
      left: (seed * 17) % 100,
      duration: ((seed * 19) % 10) + 5,
      delay: (seed * 23) % 5,
    });
  }
  return particles;
}

/* ─── Logo / Tech Ticker Data ─── */
const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Kali Linux",
  "Wireshark",
  "Burp Suite",
  "Docker",
  "TailwindCSS",
  "Framer Motion",
  "Three.js",
  "Node.js",
  "PostgreSQL",
  "Git",
  "AWS",
  "Nmap",
  "Metasploit",
  "Linux",
];

/* ─── Ticker Row Component ─── */
function TickerRow({ items, direction = "left", speed = 30 }: { items: string[]; direction?: "left" | "right"; speed?: number }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  const totalWidth = items.length * 160; // approximate width per item
  const duration = totalWidth / speed;

  return (
    <div className="relative overflow-hidden w-full group/ticker">
      {/* Gradient edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0F0B08] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0F0B08] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 w-max"
        animate={{
          x: direction === "left" ? [0, -totalWidth] : [-totalWidth, 0],
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{ willChange: "transform" }}
        // Pause on hover via CSS
      >
        {doubled.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm shrink-0 hover:border-[#FF7A18]/30 hover:bg-[#FF7A18]/[0.04] transition-all duration-500 cursor-default group/item"
          >
            {/* Dot indicator */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A18]/40 group-hover/item:bg-[#FF7A18] group-hover/item:shadow-[0_0_6px_rgba(255,122,24,0.5)] transition-all duration-300" />
            <span className="text-xs font-medium tracking-wider text-white/40 group-hover/item:text-white/70 transition-colors whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const particles = useMemo(() => generateParticles(12), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-20 bg-transparent py-32 px-8 md:px-24 w-full min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF7A18] opacity-[0.04] blur-[250px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C44536] opacity-[0.03] blur-[150px] pointer-events-none rounded-full animate-pulse" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FFD6A5] mix-blend-screen"
            style={{
              width: p.width + "px",
              height: p.height + "px",
              top: p.top + "%",
              left: p.left + "%",
            }}
            animate={{ y: [0, -80, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <AnimatedHeading 
            text="Establish Connection"
            highlightWord="Connection"
            highlightClass="font-bold text-[#FF7A18]"
            className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6 drop-shadow-[0_0_20px_rgba(255,122,24,0.15)] justify-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="text-xl text-white/50 max-w-2xl mx-auto font-light"
          >
            Let&apos;s create meaningful digital experiences together.
          </motion.p>
        </div>

        {/* ─── Tech Stack Ticker ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 flex flex-col gap-4"
        >
          <TickerRow items={techStack.slice(0, 9)} direction="left" speed={25} />
          <TickerRow items={techStack.slice(9)} direction="right" speed={20} />
        </motion.div>

        {/* Glassmorphism Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
          className="relative rounded-[2rem] bg-[#16110D]/50 border border-white/[0.06] backdrop-blur-3xl shadow-[0_30px_100px_rgba(15,11,8,0.8),0_0_40px_rgba(255,122,24,0.04)] group hover:shadow-[0_30px_100px_rgba(15,11,8,0.8),0_0_60px_rgba(255,122,24,0.08)] transition-all duration-700 p-8 md:p-12 overflow-hidden"
        >
          {/* Ambient Inner Glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF7A18]/8 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#C44536]/6 blur-[120px] rounded-full pointer-events-none" />

          <AnimatePresence>
            {isSubmitting && <HyperSpeedLoader />}
          </AnimatePresence>

          <form className="flex flex-col gap-8 relative z-10" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 group/input relative">
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#FF7A18] to-transparent group-focus-within/input:w-full transition-all duration-700 ease-out" />
                <label className="block text-sm font-medium tracking-wide text-white/60 mb-3">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0F0B08]/50 border border-white/[0.06] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#FF7A18]/30 focus:bg-[#FF7A18]/[0.02] transition-all placeholder:text-white/20 font-light"
                  placeholder="Your name..."
                />
              </div>

              <div className="flex-1 group/input relative">
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#FF7A18] to-transparent group-focus-within/input:w-full transition-all duration-700 ease-out" />
                <label className="block text-sm font-medium tracking-wide text-white/60 mb-3">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0F0B08]/50 border border-white/[0.06] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#FF7A18]/30 focus:bg-[#FF7A18]/[0.02] transition-all placeholder:text-white/20 font-light"
                  placeholder="Your email..."
                />
              </div>
            </div>

            <div className="group/input relative">
              <div className="absolute bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-[#FF7A18] to-transparent group-focus-within/input:w-full transition-all duration-700 ease-out" />
              <label className="block text-sm font-medium tracking-wide text-white/60 mb-3">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full bg-[#0F0B08]/50 border border-white/[0.06] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#FF7A18]/30 focus:bg-[#FF7A18]/[0.02] transition-all resize-none placeholder:text-white/20 font-light"
                placeholder="What's on your mind?"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-6">
              <div className="flex-1">
                {status === "success" && (
                  <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#FFD6A5] text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FF7A18] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,122,24,0.6)]" /> Message delivered successfully.
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#C44536] text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#C44536] rounded-full animate-pulse" /> Failed to send. Please try again.
                  </motion.span>
                )}
              </div>

              <LightBeamButton
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto uppercase tracking-widest"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </LightBeamButton>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
