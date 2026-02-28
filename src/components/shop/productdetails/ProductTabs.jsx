import { useState } from "react";
import { addReviewAPI } from "../../../api/product";

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("description");
  const [reviews, setReviews] = useState(product.reviews ?? []);
  const [reviewsCount, setReviewsCount] = useState(product.reviewsCount ?? 0);

  // Review form state
  const [form, setForm] = useState({ name: "", rating: 0, comment: "" });
  const [hoverStar, setHoverStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState(null); // { type: "success"|"error", text }

  const tabs = [
    { id: "description", label: "DESCRIPTION" },
    { id: "specs",       label: "SPECIFICATIONS" },
    { id: "reviews",     label: `REVIEWS (${reviewsCount})` },
  ];

  const specLines = (product.description ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.includes(":"));

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating) {
      setSubmitMsg({ type: "error", text: "Please select a star rating." });
      return;
    }
    if (!form.comment.trim()) {
      setSubmitMsg({ type: "error", text: "Please write a comment." });
      return;
    }
    setSubmitting(true);
    setSubmitMsg(null);
    try {
      await addReviewAPI({
        product_id: product.id,
        name:       form.name.trim() || "Guest",
        rating:     form.rating,
        comment:    form.comment.trim(),
      });
      const newReview = {
        id:      Date.now(),
        name:    form.name.trim() || "Guest",
        rating:  form.rating,
        comment: form.comment.trim(),
        date:    new Date().toLocaleDateString("en-US", {
          year: "numeric", month: "short", day: "numeric",
        }),
      };
      setReviews((prev) => [newReview, ...prev]);
      setReviewsCount((c) => c + 1);
      setForm({ name: "", rating: 0, comment: "" });
      setHoverStar(0);
      setSubmitMsg({ type: "success", text: "Thank you! Your review has been submitted." });
    } catch (err) {
      setSubmitMsg({
        type: "error",
        text: err?.response?.data?.error ?? "Failed to submit. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-6 sm:gap-10 border-b border-[#D9D9D9] overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-4 text-xs sm:text-sm tracking-widest relative cursor-pointer whitespace-nowrap shrink-0
              ${tab === t.id ? "text-[#CBA61F] font-bold" : "text-gray-400"}`}
          >
            {t.label}
            {tab === t.id && (
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#CBA61F] transition-all" />
            )}
          </button>
        ))}
      </div>

      <div className="pt-6 text-gray-500 leading-7 transition-all duration-300">

        {/* ── Description ─────────────────────────────── */}
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

        {/* ── Specifications ───────────────────────────── */}
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
                        <td className="py-2 px-3 text-gray-500">{rest.join(":").trim()}</td>
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

        {/* ── Reviews ─────────────────────────────────── */}
        {tab === "reviews" && (
          <div className="space-y-10">

            {/* Summary + list */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
              {/* Rating summary */}
              <div className="border-b lg:border-b-0 lg:border-r border-[#D9D9D9] pb-8 lg:pb-0 lg:pr-8">
                <div className="text-4xl font-semibold">
                  {product.rating > 0 ? product.rating.toFixed(1) : "—"}
                </div>
                <div className="flex text-[#CBA61F] mt-2">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i}>{i <= Math.round(product.rating) ? "★" : "☆"}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-2">{reviewsCount} Reviews</p>
                <div className="mt-6 space-y-3 text-xs">
                  {[5,4,3,2,1].map((star) => {
                    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
                    const pct   = reviewsCount > 0 ? (count / reviewsCount) * 100 : 0;
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
                {reviews.length > 0 ? (
                  reviews.map((r) => (
                    <div key={r.id} className="border-b border-[#D9D9D9] pb-8">
                      <div className="flex justify-between flex-wrap gap-2 mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{r.name}</h4>
                          <div className="flex text-[#CBA61F] text-sm mt-0.5">
                            {[1,2,3,4,5].map((i) => (
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

            {/* ── Add Review Form ────────────────────────── */}
            <div className="border-t border-[#D9D9D9] pt-8">
              <h3 className="text-base font-semibold text-gray-900 mb-5 tracking-wide">
                Write a Review
              </h3>

              {submitMsg && (
                <p className={`mb-4 text-sm px-4 py-2 rounded-md border ${
                  submitMsg.type === "success"
                    ? "text-green-700 bg-green-50 border-green-200"
                    : "text-red-600 bg-red-50 border-red-200"
                }`}>
                  {submitMsg.text}
                </p>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-5 max-w-xl">
                {/* Name */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">
                    Your Name <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Aswin"
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#CBA61F]/40"
                  />
                </div>

                {/* Star rating */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Rating *</label>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverStar(star)}
                        onMouseLeave={() => setHoverStar(0)}
                        onClick={() => setForm((p) => ({ ...p, rating: star }))}
                        className="text-2xl leading-none transition-transform hover:scale-110"
                        style={{ color: star <= (hoverStar || form.rating) ? "#CBA61F" : "#D1D5DB" }}
                      >
                        ★
                      </button>
                    ))}
                    {form.rating > 0 && (
                      <span className="ml-2 text-xs text-gray-400 self-center">
                        {["","Poor","Fair","Good","Very Good","Excellent"][form.rating]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Review *</label>
                  <textarea
                    rows={4}
                    value={form.comment}
                    onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                    placeholder="Share your experience with this product..."
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#CBA61F]/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#3D1613] text-white text-xs tracking-widest px-8 py-3 rounded-md hover:bg-[#5a2019] transition disabled:opacity-60"
                >
                  {submitting ? "SUBMITTING…" : "SUBMIT REVIEW"}
                </button>
              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
