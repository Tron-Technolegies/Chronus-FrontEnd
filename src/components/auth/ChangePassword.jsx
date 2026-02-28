import { useState } from "react";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { changePasswordAPI } from "../../api/auth";

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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState(null);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleVisibility = (field) =>
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await changePasswordAPI({
        old_password:     formData.currentPassword,
        new_password:     formData.newPassword,
        confirm_password: formData.confirmPassword,
      });
      setSuccess(true);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(
        err?.response?.data?.detail ??
        err?.response?.data?.old_password?.[0] ??
        "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "current",  name: "currentPassword", label: "Current Password",  vis: showPassword.current },
    { key: "new",      name: "newPassword",      label: "New Password",      vis: showPassword.new },
    { key: "confirm",  name: "confirmPassword",  label: "Confirm Password",  vis: showPassword.confirm },
  ];

  return (
    <div className="max-w-xl">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Change Password</h2>

      {success && (
        <p className="mb-4 text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-md">
          Password changed successfully!
        </p>
      )}
      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-md">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map(({ key, name, label, vis }) => (
          <div key={key}>
            <label className="block text-sm mb-2 text-gray-600">{label}</label>
            <div className="relative">
              <input
                type={vis ? "text" : "password"}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={label}
                required
                className="w-full border border-gray-300 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
              />
              <button
                type="button"
                onClick={() => toggleVisibility(key)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {vis ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
        ))}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#5a0f0f] text-white px-8 py-3 rounded-md hover:opacity-90 transition disabled:opacity-60"
          >
            {loading && <FiLoader className="animate-spin" size={15} />}
            {loading ? "Updating…" : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
