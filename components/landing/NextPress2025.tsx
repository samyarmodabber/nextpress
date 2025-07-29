import { HorizontalImageList5 } from '@/components/landing/landing-parts/HorizontalImageList5'
import { HorizontalImageList3 } from '@/components/landing/landing-parts/HorizontalImageList3'
import { HorizontalSlider } from '@/components/landing/landing-parts/HorizontalSlider'
import { VerticalSlider } from '@/components/landing/landing-parts/VerticalSlider'
import { HorizontalImageList } from '@/components/landing/landing-parts/HorizontalImageList'
import { HorizontalImageList3new } from './landing-parts/HorizontalImageList3new'

const images_for_slider = [
  {
    alt: 'A',
    href: '/blog',
    title: 'Image 1 description',
    src: 'https://picsum.photos/1200/800',
  },
  {
    alt: 'B',
    href: '/blog',
    title: 'Image 2 description',
    src: 'https://picsum.photos/1200/801',
  },
  {
    alt: 'C',
    href: '/blog',
    title: 'Image 3 description',
    src: 'https://picsum.photos/1200/802',
  },
  {
    alt: 'D',
    href: '/blog',
    title: 'Image 4 description',
    src: 'https://picsum.photos/1200/803',
  },
  {
    alt: 'E',
    href: '/blog',
    title: 'Image 5 description',
    src: 'https://picsum.photos/1200/804',
  },
]

const images_set = [
  { alt: 'A', href: '/blog', title: 'A', src: 'https://picsum.photos/200/300' },
  { alt: 'B', href: '/blog', title: 'B', src: 'https://picsum.photos/200/301' },
  { alt: 'C', href: '/blog', title: 'C', src: 'https://picsum.photos/200/302' },
  { alt: 'D', href: '/blog', title: 'D', src: 'https://picsum.photos/200/303' },
  { alt: 'E', href: '/blog', title: 'E', src: 'https://picsum.photos/200/304' },
]
const images_set2 = [
  { alt: 'A', href: '/blog', title: 'A', src: 'https://picsum.photos/201/300' },
  { alt: 'B', href: '/blog', title: 'B', src: 'https://picsum.photos/201/301' },
  { alt: 'C', href: '/blog', title: 'C', src: 'https://picsum.photos/201/302' },
  { alt: 'D', href: '/blog', title: 'D', src: 'https://picsum.photos/201/303' },
  { alt: 'E', href: '/blog', title: 'E', src: 'https://picsum.photos/201/304' },
  { alt: 'E', href: '/blog', title: 'E', src: 'https://picsum.photos/201/305' },
  { alt: 'E', href: '/blog', title: 'E', src: 'https://picsum.photos/201/306' },
  { alt: 'E', href: '/blog', title: 'E', src: 'https://picsum.photos/201/307' },
  { alt: 'E', href: '/blog', title: 'E', src: 'https://picsum.photos/201/308' },
  { alt: 'E', href: '/blog', title: 'E', src: 'https://picsum.photos/201/309' },
]
const images_set3 = [
  { alt: 'A', href: '/blog', title: 'title A', src: 'https://picsum.photos/1200/700' },
  { alt: 'B', href: '/blog', title: 'title B', src: 'https://picsum.photos/1200/701' },
  { alt: 'C', href: '/blog', title: 'title C', src: 'https://picsum.photos/1200/702' },
]
const images_set4 = [
  { alt: 'A', href: '/blog', title: 'title A', src: 'https://picsum.photos/700/1200' },
  { alt: 'B', href: '/blog', title: 'title B', src: 'https://picsum.photos/701/1200' },
  { alt: 'C', href: '/blog', title: 'title C', src: 'https://picsum.photos/702/1200' },
]
const headerNavLinks = [
  { href: '/', title: 'Main Page' },
  { href: '/', title: 'Blog' },
  { href: '/', title: 'Projects' },
  { href: '/', title: 'Contact' },
]
const LandingPage = ({ posts }) => {
  return (
    <>
      <div className="">
        <HorizontalSlider images={images_for_slider} headerNavLinks={headerNavLinks} />
        <HorizontalImageList images={images_set} title="HorizontalImageList" />
        <div className="md:hidden">
          <HorizontalImageList5 slides={3} images={images_set2} title="HorizontalImageList5-3" />
        </div>
        <div className="hidden md:block">
          <HorizontalImageList5 slides={5} images={images_set2} title="HorizontalImageList5-5" />
        </div>
        <VerticalSlider images={images_set3} title="VerticalSlider" />
        <div className="md:hidden">
          <HorizontalImageList5 slides={3} images={images_set2} title="HorizontalImageList5" />
        </div>
        <div className="hidden md:block">
          <HorizontalImageList5 slides={5} images={images_set2} title="HorizontalImageList5" />
        </div>
        <HorizontalImageList3 images={images_set4} title="HorizontalImageList3" />
        <HorizontalImageList3new images={images_set4} title="HorizontalImageList3NEW" />
      </div>
    </>
  )
}

export default LandingPage
