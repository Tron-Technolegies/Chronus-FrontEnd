import { useState, useEffect } from "react";
import { getProfileAPI, updateProfileAPI } from "../../api/auth";
import { FiUser, FiSave, FiLoader } from "react-icons/fi";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getProfileAPI();
        const u = res.data;
        setFormData({
          first_name: u.first_name ?? u.firstName ?? "",
          last_name:  u.last_name  ?? u.lastName  ?? "",
          email:      u.email      ?? "",
          phone:      u.phone      ?? u.mobile     ?? "",
        });
      } catch {
        // Fall back to JWT token user info stored at login
        const stored = JSON.parse(localStorage.getItem("user") || "null");
        if (stored) {
          const parts = (stored.name ?? stored.username ?? "").split(" ");
          setFormData({
            first_name: stored.first_name ?? parts[0] ?? "",
            last_name:  stored.last_name  ?? parts.slice(1).join(" ") ?? "",
            email:      stored.email ?? "",
            phone:      stored.phone ?? "",
          });
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await updateProfileAPI(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err?.response?.data?.detail ?? "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-7 h-7 border-2 border-[#5a0f0f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-[#f0e8d8] flex items-center justify-center shrink-0">
          <FiUser size={28} className="text-[#5a0f0f]" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">My Profile</h2>
          <p className="text-gray-500 text-sm">Update your personal information</p>
        </div>
      </div>

      {/* Alerts */}
      {success && (
        <p className="mb-4 text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-md">
          Profile updated successfully!
        </p>
      )}
      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-md">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2 text-gray-600">First Name</label>
            <input
              type="text" name="first_name" value={formData.first_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">Last Name</label>
            <input
              type="text" name="last_name" value={formData.last_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">Email Address</label>
          <input
            type="email" name="email" value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">Phone Number</label>
          <input
            type="text" name="phone" value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#5a0f0f] text-white px-8 py-3 rounded-md hover:opacity-90 transition disabled:opacity-60"
          >
            {saving ? <FiLoader className="animate-spin" size={15} /> : <FiSave size={15} />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;