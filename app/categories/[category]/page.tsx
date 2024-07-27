import { Metadata } from 'next'
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

import categoryData from 'app/data/category-data.json'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/posts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const category = decodeURI(params.category)
  return genPageMetadata({
    title: category,
    description: `${siteMetadata.title} ${category} categoriesed content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/category/${category}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const categoryCounts = categoryData as Record<string, number>
  const categoryKeys = Object.keys(categoryCounts)
  const paths = categoryKeys.map((cat) => ({
    cat: encodeURI(cat),
  }))
  return paths
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURI(params.category)
  // Capitalize first letter and convert space to dash
  const title = category[0].toUpperCase() + category.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.categories && post.categories.map((t) => slug(t)).includes(category)
      )
    )
  )
  return <ListLayout posts={filteredPosts} title={title} />
}
