import { useState, useCallback } from "react";

const ProductPriceFilter = () => {
  const MIN = 0;
  const MAX = 35000;
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(35000);

  const getPercent = useCallback((value) => Math.round(((value - MIN) / (MAX - MIN)) * 100), []);

  const formatPrice = (val) => `$ ${val.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  return (
    <div className="bg-white  p-5 mx-8 ">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-900 tracking-tight">Price Range</span>
        <span className="text-xs font-medium text-gray-400">${MAX.toLocaleString()}</span>
      </div>

      <div className="relative h-7 flex items-center">
        <div className="absolute left-0 right-0 h-1 rounded-full bg-gray-200" />

        <div
          className="absolute h-1 rounded-full bg-gray-900 transition-all duration-75"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={100}
          value={minVal}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), maxVal - 100);
            setMinVal(val);
          }}
          className="range-thumb absolute w-full h-1 appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: minVal > MAX - 1000 ? 5 : 3 }}
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={100}
          value={maxVal}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), minVal + 100);
            setMaxVal(val);
          }}
          className="range-thumb absolute w-full h-1 appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Value labels */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-2.5 text-xs font-medium text-gray-900 text-center">
          {formatPrice(minVal)}
        </div>
        <span className="text-xs text-gray-400 font-medium">To</span>
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-2.5 text-xs font-medium text-gray-900 text-center">
          {formatPrice(maxVal)}
        </div>
      </div>

      <style>{`
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #111827;
          border: 2.5px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .range-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
        .range-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #111827;
          border: 2.5px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ProductPriceFilter;
