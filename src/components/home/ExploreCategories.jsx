import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getProductsByCategory } from "../../api/product";
import CategoryIntroModal from "./CategoryIntroModal";
import SubcategorySelectModal from "../shop/SubcategorySelectModal";
import { extractHisHerSubcategories } from "../../utils/shopSubcategories";

const getSummaryLine = (description, name) => {
  const text = description?.trim();
  if (!text) return `Explore our ${name} collection.`;

  const firstSentence = text.match(/[^.!?]+[.!?]?/u)?.[0]?.trim();
  return firstSentence || text;
};

export default function ExploreCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [introCategory, setIntroCategory] = useState(null);
  const [subcategoryModalData, setSubcategoryModalData] = useState(null);
  const cardWrapperClass =
    "cursor-pointer group transition-all duration-300 hover:-translate-y-1 w-full max-w-[380px]";
  const cardBorderClass =
    "p-[2.5px] rounded-sm bg-gradient-to-r from-[#b8964c] via-[#e0c78a] to-[#b8964c] hover:bg-gradient-to-r hover:from-[#ffd058] hover:via-[#ffca56] hover:to-[#ffe2a4]";
  const cardBodyClass =
    "bg-[#3d1613] group-hover:bg-[#32110f] transition-all duration-300 rounded-sm w-full min-h-[130px] sm:min-h-[150px] flex flex-col justify-center items-center shadow-md shadow-[#4c302f8a] text-center px-3 sm:px-6 group-hover:shadow-lg font-[cormorant-garamond]";

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      try {
        const res = await getCategories();
        const raw = res.data?.categories ?? [];
        if (!mounted) return;
        setCategories(Array.isArray(raw) ? raw : []);
      } catch {
        if (!mounted) return;
        setCategories([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadCategories();
    return () => {
      mounted = false;
    };
  }, []);

  const handleExploreFromIntro = async (category) => {
    setIntroCategory(null);

    try {
      const res = await getProductsByCategory(category.id);
      const products = res.data?.products ?? [];
      const subcategories = extractHisHerSubcategories(products);

      if (subcategories.length === 0) {
        navigate(`/shop?category=${category.id}`);
        return;
      }

      setSubcategoryModalData({
        id: category.id,
        name: category.name,
        subcategories,
      });
      return;
    } catch {
      navigate(`/shop?category=${category.id}`);
    }
  };

  return (
    <>
      <section className="py-20 px-6 md:px-[6%]">
        <div className="text-center mb-14">
          <h2 className="text-4xl tracking-wide font-[Bastoni]">Explore Categories</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {!loading && categories.length === 0 && (
            <p className="text-sm text-off-white col-span-full text-center">
              No categories available.
            </p>
          )}

          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setIntroCategory(category)}
              className={cardWrapperClass}
            >
              <div className={cardBorderClass}>
                <div className={cardBodyClass}>
                  <h3 className="text-off-white text-xl sm:text-2xl md:text-3xl tracking-wide mb-2 sm:mb-3">
                    {category.name}
                  </h3>

                  <div className="w-10 sm:w-16 h-[1px] bg-[#C6A75D] mb-2 sm:mb-3"></div>

                  <p className="text-off-white text-xs sm:text-sm tracking-wide max-w-[280px] truncate">
                    {getSummaryLine(category.subdescription, category.name)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {introCategory && (
        <CategoryIntroModal
          category={introCategory}
          onClose={() => setIntroCategory(null)}
          onExplore={handleExploreFromIntro}
        />
      )}

      {subcategoryModalData && (
        <SubcategorySelectModal
          categorySlug={subcategoryModalData.id}
          categoryName={subcategoryModalData.name}
          subcategories={subcategoryModalData.subcategories}
          onClose={() => setSubcategoryModalData(null)}
        />
      )}
    </>
  );
}
