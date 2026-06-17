export const formatMoney = (value, currencyCode = null) => {
  const activeCurrency = currencyCode || localStorage.getItem("currency") || "USD";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: activeCurrency,
  }).format(Number(value ?? 0));
};
