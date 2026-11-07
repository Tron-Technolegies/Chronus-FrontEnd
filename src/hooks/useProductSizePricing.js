// import { useEffect, useMemo, useState } from "react";
// import { formatMoney } from "../utils/currency";

// export function useProductSizePricing(product) {
//   const safeProduct = product ?? {};
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColorId, setSelectedColorId] = useState(null);
//   const [selectedFrameId, setSelectedFrameId] = useState(null);
//   const [selectedMaterialId, setSelectedMaterialId] = useState(null);
//   const [selectedVariantId, setSelectedVariantId] = useState(null);

//   const productSizes = product?.sizes;
//   const productColors = product?.colors;
//   const productFrames = product?.frames;
//   const productMaterials = product?.materials;
//   const productVariants = product?.variants;

//   const sizeOptions = useMemo(() => (Array.isArray(productSizes) ? productSizes : []), [productSizes]);
//   const colorOptions = useMemo(
//     () => (Array.isArray(productColors) ? productColors : []),
//     [productColors],
//   );
//   const frameOptions = useMemo(
//     () => (Array.isArray(productFrames) ? productFrames : []),
//     [productFrames],
//   );
//   const materialOptions = useMemo(
//     () => (Array.isArray(productMaterials) ? productMaterials : []),
//     [productMaterials],
//   );
//   const variantOptions = useMemo(
//     () => (Array.isArray(productVariants) ? productVariants : []),
//     [productVariants],
//   );

//   const hasSizeOptions = sizeOptions.length > 0;
//   const hasColorOptions = colorOptions.length > 0;
//   const hasFrameOptions = frameOptions.length > 0;
//   const hasMaterialOptions = materialOptions.length > 0;
//   const hasVariantOptions = variantOptions.length > 0;

//   useEffect(() => {
//     setSelectedSize("");
//     setSelectedColorId(null);
//     setSelectedFrameId(null);
//     setSelectedMaterialId(null);
//     setSelectedVariantId(null);
//   }, [product?.id]);

//   const activeSizeOption = useMemo(() => {
//     if (!hasSizeOptions) return null;
//     return sizeOptions.find((item) => item.size === selectedSize) ?? sizeOptions[0];
//   }, [hasSizeOptions, selectedSize, sizeOptions]);

//   const activeColorOption = useMemo(() => {
//     if (!hasColorOptions) return null;
//     return colorOptions.find((item) => item.id === selectedColorId) ?? colorOptions[0];
//   }, [colorOptions, hasColorOptions, selectedColorId]);

//   const activeFrameOption = useMemo(() => {
//     if (!hasFrameOptions) return null;
//     return frameOptions.find((item) => item.id === selectedFrameId) ?? frameOptions[0];
//   }, [frameOptions, hasFrameOptions, selectedFrameId]);

//   const activeMaterialOption = useMemo(() => {
//     if (!hasMaterialOptions) return null;
//     return materialOptions.find((item) => item.id === selectedMaterialId) ?? materialOptions[0];
//   }, [hasMaterialOptions, materialOptions, selectedMaterialId]);

//   const activeVariantOption = useMemo(() => {
//     if (!hasVariantOptions) return null;
//     return variantOptions.find((item) => item.id === selectedVariantId) ?? variantOptions[0];
//   }, [variantOptions, hasVariantOptions, selectedVariantId]);

//   const baseRawPrice = activeSizeOption?._rawPrice ?? safeProduct?._rawPrice ?? 0;
//   const frameExtra = activeFrameOption?._rawExtraPrice ?? 0;
//   const materialExtra = activeMaterialOption?._rawExtraPrice ?? 0;
//   const totalRawPrice = baseRawPrice + frameExtra + materialExtra;
//   const displayPrice = formatMoney(totalRawPrice, safeProduct?.currency);

//   const productForCart = useMemo(() => {
//     const size = activeSizeOption?.size ?? null;
//     const color = activeColorOption?.name ?? null;
//     const frame = activeFrameOption?.name ?? null;
//     const material = activeMaterialOption?.name ?? null;
//     const variantId = activeVariantOption?.id ?? null;
//     const cartKeyParts = [safeProduct.id, size, color, frame, material, variantId].filter(Boolean);

//     return {
//       ...safeProduct,
//       price: displayPrice,
//       _rawPrice: totalRawPrice,
//       selectedSize: size,
//       selectedSizeId: activeSizeOption?.id ?? null,
//       selectedColor: color,
//       selectedColorImage: activeColorOption?.image ?? null,
//       selectedFrame: frame,
//       selectedFrameId: activeFrameOption?.id ?? null,
//       selectedMaterial: material,
//       selectedMaterialId: activeMaterialOption?.id ?? null,
//       selectedVariantId: variantId,
//       cartKey: cartKeyParts.join("::") || String(safeProduct.id ?? ""),
//     };
//   }, [
//     activeColorOption?.image,
//     activeColorOption?.name,
//     activeFrameOption?.id,
//     activeFrameOption?.name,
//     activeMaterialOption?.id,
//     activeMaterialOption?.name,
//     activeSizeOption?.id,
//     activeSizeOption?.size,
//     displayPrice,
//     safeProduct,
//     totalRawPrice,
//   ]);

