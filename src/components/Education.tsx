import React from 'react'
import { motion } from 'framer-motion'

interface EducationItem {
  degree: string
  school: string
}

const educationData: EducationItem[] = [
  { degree: "Bac spécialité math - physique", school: "Lycée Kadi Merbah, Alger" },
  { degree: "Licence informatique", school: "Université Avignon" },
  { degree: "Bachelor R&T option cybersécurité", school: "IUT AMU, Marseille" },
]

// Reverse to start from bottom
const reversedData = [...educationData].reverse()

const Education: React.FC = () => {
  return (
    <div id="education" className="relative py-12 mb-12 w-full max-w-4xl mx-auto">
      {/* Section title on the left */}
      <h2 className="text-4xl sm:text-5xl font-heading text-[var(--accent1)] mb-10 pl-6 md:pl-20 lg:-ml-32 xl:-ml-48">
        Education
      </h2>



      

      {/* Vertical line in center */}
      <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-mustard/50 -translate-x-1/2 rounded"></div>

      {reversedData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.4, duration: 0.6 }}
          className="relative w-full mb-12"
        >
          {/* Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-mustard rounded-full z-10"></div>

          {/* Text on the right side with gap */}
          <div
            className="ml-[calc(50%+12px)] w-1/2 text-left 
                      sm:ml-[calc(50%+16px)] 
                      px-4 sm:px-6"
          >
            <h4 className="font-heading text-xl text-[var(--accent1)] mb-1">{item.degree}</h4>
            <p className="text-[var(--mint1)]">{item.school}</p>
          </div>

        </motion.div>
      ))}
    </div>
  )
}

export default Education
