"use client";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { CardSwap, Card } from "./CardSwap";
import AnimatedHeading from "./AnimatedHeading";

/* ─── Animated counter for radial skill meters ─── */
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

/* ─── Data ─── */
const skills = [
  { name: "Network Security", level: 95 },
  { name: "Penetration Testing", level: 90 },
  { name: "Python", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "Kali Linux", level: 98 },
  { name: "Secure Coding", level: 88 },
];

const showcaseCards = [
  {
    title: "Offensive Security",
    description: "Advanced penetration testing, red team operations, and vulnerability assessment across enterprise environments.",
    gradient: "from-[#FF7A18]/20 via-[#C44536]/10 to-transparent",
    icon: "🛡️",
  },
  {
    title: "AI & Intelligent Systems",
    description: "Building AI-driven platforms for civic engagement, threat detection, and intelligent automation workflows.",
    gradient: "from-[#FFB347]/20 via-[#FF7A18]/10 to-transparent",
    icon: "🤖",
  },
  {
    title: "Full-Stack Engineering",
    description: "Next.js, React, TypeScript — crafting immersive web experiences with modern frameworks and cinematic design.",
    gradient: "from-[#FFD6A5]/15 via-[#FFB347]/10 to-transparent",
    icon: "⚡",
  },
  {
    title: "Blue Team Defense",
    description: "Security monitoring, incident response, SIEM management, and building resilient cyber defense architectures.",
    gradient: "from-[#C44536]/20 via-[#FF7A18]/10 to-transparent",
    icon: "🔒",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative z-20 bg-transparent py-32 px-8 md:px-24 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold tracking-[0.3em] text-[#FF7A18] uppercase mb-4"
        >
          Core Capabilities
        </motion.h2>
        <AnimatedHeading 
          text="Strategic Technical Expertise"
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-24 drop-shadow-[0_0_15px_rgba(255,122,24,0.15)]"
        />

        {/* ─── TOP ROW: CardSwap Showcase + Description ─── */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
          {/* CardSwap — Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="relative flex items-center justify-center"
            style={{ minWidth: 380, minHeight: 320 }}
          >
            {/* Ambient glow behind the cards */}
            <div className="absolute inset-0 bg-[#FF7A18]/[0.04] blur-[100px] rounded-full pointer-events-none" />

            <CardSwap
              width={360}
              height={280}
              cardDistance={35}
              verticalDistance={35}
              delay={4500}
              pauseOnHover={true}
              skewAmount={4}
              easing="elastic"
            >
              {showcaseCards.map((card, idx) => (
                <Card key={idx} className="p-0 overflow-hidden group/card cursor-default">
                  <div className="relative h-full w-full flex flex-col">
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-between h-full p-8">
                      <div>
                        <span className="text-4xl mb-4 block">{card.icon}</span>
                        <h4 className="text-xl font-bold text-white mb-3 tracking-tight">
                          {card.title}
                        </h4>
                        <p className="text-sm text-white/60 font-light leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      {/* Bottom accent line */}
                      <div className="mt-6 flex items-center gap-3">
                        <div className="h-[2px] flex-1 bg-gradient-to-r from-[#FF7A18]/40 to-transparent rounded-full" />
                        <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-medium">
                          0{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </motion.div>

          {/* Right Side — Description */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
            className="flex-1 max-w-xl"
          >
            <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6 leading-tight">
              Expertise across <br />
              <span className="text-[#FF7A18]">offense & defense.</span>
            </h4>
            <p className="text-white/55 text-lg font-light leading-relaxed mb-8">
              From penetration testing and vulnerability research to building AI-powered platforms and
              immersive web experiences — I bring a full-spectrum approach to digital security and engineering.
            </p>
            <div className="flex flex-wrap gap-3">
              {["CEH", "OSCP Path", "Python", "TypeScript", "React", "Kali Linux", "Wireshark", "Burp Suite"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wider text-white/50 border border-white/[0.06] bg-white/[0.02] hover:border-[#FF7A18]/30 hover:text-[#FFD6A5]/70 transition-all duration-500 cursor-default"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* ─── BOTTOM ROW: Radial Progress Grid ─── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, type: "spring", stiffness: 80 }}
              className="group flex flex-col items-center text-center cursor-default"
            >
              {/* Compact radial meter */}
              <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-4px] rounded-full border border-dotted border-white/[0.04] group-hover:border-[#FF7A18]/20 transition-colors duration-500"
                />
                <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.04)" strokeWidth="4" fill="none" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#FF7A18"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0, 263.89" }}
                    whileInView={{ strokeDasharray: `${(skill.level / 100) * 263.89}, 263.89` }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.1 + idx * 0.08 }}
                    className="drop-shadow-[0_0_6px_rgba(255,122,24,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(255,122,24,0.6)] transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <span className="text-lg font-black text-white/90 group-hover:text-[#FFB347] transition-colors tracking-tighter">
                    <AnimatedCounter value={skill.level} delay={0.1 + idx * 0.08} />
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium tracking-wider text-white/40 uppercase group-hover:text-white/60 transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
