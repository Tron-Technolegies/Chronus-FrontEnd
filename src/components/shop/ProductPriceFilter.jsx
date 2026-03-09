import { useCallback, useRef } from "react";

const STEP = 500;

const ProductPriceFilter = ({ priceRange, setPriceRange, min = 0, max = 100000 }) => {
  const dragRef = useRef(null);

  const clamp = useCallback((value, lower, upper) => Math.min(Math.max(value, lower), upper), []);
  const toStep = useCallback((value) => Math.round(value / STEP) * STEP, []);

  const minVal = clamp(priceRange?.[0] ?? min, min, max - STEP);
  const maxVal = clamp(priceRange?.[1] ?? max, minVal + STEP, max);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  const formatPrice = (val) =>
    `$${Number(val).toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  const updateMin = useCallback(
    (value) => {
      const nextMin = clamp(toStep(value), min, maxVal - STEP);
      setPriceRange([nextMin, maxVal]);
    },
    [clamp, maxVal, min, setPriceRange, toStep],
  );

  const updateMax = useCallback(
    (value) => {
      const nextMax = clamp(toStep(value), minVal + STEP, max);
      setPriceRange([minVal, nextMax]);
    },
    [clamp, max, minVal, setPriceRange, toStep],
  );

  const startNumberDrag = useCallback(
    (e, target) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;

      dragRef.current = {
        target,
        startX: e.clientX,
        startMin: minVal,
        startMax: maxVal,
      };

      const onMove = (moveEvent) => {
        if (!dragRef.current) return;

        const deltaX = moveEvent.clientX - dragRef.current.startX;
        const offset = Math.round(deltaX / 8) * STEP;

        if (dragRef.current.target === "min") {
          updateMin(dragRef.current.startMin + offset);
          return;
        }

        updateMax(dragRef.current.startMax + offset);
      };

      const onUp = () => {
        dragRef.current = null;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [maxVal, minVal, updateMax, updateMin],
  );

  return (
    <div className="w-full px-4 md:px-5 py-5 border-b border-gray-200 lg:sticky lg:top-24">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-900">Price Range</span>
        <span className="text-xs text-gray-400">{formatPrice(max)}</span>
      </div>

      <div className="relative w-full h-6 flex items-center mb-4">
        <div className="absolute w-full h-[3px] bg-gray-200 rounded-full" />

        <div
          className="absolute h-[3px] bg-gray-900 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={STEP}
          value={minVal}
          onChange={(e) => updateMin(Number(e.target.value))}
          className="price-thumb absolute w-full appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: minVal > max - STEP * 2 ? 5 : 3 }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={STEP}
          value={maxVal}
          onChange={(e) => updateMax(Number(e.target.value))}
          className="price-thumb absolute w-full appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: 4 }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-2">
        <label className="text-[11px] text-gray-500 uppercase tracking-wide flex flex-col gap-1">
          Min
          <input
            type="number"
            min={min}
            max={maxVal - STEP}
            step={STEP}
            value={minVal}
            onChange={(e) => updateMin(Number(e.target.value))}
            onPointerDown={(e) => startNumberDrag(e, "min")}
            className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 text-xs sm:text-sm text-center touch-none"
          />
        </label>

        <span className="hidden sm:inline text-xs text-gray-400">-</span>

        <label className="text-[11px] text-gray-500 uppercase tracking-wide flex flex-col gap-1">
          Max
          <input
            type="number"
            min={minVal + STEP}
            max={max}
            step={STEP}
            value={maxVal}
            onChange={(e) => updateMax(Number(e.target.value))}
            onPointerDown={(e) => startNumberDrag(e, "max")}
            className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 text-xs sm:text-sm text-center touch-none"
          />
        </label>
      </div>

      <style>{`
        .price-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #111827;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .price-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .price-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #111827;
          border: 2px solid white;
          cursor: pointer;
        }

        .price-thumb:focus {
          outline: none;
        }

        .price-thumb {
          touch-action: none;
        }
      `}</style>
    </div>
  );
};

export default ProductPriceFilter;
