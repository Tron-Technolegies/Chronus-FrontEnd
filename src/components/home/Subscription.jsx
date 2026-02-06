import React from "react";
import { FiSend } from "react-icons/fi";

const Subscription = () => {
  return (
    <section className="bg-white py-28 px-[8%]">
      <div className="max-w-3xl mx-auto text-center">
        {/* Subtitle */}
        <span className="block text-[11px] tracking-[1.5px] text-gray-500 mb-4 inter">
          STAY CONNECTED
        </span>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6 font-[Bastoni]">
          Join Our Inner Circle
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-10 inter">
          Be the first to know about new acquisitions, private sales, and
          exclusive events.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-[320px] px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 inter"
          />

          <button className="inline-flex items-center gap-2 bg-[var(--secondary-color)] text-black text-sm font-medium px-6 py-3 rounded-md shadow hover:opacity-90 transition">
            <FiSend />
            SUBSCRIBE
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-gray-400 inter">
          By subscribing, you agree to our{" "}
          <span className="underline cursor-pointer">Privacy Policy</span> and
          consent to receive updates.
        </p>
      </div>
    </section>
  );
};

export default Subscription;
