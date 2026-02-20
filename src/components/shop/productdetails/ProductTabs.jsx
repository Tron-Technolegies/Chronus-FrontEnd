import { useState } from "react";

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("description");

  const tabs = [
    { id: "description", label: "DESCRIPTION" },
    { id: "specs", label: "SPECIFICATIONS" },
    { id: "reviews", label: "REVIEWS" },
  ];

  return (
    <div>
      <div className="flex gap-10 border-b border-[#D9D9D9]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-4 text-sm tracking-widest relative cursor-pointer
              ${tab === t.id ? "text-[#CBA61F] font-bold" : "text-gray-400"}
            `}
          >
            {t.label}

            {tab === t.id && (
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#CBA61F] transition-all"></span>
            )}
          </button>
        ))}
      </div>

      <div className="pt-6 text-gray-500 leading-7 transition-all duration-300">
        {tab === "description" && <p>{product.description}</p>}
        {tab === "specs" && <p>42mm case · Sapphire crystal · Automatic movement</p>}
        {tab === "reviews" && (
          <div className="grid lg:grid-cols-[320px_1fr] gap-10">
            <div className="border-r border-[#D9D9D9] pr-8">
              <div className="text-4xl font-semibold">{product.rating.toFixed(1)}</div>

              <div className="flex text-[#CBA61F] mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i}>{i <= Math.round(product.rating) ? "★" : "☆"}</span>
                ))}
              </div>

              <p className="text-sm text-gray-400 mt-2">{product.reviewsCount} Ratings</p>

              <div className="mt-6 space-y-3 text-xs">
                {[5, 4, 3, 2, 1].map((star, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-6">{star}.0</span>

                    <div className="flex-1 h-[3px] bg-gray-200">
                      <div
                        className="h-full bg-[#CBA61F]"
                        style={{ width: `${(star / 5) * 100}%` }}
                      />
                    </div>

                    <span className="text-gray-400">
                      {Math.floor(product.reviewsCount * (star / 5))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {product.reviews?.map((r) => (
                <div key={r.id} className="border-b border-[#D9D9D9] pb-8">
                  <div className="flex gap-4">
                    <img src={r.avatar} className="w-12 h-12 rounded-full object-cover" />

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{r.name}</h4>
                        <span className="text-xs text-gray-400">{r.date}</span>
                      </div>

                      <div className="flex text-[#CBA61F] text-sm mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span key={i}>{i <= r.rating ? "★" : "☆"}</span>
                        ))}
                      </div>

                      <p className="text-gray-600 text-sm mt-2 leading-6">{r.comment}</p>
                    </div>
                  </div>
                </div>
              ))}

              <button className="text-md text-black  cursor-pointer hover:underline px-4 py-2 rounded">
                Read more reviews
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
