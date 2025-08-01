// app/blog/page/[page]/page.tsx

import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

import ListLayout from '@/components/layouts/posts/ListLayoutWithTags'
import siteSetting from '@/components/siteSetting'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / siteSetting.blog.POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

export async function generateMetadata({ params }: { params: { page: string } }) {
  const pageNum = parseInt(params.page)
  const title = `Blog – Page ${pageNum}`
  const description =
    pageNum === 1
      ? siteMetadata.description
      : `Page ${pageNum} of blog posts. Discover more articles on ${siteMetadata.title}.`
  const canonicalUrl = `${siteMetadata.siteUrl}/blog/page/${pageNum}`

  return genPageMetadata({
    title,
    description,
    canonicalUrl,
    keywords: ['blog', 'next.js', 'pagination', `page ${pageNum}`],
  })
}

export default function Page({ params }: { params: { page: string } }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(params.page)

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
