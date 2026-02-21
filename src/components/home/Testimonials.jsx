import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import testimonials from "../../utils/testimonials";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const testimonial = testimonials[current];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="bg-[#f6f6f4] py-16 sm:py-28 px-4 sm:px-[6%] md:px-[8%]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-8xl text-[var(--secondary-color)] mb-6">❝</div>

        <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8 font-[Bastoni]">
          “{testimonial.quote}”
        </p>

        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} className="text-[var(--secondary-color)] text-sm">
              ★
            </span>
          ))}
        </div>

        <h4 className="text-sm font-semibold text-gray-900 inter">
          {testimonial.name}
        </h4>

        <p className="text-xs text-gray-500 inter mt-1">{testimonial.role}</p>

        <div className="flex justify-center items-center gap-6 mt-10 text-gray-400">
          <button onClick={prevSlide} className="hover:text-black transition">
            <FiChevronLeft />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === current
                    ? "bg-[var(--secondary-color)]"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button onClick={nextSlide} className="hover:text-black transition">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
