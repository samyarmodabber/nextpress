import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/tools/Link'
import Tag from '@/components/blog/Tag'
import siteSetting from '@/components/siteSetting'
import Image from 'next/image'

const LastPosts = ({ posts }) => {
  return (
    <div className="divide-y divide-gray-200 pt-3 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Latest Posts
        </h1>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && 'No posts found.'}
        {posts.slice(0, siteSetting.blog.MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, tags, images } = post
          return (
            <li key={slug} className="py-12">
              <article className="flex flex-col sm:flex-row">
                {/* Insert image here */}
                <div className="relative w-full flex-shrink-0 overflow-hidden rounded-lg px-4 py-2 md:w-1/3 lg:w-1/4">
                  <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                    <Image
                      width={1280}
                      height={832}
                      src={
                        Array.isArray(images) && images.length > 0
                          ? images[0]
                          : siteSetting.blog.DEFAULT_IMAGE_POST
                      }
                      alt={title}
                      className="rounded-lg"
                    />
                  </Link>
                </div>
                <div className="flex-1 space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, siteSetting.locale)}</time>
                          </dd>
                        </dl>
                      </div>

                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read more: "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      {posts.length > siteSetting.blog.MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}

export default LastPosts
