import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

export default function GuestBanner() {
  const navigate = useNavigate();

  // Reactively check login status — re-evaluates on storage changes (e.g. after login)
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("accessToken")
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onStorage = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Also re-check on every render cycle (catches same-tab login)
  useEffect(() => {
    const interval = setInterval(() => {
      const loggedIn = !!localStorage.getItem("accessToken");
      setIsLoggedIn(loggedIn);
      if (loggedIn) setDismissed(false); // reset dismiss when they log out later
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Don't show if logged in or banner dismissed this session
  if (isLoggedIn || dismissed) return null;

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
          onClick={() => navigate("/login")}
          className="shrink-0 text-[11px] font-semibold tracking-widest px-4 py-2 rounded-sm transition-colors"
          style={{ backgroundColor: "#FFCA0A", color: "#1a1a1a" }}
        >
          LOGIN
        </button>

        {/* Dismiss for this session */}
        <button
          onClick={() => setDismissed(true)}
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
