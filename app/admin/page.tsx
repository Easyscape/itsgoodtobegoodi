import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  FileText,
  Eye,
  MessageSquare,
  Users,
  Plus,
  ArrowRight,
  Download,
  Map,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch stats
  const [
    { count: articlesCount },
    { count: publishedCount },
    { count: commentsCount },
    { count: pendingCommentsCount },
    { count: subscribersCount },
    { count: resourcesCount },
    { count: tripsCount },
  ] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('comments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('resources').select('*', { count: 'exact', head: true }),
    supabase.from('trips').select('*', { count: 'exact', head: true }),
  ])

  // Fetch recent articles
  const { data: recentArticles } = await supabase
    .from('articles')
    .select('id, title, status, view_count, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  // Fetch pending comments
  const { data: pendingComments } = await supabase
    .from('comments')
    .select('id, author_name, author_email, content, created_at, article_id')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    {
      name: 'Articles publiés',
      value: publishedCount || 0,
      total: articlesCount || 0,
      icon: FileText,
      color: 'bg-terracotta-100 text-terracotta-600',
      href: '/admin/articles',
    },
    {
      name: 'Commentaires',
      value: commentsCount || 0,
      pending: pendingCommentsCount || 0,
      icon: MessageSquare,
      color: 'bg-blue-100 text-blue-600',
      href: '/admin/commentaires',
    },
    {
      name: 'Abonnés newsletter',
      value: subscribersCount || 0,
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      href: '/admin/newsletter',
    },
    {
      name: 'Ressources',
      value: resourcesCount || 0,
      icon: Download,
      color: 'bg-sage-100 text-sage-600',
      href: '/admin/ressources',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-brown-900">
            Tableau de bord
          </h1>
          <p className="text-brown-600 mt-1">
            Bienvenue dans votre espace d&apos;administration
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
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-beige-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              {stat.pending !== undefined && stat.pending > 0 && (
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                  {stat.pending} en attente
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-brown-900">{stat.value}</p>
              <p className="text-sm text-brown-500 mt-1">{stat.name}</p>
            </div>
          </Link>
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
          {recentArticles && recentArticles.length > 0 ? (
            <div className="divide-y divide-beige-100">
              {recentArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/admin/articles/${article.id}`}
                  className="p-4 hover:bg-beige-50 transition-colors block"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-brown-900 truncate">
                        {article.title}
                      </h3>
                      <p className="text-sm text-brown-500 mt-1">
                        {new Date(article.created_at).toLocaleDateString('fr-FR')} •{' '}
                        {article.view_count || 0} vues
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
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-beige-300 mb-4" />
              <p className="text-brown-500 mb-4">Aucun article pour l&apos;instant</p>
              <Button asChild size="sm">
                <Link href="/admin/articles/nouveau">
                  <Plus className="h-4 w-4" />
                  Créer votre premier article
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Pending comments */}
        <div className="bg-white rounded-2xl shadow-sm border border-beige-200">
          <div className="p-6 border-b border-beige-200 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-brown-900">
              Commentaires en attente
            </h2>
            <Link
              href="/admin/commentaires"
              className="text-sm text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1"
            >
              Voir tout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {pendingComments && pendingComments.length > 0 ? (
            <div className="divide-y divide-beige-100">
              {pendingComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 hover:bg-beige-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-terracotta-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-terracotta-700">
                        {(comment.author_name || 'A').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-brown-900">
                          {comment.author_name || 'Anonyme'}
                        </span>
                        <span className="text-xs text-brown-400">
                          {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm text-brown-600 mt-1 line-clamp-2">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-beige-300 mb-4" />
              <p className="text-brown-500">Aucun commentaire en attente</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-2xl p-8 text-white">
        <h2 className="font-serif text-xl font-bold mb-2">Actions rapides</h2>
        <p className="text-terracotta-100 mb-6">
          Que souhaitez-vous faire ?
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
            className="bg-white/20 text-white hover:bg-white/30"
            asChild
          >
            <Link href="/admin/voyages/nouveau">
              <Map className="h-4 w-4" />
              Ajouter un voyage
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30"
            asChild
          >
            <Link href="/admin/ressources/nouveau">
              <Download className="h-4 w-4" />
              Uploader une ressource
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30"
            asChild
          >
            <Link href="/admin/parametres">
              Paramètres du site
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
