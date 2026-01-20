import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Plus, FileText, Eye, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeleteArticleButton } from '@/components/admin/delete-article-button'

export default async function ArticlesPage() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      slug,
      status,
      view_count,
      created_at,
      published_at
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-brown-900">
            Articles
          </h1>
          <p className="text-brown-600 mt-1">
            {articles?.length || 0} article{(articles?.length || 0) !== 1 ? 's' : ''}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/nouveau">
            <Plus className="h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </div>

      {/* Articles list */}
      <div className="bg-white rounded-2xl shadow-sm border border-beige-200 overflow-hidden">
        {articles && articles.length > 0 ? (
          <table className="w-full">
            <thead className="bg-beige-50 border-b border-beige-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-brown-700">
                  Article
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-brown-700">
                  Statut
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-brown-700">
                  Vues
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-brown-700">
                  Date
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-brown-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-beige-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="font-medium text-brown-900 hover:text-terracotta-600"
                    >
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        article.status === 'published'
                          ? 'bg-sage-100 text-sage-700'
                          : article.status === 'draft'
                          ? 'bg-beige-200 text-brown-600'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {article.status === 'published'
                        ? 'Publié'
                        : article.status === 'draft'
                        ? 'Brouillon'
                        : 'Archivé'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-brown-600">
                    {article.view_count || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-brown-600">
                    {new Date(article.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {article.status === 'published' && (
                        <Link
                          href={`/blog/${article.slug}`}
                          target="_blank"
                          className="p-2 text-brown-500 hover:text-terracotta-600 hover:bg-beige-100 rounded-lg transition-colors"
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="p-2 text-brown-500 hover:text-terracotta-600 hover:bg-beige-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <DeleteArticleButton articleId={article.id} articleTitle={article.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-beige-300 mb-4" />
            <h3 className="font-serif text-lg font-bold text-brown-900 mb-2">
              Aucun article
            </h3>
            <p className="text-brown-600 mb-6">
              Commencez par créer votre premier article
            </p>
            <Button asChild>
              <Link href="/admin/articles/nouveau">
                <Plus className="h-4 w-4" />
                Créer un article
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
