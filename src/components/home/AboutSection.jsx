import React from "react";

import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-white pt-12 pb-8 px-6 md:px-[10%] text-center" id="about">
      <div className="max-w-4xl mx-auto">
        {/* Small Label */}
        <p className="uppercase tracking-[0.4em] text-xs text-black mb-6 inter">{t("home.about.label")}</p>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-6 font-[Bastoni] leading-tight">
          {t("home.about.title_prefix")} <span className="text-yellow-500">{t("home.about.title_highlight")}</span> {t("home.about.title_suffix")}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8 inter">
          {t("home.about.description_1")}
        </p>

        <p className="text-gray-500 leading-relaxed mb-14 inter">
          {t("home.about.description_2")}
        </p>

        {/* Divider Line */}
        <div className="w-16 h-[2px] bg-yellow-500 mx-auto mb-10"></div>
      </div>
    </section>
  );
};

export default AboutSection;
