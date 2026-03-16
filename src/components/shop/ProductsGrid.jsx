import ProductCard from "../../components/shop/ProductCard";

const ProductsGrid = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 px-4 py-6 bg-white">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
