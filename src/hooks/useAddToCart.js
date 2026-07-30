import { useState, useCallback } from "react";
import { useCart } from "./useCart";

export function useAddToCart() {
  const { addToCart, setOpen } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = useCallback(
    async (product, qty = 1) => {
      setLoading(true);
      try {
        const success = await addToCart(product, qty);
        if (success && setOpen) {
          setOpen(true);
        }
        return success;
      } finally {
        setLoading(false);
      }
    },
    [addToCart, setOpen],
  );

  return { handleAddToCart, loading };
}
