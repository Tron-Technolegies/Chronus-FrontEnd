// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IoShieldOutline } from "react-icons/io5";
// import { LuShoppingBag } from "react-icons/lu";
// import { MdOutlineLocalShipping } from "react-icons/md";
// import { RiLoopLeftFill } from "react-icons/ri";
// import { useAddToCart } from "../../../hooks/useAddToCart";
// import { useProductSizePricing } from "../../../hooks/useProductSizePricing";
// import { useTranslation } from "react-i18next";
// import { formatMoney } from "../../../utils/currency";

// export default function ProductInfo({ product, productSelection }) {
//   const { t } = useTranslation();
//   const [qty, setQty] = useState(1);
//   const [stockMessage, setStockMessage] = useState("");
//   const navigate = useNavigate();

//   const { handleAddToCart, loading: cartLoading } = useAddToCart();
//   const fallbackSelection = useProductSizePricing(product);

//   const {
//     selectedSize,
//     setSelectedSize,
//     selectedColorId,
//     setSelectedColorId,
//     selectedFrameId,
//     setSelectedFrameId,
//     selectedMaterialId,
//     setSelectedMaterialId,
//     sizeOptions,
//     colorOptions,
//     frameOptions,
//     materialOptions,
//     hasSizeOptions,
//     hasColorOptions,
//     hasFrameOptions,
//     hasMaterialOptions,
//     hasVariantOptions,
//     activeSizeOption,
//     activeColorOption,
//     activeFrameOption,
//     activeMaterialOption,
//     activeVariantOption,
//     selectedVariantId,
//     setSelectedVariantId,
//     variantOptions,
//     displayPrice,
//     productForCart,
//     setSelectedVariantColor,
//     setSelectedVariantSize,
//     variantColorOptions,
//     variantSizeOptions,
//     availableSizesForColor,
//     hasVariantAttributes,
//     activeVariantColor,
//     activeVariantSize,
//     activeStock,
//   } = productSelection ?? fallbackSelection;

//   // Stock handling:
//   // - no stock info at all  -> keep old behaviour (max 99, purchasable)
//   // - stock is 0 or less    -> out of stock
//   // - otherwise             -> limit qty to available stock
//   const rawStock = activeStock ?? product?.stock;
//   const hasStockInfo = rawStock !== null && rawStock !== undefined && rawStock !== "";
//   const parsedStock = Number(rawStock);
//   const isOutOfStock = hasStockInfo && (!Number.isFinite(parsedStock) || parsedStock <= 0);
//   const maxQty = isOutOfStock ? 1 : hasStockInfo ? parsedStock : 99;

//   // Keep qty within the selected variant's stock
//   useEffect(() => {
//     setQty((prev) => Math.min(prev, maxQty));
//   }, [maxQty]);

//   // Clear stale stock message when the selected variant/stock changes
//   useEffect(() => {
//     setStockMessage("");
//   }, [activeStock]);

//   const increase = () => setQty((prev) => (prev < maxQty ? prev + 1 : prev));
//   const decrease = () => setQty((prev) => (prev > 1 ? prev - 1 : prev));

//   const handleQtyInput = (event) => {
//     const raw = Number.parseInt(event.target.value, 10);
//     if (Number.isNaN(raw)) {
//       setQty(1);
//       return;
//     }
//     setQty(Math.min(maxQty, Math.max(1, raw)));
//   };

//   // Shared stock guard for Buy Now and Add to Cart
//   const canPurchase = () => {
//     if (isOutOfStock) {
//       setStockMessage(t("shop.product_info.out_of_stock", "Out of Stock"));
//       return false;
//     }
//     if (hasStockInfo && qty > parsedStock) {
//       setStockMessage(`Only ${parsedStock} items available.`);
//       return false;
//     }
//     setStockMessage("");
//     return true;
//   };

//   const handleBuyNow = async () => {
//     if (!canPurchase()) return;
//     await handleAddToCart(productForCart, qty);
//     navigate("/checkout");
//   };

//   const handleAddOnly = async () => {
//     if (!canPurchase()) return;
//     await handleAddToCart(productForCart, qty);
//   };

//   return (
//     <div className="space-y-5 sm:space-y-6">
//       {product.originalPrice && (
//         <span className="inline-block text-[10px] sm:text-xs bg-red-500 text-white px-3 py-1 tracking-widest">
//           {t("shop.product_info.sale")}
//         </span>
//       )}
//       <h1 className="text-base sm:text-xl tracking-widest font-semibold font-[inter]">
//         {product.name}
//       </h1>
//       <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 flex-wrap">
//         {product.rating > 0 ? (
//           <>
//             <div className="flex text-[#CBA61F]">
//               {[1, 2, 3, 4, 5].map((index) => (
//                 <span key={index}>{index <= Math.round(product.rating) ? "★" : "☆"}</span>
//               ))}
//             </div>

//             <span>
//               {product.rating.toFixed(1)} ({product.reviewsCount}{" "}
//               {product.reviewsCount !== 1
//                 ? t("shop.product_info.reviews")
//                 : t("shop.product_info.review")}
//               )
//             </span>
//           </>
//         ) : (
//           <span className="text-gray-300 text-xs">{t("shop.product_info.no_reviews")}</span>
//         )}
//       </div>
//       <div className="flex items-center gap-3 flex-wrap">
//         <span className="text-xl sm:text-3xl font-semibold">
//           {formatMoney(productForCart._rawPrice * qty, product.currency)}
//         </span>

