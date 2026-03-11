import { useMemo, useState } from "react";

export function useProductSizePricing(product) {
  const [selectedSize, setSelectedSize] = useState("");
  const productSizes = product?.sizes;

  const sizeOptions = useMemo(() => (Array.isArray(productSizes) ? productSizes : []), [productSizes]);
  const hasSizeOptions = sizeOptions.length > 0;

  const activeSizeOption = useMemo(() => {
    if (!hasSizeOptions) return null;
    return sizeOptions.find((item) => item.size === selectedSize) ?? sizeOptions[0];
  }, [hasSizeOptions, selectedSize, sizeOptions]);

  const displayPrice = activeSizeOption?.price ?? product?.price;

  const productForCart = useMemo(() => {
    const size = activeSizeOption?.size ?? null;
    return {
      ...product,
      price: displayPrice,
      selectedSize: size,
      cartKey: size ? `${product.id}::${size}` : String(product.id),
    };
  }, [activeSizeOption?.size, displayPrice, product]);

  return {
    selectedSize,
    setSelectedSize,
    sizeOptions,
    hasSizeOptions,
    activeSizeOption,
    displayPrice,
    productForCart,
  };
}
