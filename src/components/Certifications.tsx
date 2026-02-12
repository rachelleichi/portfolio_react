import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const certifications = [
  { name: 'CCNA1', img: '/ccna1.png' },
  { name: 'CCNA2', img: '/ccna2.png' },
  { name: 'CCNA3', img: '/ccna3.png' },
  { name: 'CCNP', img: '/ccnp.png' },
  { name: 'CSNA', img: '/csna.png' },
  { name: 'CSNE', img: '/csne.png' },
]

const Certifications: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div id="certifications" className="py-20 bg-white/5">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl md:text-5xl font-heading text-[var(--bg1)] text-center mb-16 font-bold uppercase tracking-tighter">
          {t('certifications.title')}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {certifications.map((cert, index) => (
            <motion.div key={index} whileHover={{ y: -5 }} className="group flex flex-col items-center">
              {/* FIXED: Using cert-lens with padding and cert-icon-img */}
              <div className="cert-lens group-hover:border-mustard/40">
                  <img
                    src={cert.img}
                    alt={cert.name}
                    className="cert-icon-img filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
                  />
              </div>
              <p className="mt-4 font-mono text-[11px] font-bold text-[var(--bg1)] tracking-widest bg-white/10 px-3 py-1 rounded-full uppercase text-center">
                {cert.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Certifications