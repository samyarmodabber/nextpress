import React from 'react'
import Link from '@/components/tools/Link'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import tagData from 'app/data/tag-data.json'

const PostTags = () => {
  const pathname = usePathname()

  // Tags
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <ul>
      <li className="my-3 font-bold text-primary-500">Tags</li>
      {sortedTags.map((t) => {
        return (
          <span key={t} className="my-3">
            {pathname.split('/tags/')[1] === slug(t) ? (
              <h6 className="inline px-1 py-1 text-sm font-bold uppercase text-primary-500">
                {`${t}(${tagCounts[t]}) `}
              </h6>
            ) : (
              <Link
                href={`/tags/${slug(t)}`}
                className="px-1 py-1 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                aria-label={`View posts tagged ${t}`}
              >
                {`${t}(${tagCounts[t]}) `}
              </Link>
            )}
          </span>
        )
      })}
    </ul>
  )
}

export default PostTags
