import { slug } from 'github-slugger'
import tagData from 'app/data/tag-data.json'
import { genPageMetadata } from 'app/seo'

import Link from '@/components/tools/Link'
import Tag from '@/components/blog/Tag'
import PageTitle from '@/components/tools/PageTitle'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <PageTitle>Tags</PageTitle>
      {/* <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24  md:space-x-6 md:divide-y-0"> */}

      <div className="m-auto flex max-w-lg flex-wrap items-start md:flex-row md:items-center md:justify-center">
        {tagKeys.length === 0 && 'No tags found.'}
        {sortedTags.map((t) => {
          return (
            <div key={t} className="mb-2 mr-5 mt-2">
              <Tag text={t} />
              <Link
                href={`/tags/${slug(t)}`}
                className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                aria-label={`View posts tagged ${t}`}
              >
                {` (${tagCounts[t]})`}
              </Link>
            </div>
          )
        })}
      </div>
      {/* </div> */}
    </>
  )
}
