import { allAuthors } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import AuthorsList from '@/components/layouts/authors/AuthorsList'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return <AuthorsList authors={allAuthors} />
}
