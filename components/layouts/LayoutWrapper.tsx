import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header/Main'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <>
      <Header />
      <SectionContainer>
        <main className="mb-auto flex min-h-screen flex-col justify-between font-sans">
          {children}
        </main>
      </SectionContainer>
      <Footer />
    </>
  )
}

export default LayoutWrapper
