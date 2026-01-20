import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

export const metadata = {
  title: 'Blog',
  description: 'Tous nos articles de voyage en famille',
}

export default async function BlogPage() {
  const supabase = await createClient()

  // Fetch all published articles
  const { data: articles } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      slug,
      excerpt,
      cover_image,
      published_at,
      created_at,
      article_categories(
        category:categories(name, slug, emoji)
      )
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug, emoji')
    .order('name')

  return (
    <main className="min-h-screen bg-beige-50">
      {/* Header */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block text-4xl mb-4">📖</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brown-900 mb-4">
            Nos aventures
          </h1>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Récits de voyage, conseils pratiques et bonnes adresses testées en famille
          </p>
        </div>
      </section>

      {/* Categories filter */}
      {categories && categories.length > 0 && (
        <section className="bg-white border-t border-beige-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full text-sm font-medium bg-terracotta-500 text-white"
              >
                Tous
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-beige-100 text-brown-700 hover:bg-beige-200 transition-colors"
                >
                  {category.emoji} {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          {articles && articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => {
                const articleCat = article.article_categories?.[0] as { category: { name: string; slug: string; emoji: string }[] } | undefined
                const firstCategory = articleCat?.category?.[0]

                return (
                  <article
                    key={article.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-beige-200 to-beige-100">
                      {article.cover_image ? (
                        <Image
                          src={article.cover_image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                            {firstCategory?.emoji || '✈️'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {firstCategory && (
                        <span className="inline-block px-3 py-1 bg-terracotta-100 text-terracotta-700 text-xs font-semibold rounded-full mb-3">
                          {firstCategory.emoji} {firstCategory.name}
                        </span>
                      )}
                      <h2 className="font-serif text-xl font-bold text-brown-900 mb-2 group-hover:text-terracotta-600 transition-colors line-clamp-2">
                        <Link href={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-brown-600 text-sm line-clamp-2 mb-4">
                        {article.excerpt || 'Découvrez notre aventure...'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-brown-400">
                          {new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                        <Link
                          href={`/blog/${article.slug}`}
                          className="inline-flex items-center gap-1 text-terracotta-600 font-medium text-sm hover:gap-2 transition-all"
                        >
                          Lire
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">✈️</span>
              <h2 className="font-serif text-2xl font-bold text-brown-900 mb-2">
                Les articles arrivent bientôt
              </h2>
              <p className="text-brown-600">
                Nous préparons de belles aventures à partager avec vous !
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
