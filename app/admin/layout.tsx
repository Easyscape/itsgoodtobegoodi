import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/connexion')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/')
  }

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'Admin'

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="ml-64">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-beige-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h1 className="font-serif text-xl font-bold text-brown-900">
              Administration
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-brown-600">Bonjour, {displayName}</span>
            <div className="w-10 h-10 bg-terracotta-100 rounded-full flex items-center justify-center">
              <span className="font-medium text-terracotta-700">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
