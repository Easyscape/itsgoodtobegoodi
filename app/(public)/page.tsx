import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Download, Users, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Données temporaires pour le développement
const featuredArticles = [
  {
    id: '1',
    title: 'Notre road trip de 3 semaines au Japon avec bébé',
    excerpt:
      "Comment nous avons organisé notre voyage au Japon avec notre fille de 18 mois. Itinéraire, budget, conseils pratiques et coups de cœur.",
    slug: 'road-trip-japon-avec-bebe',
    cover_image: '/images/placeholder-japan.jpg',
    category: 'Asie',
    published_at: '2026-01-15',
  },
  {
    id: '2',
    title: 'Nos 10 indispensables pour voyager avec un enfant',
    excerpt:
      "La liste de tout ce qu'on emmène toujours avec nous en voyage. Testée et approuvée après des dizaines de voyages !",
    slug: 'indispensables-voyage-enfant',
    cover_image: '/images/placeholder-packing.jpg',
    category: 'Conseils',
    published_at: '2026-01-10',
  },
  {
    id: '3',
    title: 'Week-end en Provence : nos meilleures adresses',
    excerpt:
      'Un week-end en famille dans le Luberon. Hébergements, restaurants kids-friendly et activités pour petits et grands.',
    slug: 'weekend-provence-famille',
    cover_image: '/images/placeholder-provence.jpg',
    category: 'France',
    published_at: '2026-01-05',
  },
]

const categories = [
  { name: 'France', count: 12, icon: '🇫🇷' },
  { name: 'Europe', count: 24, icon: '🌍' },
  { name: 'Asie', count: 8, icon: '🌏' },
  { name: 'Conseils', count: 18, icon: '💡' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-beige-100 to-beige-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-terracotta-100 text-terracotta-700 rounded-full text-sm font-medium mb-6">
                Blog voyage en famille
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-brown-900 mb-6 leading-tight">
                Voyagez en famille,{' '}
                <span className="text-terracotta-500">créez des souvenirs</span>
              </h1>
              <p className="text-lg md:text-xl text-brown-600 mb-8 max-w-xl mx-auto lg:mx-0">
                On partage nos aventures, nos galères et nos bons plans pour vous
                aider à voyager sereinement avec vos enfants. Bienvenue dans notre
                famille !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild>
                  <Link href="/blog">
                    Découvrir le blog
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/a-propos">Qui sommes-nous ?</Link>
                </Button>
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-beige-200 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center text-beige-400">
                  <div className="text-center p-8">
                    <Plane className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Photo de famille en voyage</p>
                    <p className="text-sm opacity-75">À ajouter par Laure</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-terracotta-200 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-sage-200 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-beige-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: MapPin, value: '15+', label: 'Pays visités' },
              { icon: Plane, value: '50+', label: 'Voyages' },
              { icon: Download, value: '20+', label: 'Ressources gratuites' },
              { icon: Users, value: '2', label: 'Enfants voyageurs' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-terracotta-100 rounded-xl mb-3">
                  <stat.icon className="h-6 w-6 text-terracotta-600" />
                </div>
                <div className="font-serif text-3xl font-bold text-brown-900">
                  {stat.value}
                </div>
                <div className="text-sm text-brown-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content: Map + Articles (layout équilibré 50/50) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Carte interactive placeholder */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brown-900 mb-6">
              Nos voyages sur la carte
            </h2>
            <div className="aspect-[4/3] bg-beige-100 rounded-2xl border-2 border-dashed border-beige-300 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-terracotta-400" />
                <p className="text-brown-600 font-medium mb-2">
                  Carte interactive Mapbox
                </p>
                <p className="text-sm text-brown-500">
                  Cliquez sur un voyage pour découvrir nos articles
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-brown-500 text-center">
              Bientôt disponible : explorez tous nos voyages sur une carte interactive
            </p>
          </div>

          {/* Derniers articles */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-brown-900">
                Derniers articles
              </h2>
              <Link
                href="/blog"
                className="text-terracotta-600 hover:text-terracotta-700 font-medium flex items-center gap-1"
              >
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-6">
              {featuredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image placeholder */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-beige-200">
                    <div className="absolute inset-0 flex items-center justify-center text-beige-400 text-xs">
                      Photo
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-terracotta-600 uppercase tracking-wide">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-brown-900 group-hover:text-terracotta-600 transition-colors line-clamp-2 mt-1">
                      <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-sm text-brown-600 line-clamp-2 mt-1 hidden md:block">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brown-900 mb-4">
              Explorer par thématique
            </h2>
            <p className="text-brown-600 max-w-2xl mx-auto">
              Retrouvez facilement les articles qui vous intéressent selon vos envies
              de voyage
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/blog?category=${category.name.toLowerCase()}`}
                className="group p-6 bg-beige-50 rounded-2xl hover:bg-terracotta-50 transition-colors text-center"
              >
                <span className="text-4xl mb-3 block">{category.icon}</span>
                <h3 className="font-serif text-lg font-bold text-brown-900 group-hover:text-terracotta-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-brown-500 mt-1">
                  {category.count} articles
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Ressources */}
      <section className="bg-gradient-to-br from-terracotta-500 to-terracotta-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Nos ressources gratuites
              </h2>
              <p className="text-terracotta-100 mb-6">
                Checklists, plannings, budgets... Téléchargez tous nos outils pour
                organiser vos voyages en famille comme des pros !
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-terracotta-600 hover:bg-beige-100"
                asChild
              >
                <Link href="/ressources">
                  <Download className="h-5 w-5" />
                  Voir les ressources
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Checklist valise enfant',
                'Planning voyage',
                'Budget type',
                'Carnet de voyage',
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white/10 backdrop-blur rounded-xl p-4 text-white"
                >
                  <Download className="h-8 w-8 mb-2 opacity-75" />
                  <p className="font-medium text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-beige-100 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Photo placeholder */}
            <div className="aspect-square max-w-sm mx-auto md:mx-0 rounded-2xl bg-beige-200 flex items-center justify-center">
              <div className="text-center p-8 text-beige-400">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Photo de famille</p>
              </div>
            </div>
            {/* Text */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-brown-900 mb-4">
                Qui sommes-nous ?
              </h2>
              <p className="text-brown-600 mb-4">
                Salut ! Moi c&apos;est Laure, et avec mon mari et nos deux enfants, on
                sillonne le monde dès qu&apos;on peut. Ce blog, c&apos;est notre
                carnet de voyage familial.
              </p>
              <p className="text-brown-600 mb-6">
                On y partage nos aventures, nos galères, nos bons plans et tout ce
                qu&apos;on a appris en voyageant avec des enfants. Notre objectif ?
                Vous montrer que voyager en famille, c&apos;est possible et
                c&apos;est génial !
              </p>
              <Button asChild>
                <Link href="/a-propos">
                  En savoir plus
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
