import React, { useEffect, useMemo, useState } from "react";
import ShopPageHeader from "../../components/shop/ShopPageHeader";
import FiltersSection from "../../components/shop/FiltersSection";
import ProductPriceFilter from "../../components/shop/ProductPriceFilter";
import ShippingDetails from "../../components/shop/ShippingDetails";
import ProductsGrid from "../../components/shop/ProductsGrid";
import SearchBox from "../../components/shop/SearchBox";
import CategoryTabs from "../../components/shop/CategoryTabs";
import SubcategoryFilter from "../../components/shop/SubcategoryFilter";
import SubcategorySelectModal from "../../components/shop/SubcategorySelectModal";
import { useSearchParams } from "react-router-dom";
import { FiSliders, FiX, FiAlertCircle } from "react-icons/fi";
import { useProducts } from "../../hooks/useProducts";

const PAGE_SIZE = 12;

const ShopPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // ── URL params: ?category=<id>&type=his|her ──────────────────────────────
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") ?? null;
  const typeParam = searchParams.get("type") ?? null; // "his" | "her" | null

  // Human-readable label shown in the header
  const typeLabel =
    typeParam === "his"
      ? "His Collection"
      : typeParam === "her"
      ? "Her Collection"
      : null;

  // Show subcategory selector when: we're in category mode, no type chosen yet
  const [showSubModal, setShowSubModal] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);

  // ── Filters & Sort state ─────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [collection, setCollection] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 999999]);

  // Reset subcategory when category or type changes
  useEffect(() => { setActiveSubcategory("all"); }, [categoryParam, typeParam]);

  const handleSubcategoryChange = (nextValue) => {
    if (!categoryParam) {
      setActiveSubcategory(nextValue);
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    if (nextValue === "all") {
      nextParams.delete("type");
    } else {
      nextParams.set("type", nextValue);
    }
    setSearchParams(nextParams);
  };

  const subcategoryActiveValue = categoryParam ? typeParam ?? "all" : activeSubcategory;
  const hasTypeSwitchContext =
    typeParam === "his" ||
    typeParam === "her" ||
    subcategories.some((s) => ["his", "her"].includes(String(s.slug).toLowerCase()));

  const subcategoryOptions = hasTypeSwitchContext
    ? [
        { id: "his", name: "His", slug: "his" },
        { id: "her", name: "Her", slug: "her" },
      ]
    : subcategories;

  const { products, loading, error, categories, subcategories } = useProducts(
    categoryParam ? { category: categoryParam, type: typeParam } : { type: typeParam },
  );

  // Once products load, show subcategory selector if category has subcategories and no type selected
  useEffect(() => {
    if (categoryParam && !typeParam && !loading && subcategories.length > 0) {
      setShowSubModal(true);
    } else {
      setShowSubModal(false);
    }
  }, [categoryParam, typeParam, loading, subcategories.length]);

  // When we're in category mode, derive the category name from the first product
  const categoryName = useMemo(() => {
    if (!categoryParam) return null;
    return products[0]?.categoryName ?? null;
  }, [categoryParam, products]);

  // ── Derived: filtered + sorted products ─────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...products];

    // Category tab (only in global mode)
    if (!categoryParam && activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // ?type=his|her  — applied before any other subcategory filter
    if (typeParam) {
      list = list.filter(
        (p) => p.subcategory?.toLowerCase() === typeParam.toLowerCase()
      );
    }

    // Subcategory filter pill (only in category mode, when no type param)
    if (categoryParam && !typeParam && activeSubcategory !== "all") {
      list = list.filter((p) => p.subcategory === activeSubcategory);
    }

    // Collection filter
    if (collection === "featured") list = list.filter((p) => p.is_featured);
    if (collection === "best-seller") list = list.filter((p) => p.is_best_seller);
    if (collection === "new") {
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
  }, [products, categoryParam, typeParam, activeCategory, activeSubcategory, collection, priceRange, search, sort]);

  // Reset pagination whenever filters change
  useEffect(() => { setPage(1); }, [search, sort, typeParam, activeCategory, activeSubcategory, collection, priceRange]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const resetFilters = () => {
    setSearch("");
    setSort("default");
    setActiveCategory("all");
    setActiveSubcategory("all");
    setCollection("all");
    setPriceRange([0, 999999]);
    setPage(1);
  };

  const filterProps = { collection, setCollection, resetFilters };
  const priceProps = { priceRange, setPriceRange };

  return (
    <div className="max-w-[1700px] mx-auto bg-white pb-14">
      {/* Subcategory selector — shown when entering a category with His/Her products */}
      {showSubModal && (
        <SubcategorySelectModal
          categorySlug={categoryParam}
          categoryName={categoryName}
          subcategories={subcategories}
          onClose={() => setShowSubModal(false)}
        />
      )}

      <ShopPageHeader categoryName={categoryName} typeLabel={typeLabel} />

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
          {/* Category tabs — only shown in global shop mode */}
          {!categoryParam && (
            <div className="border-b border-t border-gray-200 px-4 sm:px-6 py-5 overflow-hidden">
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
          )}

          {/* Subcategory filter — only shown in category mode, auto-hides when empty */}
          {categoryParam && (
            <SubcategoryFilter
              subcategories={subcategoryOptions}
              activeSubcategory={subcategoryActiveValue}
              setActiveSubcategory={handleSubcategoryChange}
            />
          )}

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

