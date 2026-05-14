"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface LightBeamButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  gradientColors?: [string, string, string]; // Optional custom gradient colors
  transparentBg?: boolean;
}

/**
 * LightBeamButton
 * 
 * A high-performance button with a rotating light beam border effect.
 * Uses CSS @property for smooth gradient rotation animations on the border.
 */
export function LightBeamButton({ 
  children, 
  className, 
  onClick,
  gradientColors = ["#FF7A18", "#C44536", "#FF7A18"], // Theme colors
  transparentBg = false,
  ...props 
}: LightBeamButtonProps) {
  // Construct the gradient string dynamically based on props
  const gradientString = `conic-gradient(from var(--gradient-angle), transparent 0%, ${gradientColors[0]} 40%, ${gradientColors[1]} 50%, transparent 60%, transparent 100%)`;

  return (
    <>
      <style>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes border-spin {
          from { --gradient-angle: 0deg; }
          to { --gradient-angle: 360deg; }
        }
        .animate-border-spin {
          animation: border-spin 2s linear infinite;
        }
      `}</style>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={cn(
          "group relative isolate overflow-hidden rounded-full px-8 py-3 text-sm font-medium text-white transition-all",
          transparentBg ? "bg-transparent hover:bg-white/5" : "bg-[#16110D] hover:bg-[#0F0B08]",
          "shadow-[0_0_20px_-5px_rgba(255,122,24,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,122,24,0.5)]",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        
        {/* Gradient Border Simulation using CSS Mask */}
        <div 
          className="absolute inset-0 -z-10 rounded-full animate-border-spin pointer-events-none" 
          style={{ 
            '--gradient-angle': '0deg',
            background: gradientString,
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          } as React.CSSProperties} 
        />
        
        {/* Shine Effect Overlay */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,122,24,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.button>
    </>
  );
}

export default LightBeamButton;
