import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const Hero: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = ['Projets', 'À propos', 'Expérience', 'Compétences', 'Contact']

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-cover bg-center flex flex-col justify-center text-white"
      style={{ backgroundImage: "url('/alg1.jpg')" }}
    >
      {/* --- HEADER / MENU --- */}
      <header className="absolute top-0 left-0 w-full py-6 px-6 md:px-16 z-20">
        <div className="flex items-center justify-between">
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-lg font-semibold text-accent1">
            {links.map((link, i) => (
              <a
                key={i}
                href={`#${link.toLowerCase().replace(' ', '')}`}
                className="relative hover:text-mustard transition-colors duration-300"
              >
                {link}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-mustard transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Language Buttons */}
          {/* <div className="hidden md:flex items-center gap-4">
            <button className="px-3 py-1 border border-accent1 rounded text-accent1 hover:bg-accent1 hover:text-bg1 transition">
              FR
            </button>
            <div className="text-lg text-accent1">🇬🇧</div>
          </div> */}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-accent1 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* --- Mobile Side Drawer --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-bg1 z-30 shadow-lg flex flex-col p-6 gap-6"
          >
            {links.map((link, i) => (
              <a
                key={i}
                href={`#${link.toLowerCase().replace(' ', '')}`}
                className="text-accent1 text-xl font-semibold hover:text-mustard transition"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="flex items-center gap-4 mt-auto">
              <button className="px-3 py-1 border border-accent1 rounded text-accent1 hover:bg-accent1 hover:text-bg1 transition">
                FR
              </button>
              <div className="text-lg text-accent1">🇬🇧</div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* --- Main Hero Content --- */}
      <div className="relative z-10 container mx-auto flex justify-start items-center h-full px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg"
        >
          <p className="uppercase text-sm text-accent1 mb-2">Bienvenue</p>
          <h1 className="text-6xl font-heading font-bold leading-tight mb-4">Meflah Rachel</h1>
          <p className="text-2xl text-mint1 mb-6">Étudiante en cybersécurité</p>
          <a href="#contact">
            <button className="px-6 py-3 bg-mint1 text-bg1 rounded hover:bg-mustard/70 hover:text-bg1 transition">
              Contact
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
