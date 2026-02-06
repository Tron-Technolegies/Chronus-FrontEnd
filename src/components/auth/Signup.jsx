import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        {/* Heading */}
        <h2 className="text-3xl font-normal text-gray-900 mb-2 font-[Bastoni]">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mb-10 inter">
          Join our exclusive community of collectors
        </p>

        {/* Form */}
        <form className="space-y-6 text-left">
          {/* Name */}
          <div>
            <label className="block text-xs text-gray-500 mb-2 inter">
              Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 inter"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-gray-500 mb-2 inter">
              Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 inter"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-gray-500 mb-2 inter">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
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

          {/* Sign up Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-black/90 transition"
          >
            Sign up
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-10 inter">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 hover:underline"
          >
            Sign in now
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
