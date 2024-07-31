import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/menus/headerNavLinks'
import Link from '@/components/tools/Link'

import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import CommandPalette from './CommandPalette'
import Image from 'next/image'

const Header = () => {
  const { headerTitle, siteLogoPNG, title, description } = siteMetadata
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-5 py-2 dark:bg-gray-950 md:px-10 md:py-5 lg:px-20 xl:px-32 2xl:px-52">
      <div>
        <Link href="/" aria-label={headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image src={siteLogoPNG} alt={title} width={80} height={80} loading="lazy" />
            </div>
            {typeof headerTitle === 'string' ? (
              <div className="flex flex-col ">
                <div className="hidden h-6 text-2xl font-semibold lg:block">{headerTitle}</div>
                <p className="hidden text-xs leading-7 text-gray-500 dark:text-gray-400 lg:block">
                  {description}
                </p>
              </div>
            ) : (
              headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <ul dir="ltr" className="mx-3 flex items-start space-x-4 sm:space-x-6">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400
            sm:block"
              >
                {link.title}
              </Link>
            ))}
        </ul>
        <SearchButton />
        <ThemeSwitch />
        <CommandPalette />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
