"use client";
import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

// ─── Config ──────────────────────────────────────────────────────────────────
const FRAME_COUNT = 192;
const FRAME_PATH = (i: number) =>
  `/sequence/frame_${String(i).padStart(3, "0")}_delay-0.041s.webp`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isMobile = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─── Component ───────────────────────────────────────────────────────────────
export default function ScrollyCanvas() {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const frames       = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const currentIdx   = useRef(0);
  const rafPending   = useRef(false);
  const paused       = useRef(false);

  // ── Scroll → frame index ───────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // ── Draw a single frame onto the canvas ───────────────────────────────────
  const draw = (idx: number) => {
    const canvas = canvasRef.current;
    const img    = frames.current[idx];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;

    // Cover: fill the canvas, crop edges (like object-fit: cover)
    let sw = cw, sh = ch, sx = 0, sy = 0;
    if (cr > ir) {
      // canvas is wider — match width, crop height
      sh = cw / ir;
      sy = (ch - sh) / 2;
    } else {
      // canvas is taller — match height, crop width
      sw = ch * ir;
      sx = (cw - sw) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh);
  };

  // ── Schedule a draw on the next animation frame ───────────────────────────
  const scheduleDraw = (idx: number) => {
    currentIdx.current = Math.max(0, Math.min(FRAME_COUNT - 1, idx));
    if (rafPending.current || paused.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      if (!paused.current) draw(currentIdx.current);
    });
  };

  // ── Listen to scroll → redraw ──────────────────────────────────────────────
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.floor(latest);
    if (frames.current[idx]) scheduleDraw(idx);
  });

  // ── Progressive image loading ──────────────────────────────────────────────
  useEffect(() => {
    const mobile = isMobile();
    const BATCH  = mobile ? 6 : 12;

    const loadOne = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          frames.current[i] = img;
          if (i === 0) scheduleDraw(0); // show first frame immediately
          resolve();
        };
        img.onerror = () => resolve(); // never block the queue
        img.src = FRAME_PATH(i);
      });

    // 1. Load frame 0 immediately so something is visible right away
    loadOne(0).then(() => {
      // 2. Load the rest in batches to avoid saturating the network
      const queue = Array.from({ length: FRAME_COUNT - 1 }, (_, k) => k + 1);
      const run = async () => {
        while (queue.length > 0) {
          await Promise.all(queue.splice(0, BATCH).map(loadOne));
        }
      };
      run(); // fire-and-forget
    });

    // Page Visibility: stop drawing while tab is in background
    const onVisibility = () => { paused.current = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Resize canvas to fill viewport ────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      scheduleDraw(currentIdx.current); // redraw at new size
    };
    window.addEventListener("resize", onResize, { passive: true });
    onResize(); // set initial size
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    /*
      containerRef drives the scroll progress.
      It must be absolute + cover its parent (the 800vh div in page.tsx).
    */
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0">
      {/* sticky wrapper — stays in view while the user scrolls through 800vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0F0B08]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "contents" }}
        />
        {/* subtle dark vignette over the canvas */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </div>
    </div>
  );
}
