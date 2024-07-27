import Link from '@/components/tools/Link'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import Tag from '@/components/blog/Tag'

const PostCard2 = ({ post }) => {
  const { slug, date, title, summary, tags, images, draft } = post
  return (
    <article className="dark:bg-dark-100 mx-auto overflow-hidden rounded-xl shadow-md duration-300 hover:scale-105">
      <Link href={`/blog/${slug}`}>
        <Image
          src={
            Array.isArray(images) && images.length > 0
              ? images[0]
              : siteMetadata.blog.DEFAULT_IMAGE_POST
          }
          className="aspect-video"
          width={1600}
          height={900}
          alt={title}
        />
      </Link>
      <div className="p-3">
        <Link href={`/blog/${slug}`}>
          <h2 className="text-xl font-extrabold">{title || slug}</h2>
        </Link>
        {draft && (
          <h4 className="bold bg-warning p-2">
            This is a preliminary post. Not displayed in the production environment.
          </h4>
        )}
        <span className="ml-1 text-sm font-bold text-gray-600">
          <time dateTime={date}>
            {new Date(date).toLocaleDateString(siteMetadata.locale, siteMetadata.postDateTemplate)}
          </time>
        </span>
        <div className="mt-1 flex flex-row space-x-3">
          <div className="flex flex-wrap">{tags?.map((tag) => <Tag key={tag} text={tag} />)}</div>
        </div>
      </div>
    </article>
  )
}

export default PostCard2
