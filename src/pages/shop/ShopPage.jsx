import React, { useEffect, useMemo, useState } from "react";
import ShopPageHeader from "../../components/shop/ShopPageHeader";
import FiltersSection from "../../components/shop/FiltersSection";
import ProductPriceFilter from "../../components/shop/ProductPriceFilter";
import ShippingDetails from "../../components/shop/ShippingDetails";
import ProductsGrid from "../../components/shop/ProductsGrid";
import SearchBox from "../../components/shop/SearchBox";
import CategoryTabs from "../../components/shop/CategoryTabs";
import { useLocation } from "react-router-dom";
import { FiSliders, FiX, FiAlertCircle } from "react-icons/fi";
import { useProducts } from "../../hooks/useProducts";

const PAGE_SIZE = 12;

const ShopPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const location = useLocation();
  const categoryData = location.state?.category;

  const [showIntro, setShowIntro] = useState(!!categoryData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);

  // ── Filters & Sort state (owned here, passed down as props) ──────────────
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [activeCategory, setActiveCategory] = useState("all");
  const [collection, setCollection] = useState("all"); // best-seller | featured | new | all
  const [priceRange, setPriceRange] = useState([0, 999999]);

  const { products, loading, error, categories } = useProducts();

  // ── Derived: filtered + sorted products ─────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...products];

    // Category tab
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Collection filter
    if (collection === "featured") list = list.filter((p) => p.is_featured);
    if (collection === "best-seller") list = list.filter((p) => p.is_best_seller);
    if (collection === "new") {
      // Sort by newest and take top 30% or at least 6
      list = [...list].sort(
        (a, b) => new Date(b.created_at ?? 0) - new Date(a.created_at ?? 0),
      );
    }

    // Price range
    list = list.filter(
      (p) => p._rawPrice >= priceRange[0] && p._rawPrice <= priceRange[1],
    );

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Sort
    if (sort === "price-asc") list.sort((a, b) => a._rawPrice - b._rawPrice);
    if (sort === "price-desc") list.sort((a, b) => b._rawPrice - a._rawPrice);
    if (sort === "newest")
      list.sort((a, b) => new Date(b.created_at ?? 0) - new Date(a.created_at ?? 0));
    if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [products, activeCategory, collection, priceRange, search, sort]);

  // Reset pagination whenever filter changes
  useEffect(() => { setPage(1); }, [search, sort, activeCategory, collection, priceRange]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const resetFilters = () => {
    setSearch("");
    setSort("default");
    setActiveCategory("all");
    setCollection("all");
    setPriceRange([0, 999999]);
    setPage(1);
  };

  const filterProps = { collection, setCollection, resetFilters };
  const priceProps = { priceRange, setPriceRange };

  return (
    <div className="max-w-[1700px] mx-auto bg-white pb-14">
      {/* Category intro modal */}
      {showIntro && categoryData && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-6 font-[Bayon]">
          <div className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden relative">
            <button onClick={() => setShowIntro(false)} className="absolute top-4 right-4 text-xl z-10">✕</button>
            <div className="bg-gray-100 flex items-center justify-center p-6 sm:p-10">
              <img src={categoryData.img} className="h-[140px] sm:h-[180px] md:h-[220px] object-contain" />
            </div>
            <div className="p-6 sm:p-8 text-center space-y-4">
              <h2 className="text-xl sm:text-2xl tracking-widest font-[Bayon]">{categoryData.title}</h2>
              <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">{categoryData.desc}</p>
              <button onClick={() => setShowIntro(false)} className="bg-[#F5C518] px-6 sm:px-8 py-3 text-sm">
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      )}

      <ShopPageHeader />

      {/* Mobile: Filter toggle */}
      <div className="lg:hidden flex justify-end px-4 py-3 border-b border-gray-200">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 rounded"
        >
          <FiSliders size={14} /> Filters
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-white w-[300px] max-w-[85vw] h-full overflow-y-auto z-10">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-semibold tracking-widest text-sm">FILTERS</h3>
              <button onClick={() => setSidebarOpen(false)}><FiX size={20} /></button>
            </div>
            <FiltersSection {...filterProps} />
            <ProductPriceFilter {...priceProps} />
            <ShippingDetails />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-full lg:w-[360px] border-r border-t border-gray-200 lg:sticky lg:top-0 h-fit">
          <FiltersSection {...filterProps} />
          <ProductPriceFilter {...priceProps} />
          <ShippingDetails />
        </aside>

        <main className="flex-1 min-w-0">
          {/* Category tabs */}
          <div className="border-b border-t border-gray-200 px-4 sm:px-6 py-5 overflow-hidden">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          {/* Search + Sort */}
          <div className="flex justify-end px-4 sm:px-6 py-5">
            <SearchBox search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
          </div>

          {/* Result count */}
          {!loading && !error && (
            <div className="px-4 sm:px-6 pb-2">
              <p className="text-xs text-gray-400 tracking-wide">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
                {search && ` for "${search}"`}
              </p>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-100 animate-pulse rounded h-[340px]" />
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex items-center gap-2 text-red-500 text-sm px-6 py-8">
              <FiAlertCircle size={16} /> {error}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-6">
              <p className="text-gray-400 text-sm">No products match your filters.</p>
              <button
                onClick={resetFilters}
                className="text-xs tracking-widest underline text-gray-500 hover:text-black"
              >
                Reset all filters
              </button>
            </div>
          )}

          {/* Product grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="py-1">
              <ProductsGrid products={paginated} />
            </div>
          )}

          {/* Load more */}
          {!loading && hasMore && (
            <div className="flex justify-center py-10">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="bg-[#FFCA0A] font-[inter] text-black px-6 py-3 cursor-pointer"
              >
                Load More
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
