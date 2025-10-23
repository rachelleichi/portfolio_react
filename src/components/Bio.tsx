import React from 'react'

const Bio: React.FC = () => {
  return (
    <section id="àpropos" className="py-20 mb-12">
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left Flip Image */}
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <div className="relative w-72 h-72 perspective">
            <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180">
              {/* Front Side */}
              <img
                src="/bio_bg.png"
                alt="Front Bio Illustration"
                className="absolute w-full h-full object-cover rounded-2xl shadow-lg backface-hidden"
              />
              {/* Back Side */}
              <img
                src="/bio.png"
                alt="Back Bio Illustration"
                className="absolute w-full h-full object-cover rounded-2xl shadow-lg rotate-y-180 backface-hidden"
              />
            </div>
          </div>
        </div>

        {/* Right Text */}
        <div className="md:w-1/2">
          <h3 className="text-5xl font-heading text-accent1 mb-6 font-bold">
            Bio
          </h3>
          <p className="text-cream1 leading-relaxed text-lg mb-6">
            I'm Rachel Meflah, a curious mind drawn to the hidden layers of technology.
            From code to circuits, I love exploring how systems think — and how to make
            them stronger, smarter, and more humane.
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border-2 border-accent1 text-accent1 rounded-lg font-semibold text-lg hover:bg-accent1 hover:text-bg1 transition"
          >
            Télécharger mon CV
          </a>
        </div>
      </div>
    </section>
  )
}

export default Bio
