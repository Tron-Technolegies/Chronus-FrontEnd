import React from "react";
import { FiShield, FiTruck, FiRefreshCw, FiAward } from "react-icons/fi";
import { sendEnquiryMembership } from "../../utils/whatsApp";

const features = [
  {
    icon: FiShield,
    title: "AUTHENTICITY GUARANTEED",
    description: "Every piece verified by our experts",
  },
  {
    icon: FiTruck,
    title: "WHITE GLOVE DELIVERY",
    description: "Complimentary worldwide shipping",
  },
  {
    icon: FiRefreshCw,
    title: "30-DAY RETURNS",
    description: "No questions asked returns",
  },
  {
    icon: FiAward,
    title: "WARRANTY",
    description: "Coverage on all timepieces",
  },
];

const ExclusiveMembership = () => {
  return (
    <section className="bg-white py-16 sm:py-28 px-4 sm:px-[6%] md:px-[8%]">
      <div className="text-center max-w-3xl mx-auto">
        <span className="block text-[11px] tracking-[1.5px] text-red-600 mb-4 inter">
          EXCLUSIVE MEMBERSHIP
        </span>

        <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6 font-[Bastoni] leading-tight">
          Join the Circle of <br /> Distinguished Collectors
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed mb-10 inter">
          Gain access to private viewings, first looks at rare acquisitions, and
          exclusive events in the world’s finest venues.
        </p>

        <button
          onClick={sendEnquiryMembership}
          className="inline-flex items-center gap-2 bg-[var(--secondary-color)] text-black text-sm font-medium px-6 py-3 rounded-md shadow hover:opacity-90 transition"
        >
          REQUEST MEMBERSHIP
        </button>
      </div>

      {/*features*/}
      <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index}>
              <Icon className="mx-auto text-2xl text-gray-800 mb-4" />
              <h4 className="text-xs font-semibold tracking-wide text-gray-900 mb-1 bayon-regular">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 inter">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExclusiveMembership;
