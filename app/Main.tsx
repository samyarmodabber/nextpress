import NextPress2024 from '@/components/landing/NextPress2024'
import siteMetadata from '@/data/siteMetadata'

export default function Home({ posts }) {
  const { NEXTPRESS2024 } = siteMetadata.landingPage
  return <>{NEXTPRESS2024.isActive && <NextPress2024 posts={posts} />}</>
}
