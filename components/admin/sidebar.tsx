'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'
import {
  LayoutDashboard,
  FileText,
  Map,
  FolderOpen,
  MessageSquare,
  Download,
  Mail,
  Settings,
  LogOut,
  Home,
  Image,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Articles', href: '/admin/articles', icon: FileText },
  { name: 'Voyages', href: '/admin/voyages', icon: Map },
  { name: 'Catégories', href: '/admin/categories', icon: FolderOpen },
  { name: 'Médias', href: '/admin/medias', icon: Image },
  { name: 'Ressources', href: '/admin/ressources', icon: Download },
  { name: 'Commentaires', href: '/admin/commentaires', icon: MessageSquare },
  { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/connexion')
    router.refresh()
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-brown-900 text-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-brown-800">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-serif text-lg font-bold">
            IGTBG <span className="text-terracotta-400">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                isActive
                  ? 'bg-terracotta-500 text-white'
                  : 'text-beige-300 hover:bg-brown-800 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-brown-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-beige-300 hover:bg-brown-800 hover:text-white transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Voir le site</span>
        </Link>
        <Link
          href="/admin/parametres"
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
            pathname === '/admin/parametres'
              ? 'bg-terracotta-500 text-white'
              : 'text-beige-300 hover:bg-brown-800 hover:text-white'
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Paramètres</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-beige-300 hover:bg-red-900/50 hover:text-red-300 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}
