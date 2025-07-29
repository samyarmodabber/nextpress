import React from 'react'
import LastPosts from '@/components/landing/landing-parts/LastPosts'

const TailwindBlog = ({ posts }) => {
  return (
    <div className="mx-4 min-h-screen px-2 sm:mx-6 sm:px-4 md:mx-8 md:px-6 lg:mx-10 lg:px-8 xl:mx-12 xl:px-10">
      <LastPosts posts={posts} />
    </div>
  )
}

export default TailwindBlog
