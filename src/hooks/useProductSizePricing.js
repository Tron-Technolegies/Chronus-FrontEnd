import { useEffect, useMemo, useState } from "react";

export function useProductSizePricing(product) {
  const safeProduct = product ?? {};
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedFrameId, setSelectedFrameId] = useState(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);

  const productSizes = product?.sizes;
  const productColors = product?.colors;
  const productFrames = product?.frames;
  const productMaterials = product?.materials;

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

  const hasSizeOptions = sizeOptions.length > 0;
  const hasColorOptions = colorOptions.length > 0;
  const hasFrameOptions = frameOptions.length > 0;
  const hasMaterialOptions = materialOptions.length > 0;

  useEffect(() => {
    setSelectedSize("");
    setSelectedColorId(null);
    setSelectedFrameId(null);
    setSelectedMaterialId(null);
  }, [product?.id]);

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

  const baseRawPrice = activeSizeOption?._rawPrice ?? safeProduct?._rawPrice ?? 0;
  const frameExtra = activeFrameOption?._rawExtraPrice ?? 0;
  const materialExtra = activeMaterialOption?._rawExtraPrice ?? 0;
  const totalRawPrice = baseRawPrice + frameExtra + materialExtra;
  const displayPrice = `$${Number(totalRawPrice).toLocaleString()}`;

  const productForCart = useMemo(() => {
    const size = activeSizeOption?.size ?? null;
    const color = activeColorOption?.name ?? null;
    const frame = activeFrameOption?.name ?? null;
    const material = activeMaterialOption?.name ?? null;
    const cartKeyParts = [safeProduct.id, size, color, frame, material].filter(Boolean);

    return {
      ...safeProduct,
      price: displayPrice,
      _rawPrice: totalRawPrice,
      selectedSize: size,
      selectedSizeId: activeSizeOption?.id ?? null,
      selectedColor: color,
      selectedColorImage: activeColorOption?.image ?? null,
      selectedFrame: frame,
      selectedFrameId: activeFrameOption?.id ?? null,
      selectedMaterial: material,
      selectedMaterialId: activeMaterialOption?.id ?? null,
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
  };
}
