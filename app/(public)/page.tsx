import Link from 'next/link'
import { ArrowRight, MapPin, Download, Heart, Plane, Camera, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Données temporaires pour le développement
const featuredArticles = [
  {
    id: '1',
    title: 'Notre road trip de 3 semaines au Japon avec bébé',
    excerpt:
      "Comment nous avons organisé notre voyage au Japon avec notre fille de 18 mois.",
    slug: 'road-trip-japon-avec-bebe',
    category: 'Asie',
    emoji: '🇯🇵',
  },
  {
    id: '2',
    title: 'Nos 10 indispensables pour voyager avec un enfant',
    excerpt:
      "La liste de tout ce qu'on emmène toujours avec nous en voyage.",
    slug: 'indispensables-voyage-enfant',
    category: 'Conseils',
    emoji: '🎒',
  },
  {
    id: '3',
    title: 'Week-end en Provence : nos meilleures adresses',
    excerpt:
      'Un week-end en famille dans le Luberon avec les meilleures adresses.',
    slug: 'weekend-provence-famille',
    category: 'France',
    emoji: '🌻',
  },
]

const categories = [
  { name: 'France', count: 12, emoji: '🇫🇷', color: 'from-blue-500 to-red-500' },
  { name: 'Europe', count: 24, emoji: '🌍', color: 'from-emerald-500 to-teal-500' },
  { name: 'Asie', count: 8, emoji: '🌸', color: 'from-pink-500 to-rose-500' },
  { name: 'Conseils', count: 18, emoji: '💡', color: 'from-amber-500 to-orange-500' },
]

const stats = [
  { value: '15+', label: 'Pays visités', icon: MapPin },
  { value: '50+', label: 'Aventures', icon: Plane },
  { value: '2', label: 'Petits explorateurs', icon: Heart },
]

export default function HomePage() {
  return (
    <main>
      {/* Hero Section - Full width, centered */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-beige-100 via-beige-50 to-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-terracotta-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-terracotta-100/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-8">
            <span className="text-2xl">✈️</span>
            <span className="text-sm font-medium text-brown-700">Blog voyage en famille</span>
          </div>

          {/* Main title */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-brown-900 mb-6 leading-[1.1]">
            It&apos;s Good To Be
            <span className="block text-terracotta-500 mt-2">Goodi</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-brown-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            On partage nos aventures, nos galères et nos bons plans pour vous aider à
            <span className="text-terracotta-600 font-medium"> voyager sereinement en famille</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/blog" className="group">
                Découvrir nos aventures
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/a-propos">
                Qui sommes-nous ?
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-8 border-t border-beige-200">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="h-5 w-5 text-terracotta-500" />
                  <span className="font-serif text-3xl md:text-4xl font-bold text-brown-900">
                    {stat.value}
                  </span>
                </div>
                <span className="text-sm text-brown-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block text-4xl mb-4">📖</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brown-900 mb-4">
              Nos dernières aventures
            </h2>
            <p className="text-brown-600 max-w-xl mx-auto">
              Récits de voyage, conseils pratiques et bonnes adresses testées en famille
            </p>
          </div>

          {/* Articles grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-beige-50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-beige-200 to-beige-100 flex items-center justify-center">
                  <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                    {article.emoji}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-terracotta-100 text-terracotta-700 text-xs font-semibold rounded-full mb-3">
                    {article.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-brown-900 mb-2 group-hover:text-terracotta-600 transition-colors line-clamp-2">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-brown-600 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 text-terracotta-600 font-medium text-sm hover:gap-2 transition-all"
                  >
                    Lire l&apos;article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* View all link */}
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/blog">
                Voir tous les articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28 bg-beige-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-4xl mb-4">🗺️</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brown-900 mb-4">
              Explorez par destination
            </h2>
            <p className="text-brown-600 max-w-xl mx-auto">
              Trouvez l&apos;inspiration pour votre prochaine aventure en famille
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/blog?category=${category.name.toLowerCase()}`}
                className="group relative bg-white rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <span className="text-4xl md:text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-bold text-brown-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-brown-500">
                  {category.count} articles
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-terracotta-500 via-terracotta-500 to-terracotta-600 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-5xl mb-6">🎁</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
            Nos ressources gratuites
          </h2>
          <p className="text-xl text-terracotta-100 mb-10 max-w-2xl mx-auto">
            Checklists, plannings, budgets... Téléchargez tous nos outils pour organiser
            vos voyages en famille comme des pros !
          </p>

          {/* Resource cards preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {['Checklist valise', 'Planning voyage', 'Budget type', 'Carnet de route'].map((item) => (
              <div
                key={item}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20"
              >
                <Download className="h-6 w-6 mx-auto mb-2 opacity-75" />
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-terracotta-600 hover:bg-beige-100 shadow-lg"
            asChild
          >
            <Link href="/ressources">
              <Download className="h-5 w-5" />
              Accéder aux ressources
            </Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-beige-100 to-beige-50 rounded-[2rem] p-8 md:p-12 lg:p-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Photo placeholder */}
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-beige-200 to-beige-100 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <Camera className="h-16 w-16 mx-auto mb-4 text-beige-400" />
                    <p className="text-beige-500 font-medium">Notre photo de famille</p>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-terracotta-200 rounded-xl -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-sage-200 rounded-full -z-10" />
              </div>

              {/* Text */}
              <div className="text-center md:text-left">
                <span className="inline-block text-3xl mb-4">👋</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brown-900 mb-6">
                  Enchanté, moi c&apos;est Laure !
                </h2>
                <p className="text-brown-600 mb-4 leading-relaxed">
                  Avec mon mari et nos deux enfants, on sillonne le monde dès qu&apos;on peut.
                  Ce blog, c&apos;est notre carnet de voyage familial.
                </p>
                <p className="text-brown-600 mb-8 leading-relaxed">
                  On y partage nos aventures, nos galères, nos bons plans et tout ce qu&apos;on a
                  appris en voyageant avec des enfants. Notre mission ? Vous prouver que
                  <span className="text-terracotta-600 font-medium"> voyager en famille, c&apos;est possible et c&apos;est génial !</span>
                </p>
                <Button asChild>
                  <Link href="/a-propos">
                    Notre histoire
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Teaser Section */}
      <section className="py-20 md:py-28 bg-beige-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-4xl mb-4">📍</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brown-900 mb-4">
              Nos voyages sur la carte
            </h2>
            <p className="text-brown-600 max-w-xl mx-auto">
              Explorez tous les endroits qu&apos;on a visités et trouvez l&apos;inspiration pour votre prochain voyage
            </p>
          </div>

          {/* Map placeholder */}
          <div className="aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-sage-100 to-sage-50 rounded-3xl border-2 border-dashed border-sage-300 flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-sage-400" />
              <p className="text-sage-600 font-serif text-xl font-medium mb-2">
                Carte interactive
              </p>
              <p className="text-sage-500 text-sm max-w-md mx-auto">
                Bientôt disponible : explorez tous nos voyages et cliquez sur chaque destination pour découvrir nos articles
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
