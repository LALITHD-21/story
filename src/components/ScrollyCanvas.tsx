"use client";
import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 192;
const currentFrame = (index: number) =>
  `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.041s.webp`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Use a ref instead of state to store images. This avoids 192 state updates 
  // while still allowing the scroll event to access the loaded images instantly.
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const drawFrame = (index: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get the image from our ref array
    const img = imagesRef.current[index];
    // If the image isn't loaded yet, just return (keep the previous frame on canvas)
    if (!img || !img.complete || img.width === 0) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    let firstFrameDrawn = false;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        
        // As soon as the FIRST frame loads, draw it immediately!
        // This completely eliminates the 3-5 second waiting period.
        if (i === 0 && !firstFrameDrawn) {
          firstFrameDrawn = true;
          drawFrame(0);
        }
      };
    }
  }, []);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(() => {
      drawFrame(Math.floor(latest));
    });
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame on resize to prevent stretching
        drawFrame(Math.floor(frameIndex.get()));
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, [frameIndex]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0F0B08]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>
    </div>
  );
}
