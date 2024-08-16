import Link from '@/components/tools/Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  const { email, github, facebook, youtube, linkedin, twitter, x, instagram, threads } =
    siteMetadata.social
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />
          <SocialIcon kind="github" href={github} size={6} />
          <SocialIcon kind="facebook" href={facebook} size={6} />
          <SocialIcon kind="youtube" href={youtube} size={6} />
          <SocialIcon kind="linkedin" href={linkedin} size={6} />
          <SocialIcon kind="twitter" href={twitter} size={6} />
          <SocialIcon kind="x" href={x} size={6} />
          <SocialIcon kind="instagram" href={instagram} size={6} />
          <SocialIcon kind="threads" href={threads} size={6} />
        </div>
        <div className="mb-2 flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:space-x-2 sm:space-y-0">
          <div className="flex flex-row space-x-2">
            <Link href="/">{siteMetadata.author}</Link>
            <div>{`© ${new Date().getFullYear()}`}</div>
          </div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
