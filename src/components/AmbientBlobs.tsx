"use client";
import { motion } from "framer-motion";

export default function AmbientBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-50">
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00D1FF] rounded-full blur-[200px] opacity-20"
      />
      <motion.div
        animate={{
          x: [0, -150, 150, 0],
          y: [0, 150, -150, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#7EE7FF] rounded-full blur-[180px] opacity-10"
      />
    </div>
  );
}
