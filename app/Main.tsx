import LastPosts from '@/components/landing/LastPosts'
import Newslatter from '@/components/tools/Newslatter'
import Slider from '@/components/tools/slider/Slider'
import { images } from '@/data/sliders/demo'

export default function Home({ posts }) {
  return (
    <>
      <Slider images={images} />
      <LastPosts posts={posts} />
      <Newslatter />
    </>
  )
}
