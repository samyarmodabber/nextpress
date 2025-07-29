import React from 'react'

import SelectedProjects from '@/components/landing/landing-parts/SelectedProjects'
import LastPosts from '@/components/landing/landing-parts/LastPosts'
import Newslatter from '@/components/tools/Newslatter'
import Carousel from '@/components/landing/landing-parts/Carousel'
import { slides } from '@/data/carousel/demo'
import Hero from '@/components/landing/landing-parts/Hero'
import { heroData } from '@/components/heros/herosDemo'

import siteSetting from '@/components/siteSetting'

const NextPress2024 = ({ posts }) => {
  const { showLatestPosts, showCarousel, showNewsletter, showHero, showSelectedProjects } =
    siteSetting.landingPage.NEXTPRESS2024
  return (
    <>
      {showCarousel && <Carousel slides={slides} />}
      {showHero && <Hero heroData={heroData} />}
      {showSelectedProjects && <SelectedProjects />}
      {showLatestPosts && <LastPosts posts={posts} />}
      {showNewsletter && <Newslatter />}
    </>
  )
}

export default NextPress2024
