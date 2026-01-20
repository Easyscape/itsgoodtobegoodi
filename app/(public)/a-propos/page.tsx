import Link from 'next/link'
import { MapPin, Plane, Heart, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'À propos',
  description: 'Découvrez notre famille de voyageurs et notre histoire',
}

export default async function AProposPage() {
  const supabase = await createClient()

  // Fetch stats from settings
  const { data: settings } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', ['stat_countries', 'stat_trips', 'stat_children', 'about_text', 'about_image'])

  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value || ''

  const stats = [
    { value: getSetting('stat_countries') || '15+', label: 'Pays visités', icon: MapPin },
    { value: getSetting('stat_trips') || '50+', label: 'Voyages', icon: Plane },
    { value: getSetting('stat_children') || '2', label: 'Enfants', icon: Heart },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-beige-100 via-beige-50 to-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-5xl mb-6">👋</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brown-900 mb-6">
            Bienvenue dans notre aventure
          </h1>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Une famille de voyageurs passionnés qui partage ses découvertes,
            ses galères et ses bons plans pour voyager sereinement avec des enfants.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-beige-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="h-6 w-6 text-terracotta-500" />
                  <span className="font-serif text-4xl font-bold text-brown-900">
                    {stat.value}
                  </span>
                </div>
                <span className="text-brown-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-beige-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-beige-200 to-beige-100 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-beige-400" />
                  <p className="text-beige-500 font-medium">Notre photo de famille</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-terracotta-200 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-sage-200 rounded-full -z-10" />
            </div>

            {/* Text */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-brown-900 mb-6">
                Notre histoire
              </h2>
              <div className="space-y-4 text-brown-600 leading-relaxed">
                <p>
                  Salut ! Moi c&apos;est <strong className="text-brown-900">Laure</strong>,
                  et avec mon mari on a attrapé le virus du voyage bien avant d&apos;avoir des enfants.
                </p>
                <p>
                  Quand notre premier bébé est arrivé, tout le monde nous a dit :
                  &quot;C&apos;est fini les voyages maintenant !&quot; On a décidé de prouver le contraire.
                </p>
                <p>
                  Depuis, on sillonne le monde en famille, des plages de Thaïlande aux temples
                  du Japon, en passant par les parcs américains. Et devinez quoi ?
                  <strong className="text-terracotta-600"> C&apos;est encore mieux qu&apos;avant !</strong>
                </p>
                <p>
                  Ce blog, c&apos;est notre carnet de voyage. On y partage tout : nos itinéraires,
                  nos bons plans, nos galères aussi (parce qu&apos;il y en a !), et tous les conseils
                  qu&apos;on aurait aimé avoir avant de partir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-4xl mb-4">💡</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brown-900 mb-4">
              Ce qu&apos;on partage ici
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🗺️',
                title: 'Itinéraires testés',
                description: 'Des parcours optimisés pour les familles, avec les étapes adaptées aux enfants.',
              },
              {
                emoji: '💰',
                title: 'Budgets réels',
                description: 'Pas de chiffres fantaisistes. On vous dit combien ça coûte vraiment.',
              },
              {
                emoji: '🎒',
                title: 'Conseils pratiques',
                description: 'Tout ce qu\'on a appris sur le terrain pour voyager sereinement.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="font-serif text-xl font-bold text-brown-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-brown-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-terracotta-500 to-terracotta-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
            Prêts pour l&apos;aventure ?
          </h2>
          <p className="text-xl text-terracotta-100 mb-8 max-w-xl mx-auto">
            Découvrez nos derniers articles et commencez à planifier votre prochain voyage en famille.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-terracotta-600 hover:bg-beige-100"
            asChild
          >
            <Link href="/blog">
              Découvrir le blog
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
