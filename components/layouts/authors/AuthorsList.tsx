'use client'

import { useState } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Authors } from 'contentlayer/generated'
import AuthorCard from '@/components/authors/AuthorCard'
import PageTitle from '@/components/tools/PageTitle'

interface AuthorsListProps {
  authors: CoreContent<Authors>[]
}

export default function AuthorsList({ authors }: AuthorsListProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredAuthors = authors.filter((author) => {
    const searchContent =
      author.name + author.company + author.email + author.occupation + author.website
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayAuthors exist, display it if no searchValue is specified
  const displayAuthors = authors.length > 0 && !searchValue ? authors : filteredAuthors

  return (
    <>
      <PageTitle> Authors </PageTitle>
      {/* Search */}
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="relative mx-auto max-w-lg">
          <label>
            <span className="sr-only">Search Authors ... </span>
            <input
              aria-label="Search Authors"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Authors ..."
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
          </label>
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      {/* Not found */}
      {!filteredAuthors.length && (
        <div className="flex items-center justify-center text-center">
          <p className="text-6xl font-bold text-gray-700">The author was not found.</p>
        </div>
      )}
      {/* Authors list */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayAuthors.map((author, index) => {
          return <AuthorCard author={author} key={index} />
        })}
      </ul>
    </>
  )
}
