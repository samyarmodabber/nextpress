import 'katex/dist/katex.css'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'

import siteMetadata from '@/data/siteMetadata'

import PageTitle from '@/components/tools/PageTitle'
import { components } from '@/components/markdown/MDXComponents'

import PostSimple from '@/components/layouts/posts/PostSimple'
import PostLayout from '@/components/layouts/posts/PostLayout'
import PostBanner from '@/components/layouts/posts/PostBanner'

const defaultLayout = 'PostLayout'

const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)

  if (!post) return

  const publishedTime = new Date(post.date).toISOString()
  const modifiedTime = new Date(post.lastmod || post.date).toISOString()

  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const result = allAuthors.find((p) => p.slug === author)
    return coreContent(result as Authors)
  })

  // For openGraph authors, each needs a name property:
  const openGraphAuthors = authorDetails.map((author) => ({
    name: author.name || siteMetadata.author,
  }))

  const authorMeta = authorDetails.map((author) => ({
    name: author.name || siteMetadata.author,
  }))

  // Prepare images (absolute URLs)
  const rawImages = post.images
    ? typeof post.images === 'string'
      ? [post.images]
      : post.images
    : [siteMetadata.socialBanner]

  const imageList = rawImages.map((img) =>
    img.startsWith('http') ? img : `${siteMetadata.siteUrl}${img}`
  )

  // Make sure tags is string[] or fallback
  const keywords = Array.isArray(post.tags) ? post.tags : ['blog', 'nextpress', 'article']

  return {
    title: post.title,
    description: post.summary || siteMetadata.description,
    authors: authorMeta,
    openGraph: {
      title: post.title,
      description: post.summary || siteMetadata.description,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: 'article',
      publishedTime,
      modifiedTime,
      url: `${siteMetadata.siteUrl}/blog/${slug}`,
      images: imageList.map((url) => ({ url })),
      // authors: openGraphAuthors,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary || siteMetadata.description,
      images: imageList,
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blog/${slug}`,
    },
    keywords,
  }
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
        toc={post.toc}
      >
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
