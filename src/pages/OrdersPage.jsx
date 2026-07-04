import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiArrowRight, FiClock, FiAlertCircle } from "react-icons/fi";
import { fetchOrdersAPI } from "../api/orders";
import { formatMoney } from "../utils/currency";

export default function OrdersPage() {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const lastGuestOrderId = localStorage.getItem("last_order_id");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isLoggedIn) return; // Guest mode: no fetch needed

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchOrdersAPI();
        const fetchedOrders = res.data?.orders || res.data?.results || res.data || [];
        setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
      } catch (err) {
        setError(
          err?.response?.data?.detail ?? "Could not load orders. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-20">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mb-6 tracking-wide">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-600">My Orders</span>
        </p>

        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <FiPackage size={20} className="text-[#CBA61F]" />
          <h1 className="text-xl sm:text-2xl tracking-[0.12em] font-medium">My Orders</h1>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* ═══ GUEST mode ═══ */}
        {!isLoggedIn && (
          <div className="space-y-6">
            {lastGuestOrderId ? (
              <div
                className="rounded-xl border shadow-sm p-6 space-y-4"
                style={{ background: "#3D1613", borderColor: "rgba(255,202,10,0.2)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(255,202,10,0.15)", border: "1px solid #FFCA0A" }}
                  >
                    <FiPackage className="text-[#FFCA0A]" size={18} />
                  </div>
                  <div>
                    <p className="text-off-white text-sm font-semibold tracking-wide">
                      Order #{lastGuestOrderId}
                    </p>
                    <p className="text-off-white-50 text-xs mt-0.5">Guest order</p>
                  </div>
                  <span
                    className="ml-auto flex items-center gap-1 text-[10px] px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: "rgba(255,202,10,0.15)", color: "#FFCA0A" }}
                  >
                    <FiClock size={10} />
                    Pending
                  </span>
                </div>

                <p className="text-off-white-50 text-xs leading-relaxed">
                  This is your last guest order. Login to view your full order history and track all orders.
                </p>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest px-5 py-2.5 rounded-sm transition-colors"
                  style={{ backgroundColor: "#FFCA0A", color: "#1a1a1a" }}
                >
                  LOGIN TO TRACK ORDERS <FiArrowRight size={12} />
                </Link>
              </div>
            ) : (
              <GuestEmptyState />
            )}
          </div>
        )}

        {/* ═══ LOGGED-IN mode ═══ */}
        {isLoggedIn && (
          <>
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-8 h-8 border-2 border-[#CBA61F] border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Loading your orders…</p>
              </div>
            )}

            {error && !loading && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-sm mb-6">
                <FiAlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {!loading && !error && orders.length === 0 && <LoggedInEmptyState />}

            {!loading && orders.length > 0 && (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <OrderCard key={order.id ?? order.order_id} order={order} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const orderId = order.id ?? order.order_id;
  const status = order.status ?? "processing";
  const createdAt = order.created_at
    ? new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : null;
  const total = order.total_amount ?? order.total ?? null;
  const trackingLink = order.tracking_link ?? order.tracking_url;
  const carrier = order.carrier;
  const trackingNumber = order.tracking_number;
  const items = order.items ?? [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden mb-2 group">
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4" style={{ backgroundColor: "#faf9f6" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(203,166,31,0.15)", color: "#CBA61F" }}>
            <FiPackage size={14} />
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold block">Order #{orderId}</span>
            {createdAt && <span className="text-[11px] text-gray-400 mt-0.5 block">{createdAt}</span>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider"
            style={{
              backgroundColor:
                status === "delivered" ? "rgba(34,197,94,0.1)" :
                status === "cancelled" ? "rgba(239,68,68,0.1)" :
                status === "shipped" ? "rgba(59,130,246,0.1)" : "rgba(203,166,31,0.1)",
              color:
                status === "delivered" ? "#16a34a" :
                status === "cancelled" ? "#dc2626" :
                status === "shipped" ? "#2563eb" : "#b45309",
            }}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Body: Items */}
      <div className="px-5 sm:px-6 py-5">
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item, idx) => {
              const img = item.product_image ?? item.image ?? item.product?.image ?? null;
              const name = item.product_name ?? item.name ?? "—";
              const qty = item.quantity ?? item.qty ?? 1;
              const price = item.price ?? item.unit_price ?? null;

              return (
                <div key={idx} className="flex items-center gap-4 group-hover:bg-gray-50/50 p-2 -mx-2 rounded-lg transition-colors">
                  {img ? (
                    <img src={img} alt={name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-100 shrink-0 shadow-sm" />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <FiPackage size={24} className="text-gray-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate tracking-wide">{name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Qty: {qty}</p>
                  </div>
                  {price != null && (
                    <div className="text-right shrink-0">
                      <p className="text-sm sm:text-base font-bold text-[#3D1613]">{formatMoney(price, order.currency)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No item details available.</p>
        )}
      </div>

      {/* Footer: Tracking & Total */}
      <div className="px-5 sm:px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          {trackingLink ? (
            <div className="text-xs sm:text-sm">
              <span className="text-gray-500 mr-2 font-medium">Tracking ({carrier || "DHL"}):</span>
              <a
                href={trackingLink}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#CBA61F] hover:text-[#e6b600] transition-colors underline"
              >
                {trackingNumber || "Track Shipment"}
              </a>
            </div>
          ) : (
            <p className="text-xs text-gray-400 flex items-center gap-1"><FiClock size={12}/> Tracking info pending</p>
          )}
        </div>
        {total != null && (
          <div className="text-right flex items-center gap-3">
            <span className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">Total</span>
            <span className="text-lg font-bold text-[#3D1613]">{formatMoney(total, order.currency)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function LoggedInEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
      <FiPackage size={48} className="text-gray-200" />
      <p className="text-gray-400 text-sm tracking-wide">You haven&apos;t placed any orders yet.</p>
      <Link
        to="/shop"
        className="bg-[#3D1613] text-off-white text-xs tracking-[0.2em] px-8 py-3 hover:bg-[#5a2019] transition-colors"
      >
        EXPLORE COLLECTIONS
      </Link>
    </div>
  );
}

function GuestEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
      <FiPackage size={48} className="text-gray-200" />
      <p className="text-gray-400 text-sm tracking-wide">No recent guest orders found.</p>
      <p className="text-gray-400 text-xs max-w-xs">
        Login to view your full order history and sync your cart across devices.
      </p>
      <div className="flex gap-3">
        <Link
          to="/login"
          className="bg-[#3D1613] text-off-white text-xs tracking-[0.2em] px-6 py-3 hover:bg-[#5a2019] transition-colors"
        >
          LOGIN
        </Link>
        <Link
          to="/shop"
          className="border border-gray-300 text-gray-600 text-xs tracking-[0.2em] px-6 py-3 hover:bg-gray-50 transition-colors"
        >
          SHOP
        </Link>
      </div>
    </div>
  );
}

