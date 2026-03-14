import SearchBox from "./SearchBox";

const ShopToolbar = ({
  searchInput,
  setSearchInput,
  handleSearchApply,
  sort = "default",
  setSort = () => {},
}) => {
  return (
    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
      <SearchBox
        search={searchInput}
        setSearch={setSearchInput}
        onSearch={handleSearchApply}
        sort={sort}
        setSort={setSort}
      />
    </div>
  );
};

export default ShopToolbar;
