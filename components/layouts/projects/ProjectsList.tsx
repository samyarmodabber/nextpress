import ProjectCardSimple from '@/components/projects/ProjectCardSimple'
import PageTitle from '@/components/tools/PageTitle'
const ProjectsList = ({ projects }) => {
  return (
    <>
      <PageTitle>Projects</PageTitle>
      <ul className="grid grid-cols-1 justify-stretch gap-3 pt-8 md:grid-cols-2 lg:grid-cols-3 ">
        {projects.map((project, index) => (
          <ProjectCardSimple key={index} project={project} />
        ))}
      </ul>
    </>
  )
}

export default ProjectsList
