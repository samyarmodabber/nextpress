// import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'

import TOCInline from '@/components/blog/TOCInLine'
import Image from '@/components/tools/Image'
import CustomLink from '@/components/tools/Link'
import TableWrapper from './TableWrapper'
import YouTube from '@/components/tools/YouTube'
import PDFList from '@/components/tools/PDFList'
import Flashcards from '@/components/tools/Flashcards'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  YouTube,
  PDFList,
  Flashcards,
}
