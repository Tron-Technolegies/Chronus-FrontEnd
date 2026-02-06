import React from 'react'
import HeroSection from '../components/home/HeroSection'
import ExploreCategories from '../components/home/ExploreCategories'
import ExclusiveMembership from '../components/home/ExclusiveMembership'
import Testimonials from '../components/home/Testimonials'
import Subscription from '../components/home/Subscription'

const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      {/* <ExploreCategories/> */}
      <ExclusiveMembership/>
      <Testimonials/>
      <Subscription/>
    </div>
  )
}

export default HomePage
