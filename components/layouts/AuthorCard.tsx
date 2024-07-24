import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/tools/Image'
import CustomLink from '@/components/tools/Link'

// interface Props {
//   author: Omit<Authors, '_id' | '_raw' | 'body'>
// }

export default function AuthorCard({ author }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, slug } = author

  return (
    <div className="flex flex-col items-center space-x-2 pt-8">
      <CustomLink href={'/authors/' + slug}>
        {avatar && (
          <Image
            src={avatar}
            alt="avatar"
            width={192}
            height={192}
            className="h-48 w-48 rounded-full"
          />
        )}
      </CustomLink>

      <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
        <CustomLink href={'/authors/' + slug}>{name}</CustomLink>
      </h3>
      <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
      <div className="text-gray-500 dark:text-gray-400">{company}</div>
      <div className="flex space-x-3 pt-6">
        <SocialIcon kind="mail" href={`mailto:${email}`} />
        <SocialIcon kind="github" href={github} />
        <SocialIcon kind="linkedin" href={linkedin} />
        <SocialIcon kind="x" href={twitter} />
      </div>
    </div>
  )
}
