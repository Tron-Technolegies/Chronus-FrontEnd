import React from "react";

const ExploreCategories = () => {
  return (
    <section className="bg-white py-24 px-[8%]">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="block text-[11px] tracking-[1.5px] text-gray-500 mb-3 inter">
          OUR COLLECTIONS
        </span>
        <h2 className="text-4xl font-normal text-black font-[Bastoni]">
          Explore Categories
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Timepieces */}
        <div className="relative h-[220px] rounded-2xl overflow-hidden shadow-xl p-6
          bg-gradient-to-br from-[#0b0f1a] via-[#111827] to-[#7a0f1b]">
          
          {/* Floating Image */}
          <img
            src="https://images.unsplash.com/photo-1524805444758-089113d48a6d"
            alt="Timepieces"
            className="absolute -top-2 -right-6 w-44 rotate-6 opacity-95"
          />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-medium text-white mb-1">
                Timepieces
              </h3>
              <p className="text-sm text-white/80 leading-relaxed max-w-[75%]">
                Swiss masterpieces and rare horological complications
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-white/90">
              <span>48 Items</span>
              <span className="text-lg">→</span>
            </div>
          </div>
        </div>

        {/* Accessories */}
        <div className="relative h-[220px] rounded-2xl overflow-hidden shadow-xl p-6
          bg-gradient-to-br from-[#0b0f1a] via-[#111827] to-[#7a0f1b]">
          
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
            alt="Accessories"
            className="absolute -top-4 -right-6 w-40 rotate-6 opacity-95"
          />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-medium text-white mb-1">
                Accessories
              </h3>
              <p className="text-sm text-white/80 leading-relaxed max-w-[75%]">
                Refined accoutrements for the distinguished gentleman
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-white/90">
              <span>124 Items</span>
              <span className="text-lg">→</span>
            </div>
          </div>
        </div>

        {/* Fine Art */}
        <div className="relative h-[220px] rounded-2xl overflow-hidden shadow-xl p-6
          bg-gradient-to-br from-[#0b0f1a] via-[#111827] to-[#7a0f1b]">
          
          <img
            src="https://images.unsplash.com/photo-1549887534-1541e9326642"
            alt="Fine Art"
            className="absolute -top-4 -right-4 w-36 rotate-3 opacity-95"
          />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-medium text-white mb-1">
                Fine Art
              </h3>
              <p className="text-sm text-white/80 leading-relaxed max-w-[75%]">
                Museum-quality paintings from acclaimed artists
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-white/90">
              <span>36 Items</span>
              <span className="text-lg">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCategories;
