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

const TermsPage = () => {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-[#FFEDD0] mb-4">Terms of Service</h1>
          <p className="text-[#d4bca9]/60 text-sm">Last updated: January 2026</p>
        </div>

        <div className="bg-[#2a0e0c] border border-[#78241e3a] rounded-2xl p-6 sm:p-10 shadow-2xl shadow-[#541a1640]">

          <Section title="Agreement to Terms">
            <p>
              By accessing or using the Chronos website ("Site") or purchasing any product from us,
              you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please
              refrain from using our Site or services.
            </p>
            <p>
              These Terms are governed by the laws of the United Arab Emirates and the emirate of
              Dubai. Any disputes shall be subject to the exclusive jurisdiction of the Dubai courts.
            </p>
          </Section>

          <Section title="Use of the Site">
            <p>You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of others. Specifically, you must not:</p>
            <ul className="list-none space-y-2 mt-3">
              {[
                "Use the Site in any way that violates applicable local, national, or international laws",
                "Transmit unsolicited or unauthorised advertising or promotional material",
                "Attempt to gain unauthorised access to any part of the Site or its systems",
                "Use automated tools to scrape, crawl, or extract data from the Site",
                "Impersonate any person or misrepresent your identity or affiliation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4bca9]/40 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Account Registration">
            <p>
              To access certain features you may be required to create an account. You are responsible
              for maintaining the confidentiality of your account credentials and for all activities
              that occur under your account. You agree to notify us immediately of any unauthorised
              use of your account at{" "}
              <a href="mailto:concierge@chronos.ae" className="text-[#FFEDD0] hover:underline">
                concierge@chronos.ae
              </a>
              .
            </p>
          </Section>

          <Section title="Products and Pricing">
            <p>
              All products displayed on the Site are subject to availability. We reserve the right
              to discontinue any product at any time without notice.
            </p>
            <p>
              Prices are listed in UAE Dirhams (AED) and are inclusive of applicable VAT unless
              otherwise stated. We reserve the right to modify prices at any time. Price changes will
              not affect orders that have already been confirmed.
            </p>
            <p>
              While we strive to ensure all product descriptions and images are accurate, minor
              variations may occur. Product images are for illustrative purposes and actual products
              may vary slightly in colour and appearance.
            </p>
          </Section>

          <Section title="Orders and Payment">
            <p>
              Placing an order constitutes an offer to purchase. We reserve the right to decline or
              cancel any order at our discretion, including in cases of pricing errors, suspected
              fraud, or stock unavailability. You will be notified promptly and any payment received
              will be fully refunded.
            </p>
            <p>
              By providing payment details, you confirm that you are authorised to use the payment
              method and that the information provided is accurate.
            </p>
          </Section>

          <Section title="Returns and Refunds">
            <p>
              We accept returns within <span className="text-[#FFEDD0]">14 days</span> of delivery,
              provided the item is in its original, unused condition with all packaging and
              accompanying documentation intact. To initiate a return, please contact our concierge
              team.
            </p>
            <p>
              Bespoke, personalised, or made-to-order pieces are non-returnable unless they arrive
              damaged or faulty.
            </p>
            <p>
              Approved refunds will be processed within 5–10 business days to the original payment
              method.
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content on this Site — including text, images, logos, designs, and software — is
              the exclusive intellectual property of Chronos LLC or its licensors and is protected
              by UAE and international copyright laws. Unauthorised reproduction or use of any
              content is strictly prohibited.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Chronos shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of the
              Site or any products purchased. Our total liability in connection with any claim shall
              not exceed the amount paid by you for the relevant product.
            </p>
          </Section>

          <Section title="Disclaimers">
            <p>
              The Site and its content are provided on an "as is" and "as available" basis without
              any warranties of any kind, either express or implied. We do not warrant that the Site
              will be error-free, uninterrupted, or free of viruses or other harmful components.
            </p>
          </Section>

          <Section title="Changes to Terms">
            <p>
              We reserve the right to update or modify these Terms at any time. Changes will take
              effect upon posting to the Site. Continued use of the Site following any changes
              constitutes your acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              For any questions regarding these Terms, please contact us at{" "}
              <a href="mailto:concierge@chronos.ae" className="text-[#FFEDD0] hover:underline">
                concierge@chronos.ae
              </a>{" "}
              or at our registered office:
            </p>
            <address className="not-italic mt-3 text-[#d4bca9]/70">
              Chronos LLC<br />
              Sheikh Zayed Road<br />
              Dubai, United Arab Emirates
            </address>
          </Section>
        </div>

        {/* Footer links */}
        <div className="mt-10 flex gap-6 text-[10px] uppercase tracking-[0.2em] text-[#d4bca9]/40">
          <Link to="/shipping" className="hover:text-[#d4bca9] transition-colors">Shipping Policy</Link>
          <Link to="/privacy" className="hover:text-[#d4bca9] transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
