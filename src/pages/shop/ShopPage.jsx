// import { useCallback, useEffect, useMemo, useState } from "react";
// import { FiAlertCircle, FiSliders, FiX } from "react-icons/fi";
// import { useSearchParams } from "react-router-dom";

// import { useProducts } from "../../hooks/useProducts";
// import { useCategories } from "../../hooks/useCategories";

// import ProductsGrid from "../../components/shop/ProductsGrid";
// import CategoryTabs from "../../components/shop/CategoryTabs";
// import SubcategoryFilter from "../../components/shop/SubcategoryFilter";
// import ShopPageHeader from "../../components/shop/ShopPageHeader";
// import ShopToolbar from "../../components/shop/ShopToolbar";
// import ShopSidebar from "../../components/shop/ShopSidebar";
// import Loader from "../../components/ui/Loader";

// import { fetchCategoryHisHerSubcategories } from "../../utils/fetchCategoryHisHerSubcategories";
// import { extractHisHerSubcategories } from "../../utils/shopSubcategories";
// import { useTranslation } from "react-i18next";

// const PAGE_SIZE = 12;
// const DEFAULT_PRICE_RANGE = [0, 100000];

// const parseIdParam = (value) => {
//   const parsed = Number(value);
//   return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
// };

// const parsePageParam = (value) => {
//   const parsed = Number(value);
//   return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
// };

// const parsePriceParam = (value) => {
//   if (value === null || value === undefined || value === "") return null;

//   const parsed = Number(value);
//   return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
// };

// const ShopPage = () => {
//   /* Scroll to top on page load */
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const { t } = useTranslation();

//   const [searchParams, setSearchParams] = useSearchParams();

//   const categoryParam = searchParams.get("category");
//   const subcategoryParam = searchParams.get("subcategory");
//   const typeParam = searchParams.get("type");
//   const searchParam = searchParams.get("search") ?? "";
//   const page = parsePageParam(searchParams.get("page"));

//   const activeCategory = parseIdParam(categoryParam);
//   const activeSubcategory = parseIdParam(subcategoryParam);
//   const minPriceParam = parsePriceParam(searchParams.get("min_price"));
//   const maxPriceParam = parsePriceParam(searchParams.get("max_price"));
//   const hasInvalidPriceRange =
//     minPriceParam !== null && maxPriceParam !== null && maxPriceParam <= minPriceParam;
//   const minPrice = hasInvalidPriceRange ? null : minPriceParam;
//   const maxPrice = hasInvalidPriceRange ? null : maxPriceParam;

//   const [searchInput, setSearchInput] = useState(searchParam);
//   const [priceRangeDraft, setPriceRangeDraft] = useState([
//     minPrice ?? DEFAULT_PRICE_RANGE[0],
//     maxPrice ?? DEFAULT_PRICE_RANGE[1],
//   ]);

//   const [collection, setCollection] = useState("all");

//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { categories } = useCategories();

//   const updateSearchParamValues = useCallback(
//     (updates, { resetPage = false, replace = false } = {}) => {
//       const nextParams = new URLSearchParams(searchParams);

//       Object.entries(updates).forEach(([key, value]) => {
//         if (value === null || value === undefined || value === "") {
//           nextParams.delete(key);
//           return;
//         }

//         nextParams.set(key, String(value));
//       });

//       if (resetPage) {
//         nextParams.delete("page");
//       }

//       setSearchParams(nextParams, { replace });
//     },
//     [searchParams, setSearchParams],
//   );

//   const shouldResolveType = Boolean(activeCategory && typeParam);

//   const { products, loading, error, pagination, subcategories, totalCount } = useProducts({
//     category: activeCategory,
//     subcategory: activeSubcategory,
//     search: searchParam || null,
//     minPrice,
//     maxPrice,
//     page,
//     pageSize: PAGE_SIZE,
//     enabled: !shouldResolveType,
//   });

//   useEffect(() => {
//     setSearchInput(searchParam);
//   }, [searchParam]);

//   useEffect(() => {
//     setPriceRangeDraft([
//       minPrice ?? DEFAULT_PRICE_RANGE[0],
//       maxPrice ?? DEFAULT_PRICE_RANGE[1],
//     ]);
//   }, [maxPrice, minPrice]);

