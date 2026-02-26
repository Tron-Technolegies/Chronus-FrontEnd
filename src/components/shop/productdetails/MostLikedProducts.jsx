import React from "react";
import ProductCard from "../../shop/ProductCard";
import { useProducts } from '../../../hooks/useProducts';
import "../../shop/productdetails/MostLikedProducts.css";

const MostLikedProducts = ({ currentProductId }) => {
  const { products } = useProducts();

  const related = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="you-may-like">
      <div className="section-header">
        <h2>You May Also Like</h2>
        <a href="/shop" className="view-all">View All →</a>
      </div>
      <div className="related-grid">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default MostLikedProducts;