import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'
import { useDataById } from '../../hooks/useData'
import { loadProjectBySlug, preloadData } from '../../services/dataService'

interface Project {
  title: string
  description: string
  tags: string
  img: string
  screenshots: string[]
  repo: string
  showRepo?: boolean
}

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: project, loading, error } = useDataById(
    (id) => loadProjectBySlug(id),
    slug
  )

  // Preload experiences for smooth transitions
  React.useEffect(() => {
    preloadData('/data/experiences.json')
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg1">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mustard"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg1 text-white">
        <p className="text-xl mb-4">Project not found</p>
        <Link to="/#projects" className="text-accent1 hover:underline">
          ← Back to Projects
        </Link>
      </div>
    )
  }

  // Only keep valid screenshots (ignore "/")
  const validScreenshots = project.screenshots.filter(src => src !== '/')

  return (
    <div className="min-h-screen flex flex-col bg-bg1 text-white">
      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-12 flex-grow">
        <Link
          to="/#projects"
          className="text-accent1 hover:underline mb-6 inline-block"
        >
          ← Back to Projects
        </Link>

        <h1 className="text-5xl font-heading text-accent1 mb-4">{project.title}</h1>
        <p className="text-lg text-cream1 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.split(',').map((tag, i) => (
            <span
              key={i}
              className="bg-mint1/20 border border-accent1 text-accent1 px-3 py-1 rounded-full text-sm"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        {/* GitHub button */}
        {project.repo && project.showRepo !== false && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-mustard text-bg1 font-semibold rounded-full hover:bg-mustard/80 mb-8 transition"
          >
            GitHub
          </a>
        )}

        {/* Screenshots grid */}
        {validScreenshots.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {validScreenshots.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                className="rounded-xl shadow-lg object-cover w-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-cream1 text-bg1 py-12 text-center">
        <div className="container flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <span className="text-bg1">Retrouve-moi sur :</span>

            <a
              href="https://www.linkedin.com/in/rachel-meflah/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0e76a8] hover:text-[#084a7a] transition text-2xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.instagram.com/rachelmeflah/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E1306C] hover:text-[#9f0e4b] transition text-2xl"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
          <p className="text-bg1">© {new Date().getFullYear()} Rachel Meflah</p>
        </div>
      </footer>
    </div>
  )
}

export default ProjectPage
