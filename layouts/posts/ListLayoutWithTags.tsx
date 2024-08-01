/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

// Components
import Link from '@/components/tools/Link'
import Pagination from '@/components/layouts-parts/Pagination'
import PostCard from '@/components/blog/PostCard'
import PostCard2 from '@/components/blog/PostCard2'
import PostCategories from '@/components/blog/PostCategories'
import PostTags from '@/components/blog/PostTags'

import siteMetadata from '@/data/siteMetadata'
import PageTitle from '@/components/tools/PageTitle'
import ScrollTopAndComment from '@/components/layouts-parts/ScrollTopAndComment'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}
export default function ListLayoutWithTags({
  posts,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const { blog } = siteMetadata

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <ScrollTopAndComment showComments={false} />
      <PageTitle>Blog</PageTitle>
      <div className="flex sm:space-x-12">
        <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
          <div className="px-6 py-4">
            {pathname.startsWith('/blog') ? (
              <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
            ) : (
              <Link
                href={`/blog`}
                className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
              >
                All Posts
              </Link>
            )}
            <PostCategories />
            <br />
            <PostTags />
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col">
          <ul className={blog.POST_CARD_TYPE == 'type2' ? 'grid gap-6 lg:grid-cols-2' : ''}>
            {blog.POST_CARD_TYPE == '' &&
              displayPosts.map((post) => {
                return <PostCard post={post} key={post.title} />
              })}
            {blog.POST_CARD_TYPE == 'type2' &&
              displayPosts.map((post) => {
                return <PostCard2 post={post} key={post.title} />
              })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}
