import React from 'react'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Footer: React.FC = () => {
  const { t } = useTranslation()
  return (
    // Changed bg to match the dark theme and text to a light accent for visibility
    <footer className="py-12 text-center text-sm text-[var(--bg1)] bg-[var(--accent1)]">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <span className="text-[var(--bg1)] opacity-80">{t('footer.followMe')} :</span>

          <a
            href="https://www.linkedin.com/in/rachel-meflah/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--bg1)] hover:text-mustard transition text-2xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.instagram.com/rachelmeflah/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--bg1)] hover:text-mustard transition text-2xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
        <p className="text-[var(--bg1)] opacity-60">
          © {new Date().getFullYear()} Rachel Meflah · {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}

export default Footer