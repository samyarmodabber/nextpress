'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface SlideType {
  alt: string
  href: string
  title: string
  src: string
}

interface CarouselTypeProps {
  images: SlideType[]
  title: string
  slides?: number
}

export const HorizontalImageList3: React.FC<CarouselTypeProps> = ({
  images,
  title = 'Default title HorizontalImageList3',
}) => {
  const interval = 5000
  const [currentIndex, setCurrentIndex] = useState(0)
  const imagesToShow = 3
  const totalImages = images.length

  useEffect(() => {
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages)
    }

    const timer = setInterval(() => {
      nextImage()
    }, interval)

    return () => clearInterval(timer)
  }, [interval, totalImages])

  const displayedImages = images
    .concat(images) // Duplicate for looping
    .slice(currentIndex, currentIndex + imagesToShow)

  return (
    <div dir="ltr" className="flex flex-col sm:pt-10">
      <div className="p-5 text-right md:text-4xl">{title}</div>
      <div className="relative mx-auto w-full sm:pt-10">
        <div className="flex overflow-hidden py-5 transition-transform duration-1000 ease-in-out">
          {displayedImages.map((image, index) => (
            <div
              key={index}
              className={`w-1/3 shrink-0 transition-all duration-1000 ease-in-out md:p-8 ${
                index === 1 ? '' : 'scale-90 opacity-40'
              }`}
            >
              <Link href={image.href}>
                <div className="relative h-96 w-full overflow-hidden rounded-3xl shadow-lg md:h-64 lg:h-72">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    title={image.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized // Optional: remove if you're using local or optimized images
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
