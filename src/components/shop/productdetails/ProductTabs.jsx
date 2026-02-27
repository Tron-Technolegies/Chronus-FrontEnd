import { useState } from "react";

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("description");

  const tabs = [
    { id: "description", label: "DESCRIPTION" },
    { id: "specs", label: "SPECIFICATIONS" },
    { id: "reviews", label: `REVIEWS (${product.reviewsCount ?? 0})` },
  ];

  // Parse description lines as spec rows if they look like "Key: Value"
  const specLines = (product.description ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.includes(":"));

  return (
    <div>
      <div className="flex gap-6 sm:gap-10 border-b border-[#D9D9D9] overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-4 text-xs sm:text-sm tracking-widest relative cursor-pointer whitespace-nowrap shrink-0
              ${tab === t.id ? "text-[#CBA61F] font-bold" : "text-gray-400"}
            `}
          >
            {t.label}
            {tab === t.id && (
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#CBA61F] transition-all" />
            )}
          </button>
        ))}
      </div>

      <div className="pt-6 text-gray-500 leading-7 transition-all duration-300">
        {/* ── Description ───────────────────────────────────── */}
        {tab === "description" && (
          <div className="max-w-2xl">
            {product.description ? (
              <p className="whitespace-pre-line text-sm sm:text-base leading-8">
                {product.description}
              </p>
            ) : (
              <p className="text-gray-400 text-sm italic">No description available.</p>
            )}
          </div>
        )}

        {/* ── Specifications ────────────────────────────────── */}
        {tab === "specs" && (
          <div className="max-w-2xl">
            {specLines.length > 0 ? (
              <table className="w-full text-sm">
                <tbody>
                  {specLines.map((line, i) => {
                    const [key, ...rest] = line.split(":");
                    return (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                        <td className="py-2 px-3 font-medium text-gray-700 w-1/3 capitalize">
                          {key.trim()}
                        </td>
                        <td className="py-2 px-3 text-gray-500">
                          {rest.join(":").trim()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-[160px_1fr] gap-2 border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-700">Category</span>
                  <span>{product.categoryName ?? "—"}</span>
                </div>
                {product.subcategoryName && (
                  <div className="grid grid-cols-[160px_1fr] gap-2 border-b border-gray-100 pb-2">
                    <span className="font-medium text-gray-700">Sub-category</span>
                    <span>{product.subcategoryName}</span>
                  </div>
                )}
                <div className="grid grid-cols-[160px_1fr] gap-2 border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-700">Brand</span>
                  <span>{product.brand || "—"}</span>
                </div>
                <div className="grid grid-cols-[160px_1fr] gap-2 border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-700">Stock</span>
                  <span>{product.stock > 0 ? `${product.stock} available` : "Out of stock"}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Reviews ───────────────────────────────────────── */}
        {tab === "reviews" && (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
            {/* Summary panel */}
            <div className="border-b lg:border-b-0 lg:border-r border-[#D9D9D9] pb-8 lg:pb-0 lg:pr-8">
              <div className="text-4xl font-semibold">
                {product.rating > 0 ? product.rating.toFixed(1) : "—"}
              </div>
              <div className="flex text-[#CBA61F] mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i}>{i <= Math.round(product.rating) ? "★" : "☆"}</span>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2">{product.reviewsCount} Reviews</p>

              {/* Star breakdown */}
              <div className="mt-6 space-y-3 text-xs">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = product.reviews.filter((r) => Math.round(r.rating) === star).length;
                  const pct = product.reviewsCount > 0 ? (count / product.reviewsCount) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="w-6 text-gray-500">{star}★</span>
                      <div className="flex-1 h-[3px] bg-gray-200">
                        <div className="h-full bg-[#CBA61F]" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-gray-400 w-4">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review list */}
            <div className="space-y-8">
              {product.reviews?.length > 0 ? (
                product.reviews.map((r) => (
                  <div key={r.id} className="border-b border-[#D9D9D9] pb-8">
                    <div className="flex justify-between flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{r.name}</h4>
                        <div className="flex text-[#CBA61F] text-sm mt-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <span key={i}>{i <= r.rating ? "★" : "☆"}</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-6">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">
                  No reviews yet. Be the first to review this product!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
