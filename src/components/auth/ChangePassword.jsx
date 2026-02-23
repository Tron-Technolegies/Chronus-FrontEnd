import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Password Changed:", formData);
  };

  const toggleVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-2 text-gray-600">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
              className="w-full border border-gray-300 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("current")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword.current ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full border border-gray-300 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword.new ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("confirm")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-[#5a0f0f] text-white px-8 py-3 rounded-md hover:opacity-90 transition"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
