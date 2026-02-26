import { useState, useCallback } from "react";

const MIN = 0;
const MAX = 100000;

const ProductPriceFilter = ({ priceRange, setPriceRange }) => {
  const [minVal, setMinVal] = useState(priceRange?.[0] ?? MIN);
  const [maxVal, setMaxVal] = useState(priceRange?.[1] ?? MAX);

  const getPercent = useCallback((value) => Math.round(((value - MIN) / (MAX - MIN)) * 100), []);

  const formatPrice = (val) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  return (
    <div className="w-full px-5 py-5 border-b border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm font-semibold text-gray-900 tracking-tight">Price Range</span>
        <span className="text-xs font-medium text-gray-400">${MAX.toLocaleString()}</span>
      </div>

      {/* Slider track + thumbs */}
      <div className="relative w-full max-w-full overflow-hidden h-6 flex items-center mb-4">
        {" "}
        {/* Base track */}
        <div className="absolute inset-x-0 h-[3px] rounded-full bg-gray-200" />
        {/* Active fill */}
        <div
          className="absolute h-[3px] rounded-full bg-gray-900"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={500}
          value={minVal}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), maxVal - 500);
            setMinVal(val);
            setPriceRange([val, maxVal]);
          }}
          className="price-thumb absolute inset-x-0 w-full h-[3px] appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: minVal > MAX - 1000 ? 5 : 3 }}
        />
        {/* Max thumb */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={500}
          value={maxVal}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), minVal + 500);
            setMaxVal(val);
            setPriceRange([minVal, val]);
          }}
          className="price-thumb absolute inset-x-0 w-full h-[3px] appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Value labels */}
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-md py-1.5 px-2 text-xs font-medium text-gray-900 text-center truncate">
          {formatPrice(minVal)}
        </div>
        <span className="text-xs text-gray-400 shrink-0">—</span>
        <div className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-md py-1.5 px-2 text-xs font-medium text-gray-900 text-center truncate">
          {formatPrice(maxVal)}
        </div>
      </div>

      <style>{`
        .price-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #111827;
          border: 2.5px solid #fff;
          box-shadow: 0 1px 6px rgba(0,0,0,0.25);
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          touch-action: pan-x;
        }
        .price-thumb::-webkit-slider-thumb:hover,
        .price-thumb:active::-webkit-slider-thumb {
          transform: scale(1.2);
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .price-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #111827;
          border: 2.5px solid #fff;
          box-shadow: 0 1px 6px rgba(0,0,0,0.25);
          cursor: pointer;
        }
        /* Remove default focus outline on range in Firefox */
        .price-thumb:focus { outline: none; }
        .price-thumb:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default ProductPriceFilter;
