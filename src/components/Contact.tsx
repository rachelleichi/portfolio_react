import React from 'react'

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative py-16 pb-40 sm:pb-48 md:pb-60 text-[var(--mint1)] overflow-hidden"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-start px-6">
        {/* Left side - Contact Form */}
        <form
          className="space-y-6 w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault()
            alert('Message envoyé (demo)')
          }}
        >
          <h3 className="text-3xl font-heading mb-2 text-[var(--accent1)]">Contact</h3>
          <input
            className="w-full p-2 border-b border-mint1 bg-transparent focus:outline-none focus:border-accent1"
            placeholder="Nom"
          />
          <input
            className="w-full p-2 border-b border-mint1 bg-transparent focus:outline-none focus:border-accent1"
            placeholder="Email"
          />
          <textarea
            className="w-full p-2 border-b border-mint1 bg-transparent focus:outline-none focus:border-accent1"
            rows={4}
            placeholder="Message"
          />
          <button
            type="submit"
            className="px-14 py-3 bg-mint1 text-bg1 rounded hover:bg-mustard/70 hover:text-bg1 transition"
          >
            Envoyer
          </button>
        </form>

        {/* Right side - Contact Info */}
        <div className="flex flex-col justify-start items-center text-center relative md:translate-x-14">
          <h4 className="text-2xl font-heading text-[var(--accent1)] mb-2">Coordonnées</h4>
          <p>12, rue Blaise Pascal, 75000 Paris</p>
          <p>01 23 45 67 89</p>
          <p>bonjour@exemple.com</p>

          {/* Footer image - centered and higher */}
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
