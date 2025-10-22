import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Experience {
  title: string
  slug: string
  company: string
  role: string
  duration: string
  img: string
  screenshots?: string[]
}

interface ExperienceCardProps {
  title: string
  img: string
  duration: string
  slug: string
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, img, duration, slug }) => (
  <Link to={`/experience/${slug}`} className="block w-full h-full">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative flex flex-col cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl w-full h-80">
        <img src={img} alt={title} className="w-full h-full object-cover block" />
        <div className="absolute inset-0 bg-mustard/70 opacity-0 hover:opacity-100 flex flex-col justify-center items-center text-center text-white transition-opacity duration-300 p-4">
          {/* Title uses heading font + accent1 color */}
          <h4 className="font-heading font-semibold text-2xl text-[var(--accent1)]">{title}</h4>
          {/* Duration uses body font + lighter color */}
          <p className="font-body text-base text-white/90 mt-1">{duration}</p>
        </div>
      </div>
    </motion.div>
  </Link>
)


const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)

  // Load experiences dynamically from JSON
  useEffect(() => {
    fetch('/data/experiences.json')
      .then(res => res.json())
      .then(data => setExperiences(data))
      .catch(err => console.error('Error loading experiences.json:', err))
  }, [])

  // Responsive visible cards
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

  // Automatic looping carousel
  useEffect(() => {
    if (experiences.length > 0) {
      const interval = setInterval(() => {
        setStartIndex(prev => (prev + 1) % experiences.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [experiences.length])

  const handlePrev = () => setStartIndex(prev => (prev - 1 + experiences.length) % experiences.length)
  const handleNext = () => setStartIndex(prev => (prev + 1) % experiences.length)

  // Circular slicing
  const getVisibleExperiences = () => {
    if (experiences.length === 0) return []
    const extended = [...experiences, ...experiences]
    return extended.slice(startIndex, startIndex + visibleCount)
  }

  return (
    <section id="expérience" className="py-12 mb-12 relative">
      <h2 className="text-5xl font-heading text-[var(--bg1)] mb-6 text-left pl-6">Expériences</h2>

      <div className="relative flex items-center gap-4">
        {/* Left button */}
        <button onClick={handlePrev} className="text-4xl text-mustard"> &lt;</button>

        {/* Cards container */}
        <div className="flex flex-1 gap-6 overflow-hidden px-6">
          {getVisibleExperiences().map((exp, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <ExperienceCard
                title={exp.title}
                img={exp.img}
                duration={exp.duration}
                slug={exp.slug}
              />
            </div>
          ))}
        </div>

        {/* Right button */}
        <button onClick={handleNext} className="text-4xl text-mustard"> &gt;</button>
      </div>
    </section>
  )
}

export default Experience