//   return {
//     selectedSize,
//     setSelectedSize,
//     selectedColorId,
//     setSelectedColorId,
//     selectedFrameId,
//     setSelectedFrameId,
//     selectedMaterialId,
//     setSelectedMaterialId,
//     selectedVariantId,
//     setSelectedVariantId,
//     sizeOptions,
//     colorOptions,
//     frameOptions,
//     materialOptions,
//     variantOptions,
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
//     displayPrice,
//     productForCart,
//   };
// }


import { useEffect, useMemo, useState } from "react";
import { formatMoney } from "../utils/currency";

const optionKey = (o) =>
  String(o.option_name ?? o.option ?? o.name ?? o.attribute ?? "")
    .toLowerCase()
    .trim();

// All values whose option name matches (a variant can list several sizes)
const getAttrAll = (variant, matchers) =>
  (variant?.options ?? [])
    .filter((o) => matchers.some((m) => optionKey(o).includes(m)))
    .map((o) => o.option_value)
    .filter((v) => v !== null && v !== undefined && v !== "");

export function useProductSizePricing(product) {
  const safeProduct = product ?? {};
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedFrameId, setSelectedFrameId] = useState(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedVariantColor, setSelectedVariantColor] = useState(null);
  const [selectedVariantSize, setSelectedVariantSize] = useState(null);

  const productSizes = product?.sizes;
  const productColors = product?.colors;
  const productFrames = product?.frames;
  const productMaterials = product?.materials;
  const productVariants = product?.variants;

  const sizeOptions = useMemo(() => (Array.isArray(productSizes) ? productSizes : []), [productSizes]);
  const colorOptions = useMemo(
    () => (Array.isArray(productColors) ? productColors : []),
    [productColors],
  );
  const frameOptions = useMemo(
    () => (Array.isArray(productFrames) ? productFrames : []),
    [productFrames],
  );
  const materialOptions = useMemo(
    () => (Array.isArray(productMaterials) ? productMaterials : []),
    [productMaterials],
  );
  const variantOptions = useMemo(
    () => (Array.isArray(productVariants) ? productVariants : []),
    [productVariants],
  );

  const hasSizeOptions = sizeOptions.length > 0;
  const hasColorOptions = colorOptions.length > 0;
  const hasFrameOptions = frameOptions.length > 0;
  const hasMaterialOptions = materialOptions.length > 0;
  const hasVariantOptions = variantOptions.length > 0;

  useEffect(() => {
    setSelectedSize("");
    setSelectedColorId(null);
    setSelectedFrameId(null);
    setSelectedMaterialId(null);
    setSelectedVariantId(null);
    setSelectedVariantColor(null);
    setSelectedVariantSize(null);
  }, [product?.id]);

  // ---- Variant parsing (Color / Size) ----
  const parsedVariants = useMemo(
    () =>
      variantOptions.map((variant) => ({
        variant,
        color: getAttrAll(variant, ["color", "colour"])[0] ?? null,
        sizes: getAttrAll(variant, ["size"]),
      })),
    [variantOptions],
  );

  const hasVariantAttributes = parsedVariants.some((p) => p.color || p.sizes.length > 0);

  const variantColorOptions = useMemo(() => {
    const seen = new Map();
    parsedVariants.forEach(({ variant, color }) => {
      if (color && !seen.has(color)) {
        seen.set(color, { name: color, image: variant.images?.[0] ?? null });
      }
    });
    return [...seen.values()];
  }, [parsedVariants]);

  const activeVariantColor =
    variantColorOptions.find((c) => c.name === selectedVariantColor)?.name ??
    variantColorOptions[0]?.name ??
    null;

  // All sizes across every variant
  const variantSizeOptions = useMemo(() => {
    const sizes = [];
    parsedVariants.forEach((p) => {
      p.sizes.forEach((s) => {
        if (!sizes.includes(s)) sizes.push(s);
      });
    });
    return sizes;
  }, [parsedVariants]);

  // Sizes that exist for the selected color
  const availableSizesForColor = useMemo(() => {
    const set = new Set();
    parsedVariants.forEach(({ color, sizes }) => {
      if (activeVariantColor === null || color === activeVariantColor) {
        sizes.forEach((s) => set.add(s));
      }
    });
    return set;
  }, [parsedVariants, activeVariantColor]);

  const activeVariantSize = availableSizesForColor.has(selectedVariantSize)
    ? selectedVariantSize
    : variantSizeOptions.find((s) => availableSizesForColor.has(s)) ?? null;

  // ---- Active options ----
  const activeSizeOption = useMemo(() => {
    if (!hasSizeOptions) return null;
    return sizeOptions.find((item) => item.size === selectedSize) ?? sizeOptions[0];
  }, [hasSizeOptions, selectedSize, sizeOptions]);

  const activeColorOption = useMemo(() => {
    if (!hasColorOptions) return null;
    return colorOptions.find((item) => item.id === selectedColorId) ?? colorOptions[0];
  }, [colorOptions, hasColorOptions, selectedColorId]);

  const activeFrameOption = useMemo(() => {
    if (!hasFrameOptions) return null;
    return frameOptions.find((item) => item.id === selectedFrameId) ?? frameOptions[0];
  }, [frameOptions, hasFrameOptions, selectedFrameId]);

  const activeMaterialOption = useMemo(() => {
    if (!hasMaterialOptions) return null;
    return materialOptions.find((item) => item.id === selectedMaterialId) ?? materialOptions[0];
  }, [hasMaterialOptions, materialOptions, selectedMaterialId]);

  const activeVariantOption = useMemo(() => {
    if (!hasVariantOptions) return null;
    if (hasVariantAttributes) {
      const match = parsedVariants.find(
        (p) =>
          (activeVariantColor === null || p.color === activeVariantColor) &&
          (activeVariantSize === null || p.sizes.includes(activeVariantSize)),
      );
      return match?.variant ?? variantOptions[0];
    }
    return variantOptions.find((item) => item.id === selectedVariantId) ?? variantOptions[0];
  }, [
    hasVariantOptions,
    hasVariantAttributes,
    parsedVariants,
    activeVariantColor,
    activeVariantSize,
    variantOptions,
    selectedVariantId,
  ]);

  // Stock comes from the selected variant, falling back to the product
  const activeStock = activeVariantOption?.stock ?? safeProduct?.stock;

  // Fine Art size price first, then variant price (if the API sends one), then product price
  const baseRawPrice =
    activeSizeOption?._rawPrice ?? activeVariantOption?._rawPrice ?? safeProduct?._rawPrice ?? 0;
  const frameExtra = activeFrameOption?._rawExtraPrice ?? 0;
  const materialExtra = activeMaterialOption?._rawExtraPrice ?? 0;
  const totalRawPrice = baseRawPrice + frameExtra + materialExtra;
  const displayPrice = formatMoney(totalRawPrice, safeProduct?.currency);

  const productForCart = useMemo(() => {
    const size = activeSizeOption?.size ?? activeVariantSize ?? null;
    const color = activeColorOption?.name ?? activeVariantColor ?? null;
    const frame = activeFrameOption?.name ?? null;
    const material = activeMaterialOption?.name ?? null;
    const variantId = activeVariantOption?.id ?? null;
    const cartKeyParts = [safeProduct.id, size, color, frame, material, variantId].filter(Boolean);

    return {
      ...safeProduct,
      price: displayPrice,
      _rawPrice: totalRawPrice,
      selectedSize: size,
      selectedSizeId: activeSizeOption?.id ?? null,
      selectedColor: color,
      selectedColorImage: activeColorOption?.image ?? activeVariantOption?.images?.[0] ?? null,
      selectedFrame: frame,
      selectedFrameId: activeFrameOption?.id ?? null,
      selectedMaterial: material,
      selectedMaterialId: activeMaterialOption?.id ?? null,
      selectedVariantId: variantId,
      cartKey: cartKeyParts.join("::") || String(safeProduct.id ?? ""),
    };
  }, [
    activeColorOption?.image,
    activeColorOption?.name,
    activeFrameOption?.id,
    activeFrameOption?.name,
    activeMaterialOption?.id,
    activeMaterialOption?.name,
    activeSizeOption?.id,
    activeSizeOption?.size,
    activeVariantOption?.id,
    activeVariantOption?.images,
    activeVariantColor,
    activeVariantSize,
    displayPrice,
    safeProduct,
    totalRawPrice,
  ]);

  return {
    selectedSize,
    setSelectedSize,
    selectedColorId,
    setSelectedColorId,
    selectedFrameId,
    setSelectedFrameId,
    selectedMaterialId,
    setSelectedMaterialId,
    selectedVariantId,
    setSelectedVariantId,
    setSelectedVariantColor,
    setSelectedVariantSize,
    sizeOptions,
    colorOptions,
    frameOptions,
    materialOptions,
    variantOptions,
    variantColorOptions,
    variantSizeOptions,
    availableSizesForColor,
    hasSizeOptions,
    hasColorOptions,
    hasFrameOptions,
    hasMaterialOptions,
    hasVariantOptions,
    hasVariantAttributes,
    activeSizeOption,
    activeColorOption,
    activeFrameOption,
    activeMaterialOption,
    activeVariantOption,
    activeVariantColor,
    activeVariantSize,
    activeStock,
    displayPrice,
    productForCart,
  };
}