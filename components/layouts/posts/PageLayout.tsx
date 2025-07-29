import { ReactNode } from 'react'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Pages } from 'contentlayer/generated'

// tools
import Image from '@/components/tools/Image'
import PageTitle from '@/components/tools/PageTitle'

// layouts
import SectionContainer from '@/components/layouts-parts/SectionContainer'
import ScrollTopAndComment from '@/components/layouts-parts/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Pages>
  children: ReactNode
}

export default function SinglePage({ content, children }: LayoutProps) {
  const { slug, title, image, dir } = content

  return (
    <>
      <ScrollTopAndComment />
      <article>
        <div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {image && image.length > 0 ? (
              <div className="relative w-full">
                <Bleed>
                  <div className="relative aspect-[4/1] w-full">
                    <Image src={image} alt={title} fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h1 className="rounded bg-black bg-opacity-50 p-4 text-4xl font-bold text-white md:text-4xl">
                        {title}
                      </h1>
                    </div>
                  </div>
                </Bleed>
              </div>
            ) : (
              <div className="space-y-1 pb-10 text-center dark:border-gray-700">
                <PageTitle>{title}</PageTitle>
              </div>
            )}
          </div>
          <div dir={dir ? dir : 'ltr'} className="prose max-w-none py-4 dark:prose-invert">
            {children}
          </div>
        </div>
      </article>
    </>
  )
}
