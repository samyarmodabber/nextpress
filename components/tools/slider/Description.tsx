import React from 'react'
// import { images } from './constants'
import left from './left.svg'
import right from './right.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const Description = ({ images, activeImage, clickNext, clickPrev }) => {
  return (
    <div className="relative grid w-full place-items-start bg-[#e7dfd9] md:rounded-br-3xl md:rounded-tr-3xl">
      {/* <div className="absolute right-4 top-2 text-sm uppercase underline underline-offset-4">
        Coffee Cafe
      </div> */}
      {images.map((elem, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImage
              ? 'block h-full w-full px-10 py-20 text-left md:h-[80vh] md:px-20'
              : 'hidden'
          }`}
        >
          <motion.div
            initial={{
              opacity: idx === activeImage ? 0 : 0.5,
              scale: idx === activeImage ? 0.5 : 0.3,
            }}
            animate={{
              opacity: idx === activeImage ? 1 : 0.5,
              scale: idx === activeImage ? 1 : 0.3,
            }}
            transition={{
              ease: 'linear',
              duration: 2,
              x: { duration: 1 },
            }}
            className="w-full"
          >
            <div className="py-16 text-5xl font-extrabold">{elem.title}</div>
            <div className="h-60 text-base font-medium italic leading-relaxed tracking-wide text-gray-600 md:h-40">
              {' '}
              {elem.desc}
            </div>
          </motion.div>

          {elem.link_src && (
            <Link
              href={elem.link_src}
              className="my-10 rounded-md bg-[#ecae7e] px-4 py-2 uppercase text-white"
            >
              {elem.link_text}
            </Link>
          )}

          <div className="absolute bottom-10 right-10 flex w-full items-center justify-center md:bottom-1 md:right-0">
            <button onClick={clickPrev} className="absolute bottom-2 right-10 cursor-pointer">
              <Image src={left} alt="" />
            </button>

            <button className="absolute bottom-2 right-2 cursor-pointer" onClick={clickNext}>
              <Image src={right} alt="" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Description
