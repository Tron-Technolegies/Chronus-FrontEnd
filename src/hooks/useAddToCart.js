import { useState, useCallback } from "react";
import { useCart } from "../context/CartContext";

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
