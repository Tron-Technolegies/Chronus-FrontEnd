import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { sendEnquiryMessage } from "../../utils/whatsApp";
import { useTranslation } from "react-i18next";

const Subscription = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      setError(t("home.subscription.error_required"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      setError(t("home.subscription.error_invalid"));
      return;
    }

    setError("");
    sendEnquiryMessage(email);
  };

  return (
    <section className="bg-white py-10 sm:py-28 px-4 sm:px-[6%] md:px-[8%]">
      <div className="max-w-3xl mx-auto text-center">
        <span className="block text-[11px] tracking-[1.5px] text-gray-500 mb-4 inter">
          {t("home.subscription.label")}
        </span>

        <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6 font-[Bastoni]">
          {t("home.subscription.title")}
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed mb-10 inter">
          {t("home.subscription.description")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-2">
          <input
            type="email"
            placeholder={t("home.subscription.email_placeholder")}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className={`w-full sm:w-[320px] px-4 py-3 text-sm bg-gray-100 border rounded-md focus:outline-none focus:ring-1 inter
              ${
                error ? "border-red-400 focus:ring-red-400" : "border-gray-200 focus:ring-gray-400"
              }`}
          />

          <button
            onClick={handleSubscribe}
            className="inline-flex items-center gap-2 bg-[var(--secondary-color)] text-black text-sm font-medium px-6 py-3 rounded-md shadow hover:opacity-90 transition"
          >
            <FiSend />
            {t("home.subscription.subscribe_btn")}
          </button>
        </div>

        {error && <p className="text-xs text-(--primary-color) mt-1 inter">{error}</p>}

        <p className="text-[11px] text-gray-400 mt-6 inter">
          {t("home.subscription.consent_prefix")}{" "}
          <span className="underline cursor-pointer">{t("home.subscription.consent_link")}</span> {t("home.subscription.consent_suffix")}
        </p>
      </div>
    </section>
  );
};

export default Subscription;
