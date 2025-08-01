import React from 'react'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

import Archive from '@/components/layouts/posts/Archive'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo' // adjust this if you're not using @/lib yet

export const metadata = genPageMetadata({
  title: 'Archive',
  description: 'All blog posts collected in one place, sorted by date.',
  canonicalUrl: `${siteMetadata.siteUrl}/archive`,
  keywords: ['archive', 'blog posts', 'nextpress'],
})

const ArchivePage = () => {
  const posts = allCoreContent(sortPosts(allBlogs))
  return <Archive posts={posts} />
}

export default ArchivePage
