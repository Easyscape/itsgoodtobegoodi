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
    <header className="sticky top-0 z-50 bg-beige-50/95 backdrop-blur-sm border-b border-beige-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-bold text-brown-900">
              It&apos;s Good To Be{' '}
              <span className="text-terracotta-500">Goody</span>
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-brown-700 hover:text-terracotta-600 hover:bg-beige-100 rounded-full transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <Button variant="ghost" size="icon" aria-label="Rechercher">
              <Search className="h-5 w-5" />
            </Button>

            {/* Account button (desktop) */}
            <div className="hidden md:block">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4" />
                <span>Connexion</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-96 border-t border-beige-200' : 'max-h-0'
        )}
      >
        <nav className="px-4 py-4 space-y-1 bg-beige-50">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-brown-700 hover:text-terracotta-600 hover:bg-beige-100 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-beige-200">
            <Button variant="primary" className="w-full">
              <User className="h-4 w-4" />
              Connexion
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
