import { useState, useEffect } from "react";
import { demoUser } from "../../utils/demoUser";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: demoUser.mobile, 
  });

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("demoUserAuth")
    );

    if (storedUser) {
      const fullName = storedUser.name || "";
      const nameParts = fullName.split(" ");

      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: storedUser.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
     
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 text-center sm:text-left">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden shadow">
          <img
            src={demoUser.profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold">My Profile</h2>
          <p className="text-gray-500 text-sm">
            Update your personal information
          </p>
        </div>
      </div>

     
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2 text-gray-600">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-600">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#5a0f0f]"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#5a0f0f] text-white px-8 py-3 rounded-md hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;