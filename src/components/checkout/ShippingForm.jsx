import { useState, useEffect } from "react";
import { FiTruck } from "react-icons/fi";
import { getAddressesAPI } from "../../api/auth";

const inputBase =
  "w-full border rounded-sm px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 bg-white";
const inputOk = "border-gray-200 focus:border-[#CBA61F] focus:ring-1 focus:ring-[#CBA61F]";
const inputErr = "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-300 bg-red-50";

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
}) {
  const ic = (name) =>
    `${inputBase} ${fieldErrors[name] && touched[name] ? inputErr : inputOk}`;

  const [addresses, setAddresses] = useState([]);
  const [loadingAddrs, setLoadingAddrs] = useState(false);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    if (isLoggedIn) {
      setLoadingAddrs(true);
      getAddressesAPI()
        .then((res) => {
          setAddresses(res.data || []);
          if (res.data?.length > 0 && !form.address_id) {
            const defaultAddr = res.data.find(a => a.is_default) || res.data[0];
            setForm((prev) => ({ ...prev, address_id: defaultAddr.id }));
          }
        })
        .catch(console.error)
        .finally(() => setLoadingAddrs(false));
    }
  }, [isLoggedIn, setForm]);

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
                  onChange={(e) => setForm(f => ({ ...f, address_id: parseInt(e.target.value) }))}
                  className="mt-1 text-[#CBA61F] focus:ring-[#CBA61F]"
                />
                <div>
                  <p className="font-medium text-sm text-gray-800">{addr.full_name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {addr.address_line_1} {addr.address_line_2 && `, ${addr.address_line_2}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {addr.city}, {addr.state} {addr.postal_code}, {addr.country}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Phone: {addr.phone}</p>
                </div>
              </label>
            ))}
            <label
              className={`flex items-center gap-3 border rounded-md p-4 cursor-pointer transition ${
                !form.address_id ? "border-[#CBA61F] bg-[#fff9e8]" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="address_id"
                value=""
                checked={!form.address_id}
                onChange={() => setForm(f => ({ ...f, address_id: "" }))}
                className="text-[#CBA61F] focus:ring-[#CBA61F]"
              />
              <span className="font-medium text-sm text-gray-800">Enter a new address</span>
            </label>
          </div>
        </div>
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

          <Field error={touched.address && fieldErrors.address}>
            <input
              className={ic("address")}
              name="address"
              placeholder="Street Address *"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <option value="India">India</option>
                <option value="UAE">UAE</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
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
        </div>
      )}

      <button
        onClick={onContinue}
        className="bg-[#FFCA0A] w-full mt-6 py-3.5 text-xs sm:text-sm tracking-[0.2em] font-semibold hover:bg-[#e6b600] transition-colors"
      >
        CONTINUE TO REVIEW
      </button>
    </>
  );
}
