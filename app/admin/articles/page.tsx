import Link from 'next/link'
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Données temporaires
const articles = [
  {
    id: '1',
    title: 'Notre road trip de 3 semaines au Japon avec bébé',
    status: 'published',
    category: 'Asie',
    views: 234,
    comments: 12,
    published_at: '15 jan 2026',
    cover: '/images/placeholder.jpg',
  },
  {
    id: '2',
    title: 'Nos 10 indispensables pour voyager avec un enfant',
    status: 'published',
    category: 'Conseils',
    views: 189,
    comments: 8,
    published_at: '10 jan 2026',
    cover: '/images/placeholder.jpg',
  },
  {
    id: '3',
    title: 'Week-end en Provence : nos meilleures adresses',
    status: 'draft',
    category: 'France',
    views: 0,
    comments: 0,
    published_at: null,
    cover: '/images/placeholder.jpg',
  },
  {
    id: '4',
    title: 'Comment préparer un voyage avec un bébé de moins de 1 an',
    status: 'published',
    category: 'Conseils',
    views: 156,
    comments: 5,
    published_at: '5 jan 2026',
    cover: '/images/placeholder.jpg',
  },
]

export default function ArticlesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-brown-900">Articles</h1>
          <p className="text-brown-600 mt-1">
            Gérez vos articles de blog. {articles.length} articles au total.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/nouveau">
            <Plus className="h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brown-400" />
          <input
            type="search"
            placeholder="Rechercher un article..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-beige-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2.5 rounded-xl border border-beige-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-brown-700">
            <option value="">Tous les statuts</option>
            <option value="published">Publiés</option>
            <option value="draft">Brouillons</option>
          </select>
          <select className="px-4 py-2.5 rounded-xl border border-beige-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-brown-700">
            <option value="">Toutes les catégories</option>
            <option value="france">France</option>
            <option value="europe">Europe</option>
            <option value="asie">Asie</option>
            <option value="conseils">Conseils</option>
          </select>
        </div>
      </div>

      {/* Articles table */}
      <div className="bg-white rounded-2xl shadow-sm border border-beige-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-beige-50 border-b border-beige-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-brown-600">
                Article
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-brown-600">
                Catégorie
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-brown-600">
                Statut
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-brown-600">
                Vues
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-brown-600">
                Date
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-brown-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige-100">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-beige-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 bg-beige-200 rounded-lg flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-brown-900 line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-brown-500">
                        {article.comments} commentaires
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-beige-100 text-brown-700 rounded-full text-sm">
                    {article.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      article.status === 'published'
                        ? 'bg-sage-100 text-sage-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {article.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-6 py-4 text-brown-600">{article.views}</td>
                <td className="px-6 py-4 text-brown-600">
                  {article.published_at || '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 hover:bg-beige-100 rounded-lg transition-colors"
                      title="Voir"
                    >
                      <Eye className="h-4 w-4 text-brown-500" />
                    </button>
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="p-2 hover:bg-beige-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4 text-brown-500" />
                    </Link>
                    <button
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-brown-600">
          Affichage de 1 à {articles.length} sur {articles.length} articles
        </p>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg border border-beige-300 text-brown-600 hover:bg-beige-100 transition-colors disabled:opacity-50"
            disabled
          >
            Précédent
          </button>
          <button
            className="px-4 py-2 rounded-lg border border-beige-300 text-brown-600 hover:bg-beige-100 transition-colors disabled:opacity-50"
            disabled
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  )
}
