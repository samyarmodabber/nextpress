import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

import ListLayout from '@/layouts/posts/ListLayoutWithTags'
import siteMetadata from '@/data/siteMetadata'
export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / siteMetadata.blog.POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default function Page({ params }: { params: { page: string } }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(
    siteMetadata.blog.POSTS_PER_PAGE * (pageNumber - 1),
    siteMetadata.blog.POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / siteMetadata.blog.POSTS_PER_PAGE),
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
