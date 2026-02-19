
import ProductCard from "../../components/shop/ProductCard";
import "../../components/shop/ProductsGrid.css"
const ProductsGrid = ({ products = [] }) => {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;