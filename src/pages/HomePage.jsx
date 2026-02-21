import React, { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import ExploreCategories from "../components/home/ExploreCategories";
import ExclusiveMembership from "../components/home/ExclusiveMembership";
import Testimonials from "../components/home/Testimonials";
import Subscription from "../components/home/Subscription";
import FeaturedProducts from "../components/home/FeaturedProducts";
import NewArrivals from "../components/home/NewArrivals";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <section id="hero">
        <HeroSection />
      </section>
      <FeaturedProducts />
      <ExploreCategories />
      <NewArrivals />
      <ExclusiveMembership />
      <Testimonials />
      <Subscription />
    </div>
  );
};

export default HomePage;
