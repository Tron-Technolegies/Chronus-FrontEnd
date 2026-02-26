import { useState, useCallback } from "react";
import { useCart } from "../context/CartContext";

/**
 * Thin wrapper around CartContext.addToCart that exposes a loading flag.
 * Use this in product cards / detail pages for per-button loading state.
 */
export function useAddToCart() {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = useCallback(
    async (product, qty = 1) => {
      setLoading(true);
      try {
        await addToCart(product, qty);
      } finally {
        setLoading(false);
      }
    },
    [addToCart],
  );

  return { handleAddToCart, loading };
}
