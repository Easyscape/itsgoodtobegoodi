'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TiptapEditor } from '@/components/editor/tiptap-editor'
import { createClient } from '@/lib/supabase/client'
import { ImageUpload } from '@/components/admin/image-upload'

type Category = {
  id: string
  name: string
  emoji: string | null
}

type Article = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  status: string
}

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const articleId = params.id as string

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [saveType, setSaveType] = useState<'draft' | 'published'>('draft')

  useEffect(() => {
    fetchArticle()
    fetchCategories()
  }, [articleId])

  const fetchArticle = async () => {
    const supabase = createClient()

    const { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .single()

    if (error || !article) {
      alert('Article non trouvé')
      router.push('/admin/articles')
      return
    }

    setTitle(article.title || '')
    setExcerpt(article.excerpt || '')
    setContent(article.content || '')
    setCoverImage(article.cover_image || '')
    setStatus(article.status as 'draft' | 'published')

    // Fetch article categories
    const { data: articleCats } = await supabase
      .from('article_categories')
      .select('category_id')
      .eq('article_id', articleId)

    if (articleCats) {
      setSelectedCategories(articleCats.map(c => c.category_id))
    }

    setLoading(false)
  }

  const fetchCategories = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('categories')
      .select('id, name, emoji')
      .order('name')

    if (data) setCategories(data)
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSave = async (publishStatus: 'draft' | 'published') => {
    if (!title.trim()) {
      alert('Le titre est obligatoire')
      return
    }

    setIsSaving(true)
    setSaveType(publishStatus)

    const supabase = createClient()

    const slug = generateSlug(title)

    // Update article
    const { error } = await supabase
      .from('articles')
      .update({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        cover_image: coverImage || null,
        status: publishStatus,
        published_at: publishStatus === 'published' && status !== 'published'
          ? new Date().toISOString()
          : undefined,
        updated_at: new Date().toISOString(),
      })
      .eq('id', articleId)

    if (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la sauvegarde')
      setIsSaving(false)
      return
    }

    // Update categories: delete all and re-insert
    await supabase
      .from('article_categories')
      .delete()
      .eq('article_id', articleId)

    if (selectedCategories.length > 0) {
      await supabase.from('article_categories').insert(
        selectedCategories.map(catId => ({
          article_id: articleId,
          category_id: catId,
        }))
      )
    }

    setStatus(publishStatus)
    setIsSaving(false)
    alert(publishStatus === 'published' ? 'Article publié !' : 'Modifications enregistrées !')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta-500" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/articles"
            className="p-2 hover:bg-beige-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-brown-600" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-brown-900">
              Modifier l&apos;article
            </h1>
            <p className="text-brown-600 text-sm flex items-center gap-2">
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                status === 'published'
                  ? 'bg-sage-100 text-sage-700'
                  : 'bg-beige-200 text-brown-600'
              }`}>
                {status === 'published' ? 'Publié' : 'Brouillon'}
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => handleSave('draft')}
            disabled={isSaving}
          >
            {isSaving && saveType === 'draft' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Enregistrer
          </Button>
          <Button
            onClick={() => handleSave('published')}
            disabled={isSaving || !title}
          >
            {isSaving && saveType === 'published' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            {status === 'published' ? 'Mettre à jour' : 'Publier'}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              Titre de l&apos;article *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Notre road trip de 3 semaines au Japon"
              className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              Résumé (affiché sur la page d&apos;accueil)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Un court résumé accrocheur de votre article..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Content editor */}
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              Contenu de l&apos;article
            </label>
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder="Racontez votre voyage, partagez vos conseils..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cover image */}
          <div className="bg-white rounded-2xl border border-beige-200 p-6">
            <h3 className="font-medium text-brown-900 mb-4">Image de couverture</h3>
            <ImageUpload
              value={coverImage}
              onChange={setCoverImage}
              bucket="images"
              folder="articles"
            />
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl border border-beige-200 p-6">
            <h3 className="font-medium text-brown-900 mb-4">Catégories</h3>
            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCategories.includes(category.id)
                        ? 'bg-terracotta-500 text-white'
                        : 'bg-beige-100 text-brown-700 hover:bg-beige-200'
                    }`}
                  >
                    {category.emoji} {category.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-brown-500">Aucune catégorie disponible</p>
            )}
          </div>

          {/* Tips */}
          <div className="bg-sage-50 rounded-2xl border border-sage-200 p-6">
            <h3 className="font-medium text-sage-800 mb-2">Conseils</h3>
            <ul className="text-sm text-sage-700 space-y-2">
              <li>- Utilisez des titres (H2, H3) pour structurer</li>
              <li>- Ajoutez des images pour illustrer</li>
              <li>- Le résumé apparaît sur la page d&apos;accueil</li>
              <li>- Enregistrez régulièrement en brouillon</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
