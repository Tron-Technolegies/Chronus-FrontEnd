import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(images[0]);
  const [wish, setWish] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setActive(img)}
            className={`w-16 h-16 lg:w-20 lg:h-20 object-contain border cursor-pointer p-2 shrink-0
          ${active === img ? "border-[#CBA61F]" : "border-gray-200"}
        `}
          />
        ))}
      </div>

      <div className="flex-1 border-2 border-[#D9D9D9] p-4 sm:p-6 lg:p-10 relative">
        <button className="absolute top-4 right-4 cursor-pointer" onClick={() => setWish(!wish)}>
          <FaHeart className={`transition ${wish ? "text-[#CBA61F]" : "text-gray-300"}`} />
        </button>

        <img src={active} className="w-full h-[300px] sm:h-[380px] lg:h-[450px] object-contain" />
      </div>
    </div>
  );
}