//   useEffect(() => {
//     if (!hasInvalidPriceRange) return;

//     updateSearchParamValues(
//       {
//         min_price: null,
//         max_price: null,
//       },
//       { replace: true },
//     );
//   }, [hasInvalidPriceRange, updateSearchParamValues]);

//   /* Handle search */
//   const handleSearchApply = () => {
//     updateSearchParamValues({ search: searchInput.trim() }, { resetPage: true });
//   };

//   /* Apply price filter */
//   const handlePriceApply = () => {
//     const nextMinPrice = Math.max(
//       DEFAULT_PRICE_RANGE[0],
//       Number.isFinite(Number(priceRangeDraft[0])) ? Number(priceRangeDraft[0]) : DEFAULT_PRICE_RANGE[0],
//     );
//     const nextMaxPrice = Math.min(
//       DEFAULT_PRICE_RANGE[1],
//       Number.isFinite(Number(priceRangeDraft[1]))
//         ? Number(priceRangeDraft[1])
//         : DEFAULT_PRICE_RANGE[1],
//     );

//     updateSearchParamValues(
//       {
//         min_price: nextMinPrice > DEFAULT_PRICE_RANGE[0] ? nextMinPrice : null,
//         max_price: nextMaxPrice < DEFAULT_PRICE_RANGE[1] ? nextMaxPrice : null,
//       },
//       { resetPage: true },
//     );
//   };

//   /* Reset filters */
//   const resetFilters = () => {
//     setSearchInput("");
//     setCollection("all");
//     setPriceRangeDraft([...DEFAULT_PRICE_RANGE]);
//     setSearchParams(new URLSearchParams());
//   };

//   const [cachedSubcategories, setCachedSubcategories] = useState([]);

//   useEffect(() => {
//     if (!activeSubcategory && subcategories.length > 0) {
//       setCachedSubcategories(subcategories);
//     }
//   }, [activeSubcategory, subcategories]);

//   useEffect(() => {
//     setCachedSubcategories([]);
//   }, [activeCategory]);

//   const selectedCategory = categories.find((c) => c.id === activeCategory);
//   const selectedCategorySubcategories = useMemo(() => {
//     const dynamicSubs = cachedSubcategories.length > 0 ? cachedSubcategories : subcategories;

//     if (activeCategory) {
//       const categorySubs = selectedCategory?.subcategories ?? [];
//       if (categorySubs.length) return categorySubs;
//       return dynamicSubs;
//     }

//     const allSubs = [];
//     categories.forEach((c) => {
//       c.subcategories?.forEach((sub) => {
//         if (!allSubs.find((s) => s.id === sub.id)) {
//           allSubs.push(sub);
//         }
//       });
//     });

//     if (allSubs.length > 0) return allSubs;
//     return dynamicSubs;
//   }, [activeCategory, selectedCategory?.subcategories, subcategories, categories, cachedSubcategories]);
//   const selectedSubcategory = selectedCategorySubcategories.find(
//     (subcategory) => subcategory.id === activeSubcategory,
//   );

//   const typeSubcategories = useMemo(
//     () => extractHisHerSubcategories(selectedCategorySubcategories),
//     [selectedCategorySubcategories],
//   );

//   useEffect(() => {
//     if (!shouldResolveType) return undefined;

//     const localMatch = typeSubcategories.find((subcategory) => subcategory.slug === typeParam);
//     if (localMatch?.id) {
//       updateSearchParamValues(
//         {
//           category: activeCategory,
//           subcategory: localMatch.id,
//           type: null,
//         },
//         { resetPage: true, replace: true },
//       );
//       return undefined;
//     }

//     let cancelled = false;

//     const resolveTypeToSubcategory = async () => {
//       try {
//         const subs = await fetchCategoryHisHerSubcategories(activeCategory);
//         if (cancelled) return;

//         const match = subs.find((subcategory) => subcategory.slug === typeParam);

