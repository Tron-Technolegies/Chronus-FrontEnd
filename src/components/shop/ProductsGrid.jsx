import React from "react";
import "../../components/shop/ProductsGrid.css";

const products = [
  {
    id: 1,
    name: "Royal Chronograph Elite",
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
  },
  {
    id: 2,
    name: "Royal Chronograph Elite",
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa",
  },
  {
    id: 3,
    name: "Women modern bijouterie",
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29",
  },
  {
    id: 4,
    name: "Royal Chronograph Elite",
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
];

const ProductsGrid = () => {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h4>{product.name}</h4>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
