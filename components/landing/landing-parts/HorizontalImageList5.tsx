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

export const HorizontalImageList5: React.FC<CarouselTypeProps> = ({
  images,
  slides = 5,
  title = 'Default title HorizontalImageList5',
}) => {
  const [currentIndex, setCurrentIndex] = useState(2)
  const transitionRef = useRef(true)
  const totalImages = images.length

  const infiniteImages = [
    ...images.slice(totalImages - slides, totalImages),
    ...images,
    ...images.slice(0, slides),
  ]

  const updateCarousel = (newIndex: number) => {
    if (newIndex < 0) {
      setCurrentIndex(infiniteImages.length - totalImages + newIndex)
    } else if (newIndex >= infiniteImages.length) {
      setCurrentIndex(newIndex - infiniteImages.length + totalImages)
    } else {
      setCurrentIndex(newIndex)
    }
  }

  useEffect(() => {
    if (currentIndex === totalImages + 1) {
      const timeout = setTimeout(() => {
        transitionRef.current = false
        setCurrentIndex(1)
      }, 300)
      return () => clearTimeout(timeout)
    }

    if (currentIndex === 0) {
      const timeout = setTimeout(() => {
        transitionRef.current = false
        setCurrentIndex(totalImages)
      }, 300)
      return () => clearTimeout(timeout)
    }

    const resetTransition = setTimeout(() => {
      transitionRef.current = true
    }, 350)

    return () => clearTimeout(resetTransition)
  }, [currentIndex, totalImages])

  useEffect(() => {
    const interval = setInterval(() => {
      updateCarousel(currentIndex + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentIndex, updateCarousel])

  return (
    <div dir="ltr" className="flex flex-col sm:pt-10">
      <div className="p-5 text-right md:text-4xl">{title}</div>
      <div className="relative overflow-hidden sm:pt-10">
        <div
          className="flex transition-transform duration-300"
          style={{
            transition: transitionRef.current ? 'transform 0.3s ease' : 'none',
            transform: `translateX(${-currentIndex * (100 / slides)}%)`,
          }}
        >
          {infiniteImages.map((image, index) => (
            <div
              key={index}
              className={`${slides === 5 ? 'w-1/5' : 'w-1/3'} relative shrink-0 p-2`}
            >
              <Link href={image.href}>
                <div className="relative h-48 w-full md:h-64 lg:h-72">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className={`cursor-pointer rounded-md object-cover transition-all duration-300 ${
                      index === currentIndex + Math.floor(slides / 2) ? 'highlight' : 'blur'
                    }`}
                    unoptimized // optional if images are remote
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <style jsx>{`
          .highlight {
            transform: scale(1.1);
            filter: none;
          }
          .blur {
            filter: blur(4px);
          }
        `}</style>
      </div>
    </div>
  )
}
