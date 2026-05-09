import Link             from 'next/link'
import { tursoQuery }   from '@/lib/turso'
import { Package, ShoppingBag, FileText, Settings, Plus, TrendingUp } from 'lucide-react'

async function getStats() {
  try {
    const [boxes, products, articles, options] = await Promise.all([
      tursoQuery('SELECT COUNT(*) as n FROM Box WHERE active=1'),
      tursoQuery('SELECT COUNT(*) as n FROM Product WHERE active=1'),
      tursoQuery('SELECT COUNT(*) as n FROM Article WHERE published=1'),
      tursoQuery('SELECT COUNT(*) as n FROM Option'),
    ])
    return {
      boxes:    Number(boxes[0]?.n    ?? 0),
      products: Number(products[0]?.n ?? 0),
      articles: Number(articles[0]?.n ?? 0),
      options:  Number(options[0]?.n  ?? 0),
    }
  } catch {
    return { boxes: 0, products: 0, articles: 0, options: 0 }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const STATS = [
    { label: 'Boxs actives',      value: stats.boxes,    icon: Package,     href: '/admin/boxs',     color: 'from-[#E91E8C] to-[#FF6B9D]' },
    { label: 'Accessoires actifs', value: stats.products, icon: ShoppingBag, href: '/admin/boutique', color: 'from-[#FF6B9D] to-[#FFB347]' },
    { label: 'Articles publiés',  value: stats.articles,  icon: FileText,    href: '/admin/blog',     color: 'from-[#FFB347] to-[#E91E8C]' },
    { label: 'Options config.',   value: stats.options,   icon: Settings,    href: '/admin/options',  color: 'from-[#2D1B4E] to-[#E91E8C]' },
  ]

  const SECTIONS = [
    { href: '/admin/boxs/new',     label: 'Ajouter une box',       icon: Package,     desc: 'Nouvelle box K-Beauty' },
    { href: '/admin/boutique/new', label: 'Ajouter un accessoire', icon: ShoppingBag, desc: 'Nouveau produit boutique' },
    { href: '/admin/blog/new',     label: 'Écrire un article',     icon: FileText,    desc: 'Nouvel article blog' },
    { href: '/admin/contenu',      label: 'Modifier le contenu',   icon: TrendingUp,  desc: 'Textes des pages' },
    { href: '/admin/options',      label: 'Paramètres',            icon: Settings,    desc: 'WhatsApp, Instagram...' },
  ]

  return (
    <div className="ml-64 p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="font-playfair font-bold italic text-[#1A1A2E] text-3xl mb-1">
            Bonjour <span style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>✦</span>
          </h1>
          <p className="text-[#4A4A6A] text-sm">Bienvenue dans votre espace de gestion Glow Up Box</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {STATS.map(s => {
            const Icon = s.icon
            return (
              <Link key={s.href} href={s.href}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-pink-100 transition-all duration-200 group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-playfair font-bold text-[#1A1A2E] text-3xl mb-1">{s.value}</div>
                <div className="text-[#4A4A6A] text-xs">{s.label}</div>
              </Link>
            )
          })}
        </div>

        <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#E91E8C]" /> Actions rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map(s => {
            const Icon = s.icon
            return (
              <Link key={s.href} href={s.href}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[rgba(233,30,140,.2)] transition-all duration-200 flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[rgba(233,30,140,.08)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(233,30,140,.14)] transition-colors">
                  <Icon className="w-4 h-4 text-[#E91E8C]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A2E] text-sm mb-0.5 group-hover:text-[#E91E8C] transition-colors">{s.label}</p>
                  <p className="text-[#4A4A6A] text-xs">{s.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
