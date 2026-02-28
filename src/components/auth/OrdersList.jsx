import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiChevronRight, FiLoader, FiExternalLink } from "react-icons/fi";
import { fetchOrdersAPI } from "../../api/orders";

const STATUS_FILTERS = ["All", "processing", "delivered", "cancelled"];

const statusLabel = (s) => {
  if (s === "processing") return "In Progress";
  if (s === "delivered")  return "Delivered";
  if (s === "cancelled")  return "Cancelled";
  return s;
};

const statusStyle = (s) => {
  if (s === "delivered")  return "bg-green-100 text-green-600";
  if (s === "cancelled")  return "bg-red-100 text-red-600";
  return "bg-orange-100 text-orange-600";
};

const OrdersList = () => {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [filter, setFilter]   = useState("All");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchOrdersAPI();
        setOrders(res.data?.results ?? res.data ?? []);
      } catch (err) {
        setError(err?.response?.data?.detail ?? "Could not load orders.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">My Orders</h2>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-3 mb-6">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm border transition
              ${filter === f
                ? "bg-[#3D1613] text-white border-[#3D1613]"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {f === "All" ? "All" : statusLabel(f)}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <FiLoader className="animate-spin text-[#5a0f0f]" size={28} />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-md">
          {error}
        </p>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <FiPackage size={44} className="text-gray-200" />
          <p className="text-gray-400 text-sm">No orders found.</p>
        </div>
      )}

      {/* Orders */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((order) => {
            const orderId  = order.id ?? order.order_id;
            const status   = order.status ?? "processing";
            const date     = order.created_at
              ? new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric", month: "short", day: "numeric",
                })
              : null;
            const total       = order.total_amount ?? order.total;
            const items       = order.items ?? [];
            const trackingUrl = order.tracking_url ?? null;

            return (
              <div
                key={orderId}
                className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
              >
                {/* Header: status + date + order id */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(status)}`}>
                      ● {statusLabel(status)}
                    </span>
                    {date && <span className="text-xs text-gray-400">{date}</span>}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">Order #{orderId}</span>
                </div>

                {/* Items list */}
                <div className="space-y-3">
                  {items.length > 0 ? items.map((item, idx) => {
                    const img  = item.image ?? item.product?.image ?? null;
                    const name = item.product_name ?? item.name ?? "—";
                    const qty  = item.quantity ?? item.qty ?? 1;
                    const price= item.price ?? item.unit_price ?? null;
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        {img ? (
                          <img src={img} alt={name} className="w-14 h-14 object-cover rounded-md shrink-0" />
                        ) : (
                          <div className="w-14 h-14 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                            <FiPackage size={20} className="text-gray-300" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Qty: {qty}</p>
                        </div>
                        {price != null && (
                          <p className="text-sm font-semibold text-gray-900 shrink-0">
                            ${Number(price).toLocaleString()}
                          </p>
                        )}
                      </div>
                    );
                  }) : (
                    <p className="text-sm text-gray-400 italic">No item details available.</p>
                  )}
                </div>

                {/* Order total */}
                {total != null && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Order Total</span>
                    <span className="text-sm font-bold text-gray-900">${Number(total).toLocaleString()}</span>
                  </div>
                )}

                {/* Tracking row */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  {trackingUrl ? (
                    <>
                      <span className="text-xs text-gray-400">Track your shipment</span>
                      <a
                        href={trackingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#3D1613] hover:underline"
                      >
                        Track Order <FiExternalLink size={12} />
                      </a>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 italic">
                      🚚 Tracking link will be updated after shipment.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersList;