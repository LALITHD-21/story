"use client";
import { useEffect, useRef } from "react";
import { useTransform, useMotionValueEvent, useSpring, MotionValue } from "framer-motion";

const FRAME_COUNT = 192;
const currentFrame = (index: number) =>
  `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.041s.webp`;

// Detect mobile once at module level
const isMobileDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

interface ScrollyCanvasProps {
  scrollProgress: MotionValue<number>;
}

export default function ScrollyCanvas({ scrollProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );
  const rafPendingRef = useRef(false);
  const currentFrameIdxRef = useRef(0);
  const pausedRef = useRef(false);

  // Smooth the incoming scroll progress for cinematic feel
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 120,
    damping: 40,
    restDelta: 0.0001
  });

  const frameIndex = useTransform(
    smoothProgress,
    [0, 1],
    [0, FRAME_COUNT - 1]
  );

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

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

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const scheduleDrawFrame = (index: number) => {
    currentFrameIdxRef.current = index;
    if (rafPendingRef.current || pausedRef.current) return;
    rafPendingRef.current = true;
    requestAnimationFrame(() => {
      rafPendingRef.current = false;
      if (!pausedRef.current) {
        drawFrame(currentFrameIdxRef.current);
      }
    });
  };

  // Progressive image loading
  useEffect(() => {
    const mobile = isMobileDevice();

    const loadImage = (i: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          imagesRef.current[i] = img;
          if (i === 0) {
            scheduleDrawFrame(0);
          }
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load frame ${i}`);
          resolve();
        };
        img.src = currentFrame(i);
      });
    };

    // Load first frame immediately
    loadImage(0).then(() => {
      const BATCH = mobile ? 8 : 15;
      const queue = Array.from({ length: FRAME_COUNT - 1 }, (_, i) => i + 1);
      const loadBatch = async () => {
        while (queue.length > 0) {
          const batch = queue.splice(0, BATCH);
          await Promise.all(batch.map(loadImage));
        }
      };
      loadBatch();
    });

    const onVisibilityChange = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.min(Math.floor(latest), FRAME_COUNT - 1);
    if (imagesRef.current[idx]) {
      scheduleDrawFrame(idx);
    }
  });

  useEffect(() => {
    const mobile = isMobileDevice();
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      scheduleDrawFrame(currentFrameIdxRef.current);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0F0B08]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", willChange: "transform" }}
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>
    </div>
  );
}
