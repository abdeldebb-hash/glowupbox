'use client'

import { motion }   from 'framer-motion'
import { Clock, ArrowLeft, ArrowRight, CheckCircle, Star } from 'lucide-react'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { GradientButton } from '@/components/ui/GradientButton'

export type Article = {
  id: number; title: string; slug: string; excerpt: string; content: string
  category: string; catLabel: string; image: string | null; readTime: string
  publishedAt: string | null; createdAt: string
}

const CAT_COLORS: Record<string, string> = {
  'routine':         'bg-[rgba(233,30,140,.08)] text-fuchsia',
  'types-peau':      'bg-[rgba(255,107,157,.1)] text-coral',
  'ingredients':     'bg-[rgba(255,179,71,.1)] text-[#B8860B]',
  'conseils-beaute': 'bg-[rgba(45,27,78,.08)] text-purple',
  'avant-apres':     'bg-soft-pink text-brand-gray',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' })
}

function renderContent(content: string) {
  const blocks = content.split('\n\n').filter(Boolean)
  return blocks.map((block, i) => {
    if (block.startsWith('## '))
      return <h2 key={i} className="font-playfair font-bold text-brand-black mt-8 mb-4" style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)' }}>{block.replace('## ','')}</h2>
    if (block.startsWith('### '))
      return <h3 key={i} className="font-playfair font-bold text-brand-black text-xl mt-6 mb-3">{block.replace('### ','')}</h3>
    return <p key={i} className="text-brand-gray text-base leading-[1.9] mb-4">{block}</p>
  })
}

export default function ArticleClient({ article, related }: { article: Article; related: Article[] }) {
  const dateStr = article.publishedAt ? formatDate(article.publishedAt) : formatDate(article.createdAt)

  return (
    <main>
      {/* HERO */}
      <section className="bg-dark-gradient pt-32 pb-0 px-5 relative overflow-hidden">
        <div className="absolute -top-1/4 -right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(233,30,140,.15) 0%,transparent 70%)' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
            <p className="text-white/40 text-[11px] uppercase tracking-widest mb-5 flex items-center gap-2">
              <a href="/blog" className="hover:text-coral transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Blog
              </a>
              <span>›</span>
              <span className="text-white/65 line-clamp-1">{article.title}</span>
            </p>
            <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 ${CAT_COLORS[article.category] ?? 'bg-soft-pink text-brand-gray'}`}>
              {article.catLabel || article.category}
            </span>
            <h1 className="font-playfair font-bold italic text-white mb-5" style={{ fontSize:'clamp(2rem,4.5vw,3.8rem)' }}>
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/45 text-[13px]">
              <span>{dateStr}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{article.readTime} de lecture</span>
              <span>·</span>
              <span>L&apos;équipe Glow Up Box</span>
            </div>
          </motion.div>
        </div>

        {article.image && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7, delay:.2 }}
            className="max-w-4xl mx-auto mt-10">
            <div className="rounded-t-3xl overflow-hidden h-72 md:h-96">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}
      </section>

      {/* CONTENU + SIDEBAR */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          <article>
            <ScrollReveal>
              <p className="text-brand-gray text-lg leading-[1.9] font-medium mb-8">{article.excerpt}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div>{renderContent(article.content)}</div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="bg-dark-gradient rounded-3xl p-8 mt-12 text-center">
                <h3 className="font-playfair font-bold italic text-white text-2xl mb-2">Prête à passer à la pratique ?</h3>
                <p className="text-white/60 text-sm mb-6">Découvrez nos boxs soins sélectionnées pour chaque type de peau.</p>
                <GradientButton href="/boxs" size="md" className="justify-center">Découvrir nos boxs</GradientButton>
              </div>
            </ScrollReveal>
          </article>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-28 self-start">
            <div className="bg-soft-pink rounded-3xl p-6">
              <h3 className="font-playfair font-bold text-brand-black text-lg mb-4">À retenir</h3>
              <ul className="space-y-3">
                {article.excerpt.split('.').filter(s => s.trim().length > 10).slice(0, 4).map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-brand-gray text-[13px] leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-fuchsia flex-shrink-0 mt-0.5" />
                    {pt.trim()}.
                  </li>
                ))}
              </ul>
            </div>

            {related.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-gray-100">
                <h3 className="font-playfair font-bold text-brand-black text-lg mb-4">Lire aussi</h3>
                <div className="space-y-4">
                  {related.map(r => (
                    <a key={r.id} href={`/blog/${r.slug}`} className="flex items-start gap-3 group hover:-translate-y-0.5 transition-transform duration-200">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-soft-pink">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {r.image && <img src={r.image} alt={r.title} className="w-full h-full object-cover" loading="lazy" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-fuchsia">{r.catLabel || r.category}</span>
                        <p className="text-brand-black text-[13px] font-medium leading-snug mt-0.5 group-hover:text-fuchsia transition-colors line-clamp-2">{r.title}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-dark-gradient rounded-3xl p-6 text-white">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_,i) => <Star key={i} className="w-3 h-3 fill-[#FFB347] text-[#FFB347]" />)}
              </div>
              <h3 className="font-playfair font-bold italic text-xl mb-2">Votre profil peau</h3>
              <p className="text-white/60 text-[13px] leading-relaxed mb-5">Bilan gratuit en 2 minutes — recommandation personnalisée sur WhatsApp.</p>
              <GradientButton href="/conseil-peau" size="sm" className="w-full justify-center">Mon bilan gratuit</GradientButton>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES LIÉS */}
      {related.length > 0 && (
        <section className="bg-soft-pink py-20 px-5">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(1.8rem,3.5vw,3rem)' }}>
                Vous aimerez <span className="gradient-text">aussi</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <ScrollReveal key={r.id} delay={i*.1}>
                  <motion.a href={`/blog/${r.slug}`} whileHover={{ y:-6 }}
                    className="block bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-[0_16px_40px_rgba(233,30,140,.1)] transition-shadow duration-300 group">
                    <div className="h-40 bg-soft-pink relative overflow-hidden">
                      {r.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" loading="lazy" />
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-fuchsia text-[10px] font-bold uppercase tracking-widest">{r.catLabel || r.category}</span>
                      <p className="font-playfair font-bold text-brand-black text-lg mt-1 mb-3 leading-snug group-hover:text-fuchsia transition-colors">{r.title}</p>
                      <span className="flex items-center gap-1 text-fuchsia text-[11px] font-bold group-hover:gap-2 transition-all">
                        Lire l&apos;article <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="bg-brand-gradient py-16 px-5 text-center relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-52 -left-24 rounded-full bg-white/6 pointer-events-none" />
        <ScrollReveal className="relative z-10">
          <h2 className="font-playfair font-bold italic text-white mb-3" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)' }}>
            Prête à passer à la pratique ?
          </h2>
          <p className="text-white/75 max-w-sm mx-auto text-sm leading-relaxed mb-8">
            Faites votre bilan peau gratuit et recevez une recommandation personnalisée.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <GradientButton href="/conseil-peau" variant="white" size="lg">Mon bilan gratuit</GradientButton>
            <GradientButton href="/boxs" variant="ghost" size="lg">Voir nos boxs</GradientButton>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
