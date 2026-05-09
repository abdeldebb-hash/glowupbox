import { notFound }   from 'next/navigation'
import { tursoQuery } from '@/lib/turso'
import { motion }     from 'framer-motion'
import { MessageCircle, Star, CheckCircle, ArrowLeft, ArrowRight, Package } from 'lucide-react'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { SectionBadge }   from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { waUrl }          from '@/lib/utils'

export const dynamic = 'force-dynamic'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className="w-5 h-5"
          fill={i <= Math.floor(rating) ? '#FFB347' : 'none'} stroke="#FFB347" strokeWidth={1.5}
          style={{ opacity: i > Math.ceil(rating) ? 0.3 : 1 }} />
      ))}
    </div>
  )
}

export default async function ProduitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const rows = await tursoQuery(
    'SELECT * FROM Product WHERE id=? OR slug=? LIMIT 1',
    [isNaN(Number(id)) ? -1 : Number(id), id]
  )
  if (!rows.length) notFound()
  const p = rows[0]

  const related = await tursoQuery(
    'SELECT * FROM Product WHERE active=1 AND category=? AND id!=? ORDER BY "order" ASC LIMIT 2',
    [String(p.category), Number(p.id)]
  )

  const benefits: string[] = (() => { try { return JSON.parse(String(p.benefits)) } catch { return [] } })()

  return (
    <main>
      {/* HERO */}
      <section className="bg-soft-pink pt-32 pb-12 px-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-gray/50 text-[11px] uppercase tracking-widest mb-8 flex items-center gap-2">
            <a href="/boutique" className="hover:text-fuchsia transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Boutique
            </a>
            <span>›</span>
            <span className="text-brand-gray/75">{String(p.name)}</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Image */}
            <div className="relative">
              {p.badge && (
                <span className="absolute top-5 left-5 z-10 text-[9px] font-bold uppercase tracking-widest px-3 py-2 rounded-full bg-brand-gradient text-white">
                  {String(p.badge)}
                </span>
              )}
              <div className="rounded-3xl overflow-hidden aspect-square bg-white shadow-[0_24px_72px_rgba(26,26,46,.08)] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image ? String(p.image) : '/images/acc-ice-roller.jpg'} alt={String(p.name)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Infos */}
            <div>
              <p className="text-fuchsia text-[10px] font-bold uppercase tracking-widest mb-2 opacity-75">{String(p.catLabel || p.category)}</p>
              <h1 className="font-playfair font-bold italic text-brand-black mb-2" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
                {String(p.name)}
              </h1>
              {p.tagline && <p className="text-brand-gray text-base italic mb-5">{String(p.tagline)}</p>}

              <div className="flex items-center gap-3 mb-6">
                <Stars rating={4.9} />
                <span className="text-brand-gray text-sm font-medium">4.9</span>
              </div>

              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-playfair font-bold gradient-text" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>{Number(p.price)} DH</span>
                {p.oldPrice && <span className="text-brand-gray/40 text-xl line-through">{Number(p.oldPrice)} DH</span>}
              </div>

              <div className={`inline-flex items-center gap-2 text-sm font-medium mb-6 ${p.stockStatus === 'ok' ? 'text-green-700' : 'text-orange-600'}`}>
                <span className={`w-2 h-2 rounded-full ${p.stockStatus === 'ok' ? 'bg-green-500' : 'bg-orange-400'}`} />
                {p.stockStatus === 'ok' ? 'En stock' : 'Stock limité'}
              </div>

              <p className="text-brand-gray text-sm leading-relaxed mb-7 pb-7 border-b border-gray-100">{String(p.description)}</p>

              {benefits.length > 0 && (
                <div className="mb-7">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gray/50 mb-3">Bénéfices</p>
                  <div className="flex flex-wrap gap-2">
                    {benefits.map(b => (
                      <span key={b} className="bg-[rgba(233,30,140,.07)] text-fuchsia text-[12px] font-semibold px-3 py-1.5 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <GradientButton href={waUrl(`Bonjour, je souhaite commander ${String(p.name)} (${Number(p.price)} DH)`)} size="lg" external className="flex-1 justify-center">
                  <MessageCircle className="w-5 h-5" />Commander →
                </GradientButton>
                <GradientButton href="/conseil-peau" variant="outline" size="lg">
                  <Star className="w-4 h-4" />Mon bilan gratuit
                </GradientButton>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[{icon:Package,label:'Livraison Maroc'},{icon:MessageCircle,label:'Commande WhatsApp'},{icon:CheckCircle,label:'Qualité garantie'}].map(({icon:Icon,label}) => (
                  <div key={label} className="bg-soft-pink rounded-xl p-3 flex flex-col items-center gap-1.5">
                    <Icon className="w-4 h-4 text-fuchsia" />
                    <span className="text-[10px] font-medium text-brand-gray">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUITS LIÉS */}
      {related.length > 0 && (
        <section className="bg-soft-pink py-20 px-5">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <SectionBadge>À associer</SectionBadge>
              <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(1.8rem,3.5vw,3rem)' }}>
                Complétez votre <span className="gradient-text">routine</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {related.map((r, i) => (
                <ScrollReveal key={Number(r.id)} delay={i * 0.1}>
                  <motion.a href={`/boutique/${Number(r.id)}`} whileHover={{ y:-6 }}
                    className="block bg-white rounded-3xl overflow-hidden border border-[rgba(233,30,140,.08)] shadow-sm hover:shadow-[0_20px_48px_rgba(233,30,140,.12)] transition-shadow duration-300 group">
                    <div className="h-48 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image ? String(r.image) : '/images/acc-ice-roller.jpg'} alt={String(r.name)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <p className="text-fuchsia text-[9px] font-bold uppercase tracking-widest mb-1">{String(r.catLabel || r.category)}</p>
                      <p className="font-playfair font-bold italic text-brand-black text-lg mb-1">{String(r.name)}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-playfair font-bold text-fuchsia text-xl">{Number(r.price)} DH</span>
                        <span className="flex items-center gap-1 text-fuchsia text-[11px] font-bold uppercase tracking-wide">
                          Voir <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-dark-gradient py-16 px-5 text-center">
        <ScrollReveal>
          <h2 className="font-playfair font-bold italic text-white mb-3" style={{ fontSize:'clamp(1.8rem,3vw,2.8rem)' }}>Prête à commander ?</h2>
          <p className="text-white/60 mb-8 max-w-sm mx-auto text-sm">Un simple message sur WhatsApp suffit.</p>
          <GradientButton href={waUrl(`Bonjour, je souhaite commander ${String(p.name)} (${Number(p.price)} DH)`)} variant="white" size="lg" external>
            <MessageCircle className="w-5 h-5" />Commander sur WhatsApp
          </GradientButton>
        </ScrollReveal>
      </section>
    </main>
  )
}
