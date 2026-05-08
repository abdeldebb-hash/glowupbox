'use client'

import Link           from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, FileText, Settings, Type, LogOut, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin',           label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/admin/boxs',      label: 'Boxs',         icon: Package         },
  { href: '/admin/boutique',  label: 'Boutique',     icon: ShoppingBag     },
  { href: '/admin/blog',      label: 'Blog',         icon: FileText        },
  { href: '/admin/contenu',   label: 'Contenu',      icon: Type            },
  { href: '/admin/options',   label: 'Options',      icon: Settings        },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-playfair font-bold italic text-[#1A1A2E] text-sm leading-none">Glow Up Box</p>
            <p className="text-[#4A4A6A]/50 text-[10px] uppercase tracking-widest leading-tight">Back-office</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        {NAV.map(item => {
          const active = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                active
                  ? 'text-[#E91E8C] bg-[rgba(233,30,140,.08)]'
                  : 'text-[#4A4A6A] hover:text-[#1A1A2E] hover:bg-gray-50'
              )}>
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-[#E91E8C]' : 'text-[#4A4A6A]')} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#4A4A6A] hover:text-red-600 hover:bg-red-50 transition-all duration-150">
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
