import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import axiosInstance from "./api/axios.js";

/** Ensure every visitor (guest or logged-in) has a guest_id session.
 *  This is the industry-standard approach: it powers guest cart, wishlist,
 *  and cart-merge on login. */
async function ensureGuestSession() {
  if (localStorage.getItem("guest_id")) return; // already exists

  try {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    if (isLoggedIn) return; // logged-in users don't need a guest_id

    const res = await axiosInstance.post("/guest/create/");
    if (res.data?.guest_id) {
      localStorage.setItem("guest_id", res.data.guest_id);
    }
  } catch (err) {
    // Silently fail — cart will fall back to localStorage
    console.warn("Could not create guest session:", err?.message);
  }
}

// Bootstrap guest session before rendering
ensureGuestSession().finally(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </StrictMode>,
  );
});
