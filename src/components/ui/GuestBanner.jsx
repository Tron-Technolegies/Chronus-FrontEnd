import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

const BANNER_KEY = "guest_banner_dismissed";

/**
 * A dismissible banner shown to non-logged-in users (guests).
 * Matches the brand palette: #3D1613 background, #FFCA0A accent.
 * Auto-hidden for logged-in users or if previously dismissed in this session.
 */
export default function GuestBanner() {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !sessionStorage.getItem(BANNER_KEY)) {
      setVisible(true);
    }
  }, [isLoggedIn]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(BANNER_KEY, "1");
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] w-[calc(100%-2rem)] max-w-lg"
      style={{ animation: "slideUpBanner 0.4s ease" }}
    >
      <div
        className="flex items-center justify-between gap-4 px-5 py-3.5 rounded-lg shadow-2xl border"
        style={{
          backgroundColor: "#3D1613",
          borderColor: "rgba(203,166,31,0.4)",
        }}
      >
        {/* Icon */}
        <div
          className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-base"
          style={{ backgroundColor: "#FFCA0A" }}
        >
          👤
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs sm:text-sm font-medium leading-snug">
            You&apos;re browsing as a{" "}
            <span style={{ color: "#FFCA0A" }}>Guest</span>
          </p>
          <p className="text-white/60 text-[11px] mt-0.5">
            Login to sync your cart &amp; wishlist across devices.
          </p>
        </div>

        {/* Login CTA */}
        <button
          onClick={() => { dismiss(); navigate("/login"); }}
          className="shrink-0 text-[11px] font-semibold tracking-widest px-4 py-2 rounded-sm transition-colors"
          style={{ backgroundColor: "#FFCA0A", color: "#1a1a1a" }}
        >
          LOGIN
        </button>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          className="shrink-0 text-white/40 hover:text-white transition-colors p-1"
          aria-label="Dismiss"
        >
          <FiX size={16} />
        </button>
      </div>

      <style>{`
        @keyframes slideUpBanner {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
