export const PRODUCTS = [
  {
    id: 1,
    name: "Royal Chronograph Elite",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop",
    category: "watches",
    collections: ["bestsellers", "featured"],
  },
  {
    id: 2,
    name: "Royal Chronograph Elite",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop",
    category: "watches",
    collections: ["new"],
  },
  {
    id: 3,
    name: "Women modern bijouterie",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    category: "accessories",
    collections: ["bestsellers"],
  },
  {
    id: 4,
    name: "Royal Chronograph Elite",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    category: "accessories",
    collections: ["featured"],
  },
  {
    id: 5,
    name: "Royal Chronograph Elite",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d782b?w=400&h=400&fit=crop",
    category: "art",
    collections: ["new", "featured"],
  },
  {
    id: 6,
    name: "Royal Chronograph Elite",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    category: "accessories",
    collections: ["bestsellers"],
  },
  {
    id: 7,
    name: "Royal Chronograph Elite",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop",
    category: "art",
    collections: ["featured"],
  },
  {
    id: 8,
    name: "Royal Chronograph Elite",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1535193566863-6f3031224c94?w=400&h=400&fit=crop",
    category: "accessories",
    collections: ["new"],
  },
];

export const filterProducts = (products, filters) => {
  let filtered = [...products];

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters.collections && filters.collections.length > 0) {
    filtered = filtered.filter((p) =>
      filters.collections.some((col) => p.collections.includes(col)),
    );
  }

  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    filtered = filtered.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice,
    );
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(query));
  }

  return filtered;
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "newest":
      sorted.reverse();
      break;
    case "featured":
    default:
      break;
  }

  return sorted;
};
