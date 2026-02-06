import React from "react";
import "../../components/home/HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section-container">
      {/* LEFT CONTENT */}
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

        <button className="hero-cta">Explore Collection</button>
      </div>

      {/* RIGHT WATCH CARD */}
      <div className="hero-limited-edition-watch">
        <div className="watch-card">
          <img
            src="./limited-edition-watch.png"
            alt="Midnight Tourbillon"
          />

          <div className="watch-info">
            <span className="watch-badge">LIMITED EDITION</span>
            <p className="watch-title">Midnight Tourbillon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