//         if (match?.id) {
//           updateSearchParamValues(
//             {
//               category: activeCategory,
//               subcategory: match.id,
//               type: null,
//             },
//             { resetPage: true, replace: true },
//           );
//           return;
//         }

//         updateSearchParamValues({ type: null }, { replace: true });
//       } catch (err) {
//         if (!cancelled) {
//           console.error("Failed to resolve subcategory", err);
//           updateSearchParamValues({ type: null }, { replace: true });
//         }
//       }
//     };

//     resolveTypeToSubcategory();

//     return () => {
//       cancelled = true;
//     };
//   }, [
//     activeCategory,
//     shouldResolveType,
//     typeParam,
//     typeSubcategories,
//     updateSearchParamValues,
//   ]);

//   const categoryName = selectedCategory?.name ?? null;
//   let typeLabel = null;

//   if (selectedSubcategory?.slug === "his") typeLabel = t("shop.his_collection");
//   if (selectedSubcategory?.slug === "her") typeLabel = t("shop.her_collection");

//   const filteredProducts = useMemo(() => {
//     if (collection === "best-seller") {
//       return products.filter((product) => product.is_best_seller);
//     }

//     if (collection === "new") {
//       return products.filter((product) => Boolean(product.created_at));
//     }

//     if (collection === "featured") {
//       return products.filter((product) => product.is_featured);
//     }

//     return products;
//   }, [collection, products]);

//   const visibleProductCount = collection === "all" ? totalCount : filteredProducts.length;

//   return (
//     <div className="max-w-[1700px] mx-auto bg-white pb-16 px-3 sm:px-6">
//       <ShopPageHeader categoryName={categoryName} typeLabel={typeLabel} />
//       {/* Mobile filter button */}
//       <div className="lg:hidden flex justify-end px-4 py-3 border-b border-gray-200">
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 rounded"
//         >
//           <FiSliders size={14} /> {t("shop.filters")}
//         </button>
//       </div>

//       {/* Mobile sidebar */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-50 flex lg:hidden">
//           <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />

//           <div className="relative bg-white w-[80vw] max-w-[340px] h-full overflow-y-auto z-10">
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//               <h3 className="font-semibold text-sm tracking-widest">{t("shop.filters_upper")}</h3>
//               <button onClick={() => setSidebarOpen(false)}>
//                 <FiX size={20} />
//               </button>
//             </div>

//             <ShopSidebar
//               collection={collection}
//               setCollection={setCollection}
//               resetFilters={resetFilters}
//               priceRangeDraft={priceRangeDraft}
//               setPriceRangeDraft={setPriceRangeDraft}
//               handlePriceApply={handlePriceApply}
//             />
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Desktop sidebar */}
//         <aside className="hidden lg:block w-[300px] xl:w-[340px] border-r border-gray-200 sticky top-24 h-fit">
//           <ShopSidebar
//             collection={collection}
//             setCollection={setCollection}
//             resetFilters={resetFilters}
//             priceRangeDraft={priceRangeDraft}
//             setPriceRangeDraft={setPriceRangeDraft}
//             handlePriceApply={handlePriceApply}
//           />
//         </aside>

//         <main className="flex-1">
//           {/* Category tabs */}
//           <div className="border-b border-t border-gray-200 px-4 sm:px-6 py-5 overflow-x-auto">
//             <CategoryTabs
//               categories={categories}
//               activeCategory={activeCategory}
//               setActiveCategory={(id) => {
//                 updateSearchParamValues(
//                   {
//                     category: id,
//                     subcategory: null,
//                     type: null,
//                   },
//                   { resetPage: true },
//                 );
//               }}
//             />
//           </div>

//           {/* Subcategory filter */}
//           {selectedCategorySubcategories.length > 0 && (
//             <SubcategoryFilter
//               subcategories={selectedCategorySubcategories}
//               activeSubcategory={activeSubcategory}
//               setActiveSubcategory={(id) => {
//                 updateSearchParamValues(
//                   {
//                     subcategory: id,
//                     type: null,
//                   },
//                   { resetPage: true },
//                 );
//               }}
//             />
//           )}

//           {/* Search toolbar */}
//           <ShopToolbar
//             searchInput={searchInput}
//             setSearchInput={setSearchInput}
//             handleSearchApply={handleSearchApply}
//           />

