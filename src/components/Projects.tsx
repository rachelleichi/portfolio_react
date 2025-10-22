import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Project {
  title: string
  img: string
  tags: string
  slug: string
  repo: string
}

interface ProjectCardProps {
  title: string
  img: string
  tags: string
  slug: string
  repo?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, img, tags, slug, repo }) => (
  <Link to={`/projects/${slug}`} className="block w-full h-full">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col items-center cursor-pointer"
    >
      <img
        src={img}
        alt={title}
        className="circle-img mb-4 w-full h-64 object-cover rounded-2xl shadow-lg"
      />
      <h4 className="font-semibold text-[var(--bg1)] text-2xl text-center">{title}</h4>
      <p className="text-sm text-[var(--bg1)] text-center">{tags}</p>

      {/* Optional repo link */}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-mustard text-sm hover:underline"
        >
          Repository
        </a>
      )}
    </motion.div>
  </Link>
)

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  const [showAll, setShowAll] = useState(false)

  // Fetch JSON dynamically
  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error loading JSON:', err))
  }, [])

  // Responsive number of visible cards
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth
      if (width < 640) setVisibleCount(1)
      else if (width < 1024) setVisibleCount(2)
      else if (width < 1440) setVisibleCount(3)
      else setVisibleCount(4)
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  // Infinite auto-loop
  useEffect(() => {
    if (!showAll && projects.length > visibleCount) {
      const interval = setInterval(() => {
        setStartIndex(prev =>
          (prev + 1) % projects.length
        )
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [projects, visibleCount, showAll])

  // Handle buttons (manual control)
  const handlePrev = () => {
    setStartIndex(prev =>
      (prev - 1 + projects.length) % projects.length
    )
  }

  const handleNext = () => {
    setStartIndex(prev =>
      (prev + 1) % projects.length
    )
  }

  const handleShowAll = () => setShowAll(true)
  const handleBackToCarousel = () => setShowAll(false)

  // Circular slicing (so carousel wraps smoothly)
  const getVisibleProjects = () => {
    if (projects.length === 0) return []
    const extended = [...projects, ...projects] // duplicate list for smooth wrap
    return extended.slice(startIndex, startIndex + visibleCount)
  }

  return (
    <section id="projets" className="py-12 bg-[var(--mint1)] mb-12 relative">
      <h2 className="text-5xl font-heading text-[var(--bg1)] mb-6 text-center">
        Projets
      </h2>

      {!showAll ? (
        <>
          {/* Carousel */}
          <div className="flex items-center justify-center gap-6 relative">
            {/* Left button */}
            {projects.length > visibleCount && (
              <button
                onClick={handlePrev}
                className="text-4xl text-[var(--bg1)] disabled:opacity-30"
              >&lt;</button>
            )}

            {/* Cards */}
            <div className="flex flex-1 gap-6 overflow-hidden justify-center">
              {getVisibleProjects().map((proj, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <ProjectCard
                    key={index}
                    title={proj.title}
                    img={proj.img}
                    tags={proj.tags}
                    slug={proj.slug}
                  />
                </div>
              ))}
            </div>

            {/* Right button */}
            {projects.length > visibleCount && (
              <button
                onClick={handleNext}
                className="text-4xl text-[var(--bg1)] disabled:opacity-30"
              >&gt;</button>
            )}
          </div>

          {/* Explore button */}
          <div className="text-center mt-10">
            <button
              onClick={handleShowAll}
              className="px-16 py-3 border-2 border-mustard text-mustard bg-[var(--mint1)] font-semibold text-xl hover:bg-mustard hover:text-[var(--mint1)] transition rounded-none"
            >
              Explorez Plus
            </button>
          </div>
        </>
      ) : (
        // Show all projects grid
        <div className="mt-8 relative">
          <button
            onClick={handleBackToCarousel}
            className="absolute top-0 right-0 text-3xl font-bold px-4 py-2 text-mustard hover:text-[var(--bg1)] transition"
          >
            ✕
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.map((proj, index) => (
              <ProjectCard
                key={index}
                title={proj.title}
                img={proj.img}
                tags={proj.tags}
                slug={proj.slug}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
