import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'

export const AuthorHeader = ({ author }) => {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
    coverImage,
    website,
    instagram,
    youtube,
    facebook,
    threads,
  } = author

  return (
    <div className=" flex w-full flex-col items-center">
      <div
        className="mb-20 mt-5 flex w-full justify-center rounded-xl"
        style={{
          aspectRatio: '7/2',
          background: `url(${coverImage ? coverImage : siteMetadata.socialBanner})`,
          backgroundSize: 'cover',
        }}
      >
        <Image
          alt={name}
          className="relative top-1/2 my-auto h-24 w-24 rounded-full shadow-2xl md:h-32 md:w-32"
          src={avatar}
          width={96}
          height={96}
        />
      </div>
      <div className={`font-fang-zheng-xiao-biao-song my-8 text-center text-4xl font-bold`}>
        {name}
      </div>
      <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
      <div className="text-gray-500 dark:text-gray-400">{company}</div>
      <div className="flex space-x-3 pt-6">
        <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />
        <SocialIcon kind="website" href={website} size={6} />
        <SocialIcon kind="github" href={github} size={6} />
        <SocialIcon kind="linkedin" href={linkedin} size={6} />
        <SocialIcon kind="x" href={twitter} size={6} />
        <SocialIcon kind="youtube" href={youtube} size={6} />
        <SocialIcon kind="facebook" href={facebook} size={6} />
        <SocialIcon kind="instagram" href={instagram} size={6} />
        <SocialIcon kind="threads" href={threads} size={6} />
      </div>
    </div>
  )
}
