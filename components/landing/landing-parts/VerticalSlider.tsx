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

interface CarouselTypeProps {
  images: SlideType[]
  title: string
  slides?: number
}

export const VerticalSlider: React.FC<CarouselTypeProps> = ({
  images,
  title = 'Default title VerticalSlider',
}) => {
  return (
    <div className="flex flex-col sm:pt-10">
      <div className="p-5 text-right md:text-4xl">{title}</div>
      <div className="relative sm:pt-10">
        {images.map((image, index: number) => (
          <div
            key={index}
            className="sticky top-0 flex h-screen flex-col items-center justify-center"
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Link href={`${image.href}`}>
              <h2 className="font-bold text-white md:text-4xl">{image.title}</h2>
            </Link>
            {index < images.length - 1 && (
              <p className="mt-2 text-white">Scroll Down for next Cartoon</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
