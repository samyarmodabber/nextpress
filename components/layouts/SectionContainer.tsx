import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-4 px-2 sm:mx-6 sm:px-4 md:mx-8 md:px-6 lg:mx-10 lg:px-8 xl:mx-12 xl:px-10">
      {children}
    </section>
  )
}
