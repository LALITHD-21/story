"use client";

// Pure CSS animation — GPU composited (transform/opacity only), zero JS overhead
export default function AmbientBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-50">
      <div
        className="ambient-blob-1 absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#FF7A18] rounded-full opacity-20"
        style={{ filter: "blur(120px)", willChange: "transform" }}
      />
      <div
        className="ambient-blob-2 absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#C44536] rounded-full opacity-10"
        style={{ filter: "blur(100px)", willChange: "transform" }}
      />
      <style>{`
        @keyframes blob1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(80px, -80px) scale(1.15); }
          66%  { transform: translate(-70px, 70px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes blob2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(-100px, 100px) scale(0.85); }
          66%  { transform: translate(100px, -100px) scale(1.1); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .ambient-blob-1 { animation: blob1 20s ease-in-out infinite; }
        .ambient-blob-2 { animation: blob2 25s ease-in-out infinite; }
        @media (max-width: 768px) {
          .ambient-blob-1 { width: 280px; height: 280px; }
          .ambient-blob-2 { width: 220px; height: 220px; }
        }
      `}</style>
    </div>
  );
}
