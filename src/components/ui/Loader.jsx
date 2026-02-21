/**
 * Reusable Loader component
 *
 * Usage:
 *   <Loader />                     → fullscreen centered spinner
 *   <Loader size="sm" />           → small inline spinner (24px)
 *   <Loader size="md" />           → medium (40px, default)
 *   <Loader size="lg" />           → large (64px)
 *   <Loader fullScreen={false} />  → inline, no full-page overlay
 *   <Loader text="Loading..." />   → optional text below spinner
 */

const SIZES = {
  sm: { ring: "w-6 h-6 border-2", dot: "w-1.5 h-1.5" },
  md: { ring: "w-10 h-10 border-2", dot: "w-2 h-2" },
  lg: { ring: "w-16 h-16 border-[3px]", dot: "w-2.5 h-2.5" },
};

export default function Loader({ size = "md", fullScreen = true, text }) {
  const s = SIZES[size] ?? SIZES.md;

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      {/* Outer ring */}
      <div className="relative flex items-center justify-center">
        <div
          className={`${s.ring} rounded-full border-[#FFCA0A]/20 border-t-[#FFCA0A] animate-spin`}
        />
        {/* Inner gold dot */}
        <div
          className={`absolute ${s.dot} rounded-full bg-[#FFCA0A] animate-pulse`}
        />
      </div>

      {text && (
        <p className="text-[11px] tracking-[0.2em] text-white/50 uppercase animate-pulse select-none">
          {text}
        </p>
      )}
    </div>
  );

  if (!fullScreen) return spinner;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0e0404]/80 backdrop-blur-sm">
      {spinner}
      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  );
}
