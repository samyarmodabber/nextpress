import NextPress2024 from '@/components/landing/NextPress2024'
import NextPress2025 from '@/components/landing/NextPress2025'
import TailwindBlog from '@/components/landing/TailwindBlog'
import siteSetting from '@/components/siteSetting'

export default function Home({ posts }) {
  const { landingPage } = siteSetting
  return (
    <>
      {landingPage.TAILWIND_BLOG.isActive && <TailwindBlog posts={posts} />}
      {landingPage.NEXTPRESS2024.isActive && <NextPress2024 posts={posts} />}
      {landingPage.NEXTPRESS2025.isActive && <NextPress2025 posts={posts} />}
    </>
  )
}
