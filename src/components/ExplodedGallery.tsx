"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Star, GitFork } from "lucide-react";
import { LightBeamButton } from "./LightBeamButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ExplodedItem {
  name: string;
  desc: string;
  language: string;
  color: string;
  updated: string;
  stars: number;
  url?: string;
}

export interface ExplodedGalleryProps {
  items: ExplodedItem[];
}

export default function ExplodedGallery({ items }: ExplodedGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinRef.current || cardsRef.current.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
        }
      });

      let mm = gsap.matchMedia();

      // Desktop Animation
      mm.add("(min-width: 1024px)", () => {
        // Step 1: Explode outwards
        const explodePositions = [
          { x: "-35vw", y: "-25vh", r: -15 },
          { x: "35vw", y: "-15vh", r: 12 },
          { x: "-25vw", y: "30vh", r: -8 },
          { x: "30vw", y: "25vh", r: 18 },
          { x: "0vw", y: "-5vh", r: 0, scale: 1.1 },
          { x: "0vw", y: "35vh", r: 5, scale: 0.9 },
        ];

        tl.to(cardsRef.current, {
          x: (i) => explodePositions[i]?.x || "0vw",
          y: (i) => explodePositions[i]?.y || "0vh",
          rotation: (i) => explodePositions[i]?.r || 0,
          scale: (i) => explodePositions[i]?.scale || 0.8,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        })
        // Pause in exploded state
        .to(cardsRef.current, { duration: 0.5 })
        // Step 2: Fly back together into a fanned/grid layout
        .to(cardsRef.current, {
          x: (i) => {
            // Layout: 3 on top, 3 on bottom
            if (i < 3) return `${(i - 1) * 350}px`;
            return `${(i - 4) * 350}px`;
          },
          y: (i) => {
            if (i < 3) return "-180px";
            return "220px";
          },
          rotation: 0,
          scale: 1,
          duration: 1.5,
          ease: "back.inOut(1.2)"
        });
      });

      // Tablet / Small Desktop Animation
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const explodePositions = [
          { x: "-30vw", y: "-20vh", r: -15 },
          { x: "30vw", y: "-10vh", r: 12 },
          { x: "-20vw", y: "25vh", r: -8 },
          { x: "25vw", y: "20vh", r: 18 },
          { x: "0vw", y: "0vh", r: 0, scale: 1.1 },
          { x: "0vw", y: "30vh", r: 5, scale: 0.9 },
        ];

        tl.to(cardsRef.current, {
          x: (i) => explodePositions[i]?.x || "0vw",
          y: (i) => explodePositions[i]?.y || "0vh",
          rotation: (i) => explodePositions[i]?.r || 0,
          scale: (i) => explodePositions[i]?.scale || 0.8,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        })
        .to(cardsRef.current, { duration: 0.5 })
        .to(cardsRef.current, {
          x: (i) => {
            if (i < 2) return `${(i - 0.5) * 320}px`;
            if (i < 4) return `${(i - 2.5) * 320}px`;
            return `${(i - 4.5) * 320}px`;
          },
          y: (i) => {
            if (i < 2) return "-250px";
            if (i < 4) return "0px";
            return "250px";
          },
          rotation: 0,
          scale: 0.9,
          duration: 1.5,
          ease: "back.inOut(1.2)"
        });
      });

      // Mobile Animation
      mm.add("(max-width: 767px)", () => {
        const explodePositions = [
          { x: "-15vw", y: "-35vh", r: -10 },
          { x: "15vw", y: "-15vh", r: 10 },
          { x: "-15vw", y: "15vh", r: -5 },
          { x: "15vw", y: "35vh", r: 12 },
          { x: "0vw", y: "0vh", r: 0, scale: 1.05 },
          { x: "0vw", y: "25vh", r: 5, scale: 0.95 },
        ];

        tl.to(cardsRef.current, {
          x: (i) => explodePositions[i]?.x || "0vw",
          y: (i) => explodePositions[i]?.y || "0vh",
          rotation: (i) => explodePositions[i]?.r || 0,
          scale: (i) => explodePositions[i]?.scale || 0.8,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        })
        .to(cardsRef.current, { duration: 0.5 })
        .to(cardsRef.current, {
          x: 0,
          y: (i) => `${(i - 2.5) * 160}px`, // Stack vertically but overlap
          rotation: (i) => (i % 2 === 0 ? 2 : -2),
          scale: 0.85,
          duration: 1.5,
          ease: "back.inOut(1.2)"
        });
      });

    });

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* This element is pinned and acts as the viewport for the animation */}
      <div 
        ref={pinRef} 
        className="w-full h-screen flex items-center justify-center overflow-hidden perspective-[1000px]"
      >
        <div className="relative w-full max-w-sm h-[400px] flex items-center justify-center">
          
          {/* Initial stacked placeholder pulse (optional) */}
          <div className="absolute inset-0 bg-[#FF7A18]/5 rounded-3xl blur-3xl animate-pulse -z-10" />

          {items.map((repo, idx) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="absolute w-[300px] md:w-[320px] h-auto min-h-[360px] p-8 rounded-[2rem] bg-[#16110D]/90 border border-white/[0.08] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(255,122,24,0.05)] flex flex-col justify-between"
              style={{ 
                zIndex: 50 - idx, // ensure proper initial stacking
                // start slightly stacked with offsets
                transform: `translate(${idx * 2}px, ${idx * 2}px) rotate(${idx * 1.5}deg)`,
                opacity: 0.95
              }}
            >
              {/* Card Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    {repo.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full border border-white/20 text-[10px] font-medium text-white/60">
                    Public
                  </span>
                </div>
                
                <p className="text-white/60 leading-relaxed text-sm font-light mb-6">
                  {repo.desc}
                </p>
              </div>

              <div className="mt-auto border-t border-white/5 pt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.color} shadow-[0_0_8px_${repo.color}]`} />
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-[#C44536] transition-colors">
                    <Star className="w-3.5 h-3.5" /> {repo.stars}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/40">{repo.updated}</span>
                  <LightBeamButton 
                    className="px-4 py-1.5 text-xs group/btn"
                    onClick={() => repo.url && window.open(repo.url, "_blank")}
                  >
                    <GitFork className="w-3.5 h-3.5 group-hover/btn:text-[#FF7A18] transition-colors" /> 
                    <span className="group-hover/btn:text-[#FF7A18] transition-colors">Source</span>
                  </LightBeamButton>
                </div>
              </div>

              {/* Ambient Glow */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FF7A18]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
