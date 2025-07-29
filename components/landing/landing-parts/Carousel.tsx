'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from '@/components/tools/Image'
import Bleed from 'pliny/ui/Bleed'

const Carousel = ({ slides, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }

    const slideInterval = setInterval(nextSlide, interval)

    return () => clearInterval(slideInterval)
  }, [slides.length, interval])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <Bleed full={true}>
      <div className="carousel relative w-full">
        {slides.length > 0 &&
          slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item relative w-full ${index === currentIndex ? 'block' : 'hidden'}`}
            >
              <div className="relative aspect-[2/1] w-full">
                <Image src={slide.src} alt={`Slide ${index}`} fill className="object-cover" />
              </div>
              <Link href={slide.link_src}>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 pb-7 text-center text-white">
                  <h2 className="text-4xl">{slide.title}</h2>
                  <p className="mb-4">{slide.description}</p>
                </div>
              </Link>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button
                  onClick={() => goToSlide((index - 1 + slides.length) % slides.length)}
                  className="btn btn-circle"
                >
                  ❮
                </button>
                <button
                  onClick={() => goToSlide((index + 1) % slides.length)}
                  className="btn btn-circle"
                >
                  ❯
                </button>
              </div>
            </div>
          ))}
      </div>
    </Bleed>
  )
}

export default Carousel
