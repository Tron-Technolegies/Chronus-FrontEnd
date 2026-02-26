import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-[#1a0806] pt-8 sm:pt-12 relative flex flex-col items-center overflow-hidden inter text-[#FFEDD0] " id="contact">
      <div className="w-[96%] sm:w-[92%] max-w-[1400px] bg-[#2a0e0c] rounded-[24px] sm:rounded-[40px] p-5 sm:p-8 md:p-12 lg:p-16 relative z-10 border border-[#78241e5d] shadow-2xl shadow-[#541a1685]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-16">
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
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1a0806] flex items-center justify-center text-[#d4bca9] hover:bg-[#d4bca9] hover:text-[#1a0806] transition-all"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:pl-10 text-[#d4bca9]">
            <h3 className="font-semibold mb-4 sm:mb-6 uppercase tracking-wider text-sm">
              Collections
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm opacity-70">
              {["Timepieces", "Accessories", "Fine Art", "New Arrivals", "Featured"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-[#d4bca9]">
            <h3 className="font-semibold mb-4 sm:mb-6 uppercase tracking-wider text-sm">
              Services
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm opacity-70">
              {["My Account", "Order Tracking", "Warranty", "Returns & Exchanges", "FAQ"].map(
                (link) => (
                  <li key={link}>
                    <a href="#" className="hover:opacity-100 transition-opacity">
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

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
                <span>+971 4 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <IoMailOutline size={18} className="shrink-0" />
                <span className="break-all">concierge@chronos.ae</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#d4bca9]/50 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-center">
          <p>© 2026 CHRONOS. All rights reserved.</p>
          <div className="flex gap-5 sm:gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
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
