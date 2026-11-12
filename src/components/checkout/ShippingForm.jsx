import { useState, useEffect, useCallback } from "react";
import { FiTruck, FiEdit2 } from "react-icons/fi";
import { getAddressesAPI } from "../../api/auth";
import { COUNTRIES } from "../../utils/countries";
import { formatMoney, parseAmount } from "../../utils/currency";

const inputBase =
  "w-full border rounded-sm px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 bg-white";
const inputOk = "border-gray-200 focus:border-[#CBA61F] focus:ring-1 focus:ring-[#CBA61F]";
const inputErr = "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50";

const EMPTY_ADDRESS_FIELDS = {
  first_name: "",
  last_name: "",
  address_line_1: "",
  address_line_2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

function Field({ error, children }) {
  return (
    <div>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function ShippingForm({
  form,
  setForm,
  touched,
  fieldErrors,
  handleChange,
  handleBlur,
  onContinue,
  partners = [],
  partnersLoading = false,
  selectedPartnerId = null,
  onSelectPartner,
  partnerError = "",
  currency = "AED",
  onSaveAddress,
}) {
  const ic = (name) =>
    `${inputBase} ${fieldErrors[name] && touched[name] ? inputErr : inputOk}`;

  const [addresses, setAddresses] = useState([]);
  const [loadingAddrs, setLoadingAddrs] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveErr, setSaveErr] = useState("");
  const [editingId, setEditingId] = useState(null);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const loadAddresses = useCallback(async () => {
    const res = await getAddressesAPI();
    const list = Array.isArray(res.data) ? res.data : [];
    setAddresses(list);
    return list;
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoadingAddrs(true);
    loadAddresses()
      .then((list) => {
        if (list.length > 0 && !form.address_id) {
          const defaultAddr = list.find((a) => a.is_default) || list[0];
          setForm((prev) => ({ ...prev, address_id: defaultAddr.id }));
        }
      })
      .catch(console.error)
      .finally(() => setLoadingAddrs(false));
  }, [isLoggedIn, setForm, loadAddresses]);

  const clearMessages = () => {
    setSaveMsg("");
    setSaveErr("");
  };

  // Open the form pre-filled with the chosen saved address
  const handleEditClick = (addr) => {
    clearMessages();
    const [first = "", ...rest] = (addr.full_name || "").trim().split(" ");
    setEditingId(addr.id);
    setForm((prev) => ({
      ...prev,
      address_id: "",
      first_name: first,
      last_name: rest.join(" "),
      address_line_1: addr.address_line_1 || "",
      address_line_2: addr.address_line_2 || "",
      city: addr.city || "",
      state: addr.state || "",
      postal_code: addr.postal_code || "",
      country: addr.country || "",
      phone: addr.phone || "",
    }));
  };

  const handleCancelEdit = () => {
    const id = editingId;
    clearMessages();
    setEditingId(null);
    setForm((prev) => ({ ...prev, ...EMPTY_ADDRESS_FIELDS, address_id: id ?? "" }));
  };

  const handleSaveClick = async () => {
    clearMessages();
    setSaving(true);
    try {
      const current = addresses.find((a) => a.id === editingId);
      const saved = await onSaveAddress(editingId, current?.is_default ?? false);
      const list = await loadAddresses();

      // Select the saved address (the edited one, or the newly created one)
      const newId =
        editingId ??
        saved?.id ??
        saved?.address?.id ??
        saved?.address_id ??
        (list.length ? Math.max(...list.map((a) => a.id)) : "");

      setEditingId(null);
      setForm((prev) => ({ ...prev, ...EMPTY_ADDRESS_FIELDS, address_id: newId }));
      setSaveMsg(editingId ? "Address updated." : "Address saved.");
    } catch (err) {
      setSaveErr(
        err?.response?.data?.detail ??
          err?.response?.data?.error ??
          err?.response?.data?.message ??
          err?.message ??
          "Could not save the address."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <FiTruck className="text-[#CBA61F]" size={18} />
        <h2 className="text-sm tracking-[0.15em] font-medium uppercase">Shipping Information</h2>
      </div>
      <hr className="border-gray-100" />

      {/* Saved Addresses (if logged in) */}
      {isLoggedIn && addresses.length > 0 && (
        <div className="mb-6 space-y-3">
          <p className="text-sm font-medium text-gray-700">Select a Saved Address:</p>
          <div className="grid grid-cols-1 gap-3">
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className={`flex items-start gap-3 border rounded-md p-4 cursor-pointer transition ${
                  form.address_id === addr.id ? "border-[#CBA61F] bg-[#fff9e8]" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="address_id"
                  value={addr.id}
                  checked={form.address_id === addr.id}
                  onChange={(e) => {
                    clearMessages();
                    setEditingId(null);
                    setForm((f) => ({ ...f, address_id: parseInt(e.target.value) }));
                  }}
                  className="mt-1 text-[#CBA61F] focus:ring-[#CBA61F]"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800">{addr.full_name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {addr.address_line_1} {addr.address_line_2 && `, ${addr.address_line_2}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {addr.city}, {addr.state} {addr.postal_code}, {addr.country}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Phone: {addr.phone}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEditClick(addr);
                  }}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#3D1613] transition shrink-0"
                >
                  <FiEdit2 size={13} /> Edit
                </button>
              </label>
            ))}
            <label
              className={`flex items-center gap-3 border rounded-md p-4 cursor-pointer transition ${
                !form.address_id && !editingId ? "border-[#CBA61F] bg-[#fff9e8]" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="address_id"
                value=""
                checked={!form.address_id && !editingId}
                onChange={() => {
                  clearMessages();
                  setEditingId(null);
                  setForm((f) => ({ ...f, ...EMPTY_ADDRESS_FIELDS, address_id: "" }));
                }}
                className="text-[#CBA61F] focus:ring-[#CBA61F]"
              />
              <span className="font-medium text-sm text-gray-800">Enter a new address</span>
            </label>
          </div>
        </div>
      )}

      {saveMsg && form.address_id && (
        <p className="text-xs text-green-600 mb-3">{saveMsg}</p>
      )}

      {/* Email (Always shown) */}
      <Field error={touched.email && fieldErrors.email}>
        <input
          className={ic("email")}
          name="email"
          placeholder="Email Address *"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>

      {/* Manual Address Fields */}
      {!form.address_id && (
        <div className="space-y-4 mt-4">
          {editingId && (
            <p className="text-sm font-medium text-gray-700">Editing saved address</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field error={touched.first_name && fieldErrors.first_name}>
              <input
                className={ic("first_name")}
                name="first_name"
                placeholder="First Name *"
                value={form.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Field error={touched.last_name && fieldErrors.last_name}>
              <input
                className={ic("last_name")}
                name="last_name"
                placeholder="Last Name *"
                value={form.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
          </div>

          <Field error={touched.address_line_1 && fieldErrors.address_line_1}>
            <input
              className={ic("address_line_1")}
              name="address_line_1"
              placeholder="Street Address 1 *"
              maxLength={45}
              value={form.address_line_1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          <Field error={touched.address_line_2 && fieldErrors.address_line_2}>
            <input
              className={ic("address_line_2")}
              name="address_line_2"
              placeholder="Street Address 2 (Optional)"
              value={form.address_line_2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field error={touched.city && fieldErrors.city}>
              <input
                className={ic("city")}
                name="city"
                placeholder="City *"
                value={form.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Field error={touched.state && fieldErrors.state}>
              <input
                className={ic("state")}
                name="state"
                placeholder="State *"
                value={form.state}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Field error={touched.postal_code && fieldErrors.postal_code}>
              <input
                className={ic("postal_code")}
                name="postal_code"
                placeholder="Postal Code *"
                value={form.postal_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Field error={touched.country && fieldErrors.country}>
              <select
                className={ic("country")}
                name="country"
                value={form.country}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Country *</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field error={touched.phone && fieldErrors.phone}>
            <input
              className={ic("phone")}
              name="phone"
              placeholder="Phone Number *"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          {/* Save / update address (logged-in users only) */}
          {isLoggedIn && onSaveAddress && (
            <div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveClick}
                  disabled={saving}
                  className="border border-[#CBA61F] text-[#3D1613] px-5 py-2.5 text-xs tracking-[0.15em] font-semibold hover:bg-[#fff9e8] transition-colors disabled:opacity-60 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#CBA61F]/40 border-t-[#CBA61F] rounded-full animate-spin" />
                      SAVING...
                    </>
                  ) : editingId ? (
                    "UPDATE ADDRESS"
                  ) : (
                    "SAVE ADDRESS"
                  )}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="text-xs text-gray-500 hover:text-gray-800 underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
              {saveErr && <p className="mt-2 text-xs text-red-500">{saveErr}</p>}
            </div>
          )}
        </div>
      )}

      {/* Shipping method */}
      <div className="mt-6 space-y-3">
        <p className="text-sm font-medium text-gray-700">Shipping Partners</p>

        {partnersLoading ? (
          <p className="text-xs text-gray-400">Loading shipping options…</p>
        ) : partners.length === 0 ? (
          <p className="text-xs text-red-500">
            No shipping options are available right now. Please try again later.
          </p>
        ) : (
          partners.map((p) => (
            <label
              key={p.id}
              className={`flex items-center justify-between gap-4 border rounded-md p-4 cursor-pointer transition ${
                selectedPartnerId === p.id
                  ? "border-[#CBA61F] bg-[#fff9e8]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping_partner"
                  checked={selectedPartnerId === p.id}
                  onChange={() => onSelectPartner(p.id)}
                  className="text-[#CBA61F] focus:ring-[#CBA61F]"
                />
                <div>
                  <p className="font-medium text-sm text-gray-800">{p.name}</p>
                  {p.estimated_delivery && (
                    <p className="text-xs text-gray-500 mt-0.5">{p.estimated_delivery}</p>
                  )}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-800">
                {(parseAmount(p.shipping_charge) ?? 0) > 0
                  ? formatMoney(parseAmount(p.shipping_charge), currency)
                  : "Free"}
              </span>
            </label>
          ))
        )}

        {partnerError && <p className="text-xs text-red-500">{partnerError}</p>}
      </div>

      <button
        onClick={onContinue}
        className="bg-[#FFCA0A] w-full mt-6 py-3.5 text-xs sm:text-sm tracking-[0.2em] font-semibold hover:bg-[#e6b600] transition-colors"
      >
        CONTINUE TO REVIEW
      </button>
    </>
  );
}