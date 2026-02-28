import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import ExploreCategories from "../components/home/ExploreCategories";
import ExclusiveMembership from "../components/home/ExclusiveMembership";
import Testimonials from "../components/home/Testimonials";
import Subscription from "../components/home/Subscription";
import FeaturedProducts from "../components/home/FeaturedProducts";
import NewArrivals from "../components/home/NewArrivals";
import AboutSection from "../components/home/AboutSection";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  /*navigation from other pages to homepage sections*/
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  
  return (
    <div>
      <section id="hero">
        <HeroSection />
      </section>
      {/* <FeaturedProducts /> */}
      <ExploreCategories />
      {/* <NewArrivals /> */}
      <AboutSection/>
      <ExclusiveMembership />
      <Testimonials />
      <Subscription />
    </div>
  );
};

export default HomePage;
