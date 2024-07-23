import LastPosts from '@/components/landing/LastPosts'
import Newslatter from '@/components/tools/Newslatter'

import Carousel from '@/components/landing/Carousel'
import { slides } from '@/data/carousel/demo'

import siteMetadata from '@/data/siteMetadata'

export default function Home({ posts }) {
  const { showLatestPosts, showCarousel, showNewsletter } = siteMetadata.landingPage
  return (
    <>
      {showCarousel && <Carousel slides={slides} />}
      {showLatestPosts && <LastPosts posts={posts} />}
      {showNewsletter && <Newslatter />}
    </>
  )
}