//         {product.originalPrice && (
//           <span className="line-through text-gray-400 text-sm sm:text-lg">
//             {formatMoney(
//               Number.parseFloat(String(product.originalPrice).replace(/[^0-9.]/g, "")) * qty,
//               product.currency,
//             )}
//           </span>
//         )}
//       </div>
//       <p className="text-gray-500 leading-6 max-w-md text-sm">{product.shortDesc}</p>

//       {hasMaterialOptions && (
//         <div className="space-y-2">
//           <p className="text-xs tracking-[0.15em] text-black  font-semibold">
//             {t("shop.product_info.material")}
//           </p>

//           <div className="flex flex-wrap gap-2">
//             {materialOptions.map((option) => {
//               const active = option.id === (activeMaterialOption?.id ?? selectedMaterialId);

//               return (
//                 <button
//                   key={option.id}
//                   type="button"
//                   onClick={() => setSelectedMaterialId(option.id)}
//                   className={`px-3 py-2 text-xs border transition-colors text-left max-w-[220px] ${
//                     active
//                       ? "border-[#000000]  text-black "
//                       : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                   }`}
//                 >
//                   <span className="block">{option.name}</span>
//                   {option.description && (
//                     <span className="block text-[11px] text-gray-500 mt-0.5 line-clamp-2">
//                       {option.description}
//                     </span>
//                   )}
//                   {option._rawExtraPrice > 0 && (
//                     <span className="block text-[11px] text-gray-500 mt-0.5">
//                       +{option.extraPrice}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {hasSizeOptions && (
//         <div className="space-y-2">
//           <p className="text-xs tracking-[0.15em] text-black font-medium ">
//             {t("shop.product_info.size")}
//           </p>

//           <div className="flex flex-wrap gap-2">
//             {sizeOptions.map((option) => {
//               const active = option.size === (activeSizeOption?.size ?? selectedSize);

//               return (
//                 <button
//                   key={option.size}
//                   type="button"
//                   onClick={() => setSelectedSize(option.size)}
//                   className={`px-3 py-1.5 text-xs border transition-colors ${
//                     active
//                       ? "border-[#000000]  text-black "
//                       : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                   }`}
//                 >
//                   {option.size}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {hasColorOptions && (
//         <div className="space-y-2">
//           <p className="text-xs tracking-[0.15em] text-black font-medium ">
//             {t("shop.product_info.color")}
//           </p>

//           <div className="flex flex-wrap gap-2">
//             {colorOptions.map((option) => {
//               const active = option.id === (activeColorOption?.id ?? selectedColorId);

//               return (
//                 <button
//                   key={option.id}
//                   type="button"
//                   onClick={() => setSelectedColorId(option.id)}
//                   className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
//                     active
//                       ? "border-[#000000]  text-black "
//                       : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                   }`}
//                 >
//                   {option.image ? (
//                     <img
//                       src={option.image}
//                       alt={option.name}
//                       className="w-8 h-8 object-cover border border-gray-200 bg-white"
//                     />
//                   ) : (
//                     <span className="w-3 h-3 rounded-full bg-gray-300 border border-gray-200" />
//                   )}
//                   {option.name}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {hasFrameOptions && (
//         <div className="space-y-2">
//           <p className="text-xs tracking-[0.15em] text-black font-medium">
//             {t("shop.product_info.frame")}
//           </p>

//           <div className="flex flex-wrap gap-2">
//             {frameOptions.map((option) => {
//               const active = option.id === (activeFrameOption?.id ?? selectedFrameId);

