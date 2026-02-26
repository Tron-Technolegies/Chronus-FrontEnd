import React from 'react';
import ProductsGrid from '../shop/ProductsGrid';
import { useProducts } from '../../hooks/useProducts';

const FeaturedProducts = () => {
  const { products, loading } = useProducts();
  const featured = products.filter((p) => p.is_featured).slice(0, 4);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-[6%] font-sans">
      <div className="flex items-end justify-between max-w-7xl mx-auto mb-12">
        <div>
          <span className="block text-[11px] tracking-[1.5px] text-gray-400 mb-3 uppercase inter">
            HANDPICKED FOR YOU
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-black font-[Bastoni] leading-tight">
            Featured Products
          </h2>
        </div>
        <a
          href="/shop"
          className="flex items-center gap-2 text-sm font-medium text-black border border-black/20 rounded-full px-5 py-2.5 hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap"
        >
          View All <span className="text-base leading-none">→</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded h-[320px]" />
            ))}
          </div>
        ) : (
          <ProductsGrid products={featured} />
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;