import { slug } from 'github-slugger'
import categoryData from 'app/data/category-data.json'
import { genPageMetadata } from 'app/seo'

import Link from '@/components/tools/Link'
import Category from '@/components/blog/Category'
import PageTitle from '@/components/tools/PageTitle'

export const metadata = genPageMetadata({
  title: 'Categories',
  description: 'The categories of my blog about',
})

export default async function Page() {
  const categoryCounts = categoryData as Record<string, number>
  const categoryKeys = Object.keys(categoryCounts)
  const sortedCategories = categoryKeys.sort((a, b) => categoryCounts[b] - categoryCounts[a])
  return (
    <>
      <PageTitle>Categories</PageTitle>
      <div className="m-auto flex max-w-lg flex-wrap items-start md:flex-row md:items-center md:justify-center">
        {categoryKeys.length === 0 && 'No categories found.'}
        {sortedCategories.map((t) => {
          return (
            <div key={t} className="mb-2 mr-5 mt-2">
              <Category text={t} />
              <Link
                href={`/categories/${slug(t)}`}
                className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                aria-label={`View posts categorised ${t}`}
              >
                {` (${categoryCounts[t]})`}
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
