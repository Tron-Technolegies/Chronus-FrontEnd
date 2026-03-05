import React from "react";
import "../../components/home/HeroSection.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section-container">
      <div className="herosection-contents">
        <img src="/chronos-hero.svg" alt="" className="hero-img" />
        <h2>
          Where Time <br />
          <span>Meets Elegance </span>
        </h2>
        <button className="hero-cta" onClick={() => navigate("/shop")}>
          Explore Collection
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
