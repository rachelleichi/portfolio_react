import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

interface Project {
  title: string
  description: string
  tags: string
  img: string
  screenshots: string[]
}

const ProjectPage: React.FC = () => {
  const { slug } = useParams()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then((data) => {
        const found = data.find((p: any) => p.slug === slug)
        setProject(found || null)
      })
      .catch(err => console.error('Error loading project:', err))
  }, [slug])

  if (!project) return <p className="text-center text-white mt-20">Loading project...</p>

  return (
    <div className="min-h-screen bg-bg1 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/#projects"
          className="text-accent1 hover:underline mb-6 inline-block"
        >
          ← Back to Projects
        </Link>

        <h1 className="text-5xl font-heading text-accent1 mb-4">{project.title}</h1>
        <p className="text-lg text-cream1 mb-8">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.split(',').map((tag, i) => (
            <span
              key={i}
              className="bg-mint1/20 border border-accent1 text-accent1 px-3 py-1 rounded-full text-sm"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {project.screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              className="rounded-xl shadow-lg object-cover w-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
