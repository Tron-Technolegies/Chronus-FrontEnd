import React from "react";
import { FiShield, FiTruck, FiRefreshCw, FiAward } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const ShippingDetails = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full pt-10 pb-14 px-6">
      <h3 className="text-sm font-semibold tracking-wider mb-10">{t("shop.shipping.title")}</h3>

      <div className="flex flex-col gap-10">
        <div className="flex items-start gap-5">
          <FiShield className="text-lg text-black mt-1 shrink-0" />
          <div>
            <p className="text-xs font-semibold tracking-wide">{t("shop.shipping.auth_title")}</p>
            <p className="text-xs text-gray-500 mt-2">{t("shop.shipping.auth_desc")}</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <FiTruck className="text-lg text-black mt-1 shrink-0" />
          <div>
            <p className="text-xs font-semibold tracking-wide">{t("shop.shipping.delivery_title")}</p>
            <p className="text-xs text-gray-500 mt-2">{t("shop.shipping.delivery_desc")}</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <FiRefreshCw className="text-lg text-black mt-1 shrink-0" />
          <div>
            <p className="text-xs font-semibold tracking-wide">{t("shop.shipping.returns_title")}</p>
            <p className="text-xs text-gray-500 mt-2">{t("shop.shipping.returns_desc")}</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <FiAward className="text-lg text-black mt-1 shrink-0" />
          <div>
            <p className="text-xs font-semibold tracking-wide">{t("shop.shipping.warranty_title")}</p>
            <p className="text-xs text-gray-500 mt-2">{t("shop.shipping.warranty_desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
