'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trash2, Loader2 } from 'lucide-react'

interface DeleteArticleButtonProps {
  articleId: string
  articleTitle: string
}

export function DeleteArticleButton({ articleId, articleTitle }: DeleteArticleButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', articleId)

    if (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression')
      setIsDeleting(false)
      return
    }

    router.refresh()
  }

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-xl">
          <h3 className="font-serif text-lg font-bold text-brown-900 mb-2">
            Supprimer l'article ?
          </h3>
          <p className="text-brown-600 mb-6">
            Êtes-vous sûr de vouloir supprimer "{articleTitle}" ? Cette action est irréversible.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 text-brown-600 hover:bg-beige-100 rounded-lg transition-colors"
              disabled={isDeleting}
            >
              Annuler
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="p-2 text-brown-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Supprimer"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
