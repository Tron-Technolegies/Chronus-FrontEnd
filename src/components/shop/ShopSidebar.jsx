import FiltersSection from "./FiltersSection";
import ProductPriceFilter from "./ProductPriceFilter";
import ShippingDetails from "./ShippingDetails";

const ShopSidebar = ({
  collection,
  setCollection,
  resetFilters,
  priceRangeDraft,
  setPriceRangeDraft,
  handlePriceApply,
}) => {
  return (
    <>
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
    </>
  );
};

export default ShopSidebar;
