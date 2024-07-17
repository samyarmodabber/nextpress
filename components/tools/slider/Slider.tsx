'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Description from './Description'

const Slider = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0)

  const clickNext = () => {
    activeImage === images.length - 1 ? setActiveImage(0) : setActiveImage(activeImage + 1)
  }
  const clickPrev = () => {
    activeImage === 0 ? setActiveImage(images.length - 1) : setActiveImage(activeImage - 1)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext()
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [activeImage])
  return (
    <main className="mx-auto grid w-full max-w-5xl grid-cols-1 place-items-center rounded-2xl shadow-2xl md:grid-cols-2">
      <div
        className={`flex w-full items-center justify-center gap-4 p-6 transition-transform duration-500 ease-in-out md:rounded-2xl md:p-0`}
      >
        {images.map((elem, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeImage
                ? 'block h-[80vh] w-full object-cover transition-all duration-500 ease-in-out'
                : 'hidden'
            }`}
          >
            <Image
              src={elem.src}
              alt=""
              width={400}
              height={400}
              className="h-full w-full object-cover md:rounded-bl-3xl md:rounded-tl-3xl"
            />
          </div>
        ))}
      </div>
      <Description
        images={images}
        activeImage={activeImage}
        clickNext={clickNext}
        clickPrev={clickPrev}
      />
    </main>
  )
}

export default Slider
