import React from 'react'

import SelectedProjects from '@/components/landing/SelectedProjects'
import LastPosts from '@/components/landing/LastPosts'
import Newslatter from '@/components/tools/Newslatter'
import Carousel from '@/components/landing/Carousel'
import { slides } from '@/data/carousel/demo'
import Hero from '@/components/landing/Hero'
import { heroData } from '@/components/heros/herosDemo'

import siteMetadata from '@/data/siteMetadata'

const NextPress2024 = ({ posts }) => {
  const { showLatestPosts, showCarousel, showNewsletter, showHero, showSelectedProjects } =
    siteMetadata.landingPage.NEXTPRESS2024
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
