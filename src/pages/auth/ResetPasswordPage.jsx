import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPasswordAPI } from "../../api/auth";
import { FiLoader } from "react-icons/fi";

const ResetPasswordPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await resetPasswordAPI({ uid, token, password });
      setMessage(res.data?.message || "Password updated successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Reset Password</h2>
        
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

        {!message && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3D1613] focus:border-transparent outline-none transition"
                placeholder="Enter new password"
                minLength="8"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3D1613] focus:border-transparent outline-none transition"
                placeholder="Confirm new password"
                minLength="8"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#3D1613] text-white rounded-xl hover:bg-[#2a0e0c] transition flex justify-center items-center font-medium disabled:opacity-70"
            >
              {loading ? <FiLoader className="animate-spin" size={20} /> : "Reset Password"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-[#3D1613] transition">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
