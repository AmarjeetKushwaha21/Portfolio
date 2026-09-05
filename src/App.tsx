import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { BackToTop } from './components/BackToTop'
import { Loader } from './components/Loader'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { SoftSkills } from './sections/SoftSkills'
import { Experience } from './sections/Experience'
import { Projects } from './sections/Projects'
import { Hackathons } from './sections/Hackathons'
import { Achievements } from './sections/Achievements'
import { Certificates } from './sections/Certificates'
import { CodingProfiles } from './sections/CodingProfiles'
import { SocialMedia } from './sections/SocialMedia'
import { Resume } from './sections/Resume'
import { Contact } from './sections/Contact'
import NotFound from './pages/NotFound'

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <SoftSkills />
        <Experience />
        <Projects />
        <Hackathons />
        <Achievements />
        <Certificates />
        <CodingProfiles />
        <SocialMedia />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <Loader />
      <ScrollProgress />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
