'use client'
import { motion, useAnimate } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'

const Hero = ({ heroData }) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    void animate(
      [
        [scope.current, { y: '0%' }, { duration: 0 }],
        [scope.current, { y: '-25%' }, { duration: 0.3, at: '+1.3' }],
        [scope.current, { y: '-50%' }, { duration: 0.3, at: '+1.3' }],
        [scope.current, { y: '-75%' }, { duration: 0.3, at: '+1.3' }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      }
    )
  }, [animate, scope])

  return (
    <div className="space-y-6 md:my-16">
      <div className="flex flex-col-reverse justify-around gap-8 md:flex-row">
        <motion.div
          className="flex flex-col gap-4 md:max-w-xl"
          initial={{
            y: 40,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <h1 className="font-title bg-gradient-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text text-2xl font-bold leading-9 text-transparent dark:from-white dark:via-white/90 dark:to-white/70 sm:text-4xl sm:leading-[3.5rem]">
            My name is {siteMetadata.author}. <br /> I am a {siteMetadata.occupation} and expert in{' '}
            <div className="inline-grid h-9 overflow-hidden sm:h-14">
              <div ref={scope}>
                {heroData.map(({ text, className }, i) => (
                  <div className={className} key={i}>
                    {text}.
                  </div>
                ))}
              </div>
            </div>
            <br />
          </h1>
        </motion.div>
        <motion.div
          className="size-35 relative md:size-40"
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <div className="mx-auto max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <Image
              src={siteMetadata.siteLogoPNG}
              className="h-auto w-full rounded-full"
              width={400}
              height={400}
              alt={siteMetadata.author}
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 opacity-0 blur-2xl md:opacity-50" />
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
