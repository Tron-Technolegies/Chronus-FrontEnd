import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiAlertCircle, FiSliders, FiX } from "react-icons/fi";

import CategoryTabs from "../../components/shop/CategoryTabs";
import FiltersSection from "../../components/shop/FiltersSection";
import ProductPriceFilter from "../../components/shop/ProductPriceFilter";
import ProductsGrid from "../../components/shop/ProductsGrid";
import SearchBox from "../../components/shop/SearchBox";
import ShippingDetails from "../../components/shop/ShippingDetails";
import ShopPageHeader from "../../components/shop/ShopPageHeader";
import SubcategoryFilter from "../../components/shop/SubcategoryFilter";
import SubcategorySelectModal from "../../components/shop/SubcategorySelectModal";

import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProducts";
import { extractHisHerSubcategories } from "../../utils/shopSubcategories";

const PAGE_SIZE = 12;
const normalizeFilterValue = (value) => {
  if (!value || value === "all") return null;
  if (/^\d+$/.test(String(value))) return String(value);
  return String(value).replace(/-/g, " ").trim();
};

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get("category");
  const typeParam = searchParams.get("type");
  const subcategoryParam = searchParams.get("subcategory");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [collection, setCollection] = useState("all");
  const [priceRangeDraft, setPriceRangeDraft] = useState([0, 100000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 100000]);
  const [dismissSubcategoryModal, setDismissSubcategoryModal] = useState(false);

  const { categories } = useCategories();

  const selectedCategory = categoryParam
    ? normalizeFilterValue(categoryParam)
    : activeCategory === "all"
      ? null
      : normalizeFilterValue(activeCategory);
  const selectedSubcategory =
    categoryParam && !typeParam && activeSubcategory !== "all"
      ? normalizeFilterValue(activeSubcategory)
      : null;

  const { products, loading, error, subcategories, hasMore, totalCount } = useProducts({
    category: selectedCategory,
    type: typeParam,
    subcategory: selectedSubcategory,
    search: appliedSearch,
    sort,
    minPrice: appliedPriceRange[0],
    maxPrice: appliedPriceRange[1],
    page,
    pageSize: PAGE_SIZE,
    append: page > 1,
  });

  const hisHerSubcategories = useMemo(
    () => extractHisHerSubcategories(subcategories),
    [subcategories],
  );

  const hasHisHerContext = hisHerSubcategories.length > 0;
  const subcategoryOptions = hasHisHerContext ? hisHerSubcategories : subcategories;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!categoryParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSubcategory("all");
      return;
    }

    setActiveSubcategory(typeParam ?? subcategoryParam ?? "all");
  }, [categoryParam, typeParam, subcategoryParam]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [appliedSearch, sort, typeParam, activeCategory, activeSubcategory, collection, appliedPriceRange]);

  const handleSearchApply = () => {
    setAppliedSearch(searchInput.trim());
  };

  const handlePriceApply = () => {
    setAppliedPriceRange([...priceRangeDraft]);
  };

  const handleSubcategoryChange = (value) => {
    setActiveSubcategory(value);

    if (!categoryParam) return;

    const params = new URLSearchParams(searchParams);

    if (hasHisHerContext) {
      value === "all" ? params.delete("type") : params.set("type", value);
      params.delete("subcategory");
    } else {
      params.delete("type");
      value === "all" ? params.delete("subcategory") : params.set("subcategory", value);
    }

    setSearchParams(params);
  };

  const shouldShowModal =
    Boolean(categoryParam) &&
    !typeParam &&
    !loading &&
    hasHisHerContext &&
    !dismissSubcategoryModal;

  const categoryName = useMemo(() => {
    if (!categoryParam) return null;
    return products[0]?.categoryName ?? null;
  }, [categoryParam, products]);

  const typeLabel =
    typeParam === "his" ? "His Collection" : typeParam === "her" ? "Her Collection" : null;

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (collection === "featured") list = list.filter((p) => p.is_featured);
    if (collection === "best-seller") list = list.filter((p) => p.is_best_seller);

    if (collection === "new") {
      list = [...list].sort((a, b) => new Date(b.created_at ?? 0) - new Date(a.created_at ?? 0));
    }

    return list;
  }, [products, collection]);

  const resetFilters = () => {
    setSearchInput("");
    setAppliedSearch("");
    setSort("default");
    setActiveCategory("all");
    setActiveSubcategory("all");
    setCollection("all");
    setPriceRangeDraft([0, 100000]);
    setAppliedPriceRange([0, 100000]);
    setPage(1);
  };

  return (
    <div className="max-w-[1700px] mx-auto bg-white pb-16 px-3 sm:px-6">
      {shouldShowModal && (
        <SubcategorySelectModal
          categorySlug={categoryParam}
          categoryName={categoryName}
          subcategories={hisHerSubcategories}
          onClose={() => setDismissSubcategoryModal(true)}
        />
      )}

      <ShopPageHeader categoryName={categoryName} typeLabel={typeLabel} />

      <div className="lg:hidden flex justify-end px-4 py-3 border-b border-gray-200">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 rounded"
        >
          <FiSliders size={14} /> Filters
        </button>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-white w-[85vw] max-w-[340px] h-full overflow-y-auto z-10">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-semibold text-sm tracking-widest">FILTERS</h3>
              <button onClick={() => setSidebarOpen(false)}>
                <FiX size={20} />
              </button>
            </div>

            <FiltersSection
              collection={collection}
              setCollection={setCollection}
              resetFilters={resetFilters}
            />

            <ProductPriceFilter
              priceRange={priceRangeDraft}
              setPriceRange={setPriceRangeDraft}
              onApply={handlePriceApply}
            />

            <ShippingDetails />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        <aside className="hidden lg:block w-full lg:w-[300px] xl:w-[340px] border-r border-gray-200 lg:sticky lg:top-24 h-fit">
          <FiltersSection
            collection={collection}
            setCollection={setCollection}
            resetFilters={resetFilters}
          />

          <ProductPriceFilter
            priceRange={priceRangeDraft}
            setPriceRange={setPriceRangeDraft}
            onApply={handlePriceApply}
          />

          <ShippingDetails />
        </aside>

        <main className="flex-1 min-w-0">
          {!categoryParam && (
            <div className="border-b border-t border-gray-200 px-4 sm:px-6 py-5 overflow-x-auto">
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
          )}

          {categoryParam && subcategoryOptions.length > 0 && (
            <SubcategoryFilter
              subcategories={subcategoryOptions}
              activeSubcategory={activeSubcategory}
              setActiveSubcategory={handleSubcategoryChange}
            />
          )}

          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 px-4 sm:px-6 py-5">
            <SearchBox
              search={searchInput}
              setSearch={setSearchInput}
              onSearch={handleSearchApply}
              sort={sort}
              setSort={setSort}
            />
          </div>

          {!loading && !error && (
            <div className="px-4 sm:px-6 pb-2">
              <p className="text-xs text-gray-400 tracking-wide">
                {totalCount} product{totalCount !== 1 ? "s" : ""} found
              </p>
            </div>
          )}

          {loading && page === 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-100 animate-pulse rounded h-[340px]" />
              ))}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm px-6 py-8">
              <FiAlertCircle size={16} /> {error}
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && <ProductsGrid products={filteredProducts} />}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center py-24 gap-4 text-center px-6">
              <p className="text-gray-400 text-sm">No products match your filters.</p>
              <button
                onClick={resetFilters}
                className="text-xs tracking-widest underline text-gray-500 hover:text-black"
              >
                Reset Filters
              </button>
            </div>
          )}

          {!loading && !error && hasMore && (
            <div className="flex justify-center py-10">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="bg-[#FFCA0A] text-black px-6 py-3"
              >
                Load More
              </button>
            </div>
          )}

          {loading && page > 1 && (
            <div className="flex justify-center py-6 text-sm text-gray-500">Loading more products...</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
