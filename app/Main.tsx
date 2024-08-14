import LastPosts from '@/components/landing/LastPosts'
import Newslatter from '@/components/tools/Newslatter'

import Carousel from '@/components/landing/Carousel'
import { slides } from '@/data/carousel/demo'

import Hero from '@/components/landing/Hero'
import { heroData } from '@/data/heros/herosDemo'

import siteMetadata from '@/data/siteMetadata'
import SelectedProjects from '@/components/landing/SelectedProjects'

export default function Home({ posts }) {
  const { showLatestPosts, showCarousel, showNewsletter, showHero, showSelectedProjects } =
    siteMetadata.landingPage
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
