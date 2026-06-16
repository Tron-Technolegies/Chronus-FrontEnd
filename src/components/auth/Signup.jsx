import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../../api/auth";
import Loader from "../../components/ui/Loader";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
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

      await registerAPI(formData);

      // alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.error || t("auth.signup.registration_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader text={t("auth.signup.creating_account")} />}

      <section className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-normal text-gray-900 mb-2 font-[Bastoni]">
            {t("auth.signup.title")}
          </h2>
          <p className="text-sm text-gray-500 mb-10 inter">
            {t("auth.signup.subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label className="block text-xs text-gray-500 mb-2 inter">
                {t("auth.signup.name")}
              </label>
              <input
                type="text"
                name="full_name"
                placeholder={t("auth.signup.name_placeholder")}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 inter"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2 inter">
                {t("auth.signup.email")}
              </label>
              <input
                type="email"
                name="email"
                placeholder={t("auth.signup.email_placeholder")}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 inter"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2 inter">
                {t("auth.signup.password")}
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("auth.signup.password_placeholder")}
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
              disabled={loading}
              className="w-full bg-black text-off-white py-3 rounded-md text-sm font-medium hover:bg-black/90 transition disabled:opacity-60"
            >
              {t("auth.signup.submit")}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-10 inter">
            {t("auth.signup.already_have_account")}
            <Link to="/login" className="text-red-500 hover:underline">
              {t("auth.signup.signin_link")}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Signup;

