"use client";
import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";

const FRAME_COUNT = 192;
const currentFrame = (index: number) =>
  `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.041s.webp`;

// Detect mobile once at module level
const isMobileDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );
  const loadedCountRef = useRef(0);
  const rafPendingRef = useRef(false);
  const currentFrameIdxRef = useRef(0);
  const pausedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
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

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

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

  // Progressive image loading: load frame 0 immediately, then batch load rest
  useEffect(() => {
    const mobile = isMobileDevice();

    const loadImage = (i: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        // On mobile, set decoding to async for better performance
        img.decoding = mobile ? "async" : "auto";
        img.onload = () => {
          imagesRef.current[i] = img;
          loadedCountRef.current++;
          // Draw frame 0 as soon as it's ready
          if (i === 0) {
            scheduleDrawFrame(0);
          }
          resolve();
        };
        img.onerror = () => resolve(); // don't block on failed loads
        img.src = currentFrame(i);
      });
    };

    // Load frame 0 first for immediate display
    loadImage(0).then(() => {
      // Then load remaining frames in batches of 12 to avoid network saturation
      const BATCH = mobile ? 8 : 12;
      const queue = Array.from({ length: FRAME_COUNT - 1 }, (_, i) => i + 1);

      const loadBatch = async () => {
        while (queue.length > 0) {
          const batch = queue.splice(0, BATCH);
          await Promise.all(batch.map(loadImage));
        }
      };

      // Start loading but don't await — let it happen in background
      loadBatch();
    });

    // Page Visibility API: pause RAF draws when tab hidden
    const onVisibilityChange = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.min(Math.floor(latest), FRAME_COUNT - 1);
    // Only schedule a draw if we have the frame ready
    if (imagesRef.current[idx]) {
      scheduleDrawFrame(idx);
    }
  });

  useEffect(() => {
    const mobile = isMobileDevice();
    // On mobile: cap canvas resolution to device width (not full DPR)
    const MAX_MOBILE_WIDTH = 768;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let w = window.innerWidth;
      let h = window.innerHeight;

      if (mobile && w > MAX_MOBILE_WIDTH) {
        const ratio = h / w;
        w = MAX_MOBILE_WIDTH;
        h = Math.round(w * ratio);
      }

      canvas.width = w;
      canvas.height = h;

      // Redraw current frame at new size
      scheduleDrawFrame(currentFrameIdxRef.current);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0F0B08]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", willChange: "contents" }}
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>
    </div>
  );
}
