import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { forgotPasswordAPI } from "../../api/auth";
import { FiLoader } from "react-icons/fi";

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await forgotPasswordAPI({ email });
      setMessage(res.data?.message || "Reset link sent");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Enter your email address to receive a password reset link.
        </p>
        
        {message && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm rounded-md border border-green-200 text-center">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3D1613] focus:border-transparent outline-none transition"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#3D1613] text-white rounded-xl hover:bg-[#2a0e0c] transition flex justify-center items-center font-medium disabled:opacity-70"
          >
            {loading ? <FiLoader className="animate-spin" size={20} /> : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-[#3D1613] font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
