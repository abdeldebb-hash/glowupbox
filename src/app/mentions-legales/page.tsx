import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title:       'Mentions Légales | Glow Up Box',
  description: 'Mentions légales, politique de livraison, politique de retour et données personnelles de Glow Up Box Maroc.',
  robots:      { index: false, follow: false },
}

export default function MentionsLegalesPage() {
  return (
    <main className="pt-32 pb-20 px-5 min-h-screen bg-soft-pink">
      <div className="max-w-2xl mx-auto">

        <Link href="/" className="inline-flex items-center gap-2 text-brand-gray/50 text-sm hover:text-fuchsia transition-colors mb-10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Retour à l&apos;accueil
        </Link>

        <h1 className="font-playfair font-bold text-brand-black mb-10" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
          Mentions légales
        </h1>

        <div className="space-y-8 text-brand-gray text-sm leading-relaxed">

          <section className="bg-white rounded-2xl p-7 border border-gray-100">
            <h2 className="font-playfair font-bold text-brand-black text-lg mb-4">Responsable du site</h2>
            <p><strong>Marque :</strong> Glow Up Box</p>
            <p><strong>Marché :</strong> Maroc — livraison nationale</p>
            <p><strong>Contact :</strong> Via WhatsApp uniquement</p>
          </section>

          <section className="bg-white rounded-2xl p-7 border border-gray-100">
            <h2 className="font-playfair font-bold text-brand-black text-lg mb-4">Politique de livraison</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Livraison disponible partout au Maroc.</li>
              <li>Les délais de livraison varient selon votre ville et sont communiqués lors de la commande sur WhatsApp.</li>
              <li>Les frais de livraison sont précisés au moment de la commande.</li>
              <li>Toute commande est confirmée par message WhatsApp avec un récapitulatif.</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-7 border border-gray-100">
            <h2 className="font-playfair font-bold text-brand-black text-lg mb-4">Politique de retour</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>En cas de produit défectueux ou non conforme, contactez-nous sur WhatsApp dans les 48h suivant la réception.</li>
              <li>Les produits cosmétiques ouverts ne peuvent pas être retournés pour des raisons d&apos;hygiène.</li>
              <li>Tout retour accepté fait l&apos;objet d&apos;un échange ou d&apos;un avoir, selon les disponibilités.</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-7 border border-gray-100">
            <h2 className="font-playfair font-bold text-brand-black text-lg mb-4">Données personnelles</h2>
            <p className="mb-3">
              Dans le cadre du bilan peau gratuit, nous collectons votre prénom et numéro WhatsApp afin de vous envoyer une recommandation personnalisée.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Ces données ne sont ni vendues ni partagées avec des tiers.</li>
              <li>Elles sont utilisées uniquement pour vous conseiller et traiter votre commande.</li>
              <li>Vous pouvez demander la suppression de vos données à tout moment via WhatsApp.</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-7 border border-gray-100">
            <h2 className="font-playfair font-bold text-brand-black text-lg mb-4">Contact</h2>
            <p>Pour toute question, réclamation ou demande d&apos;information, contactez-nous directement sur WhatsApp. Notre équipe répond dans les meilleurs délais.</p>
          </section>

        </div>
      </div>
    </main>
  )
}