//           {/* Product count */}
//           {!loading && !error && (
//             <div className="px-4 sm:px-6 pb-2">
//               <p className="text-xs text-gray-400 tracking-wide">
//                 {visibleProductCount} {t("shop.products_found")}
//               </p>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && (
//             <div className="py-20">
//               <Loader fullScreen={false} text={t("shop.loading", "Loading...")} size="md" />
//             </div>
//           )}

//           {/* Product grid */}
//           {!loading && !error && filteredProducts.length > 0 && (
//             <ProductsGrid products={filteredProducts} />
//           )}

//           {!loading && !error && filteredProducts.length === 0 && (
//             <div className="px-6 py-8 text-sm text-gray-500">{t("shop.no_products")}</div>
//           )}

//           {/* Error */}
//           {error && (
//             <div className="flex items-center gap-2 text-red-500 text-sm px-6 py-8">
//               <FiAlertCircle size={16} /> {error}
//             </div>
//           )}

//           {/* Pagination */}
//           {!loading && pagination.totalPages > 1 && (
//             <div className="flex justify-center py-10 gap-4">
//               <button
//                 onClick={() =>
//                   updateSearchParamValues({ page: Math.max(1, pagination.currentPage - 1) })
//                 }
//                 disabled={pagination.currentPage === 1}
//                 className="border border-gray-300 px-4 py-2 text-sm"
//               >
//                 {t("shop.prev")}
//               </button>

//               <span className="text-sm text-gray-500">
//                 {t("shop.page_info", { current: pagination.currentPage, total: pagination.totalPages })}
//               </span>

//               <button
//                 onClick={() =>
//                   updateSearchParamValues({
//                     page: Math.min(pagination.totalPages, pagination.currentPage + 1),
//                   })
//                 }
//                 disabled={pagination.currentPage === pagination.totalPages}
//                 className="border border-gray-300 px-4 py-2 text-sm"
//               >
//                 {t("shop.next")}
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ShopPage;


import { useCallback, useEffect, useMemo, useState } from "react";
import { FiAlertCircle, FiSliders, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

import ProductsGrid from "../../components/shop/ProductsGrid";
import CategoryTabs from "../../components/shop/CategoryTabs";
import SubcategoryFilter from "../../components/shop/SubcategoryFilter";
import ShopPageHeader from "../../components/shop/ShopPageHeader";
import ShopToolbar from "../../components/shop/ShopToolbar";
import ShopSidebar from "../../components/shop/ShopSidebar";
import Loader from "../../components/ui/Loader";

import { fetchCategoryHisHerSubcategories } from "../../utils/fetchCategoryHisHerSubcategories";
import { extractHisHerSubcategories } from "../../utils/shopSubcategories";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 12;
const DEFAULT_PRICE_RANGE = [0, 100000];

// CHANGED: when a collection filter or sort is active, load this many products at
// once so the filter can look at the whole catalog, not just one page of 12.
const FETCH_ALL_PAGE_SIZE = 500;

// CHANGED: "New Arrivals" = products added in the last 30 days
const NEW_ARRIVAL_DAYS = 30;

const parseIdParam = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const parsePageParam = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
};

