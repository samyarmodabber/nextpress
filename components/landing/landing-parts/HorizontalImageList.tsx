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

export const HorizontalImageList: React.FC<CarouselTypeProps> = ({
  images,
  title = 'Default title HorizontalImageList3',
}) => {
  return (
    <div className="flex flex-col sm:pt-14">
      <div className="px-6 py-10 text-right md:text-4xl">{title}</div>
      <div className="container mx-auto md:pt-5">
        <div className="flex justify-between space-x-1 px-2 py-3">
          {images.map((image, index) => (
            <div key={index} className="">
              <Link href={`${image.href}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-auto w-full transform cursor-pointer object-cover transition-transform duration-300 hover:scale-110"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
