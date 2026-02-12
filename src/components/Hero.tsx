import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const Hero: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation()
  const links = [
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.about'), href: '#àpropos' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.contact'), href: '#contact' }
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-cover bg-center flex flex-col justify-center text-[var(--accent1)]"
      style={{ backgroundImage: "url('/alg1.jpg')" }}
    >
      {/* --- COMPACT SOLID NAVBAR --- */}
      <header className="fixed top-0 left-0 w-full py-4 px-6 md:px-16 z-50 bg-[var(--bg1)] border-b border-white/10 shadow-lg">
        <div className="flex items-center justify-between container mx-auto">
          
          {/* Desktop Menu - Shifted to the left */}
          <nav className="hidden md:flex items-center gap-10 text-base font-semibold text-[var(--accent1)]">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="relative hover:text-[var(--mustard)] transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--mustard)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 scale-90">
            <LanguageSwitcher />
            
            {/* Mobile Toggle visible on right for small screens */}
            <button
              className="md:hidden text-[var(--accent1)] text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-64 bg-[var(--bg1)] z-50 shadow-2xl flex flex-col p-8 gap-6 border-l border-white/10"
          >
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-[var(--accent1)] text-lg font-heading font-bold hover:text-[var(--mustard)] transition uppercase"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-auto pt-6 border-t border-white/10">
              <LanguageSwitcher />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* --- Hero Content - Left Aligned --- */}
      <div className="relative z-10 container mx-auto flex justify-start items-center h-full px-6 md:px-16 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="uppercase text-xs text-[var(--accent1)] mb-2 tracking-widest">{t('hero.welcome')}</p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6 uppercase tracking-tighter">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--mint1)] mb-8 max-w-lg leading-relaxed">{t('hero.subtitle')}</p>
          <a href="#contact">
            <button className="px-8 py-3 bg-[var(--mint1)] text-[var(--bg1)] font-heading font-bold uppercase tracking-widest hover:bg-[var(--mustard)] transition-all duration-500 rounded-lg">
              {t('hero.cta')}
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero