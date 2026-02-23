import { useState } from "react";
import { demoUser } from "../../utils/demoUser";
import { FiChevronRight } from "react-icons/fi";

const OrdersList = () => {
  const [filter, setFilter] = useState("All");

  const filters = ["All", "In Progress", "Delivered", "Cancelled"];

  const filteredOrders =
    filter === "All"
      ? demoUser.orders
      : demoUser.orders.filter(
          (order) => order.status === filter
        );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "In Progress":
        return "bg-orange-100 text-orange-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        My Orders
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-1.5 rounded-full text-sm border transition
              ${
                filter === item
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            {/* Top Row */}
            <div className="flex items-center gap-3 mb-4 text-sm">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                  order.status
                )}`}
              >
                ● {order.status}
              </span>

              <span className="text-gray-500">
                | {order.date}
              </span>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between">
              
              <div className="flex items-center gap-4">
                <img
                  src={order.image}
                  alt={order.productName}
                  className="w-16 h-16 object-cover rounded-md"
                />

                <div>
                  <p className="font-medium">
                    Order ID: {order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.productName}
                  </p>
                  <p className="font-semibold mt-1">
                    {order.price}
                  </p>
                </div>
              </div>

              <FiChevronRight className="text-gray-400" size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;