import React from 'react'
import { useTranslation } from 'react-i18next'
import { clearCache } from '../services/dataService'

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en'
    clearCache()
    i18n.changeLanguage(newLang)
    // Reload page after language change for smooth transition
    window.location.reload()
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 border-2 border-accent1 rounded text-accent1 hover:bg-accent1 hover:text-bg1 transition font-semibold text-sm"
      aria-label="Toggle language"
    >
      {i18n.language === 'en' ? 'FR' : 'EN'}
    </button>
  )
}

export default LanguageSwitcher
