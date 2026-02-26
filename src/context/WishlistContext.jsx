import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toggleWishlistAPI } from "../api/wishlist";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

const LS_KEY = "wishlist";

const loadLocalWishlist = () => {
  try {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(loadLocalWishlist);
  const [wishlistToast, setWishlistToast] = useState("");

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const showWishlistToast = (msg) => {
    setWishlistToast(msg);
    setTimeout(() => setWishlistToast(""), 2500);
  };

  const toggleWishlist = useCallback(async (product) => {
    const isIn = wishlist.some((p) => p.id === product.id);

    // Optimistic update
    setWishlist((prev) =>
      isIn
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product],
    );

    showWishlistToast(
      isIn ? "Removed from wishlist" : "Added to wishlist",
    );

    // API call (best-effort)
    try {
      await toggleWishlistAPI(product.id);
    } catch (err) {
      console.warn("Wishlist API failed:", err?.message);
      // Roll back optimistic update on failure
      setWishlist((prev) =>
        isIn
          ? [...prev, product]
          : prev.filter((p) => p.id !== product.id),
      );
    }
  }, [wishlist]);

  const isWishlisted = useCallback(
    (id) => wishlist.some((p) => p.id === id),
    [wishlist],
  );

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted, removeFromWishlist, wishlistToast }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
