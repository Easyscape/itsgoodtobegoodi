'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TiptapEditor } from '@/components/editor/tiptap-editor'

// Catégories temporaires
const categories = [
  { id: '1', name: 'France', emoji: '🇫🇷' },
  { id: '2', name: 'Europe', emoji: '🌍' },
  { id: '3', name: 'Asie', emoji: '🌏' },
  { id: '4', name: 'Amérique', emoji: '🌎' },
  { id: '5', name: 'Conseils', emoji: '💡' },
  { id: '6', name: 'Avec bébé', emoji: '👶' },
  { id: '7', name: 'Avec enfant', emoji: '👧' },
]

export default function NewArticlePage() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [isSaving, setIsSaving] = useState(false)

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSave = async (publishStatus: 'draft' | 'published') => {
    setIsSaving(true)
    setStatus(publishStatus)

    // TODO: Sauvegarder dans Supabase
    console.log({
      title,
      excerpt,
      content,
      categories: selectedCategories,
      status: publishStatus,
    })

    // Simulation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert(
      publishStatus === 'published'
        ? 'Article publié !'
        : 'Brouillon enregistré !'
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
              Nouvel article
            </h1>
            <p className="text-brown-600 text-sm">
              Créez un nouvel article pour votre blog
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" disabled={isSaving}>
            <Eye className="h-4 w-4" />
            Prévisualiser
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSave('draft')}
            isLoading={isSaving && status === 'draft'}
            disabled={isSaving}
          >
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
          <Button
            onClick={() => handleSave('published')}
            isLoading={isSaving && status === 'published'}
            disabled={isSaving || !title}
          >
            Publier
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
            <div className="aspect-video bg-beige-100 rounded-xl border-2 border-dashed border-beige-300 flex flex-col items-center justify-center cursor-pointer hover:border-terracotta-400 hover:bg-terracotta-50 transition-colors">
              <Upload className="h-8 w-8 text-beige-400 mb-2" />
              <p className="text-sm text-brown-600">Cliquez pour uploader</p>
              <p className="text-xs text-brown-400 mt-1">JPG, PNG max 5MB</p>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl border border-beige-200 p-6">
            <h3 className="font-medium text-brown-900 mb-4">Catégories</h3>
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
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-beige-200 p-6">
            <h3 className="font-medium text-brown-900 mb-4">Tags</h3>
            <input
              type="text"
              placeholder="Ajouter des tags séparés par des virgules"
              className="w-full px-4 py-2.5 rounded-xl border border-beige-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-sm"
            />
            <p className="text-xs text-brown-400 mt-2">
              Ex: japon, tokyo, voyage-bébé
            </p>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl border border-beige-200 p-6">
            <h3 className="font-medium text-brown-900 mb-4">SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-brown-600 mb-1">
                  Titre SEO (optionnel)
                </label>
                <input
                  type="text"
                  placeholder="Titre pour Google"
                  className="w-full px-3 py-2 rounded-lg border border-beige-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-brown-600 mb-1">
                  Description SEO (optionnel)
                </label>
                <textarea
                  placeholder="Description pour Google"
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-beige-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-sage-50 rounded-2xl border border-sage-200 p-6">
            <h3 className="font-medium text-sage-800 mb-2">💡 Conseils</h3>
            <ul className="text-sm text-sage-700 space-y-2">
              <li>• Utilisez des titres (H2, H3) pour structurer</li>
              <li>• Ajoutez des images pour illustrer</li>
              <li>• Le résumé apparaît sur la page d&apos;accueil</li>
              <li>• Enregistrez régulièrement en brouillon</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
