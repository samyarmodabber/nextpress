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

export const HorizontalImageList3new: React.FC<CarouselTypeProps> = ({
  images,
  title = 'Default title HorizontalImageList3new',
}) => {
  const imagesPerSlide = 3
  const [currentIndex, setCurrentIndex] = useState(2) // Start with the middle image highlighted
  const transitionRef = useRef(true) // To manage smooth transitions

  const totalImages = images.length

  // Clone the images for the infinite effect
  const infiniteImages = [
    ...images.slice(totalImages - imagesPerSlide, totalImages), // Last 2 images to prepend
    ...images, // Original images
    ...images.slice(0, imagesPerSlide), // First 2 images to append
  ]

  // Update the carousel index and handle looping with cloned images
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateCarousel = (newIndex: number) => {
    if (newIndex < 0) {
      setCurrentIndex(infiniteImages.length - totalImages + newIndex) // Loop back to the last real image
    } else if (newIndex >= infiniteImages.length) {
      setCurrentIndex(newIndex - infiniteImages.length + totalImages) // Loop back to the first real image
    } else {
      setCurrentIndex(newIndex)
    }
  }

  // Handle index changes with smooth transitions or jumps
  useEffect(() => {
    if (currentIndex === totalImages + 1) {
      const timeout = setTimeout(() => {
        transitionRef.current = false
        setCurrentIndex(1) // Jump back to the first real image
      }, 300)
      return () => clearTimeout(timeout)
    }

    if (currentIndex === 0) {
      const timeout = setTimeout(() => {
        transitionRef.current = false
        setCurrentIndex(totalImages) // Jump back to the last real image
      }, 300)
      return () => clearTimeout(timeout)
    }

    const resetTransition = setTimeout(() => {
      transitionRef.current = true
    }, 350)

    return () => clearTimeout(resetTransition)
  }, [currentIndex, totalImages])

  // Automatically move to the next image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateCarousel(currentIndex + 1)
    }, 2000) // 5 seconds interval

    // Cleanup interval on component unmount
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
            transform: `translateX(${-currentIndex * (100 / imagesPerSlide)}%)`,
          }}
        >
          {infiniteImages.map((image, index) => (
            <div key={index} className={`w-1/3 shrink-0 p-5`}>
              <Image
                width={'400'}
                height={'700'}
                src={image.src}
                alt={image.alt}
                className={`h-auto w-full cursor-pointer transition-all duration-300 ${
                  index === currentIndex + Math.floor(imagesPerSlide / 2) ? 'highlight' : 'blur'
                }`}
              />
            </div>
          ))}
        </div>

        <style jsx>{`
          .highlight {
            transform: scale(1.1); /* Enlarge the highlighted image */
            filter: none; /* No blur */
          }
          .blur {
            filter: blur(10px); /* Apply blur effect to non-highlighted images */
          }
        `}</style>
      </div>{' '}
    </div>
  )
}
