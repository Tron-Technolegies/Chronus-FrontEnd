import React from "react";
import { FaInstagram, FaSnapchatGhost, FaWeixin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useFooterCollections } from "../../hooks/useFooterCollections";

const SOCIALS = [
  { Icon: FaInstagram, href: "https://instagram.com/chronos_ae", label: "Instagram" },
  { Icon: IoLogoWhatsapp, href: "https://wa.me/971569778080", label: "WhatsApp" },
  { Icon: FaSnapchatGhost, href: "https://www.snapchat.com/@chronos_ae", label: "Snapchat" },
  { Icon: FaWeixin, href: "https://weixin.qq.com/t/chronosgallery", label: "WeChat" },
];

const Footer = () => {
  const { collections, loading: collectionsLoading } = useFooterCollections();

  return (
    <footer
      className="bg-[#1a0806] pt-10 sm:pt-14 md:pt-16 relative flex flex-col items-center overflow-hidden inter text-off-white"
      id="contact"
    >
      <div className="w-[94%] sm:w-[92%] max-w-[1400px] bg-[#2a0e0c] rounded-[22px] sm:rounded-[36px] md:rounded-[40px] px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 relative z-10 border border-[#78241e5d] shadow-2xl shadow-[#541a1685]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 md:gap-12 mb-10 sm:mb-14">
          {" "}
          {/* Brand */}
          <div className="space-y-5">
            <img
              src="/chronus-logo.png"
              alt="Chronos"
              className="h-6 sm:h-7 w-auto object-contain"
            />

            <p className="text-off-white-70 text-sm leading-relaxed max-w-[280px]">
              Curating the world's finest timepieces, accessories, and art since 1892. Each piece
              tells a story of uncompromising craftsmanship.
            </p>

            <div className="flex gap-3 flex-wrap">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-[#1a0806] flex items-center justify-center text-off-white-80 hover:bg-[#F7F1E7] hover:text-[#1a0806] transition-all duration-200"
                >
                  <social.Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {/* Collections */}
          <div className="text-off-white-80 sm:pl-4 lg:pl-10">
            <h3 className="font-semibold mb-5 uppercase tracking-wider text-sm">Collections</h3>

            <ul className="space-y-3 text-sm">
              {collectionsLoading && (
                <li className="text-off-white-50">Loading collections...</li>
              )}

              {!collectionsLoading &&
                collections.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-off-white-70 hover:text-off-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {label}
                  </Link>
                </li>
                ))}
            </ul>
          </div>
          {/* Services */}
          {/* <div className="text-[#d4bca9]">
            <h3 className="font-semibold mb-4 sm:mb-6 uppercase tracking-wider text-sm">
              Services
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              {SERVICES.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[#d4bca9]/70 hover:text-[#FFEDD0] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          {/* Contact */}
          <div className="text-off-white-80">
            <h3 className="font-semibold mb-5 uppercase tracking-wider text-sm">Contact Us</h3>

            <ul className="space-y-4 text-sm opacity-70">
              <li className="flex items-start gap-3">
                <IoLocationOutline size={18} className="mt-1 shrink-0" />
                <span>
                  Sheikh Zayed Road, Dubai,
                  <br />
                  United Arab Emirates
                </span>
              </li>

              <li className="flex items-center gap-3">
                <IoCallOutline size={18} className="shrink-0" />
                <a href="tel:+8618688886313" className="hover:opacity-100 transition-opacity">
                  +86 186 8888 6313
                </a>
              </li>

              <li className="flex items-center gap-3">
                <IoMailOutline size={18} className="shrink-0" />
                <a
                  href="mailto:concierge@chronos.ae"
                  className="break-all hover:opacity-100 transition-opacity"
                >
                  concierge@chronos.ae
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-off-white-50 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-center">
          <p>© 2026 CHRONOS. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            <Link to="/privacy" className="hover:text-off-white transition-colors duration-200">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-off-white transition-colors duration-200">
              Terms of Service
            </Link>

            <Link to="/shipping" className="hover:text-off-white transition-colors duration-200">
              Shipping Policy
            </Link>

            <Link to="/legal" className="hover:text-off-white transition-colors duration-200">
              Legal Notice
            </Link>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="relative w-full max-w-[1150px] z-0 px-4 pt-6 md:pt-10 select-none pointer-events-none">
        <img
          src="/footer-img.svg"
          alt="Chronos Large Watermark"
          className="w-full h-auto block mt-[-40px] sm:mt-[-60px] md:mt-[-80px] lg:mt-[-10px] opacity-20 mix-blend-screen"
          draggable="false"
        />
      </div>
    </footer>
  );
};

export default Footer;

