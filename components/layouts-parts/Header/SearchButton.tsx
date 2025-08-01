import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from 'pliny/search/KBarButton'
import siteSetting from '@/components/siteSetting'

const SearchButton = () => {
  if (
    siteSetting.search &&
    (siteSetting.search.provider === 'algolia' || siteSetting.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteSetting.search.provider === 'algolia' ? AlgoliaButton : KBarButton

    return (
      <SearchButtonWrapper aria-label="Search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-gray-900 hover:text-primary-500 dark:text-gray-100
          dark:hover:text-primary-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </SearchButtonWrapper>
    )
  }
}

export default SearchButton
