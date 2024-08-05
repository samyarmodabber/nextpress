/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'NextPress Starter Blog',
  author: 'Samyar Modabber',
  headerTitle: 'NextPress Website',
  description:
    'A website created with Next.js and Tailwind.css based on the Markdown document and SEO friendly and responsive.',
  language: 'en-us',
  dir: 'ltr',
  locale: 'en-US',
  theme: 'system', // system, dark or light
  email: 'address@yoursite.com',
  siteUrl: 'https://nextpress.vercel.app',
  siteRepo: 'https://github.com/samyarmodabber/nextpress',
  siteLogoSVG: '/static/images/site/logo.svg',
  siteLogoPNG: '/static/images/site/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  github: 'https://github.com',
  x: '',
  // twitter: 'https://twitter.com/Twitter',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com',
  threads: 'https://www.threads.net',
  instagram: 'https://www.instagram.com',
  mastodon: 'https://mastodon.social',
  blog: {
    MAX_DISPLAY: 3,
    POSTS_PER_PAGE: 20,
    POST_CARD_TYPE: 'type2', // '' (for default) or type2
    DEFAULT_IMAGE_POST: '/static/images/twitter-card.png',
  },
  landingPage: {
    showLatestPosts: true,
    showNewsletter: true, // also setup provider for newsletter
    showCarousel: true,
  },
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    // umamiAnalytics: {
    // We use an env variable for this site to avoid other users cloning our analytics ID
    // umamiWebsiteId: process.env.ANALYTICS_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
    // You may also need to overwrite the script if you're storing data in the US - ex:
    // src: 'https://us.umami.is/script.js'
    // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    // },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    googleAnalytics: {
      googleAnalyticsId: process.env.ANALYTICS_GOOGLE_ID, // e.g. G-XXXXXXX
    },
  },
  newsletter: {
    // Please add your .env file and modify it according to your selection
    provider: '', // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, '' for unactive
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'disqus', // supported providers: giscus, utterances, disqus, '' for unactive
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
