import React from "react";
import { FaInstagram, FaSnapchatGhost, FaWeixin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const SOCIALS = [
  { Icon: FaInstagram, href: "https://instagram.com/chronos_ae", label: "Instagram" },
  { Icon: IoLogoWhatsapp, href: "https://wa.me/971569778080", label: "WhatsApp" },
  { Icon: FaSnapchatGhost, href: "https://www.snapchat.com/@chronos_ae", label: "Snapchat" },
  { Icon: FaWeixin, href: "https://weixin.qq.com/t/chronosgallery", label: "WeChat" },
];

const COLLECTIONS = [
  { label: "Timepieces", to: "/shop" },
  { label: "Accessories", to: "/shop" },
  { label: "Fine Art", to: "/shop" },
  { label: "New Arrivals", to: "/shop" },
  { label: "Featured", to: "/shop" },
];

const SERVICES = [
  { label: "My Account", to: "/my-account" },
  { label: "FAQ", to: "/faq" },
  { label: "Shipping Policy", to: "/shipping" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

const Footer = () => {
  return (
    <footer
      className="bg-[#1a0806] pt-8 sm:pt-12 relative flex flex-col items-center overflow-hidden inter text-[#FFEDD0]"
      id="contact"
    >
      <div className="w-[96%] sm:w-[92%] max-w-[1400px] bg-[#2a0e0c] rounded-[24px] sm:rounded-[40px] p-5 sm:p-8 md:p-12 lg:p-16 relative z-10 border border-[#78241e5d] shadow-2xl shadow-[#541a1685]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-16">
          {/* Brand */}
          <div className="space-y-4 sm:space-y-6">
            <img
              src="/chronus-logo.png"
              alt="Chronos"
              className="h-6 sm:h-7 w-auto object-contain"
            />
            <p className="text-[#d4bca9]/70 text-sm leading-relaxed max-w-xs">
              Curating the world's finest timepieces, accessories, and art since 1892. Each piece
              tells a story of uncompromising craftsmanship.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1a0806] flex items-center justify-center text-[#d4bca9] hover:bg-[#d4bca9] hover:text-[#1a0806] transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="lg:pl-10 text-[#d4bca9]">
            <h3 className="font-semibold mb-4 sm:mb-6 uppercase tracking-wider text-sm">
              Collections
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              {COLLECTIONS.map(({ label, to }) => (
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
          </div>

          {/* Services */}
          <div className="text-[#d4bca9]">
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
          </div>

          {/* Contact */}
          <div className="text-[#d4bca9]">
            <h3 className="font-semibold mb-4 sm:mb-6 uppercase tracking-wider text-sm">
              Contact Us
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-sm opacity-70">
              <li className="flex items-start gap-3">
                <IoLocationOutline size={18} className="mt-0.5 shrink-0" />
                <span>
                  Sheikh Zayed Road, Dubai,
                  <br />
                  United Arab Emirates
                </span>
              </li>
              <li className="flex items-center gap-3">
                <IoCallOutline size={18} className="shrink-0" />
                <a href="tel:+86 186 8888 6313" className="hover:opacity-100 transition-opacity">
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
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#d4bca9]/50 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-center">
          <p>© 2026 CHRONOS. All rights reserved.</p>
          <div className="flex gap-5 sm:gap-8">
            <Link to="/privacy" className="hover:text-[#FFEDD0] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#FFEDD0] transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/shipping" className="hover:text-[#FFEDD0] transition-colors duration-200">
              Shipping
            </Link>
            <Link to="/legal" className="hover:text-[#FFEDD0] transition-colors duration-200">
              Legal Notice
            </Link>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-[1150px] z-0 px-4 pt-4 md:pt-10 select-none pointer-events-none">
        <img
          src="/footer-img.svg"
          alt="Chronos Large Watermark"
          className="w-full h-auto block mt-[-40px] sm:mt-[-60px] md:mt-[-90px] lg:mt-[-10px] opacity-20 mix-blend-screen"
          draggable="false"
        />
      </div>
    </footer>
  );
};

export default Footer;
