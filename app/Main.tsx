import LastPosts from '@/components/landing/LastPosts'
import Newslatter from '@/components/tools/Newslatter'

export default function Home({ posts }) {
  return (
    <>
      <LastPosts posts={posts} />
      <Newslatter />
    </>
  )
}
