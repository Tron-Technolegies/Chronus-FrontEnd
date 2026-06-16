import React from "react";

const CurrencySwitcher = () => {
  const currency = localStorage.getItem("currency") || "USD";

  const handleChange = (e) => {
    localStorage.setItem("currency", e.target.value);
    window.location.reload();
  };

  return (
    <select
      value={currency}
      onChange={handleChange}
      className="bg-transparent text-white border-none text-sm font-medium focus:ring-0 focus:outline-none cursor-pointer"
    >
      <option value="USD" className="text-black">USD</option>
      <option value="AED" className="text-black">AED</option>
      <option value="EUR" className="text-black">EUR</option>
      <option value="GBP" className="text-black">GBP</option>
      <option value="INR" className="text-black">INR</option>
    </select>
  );
};

export default CurrencySwitcher;
