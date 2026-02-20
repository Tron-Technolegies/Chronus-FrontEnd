import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { cart, subtotal } = useCart();

  return (
    <div className="max-w-4xl mx-auto pt-10 space-y-6">
      <h1 className="text-2xl ">Checkout</h1>

      {cart.map((p) => (
        <div key={p.id} className="flex justify-between border-b py-4">
          <span>
            {p.name} × {p.qty}
          </span>
          <span>{p.price}</span>
        </div>
      ))}

      <div className="flex justify-between text-xl">
        <span>Total</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>

      <button className="bg-[#F5C518] w-full py-4">Place Order</button>
    </div>
  );
}
