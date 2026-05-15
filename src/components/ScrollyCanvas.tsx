"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 192;
const currentFrame = (index: number) =>
  `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.041s.webp`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
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

    // Use pure CSS object-fit: cover by matching canvas resolution to image resolution.
    // This allows the browser to hardware-accelerate the scaling perfectly on mobile and desktop.
    canvas.width = img.width || 1920;
    canvas.height = img.height || 1080;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };

  useEffect(() => {
    let firstFrameDrawn = false;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        
        // Draw frame 0 immediately to prevent delay on load
        if (i === 0 && !firstFrameDrawn) {
          firstFrameDrawn = true;
          drawFrame(0);
          setIsLoaded(true); // Trigger the fade-in
        } else {
          // If the image that just loaded is the one we are currently trying to view, draw it!
          const currentIdx = Math.floor(frameIndex.get());
          if (i === currentIdx) {
            drawFrame(currentIdx);
          }
        }
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(() => {
      drawFrame(Math.floor(latest));
    });
  });

  // Notice: We don't need a window resize listener anymore! 
  // CSS object-fit: cover automatically handles fluid resizing.

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0F0B08]">
        <canvas 
          ref={canvasRef} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>
    </div>
  );
}
