import Link from 'next/link'
import {
  FileText,
  Eye,
  MessageSquare,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Stats temporaires pour le développement
const stats = [
  {
    name: 'Articles publiés',
    value: '24',
    change: '+3 ce mois',
    icon: FileText,
    color: 'bg-terracotta-100 text-terracotta-600',
  },
  {
    name: 'Vues ce mois',
    value: '1,234',
    change: '+12%',
    icon: Eye,
    color: 'bg-sage-100 text-sage-600',
  },
  {
    name: 'Commentaires',
    value: '89',
    change: '5 en attente',
    icon: MessageSquare,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Abonnés newsletter',
    value: '456',
    change: '+23 ce mois',
    icon: Users,
    color: 'bg-purple-100 text-purple-600',
  },
]

const recentArticles = [
  {
    id: '1',
    title: 'Notre road trip au Japon avec bébé',
    status: 'published',
    views: 234,
    date: '15 jan 2026',
  },
  {
    id: '2',
    title: 'Les 10 indispensables pour voyager avec un enfant',
    status: 'published',
    views: 189,
    date: '10 jan 2026',
  },
  {
    id: '3',
    title: 'Week-end en Provence : nos meilleures adresses',
    status: 'draft',
    views: 0,
    date: '8 jan 2026',
  },
]

const pendingComments = [
  {
    id: '1',
    author: 'Marie D.',
    article: 'Notre road trip au Japon',
    excerpt: 'Super article ! On prévoit le même voyage...',
    date: 'Il y a 2h',
  },
  {
    id: '2',
    author: 'Pierre L.',
    article: 'Les 10 indispensables',
    excerpt: "Merci pour ces conseils, j'ajouterais aussi...",
    date: 'Il y a 5h',
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-brown-900">
            Bienvenue, Laure !
          </h1>
          <p className="text-brown-600 mt-1">
            Voici un aperçu de votre blog aujourd&apos;hui.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/nouveau">
            <Plus className="h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-2xl p-6 shadow-sm border border-beige-200"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-xs text-sage-600 font-medium flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-brown-900">{stat.value}</p>
              <p className="text-sm text-brown-500 mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent articles */}
        <div className="bg-white rounded-2xl shadow-sm border border-beige-200">
          <div className="p-6 border-b border-beige-200 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-brown-900">
              Articles récents
            </h2>
            <Link
              href="/admin/articles"
              className="text-sm text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1"
            >
              Voir tout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-beige-100">
            {recentArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 hover:bg-beige-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-brown-900 truncate">
                      {article.title}
                    </h3>
                    <p className="text-sm text-brown-500 mt-1">
                      {article.date} • {article.views} vues
                    </p>
                  </div>
                  <span
                    className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                      article.status === 'published'
                        ? 'bg-sage-100 text-sage-700'
                        : 'bg-beige-200 text-brown-600'
                    }`}
                  >
                    {article.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending comments */}
        <div className="bg-white rounded-2xl shadow-sm border border-beige-200">
          <div className="p-6 border-b border-beige-200 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-brown-900">
              Commentaires récents
            </h2>
            <Link
              href="/admin/commentaires"
              className="text-sm text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1"
            >
              Voir tout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-beige-100">
            {pendingComments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 hover:bg-beige-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-terracotta-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-terracotta-700">
                      {comment.author.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-brown-900">
                        {comment.author}
                      </span>
                      <span className="text-xs text-brown-400">{comment.date}</span>
                    </div>
                    <p className="text-sm text-brown-500 mt-0.5">
                      sur &quot;{comment.article}&quot;
                    </p>
                    <p className="text-sm text-brown-600 mt-1 line-clamp-1">
                      {comment.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-2xl p-8 text-white">
        <h2 className="font-serif text-xl font-bold mb-2">Actions rapides</h2>
        <p className="text-terracotta-100 mb-6">
          Que voulez-vous faire aujourd&apos;hui ?
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            className="bg-white text-terracotta-600 hover:bg-beige-100"
            asChild
          >
            <Link href="/admin/articles/nouveau">
              <Plus className="h-4 w-4" />
              Nouvel article
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30 border-white/30"
            asChild
          >
            <Link href="/admin/voyages/nouveau">Ajouter un voyage</Link>
          </Button>
          <Button
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30 border-white/30"
            asChild
          >
            <Link href="/admin/ressources/nouveau">Uploader une ressource</Link>
          </Button>
          <Button
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30 border-white/30"
            asChild
          >
            <Link href="/admin/newsletter">Envoyer la newsletter</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
