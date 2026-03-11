import { createContext, useState } from "react";
import { useCartState } from "../hooks/useCartState";

const CartContext = createContext();
export default CartContext;

export const CartProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const cartState = useCartState();

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        open,
        setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
