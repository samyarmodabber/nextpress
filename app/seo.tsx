import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  keywords?: string[]
  robots?: string
  authors?: { name: string; url?: string }[]
  themeColor?: string
  canonicalUrl?: string
  // Allow other metadata extensions
  [key: string]: unknown
}

export function genPageMetadata({
  title,
  description,
  image,
  keywords,
  robots,
  authors,
  themeColor,
  canonicalUrl,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    description: description || siteMetadata.description,
    keywords: [...new Set([...(keywords || []), ...(siteMetadata.keywords || [])])],
    robots,
    authors,
    themeColor,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: canonicalUrl || './',
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
