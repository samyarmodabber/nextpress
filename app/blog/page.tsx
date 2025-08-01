import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

import ListLayout from '@/components/layouts/posts/ListLayoutWithTags'
import siteSetting from '@/components/siteSetting'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: 'Blog',
  description: siteMetadata.description,
  keywords: ['blog', 'markdown', 'next.js', 'tailwindcss', 'seo', 'nextpress'],
  canonicalUrl: `${siteMetadata.siteUrl}/blog`,
  authors: [{ name: siteMetadata.author }],
  themeColor: '#ffffff', // you can customize this or use system theme logic
  image: siteMetadata.socialBanner,
})

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    siteSetting.blog.POSTS_PER_PAGE * (pageNumber - 1),
    siteSetting.blog.POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / siteSetting.blog.POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
