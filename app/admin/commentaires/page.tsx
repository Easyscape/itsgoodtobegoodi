'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check, X, Loader2, MessageSquare, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type CommentRow = {
  id: string
  author_name: string | null
  author_email: string | null
  content: string
  status: string
  created_at: string
  article: {
    id: string
    title: string
  }[] | null
}

type Comment = {
  id: string
  author_name: string | null
  author_email: string | null
  content: string
  status: string
  created_at: string
  article: {
    id: string
    title: string
  } | null
}

export default function CommentairesPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchComments()
  }, [filter])

  const fetchComments = async () => {
    setLoading(true)
    const supabase = createClient()

    let query = supabase
      .from('comments')
      .select(`
        id,
        author_name,
        author_email,
        content,
        status,
        created_at,
        article:articles(id, title)
      `)
      .order('created_at', { ascending: false })

    if (filter === 'pending') {
      query = query.eq('status', 'pending')
    } else if (filter === 'approved') {
      query = query.eq('status', 'approved')
    }

    const { data, error } = await query

    if (error) {
      console.error('Erreur:', error)
    } else {
      // Transform data: article is returned as array, we take first element
      const transformed = (data as CommentRow[] || []).map(row => ({
        ...row,
        article: row.article?.[0] || null
      }))
      setComments(transformed)
    }
    setLoading(false)
  }

  const handleApprove = async (commentId: string) => {
    setActionLoading(commentId)
    const supabase = createClient()

    const { error } = await supabase
      .from('comments')
      .update({ status: 'approved' })
      .eq('id', commentId)

    if (error) {
      alert('Erreur lors de l\'approbation')
    } else {
      setComments(comments.filter(c => c.id !== commentId))
    }
    setActionLoading(null)
  }

  const handleReject = async (commentId: string) => {
    setActionLoading(commentId)
    const supabase = createClient()

    const { error } = await supabase
      .from('comments')
      .update({ status: 'rejected' })
      .eq('id', commentId)

    if (error) {
      alert('Erreur lors du rejet')
    } else {
      setComments(comments.filter(c => c.id !== commentId))
    }
    setActionLoading(null)
  }

  const handleDelete = async (commentId: string) => {
    if (!confirm('Supprimer ce commentaire ?')) return

    setActionLoading(commentId)
    const supabase = createClient()

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)

    if (error) {
      alert('Erreur lors de la suppression')
    } else {
      setComments(comments.filter(c => c.id !== commentId))
    }
    setActionLoading(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-brown-900">
            Commentaires
          </h1>
          <p className="text-brown-600 mt-1">
            Modérez les commentaires de vos visiteurs
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'pending'
              ? 'bg-terracotta-500 text-white'
              : 'bg-beige-100 text-brown-700 hover:bg-beige-200'
          }`}
        >
          En attente
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'approved'
              ? 'bg-terracotta-500 text-white'
              : 'bg-beige-100 text-brown-700 hover:bg-beige-200'
          }`}
        >
          Approuvés
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-terracotta-500 text-white'
              : 'bg-beige-100 text-brown-700 hover:bg-beige-200'
          }`}
        >
          Tous
        </button>
      </div>

      {/* Comments list */}
      <div className="bg-white rounded-2xl shadow-sm border border-beige-200">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-terracotta-500 mx-auto" />
          </div>
        ) : comments.length > 0 ? (
          <div className="divide-y divide-beige-100">
            {comments.map((comment) => (
              <div key={comment.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-terracotta-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-medium text-terracotta-700">
                      {(comment.author_name || 'A').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-brown-900">
                        {comment.author_name || 'Anonyme'}
                      </span>
                      <span className="text-sm text-brown-400">
                        {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        comment.status === 'pending'
                          ? 'bg-orange-100 text-orange-700'
                          : comment.status === 'approved'
                          ? 'bg-sage-100 text-sage-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {comment.status === 'pending' ? 'En attente' :
                         comment.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                      </span>
                    </div>
                    {comment.article && (
                      <p className="text-sm text-brown-500 mb-2">
                        Sur : <span className="font-medium">{comment.article.title}</span>
                      </p>
                    )}
                    <p className="text-brown-700 mb-4">{comment.content}</p>
                    <div className="flex gap-2">
                      {comment.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(comment.id)}
                            disabled={actionLoading === comment.id}
                          >
                            {actionLoading === comment.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                            Approuver
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleReject(comment.id)}
                            disabled={actionLoading === comment.id}
                          >
                            <X className="h-4 w-4" />
                            Rejeter
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(comment.id)}
                        disabled={actionLoading === comment.id}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-beige-300 mb-4" />
            <h3 className="font-serif text-lg font-bold text-brown-900 mb-2">
              {filter === 'pending' ? 'Aucun commentaire en attente' : 'Aucun commentaire'}
            </h3>
            <p className="text-brown-600">
              {filter === 'pending'
                ? 'Tous les commentaires ont été modérés'
                : 'Aucun commentaire pour l\'instant'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
