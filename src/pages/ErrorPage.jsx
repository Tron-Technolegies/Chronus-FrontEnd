import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 text-center"
      style={{ background: "linear-gradient(160deg, #0e0404 60%, #2a0808 100%)" }}
    >
      <div
        className="absolute rounded-full pointer-events-none animate-pulse"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,202,10,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Decorative top line */}
      {/* <div className="flex items-center gap-3 mb-10">
        <div className="h-px w-12 bg-[#FFCA0A]/30" />
        <span className="text-[#FFCA0A]/50 text-[10px] tracking-[0.4em] uppercase">Chronus</span>
        <div className="h-px w-12 bg-[#FFCA0A]/30" />
      </div> */}

      {/* 404 */}
      <div className="relative select-none mb-4">
        <h1
          className="text-[140px] sm:text-[200px] leading-none font-[Bastoni] text-transparent  bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(135deg, #FFCA0A 30%, #CBA61F 60%, #f5d060 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
          }}
        >
          404
        </h1>
      </div>

      {/* Divider */}
      {/* <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 max-w-[60px] bg-white/10" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#FFCA0A]/60" />
        <div className="h-px flex-1 max-w-[60px] bg-white/10" />
      </div> */}

      {/* Message */}
      <p className="text-white/40 text-[16px] tracking-[0.35em] uppercase mb-3">
        Page Not Found
      </p>
      <p className="text-white/60 text-sm sm:text-base max-w-md leading-relaxed mb-10">
        The page you're looking for may have been moved, renamed, or simply
        doesn't exist in our collection.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-[#FFCA0A] text-black text-xs tracking-[0.2em] px-8 py-3.5 font-semibold hover:bg-[#e6b600] transition-colors"
        >
          BACK TO HOME
        </button>
        <button
          onClick={() => navigate("/shop")}
          className="border border-white/20 text-white/70 text-xs tracking-[0.2em] px-8 py-3.5 hover:bg-white/5 hover:border-white/40 transition-all"
        >
          EXPLORE SHOP
        </button>
      </div>

      {/* Bottom watermark text
      <p className="absolute bottom-8 text-[10px] tracking-[0.3em] text-white/15 uppercase select-none">
        © 2026 Chronus — Curated Excellence
      </p> */}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
