import { useCallback, useEffect, useMemo, useState } from "react";
import { addToCartAPI, fetchCartAPI, removeCartItemAPI } from "../api/cart";
import { useGuestId } from "./useGuestId";

const formatMoney = (value) => `$${Number(value ?? 0).toLocaleString()}`;

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  const cleaned = String(price).replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
};

const normaliseCartItems = (payload) => {
  const items = Array.isArray(payload?.items) ? payload.items : [];
  return items.map((item) => ({
    id: item.product_id ?? item.id,
    cartItemId: item.id ?? null,
    productId: item.product_id ?? item.id,
    name: item.product ?? item.product_name ?? item.name ?? "",
    price: formatMoney(item.price ?? 0),
    _rawPrice: Number(item.price ?? 0),
    images: [item.image].filter(Boolean),
    selectedSize: item.size ?? null,
    selectedFrame: item.frame ?? null,
    selectedMaterial: item.material ?? null,
    qty: Number(item.quantity ?? item.qty ?? 1) || 1,
    lineTotal: Number(item.total ?? 0),
  }));
};

export function useCartState() {
  useGuestId();

  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchCartAPI();
      setCart(normaliseCartItems(res.data));
    } catch (err) {
      setError(err?.response?.data?.error ?? err?.message ?? "Failed to load cart.");
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(
    async (product, qty = 1) => {
      const safeQty = Math.max(1, Number.parseInt(qty, 10) || 1);
      try {
        setLoading(true);
        setError(null);
        await addToCartAPI(product.id, safeQty, {
          sizeId: product.selectedSizeId,
          frameId: product.selectedFrameId,
          materialId: product.selectedMaterialId,
        });
        await fetchCart();
        showToast(product.name ?? "Item");
      } catch (err) {
        setError(err?.response?.data?.error ?? err?.message ?? "Failed to add item.");
      } finally {
        setLoading(false);
      }
    },
    [fetchCart, showToast],
  );

  const removeItem = useCallback(
    async (productId) => {
      try {
        setLoading(true);
        setError(null);
        await removeCartItemAPI(productId);
        await fetchCart();
      } catch (err) {
        setError(err?.response?.data?.error ?? err?.message ?? "Failed to remove item.");
      } finally {
        setLoading(false);
      }
    },
    [fetchCart],
  );

  const updateQty = useCallback(
    async (productId, type) => {
      const current = cart.find((item) => String(item.id) === String(productId));
      if (!current) return;

      const nextQty = type === "inc" ? current.qty + 1 : current.qty - 1;

      try {
        setLoading(true);
        setError(null);

        if (type === "inc") {
          await addToCartAPI(productId, 1);
        } else {
          // Prefer a single remove call for decrement. If backend remove endpoint
          // deletes only one unit, this is sufficient and avoids an add request.
          await removeCartItemAPI(productId);

          if (nextQty > 0) {
            const refreshed = await fetchCartAPI();
            const refreshedItems = normaliseCartItems(refreshed.data);
            const updatedItem = refreshedItems.find(
              (item) => String(item.id) === String(productId),
            );

            const decrementedByOne = updatedItem && updatedItem.qty === nextQty;
            if (!decrementedByOne) {
              // Fallback for backends where remove deletes the whole line item.
              for (let i = 0; i < nextQty; i += 1) {
                await addToCartAPI(productId, 1);
              }
            }
          }
        }

        await fetchCart();
      } catch (err) {
        setError(err?.response?.data?.error ?? err?.message ?? "Failed to update quantity.");
      } finally {
        setLoading(false);
      }
    },
    [cart, fetchCart],
  );

  const clearCart = useCallback(async () => {
    if (cart.length === 0) return;
    try {
      setLoading(true);
      setError(null);
      await Promise.all(cart.map((item) => removeCartItemAPI(item.id)));
      await fetchCart();
    } catch (err) {
      setError(err?.response?.data?.error ?? err?.message ?? "Failed to clear cart.");
    } finally {
      setLoading(false);
    }
  }, [cart, fetchCart]);

  const syncCartOnLogin = useCallback(async () => {
    await fetchCart();
  }, [fetchCart]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0),
    [cart],
  );
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  return {
    cart,
    addToCart,
    removeItem,
    updateQty,
    clearCart,
    syncCartOnLogin,
    fetchCart,
    subtotal,
    cartCount,
    toast,
    loading,
    error,
  };
}
