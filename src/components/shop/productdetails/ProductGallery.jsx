import { useEffect, useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useWishlistToggle } from "../../../hooks/useWishlistToggle";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function ProductGallery({ product, images = [], colorImage = null }) {
  const { handleToggle, isWishlisted } = useWishlistToggle();
  const safeImages = useMemo(() => {
    const merged = [colorImage, ...images].filter(Boolean);
    const unique = [...new Set(merged)];
    return unique.length > 0 ? unique : [PLACEHOLDER];
  }, [colorImage, images]);

  const [active, setActive] = useState(safeImages[0]);

  useEffect(() => {
    setActive(safeImages[0]);
  }, [safeImages]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Image */}
      <div className="flex-1 border-2 border-[#D9D9D9] bg-[#f7f1e7] p-4 sm:p-6 lg:p-10 relative order-1 lg:order-2">
        <button
          className={`absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow transition cursor-pointer z-10 ${isWishlisted(product?.id) ? "border border-[#CBA61F]" : ""}`}
          onClick={() => handleToggle(product)}
        >
          <FaHeart size={24} className={`transition ${isWishlisted(product?.id) ? "text-[#CBA61F]" : "text-gray-300 hover:text-gray-400"}`} />
        </button>

        <img
          src={active ?? PLACEHOLDER}
          alt="Product"
          className="w-full h-[300px] sm:h-[380px] lg:h-[450px] object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex order-2 lg:order-1 lg:flex-col gap-4 overflow-x-auto lg:overflow-visible justify-center">
        {safeImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Product view ${i + 1}`}
            onClick={() => setActive(img)}
            className={`w-16 h-16 lg:w-20 lg:h-20 object-contain bg-[#f7f1e7] border cursor-pointer p-2 shrink-0
              ${active === img ? "border-[#CBA61F]" : "border-gray-200"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
