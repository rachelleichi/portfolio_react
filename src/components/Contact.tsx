import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Contact: React.FC = () => {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/mvgwepjg', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-28 pb-40 text-[var(--mint1)] overflow-hidden bg-bg1">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center px-6 max-w-6xl">
        
        {/* Left side - Restored Contact Form */}
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <h3 className="text-4xl font-heading mb-6 text-[var(--accent1)] font-bold uppercase tracking-tighter">
            {t('contact.title')}
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              className="w-full p-3 bg-transparent border-b border-mint1 focus:outline-none focus:border-accent1 transition-colors text-white"
              placeholder={t('contact.name')}
              required
            />

            <input
              type="email"
              name="email"
              className="w-full p-3 bg-transparent border-b border-mint1 focus:outline-none focus:border-accent1 transition-colors text-white"
              placeholder={t('contact.email')}
              required
            />

            <textarea
              name="message"
              className="w-full p-3 bg-transparent border-b border-mint1 focus:outline-none focus:border-accent1 transition-colors text-white"
              rows={4}
              placeholder={t('contact.message')}
              required
            />
          </div>

          <button
            type="submit"
            className="px-14 py-3 bg-mint1 text-bg1 rounded-lg font-bold uppercase tracking-widest hover:bg-mustard transition shadow-lg"
          >
            {t('contact.send')}
          </button>

          {status === 'success' && <p className="text-green-500 mt-4">{t('contact.success')}</p>}
          {status === 'error' && <p className="text-red-500 mt-4">{t('contact.error')}</p>}
        </form>

        {/* Right side - Restored Info Layout */}
        <div className="flex flex-col justify-start items-center text-center relative md:translate-x-14 space-y-6">
          <div>
            <h4 className="text-2xl font-heading text-[var(--accent1)] mb-2 uppercase font-bold tracking-tight">Coordonnées</h4>
            <div className="space-y-2 text-lg">
              <p>5 rue pierre leca, 13003 Marseille</p>
              <p>+33 7 44 54 10 45</p>
              <p className="text-mustard font-semibold">meflahrachel@gmail.com</p>
            </div>
          </div>
          
          {/* FIXED: Removed border-t and pt-8 classes to remove the line */}
          <div className="w-full max-w-xs mx-auto">
             <div className="flex items-center justify-center gap-2">
               {/* Content for system status or other info can go here */}
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact