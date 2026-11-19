import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../hooks/useProducts";
import ProductsGrid from "../shop/ProductsGrid";

const MAX_ITEMS = 6;
const FETCH_SIZE = 500;
const AUTO_ROTATE_MS = 3000;

export default function HomeCollections() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  const { products = [], loading, error } = useProducts({
    category: null,
    subcategory: null,
    search: null,
    minPrice: null,
    maxPrice: null,
    page: 1,
    pageSize: FETCH_SIZE,
  });

  const featured = useMemo(
    () => products.filter((p) => p.is_featured).slice(0, MAX_ITEMS),
    [products],
  );

  const count = featured.length;

  const rotate = (direction) => {
    if (count === 0) return;
    setActive((prev) => (prev + direction + count) % count);
  };

  // Auto-rotate (skipped for reduced-motion users or when there are too few items)
  useEffect(() => {
    if (count < 4) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      if (!pausedRef.current) rotate(1);
    }, AUTO_ROTATE_MS);

    return () => clearInterval(id);
  }, [count]);

  if (loading || error || count === 0) return null;

  // Position of item i relative to the active (center) item, wrapped around
  const getOffset = (i) => {
    let offset = (i - active + count) % count;
    if (offset > count / 2) offset -= count;
    return offset;
  };

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <section className="py-20 px-6 md:px-[6%]">
      <div className="text-center mb-6">
        <h2 className="text-4xl tracking-wide font-[Bastoni]">
          {t("shop.filters_section.featured")}
        </h2>
      </div>

      <div
        className="relative"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        onFocus={pause}
        onBlur={resume}
      >
        <button
          type="button"
          onClick={() => rotate(-1)}
          aria-label="Previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#3d1613] text-off-white border-2 border-[#b8964c] flex items-center justify-center hover:bg-[#b8964c] hover:text-[#3d1613] transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* All slides share one grid cell; each is shifted left/right by its offset */}
        <div className="grid overflow-hidden py-10">
          {featured.map((product, i) => {
            const offset = getOffset(i);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            return (
              <div
                key={product.id}
                className="col-start-1 row-start-1 w-1/3 justify-self-center px-1 sm:px-3 transition-all duration-700 ease-in-out [&>div]:!grid-cols-1"
                style={{
                  transform: `translateX(${offset * 100}%) scale(${isCenter ? 1.12 : 0.88})`,
                  opacity: isCenter ? 1 : isVisible ? 0.65 : 0,
                  zIndex: isCenter ? 20 : isVisible ? 10 : 0,
                  pointerEvents: isVisible ? "auto" : "none",
                  filter: isCenter ? "drop-shadow(0 12px 24px rgba(61,22,19,0.35))" : "none",
                }}
                aria-hidden={!isVisible}
              >
                <ProductsGrid products={[product]} />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => rotate(1)}
          aria-label="Next"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#3d1613] text-off-white border-2 border-[#b8964c] flex items-center justify-center hover:bg-[#b8964c] hover:text-[#3d1613] transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="text-center mt-6">
        <Link
          to="/shop?collection=featured"
          className="text-sm underline text-[#3D1613] hover:opacity-70 transition"
        >
          {t("home.collections.view_all", "View all")}
        </Link>
      </div>
    </section>
  );
}