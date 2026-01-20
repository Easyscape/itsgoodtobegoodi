'use client'

import { useState } from 'react'
import { Mail, Instagram, Send, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config/site'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    // Simulate sending (in real app, would send to API)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSent(true)
    setSending(false)
    setName('')
    setEmail('')
    setMessage('')

    setTimeout(() => setSent(false), 5000)
  }

  return (
    <main className="min-h-screen bg-beige-50">
      {/* Hero */}
      <section className="bg-white py-20 md:py-28 border-b border-beige-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-5xl mb-6">💌</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brown-900 mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Une question, une suggestion, ou juste envie de papoter voyage ?
            On adore recevoir vos messages !
          </p>
        </div>
      </section>

      {/* Contact info + Form */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="md:col-span-2">
              <h2 className="font-serif text-xl font-bold text-brown-900 mb-6">
                Autres moyens de nous joindre
              </h2>

              <div className="space-y-6">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-beige-200 hover:border-terracotta-300 transition-colors"
                >
                  <div className="w-12 h-12 bg-terracotta-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-terracotta-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-brown-900">Email</h3>
                    <p className="text-sm text-brown-600">{siteConfig.email}</p>
                  </div>
                </a>

                <a
                  href={`https://instagram.com/${siteConfig.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-beige-200 hover:border-terracotta-300 transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-brown-900">Instagram</h3>
                    <p className="text-sm text-brown-600">@{siteConfig.instagram}</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 p-6 bg-sage-50 rounded-xl border border-sage-200">
                <h3 className="font-medium text-sage-800 mb-2">Temps de réponse</h3>
                <p className="text-sm text-sage-700">
                  On essaie de répondre sous 48h, mais entre les voyages et les enfants,
                  ça peut parfois prendre un peu plus de temps. Promis, on vous répond toujours !
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-beige-200">
                <h2 className="font-serif text-xl font-bold text-brown-900 mb-6">
                  Envoyez-nous un message
                </h2>

                {sent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-sage-600" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-brown-900 mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-brown-600">
                      Merci pour votre message. On vous répond très vite !
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brown-700 mb-2">
                        Votre nom
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-brown-900 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
                        placeholder="Marie Dupont"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brown-700 mb-2">
                        Votre email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-brown-900 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
                        placeholder="marie@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-brown-700 mb-2">
                        Votre message
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-brown-900 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent resize-none"
                        placeholder="Bonjour ! J'aimerais savoir..."
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={sending}>
                      {sending ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
