import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'
import { useDataById } from '../../hooks/useData'
import { loadExperienceBySlug, preloadData } from '../../services/dataService'

const ExperiencePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: experience, loading, error } = useDataById(
    (id) => loadExperienceBySlug(id),
    slug
  )

  // Preload projects for smooth transitions
  React.useEffect(() => {
    preloadData('/data/projects.json')
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg1">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mustard"></div>
      </div>
    )
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg1 text-white">
        <p className="text-xl mb-4">Experience not found</p>
        <Link to="/#experience" className="text-accent1 hover:underline">
          ← Back to Experience
        </Link>
      </div>
    )
  }

  // Filter valid screenshots (ignore "/")
  const validScreenshots = experience.screenshots?.filter(src => src !== '/') || []

  return (
    <div className="min-h-screen flex flex-col bg-bg1 text-white">
      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-12 flex-grow">
        <Link
          to="/#experience"
          className="text-accent1 hover:underline mb-6 inline-block"
        >
          ← Back to Experience
        </Link>

        <h1 className="text-5xl font-heading text-accent1 mb-4">{experience.title}</h1>
        <p className="text-lg text-cream1 mb-4"><strong>Company:</strong> {experience.company}</p>
        <p className="text-lg text-cream1 mb-4"><strong>Role:</strong> {experience.role}</p>
        <p className="text-lg text-cream1 mb-4"><strong>Duration:</strong> {experience.duration}</p>
        <p className="text-lg text-cream1 mb-8">{experience.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {experience.skills.split(',').map((skill, i) => (
            <span
              key={i}
              className="bg-mint1/20 border border-accent1 text-accent1 px-3 py-1 rounded-full text-sm"
            >
              {skill.trim()}
            </span>
          ))}
        </div>

        {/* Screenshots grid */}
        {validScreenshots.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {validScreenshots.map((shot, i) => (
              <img
                key={i}
                src={shot}
                alt={`${experience.title} screenshot ${i + 1}`}
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

export default ExperiencePage
