import Link from 'next/link'
import { Instagram } from 'lucide-react'

const nav = {
  boutique: [
    { href: '/boxs',         label: 'Boxs K-Beauty' },
    { href: '/boutique',     label: 'Boutique' },
    { href: '/conseil-peau', label: 'Bilan peau gratuit' },
    { href: '/b2b',          label: 'Offre Entreprises' },
  ],
  infos: [
    { href: '/a-propos', label: 'À propos' },
    { href: '/blog',     label: 'Blog K-Beauty' },
    { href: '#',         label: 'Mentions légales' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white/50 pt-14 pb-7 px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          <div>
            <span className="font-playfair font-black text-xl text-white block mb-3">GLOW UP BOX ✦</span>
            <p className="text-sm leading-relaxed text-white/40">Votre experte en cosmétique coréenne au Maroc. Coffrets K-Beauty personnalisés après bilan peau gratuit.</p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-white/7 flex items-center justify-center hover:bg-[#E91E8C] transition-colors">
                <Instagram size={15} />
              </a>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? '212600000000'}`} target="_blank" className="w-9 h-9 rounded-full bg-white/7 flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">Boutique</h4>
            <ul className="space-y-2.5">
              {nav.boutique.map(l => <li key={l.href}><Link href={l.href} className="text-sm text-white/40 hover:text-[#FF6B9D] transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">Informations</h4>
            <ul className="space-y-2.5">
              {nav.infos.map(l => <li key={l.href}><Link href={l.href} className="text-sm text-white/40 hover:text-[#FF6B9D] transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/40">
              <li><a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`} target="_blank" className="hover:text-[#FF6B9D] transition-colors">WhatsApp</a></li>
              <li><a href="#" className="hover:text-[#FF6B9D] transition-colors">Instagram</a></li>
              <li>Livraison nationale Maroc</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/7 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span>© 2025 Glow Up Box ✦ — Tous droits réservés</span>
          <span className="text-white/25">K-Beauty authentique · Fait au Maroc</span>
        </div>
      </div>
    </footer>
  )
}
