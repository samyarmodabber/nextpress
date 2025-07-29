'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRightIcon, LightbulbIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import projectsData from '@/data/projects/projectsData'
import CustomLink from '../../tools/Link'

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

const SelectedProjects = () => {
  const projects = projectsData
  const projectsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{
        duration: 0.5,
      }}
      className="relative my-24"
    >
      <motion.h2
        className="font-title text-center text-3xl font-bold sm:text-4xl"
        initial={{
          y: 30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        Selected Projects
      </motion.h2>
      <motion.div
        className="mt-12 grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {projects
          .filter((project) => project.selected)
          .map((project) => (
            <Card key={project.href} project={project} />
          ))}
      </motion.div>
      <div className="my-8 flex items-center justify-center">
        <CustomLink href="/projects" className="rounded-xl">
          See all project
        </CustomLink>
      </div>
    </motion.div>
  )
}

const Card = (props) => {
  const { project } = props
  const { href, title, description, imgSrc } = project

  return (
    <Link
      key={title}
      href={href}
      className="shadow-feature-card dark:shadow-feature-card-dark group relative rounded-xl p-2"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <LightbulbIcon className="size-[18px]" />
          <h2 className="font-light">Project</h2>
        </div>
        <ArrowUpRightIcon className="size-[18px] opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <Image width={1280} height={832} src={imgSrc} alt={title} className="rounded-lg" />
      <div className=" flex flex-col transition-[left] ease-out group-hover:left-[30px]">
        <h3 className="font-title text-primary text-2xl font-bold">{title}</h3>
        <p className="dark:text-muted-foreground text-primary mt-2">{description}</p>
      </div>
    </Link>
  )
}

export default SelectedProjects
