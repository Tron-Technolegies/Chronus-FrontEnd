import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://checkout.tabby.ai/tabby-card.js";
const SUPPORTED_CURRENCIES = ["AED", "SAR"]; // per Tabby's TabbyCard docs
let scriptPromise = null;

function loadTabbyCardScript() {
  if (window.TabbyCard) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = resolve;
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error("Tabby card script failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export default function TabbyCard({ price, currency = "AED", lang = "en" }) {
  // Never use "TabbyCard" as the id: it would shadow the Tabby constructor
  const idRef = useRef(`tabby-card-${Math.random().toString(36).slice(2)}`);
  const amount = Number(price);
  const publicKey = import.meta.env.VITE_TABBY_PUBLIC_KEY;
  const merchantCode = import.meta.env.VITE_TABBY_MERCHANT_CODE;
  const valid =
    Number.isFinite(amount) &&
    amount > 0 &&
    SUPPORTED_CURRENCIES.includes(currency) &&
    Boolean(publicKey && merchantCode);

  useEffect(() => {
    if (!valid) {
      if (import.meta.env.DEV) {
        console.warn("TabbyCard not shown:", { amount, currency, hasKeys: Boolean(publicKey && merchantCode) });
      }
      return;
    }
    let cancelled = false;

    loadTabbyCardScript()
      .then(() => {
        if (cancelled) return;
        const el = document.getElementById(idRef.current);
        if (el) el.innerHTML = "";
        new window.TabbyCard({
          selector: `#${idRef.current}`,
          currency,
          price: amount.toFixed(2),
          lang,
          shouldInheritBg: false,
          publicKey,
          merchantCode,
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [amount, currency, lang, valid, publicKey, merchantCode]);

  if (!valid) return null;
  return <div id={idRef.current} dir={lang === "ar" ? "rtl" : "ltr"} />;
}