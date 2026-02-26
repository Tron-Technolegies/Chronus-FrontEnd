import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-white py-28 px-6 md:px-[10%] text-center" id="about">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Small Label */}
        <p className="uppercase tracking-[0.4em] text-xs text-black mb-6 inter">
          About Chronos
        </p>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6 font-[Bastoni] leading-tight">
          A Legacy of <span className="text-yellow-500">Precision</span>,  
          Craftsmanship & Timeless Elegance
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8 inter">
          Founded in 1892, Chronos was built upon a singular vision — to curate 
          the world’s most exceptional timepieces and rare collectibles for those 
          who appreciate enduring excellence.
        </p>

        <p className="text-gray-500 leading-relaxed mb-14 inter">
          Every piece in our collection reflects a dedication to heritage, 
          artistry, and meticulous detail. We collaborate with master artisans, 
          independent horologists, and celebrated artists to ensure each acquisition 
          becomes a legacy worth passing down.
        </p>

        {/* Divider Line */}
        <div className="w-16 h-[2px] bg-yellow-500 mx-auto mb-10"></div>

        {/* Signature Statement */}
        <p className="font-serif text-2xl md:text-3xl text-gray-800 italic">
          “Luxury is not owned.  
          It is preserved.”
        </p>

      </div>

    </section>
  );
};

export default AboutSection;