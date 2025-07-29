import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import { AuthorHeader } from '@/components/authors/AuthorHeader'

interface Props {
  children: ReactNode
  author: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, author }: Props) {
  return (
    <div className="flex flex-col divide-gray-200 dark:divide-gray-700">
      <AuthorHeader author={author} />
      <div
        dir={author.dir ? author.dir : 'ltr'}
        className="prose max-w-none px-8 py-8 dark:prose-invert xl:col-span-2"
      >
        {children}
      </div>
    </div>
  )
}
