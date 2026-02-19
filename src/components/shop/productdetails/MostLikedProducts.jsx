import React from "react";
import ProductCard from "../../shop/ProductCard";
import { allProducts } from '../../../utils/products'
import "../../shop/productdetails/MostLikedProducts.css"

const MostLikedProducts = ({ currentProductId }) => {
  const related = allProducts
    .filter(p => p.id !== currentProductId)
    .slice(0, 4);

  return (
    <section className="you-may-like">
      <div className="section-header">
        <h2>You May Also Like</h2>
        <a href="/shop" className="view-all">View All →</a>
      </div>

      <div className="related-grid">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default MostLikedProducts;