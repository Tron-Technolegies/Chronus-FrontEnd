import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-white pt-12 pb-8 px-6 md:px-[10%] text-center" id="about">
      <div className="max-w-4xl mx-auto">
        {/* Small Label */}
        <p className="uppercase tracking-[0.4em] text-xs text-black mb-6 inter">About Chronos</p>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6 font-[Bastoni] leading-tight">
          Chronos — Where <span className="text-yellow-500">Time</span> Meets Elegance
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8 inter">
          Chronos is a curated luxury house dedicated to precision, craftsmanship, and timeless
          design.
        </p>

        <p className="text-gray-500 leading-relaxed mb-14 inter">
          We carefully select refined timepieces, premium leather goods, and distinctive art pieces
          — each chosen for its detail, quality, and presence. At Chronos, luxury is intentional,
          balanced, and enduring.
        </p>

        {/* Divider Line */}
        <div className="w-16 h-[2px] bg-yellow-500 mx-auto mb-10"></div>
      </div>
    </section>
  );
};

export default AboutSection;
