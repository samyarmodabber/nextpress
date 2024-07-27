import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

import AuthorLayout from '@/layouts/authors/AuthorLayout'

export const metadata = genPageMetadata({ title: 'Authors' })

export default function Page({ params }: { params: { author: string } }) {
  const author = decodeURI(params.author)
  const findAuthor = allAuthors.find((p) => p.slug === author) as Authors
  const mainContent = coreContent(findAuthor)

  return (
    <>
      <AuthorLayout author={mainContent}>
        <MDXLayoutRenderer code={findAuthor.body.code} />
      </AuthorLayout>
    </>
  )
}
