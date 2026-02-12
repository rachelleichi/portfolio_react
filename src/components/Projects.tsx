import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useData } from '../hooks/useData'
import { loadProjects } from '../services/dataService'

const ProjectCard: React.FC<{title: string, img: string, tags: string, slug: string}> = ({ title, img, tags, slug }) => (
  <Link to={`/projects/${slug}`} className="group block w-full">
    <motion.div whileHover={{ y: -8 }} className="flex flex-col items-center p-2">
      <div className="lens-view w-full max-w-[16rem] md:max-w-[18rem] bg-bg1/5 border-2 border-transparent group-hover:border-mustard/30 transition-all duration-500">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="mt-6 text-center w-full px-2 overflow-hidden">
        <h4 className="font-heading font-bold text-[var(--bg1)] text-xl md:text-2xl uppercase tracking-tighter mb-2 leading-tight group-hover:text-mustard transition-colors">
          {title}
        </h4>
        
        {/* FIXED: Added md:flex-nowrap to keep tags in one line on desktop */}
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-1 overflow-x-hidden w-full">
          {tags.split(',').map((tag, i) => (
            <span 
              key={i} 
              className="font-mono text-[8px] font-bold text-mustard bg-mustard/5 border border-mustard/20 px-1.5 py-0.5 rounded uppercase whitespace-nowrap"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  </Link>
)

const Projects: React.FC = () => {
  const { t } = useTranslation()
  const { data: projects, loading } = useData(loadProjects, [])
  const [startIndex, setStartIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  const [showAll, setShowAll] = useState(false)

  const projectList = Array.isArray(projects) ? projects : []

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
    if (!showAll && projectList.length > visibleCount) {
      const interval = setInterval(() => {
        setStartIndex(prev => (prev + 1) % projectList.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [projectList.length, visibleCount, showAll])

  const getVisibleProjects = () => {
    if (projectList.length === 0) return []
    const extended = [...projectList, ...projectList]
    return extended.slice(startIndex, startIndex + visibleCount)
  }

  const handleNext = () => setStartIndex(prev => (prev + 1) % projectList.length)
  const handlePrev = () => setStartIndex(prev => (prev - 1 + projectList.length) % projectList.length)

  return (
   
    <section id="projets" className="py-24 bg-[var(--mint1)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-heading text-[var(--bg1)] font-bold tracking-tighter uppercase">
            {t('projects.title')}
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mustard"></div>
          </div>
        ) : !showAll ? (
          <>
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={handlePrev} className="text-3xl md:text-5xl text-bg1/20 hover:text-mustard transition px-4">‹</button>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-1 gap-4 md:gap-8 justify-items-center overflow-hidden">
                {getVisibleProjects().map((proj, index) => (
                   <div key={index} className="flex-shrink-0 w-full">
                      <ProjectCard {...proj} />
                   </div>
                ))}
              </div>
              <button onClick={handleNext} className="text-3xl md:text-5xl text-bg1/20 hover:text-mustard transition px-4">›</button>
            </div>
            <div className="mt-16 flex justify-center">
              <button onClick={() => setShowAll(true)} className="px-8 py-3 bg-mustard text-bg1 font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition-all hover:scale-105 active:scale-95 shadow-xl">
                  Explore_All_Projects 
              </button>
            </div>
          </>
        ) : (
          <div className="relative pt-4">
            {/* RESTORED: Top-right "X" button */}
            <button
              onClick={() => setShowAll(false)}
              className="absolute -top-12 right-0 text-3xl font-bold text-mustard hover:text-[var(--bg1)] transition-colors p-2 z-10"
              aria-label="Close Gallery"
            >
              ✕
            </button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 animate-in fade-in duration-700 justify-items-center">
               {projectList.map((proj, index) => <ProjectCard key={index} {...proj} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects