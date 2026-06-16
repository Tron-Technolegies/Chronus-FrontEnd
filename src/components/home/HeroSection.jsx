import React from "react";
import "../../components/home/HeroSection.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className="hero-section-container" style={{ direction: "ltr" }}>
      <div className="herosection-contents text-left" style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
        <img src="/chronos-hero.svg" alt="" className="hero-img" />
        <h2>
          {t("home.hero.title_line1")} <br />
          <span>{t("home.hero.title_line2")}</span>
        </h2>
        <button className="hero-cta" onClick={() => navigate("/shop")}>
          {t("home.hero.explore_btn")}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
