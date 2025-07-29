'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SlideType {
  alt: string
  href: string
  title: string
  src: string
}

interface HeaderNavLink {
  href: string
  title: string
}

interface ImageSliderTypeProps {
  images: SlideType[]
  headerNavLinks: HeaderNavLink[]
}
export const HorizontalSlider: React.FC<ImageSliderTypeProps> = ({ images, headerNavLinks }) => {
  const [activeSlide, setActiveSlide] = useState(0)

  // Define the menu within the component to handle rerender
  const menu = (
    <div className="sticky top-0 z-50 w-full bg-white bg-opacity-40 px-6 py-4 text-black backdrop-blur-md sm:px-12">
      <nav aria-label="Main Navigation" className="flex items-center justify-between">
        <div className="text-xs font-bold sm:text-lg">NextPress 2025</div>
        <ul className="flex space-x-1 sm:space-x-6">
          {headerNavLinks.map((item) => (
            <li key={item.href} className="text-xs">
              <a
                href={item.href}
                className="transition duration-200 hover:text-gray-300 focus:text-gray-300"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide === images.length ? 1 : prevSlide + 1))
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [images])

  return (
    <div dir="ltr" className="relative h-screen w-full overflow-hidden bg-transparent">
      {/* {menu} */}
      {/* Slider Content */}
      <div
        className="relative flex h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(activeSlide - 1) * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative size-full shrink-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image.src})`,
            }}
          >
            {/* Title at the center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl font-bold text-white sm:text-3xl md:text-4xl">
              {image.title}
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2 sm:bottom-8">
        {images.map((image, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <Image
            fill
            key={index}
            alt={image.alt}
            src={image.src}
            className={`block h-8 w-10 cursor-pointer rounded-md border-2 transition-all duration-300 ease-in-out ${
              activeSlide === index + 1
                ? 'border-white opacity-100'
                : 'border-transparent opacity-50'
            }`}
            onClick={() => setActiveSlide(index + 1)}
          />
        ))}
      </div>
    </div>
  )
}
