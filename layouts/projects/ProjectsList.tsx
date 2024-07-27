import ProjectCardSimple from '@/components/projects/ProjectCardSimple'
import PageTitle from '@/components/tools/PageTitle'
const ProjectsList = ({ projects }) => {
  return (
    <div className="divide-y divide-gray-200  dark:divide-gray-700">
      <div className="space-y-1 pb-10 text-center dark:border-gray-700">
        <PageTitle>Projects</PageTitle>
      </div>
      <div className="container py-12">
        <div className=" flex flex-wrap">
          {projects.map((d) => (
            <ProjectCardSimple
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsList
