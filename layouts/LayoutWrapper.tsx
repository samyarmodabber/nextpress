import SectionContainer from '../components/layouts-parts/SectionContainer'
import Footer from '../components/layouts-parts/Footer'
import { ReactNode } from 'react'
import Header from '../components/layouts-parts/Header/Main'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <>
      <Header />
      <SectionContainer>{children}</SectionContainer>
      <Footer />
    </>
  )
}

export default LayoutWrapper
