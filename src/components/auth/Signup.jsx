import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("demoUserAuth", JSON.stringify(formData));

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <h2 className="text-3xl font-normal text-gray-900 mb-2 font-[Bastoni]">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mb-10 inter">
          Join our exclusive community of collectors
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="block text-xs text-gray-500 mb-2 inter">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 inter"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2 inter">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 inter"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2 inter">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 inter pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-black/90 transition"
          >
            Sign up
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-10 inter">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Sign in now
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;