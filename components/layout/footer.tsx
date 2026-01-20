import Link from 'next/link'
import { Instagram, Mail, Heart, Send } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'

export function Footer() {
  return (
    <footer className="bg-brown-900 text-beige-100">
      {/* Newsletter section */}
      <div className="border-b border-brown-800">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-4xl mb-4 block">💌</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Rejoignez l&apos;aventure
            </h3>
            <p className="text-beige-300 mb-8">
              Recevez nos derniers articles et bons plans voyage directement dans votre boîte mail.
              <span className="block text-sm mt-1 text-beige-400">Une newsletter mensuelle, sans spam.</span>
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-5 py-3.5 rounded-full bg-brown-800/50 border border-brown-700 text-white placeholder-beige-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-terracotta-500 text-white rounded-full font-medium hover:bg-terracotta-600 transition-all hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Send className="h-4 w-4" />
                S&apos;inscrire
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand - takes more space */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-xl font-bold text-white">
                It&apos;s Good To Be{' '}
                <span className="text-terracotta-400">Goodi</span>
              </span>
            </Link>
            <p className="text-beige-300 mb-6 leading-relaxed">
              Un blog de voyage familial sincère et utile. On partage nos aventures,
              nos galères, nos bons plans et tout ce qu&apos;on a appris en voyageant
              avec nos enfants.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://instagram.com/${siteConfig.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-brown-800 rounded-full hover:bg-terracotta-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-3 bg-brown-800 rounded-full hover:bg-terracotta-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-lg font-bold text-white mb-5">Explorer</h4>
            <ul className="space-y-3">
              {siteConfig.nav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-beige-300 hover:text-terracotta-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-lg font-bold text-white mb-5">
              Informations
            </h4>
            <ul className="space-y-3">
              {siteConfig.footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-beige-300 hover:text-terracotta-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brown-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-beige-400">
            <p>
              © {new Date().getFullYear()} It&apos;s Good To Be Goodi. Tous droits réservés.
            </p>
            <p className="flex items-center gap-1.5">
              Fait avec <Heart className="h-4 w-4 text-terracotta-400 fill-terracotta-400" /> par une famille de voyageurs
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
