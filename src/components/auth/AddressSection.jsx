import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAddressesAPI, addAddressAPI, updateAddressAPI, deleteAddressAPI } from "../../api/auth";
import { FiLoader, FiTrash2, FiEdit2, FiX } from "react-icons/fi";

const AddressSection = () => {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultForm = {
    full_name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    is_default: false,
  };

  const [formData, setFormData] = useState(defaultForm);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await getAddressesAPI();
      setAddresses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEdit = (address) => {
    setEditingId(address.id);
    setFormData({
      full_name: address.full_name || "",
      phone: address.phone || "",
      address_line_1: address.address_line_1 || "",
      address_line_2: address.address_line_2 || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "",
      postal_code: address.postal_code || "",
      is_default: address.is_default || false,
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setIsDeleting(true);
    try {
      await deleteAddressAPI(confirmDeleteId);
      setAddresses(addresses.filter(a => a.id !== confirmDeleteId));
    } catch (err) {
      console.error("Failed to delete address", err);
      alert("Failed to delete address");
    } finally {
      setIsDeleting(false);
      setConfirmDeleteId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingId) {
        await updateAddressAPI(editingId, formData);
      } else {
        await addAddressAPI(formData);
      }
      await fetchAddresses();
      setFormData(defaultForm);
      setEditingId(null);
    } catch (err) {
      console.error("Failed to save address", err);
      alert("Failed to save address");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">{t("auth.saved_address", "Saved Addresses")}</h2>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative">
            <button 
              onClick={() => setConfirmDeleteId(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              disabled={isDeleting}
            >
              <FiX size={20} />
            </button>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Address</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this address? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md flex items-center gap-2 transition disabled:opacity-70"
              >
                {isDeleting ? <FiLoader className="animate-spin" size={16} /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <FiLoader className="animate-spin text-[#5a0f0f]" size={28} />
        </div>
      ) : addresses.length === 0 ? (
        <div className="mb-10 p-6 text-center border border-dashed border-gray-300 rounded-lg text-gray-500">
          No addresses found. Please add a new one below.
        </div>
      ) : (
        <div className="space-y-4 mb-10">
          {addresses.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-5 bg-white shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-800">{item.full_name}</p>
                  {item.is_default && (
                    <span className="text-[10px] bg-[#3D1613] text-white px-2 py-0.5 rounded-full uppercase font-medium">Default</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {item.address_line_1} {item.address_line_2 && `, ${item.address_line_2}`}
                </p>
                <p className="text-sm text-gray-500">
                  {item.city}, {item.state} {item.postal_code}, {item.country}
                </p>
                <p className="text-sm text-gray-500 mt-1">Phone: {item.phone}</p>
              </div>

              <div className="flex gap-3 text-sm shrink-0">
                <button 
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-1 text-gray-600 hover:text-[#3D1613] transition"
                >
                  <FiEdit2 size={14} /> {t("auth.edit", "Edit")}
                </button>
                <button 
                  onClick={() => setConfirmDeleteId(item.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                >
                  <FiTrash2 size={14} /> {t("auth.delete", "Delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{editingId ? "Edit Address" : t("auth.add_new_address", "Add New Address")}</h3>
        {editingId && (
          <button 
            type="button" 
            onClick={() => { setEditingId(null); setFormData(defaultForm); }}
            className="text-sm text-gray-500 hover:text-gray-800 underline"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2 text-gray-600">Full Name</label>
            <input
              type="text"
              name="full_name"
              required
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">Address Line 1</label>
          <input
            type="text"
            name="address_line_1"
            required
            value={formData.address_line_1}
            onChange={handleChange}
            placeholder="Street address, P.O. box, etc."
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">Address Line 2 (Optional)</label>
          <input
            type="text"
            name="address_line_2"
            value={formData.address_line_2}
            onChange={handleChange}
            placeholder="Apartment, suite, unit, etc."
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2 text-gray-600">City</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">State / Province</label>
            <input
              type="text"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              placeholder="State / Province"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2 text-gray-600">Postal Code</label>
            <input
              type="text"
              name="postal_code"
              required
              value={formData.postal_code}
              onChange={handleChange}
              placeholder="Postal Code"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">Country</label>
            <select
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UAE">UAE</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="is_default"
            name="is_default"
            checked={formData.is_default}
            onChange={handleChange}
            className="w-4 h-4 text-[#3D1613] focus:ring-[#3D1613] border-gray-300 rounded"
          />
          <label htmlFor="is_default" className="text-sm text-gray-600 cursor-pointer">
            Set as default address
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#5a0f0f] flex items-center justify-center text-off-white px-8 py-3 rounded-md hover:opacity-90 transition disabled:opacity-70 min-w-[150px]"
          >
            {submitting ? (
              <FiLoader className="animate-spin" size={20} />
            ) : editingId ? (
              "Update Address"
            ) : (
              t("auth.submit_add_address", "Add Address")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressSection;


