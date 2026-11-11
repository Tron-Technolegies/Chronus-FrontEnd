// export const formatMoney = (value, currencyCode = null) => {
//   const activeCurrency = currencyCode || localStorage.getItem("currency") || "USD";
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: activeCurrency,
//   }).format(Number(value ?? 0));
// };



export const DEFAULT_CURRENCY = "AED";

export const CURRENCIES = ["AED", "USD", "EUR", "GBP", "INR", "CAD", "AUD", "JPY", "CHF"];

// Bump this number whenever you change DEFAULT_CURRENCY and want to reset everyone
const CURRENCY_VERSION = "2";

export const getActiveCurrency = () => {
  if (localStorage.getItem("currency_version") !== CURRENCY_VERSION) {
    localStorage.setItem("currency", DEFAULT_CURRENCY);
    localStorage.setItem("currency_version", CURRENCY_VERSION);
  }
  return localStorage.getItem("currency") || DEFAULT_CURRENCY;
};

export const formatMoney = (value, currencyCode = null) => {
  const activeCurrency = currencyCode || getActiveCurrency();
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: activeCurrency,
  }).format(Number(value ?? 0));
};

export const parseAmount = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : null;
};