import { allAuthors } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import AuthorsList from '@/layouts/authors/AuthorsList'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return <AuthorsList authors={allAuthors} />
}
