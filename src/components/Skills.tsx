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
    <section id="compétences" className="w-full py-16 flex flex-col items-center justify-center">
      {/* Title */}
      <h3 className="text-5xl font-heading text-[var(--mint1)] mb-6 text-center">Compétences</h3>

      {/* Grid icons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 justify-items-center">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="relative flex flex-col items-center group cursor-pointer"
            onClick={() => handleClick(index)}
          >
            {/* Cercle avec icône */}
            <div className="skill-icon mb-4 transform transition-transform duration-300 group-hover:scale-110">
              <img src={skill.icon} alt={skill.name} />
            </div>

            {/* Titre */}
            <p className="font-heading text-[var(--accent1)] text-lg md:text-xl mb-2">{skill.name}</p>


            {/* Overlay détails */}
            <div
              className={`
                absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-44 md:w-48 bg-mustard/90 text-white p-3 rounded shadow-lg text-left
                transition-opacity duration-300 ease-in-out
                ${activeIndex === index ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}
                z-50
              `}
            >
              <ul className="text-sm md:text-base">
                {skill.details.map((d, i) => (
                  <li key={i}> . {d}</li>
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
