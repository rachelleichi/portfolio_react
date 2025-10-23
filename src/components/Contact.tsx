import React, { useState } from 'react'

const Contact: React.FC = () => {
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
    <section
      id="contact"
      className="relative py-16 pb-40 sm:pb-48 md:pb-60 text-[var(--mint1)] overflow-hidden"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-start px-6">
        {/* Left side - Contact Form */}
        <form
          className="space-y-6 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h3 className="text-3xl font-heading mb-2 text-[var(--accent1)]">Contact</h3>

          <input
            type="text"
            name="name"
            className="w-full p-2 border-b border-mint1 bg-transparent focus:outline-none focus:border-accent1"
            placeholder="Nom"
            required
          />

          <input
            type="email"
            name="email"
            className="w-full p-2 border-b border-mint1 bg-transparent focus:outline-none focus:border-accent1"
            placeholder="Email"
            required
          />

          <textarea
            name="message"
            className="w-full p-2 border-b border-mint1 bg-transparent focus:outline-none focus:border-accent1"
            rows={4}
            placeholder="Message"
            required
          />

          <button
            type="submit"
            className="px-14 py-3 bg-mint1 text-bg1 rounded hover:bg-mustard/70 hover:text-bg1 transition"
          >
            Envoyer
          </button>

          {status === 'success' && (
            <p className="text-green-500 mt-2">Message envoyé avec succès !</p>
          )}
          {status === 'error' && (
            <p className="text-red-500 mt-2">Erreur lors de l'envoi. Réessayez.</p>
          )}
        </form>

        {/* Right side - Contact Info */}
        <div className="flex flex-col justify-start items-center text-center relative md:translate-x-14">
          <h4 className="text-2xl font-heading text-[var(--accent1)] mb-2">Coordonnées</h4>
          <p>5 rue pierre leca, 13003 Marseille</p>
          <p>+33 744541045</p>
          <p>meflahrachel@gmail.com</p>

          <img
            src="/footer.png"
            alt="footer decoration"
            className="mt-6 w-32 sm:w-44 md:w-60 lg:w-72 opacity-80 pointer-events-none select-none"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
