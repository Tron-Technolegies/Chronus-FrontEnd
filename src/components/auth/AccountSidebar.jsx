import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AccountSidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: "profile", label: "My Profile" },
    { id: "orders", label: "My Orders" },
    { id: "address", label: "Saved Address" },
    { id: "password", label: "Change Password" },
    { id: "logout", label: "Logout" },
  ];

  const activeLabel = menuItems.find((item) => item.id === activeTab)?.label;

  const handleClick = (item) => {
    if (item.id === "logout") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      navigate("/login");
    } else {
      setActiveTab(item.id);
    }

    setIsOpen(false);
  };
  return (
    <div className="lg:w-72 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white p-4 sm:p-6 relative">
      <div className="lg:hidden mb-4 relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[#5a0f0f] text-white py-3 px-4 rounded-md flex items-center justify-between"
        >
          <span>{activeLabel}</span>

          <FiChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            size={20}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-xl z-50">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden lg:flex flex-col gap-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className={`px-4 py-3 rounded-md text-left transition
              ${
                activeTab === item.id && item.id !== "logout"
                  ? "bg-[#3D1613] text-white shadow"
                  : "bg-[#E8E8E8] hover:bg-gray-200"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccountSidebar;
