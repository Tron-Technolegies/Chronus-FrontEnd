import { useState, useCallback } from "react";
import { useWishlist } from "../context/WishlistContext";

/**
 * Thin wrapper around WishlistContext.toggleWishlist that exposes a loading flag.
 */
export function useWishlistToggle() {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [loading, setLoading] = useState(false);

  const handleToggle = useCallback(
    async (product) => {
      setLoading(true);
      try {
        await toggleWishlist(product);
      } finally {
        setLoading(false);
      }
    },
    [toggleWishlist],
  );

  return { handleToggle, isWishlisted, loading };
}
