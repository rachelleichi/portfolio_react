import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useData } from '../hooks/useData'
import { loadExperiences } from '../services/dataService'

interface ExperienceCardProps {
  title: string
  img: string
  duration: string
  slug: string
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, img, duration, slug }) => (
  <Link to={`/experience/${slug}`} className="group block w-full">
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col cursor-pointer"
    >
      {/* Container uses aspect-video to ensure responsive scaling without cropping */}
      <div className="relative overflow-hidden rounded-2xl w-full aspect-video sm:aspect-square md:aspect-video bg-white/5 border border-white/10 group-hover:border-mustard/30 transition-all duration-500">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg1/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="mt-6 text-left">
        <h4 className="font-heading font-bold text-[var(--bg1)] text-2xl uppercase tracking-tighter mb-2 leading-tight">
          {title}
        </h4>
        <p className="font-mono text-[10px] font-bold text-bg1/60 uppercase tracking-widest">
          {duration}
        </p>
      </div>
    </motion.div>
  </Link>
)

const Experience: React.FC = () => {
  const { t } = useTranslation()
  const { data: experiences, loading } = useData(loadExperiences, [])
  const [startIndex, setStartIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  
  const experienceList = Array.isArray(experiences) ? experiences : []

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth
      if (width < 640) setVisibleCount(1)
      else if (width < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  useEffect(() => {
    if (experienceList.length > visibleCount) {
      const interval = setInterval(() => {
        setStartIndex(prev => (prev + 1) % experienceList.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [experienceList.length, visibleCount])

  const getVisibleExperiences = () => {
    if (experienceList.length === 0) return []
    const extended = [...experienceList, ...experienceList]
    return extended.slice(startIndex, startIndex + visibleCount)
  }

  return (
    <section id="expérience" className="py-24 container mx-auto px-6">
      {/* FIXED: Removed border-b and pb-8 classes to remove the line */}
      <div className="mb-16">
        <h2 className="text-6xl font-heading text-[var(--bg1)] font-bold tracking-tighter uppercase">
          {t('experience.title')}
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mustard"></div>
        </div>
      ) : (
        <div className="relative flex items-center gap-4">
          <button onClick={() => setStartIndex(prev => (prev - 1 + experienceList.length) % experienceList.length)} className="text-5xl text-bg1/20 hover:text-mustard transition px-2">‹</button>

          <div className="flex flex-1 gap-8 overflow-hidden">
            {getVisibleExperiences().map((exp, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-2" 
                style={{ width: `${100 / visibleCount}%` }}
              >
                <ExperienceCard {...exp} />
              </div>
            ))}
          </div>

          <button onClick={() => setStartIndex(prev => (prev + 1) % experienceList.length)} className="text-5xl text-bg1/20 hover:text-mustard transition px-2">›</button>
        </div>
      )}
    </section>
  )
}

export default Experience