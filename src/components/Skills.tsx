import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useData } from '../hooks/useData'
import { loadSkills } from '../services/dataService'

const Skills: React.FC = () => {
  const { t } = useTranslation()
  const { data: skills = [], loading } = useData(loadSkills, [])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="compétences" className="w-full py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-5xl font-heading text-[var(--mint1)] font-bold uppercase tracking-widest">
          {t('skills.title')}
        </h3>
        <div className="h-1 w-12 bg-mustard mx-auto mt-4 rounded-full" />
      </div>

      {loading ? (
        <div className="flex justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mustard"></div></div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          {skills.map((skill, index) => (
            <div key={skill.name} className="relative group flex flex-col items-center">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="skill-lens"
              >
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="skill-icon-img" 
                />
              </button>

              <h4 className="mt-4 md:mt-6 font-heading text-sm md:text-xl text-[var(--accent1)] font-bold tracking-widest uppercase text-center">
                {skill.name}
              </h4>

              <div className={`
                absolute top-[80%] left-1/2 -translate-x-1/2 z-50 mt-4
                w-48 md:w-64 bg-[#0a0a0a]/95 border border-white/10 rounded-xl p-4 md:p-6 backdrop-blur-xl
                transition-all duration-300 transform
                ${activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
              `}>
                <ul className="space-y-1 md:space-y-2 font-mono text-[10px] md:text-[11px] text-mint1">
                  {skill.details.map((d, i) => (
                    <li key={i} className="flex gap-2"><span className="text-mustard/60">❯</span> {d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Skills