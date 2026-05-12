"use client";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY, scrollYProgress } = useScroll();

  // Hide navbar when scrolling up, show when scrolling down or at the very bottom
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const progress = scrollYProgress.get();

    // Always show if at the very bottom of the page
    if (progress > 0.98) {
      setHidden(false);
      return;
    }

    // Hide if scrolling up, show if scrolling down
    if (latest < previous && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: 100, opacity: 0 }
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed bottom-6 left-0 z-50 flex justify-center w-full pointer-events-none"
    >
      <div className="flex items-center pointer-events-auto bg-[#121212]/50 backdrop-blur-xl border border-white/5 rounded-full px-2 md:px-4 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        
        {/* Navigation Links */}
        <nav className="flex items-center gap-1 relative">
          {links.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-3 md:px-5 py-2 text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/40 hover:text-[#00D1FF] uppercase transition-colors duration-300 z-10"
            >
              {link.name}
              
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="min-nav-hover"
                    className="absolute inset-0 bg-[#00D1FF]/10 rounded-full -z-10 border border-[#00D1FF]/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </AnimatePresence>
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
