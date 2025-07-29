import projectsData from '@/data/projects/projectsData'
import ProjectsList from '@/components/layouts/projects/ProjectsList'

import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return <ProjectsList projects={projectsData} />
}
