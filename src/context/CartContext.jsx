import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { addToCartAPI, clearCartAPI, fetchCartAPI, removeCartItemAPI } from "../api/cart";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// ─── helpers ──────────────────────────────────────────────────────────────────
const LS_KEY = "cart";

const loadLocalCart = () => {
  try {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveLocalCart = (cart) => {
  localStorage.setItem(LS_KEY, JSON.stringify(cart));
};

/** Parse price regardless of whether it's "₹1,299" or 1299 */
const parsePrice = (price) => {
  if (typeof price === "number") return price;
  const cleaned = String(price).replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadLocalCart);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Prevents fetchCart from re-loading items right after clearCart
  const justCleared = useRef(false);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    saveLocalCart(cart);
  }, [cart]);

  // ── toast helper ────────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ── fetch cart from server ───────────────────────────────────────────────────
  const fetchCart = useCallback(async () => {
    // Skip re-fetch if we just cleared (avoids cart reappearing from the server)
    if (justCleared.current) {
      justCleared.current = false;
      return;
    }
    try {
      setLoading(true);
      const res = await fetchCartAPI();
      // Backend may return { items: [...] } or just an array
      const items = res.data?.items ?? res.data ?? [];
      const normalised = items.map((item) => ({
        id: item.product_id ?? item.id,
        name: item.product_name ?? item.name,
        price: item.price,
        images: item.images ?? [item.image],
        qty: item.quantity ?? item.qty ?? 1,
      }));
      setCart(normalised);
    } catch (err) {
      // Silently fall back to localStorage cart — already loaded
      console.warn("Cart fetch failed, using local cart:", err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ── addToCart ────────────────────────────────────────────────────────────────
  const addToCart = useCallback(
    async (product, qty = 1) => {
      // Optimistic update
      setCart((prev) => {
        const exists = prev.find((p) => p.id === product.id);
        if (exists) {
          return prev.map((p) =>
            p.id === product.id ? { ...p, qty: p.qty + qty } : p,
          );
        }
        return [...prev, { ...product, qty }];
      });

      setOpen(true);
      showToast(product.name ?? "Item");

      // API call (best-effort — failures don't break UI)
      try {
        await addToCartAPI(product.id, qty);
      } catch (err) {
        console.warn("Add to cart API failed:", err?.message);
      }
    },
    [],
  );

  // ── removeItem ───────────────────────────────────────────────────────────────
  const removeItem = useCallback((id) => {
    // Optimistic local removal
    setCart((prev) => prev.filter((p) => p.id !== id));
    // Sync with server (best-effort — local state is already updated)
    removeCartItemAPI(id).catch((err) =>
      console.warn("Remove cart item API failed:", err?.message)
    );
  }, []);

  // ── updateQty ────────────────────────────────────────────────────────────────
  const updateQty = useCallback((id, type) => {
    setCart((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const newQty = type === "inc" ? p.qty + 1 : p.qty - 1;
        return { ...p, qty: Math.max(1, newQty) };
      }),
    );
  }, []);

  // ── clearCart ────────────────────────────────────────────────────────────────
  const clearCart = useCallback(async () => {
    // Clear local state & storage immediately
    setCart([]);
    localStorage.removeItem(LS_KEY);
    // Set flag so next fetchCart call (on re-mount) is skipped
    justCleared.current = true;
    // Also clear server-side cart (guest session) so it doesn't come back
    try {
      await clearCartAPI();
    } catch (err) {
      console.warn("Server cart clear failed:", err?.message);
    }
  }, []);

  // ── syncCartOnLogin ──────────────────────────────────────────────────────────
  /**
   * Called after a successful login.
   * Strategy: merge guest cart into server cart (add quantities), then re-fetch.
   * Rule: server cart wins on conflicts (items accumulate, never dropped).
   */
  const syncCartOnLogin = useCallback(async () => {
    const localCart = loadLocalCart();
    if (localCart.length > 0) {
      try {
        // Push every guest item to the server
        await Promise.all(
          localCart.map((item) => addToCartAPI(item.id, item.qty)),
        );
      } catch (err) {
        console.warn("Cart sync failed:", err?.message);
      }
    }
    // Now fetch the merged cart from the server
    await fetchCart();
    // Clear the guest localStorage cart key (server is now source of truth)
    localStorage.removeItem(LS_KEY);
  }, [fetchCart]);

  // ── subtotal ─────────────────────────────────────────────────────────────────
  const subtotal = cart.reduce((sum, p) => sum + parsePrice(p.price) * p.qty, 0);
  const cartCount = cart.reduce((sum, p) => sum + p.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        updateQty,
        clearCart,
        syncCartOnLogin,
        fetchCart,
        subtotal,
        cartCount,
        open,
        setOpen,
        toast,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
