import { useProductSizePricing } from "./useProductSizePricing";
import { useSizePricedSelection } from "./useSizePricedSelection";

/**
 * Drop-in replacement for useProductSizePricing(product).
 * - Fine Art and SKU variant products: returns exactly what useProductSizePricing returns.
 * - Size-priced products (has_size_pricing): the price, stock, colour and size come from
 *   useSizePricedSelection, and productForCart carries selectedProductSizeId.
 */
export function useProductSelection(product) {
  const base = useProductSizePricing(product);
  const priced = useSizePricedSelection(product);

  if (!priced.isSizePriced) {
    return { ...base, isSizePriced: false };
  }

  return {
    ...base,
    ...priced,
    // lets the page keep using activeColorOption?.image for the gallery
    activeColorOption: priced.activeColor
      ? { id: priced.activeColor.id, name: priced.activeColor.name, image: priced.activeColor.image }
      : base.activeColorOption,
  };
}