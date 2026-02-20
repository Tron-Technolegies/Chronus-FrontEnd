import { useCart } from "../../context/CartContext";

export default function CartToast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl z-50">
      {toast}
    </div>
  );
}
