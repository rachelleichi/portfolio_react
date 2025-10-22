import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Bio from './components/Bio'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

import ProjectPage from './pages/projects/ProjectPage'
import ExperiencePage from './pages/experiences/ExperiencePage'


export default function App(): JSX.Element {
  return (
    <Router>
      <div className="w-full text-[var(--txt1)] font-body overflow-x-hidden">
        <Routes>
          {/*  HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                {/* HERO */}
                <section
                  id="hero"
                  className="relative min-h-screen bg-cover bg-center text-white flex flex-col"
                  style={{ backgroundImage: "url('/hero.jpg')" }}
                >
                  <Hero />
                </section>

                {/* PROJECTS */}
                <section id="projects" className="bg-mint1 text-gray-900 flex items-center justify-center">
                  <Projects />
                </section>

                {/* BIO */}
                <section id="bio" className="bg-bg1 text-white flex items-center justify-center">
                  <Bio />
                </section>

                {/* EDUCATION */}
                <section id="education" className="bg-bg1 text-white flex justify-center items-center">
                  <Education />
                </section>

                {/* EXPERIENCE */}
                <section id="experience" className="bg-cream1 text-gray-900 flex items-center justify-center">
                  <Experience />
                </section>

                {/* SKILLS */}
                <section id="skills" className="bg-bg1 text-white flex items-center justify-center">
                  <Skills />
                </section>

                {/* CERTIFICATIONS */}
                <section id="certifications" className="bg-mint2 text-gray-900 flex items-center justify-center">
                  <Certifications />
                </section>

                {/* CONTACT */}
                <section id="contact" className="bg-bg1 text-white flex items-center justify-center">
                  <Contact />
                </section>

                <Footer />
              </>
            }
          />

          {/*  DYNAMIC PROJECT PAGE */}
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/experience/:slug" element={<ExperiencePage />} />
        </Routes>
      </div>
    </Router>
  )
}
