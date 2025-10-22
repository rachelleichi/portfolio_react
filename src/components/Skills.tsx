import React, { useEffect, useState } from 'react'

interface Skill {
  name: string
  icon: string
  details: string[]
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/data/skills.json')
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error('Error loading skills:', err))
  }, [])

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="competences" className="w-full py-16 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-0">
      {/* Title */}
      <h3 className="text-4xl sm:text-4xl md:text-5xl font-heading text-[var(--mint1)] mb-8 text-center">
        Compétences
      </h3>

      {/* Grid icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-4 justify-items-center">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="relative flex flex-col items-center group cursor-pointer"
            onClick={() => handleClick(index)}
          >
            {/* Cercle avec icône */}
            <div className="skill-icon w-42 h-42 sm:w-48 sm:h-48 md:w-52 md:h-52 mb-4 flex items-center justify-center rounded-full bg-[var(--mint1)] overflow-hidden transform transition-transform duration-300 group-hover:scale-110">
                <img src={skill.icon} alt={skill.name} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain" />
              </div>


            {/* Titre */}
            <p className="font-heading text-[var(--accent1)] text-base sm:text-lg md:text-xl mb-2 text-center">
              {skill.name}
            </p>

            {/* Overlay détails */}
            <div
              className={`
                absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-36 sm:w-44 md:w-48 bg-mustard/90 text-white p-2 sm:p-3 rounded shadow-lg text-left
                transition-opacity duration-300 ease-in-out
                ${activeIndex === index ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}
                z-50
              `}
            >
              <ul className="text-xs sm:text-sm md:text-base">
                {skill.details.map((d, i) => (
                  <li key={i}>• {d}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
