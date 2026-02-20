import React from 'react'
import HeroSection from '../components/home/HeroSection'
import ExploreCategories from '../components/home/ExploreCategories'
import ExclusiveMembership from '../components/home/ExclusiveMembership'
import Testimonials from '../components/home/Testimonials'
import Subscription from '../components/home/Subscription'
import FeaturedProducts from '../components/home/FeaturedProducts'
import NewArrivals from '../components/home/NewArrivals'



const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <FeaturedProducts />
      <ExploreCategories/>
      <NewArrivals/>
      <ExclusiveMembership/>
      <Testimonials/>
      <Subscription/>
    </div>
  )
}

export default HomePage
