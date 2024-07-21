import React from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import Link from '@/components/tools/Link'
import categoryData from 'app/data/category-data.json'

const PostCategories = () => {
  const pathname = usePathname()
  // Categories
  const categoryCounts = categoryData as Record<string, number>
  const categoryKeys = Object.keys(categoryCounts)
  const sortedCategories = categoryKeys.sort((a, b) => categoryCounts[b] - categoryCounts[a])

  return (
    <ul>
      <li className="my-3 font-bold text-primary-500">Categories</li>
      {sortedCategories.map((cat) => {
        return (
          <li key={cat} className="my-3">
            {pathname.split('/categories/')[1] === slug(cat) ? (
              <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                {`${cat} (${categoryCounts[cat]})`}
              </h3>
            ) : (
              <Link
                href={`/categories/${slug(cat)}`}
                className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                aria-label={`View posts categorised ${cat}`}
              >
                {`${cat} (${categoryCounts[cat]})`}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default PostCategories
