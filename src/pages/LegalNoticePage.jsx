import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-lg sm:text-xl font-semibold text-[#FFEDD0] mb-4 tracking-wide border-b border-white/10 pb-3">
      {title}
    </h2>
    <div className="text-[#d4bca9]/80 text-sm sm:text-[15px] leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const LegalNoticePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a0806] text-[#FFEDD0] inter pt-24 pb-20 px-4">
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
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4bca9]/50 mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#FFEDD0] mb-4">Legal Notice</h1>
          <p className="text-[#d4bca9]/60 text-sm">Effective Date: January 2026</p>
        </div>

        <div className="bg-[#2a0e0c] border border-[#78241e3a] rounded-2xl p-6 sm:p-10 shadow-2xl shadow-[#541a1640]">
          <Section title="Website Content">
            <p>
              All content on this website, including text, images, product visuals, and design
              elements, is presented for informational and commercial purposes.
            </p>
            <p>
              Unauthorized copying, reproduction, or distribution of website materials is not
              permitted.
            </p>
          </Section>

          <Section title="Brand References">
            <p>
              Any brand names or references appearing on this website are used strictly for
              descriptive purposes. All trademarks remain the property of their respective owners.
            </p>
            <p>
              Chronos operates independently and is not affiliated with, sponsored by, or officially
              connected to any third-party brand unless explicitly stated.
            </p>
          </Section>

          <Section title="Disclaimer">
            <p>
              All products are presented as curated luxury pieces. We strive to provide accurate
              descriptions and visuals; however, slight variations may occur.
            </p>
            <p>
              Chronos shall not be held liable for any indirect or consequential damages resulting
              from the use of this website.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              This website and its use shall be governed in accordance with the laws of the United
              Arab Emirates.
            </p>
          </Section>

          <Section title="Updates">
            <p>
              Chronos reserves the right to update this Legal Notice at any time without prior
              notice.
            </p>
          </Section>

          <Section title="Contact">
            <p>For inquiries, please contact:</p>

            <p>
              Email: <span className="text-[#FFEDD0]">[Official Email]</span>
            </p>

            <p>
              WhatsApp: <span className="text-[#FFEDD0]">[Official Number]</span>
            </p>
          </Section>
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

export default LegalNoticePage;
