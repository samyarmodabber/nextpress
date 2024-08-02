interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'A Search Engine',
    description: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: '/static/images/blog/google.png',
    href: 'https://www.google.com',
  },
  {
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/blog/time-machine.jpg',
    href: '/blog/tailwind-blog/the-time-machine',
  },
  {
    title: 'NextPress',
    description: `A website template by extention of tailwindBlog.`,
    imgSrc: '/static/images/twitter-card.png',
    href: '/blog/tailwind-blog/the-time-machine',
  },
]

export default projectsData
