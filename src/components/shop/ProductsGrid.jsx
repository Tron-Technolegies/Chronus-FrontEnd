import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Royal Chronograph Elite",
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
  },
  {
    id: 2,
    name: "Royal Chronograph Elite",
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80",
  },
  {
    id: 3,
    name: "Women modern bijouterie",
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=600&q=80",
  },
  {
    id: 4,
    name: "Royal Chronograph Elite",
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
];

const HeartIcon = ({ filled }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "#e85d5d" : "none"}
    stroke={filled ? "#e85d5d" : "#aaa"}
    strokeWidth="1.8"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group w-[450px] h-[700px] bg-white rounded-md overflow-hidden flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300">

      {/* Image area */}
      <div className="relative flex-1 overflow-hidden bg-[#f9f9f9]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />

        {/* Heart button */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-[18px] right-[18px] z-10 w-[42px] h-[42px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.10)] border-none cursor-pointer transition-transform duration-200 hover:scale-110"
        >
          <HeartIcon filled={wishlisted} />
        </button>

        {/* Slide-up action bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-[18px] pb-[18px] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10">
          {/* BUY NOW */}
          <button className="flex-1 h-12 bg-[#e8b800] hover:bg-[#d4a800] text-white text-[13px] font-bold tracking-[2.5px] uppercase border-none cursor-pointer transition-colors duration-200 font-serif">
            Buy Now
          </button>

          {/* Cart icon */}
          <button className="w-12 h-12 bg-white hover:bg-[#f5f5f5] border border-[#e0e0e0] hover:border-[#bbb] flex items-center justify-center cursor-pointer text-[#555] shrink-0 transition-colors duration-200">
            <CartIcon />
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="px-6 py-5 border-t border-[#f0f0f0] text-center bg-white font-serif">
        <p className="mb-1.5 text-[15px] font-medium text-[#1a1a1a] tracking-[0.3px]">
          {product.name}
        </p>
        <p className="text-[15px] text-[#888] font-normal">
          {product.price}
        </p>
      </div>
    </div>
  );
};

const ProductsGrid = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="grid grid-cols-2 gap-6 p-8 bg-[#fafafa] w-fit">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsGrid;