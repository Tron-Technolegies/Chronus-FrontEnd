import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "Do you offer shipping?",
      answer:
        "Yes, we provide shipping within the United Arab Emirates, across the GCC, and internationally worldwide.",
    },
    {
      question: "What are the delivery timelines?",
      answer:
        "Within the UAE: within 24 hours.\nGCC countries: 2–3 business days.\nInternational shipping: approximately 7 business days depending on the destination.",
    },
    {
      question: "Can I request a specific item?",
      answer:
        "Yes. Chronos offers a dedicated special-order service. Whether you are looking for a specific model or a distinctive piece, our team can source it with precision and care.",
    },
    {
      question: "How can I contact Chronos?",
      answer:
        "You may contact us directly via WhatsApp or through the official email listed on our Contact page.",
    },
  ];

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
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4bca9]/50 mb-3">Support</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#FFEDD0] mb-4">
            Frequently Asked Questions
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
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-[#d4bca9] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
