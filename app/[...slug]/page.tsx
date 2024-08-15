import 'css/prism.css'
import 'katex/dist/katex.css'

import { Metadata } from 'next'
import { coreContent } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { allPages } from 'contentlayer/generated'
import type { Pages } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { components } from '@/components/markdown/MDXComponents'

import PageLayout from '@/layouts/posts/PageLayout'
const defaultLayout = 'PageLayout'
const layouts = {
  PageLayout,
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const page = allPages.find((p) => p.slug === slug)

  if (!page) {
    return
  }
  let imageList = [siteMetadata.socialBanner]
  if (page.image) {
    imageList = typeof page.image === 'string' ? [page.image] : page.image
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: page.title,
    description: page.summary,
    openGraph: {
      title: page.title,
      description: page.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: './',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return allPages.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const page = allPages.find((p) => p.slug === slug) as Pages
  const mainContent = coreContent(page)
  const Layout = layouts[page.layout || defaultLayout]

  return (
    <>
      <Layout content={mainContent}>
        <MDXLayoutRenderer code={page.body.code} components={components} />
      </Layout>
    </>
  )
}
