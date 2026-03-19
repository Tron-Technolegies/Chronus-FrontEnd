import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import CategoryIntroModal from "./CategoryIntroModal";
import SubcategorySelectModal from "../shop/SubcategorySelectModal";
import { fetchCategoryHisHerSubcategories } from "../../utils/fetchCategoryHisHerSubcategories";
import { extractHisHerSubcategories } from "../../utils/shopSubcategories";

export default function ExploreCategories() {
  const navigate = useNavigate();
  const { categories = [], loading } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryModal, setSubcategoryModal] = useState(null);

  const sortedCategories = [...categories].sort(
    (a, b) => (a.priority ?? 999) - (b.priority ?? 999),
  );

  const openCategoryIntro = (category) => {
    setSelectedCategory(category);
  };

  const handleExploreCategory = async (category) => {
    setSelectedCategory(null);

    try {
      const categorySubcategories = extractHisHerSubcategories(category.subcategories ?? []);
      const subcategories = categorySubcategories.length
        ? categorySubcategories
        : await fetchCategoryHisHerSubcategories(category.id);

      if (!subcategories?.length) {
        navigate(`/shop?category=${category.id}`);
        return;
      }

      setSubcategoryModal({
        id: category.id,
        name: category.name,
        subcategories,
      });
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
          {!loading && sortedCategories.length === 0 && (
            <p className="text-sm text-off-white col-span-full text-center">
              No categories available.
            </p>
          )}

          {sortedCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => openCategoryIntro(category)}
              className="cursor-pointer group transition-all duration-300 hover:-translate-y-1 w-full max-w-[380px]"
            >
              <div className="p-[2.5px] rounded-sm bg-gradient-to-r from-[#b8964c] via-[#e0c78a] to-[#b8964c]">
                <div className="bg-[#3d1613] rounded-sm w-full min-h-[180px] flex flex-col justify-center items-center text-center px-6 shadow-md group-hover:shadow-lg">
                  <h3 className="text-off-white text-2xl tracking-wide mb-3 font-[cormorant-garamond]">
                    {category.name}
                  </h3>

                  <div className="w-12 h-[1px] bg-[#C6A75D] mb-3"></div>

                  <p className="text-off-white text-sm">{category.subdescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedCategory && (
        <CategoryIntroModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onExplore={handleExploreCategory}
        />
      )}

      {subcategoryModal && (
        <SubcategorySelectModal
          categorySlug={subcategoryModal.id}
          categoryName={subcategoryModal.name}
          subcategories={subcategoryModal.subcategories}
          onClose={() => setSubcategoryModal(null)}
        />
      )}
    </>
  );
}