const parsePriceParam = (value) => {
  if (value === null || value === undefined || value === "") return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const isNewArrival = (product) => {
  if (!product.created_at) return false;
  const created = new Date(product.created_at).getTime();
  if (!Number.isFinite(created)) return false;
  return Date.now() - created < NEW_ARRIVAL_DAYS * 24 * 60 * 60 * 1000;
};

const ShopPage = () => {
  /* Scroll to top on page load */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");
  const typeParam = searchParams.get("type");
  const searchParam = searchParams.get("search") ?? "";
  const page = parsePageParam(searchParams.get("page"));

  const activeCategory = parseIdParam(categoryParam);
  const activeSubcategory = parseIdParam(subcategoryParam);
  const minPriceParam = parsePriceParam(searchParams.get("min_price"));
  const maxPriceParam = parsePriceParam(searchParams.get("max_price"));
  const hasInvalidPriceRange =
    minPriceParam !== null && maxPriceParam !== null && maxPriceParam <= minPriceParam;
  const minPrice = hasInvalidPriceRange ? null : minPriceParam;
  const maxPrice = hasInvalidPriceRange ? null : maxPriceParam;

  const [searchInput, setSearchInput] = useState(searchParam);
  const [priceRangeDraft, setPriceRangeDraft] = useState([
    minPrice ?? DEFAULT_PRICE_RANGE[0],
    maxPrice ?? DEFAULT_PRICE_RANGE[1],
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { categories } = useCategories();

  const updateSearchParamValues = useCallback(
    (updates, { resetPage = false, replace = false } = {}) => {
      const nextParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          nextParams.delete(key);
          return;
        }

        nextParams.set(key, String(value));
      });

      if (resetPage) {
        nextParams.delete("page");
      }

      setSearchParams(nextParams, { replace });
    },
    [searchParams, setSearchParams],
  );

  // CHANGED: collection and sort live in the URL, like the other filters
  const collection = searchParams.get("collection") || "all";
  const sort = searchParams.get("sort") || "default";

  const setCollection = (key) =>
    updateSearchParamValues({ collection: key === "all" ? null : key }, { resetPage: true });

  const setSort = (value) =>
    updateSearchParamValues({ sort: value === "default" ? null : value }, { resetPage: true });

  // CHANGED: true when the browser (not the server) has to filter or sort the list
  const isClientFiltered = collection !== "all" || sort !== "default";

  const shouldResolveType = Boolean(activeCategory && typeParam);

  const { products, loading, error, pagination, subcategories, totalCount } = useProducts({
    category: activeCategory,
    subcategory: activeSubcategory,
    search: searchParam || null,
    minPrice,
    maxPrice,
    // CHANGED: when filtering in the browser, load the whole list at once
    page: isClientFiltered ? 1 : page,
    pageSize: isClientFiltered ? FETCH_ALL_PAGE_SIZE : PAGE_SIZE,
    enabled: !shouldResolveType,
  });

  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  useEffect(() => {
    setPriceRangeDraft([
      minPrice ?? DEFAULT_PRICE_RANGE[0],
      maxPrice ?? DEFAULT_PRICE_RANGE[1],
    ]);
  }, [maxPrice, minPrice]);

  useEffect(() => {
    if (!hasInvalidPriceRange) return;

    updateSearchParamValues(
      {
        min_price: null,
        max_price: null,
      },
      { replace: true },
    );
  }, [hasInvalidPriceRange, updateSearchParamValues]);

  /* Handle search */
  const handleSearchApply = () => {
    updateSearchParamValues({ search: searchInput.trim() }, { resetPage: true });
  };

  /* Apply price filter */
  const handlePriceApply = () => {
    const nextMinPrice = Math.max(
      DEFAULT_PRICE_RANGE[0],
      Number.isFinite(Number(priceRangeDraft[0])) ? Number(priceRangeDraft[0]) : DEFAULT_PRICE_RANGE[0],
    );
    const nextMaxPrice = Math.min(
      DEFAULT_PRICE_RANGE[1],
      Number.isFinite(Number(priceRangeDraft[1]))
        ? Number(priceRangeDraft[1])
        : DEFAULT_PRICE_RANGE[1],
    );

    updateSearchParamValues(
      {
        min_price: nextMinPrice > DEFAULT_PRICE_RANGE[0] ? nextMinPrice : null,
        max_price: nextMaxPrice < DEFAULT_PRICE_RANGE[1] ? nextMaxPrice : null,
      },
      { resetPage: true },
    );
  };

  /* Reset filters */
  // CHANGED: clearing the URL also resets collection and sort
  const resetFilters = () => {
    setSearchInput("");
    setPriceRangeDraft([...DEFAULT_PRICE_RANGE]);
    setSearchParams(new URLSearchParams());
  };

  const [cachedSubcategories, setCachedSubcategories] = useState([]);

  useEffect(() => {
    if (!activeSubcategory && subcategories.length > 0) {
      setCachedSubcategories(subcategories);
    }
  }, [activeSubcategory, subcategories]);

  useEffect(() => {
    setCachedSubcategories([]);
  }, [activeCategory]);

  const selectedCategory = categories.find((c) => c.id === activeCategory);
  const selectedCategorySubcategories = useMemo(() => {
    const dynamicSubs = cachedSubcategories.length > 0 ? cachedSubcategories : subcategories;

    if (activeCategory) {
      const categorySubs = selectedCategory?.subcategories ?? [];
      if (categorySubs.length) return categorySubs;
      return dynamicSubs;
    }

    const allSubs = [];
    categories.forEach((c) => {
      c.subcategories?.forEach((sub) => {
        if (!allSubs.find((s) => s.id === sub.id)) {
          allSubs.push(sub);
        }
      });
    });

    if (allSubs.length > 0) return allSubs;
    return dynamicSubs;
  }, [activeCategory, selectedCategory?.subcategories, subcategories, categories, cachedSubcategories]);
  const selectedSubcategory = selectedCategorySubcategories.find(
    (subcategory) => subcategory.id === activeSubcategory,
  );

  const typeSubcategories = useMemo(
    () => extractHisHerSubcategories(selectedCategorySubcategories),
    [selectedCategorySubcategories],
  );

  useEffect(() => {
    if (!shouldResolveType) return undefined;

    const localMatch = typeSubcategories.find((subcategory) => subcategory.slug === typeParam);
    if (localMatch?.id) {
      updateSearchParamValues(
        {
          category: activeCategory,
          subcategory: localMatch.id,
          type: null,
        },
        { resetPage: true, replace: true },
      );
      return undefined;
    }

    let cancelled = false;

    const resolveTypeToSubcategory = async () => {
      try {
        const subs = await fetchCategoryHisHerSubcategories(activeCategory);
        if (cancelled) return;

        const match = subs.find((subcategory) => subcategory.slug === typeParam);

        if (match?.id) {
          updateSearchParamValues(
            {
              category: activeCategory,
              subcategory: match.id,
              type: null,
            },
            { resetPage: true, replace: true },
          );
          return;
        }

        updateSearchParamValues({ type: null }, { replace: true });
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to resolve subcategory", err);
          updateSearchParamValues({ type: null }, { replace: true });
        }
      }
    };

    resolveTypeToSubcategory();

    return () => {
      cancelled = true;
    };
  }, [
    activeCategory,
    shouldResolveType,
    typeParam,
    typeSubcategories,
    updateSearchParamValues,
  ]);

  const categoryName = selectedCategory?.name ?? null;
  let typeLabel = null;

  if (selectedSubcategory?.slug === "his") typeLabel = t("shop.his_collection");
  if (selectedSubcategory?.slug === "her") typeLabel = t("shop.her_collection");

  // CHANGED: filter and sort the whole loaded list (not just 12 products)
  const filteredProducts = useMemo(() => {
    let list = products;

    if (collection === "best-seller") {
      list = list.filter((product) => product.is_best_seller);
    } else if (collection === "new") {
      list = list.filter(isNewArrival);
    } else if (collection === "featured") {
      list = list.filter((product) => product.is_featured);
    }

    const toPrice = (product) =>
      Number.parseFloat(String(product.price ?? 0).replace(/[^0-9.]/g, "")) || 0;
    const toTime = (product) => new Date(product.created_at || 0).getTime();

    if (sort === "price-asc") return [...list].sort((a, b) => toPrice(a) - toPrice(b));
    if (sort === "price-desc") return [...list].sort((a, b) => toPrice(b) - toPrice(a));
    if (sort === "newest") return [...list].sort((a, b) => toTime(b) - toTime(a));

    return list;
  }, [collection, products, sort]);

  // CHANGED: when filtering in the browser, split the results into pages here
  const clientTotalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const clientPage = Math.min(page, clientTotalPages);

  const pagedProducts = isClientFiltered
    ? filteredProducts.slice((clientPage - 1) * PAGE_SIZE, clientPage * PAGE_SIZE)
    : filteredProducts;

  const pageInfo = isClientFiltered
    ? { currentPage: clientPage, totalPages: clientTotalPages }
    : pagination;

  const visibleProductCount = isClientFiltered ? filteredProducts.length : totalCount;

  return (
    <div className="max-w-[1700px] mx-auto bg-white pb-16 px-3 sm:px-6">
      <ShopPageHeader categoryName={categoryName} typeLabel={typeLabel} />
      {/* Mobile filter button */}
      <div className="lg:hidden flex justify-end px-4 py-3 border-b border-gray-200">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 rounded"
        >
          <FiSliders size={14} /> {t("shop.filters")}
        </button>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />

          <div className="relative bg-white w-[80vw] max-w-[340px] h-full overflow-y-auto z-10">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-semibold text-sm tracking-widest">{t("shop.filters_upper")}</h3>
              <button onClick={() => setSidebarOpen(false)}>
                <FiX size={20} />
              </button>
            </div>

            <ShopSidebar
              collection={collection}
              setCollection={setCollection}
              resetFilters={resetFilters}
              priceRangeDraft={priceRangeDraft}
              setPriceRangeDraft={setPriceRangeDraft}
              handlePriceApply={handlePriceApply}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-[300px] xl:w-[340px] border-r border-gray-200 sticky top-24 h-fit">
          <ShopSidebar
            collection={collection}
            setCollection={setCollection}
            resetFilters={resetFilters}
            priceRangeDraft={priceRangeDraft}
            setPriceRangeDraft={setPriceRangeDraft}
            handlePriceApply={handlePriceApply}
          />
        </aside>

        <main className="flex-1">
          {/* Category tabs */}
          <div className="border-b border-t border-gray-200 px-4 sm:px-6 py-5 overflow-x-auto">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={(id) => {
                updateSearchParamValues(
                  {
                    category: id,
                    subcategory: null,
                    type: null,
                  },
                  { resetPage: true },
                );
              }}
            />
          </div>

          {/* Subcategory filter */}
          {selectedCategorySubcategories.length > 0 && (
            <SubcategoryFilter
              subcategories={selectedCategorySubcategories}
              activeSubcategory={activeSubcategory}
              setActiveSubcategory={(id) => {
                updateSearchParamValues(
                  {
                    subcategory: id,
                    type: null,
                  },
                  { resetPage: true },
                );
              }}
            />
          )}

          {/* Search toolbar */}
          <ShopToolbar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSearchApply={handleSearchApply}
            sort={sort}
            setSort={setSort}
          />

          {/* Product count */}
          {!loading && !error && (
            <div className="px-4 sm:px-6 pb-2">
              <p className="text-xs text-gray-400 tracking-wide">
                {visibleProductCount} {t("shop.products_found")}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="py-20">
              <Loader fullScreen={false} text={t("shop.loading", "Loading...")} size="md" />
            </div>
          )}

          {/* Product grid */}
          {!loading && !error && pagedProducts.length > 0 && (
            <ProductsGrid products={pagedProducts} />
          )}

          {!loading && !error && pagedProducts.length === 0 && (
            <div className="px-6 py-8 text-sm text-gray-500">{t("shop.no_products")}</div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm px-6 py-8">
              <FiAlertCircle size={16} /> {error}
            </div>
          )}

          {/* Pagination */}
          {!loading && pageInfo.totalPages > 1 && (
            <div className="flex justify-center py-10 gap-4">
              <button
                onClick={() =>
                  updateSearchParamValues({ page: Math.max(1, pageInfo.currentPage - 1) })
                }
                disabled={pageInfo.currentPage === 1}
                className="border border-gray-300 px-4 py-2 text-sm"
              >
                {t("shop.prev")}
              </button>

              <span className="text-sm text-gray-500">
                {t("shop.page_info", { current: pageInfo.currentPage, total: pageInfo.totalPages })}
              </span>

              <button
                onClick={() =>
                  updateSearchParamValues({
                    page: Math.min(pageInfo.totalPages, pageInfo.currentPage + 1),
                  })
                }
                disabled={pageInfo.currentPage === pageInfo.totalPages}
                className="border border-gray-300 px-4 py-2 text-sm"
              >
                {t("shop.next")}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;