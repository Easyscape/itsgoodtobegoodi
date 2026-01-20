'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Plus, Download, FileText, Loader2, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Resource = {
  id: string
  title: string
  description: string | null
  file_url: string
  file_type: string | null
  download_count: number
  created_at: string
}

export default function RessourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur:', error)
    } else {
      setResources(data || [])
    }
    setLoading(false)
  }

  const handleDelete = async (resourceId: string) => {
    if (!confirm('Supprimer cette ressource ?')) return

    setDeleting(resourceId)
    const supabase = createClient()

    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', resourceId)

    if (error) {
      alert('Erreur lors de la suppression')
    } else {
      setResources(resources.filter(r => r.id !== resourceId))
    }
    setDeleting(null)
  }

  const getFileIcon = (fileType: string | null) => {
    if (!fileType) return 'file'
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'xlsx'
    if (fileType.includes('pdf')) return 'pdf'
    if (fileType.includes('word') || fileType.includes('document')) return 'doc'
    return 'file'
  }

  const getFileColor = (fileType: string | null) => {
    if (!fileType) return 'bg-beige-100 text-brown-600'
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'bg-green-100 text-green-700'
    if (fileType.includes('pdf')) return 'bg-red-100 text-red-700'
    if (fileType.includes('word') || fileType.includes('document')) return 'bg-blue-100 text-blue-700'
    return 'bg-beige-100 text-brown-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-brown-900">
            Ressources
          </h1>
          <p className="text-brown-600 mt-1">
            {resources.length} ressource{resources.length !== 1 ? 's' : ''} disponible{resources.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/ressources/nouveau">
            <Plus className="h-4 w-4" />
            Nouvelle ressource
          </Link>
        </Button>
      </div>

      {/* Resources list */}
      <div className="bg-white rounded-2xl shadow-sm border border-beige-200">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-terracotta-500 mx-auto" />
          </div>
        ) : resources.length > 0 ? (
          <div className="divide-y divide-beige-100">
            {resources.map((resource) => (
              <div key={resource.id} className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getFileColor(resource.file_type)}`}>
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-brown-900">{resource.title}</h3>
                  {resource.description && (
                    <p className="text-sm text-brown-500 mt-1 line-clamp-1">{resource.description}</p>
                  )}
                  <p className="text-xs text-brown-400 mt-1">
                    {resource.download_count || 0} téléchargement{(resource.download_count || 0) !== 1 ? 's' : ''}
                    {' '}&bull;{' '}
                    {new Date(resource.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={resource.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-brown-500 hover:text-terracotta-600 hover:bg-beige-100 rounded-lg transition-colors"
                    title="Voir"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(resource.id)}
                    disabled={deleting === resource.id}
                    className="p-2 text-brown-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    {deleting === resource.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Download className="h-12 w-12 mx-auto text-beige-300 mb-4" />
            <h3 className="font-serif text-lg font-bold text-brown-900 mb-2">
              Aucune ressource
            </h3>
            <p className="text-brown-600 mb-6">
              Partagez vos fichiers Excel, PDF et autres documents utiles
            </p>
            <Button asChild>
              <Link href="/admin/ressources/nouveau">
                <Plus className="h-4 w-4" />
                Ajouter une ressource
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
