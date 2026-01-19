import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  Map,
  FolderOpen,
  MessageSquare,
  Download,
  Users,
  Mail,
  Settings,
  LogOut,
  Home,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Articles', href: '/admin/articles', icon: FileText },
  { name: 'Voyages', href: '/admin/voyages', icon: Map },
  { name: 'Catégories', href: '/admin/categories', icon: FolderOpen },
  { name: 'Commentaires', href: '/admin/commentaires', icon: MessageSquare },
  { name: 'Ressources', href: '/admin/ressources', icon: Download },
  { name: 'Membres', href: '/admin/membres', icon: Users },
  { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-beige-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-brown-900 text-white">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-brown-800">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold">
              IGTBG <span className="text-terracotta-400">Admin</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-beige-300 hover:bg-brown-800 hover:text-white transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brown-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-beige-300 hover:bg-brown-800 hover:text-white transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Voir le site</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-beige-300 hover:bg-brown-800 hover:text-white transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-beige-300 hover:bg-red-900/50 hover:text-red-300 transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

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
            <span className="text-sm text-brown-600">Bonjour, Laure</span>
            <div className="w-10 h-10 bg-terracotta-100 rounded-full flex items-center justify-center">
              <span className="font-medium text-terracotta-700">L</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
