'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-beige-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-lg md:text-xl font-bold text-brown-900 tracking-tight">
              It&apos;s Good To Be{' '}
              <span className="text-terracotta-500 group-hover:text-terracotta-600 transition-colors">
                Goodi
              </span>
            </span>
          </Link>

          {/* Navigation desktop - centered */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-brown-600 hover:text-terracotta-600 hover:bg-terracotta-50 rounded-full transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search button */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Rechercher"
              className="text-brown-600 hover:text-terracotta-600 hover:bg-terracotta-50"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Account button (desktop) */}
            <div className="hidden md:block">
              <Button variant="primary" size="sm">
                <User className="h-4 w-4" />
                <span>Espace membre</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-brown-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-beige-100',
          isMenuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 py-6 space-y-2">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-brown-700 hover:text-terracotta-600 hover:bg-terracotta-50 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-beige-200">
            <Button variant="primary" className="w-full" asChild>
              <Link href="/connexion" onClick={() => setIsMenuOpen(false)}>
                <User className="h-4 w-4" />
                Espace membre
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
