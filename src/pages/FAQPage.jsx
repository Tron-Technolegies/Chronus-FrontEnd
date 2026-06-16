import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const FAQPage = () => {
  const { t } = useTranslation();
  const faqs = t("faq.questions", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a0806] text-[#FFEDD0] pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#d4bca9]/60 hover:text-[#FFEDD0] transition-colors text-sm mb-10 group"
        >
          <IoArrowBack size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t("faq.back_to_home")}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4bca9]/50 mb-3">{t("faq.support")}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#FFEDD0] mb-4">
            {t("faq.title")}
          </h1>
        </div>

        {/* FAQ Card */}
        <div className="bg-[#2a0e0c] border border-[#78241e3a] rounded-2xl p-6 sm:p-10 shadow-2xl shadow-[#541a1640]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-white/10 py-5 cursor-pointer"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-[#FFEDD0] text-sm sm:text-base font-medium">{faq.question}</h3>

                {openIndex === index ? (
                  <FiMinus className="text-[#d4bca9]" />
                ) : (
                  <FiPlus className="text-[#d4bca9]" />
                )}
              </div>

              {openIndex === index && (
                <p className="mt-4 text-[#d4bca9]/80 text-sm whitespace-pre-line leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="mt-10 flex gap-6 text-[10px] uppercase tracking-[0.2em] text-[#d4bca9]/40">
          <Link to="/privacy" className="hover:text-[#d4bca9] transition-colors">
            {t("faq.privacy_policy")}
          </Link>
          <Link to="/terms" className="hover:text-[#d4bca9] transition-colors">
            {t("faq.terms_of_service")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
