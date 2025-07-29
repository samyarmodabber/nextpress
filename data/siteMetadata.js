/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'NextPress Starter Blog',
  headerTitle: 'NextPress Website',
  slogan: 'A website with markdown',
  description:
    'A website created with Next.js and Tailwind.css based on the Markdown document and SEO friendly and responsive.',
  language: 'en-us',
  dir: 'ltr',
  locale: 'en-US',
  theme: 'system', // system, dark or light
  author: 'Your Name',
  occupation: 'Your Occupation',
  siteUrl: 'https://nextpress.vercel.app',
  siteRepo: 'https://github.com/samyarmodabber/nextpress',
  siteLogoSVG: '/static/site/logo.svg',
  siteLogoPNG: '/static/site/logo.png',
  socialBanner: '/static/site/twitter-card.png',
  social: {
    email: 'address@yoursite.com',
    github: 'https://github.com',
    x: '',
    // twitter: 'https://twitter.com/Twitter',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://www.linkedin.com',
    threads: 'https://www.threads.net',
    instagram: 'https://www.instagram.com',
    mastodon: 'https://mastodon.social',
  },
}

module.exports = siteMetadata
