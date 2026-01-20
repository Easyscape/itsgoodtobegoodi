import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Eye, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('title, excerpt, cover_image')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!article) {
    return { title: 'Article non trouvé' }
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      images: article.cover_image ? [article.cover_image] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch article
  const { data: article } = await supabase
    .from('articles')
    .select(`
      *,
      author:profiles(display_name),
      article_categories(
        category:categories(name, slug, emoji)
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!article) {
    notFound()
  }

  // Increment view count
  await supabase
    .from('articles')
    .update({ view_count: (article.view_count || 0) + 1 })
    .eq('id', article.id)

  // Get categories
  const categories = article.article_categories?.map((ac: { category: { name: string; slug: string; emoji: string }[] }) =>
    ac.category?.[0]
  ).filter(Boolean) || []

  // Calculate reading time (roughly 200 words per minute)
  const wordCount = article.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <header className="relative">
        {article.cover_image ? (
          <div className="relative h-[50vh] md:h-[60vh]">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        ) : (
          <div className="h-[30vh] bg-gradient-to-br from-terracotta-100 to-beige-100" />
        )}

        {/* Content overlay */}
        <div className={`${article.cover_image ? 'absolute bottom-0 left-0 right-0' : ''}`}>
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Back link */}
            <Link
              href="/blog"
              className={`inline-flex items-center gap-2 text-sm font-medium mb-6 ${
                article.cover_image ? 'text-white/80 hover:text-white' : 'text-brown-600 hover:text-terracotta-600'
              } transition-colors`}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat: { name: string; slug: string; emoji: string }) => (
                  <Link
                    key={cat.slug}
                    href={`/blog?category=${cat.slug}`}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      article.cover_image
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-terracotta-100 text-terracotta-700 hover:bg-terracotta-200'
                    } transition-colors`}
                  >
                    {cat.emoji} {cat.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
              article.cover_image ? 'text-white' : 'text-brown-900'
            }`}>
              {article.title}
            </h1>

            {/* Meta */}
            <div className={`flex flex-wrap items-center gap-4 mt-6 text-sm ${
              article.cover_image ? 'text-white/80' : 'text-brown-500'
            }`}>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readingTime} min de lecture
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {article.view_count || 0} vues
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xl text-brown-600 leading-relaxed mb-10 font-medium">
            {article.excerpt}
          </p>
        )}

        {/* Article content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brown-900 prose-p:text-brown-700 prose-a:text-terracotta-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-strong:text-brown-900"
          dangerouslySetInnerHTML={{ __html: article.content || '' }}
        />

        {/* Author */}
        <div className="mt-16 pt-8 border-t border-beige-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-serif font-bold text-terracotta-600">
                {(article.author?.display_name || 'L').charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-brown-900">
                {article.author?.display_name || 'Laure'}
              </p>
              <p className="text-sm text-brown-500">
                Auteure du blog It&apos;s Good To Be Goodi
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
