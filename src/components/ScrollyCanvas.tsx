"use client";
import { useEffect, useRef, useState } from "react";
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
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          drawFrame(0, loadedImages);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawFrame = (index: number, imgs: HTMLImageElement[]) => {
    if (!canvasRef.current || !imgs[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgs[index];
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

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length > 0) {
      // Use requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
        drawFrame(Math.floor(latest), images);
      });
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        if (images.length > 0) {
          drawFrame(Math.floor(frameIndex.get()), images);
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#240000]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>
    </div>
  );
}
