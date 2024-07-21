import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/tools/Link'
import Tag from '@/components/blog/Tag'
import Category from '@/components/blog/Category'
import siteMetadata from '@/data/siteMetadata'

const PostCard = ({ post }) => {
  const { path, date, title, summary, tags, categories } = post

  return (
    <li key={path} className="py-5">
      <article className="flex flex-col space-y-2 xl:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
          </dd>
        </dl>
        <div className="space-y-3">
          <div>
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                {title}
              </Link>
            </h2>
            {categories.length !== 0 && (
              <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Categories:
              </span>
            )}
            <div className="flex flex-wrap">
              {categories?.map((cat) => <Category key={cat} text={cat} />)}
            </div>
            {tags.length !== 0 && (
              <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Tags:
              </span>
            )}
            <div className="flex flex-wrap">{tags?.map((tag) => <Tag key={tag} text={tag} />)}</div>
          </div>
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
        </div>
      </article>
    </li>
  )
}

export default PostCard
