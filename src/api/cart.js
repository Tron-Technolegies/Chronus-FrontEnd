// import axiosInstance from "./axios";

// const getGuestPayload = () => {
//   const accessToken = localStorage.getItem("accessToken");
//   const guestId = localStorage.getItem("guest_id");

//   if (accessToken || !guestId) {
//     return {};
//   }

//   return { guest_id: guestId };
// };

// export const addToCartAPI = async (productId, quantity = 1, options = {}) => {
//   const guestPayload = getGuestPayload();
//   const { sizeId = null, frameId = null, materialId = null, variantId = null } = options;
//   const payload = {
//     product_id: productId,
//     quantity,
//     qty: quantity,
//     ...(sizeId ? { size_id: sizeId } : {}),
//     ...(frameId ? { frame_id: frameId } : {}),
//     ...(materialId ? { material_id: materialId } : {}),
//     ...(variantId ? { variant_id: variantId } : {}),
//     ...guestPayload,
//   };

//   try {
//     return await axiosInstance.post("/cart/add/", payload);
//   } catch (err) {
//     const status = err?.response?.status;
//     if (status !== 400) throw err;

//     // Backward-compatible retry for APIs expecting `qty` instead of `quantity`.
//     return axiosInstance.post("/cart/add/", {
//       ...payload,
//       qty: quantity,
//     });
//   }
// };

// export const fetchCartAPI = () => axiosInstance.get("/cart/", { params: getGuestPayload() });

// export const removeCartItemAPI = (productId) =>
//   axiosInstance.delete(`/cart/remove/${productId}/`, {
//     params: getGuestPayload(),
//     data: getGuestPayload(),
//   });




import axiosInstance from "./axios";

const getGuestPayload = () => {
  const accessToken = localStorage.getItem("accessToken");
  const guestId = localStorage.getItem("guest_id");

  if (accessToken || !guestId) {
    return {};
  }

  return { guest_id: guestId };
};

export const addToCartAPI = async (productId, quantity = 1, options = {}) => {
  const guestPayload = getGuestPayload();
  const {
    sizeId = null,
    frameId = null,
    materialId = null,
    variantId = null,
    productSizeId = null, // NEW: size-priced products
  } = options;

  // NEW flow: product_id + product_size_id + quantity only (no variant_id)
  if (productSizeId) {
    return axiosInstance.post("/cart/add/", {
      product_id: productId,
      product_size_id: productSizeId,
      quantity,
      ...guestPayload,
    });
  }

  // Existing flow, unchanged
  const payload = {
    product_id: productId,
    quantity,
    qty: quantity,
    ...(sizeId ? { size_id: sizeId } : {}),
    ...(frameId ? { frame_id: frameId } : {}),
    ...(materialId ? { material_id: materialId } : {}),
    ...(variantId ? { variant_id: variantId } : {}),
    ...guestPayload,
  };

  try {
    return await axiosInstance.post("/cart/add/", payload);
  } catch (err) {
    const status = err?.response?.status;
    if (status !== 400) throw err;

    // Backward-compatible retry for APIs expecting `qty` instead of `quantity`.
    return axiosInstance.post("/cart/add/", {
      ...payload,
      qty: quantity,
    });
  }
};

export const fetchCartAPI = () => axiosInstance.get("/cart/", { params: getGuestPayload() });

export const removeCartItemAPI = (productId) =>
  axiosInstance.delete(`/cart/remove/${productId}/`, {
    params: getGuestPayload(),
    data: getGuestPayload(),
  });