//               return (
//                 <button
//                   key={option.id}
//                   type="button"
//                   onClick={() => setSelectedFrameId(option.id)}
//                   className={`px-3 py-2 text-xs border transition-colors text-left ${
//                     active
//                       ? "border-[#000000]  text-black "
//                       : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                   }`}
//                 >
//                   <span className="block">{option.name}</span>
//                   {option._rawExtraPrice > 0 && (
//                     <span className="block text-[11px] text-gray-500">+{option.extraPrice}</span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Variants with Color / Size attributes: separate buttons */}
//       {hasVariantOptions && hasVariantAttributes && (
//         <>
//           {variantColorOptions.length > 0 && (
//             <div className="space-y-2">
//               <p className="text-xs tracking-[0.15em] text-black font-medium">
//                 {t("shop.product_info.color")}
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {variantColorOptions.map((option) => {
//                   const active = option.name === activeVariantColor;
//                   return (
//                     <button
//                       key={option.name}
//                       type="button"
//                       onClick={() => setSelectedVariantColor(option.name)}
//                       className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
//                         active
//                           ? "border-[#000000] text-black"
//                           : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                       }`}
//                     >
//                       {option.image && (
//                         <img
//                           src={option.image}
//                           alt={option.name}
//                           className="w-8 h-8 object-cover border border-gray-200 bg-white"
//                         />
//                       )}
//                       {option.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {variantSizeOptions.length > 0 && (
//             <div className="space-y-2">
//               <p className="text-xs tracking-[0.15em] text-black font-medium">
//                 {t("shop.product_info.size")}
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {variantSizeOptions.map((size) => {
//                   const active = size === activeVariantSize;
//                   const available = availableSizesForColor.has(size);
//                   return (
//                     <button
//                       key={size}
//                       type="button"
//                       disabled={!available}
//                       onClick={() => setSelectedVariantSize(size)}
//                       className={`px-3 py-1.5 text-xs border transition-colors ${
//                         !available
//                           ? "border-gray-200 text-gray-300 line-through cursor-not-allowed"
//                           : active
//                             ? "border-[#000000] text-black"
//                             : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Fallback: variants without Color / Size attributes keep the combined buttons */}
//       {hasVariantOptions && !hasVariantAttributes && (
//         <div className="space-y-2">
//           <p className="text-xs tracking-[0.15em] text-black font-medium">
//             {t("shop.product_info.variant", "OPTIONS")}
//           </p>

//           <div className="flex flex-wrap gap-2">
//             {variantOptions.map((option) => {
//               const active = option.id === (activeVariantOption?.id ?? selectedVariantId);
//               const label = option.options.map((o) => o.option_value).join(" - ") || option.sku;

//               return (
//                 <button
//                   key={option.id}
//                   type="button"
//                   onClick={() => setSelectedVariantId(option.id)}
//                   className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
//                     active
//                       ? "border-[#000000] text-black"
//                       : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                   }`}
//                 >
//                   {option.images && option.images[0] && (
//                     <img
//                       src={option.images[0]}
//                       alt={label}
//                       className="w-8 h-8 object-cover border border-gray-200 bg-white"
//                     />
//                   )}
//                   {label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
//         <div className="flex border border-gray-300 w-fit">
//           <button type="button" onClick={decrease} className="px-3 sm:px-4 py-2 hover:bg-gray-50">
//             -
//           </button>

//           <input
//             type="number"
//             min={1}
//             max={maxQty}
//             value={qty}
//             onChange={handleQtyInput}
//             className="w-12 sm:w-14 text-center outline-none"
//           />

//           <button type="button" onClick={increase} className="px-3 sm:px-4 py-2 hover:bg-gray-50">
//             +
//           </button>
//         </div>

//         <div className="flex gap-3 w-full sm:w-auto">
//           <button
//             type="button"
//             onClick={handleBuyNow}
//             disabled={cartLoading || isOutOfStock}
//             className="bg-[#F5C518] hover:brightness-95 px-6 sm:px-16 lg:px-24 py-3 text-xs sm:text-sm tracking-wide w-full disabled:opacity-60"
//           >
//             {t("shop.product_info.buy_now")}
//           </button>

//           <button
//             type="button"
//             onClick={handleAddOnly}
//             disabled={cartLoading || isOutOfStock}
//             className="bg-gray-50 p-3 border border-gray-200 shrink-0 disabled:opacity-50"
//           >
//             {cartLoading ? (
//               <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin block" />
//             ) : (
//               <LuShoppingBag size={18} />
//             )}
//           </button>
//         </div>
//       </div>

//       {(stockMessage || isOutOfStock) && (
//   <div
//     role="alert"
//     className="flex w-60 items-start gap-3 border border-red-200 border-l-3 border-l-red-500 bg-red-50 px-4 py-3"
//   >
//     <svg
//       className="w-4 h-4 mt-0.5 text-red-500 shrink-0"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path
//         fillRule="evenodd"
//         d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.59c.75 1.334-.213 2.99-1.742 2.99H3.481c-1.53 0-2.492-1.656-1.743-2.99l6.519-11.59zM11 14a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z"
//         clipRule="evenodd"
//       />
//     </svg>

//     <div>
//       <p className="text-xs tracking-[0.15em] font-semibold text-red-700 uppercase">
//         {isOutOfStock
//           ? t("shop.product_info.out_of_stock", "Out of Stock")
//           : t("shop.product_info.stock_alert", "Stock Alert")}
//       </p>
//       <p className="text-xs text-red-600 mt-0.5">
//         {isOutOfStock
//           ? t("shop.product_info.out_of_stock_desc", "This item is currently unavailable.")
//           : stockMessage}
//       </p>
//     </div>
//   </div>
// )}

//       {/* <div className="border-t border-[#D9D9D9] pt-6 sm:pt-8">
//         <div className="grid grid-cols-3 gap-4 text-center">
//           <div className="flex flex-col items-center gap-2">
//             <IoShieldOutline className="w-5 h-5" />
//             <p className="text-[9px] sm:text-xs tracking-widest">AUTHENTICITY GUARANTEED</p>
//           </div>

//           <div className="flex flex-col items-center gap-2">
//             <MdOutlineLocalShipping className="w-5 h-5" />
//             <p className="text-[9px] sm:text-xs tracking-widest">FREE SHIPPING</p>
//           </div>

//           <div className="flex flex-col items-center gap-2">
//             <RiLoopLeftFill className="w-5 h-5" />
//             <p className="text-[9px] sm:text-xs tracking-widest">30-DAY RETURNS</p>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IoShieldOutline } from "react-icons/io5";
// import { LuShoppingBag } from "react-icons/lu";
// import { MdOutlineLocalShipping } from "react-icons/md";
// import { RiLoopLeftFill } from "react-icons/ri";
// import { useAddToCart } from "../../../hooks/useAddToCart";
// import { useProductSizePricing } from "../../../hooks/useProductSizePricing";
// import { useTranslation } from "react-i18next";
// import { formatMoney } from "../../../utils/currency";
// import TabbyPromo from "../../Tabby/TabbyPromo"; // CHANGED: new import (adjust path if needed)

// export default function ProductInfo({ product, productSelection }) {
//   const { t, i18n } = useTranslation(); // CHANGED: added i18n
//   const promoLang = i18n.language?.toLowerCase().startsWith("ar") ? "ar" : "en"; // CHANGED
//   const [qty, setQty] = useState(1);
//   const [stockMessage, setStockMessage] = useState("");
//   const navigate = useNavigate();

//   const { handleAddToCart, loading: cartLoading } = useAddToCart();
//   const fallbackSelection = useProductSizePricing(product);

//   const {
//     selectedSize,
//     setSelectedSize,
//     selectedColorId,
//     setSelectedColorId,
//     selectedFrameId,
//     setSelectedFrameId,
//     selectedMaterialId,
//     setSelectedMaterialId,
//     sizeOptions,
//     colorOptions,
//     frameOptions,
//     materialOptions,
//     hasSizeOptions,
//     hasColorOptions,
//     hasFrameOptions,
//     hasMaterialOptions,
//     hasVariantOptions,
//     activeSizeOption,
//     activeColorOption,
//     activeFrameOption,
//     activeMaterialOption,
//     activeVariantOption,
//     selectedVariantId,
//     setSelectedVariantId,
//     variantOptions,
//     displayPrice,
//     productForCart,
//     setSelectedVariantColor,
//     setSelectedVariantSize,
//     variantColorOptions,
//     variantSizeOptions,
//     availableSizesForColor,
//     hasVariantAttributes,
//     activeVariantColor,
//     activeVariantSize,
//     activeStock,
//   } = productSelection ?? fallbackSelection;

//   // Stock handling:
//   // - no stock info at all  -> keep old behaviour (max 99, purchasable)
//   // - stock is 0 or less    -> out of stock
//   // - otherwise             -> limit qty to available stock
//   const rawStock = activeStock ?? product?.stock;
//   const hasStockInfo =
//     rawStock !== null && rawStock !== undefined && rawStock !== "";
//   const parsedStock = Number(rawStock);
//   const isOutOfStock =
//     hasStockInfo && (!Number.isFinite(parsedStock) || parsedStock <= 0);
//   const maxQty = isOutOfStock ? 1 : hasStockInfo ? parsedStock : 99;

//   // Keep qty within the selected variant's stock
//   useEffect(() => {
//     setQty((prev) => Math.min(prev, maxQty));
//   }, [maxQty]);

//   // Clear stale stock message when the selected variant/stock changes
//   useEffect(() => {
//     setStockMessage("");
//   }, [activeStock]);

//   const increase = () => setQty((prev) => (prev < maxQty ? prev + 1 : prev));
//   const decrease = () => setQty((prev) => (prev > 1 ? prev - 1 : prev));

//   const handleQtyInput = (event) => {
//     const raw = Number.parseInt(event.target.value, 10);
//     if (Number.isNaN(raw)) {
//       setQty(1);
//       return;
//     }
//     setQty(Math.min(maxQty, Math.max(1, raw)));
//   };

//   // Shared stock guard for Buy Now and Add to Cart
//   const canPurchase = () => {
//     if (isOutOfStock) {
//       setStockMessage(t("shop.product_info.out_of_stock", "Out of Stock"));
//       return false;
//     }
//     if (hasStockInfo && qty > parsedStock) {
//       setStockMessage(`Only ${parsedStock} items available.`);
//       return false;
//     }
//     setStockMessage("");
//     return true;
//   };

//   const handleBuyNow = async () => {
//     if (!canPurchase()) return;
//     await handleAddToCart(productForCart, qty);
//     navigate("/checkout");
//   };

//   const handleAddOnly = async () => {
//     if (!canPurchase()) return;
//     await handleAddToCart(productForCart, qty);
//   };

//   return (
//     <div className="space-y-5 sm:space-y-6">
//       {product.originalPrice && (
//         <span className="inline-block text-[10px] sm:text-xs bg-red-500 text-white px-3 py-1 tracking-widest">
//           {t("shop.product_info.sale")}
//         </span>
//       )}
//       <h1 className="text-base sm:text-xl tracking-widest font-semibold font-[inter]">
//         {product.name}
//       </h1>
//       <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 flex-wrap">
//         {product.rating > 0 ? (
//           <>
//             <div className="flex text-[#CBA61F]">
//               {[1, 2, 3, 4, 5].map((index) => (
//                 <span key={index}>
//                   {index <= Math.round(product.rating) ? "★" : "☆"}
//                 </span>
//               ))}
//             </div>

//             <span>
//               {product.rating.toFixed(1)} ({product.reviewsCount}{" "}
//               {product.reviewsCount !== 1
//                 ? t("shop.product_info.reviews")
//                 : t("shop.product_info.review")}
//               )
//             </span>
//           </>
//         ) : (
//           <span className="text-gray-300 text-xs">
//             {t("shop.product_info.no_reviews")}
//           </span>
//         )}
//       </div>
//       <div className="flex items-center gap-3 flex-wrap">
//         <span className="text-xl sm:text-3xl font-semibold">
//           {formatMoney(productForCart._rawPrice * qty, product.currency)}
//         </span>

//         {product.originalPrice && (
//           <span className="line-through text-gray-400 text-sm sm:text-lg">
//             {formatMoney(
//               Number.parseFloat(
//                 String(product.originalPrice).replace(/[^0-9.]/g, ""),
//               ) * qty,
//               product.currency,
//             )}
//           </span>
//         )}
//       </div>

//       {/* CHANGED: Tabby on-site messaging snippet (product page) */}
//       <TabbyPromo
//         price={productForCart._rawPrice * qty}
//         currency={String(product.currency || "").toUpperCase()}
//         lang={promoLang}
//         source="product"
//       />

//       <p className="text-gray-500 leading-6 max-w-md text-sm">
//         {product.shortDesc}
//       </p>

//       {hasMaterialOptions && (
//         <div className="space-y-2">
//           <p className="text-xs tracking-[0.15em] text-black  font-semibold">
//             {t("shop.product_info.material")}
//           </p>

//           <div className="flex flex-wrap gap-2">
//             {materialOptions.map((option) => {
//               const active =
//                 option.id === (activeMaterialOption?.id ?? selectedMaterialId);

//               return (
//                 <button
//                   key={option.id}
//                   type="button"
//                   onClick={() => setSelectedMaterialId(option.id)}
//                   className={`px-3 py-2 text-xs border transition-colors text-left max-w-[220px] ${
//                     active
//                       ? "border-[#000000]  text-black "
//                       : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                   }`}
//                 >
//                   <span className="block">{option.name}</span>
//                   {option.description && (
//                     <span className="block text-[11px] text-gray-500 mt-0.5 line-clamp-2">
//                       {option.description}
//                     </span>
//                   )}
//                   {option._rawExtraPrice > 0 && (
//                     <span className="block text-[11px] text-gray-500 mt-0.5">
//                       +{option.extraPrice}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {hasSizeOptions && (
//         <div className="space-y-2">
//           <p className="text-xs tracking-[0.15em] text-black font-medium ">
//             {t("shop.product_info.size")}
//           </p>

//           <div className="flex flex-wrap gap-2">
//             {sizeOptions.map((option) => {
//               const active =
//                 option.size === (activeSizeOption?.size ?? selectedSize);

//               return (
//                 <button
//                   key={option.size}
//                   type="button"
//                   onClick={() => setSelectedSize(option.size)}
//                   className={`px-3 py-1.5 text-xs border transition-colors ${
//                     active
//                       ? "border-[#000000]  text-black "
//                       : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                   }`}
//                 >
//                   {option.size}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {hasColorOptions && (
//         <div className="space-y-2">
//           <p className="text-xs tracking-[0.15em] text-black font-medium ">
//             {t("shop.product_info.color")}
//           </p>

//           <div className="flex flex-wrap gap-2">
//             {colorOptions.map((option) => {
//               const active =
//                 option.id === (activeColorOption?.id ?? selectedColorId);

//               return (
//                 <button
//                   key={option.id}
//                   type="button"
//                   onClick={() => setSelectedColorId(option.id)}
//                   className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
//                     active
//                       ? "border-[#000000]  text-black "
//                       : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                   }`}
//                 >
//                   {option.image ? (
//                     <img
//                       src={option.image}
//                       alt={option.name}
//                       className="w-8 h-8 object-cover border border-gray-200 bg-white"
//                     />
//                   ) : (
//                     <span className="w-3 h-3 rounded-full bg-gray-300 border border-gray-200" />
//                   )}
//                   {option.name}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {hasFrameOptions && (
//         <div className="space-y-2">
//           <p className="text-xs tracking-[0.15em] text-black font-medium">
//             {t("shop.product_info.frame")}
//           </p>

//           <div className="flex flex-wrap gap-2">
//             {frameOptions.map((option) => {
//               const active =
//                 option.id === (activeFrameOption?.id ?? selectedFrameId);

//               return (
//                 <button
//                   key={option.id}
//                   type="button"
//                   onClick={() => setSelectedFrameId(option.id)}
//                   className={`px-3 py-2 text-xs border transition-colors text-left ${
//                     active
//                       ? "border-[#000000]  text-black "
//                       : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                   }`}
//                 >
//                   <span className="block">{option.name}</span>
//                   {option._rawExtraPrice > 0 && (
//                     <span className="block text-[11px] text-gray-500">
//                       +{option.extraPrice}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Variants with Color / Size attributes: separate buttons */}
//       {hasVariantOptions && hasVariantAttributes && (
//         <>
//           {variantColorOptions.length > 0 && (
//             <div className="space-y-2">
//               <p className="text-xs tracking-[0.15em] text-black font-medium">
//                 {t("shop.product_info.color")}
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {variantColorOptions.map((option) => {
//                   const active = option.name === activeVariantColor;
//                   return (
//                     <button
//                       key={option.name}
//                       type="button"
//                       onClick={() => setSelectedVariantColor(option.name)}
//                       className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
//                         active
//                           ? "border-[#000000] text-black"
//                           : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                       }`}
//                     >
//                       {option.image && (
//                         <img
//                           src={option.image}
//                           alt={option.name}
//                           className="w-8 h-8 object-cover border border-gray-200 bg-white"
//                         />
//                       )}
//                       {option.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {variantSizeOptions.length > 0 && (
//             <div className="space-y-2">
//               <p className="text-xs tracking-[0.15em] text-black font-medium">
//                 {t("shop.product_info.size")}
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {variantSizeOptions.map((size) => {
//                   const active = size === activeVariantSize;
//                   const available = availableSizesForColor.has(size);
//                   return (
//                     <button
//                       key={size}
//                       type="button"
//                       disabled={!available}
//                       onClick={() => setSelectedVariantSize(size)}
//                       className={`px-3 py-1.5 text-xs border transition-colors ${
//                         !available
//                           ? "border-gray-200 text-gray-300 line-through cursor-not-allowed"
//                           : active
//                             ? "border-[#000000] text-black"
//                             : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Fallback: variants without Color / Size attributes keep the combined buttons */}
//       {hasVariantOptions && !hasVariantAttributes && (
//         <div className="space-y-2">
//           <p className="text-xs tracking-[0.15em] text-black font-medium">
//             {t("shop.product_info.variant", "OPTIONS")}
//           </p>

//           <div className="flex flex-wrap gap-2">
//             {variantOptions.map((option) => {
//               const active =
//                 option.id === (activeVariantOption?.id ?? selectedVariantId);
//               const label =
//                 option.options.map((o) => o.option_value).join(" - ") ||
//                 option.sku;

//               return (
//                 <button
//                   key={option.id}
//                   type="button"
//                   onClick={() => setSelectedVariantId(option.id)}
//                   className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
//                     active
//                       ? "border-[#000000] text-black"
//                       : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
//                   }`}
//                 >
//                   {option.images && option.images[0] && (
//                     <img
//                       src={option.images[0]}
//                       alt={label}
//                       className="w-8 h-8 object-cover border border-gray-200 bg-white"
//                     />
//                   )}
//                   {label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
//         <div className="flex border border-gray-300 w-fit">
//           <button
//             type="button"
//             onClick={decrease}
//             className="px-3 sm:px-4 py-2 hover:bg-gray-50"
//           >
//             -
//           </button>

//           <input
//             type="number"
//             min={1}
//             max={maxQty}
//             value={qty}
//             onChange={handleQtyInput}
//             className="w-12 sm:w-14 text-center outline-none"
//           />

//           <button
//             type="button"
//             onClick={increase}
//             className="px-3 sm:px-4 py-2 hover:bg-gray-50"
//           >
//             +
//           </button>
//         </div>

//         <div className="flex gap-3 w-full sm:w-auto">
//           <button
//             type="button"
//             onClick={handleBuyNow}
//             disabled={cartLoading || isOutOfStock}
//             className="bg-[#F5C518] hover:brightness-95 px-6 sm:px-16 lg:px-24 py-3 text-xs sm:text-sm tracking-wide w-full disabled:opacity-60"
//           >
//             {t("shop.product_info.buy_now")}
//           </button>

//           <button
//             type="button"
//             onClick={handleAddOnly}
//             disabled={cartLoading || isOutOfStock}
//             className="bg-gray-50 p-3 border border-gray-200 shrink-0 disabled:opacity-50"
//           >
//             {cartLoading ? (
//               <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin block" />
//             ) : (
//               <LuShoppingBag size={18} />
//             )}
//           </button>
//         </div>
//       </div>

//       {(stockMessage || isOutOfStock) && (
//         <div
//           role="alert"
//           className="flex w-60 items-start gap-3 border border-red-200 border-l-3 border-l-red-500 bg-red-50 px-4 py-3"
//         >
//           <svg
//             className="w-4 h-4 mt-0.5 text-red-500 shrink-0"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             aria-hidden="true"
//           >
//             <path
//               fillRule="evenodd"
//               d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.59c.75 1.334-.213 2.99-1.742 2.99H3.481c-1.53 0-2.492-1.656-1.743-2.99l6.519-11.59zM11 14a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z"
//               clipRule="evenodd"
//             />
//           </svg>

//           <div>
//             <p className="text-xs tracking-[0.15em] font-semibold text-red-700 uppercase">
//               {isOutOfStock
//                 ? t("shop.product_info.out_of_stock", "Out of Stock")
//                 : t("shop.product_info.stock_alert", "Stock Alert")}
//             </p>
//             <p className="text-xs text-red-600 mt-0.5">
//               {isOutOfStock
//                 ? t(
//                     "shop.product_info.out_of_stock_desc",
//                     "This item is currently unavailable.",
//                   )
//                 : stockMessage}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* <div className="border-t border-[#D9D9D9] pt-6 sm:pt-8">
//         <div className="grid grid-cols-3 gap-4 text-center">
//           <div className="flex flex-col items-center gap-2">
//             <IoShieldOutline className="w-5 h-5" />
//             <p className="text-[9px] sm:text-xs tracking-widest">AUTHENTICITY GUARANTEED</p>
//           </div>

//           <div className="flex flex-col items-center gap-2">
//             <MdOutlineLocalShipping className="w-5 h-5" />
//             <p className="text-[9px] sm:text-xs tracking-widest">FREE SHIPPING</p>
//           </div>

//           <div className="flex flex-col items-center gap-2">
//             <RiLoopLeftFill className="w-5 h-5" />
//             <p className="text-[9px] sm:text-xs tracking-widest">30-DAY RETURNS</p>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { useProductSelection } from "../../../hooks/useProductSelection"; // CHANGED: was useProductSizePricing
import { useTranslation } from "react-i18next";
import { formatMoney } from "../../../utils/currency";
import TabbyPromo from "../../Tabby/TabbyPromo"; // adjust path if needed

export default function ProductInfo({ product, productSelection }) {
  const { t, i18n } = useTranslation();
  const promoLang = i18n.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
  const [qty, setQty] = useState(1);
  const [stockMessage, setStockMessage] = useState("");
  const navigate = useNavigate();

  const { handleAddToCart, loading: cartLoading } = useAddToCart();
  const fallbackSelection = useProductSelection(product); // CHANGED

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
    hasVariantOptions,
    activeSizeOption,
    activeColorOption,
    activeFrameOption,
    activeMaterialOption,
    activeVariantOption,
    selectedVariantId,
    setSelectedVariantId,
    variantOptions,
    displayPrice,
    productForCart,
    setSelectedVariantColor,
    setSelectedVariantSize,
    variantColorOptions,
    variantSizeOptions,
    availableSizesForColor,
    hasVariantAttributes,
    activeVariantColor,
    activeVariantSize,
    activeStock,
    // NEW: size-pricing selection (undefined for Fine Art and SKU variant products)
    isSizePriced,
    hasPricedColors,
    pricedColorOptions,
    activeColor,
    selectColor,
    pricedSizeOptions,
    activeSize,
    selectSize,
    sizeSelected,
  } = productSelection ?? fallbackSelection;

  // Stock handling:
  // - no stock info at all  -> keep old behaviour (max 99, purchasable)
  // - stock is 0 or less    -> out of stock
  // - otherwise             -> limit qty to available stock
  // For size-priced products activeStock is the selected size's stock (null until a size is picked).
  const rawStock = activeStock ?? product?.stock;
  const hasStockInfo =
    rawStock !== null && rawStock !== undefined && rawStock !== "";
  const parsedStock = Number(rawStock);
  const isOutOfStock =
    hasStockInfo && (!Number.isFinite(parsedStock) || parsedStock <= 0);
  const maxQty = isOutOfStock ? 1 : hasStockInfo ? parsedStock : 99;

  // Keep qty within the selected variant's stock
  useEffect(() => {
    setQty((prev) => Math.min(prev, maxQty));
  }, [maxQty]);

  // Clear stale stock message when the selected variant/stock changes
  useEffect(() => {
    setStockMessage("");
  }, [activeStock, activeSize?.id]);

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

  // Shared stock guard for Buy Now and Add to Cart
  const canPurchase = () => {
    // NEW: size-priced products need a selected size (it supplies product_size_id)
    if (isSizePriced && !sizeSelected) {
      setStockMessage(t("shop.product_info.select_size", "Please select a size."));
      return false;
    }
    if (isOutOfStock) {
      setStockMessage(t("shop.product_info.out_of_stock", "Out of Stock"));
      return false;
    }
    if (hasStockInfo && qty > parsedStock) {
      setStockMessage(`Only ${parsedStock} items available.`);
      return false;
    }
    setStockMessage("");
    return true;
  };

  const handleBuyNow = async () => {
    if (!canPurchase()) return;
    await handleAddToCart(productForCart, qty);
    navigate("/checkout");
  };

  const handleAddOnly = async () => {
    if (!canPurchase()) return;
    await handleAddToCart(productForCart, qty);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {product.originalPrice && (
        <span className="inline-block text-[10px] sm:text-xs bg-red-500 text-white px-3 py-1 tracking-widest">
          {t("shop.product_info.sale")}
        </span>
      )}
      <h1 className="text-base sm:text-xl tracking-widest font-semibold font-[inter]">
        {product.name}
      </h1>
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 flex-wrap">
        {product.rating > 0 ? (
          <>
            <div className="flex text-[#CBA61F]">
              {[1, 2, 3, 4, 5].map((index) => (
                <span key={index}>
                  {index <= Math.round(product.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>

            <span>
              {product.rating.toFixed(1)} ({product.reviewsCount}{" "}
              {product.reviewsCount !== 1
                ? t("shop.product_info.reviews")
                : t("shop.product_info.review")}
              )
            </span>
          </>
        ) : (
          <span className="text-gray-300 text-xs">
            {t("shop.product_info.no_reviews")}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xl sm:text-3xl font-semibold">
          {/* NEW: before a size is picked, show the starting price */}
          {isSizePriced && !sizeSelected
            ? `${t("shop.product_info.from", "From")} ${product.price}`
            : formatMoney(productForCart._rawPrice * qty, product.currency)}
        </span>

        {product.originalPrice && (
          <span className="line-through text-gray-400 text-sm sm:text-lg">
            {formatMoney(
              Number.parseFloat(
                String(product.originalPrice).replace(/[^0-9.]/g, ""),
              ) * qty,
              product.currency,
            )}
          </span>
        )}
      </div>

      {/* Tabby on-site messaging snippet (product page) */}
      <TabbyPromo
        price={productForCart._rawPrice * qty}
        currency={String(product.currency || "").toUpperCase()}
        lang={promoLang}
        source="product"
      />

      <p className="text-gray-500 leading-6 max-w-md text-sm">
        {product.shortDesc}
      </p>

      {/* NEW: colour selector for size-priced products */}
      {isSizePriced && hasPricedColors && (
        <div className="space-y-2">
          <p className="text-xs tracking-[0.15em] text-black font-medium ">
            {t("shop.product_info.color")}
          </p>

          <div className="flex flex-wrap gap-2">
            {pricedColorOptions.map((option) => {
              const active = option.id === activeColor?.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => selectColor(option.id)}
                  className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
                    active
                      ? "border-[#000000] text-black"
                      : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
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

      {/* NEW: size selector for size-priced products (only the selected colour's sizes) */}
      {isSizePriced && pricedSizeOptions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs tracking-[0.15em] text-black font-medium ">
            {t("shop.product_info.size")}
          </p>

          <div className="flex flex-wrap gap-2">
            {pricedSizeOptions.map((option) => {
              const active = option.id === activeSize?.id;
              const soldOut = Number(option.stock) <= 0;

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={soldOut}
                  onClick={() => selectSize(option.id)}
                  className={`px-3 py-2 text-xs border transition-colors text-left ${
                    soldOut
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : active
                        ? "border-[#000000] text-black"
                        : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
                  }`}
                >
                  <span className={`block ${soldOut ? "line-through" : ""}`}>{option.size}</span>
                  {soldOut && (
                    <span className="block text-[11px] mt-0.5">
                      {t("shop.product_info.sold_out", "Sold out")}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* availability of the selected size */}
          {activeSize && (
            <p
              className={`text-xs ${
                Number(activeSize.stock) <= 5 ? "text-red-600" : "text-green-700"
              }`}
            >
              {Number(activeSize.stock) <= 5
                ? t("shop.product_info.only_left", "Only {{count}} left", { count: activeSize.stock })
                : t("shop.product_info.in_stock", "In stock")}
            </p>
          )}
        </div>
      )}

      {hasMaterialOptions && (
        <div className="space-y-2">
          <p className="text-xs tracking-[0.15em] text-black  font-semibold">
            {t("shop.product_info.material")}
          </p>

          <div className="flex flex-wrap gap-2">
            {materialOptions.map((option) => {
              const active =
                option.id === (activeMaterialOption?.id ?? selectedMaterialId);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedMaterialId(option.id)}
                  className={`px-3 py-2 text-xs border transition-colors text-left max-w-[220px] ${
                    active
                      ? "border-[#000000]  text-black "
                      : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
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

      {hasSizeOptions && (
        <div className="space-y-2">
          <p className="text-xs tracking-[0.15em] text-black font-medium ">
            {t("shop.product_info.size")}
          </p>

          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((option) => {
              const active =
                option.size === (activeSizeOption?.size ?? selectedSize);

              return (
                <button
                  key={option.size}
                  type="button"
                  onClick={() => setSelectedSize(option.size)}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    active
                      ? "border-[#000000]  text-black "
                      : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
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
          <p className="text-xs tracking-[0.15em] text-black font-medium ">
            {t("shop.product_info.color")}
          </p>

          <div className="flex flex-wrap gap-2">
            {colorOptions.map((option) => {
              const active =
                option.id === (activeColorOption?.id ?? selectedColorId);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedColorId(option.id)}
                  className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
                    active
                      ? "border-[#000000]  text-black "
                      : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
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
          <p className="text-xs tracking-[0.15em] text-black font-medium">
            {t("shop.product_info.frame")}
          </p>

          <div className="flex flex-wrap gap-2">
            {frameOptions.map((option) => {
              const active =
                option.id === (activeFrameOption?.id ?? selectedFrameId);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedFrameId(option.id)}
                  className={`px-3 py-2 text-xs border transition-colors text-left ${
                    active
                      ? "border-[#000000]  text-black "
                      : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
                  }`}
                >
                  <span className="block">{option.name}</span>
                  {option._rawExtraPrice > 0 && (
                    <span className="block text-[11px] text-gray-500">
                      +{option.extraPrice}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Variants with Color / Size attributes: separate buttons */}
      {hasVariantOptions && hasVariantAttributes && (
        <>
          {variantColorOptions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs tracking-[0.15em] text-black font-medium">
                {t("shop.product_info.color")}
              </p>
              <div className="flex flex-wrap gap-2">
                {variantColorOptions.map((option) => {
                  const active = option.name === activeVariantColor;
                  return (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setSelectedVariantColor(option.name)}
                      className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
                        active
                          ? "border-[#000000] text-black"
                          : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
                      }`}
                    >
                      {option.image && (
                        <img
                          src={option.image}
                          alt={option.name}
                          className="w-8 h-8 object-cover border border-gray-200 bg-white"
                        />
                      )}
                      {option.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {variantSizeOptions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs tracking-[0.15em] text-black font-medium">
                {t("shop.product_info.size")}
              </p>
              <div className="flex flex-wrap gap-2">
                {variantSizeOptions.map((size) => {
                  const active = size === activeVariantSize;
                  const available = availableSizesForColor.has(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!available}
                      onClick={() => setSelectedVariantSize(size)}
                      className={`px-3 py-1.5 text-xs border transition-colors ${
                        !available
                          ? "border-gray-200 text-gray-300 line-through cursor-not-allowed"
                          : active
                            ? "border-[#000000] text-black"
                            : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Fallback: variants without Color / Size attributes keep the combined buttons */}
      {hasVariantOptions && !hasVariantAttributes && (
        <div className="space-y-2">
          <p className="text-xs tracking-[0.15em] text-black font-medium">
            {t("shop.product_info.variant", "OPTIONS")}
          </p>

          <div className="flex flex-wrap gap-2">
            {variantOptions.map((option) => {
              const active =
                option.id === (activeVariantOption?.id ?? selectedVariantId);
              const label =
                option.options.map((o) => o.option_value).join(" - ") ||
                option.sku;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedVariantId(option.id)}
                  className={`px-3 py-2 text-xs border transition-colors flex items-center gap-2 ${
                    active
                      ? "border-[#000000] text-black"
                      : "border-gray-400 text-gray-400 hover:border-black hover:text-black"
                  }`}
                >
                  {option.images && option.images[0] && (
                    <img
                      src={option.images[0]}
                      alt={label}
                      className="w-8 h-8 object-cover border border-gray-200 bg-white"
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
        <div className="flex border border-gray-300 w-fit">
          <button
            type="button"
            onClick={decrease}
            className="px-3 sm:px-4 py-2 hover:bg-gray-50"
          >
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

          <button
            type="button"
            onClick={increase}
            className="px-3 sm:px-4 py-2 hover:bg-gray-50"
          >
            +
          </button>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={cartLoading || isOutOfStock}
            className="bg-[#F5C518] hover:brightness-95 px-6 sm:px-16 lg:px-24 py-3 text-xs sm:text-sm tracking-wide w-full disabled:opacity-60"
          >
            {t("shop.product_info.buy_now")}
          </button>

          <button
            type="button"
            onClick={handleAddOnly}
            disabled={cartLoading || isOutOfStock}
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

      {(stockMessage || isOutOfStock) && (
        <div
          role="alert"
          className="flex w-60 items-start gap-3 border border-red-200 border-l-3 border-l-red-500 bg-red-50 px-4 py-3"
        >
          <svg
            className="w-4 h-4 mt-0.5 text-red-500 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.59c.75 1.334-.213 2.99-1.742 2.99H3.481c-1.53 0-2.492-1.656-1.743-2.99l6.519-11.59zM11 14a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>

          <div>
            <p className="text-xs tracking-[0.15em] font-semibold text-red-700 uppercase">
              {isOutOfStock
                ? t("shop.product_info.out_of_stock", "Out of Stock")
                : t("shop.product_info.stock_alert", "Stock Alert")}
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              {isOutOfStock
                ? t(
                    "shop.product_info.out_of_stock_desc",
                    "This item is currently unavailable.",
                  )
                : stockMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}