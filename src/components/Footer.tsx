import React from 'react'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <footer className="py-12 text-center text-sm text-[var(--bg1)] bg-[var(--accent1)]">
      <div className="container flex flex-col items-center gap-4">

        <div className="flex items-center gap-6">
          <span className="text-[var(--bg1)]">Retrouve-moi sur :</span>

          <a
            href="https://www.linkedin.com/in/rachel-meflah/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0e76a8] hover:text-[#084a7a] transition text-2xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.instagram.com/rachelmeflah/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E1306C] hover:text-[#9f0e4b] transition text-2xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
        <p className="text-[var(--bg1)]">© {new Date().getFullYear()} Rachel Meflah</p>
      </div>
    </footer>
  )
}

export default Footer
