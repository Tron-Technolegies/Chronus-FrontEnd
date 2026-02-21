import { allProducts } from "../../utils/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { FiShield, FiTruck, FiRefreshCw, FiAward } from "react-icons/fi";

export default function YouMayAlsoLike({ currentProduct }) {
  const products = allProducts
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 3);
  const features = [
    {
      icon: FiShield,
      title: "AUTHENTICITY GUARANTEED",
      description: "Every piece verified by our experts",
    },
    {
      icon: FiTruck,
      title: "WHITE GLOVE DELIVERY",
      description: "Complimentary worldwide shipping",
    },
    {
      icon: FiRefreshCw,
      title: "30-DAY RETURNS",
      description: "No questions asked returns",
    },
    {
      icon: FiAward,
      title: "WARRANTY",
      description: "Coverage on all timepieces",
    },
  ];
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl tracking-widest font-[Bastoni]">You May Also Like</h2>

        <Link to="/shop" className="text-sm flex items-center gap-2">
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index}>
              <Icon className="mx-auto text-2xl text-gray-800 mb-4" />
              <h4 className="text-xs font-semibold tracking-wide text-gray-900 mb-1 bayon-regular">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 inter">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
