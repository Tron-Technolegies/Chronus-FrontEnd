import { FiTruck } from "react-icons/fi";

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
  touched,
  fieldErrors,
  handleChange,
  handleBlur,
  onContinue,
}) {
  const ic = (name) =>
    `${inputBase} ${fieldErrors[name] && touched[name] ? inputErr : inputOk}`;

  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <FiTruck className="text-[#CBA61F]" size={18} />
        <h2 className="text-sm tracking-[0.15em] font-medium uppercase">Shipping Information</h2>
      </div>
      <hr className="border-gray-100" />

      {/* First Name + Last Name */}
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

      {/* Email */}
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

      {/* Street Address */}
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

      {/* City + Postal Code + Country */}
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

      {/* Phone */}
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

      <button
        onClick={onContinue}
        className="bg-[#FFCA0A] w-full py-3.5 text-xs sm:text-sm tracking-[0.2em] font-semibold hover:bg-[#e6b600] transition-colors"
      >
        CONTINUE TO REVIEW
      </button>
    </>
  );
}
