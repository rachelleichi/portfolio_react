import React from 'react'

const certifications = [
  { name: 'CCNA1', img: '/ccna1.png' },
  { name: 'CCNA2', img: '/ccna2.png' },
  { name: 'CCNA3', img: '/ccna3.png' },
  { name: 'CCNP', img: '/ccnp.png' },
  { name: 'CSNA', img: '/csna.png' },
  { name: 'CSNE', img: '/csne.png' },
]

const Certifications: React.FC = () => {
  return (
    <div id="certifications" className="py-12 mb-12">
      <h3 className="text-4xl sm:text-4xl md:text-5xl font-heading text-[var(--bg1)] text-center mb-10">
        Certifications
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-110"
          >
            <div className="w-40 h-32 rounded-full overflow-hidden mb-4">
              <img
                src={cert.img}
                alt={cert.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[var(--bg1)] font-heading text-lg text-center">{cert.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Certifications
