import Archive from '@/layouts/posts/Archive'
import React from 'react'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
const ArchivePage = () => {
  const posts = allCoreContent(sortPosts(allBlogs))

  return <Archive posts={posts} />
}

export default ArchivePage
