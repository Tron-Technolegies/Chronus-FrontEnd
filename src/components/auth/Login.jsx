import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/auth";
import Loader from "../ui/Loader" 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);   
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);   

      const response = await loginAPI(formData);

      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);

      // alert("Login successful!");
      navigate("/my-account");

    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <>
      {loading && <Loader text="Signing in..." />}  

      <section className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-normal text-gray-900 mb-2 font-[Bastoni]">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mb-10 inter">
            Sign in to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label className="block text-xs text-gray-500 mb-2 inter">
                Username
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

              <div className="text-right mt-2">
                <button
                  type="button"
                  className="text-xs text-gray-400 hover:text-gray-600 inter"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}  
              className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-black/90 transition disabled:opacity-60"
            >
              Sign in
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-10 inter">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;