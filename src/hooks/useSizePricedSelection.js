import { useCallback, useEffect, useMemo, useState } from "react";
import { formatMoney } from "../utils/currency";

/**
 * Selection state for size-priced products (has_size_pricing = true).
 * Colour (optional) -> that colour's sizes -> price, stock and product_size_id.
 * It does nothing for Fine Art or SKU variant products.
 */
export function useSizePricedSelection(product) {
  const isSizePriced = Boolean(product?.hasSizePricing);

  const pricedColorOptions = useMemo(
    () => (isSizePriced ? product?.pricedColors ?? [] : []),
    [isSizePriced, product?.pricedColors],
  );
  const hasPricedColors = pricedColorOptions.length > 0;

  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);

  // start fresh whenever another product is opened
  useEffect(() => {
    setSelectedColorId(null);
    setSelectedSizeId(null);
  }, [product?.id]);

  // default colour = first colour that still has stock
  const activeColor = hasPricedColors
    ? pricedColorOptions.find((c) => String(c.id) === String(selectedColorId)) ??
      pricedColorOptions.find((c) => c.sizes.some((s) => Number(s.stock) > 0)) ??
      pricedColorOptions[0]
    : null;

  // only the selected colour's sizes (or the product's own sizes for size-only products)
  const pricedSizeOptions = hasPricedColors
    ? activeColor?.sizes ?? []
    : isSizePriced
      ? product?.pricedSizes ?? []
      : [];

  // the customer must pick a size, so there is no default size
  const activeSize =
    pricedSizeOptions.find((s) => String(s.id) === String(selectedSizeId)) ?? null;

  const selectColor = useCallback((id) => {
    setSelectedColorId(id);
    setSelectedSizeId(null); // sizes belong to a colour, so clear the old choice
  }, []);

  const selectSize = useCallback((id) => setSelectedSizeId(id), []);

  // price and stock come from the selected size, never calculated here
  const rawPrice = activeSize?._rawPrice ?? product?._rawPrice ?? 0;
  const displayPrice = activeSize?.price ?? product?.price ?? "";
  const activeStock = activeSize ? Number(activeSize.stock) : null;

  const colorImage = activeColor?.image ?? null;
  const galleryImages = activeColor?.gallery ?? [];

  const productForCart = useMemo(() => {
    if (!isSizePriced || !product) return null;
    return {
      ...product,
      _rawPrice: rawPrice,
      price: activeSize?.price ?? product.price,
      image: colorImage ?? product.image,
      hasSizePricing: true,
      selectedProductSizeId: activeSize?.id ?? null,
      selectedSize: activeSize?.size ?? null,
      selectedColor: activeColor?.name ?? null,
    };
  }, [isSizePriced, product, rawPrice, activeSize, activeColor, colorImage]);

  return {
    isSizePriced,
    hasPricedColors,
    pricedColorOptions,
    activeColor,
    selectColor,
    pricedSizeOptions,
    activeSize,
    selectSize,
    sizeSelected: Boolean(activeSize),
    displayPrice,
    activeStock,
    colorImage,
    galleryImages,
    productForCart,
  };
}