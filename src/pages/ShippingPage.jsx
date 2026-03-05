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

const ShippingPage = () => {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-[#FFEDD0] mb-4">Shipping Policy</h1>
          <p className="text-[#d4bca9]/60 text-sm">Last updated: January 2026</p>
        </div>

        <div className="bg-[#2a0e0c] border border-[#78241e3a] rounded-2xl p-6 sm:p-10 shadow-2xl shadow-[#541a1640]">

          <Section title="Overview">
            <p>
              At Chronos, we are committed to delivering your timepiece with the same level of care
              and precision that went into crafting it. Every order is handled with the utmost
              discretion and attention to detail, ensuring your purchase arrives in perfect condition.
            </p>
          </Section>

          <Section title="Processing Time">
            <p>
              All orders are processed within <span className="text-[#FFEDD0]">1–3 business days</span> of
              payment confirmation. Orders placed on weekends or UAE public holidays will be processed
              on the next available business day.
            </p>
            <p>
              For bespoke or made-to-order pieces, a dedicated Chronos concierge will contact you
              within 24 hours to discuss delivery timelines.
            </p>
          </Section>

          <Section title="Domestic Shipping (UAE)">
            <p>We offer the following shipping options within the United Arab Emirates:</p>
            <ul className="list-none space-y-2 mt-3">
              {[
                { label: "Standard Delivery", detail: "3–5 business days — Complimentary on all orders" },
                { label: "Express Delivery", detail: "1–2 business days — AED 45" },
                { label: "Same-Day Delivery (Dubai)", detail: "Available for select items — AED 85" },
              ].map(({ label, detail }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4bca9]/40 mt-2 shrink-0" />
                  <span>
                    <span className="text-[#FFEDD0] font-medium">{label}:</span> {detail}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="International Shipping">
            <p>
              We ship worldwide to over 50 countries. International orders are shipped via
              fully insured, signature-required courier services.
            </p>
            <ul className="list-none space-y-2 mt-3">
              {[
                { label: "GCC Countries", detail: "5–8 business days — Complimentary on orders above AED 2,000" },
                { label: "Europe & Americas", detail: "7–12 business days — AED 150 or complimentary on orders above AED 5,000" },
                { label: "Asia Pacific", detail: "6–10 business days — AED 120 or complimentary on orders above AED 4,000" },
              ].map(({ label, detail }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4bca9]/40 mt-2 shrink-0" />
                  <span>
                    <span className="text-[#FFEDD0] font-medium">{label}:</span> {detail}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Import duties and taxes applicable in the destination country are the
              responsibility of the recipient.
            </p>
          </Section>

          <Section title="Order Tracking">
            <p>
              Once your order has been dispatched, you will receive an email confirmation with a
              tracking number. You can track your order in real time via the carrier's website or
              through your Chronos account under <span className="text-[#FFEDD0]">My Orders</span>.
            </p>
          </Section>

          <Section title="Packaging">
            <p>
              Every Chronos piece is packed in our signature presentation box, wrapped in protective
              material, and placed inside a discreet outer carton. High-value orders are shipped with
              an additional layer of tamper-evident security sealing.
            </p>
          </Section>

          <Section title="Damaged or Lost Shipments">
            <p>
              In the unlikely event that your order arrives damaged or is lost in transit, please
              contact our concierge team within <span className="text-[#FFEDD0]">48 hours</span> of
              the expected delivery date. We will initiate an investigation and, where applicable,
              arrange a replacement or full refund at no cost to you.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              For shipping inquiries, please reach our team at{" "}
              <a
                href="mailto:concierge@chronos.ae"
                className="text-[#FFEDD0] hover:underline transition-all"
              >
                concierge@chronos.ae
              </a>{" "}
              or call{" "}
              <a href="tel:+97141234567" className="text-[#FFEDD0] hover:underline">
                +971 4 123 4567
              </a>
              .
            </p>
          </Section>
        </div>

        {/* Footer links */}
        <div className="mt-10 flex gap-6 text-[10px] uppercase tracking-[0.2em] text-[#d4bca9]/40">
          <Link to="/privacy" className="hover:text-[#d4bca9] transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-[#d4bca9] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
