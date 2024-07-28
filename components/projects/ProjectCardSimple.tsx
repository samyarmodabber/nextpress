import Link from '@/components/tools/Link'
import Image from 'next/image'

const ProjectCardSimple = ({ project }) => {
  const { title, description, imgSrc, href } = project
  return (
    <li>
      <div
        className={`${
          imgSrc && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image alt={title} src={imgSrc} className="aspect-auto" width={1600} height={900} />
            </Link>
          ) : (
            <Image alt={title} src={imgSrc} className="aspect-auto" width={1600} height={900} />
          ))}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          {href && (
            <Link
              href={href}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </li>
  )
}

export default ProjectCardSimple
