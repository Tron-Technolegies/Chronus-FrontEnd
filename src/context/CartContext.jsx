import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }

      return [...prev, { ...product, qty: 1 }];
    });

    setOpen(true);
    setToast("Added to cart");
    setTimeout(() => setToast(""), 2000);
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        const newQty = type === "inc" ? p.qty + 1 : p.qty - 1;
        return { ...p, qty: Math.max(1, newQty) };
      }),
    );
  };

  const subtotal = cart.reduce((sum, p) => {
    const price = Number(p.price.replace(/[^0-9]/g, ""));
    return sum + price * p.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, updateQty, subtotal, open, setOpen, toast }}
    >
      {children}
    </CartContext.Provider>
  );
};
