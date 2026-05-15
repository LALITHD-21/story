"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const frameCount = 192; // Play all frames up to 191

  const currentFrame = (index: number) =>
    `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.041s.webp`;

  const imagesRef = useRef<HTMLImageElement[]>([]);

  const render = async (index: number) => {
    const img = imagesRef.current[index];
    const canvas = canvasRef.current;
    
    if (!canvas || !img) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // wait for decode
    if (!img.complete) {
      await img.decode().catch(() => {});
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // cover effect
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );

    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    context.drawImage(
      img,
      x,
      y,
      img.width * scale,
      img.height * scale
    );
  };

  useEffect(() => {
    // preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Push first so it's available in the array if onload fires synchronously
      imagesRef.current.push(img);
      // Attach onload before setting src to prevent cache race condition
      if (i === 0) {
        img.onload = () => render(0);
      }
      img.src = currentFrame(i);
    }
    
    // Explicit first frame render if already loaded
    if (imagesRef.current[0] && imagesRef.current[0].complete) {
      render(0);
    }
    
    // Setup resize handler
    const handleResize = () => render(0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use framer-motion perfectly aligned with Overlay.tsx
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(async () => {
      await render(Math.floor(latest));
    });
  });

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
