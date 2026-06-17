import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchOrdersAPI } from "../../api/orders";
import { useTranslation } from "react-i18next";
import { formatMoney } from "../../utils/currency";
import { FiLoader,FiPackage  } from "react-icons/fi";


const statusLabel = (s, t) => {
  if (s === "processing") return t("auth.orders.status_processing");
  if (s === "delivered")  return t("auth.orders.status_delivered");
  if (s === "cancelled")  return t("auth.orders.status_cancelled");

  return s;
};

const statusStyle = (s) => {
  if (s === "delivered")  return "bg-green-100 text-green-600";
  if (s === "cancelled")  return "bg-red-100 text-red-600";
  return "bg-orange-100 text-orange-600";
};

const OrdersList = () => {
  const { t } = useTranslation();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);


  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchOrdersAPI();
        const fetchedOrders = res.data?.orders || res.data?.results || res.data || [];
        setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
      } catch (err) {
        setError(err?.response?.data?.detail ?? t("auth.orders.load_error"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);



  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">{t("auth.orders.title")}</h2>


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
      {!loading && !error && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <FiPackage size={44} className="text-gray-200" />
          <p className="text-gray-400 text-sm">{t("auth.orders.no_orders")}</p>
        </div>
      )}

      {/* Orders */}
      {!loading && orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((order) => {
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
                      ● {statusLabel(status, t)}
                    </span>
                    {date && <span className="text-xs text-gray-400">{date}</span>}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{t("auth.orders.order_hash")}{orderId}</span>
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
                          <p className="text-xs text-gray-400 mt-0.5">{t("auth.orders.qty")} {qty}</p>
                        </div>
                        {price != null && (
                          <p className="text-sm font-semibold text-gray-900 shrink-0">
                            {formatMoney(price, order.currency)}
                          </p>
                        )}
                      </div>
                    );
                  }) : (
                    <p className="text-sm text-gray-400 italic">{t("auth.orders.no_item_details")}</p>
                  )}
                </div>

                {/* Order total */}
                {total != null && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{t("auth.orders.order_total")}</span>
                    <span className="text-sm font-bold text-gray-900">{formatMoney(total, order.currency)}</span>
                  </div>
                )}

                {/* Tracking row */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  {trackingUrl ? (
                    <>
                      <span className="text-xs text-gray-400">{t("auth.orders.track_shipment")}</span>
                      <a
                        href={trackingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#3D1613] hover:underline"
                      >
                        {t("auth.orders.track_order_btn")} <FiExternalLink size={12} />
                      </a>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 italic">
                      {t("auth.orders.tracking_update_msg")}
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
