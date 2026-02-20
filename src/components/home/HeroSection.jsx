import React from "react";
import "../../components/home/HeroSection.css"
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section-container">
      <div className="herosection-contents">
        <button className="hero-badge">Curated Excellence Since 1892</button>

        <h2>
          Not just another <br />
          <span>luxury store.</span>
        </h2>

        <p>
          Discover an extraordinary collection of luxury timepieces, bespoke
          accessories, and museum-quality paintings crafted for the discerning
          collector.
        </p>

        <button className="hero-cta" onClick={()=>navigate("/shop")}>Explore Collection</button>
      </div>

      <div className="hero-limited-edition-watch">
        <img src="./limited-edition-watch.png" alt="Midnight Tourbillon" />
        <div className="watch-info">
          <span className="watch-badge">LIMITED EDITION</span>
          <p className="watch-title">Midnight Tourbillon</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
