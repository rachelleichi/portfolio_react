import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="py-12 text-center text-sm text-[var(--txt-muted)]">
      <div className="container">
        <p className="text-[var(--bg1)]">© {new Date().getFullYear()} Rachel Meflah</p>
      </div>
    </footer>
  )
}

export default Footer
