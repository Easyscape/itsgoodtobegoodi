import Link from 'next/link'
import { Download, FileText, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Ressources',
  description: 'Téléchargez nos checklists, plannings et outils pour organiser vos voyages en famille',
}

export const revalidate = 60

export default async function RessourcesPage() {
  const supabase = await createClient()

  // Fetch public resources
  const { data: resources } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false })

  const getFileIcon = (fileType: string | null) => {
    if (!fileType) return 'bg-beige-100 text-brown-600'
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'bg-green-100 text-green-700'
    if (fileType.includes('pdf')) return 'bg-red-100 text-red-700'
    if (fileType.includes('word') || fileType.includes('document')) return 'bg-blue-100 text-blue-700'
    return 'bg-beige-100 text-brown-600'
  }

  const getFileLabel = (fileType: string | null) => {
    if (!fileType) return 'Fichier'
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'Excel'
    if (fileType.includes('pdf')) return 'PDF'
    if (fileType.includes('word') || fileType.includes('document')) return 'Word'
    return 'Fichier'
  }

  return (
    <main className="min-h-screen bg-beige-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-terracotta-500 via-terracotta-500 to-terracotta-600 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-5xl mb-6">🎁</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Nos ressources gratuites
          </h1>
          <p className="text-xl text-terracotta-100 max-w-2xl mx-auto">
            Checklists, plannings, budgets... Téléchargez tous nos outils
            pour organiser vos voyages en famille comme des pros !
          </p>
        </div>
      </section>

      {/* Resources grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          {resources && resources.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-beige-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${getFileIcon(resource.file_type)}`}>
                      <FileText className="h-7 w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-lg font-bold text-brown-900">
                          {resource.title}
                        </h3>
                        <span className="px-2 py-0.5 bg-beige-100 text-brown-600 text-xs font-medium rounded-full">
                          {getFileLabel(resource.file_type)}
                        </span>
                      </div>
                      {resource.description && (
                        <p className="text-brown-600 text-sm mb-4">
                          {resource.description}
                        </p>
                      )}
                      <a
                        href={resource.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-terracotta-600 font-medium text-sm hover:text-terracotta-700 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Télécharger
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Download className="h-16 w-16 mx-auto text-beige-300 mb-4" />
              <h2 className="font-serif text-2xl font-bold text-brown-900 mb-2">
                Ressources à venir
              </h2>
              <p className="text-brown-600 max-w-md mx-auto">
                Nous préparons des checklists, plannings et autres outils pratiques
                pour vous aider à organiser vos voyages en famille.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="py-16 bg-white border-t border-beige-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-4xl mb-4">📬</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brown-900 mb-4">
            Recevez nos nouvelles ressources
          </h2>
          <p className="text-brown-600 mb-6 max-w-xl mx-auto">
            Inscrivez-vous à notre newsletter pour être informé dès qu&apos;une
            nouvelle ressource est disponible.
          </p>
          <Button asChild>
            <Link href="/#newsletter">
              S&apos;inscrire à la newsletter
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
