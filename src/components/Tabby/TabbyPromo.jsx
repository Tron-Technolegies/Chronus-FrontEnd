import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://checkout.tabby.ai/tabby-promo.js";
const SUPPORTED_CURRENCIES = ["AED", "SAR", "KWD", "BHD", "QAR"];
let scriptPromise = null;

function loadTabbyPromoScript() {
  if (window.TabbyPromo) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = resolve;
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error("Tabby promo script failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export default function TabbyPromo({
  price, // number or numeric string, in `currency`
  currency = "AED",
  lang = "en", // "en" | "ar"
  source = "product", // "product" | "cart"
}) {
  const idRef = useRef(`tabby-promo-${Math.random().toString(36).slice(2)}`);
  const amount = Number(price);
  const valid = Number.isFinite(amount) && amount > 0 && SUPPORTED_CURRENCIES.includes(currency);

  useEffect(() => {
    if (!valid) return;
    let cancelled = false;

    loadTabbyPromoScript()
      .then(() => {
        if (cancelled) return;
        const el = document.getElementById(idRef.current);
        if (el) el.innerHTML = ""; // clear before re-init on price/lang change
        new window.TabbyPromo({
          selector: `#${idRef.current}`,
          currency,
          price: amount.toFixed(2),
          lang,
          source,
          publicKey: import.meta.env.VITE_TABBY_PUBLIC_KEY,
          merchantCode: import.meta.env.VITE_TABBY_MERCHANT_CODE,
        });
      })
      .catch(() => {}); // promo is non-critical, fail silently

    return () => {
      cancelled = true;
    };
  }, [amount, currency, lang, source, valid]);

  if (!valid) return null;
  return <div id={idRef.current} dir={lang === "ar" ? "rtl" : "ltr"} />;
}