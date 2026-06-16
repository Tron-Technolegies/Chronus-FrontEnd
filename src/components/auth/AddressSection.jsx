import { useState } from "react";
import { useTranslation } from "react-i18next";

const AddressSection = () => {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();

    const newAddress = {
      id: Date.now(),
      name: formData.firstName + " " + formData.lastName,
      address: formData.address,
    };

    setAddresses([...addresses, newAddress]);

    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      country: "",
      email: "",
      mobile: "",
    });
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">{t("auth.saved_address")}</h2>

      <div className="space-y-4 mb-10">
        {addresses.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-5 bg-white shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="font-medium text-gray-800">
                {item.name || "Bessie Cooper"}
              </p>
              <p className="text-sm text-gray-500 mt-1">{item.address}</p>
            </div>

            <div className="flex gap-4 text-sm">
              <button className="text-gray-600 hover:underline">{t("auth.edit")}</button>
              <button className="text-red-500 hover:underline">{t("auth.delete")}</button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-6">{t("auth.add_new_address")}</h3>

      <form onSubmit={handleAddAddress} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2 text-gray-600">
              {t("auth.first_name")}
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t("auth.ex_first_name")}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-600">
              {t("auth.last_name")}
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t("auth.ex_last_name")}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">{t("auth.address_label")}</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder={t("auth.address_label")}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">{t("auth.country")}</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
          >
            <option value="">{t("auth.select_country")}</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UAE">UAE</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">{t("auth.email_label")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("auth.email_address")}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">{t("auth.mobile")}</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+91 9876543213"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-[#5a0f0f] text-off-white px-8 py-3 rounded-md hover:opacity-90 transition"
          >
            {t("auth.submit_add_address")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressSection;

