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

const PrivacyPage = () => {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-[#FFEDD0] mb-4">Privacy Policy</h1>
          <p className="text-[#d4bca9]/60 text-sm">Last updated: January 2026</p>
        </div>

        <div className="bg-[#2a0e0c] border border-[#78241e3a] rounded-2xl p-6 sm:p-10 shadow-2xl shadow-[#541a1640]">
          <Section title="Introduction">
            <p>
              Chronos LLC ("Chronos", "we", "our", or "us") is committed to protecting your personal
              information and your right to privacy. This Privacy Policy describes how we collect,
              use, disclose, and safeguard your information when you visit our website or make a
              purchase from us.
            </p>
            <p>
              Please read this policy carefully. If you disagree with its terms, please discontinue
              use of our site.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>When you place an order or contact us, we may collect:</p>

            <ul className="list-none space-y-2 mt-3">
              {[
                "Full name",
                "Billing and shipping address",
                "Email address",
                "Phone number",
                "Order details",
                "Payment confirmation (processed securely via third-party payment providers)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4bca9]/40 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3">
              We may also automatically collect basic technical data such as IP address, browser
              type, and usage information to improve our website performance.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use your information to:</p>

            <ul className="list-none space-y-2 mt-3">
              {[
                "Process and fulfill your orders",
                "Arrange shipping and delivery",
                "Communicate with you regarding purchases",
                "Provide customer support",
                "Improve our services and website experience",
                "Prevent fraudulent activity",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4bca9]/40 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Sharing of Information">
            <p>We may share necessary information with:</p>

            <ul className="list-none space-y-2 mt-3">
              {[
                "Payment processors",
                "Shipping and logistics partners",
                "Website hosting providers (such as Shopify)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4bca9]/40 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3">We do not sell or trade your personal information.</p>
          </Section>

          <Section title="Cookies">
            <p>
              Our website uses cookies to enhance your browsing experience and analyze website
              performance. You may disable cookies through your browser settings if preferred.
            </p>
          </Section>

          <Section title="Data Security">
            <p>
              We implement appropriate security measures to protect your personal information.
              However, no online transmission can be guaranteed as completely secure.
            </p>
          </Section>

          <Section title="Contact">
            <p>For any questions regarding this Privacy Policy, please contact us at:</p>

            <p className="mt-3">
              Email:{" "}
              <a href="mailto:[Official Email]" className="text-[#FFEDD0] hover:underline">
                [Official Email]
              </a>
            </p>

            <p>
              WhatsApp: <span className="text-[#FFEDD0]">[Official Number]</span>
            </p>
          </Section>
        </div>

        {/* Footer links */}
        <div className="mt-10 flex gap-6 text-[10px] uppercase tracking-[0.2em] text-[#d4bca9]/40">
          <Link to="/shipping" className="hover:text-[#d4bca9] transition-colors">
            Shipping Policy
          </Link>
          <Link to="/terms" className="hover:text-[#d4bca9] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
