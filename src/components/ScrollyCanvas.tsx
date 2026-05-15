"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 192;

// Must use exact path format requested: /sequence/frame_0001.webp style 
// Note: The user's actual files are named frame_000_delay-0.041s.webp
const currentFrame = (index: number) =>
  `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.041s.webp`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use containerRef which is now a standard relative block element.
  // This guarantees Framer Motion tracks its scroll accurately.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const drawFrame = (index: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // To prevent "frozen frame" issue if a user scrolls faster than images load,
    // we find the closest loaded frame.
    let imgToDraw: HTMLImageElement | null = null;
    for (let i = index; i >= 0; i--) {
      const img = imagesRef.current[i];
      if (img && img.complete && img.width > 0) {
        imgToDraw = img;
        break;
      }
    }

    if (!imgToDraw) return;

    // CSS object-fit: cover implementation
    canvas.width = imgToDraw.width || 1920;
    canvas.height = imgToDraw.height || 1080;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgToDraw, 0, 0);
  };

  useEffect(() => {
    let firstFrameDrawn = false;

    // Progressive background preloading
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        
        // Ensure first image renders only after fully loaded
        if (i === 0 && !firstFrameDrawn) {
          firstFrameDrawn = true;
          drawFrame(0);
          setIsLoaded(true); 
        } else {
          // If we scroll past images that are still loading,
          // instantly draw them the moment they finish loading 
          // if they are the target frame.
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
    // requestAnimationFrame optimizes performance for smooth cinematic scrubbing
    requestAnimationFrame(() => {
      drawFrame(Math.floor(latest));
    });
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full z-0 bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>
    </div>
  );
}
