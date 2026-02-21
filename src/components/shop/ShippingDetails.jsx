import React from "react";
import { FiShield, FiTruck, FiRefreshCw, FiAward } from "react-icons/fi";

const ShippingDetails = () => {
  return (
    <div className="w-full pt-10 pb-14 px-6">
      <h3 className="text-sm font-semibold tracking-wider mb-10">SHIPPING & DELIVERY</h3>

      <div className="flex flex-col gap-10">
        <div className="flex items-start gap-5">
          <FiShield className="text-lg text-black mt-1 shrink-0" />
          <div>
            <p className="text-xs font-semibold tracking-wide">AUTHENTICITY GUARANTEED</p>
            <p className="text-xs text-gray-500 mt-2">Every piece verified by our experts</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <FiTruck className="text-lg text-black mt-1 shrink-0" />
          <div>
            <p className="text-xs font-semibold tracking-wide">WHITE GLOVE DELIVERY</p>
            <p className="text-xs text-gray-500 mt-2">Complimentary worldwide shipping</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <FiRefreshCw className="text-lg text-black mt-1 shrink-0" />
          <div>
            <p className="text-xs font-semibold tracking-wide">30-DAY RETURNS</p>
            <p className="text-xs text-gray-500 mt-2">No questions asked returns</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <FiAward className="text-lg text-black mt-1 shrink-0" />
          <div>
            <p className="text-xs font-semibold tracking-wide">WARRANTY</p>
            <p className="text-xs text-gray-500 mt-2">Coverage on all timepieces</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
