import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "It's Good To Be Goodi - Blog voyage en famille",
    template: "%s | It's Good To Be Goodi",
  },
  description:
    'Découvrez nos aventures en famille à travers le monde. Conseils pratiques, itinéraires, bonnes adresses et astuces pour voyager sereinement avec des enfants.',
  keywords: [
    'voyage en famille',
    'voyager avec enfants',
    'blog voyage',
    'conseils voyage',
    'itinéraires famille',
    'vacances en famille',
  ],
  authors: [{ name: 'Laure' }],
  creator: "It's Good To Be Goodi",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://itsgoodtobegoodi.com',
    siteName: "It's Good To Be Goodi",
    title: "It's Good To Be Goodi - Blog voyage en famille",
    description:
      'Découvrez nos aventures en famille à travers le monde.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-beige-50 antialiased">
        {children}
      </body>
    </html>
  )
}
