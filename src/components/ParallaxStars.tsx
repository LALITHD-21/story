"use client";
import React, { useMemo } from 'react';

// Helper to generate random box shadows for the stars
const generateBoxShadows = (n: number) => {
  let value = `${Math.floor(Math.random() * 2500)}px ${Math.floor(Math.random() * 2500)}px #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 2500)}px ${Math.floor(Math.random() * 2500)}px #FFF`;
  }
  return value;
};

export function ParallaxStars({ className = "" }: { className?: string }) {
  // Memoize shadows so they don't regenerate on re-renders
  const shadowsSmall = useMemo(() => generateBoxShadows(700), []);
  const shadowsMedium = useMemo(() => generateBoxShadows(200), []);
  const shadowsBig = useMemo(() => generateBoxShadows(100), []);

  return (
    <div className={`pointer-events-none ${className}`}>
      <style>{`
        .bg-radial-space {
          background: radial-gradient(ellipse at bottom, #1C0F08 0%, #0F0B08 100%);
        }
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2500px); }
        }
      `}</style>

      {/* Background Gradient matching the portfolio's cyber-orange theme */}
      <div className="absolute inset-0 bg-radial-space opacity-50" />

      {/* Stars Layer 1 (Small) */}
      <div 
        className="absolute left-0 top-0 w-[1px] h-[1px] bg-transparent opacity-60 animate-[animStar_100s_linear_infinite]"
        style={{ boxShadow: shadowsSmall }}
      >
        <div 
          className="absolute top-[2500px] w-[1px] h-[1px] bg-transparent"
          style={{ boxShadow: shadowsSmall }}
        />
      </div>

      {/* Stars Layer 2 (Medium) */}
      <div 
        className="absolute left-0 top-0 w-[2px] h-[2px] bg-transparent opacity-80 animate-[animStar_150s_linear_infinite]"
        style={{ boxShadow: shadowsMedium }}
      >
        <div 
          className="absolute top-[2500px] w-[2px] h-[2px] bg-transparent"
          style={{ boxShadow: shadowsMedium }}
        />
      </div>

      {/* Stars Layer 3 (Big) */}
      <div 
        className="absolute left-0 top-0 w-[3px] h-[3px] bg-transparent animate-[animStar_200s_linear_infinite]"
        style={{ boxShadow: shadowsBig }}
      >
        <div 
          className="absolute top-[2500px] w-[3px] h-[3px] bg-transparent"
          style={{ boxShadow: shadowsBig }}
        />
      </div>
    </div>
  );
}

export default ParallaxStars;
