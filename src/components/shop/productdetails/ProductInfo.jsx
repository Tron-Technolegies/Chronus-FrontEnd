import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoShieldOutline } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiLoopLeftFill } from "react-icons/ri";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { useProductSizePricing } from "../../../hooks/useProductSizePricing";

export default function ProductInfo({ product, productSelection }) {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const { handleAddToCart, loading: cartLoading } = useAddToCart();
  const fallbackSelection = useProductSizePricing(product);

  const {
    selectedSize,
    setSelectedSize,
    selectedColorId,
    setSelectedColorId,
    selectedFrameId,
    setSelectedFrameId,
    selectedMaterialId,
    setSelectedMaterialId,
    sizeOptions,
    colorOptions,
    frameOptions,
    materialOptions,
    hasSizeOptions,
    hasColorOptions,
    hasFrameOptions,
    hasMaterialOptions,
    activeSizeOption,
    activeColorOption,
    activeFrameOption,
    activeMaterialOption,
    displayPrice,
    productForCart,
  } = productSelection ?? fallbackSelection;

  const parsedStock = Number(product?.stock);
  const maxQty = Number.isFinite(parsedStock) && parsedStock > 0 ? parsedStock : 99;

  const increase = () => setQty((prev) => (prev < maxQty ? prev + 1 : prev));
  const decrease = () => setQty((prev) => (prev > 1 ? prev - 1 : prev));

  const handleQtyInput = (event) => {
    const raw = Number.parseInt(event.target.value, 10);
    if (Number.isNaN(raw)) {
      setQty(1);
      return;
    }
    setQty(Math.min(maxQty, Math.max(1, raw)));
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {product.originalPrice && (
        <span className="inline-block text-[10px] sm:text-xs bg-red-500 text-white px-3 py-1 tracking-widest">
          SALE
        </span>
      )}
      <h1 className="text-base sm:text-xl tracking-widest font-[Bayon]">{product.name}</h1>
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 flex-wrap">
        {product.rating > 0 ? (
          <>
            <div className="flex text-[#CBA61F]">
              {[1, 2, 3, 4, 5].map((index) => (
                <span key={index}>{index <= Math.round(product.rating) ? "★" : "☆"}</span>
              ))}
            </div>

            <span>
              {product.rating.toFixed(1)} ({product.reviewsCount} review
              {product.reviewsCount !== 1 ? "s" : ""})
            </span>
          </>
        ) : (
          <span className="text-gray-300 text-xs">No reviews yet</span>
        )}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xl sm:text-3xl font-semibold">{displayPrice}</span>

        {product.originalPrice && (
          <span className="line-through text-gray-400 text-sm sm:text-lg">
            {product.originalPrice}
          </span>
        )}
      </div>
      <p className="text-gray-500 leading-6 max-w-md text-sm">{product.shortDesc}</p>
      {hasSizeOptions && (
        <div className="space-y-2">
          <p className="text-xs tracking-[0.15em] text-gray-500 uppercase">Size</p>

          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((option) => {
              const active = option.size === (activeSizeOption?.size ?? selectedSize);

              return (
                <button
                  key={option.size}
                  type="button"
                  onClick={() => setSelectedSize(option.size)}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    active
                      ? "border-[#CBA61F] bg-[#CBA61F]/10 text-[#3D1613]"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {option.size}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {hasColorOptions && (
        <div className="space-y-2">
          <p className="text-xs tracking-[0.15em] text-gray-500 uppercase">Color</p>

          <div className="flex flex-wrap gap-2">
            {colorOptions.map((option) => {
              const active = option.id === (activeColorOption?.id ?? selectedColorId);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedColorId(option.id)}
                  className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
                    active
                      ? "border-[#CBA61F] bg-[#CBA61F]/10 text-[#3D1613]"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {option.image ? (
                    <img
                      src={option.image}
                      alt={option.name}
                      className="w-8 h-8 object-cover border border-gray-200 bg-white"
                    />
                  ) : (
                    <span className="w-3 h-3 rounded-full bg-gray-300 border border-gray-200" />
                  )}
                  {option.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {hasFrameOptions && (
        <div className="space-y-2">
          <p className="text-xs tracking-[0.15em] text-gray-500 uppercase">Frame</p>

          <div className="flex flex-wrap gap-2">
            {frameOptions.map((option) => {
              const active = option.id === (activeFrameOption?.id ?? selectedFrameId);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedFrameId(option.id)}
                  className={`px-3 py-2 text-xs border transition-colors text-left ${
                    active
                      ? "border-[#CBA61F] bg-[#CBA61F]/10 text-[#3D1613]"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <span className="block">{option.name}</span>
                  {option._rawExtraPrice > 0 && (
                    <span className="block text-[11px] text-gray-500">+{option.extraPrice}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {hasMaterialOptions && (
        <div className="space-y-2">
          <p className="text-xs tracking-[0.15em] text-gray-500 uppercase">Material</p>

          <div className="flex flex-wrap gap-2">
            {materialOptions.map((option) => {
              const active = option.id === (activeMaterialOption?.id ?? selectedMaterialId);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedMaterialId(option.id)}
                  className={`px-3 py-2 text-xs border transition-colors text-left max-w-[220px] ${
                    active
                      ? "border-[#CBA61F] bg-[#CBA61F]/10 text-[#3D1613]"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <span className="block">{option.name}</span>
                  {option.description && (
                    <span className="block text-[11px] text-gray-500 mt-0.5 line-clamp-2">
                      {option.description}
                    </span>
                  )}
                  {option._rawExtraPrice > 0 && (
                    <span className="block text-[11px] text-gray-500 mt-0.5">
                      +{option.extraPrice}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
        <div className="flex border border-gray-300 w-fit">
          <button type="button" onClick={decrease} className="px-3 sm:px-4 py-2 hover:bg-gray-50">
            -
          </button>

          <input
            type="number"
            min={1}
            max={maxQty}
            value={qty}
            onChange={handleQtyInput}
            className="w-12 sm:w-14 text-center outline-none"
          />

          <button type="button" onClick={increase} className="px-3 sm:px-4 py-2 hover:bg-gray-50">
            +
          </button>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={async () => {
              await handleAddToCart(productForCart, qty);
              navigate("/checkout");
            }}
            disabled={cartLoading}
            className="bg-[#F5C518] hover:brightness-95 px-6 sm:px-16 lg:px-24 py-3 text-xs sm:text-sm tracking-wide w-full disabled:opacity-60"
          >
            BUY NOW
          </button>

          <button
            type="button"
            onClick={() => handleAddToCart(productForCart, qty)}
            disabled={cartLoading}
            className="bg-gray-50 p-3 border border-gray-200 shrink-0 disabled:opacity-50"
          >
            {cartLoading ? (
              <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin block" />
            ) : (
              <LuShoppingBag size={18} />
            )}
          </button>
        </div>
      </div>
      <div className="border-t border-[#D9D9D9] pt-6 sm:pt-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <IoShieldOutline className="w-5 h-5" />
            <p className="text-[9px] sm:text-xs tracking-widest">AUTHENTICITY GUARANTEED</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <MdOutlineLocalShipping className="w-5 h-5" />
            <p className="text-[9px] sm:text-xs tracking-widest">FREE SHIPPING</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <RiLoopLeftFill className="w-5 h-5" />
            <p className="text-[9px] sm:text-xs tracking-widest">30-DAY RETURNS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
