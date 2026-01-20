'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, Save, Loader2, FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function NouvelleRessourcePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // 10MB max
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('Le fichier ne doit pas dépasser 10MB')
      return
    }

    setError('')
    setFile(selectedFile)
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Le titre est obligatoire')
      return
    }

    if (!file) {
      setError('Veuillez sélectionner un fichier')
      return
    }

    setIsUploading(true)
    setError('')

    try {
      const supabase = createClient()

      // Upload file to storage
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
      const filePath = `resources/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath)

      // Create resource record
      const { error: insertError } = await supabase
        .from('resources')
        .insert({
          title,
          description: description || null,
          file_url: publicUrl,
          file_type: file.type,
          file_name: file.name,
        })

      if (insertError) throw insertError

      router.push('/admin/ressources')
    } catch (err) {
      console.error('Erreur:', err)
      setError('Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (ext === 'pdf') return 'PDF'
    if (ext === 'xlsx' || ext === 'xls') return 'XLS'
    if (ext === 'docx' || ext === 'doc') return 'DOC'
    return ext?.toUpperCase() || 'FILE'
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/ressources"
          className="p-2 hover:bg-beige-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-brown-600" />
        </Link>
        <div>
          <h1 className="font-serif text-2xl font-bold text-brown-900">
            Nouvelle ressource
          </h1>
          <p className="text-brown-600 text-sm">
            Partagez un fichier utile avec vos lecteurs
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-white rounded-2xl border border-beige-200 p-6">
          <label className="block text-sm font-medium text-brown-700 mb-2">
            Titre de la ressource *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Checklist voyage avec bébé"
            className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-beige-200 p-6">
          <label className="block text-sm font-medium text-brown-700 mb-2">
            Description (optionnel)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez brièvement cette ressource..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent resize-none"
          />
        </div>

        {/* File upload */}
        <div className="bg-white rounded-2xl border border-beige-200 p-6">
          <label className="block text-sm font-medium text-brown-700 mb-4">
            Fichier *
          </label>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept=".pdf,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.zip"
          />

          {file ? (
            <div className="flex items-center gap-4 p-4 bg-beige-50 rounded-xl">
              <div className="w-12 h-12 bg-terracotta-100 rounded-xl flex items-center justify-center">
                <span className="text-xs font-bold text-terracotta-700">
                  {getFileIcon(file.name)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-brown-900 truncate">{file.name}</p>
                <p className="text-sm text-brown-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-2 text-brown-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="file-upload"
              className="block w-full p-8 border-2 border-dashed border-beige-300 rounded-xl text-center cursor-pointer hover:border-terracotta-400 hover:bg-terracotta-50 transition-colors"
            >
              <Upload className="h-10 w-10 text-beige-400 mx-auto mb-3" />
              <p className="text-brown-600 font-medium">
                Cliquez pour sélectionner un fichier
              </p>
              <p className="text-sm text-brown-400 mt-1">
                PDF, Excel, Word, PowerPoint, ZIP (max 10MB)
              </p>
            </label>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push('/admin/ressources')}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Upload en cours...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Enregistrer
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
