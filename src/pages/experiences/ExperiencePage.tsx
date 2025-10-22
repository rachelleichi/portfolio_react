import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Footer from '../components/Footer'

interface Experience {
  title: string
  slug: string
  company: string
  role: string
  duration: string
  description: string
  skills: string
  screenshots?: string[]
}

const ExperiencePage: React.FC = () => {
  const { slug } = useParams()
  const [experience, setExperience] = useState<Experience | null>(null)

  useEffect(() => {
    fetch('/data/experiences.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((e: Experience) => e.slug === slug)
        setExperience(found || null)
      })
      .catch(err => console.error('Error loading experience:', err))
  }, [slug])

  if (!experience) return <p className="text-center text-white mt-20">Loading experience...</p>

  return (
    <div className="min-h-screen bg-bg1 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
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

        {experience.screenshots && experience.screenshots.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {experience.screenshots.map((shot, i) => (
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
    </div>
  )
}

export default ExperiencePage
