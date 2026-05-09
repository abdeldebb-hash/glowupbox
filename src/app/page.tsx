import { tursoQuery }          from '@/lib/turso'
import { HeroSection }         from '@/components/sections/HeroSection'
import { TickerSection }       from '@/components/sections/TickerSection'
import { ProfilesSection }     from '@/components/sections/ProfilesSection'
import { ProcessSection }      from '@/components/sections/ProcessSection'
import { BoxsSection }         from '@/components/sections/BoxsSection'
import { BoutiqueSection }     from '@/components/sections/BoutiqueSection'
import { B2BSection }          from '@/components/sections/B2BSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaFinalSection }     from '@/components/sections/CtaFinalSection'
import type { BoxItem }        from '@/components/sections/BoxsSection'
import type { ProductItem }    from '@/components/sections/BoutiqueSection'

export const dynamic = 'force-dynamic'

function parseJSON<T>(val: string | undefined, fallback: T): T {
  if (!val) return fallback
  try { return JSON.parse(val) as T } catch { return fallback }
}

async function getData() {
  try {
    const [boxes, products, optRows] = await Promise.all([
      tursoQuery('SELECT * FROM Box WHERE active=1 ORDER BY "order" ASC LIMIT 3'),
      tursoQuery('SELECT * FROM Product WHERE active=1 ORDER BY "order" ASC LIMIT 4'),
      tursoQuery('SELECT key, value FROM Option'),
    ])
    const opts: Record<string, string> = {}
    optRows.forEach(r => { opts[String(r.key)] = String(r.value) })

    const boxItems: BoxItem[] = boxes.map(b => ({
      img:       b.image ? String(b.image) : '/images/peau-sensible.jpg',
      tag:       String(b.skinLabel || b.skinType),
      name:      String(b.name),
      desc:      String(b.description),
      products:  (() => { try { return JSON.parse(String(b.products)) as string[] } catch { return [] } })(),
      slug:      String(b.slug),
      waMessage: String(b.waMessage),
    }))

    const productItems: ProductItem[] = products.map(p => ({
      id:    Number(p.id),
      img:   p.image ? String(p.image) : '/images/acc-ice-roller.jpg',
      cat:   String(p.catLabel || p.category),
      name:  String(p.name),
      price: Number(p.price),
      desc:  String(p.description),
    }))

    return { boxes: boxItems, products: productItems, opts }
  } catch {
    return { boxes: [], products: [], opts: {} as Record<string, string> }
  }
}

export default async function HomePage() {
  const { boxes, products, opts } = await getData()

  const tickerItems   = parseJSON<string[]>(opts.ticker_items, [])
  const testimonials  = parseJSON<{quote:string;name:string;meta:string;initial:string}[]>(opts.testimonials, [])
  const processSteps  = [1,2,3,4].map(n => ({
    title: opts[`process_step${n}_title`] || '',
    desc:  opts[`process_step${n}_desc`]  || '',
  })).filter(s => s.title || s.desc)
  const profileItems  = [1,2,3,4].map(n => ({
    name: opts[`profile${n}_name`] || '',
    desc: opts[`profile${n}_desc`] || '',
  })).filter(p => p.name || p.desc)

  return (
    <>
      <HeroSection
        title={opts.hero_title    || undefined}
        subtitle={opts.hero_subtitle || undefined}
        cta1={opts.hero_cta1     || undefined}
        cta2={opts.hero_cta2     || undefined}
        statClients={opts.stat_clients || undefined}
        statRating={opts.stat_rating   || undefined}
      />
      <TickerSection items={tickerItems.length > 0 ? tickerItems : undefined} />
      <ProfilesSection profiles={profileItems.length > 0 ? profileItems : undefined} />
      <ProcessSection  steps={processSteps.length > 0  ? processSteps  : undefined} />
      <BoxsSection boxes={boxes} />
      <BoutiqueSection products={products} />
      <B2BSection />
      <TestimonialsSection items={testimonials.length > 0 ? testimonials : undefined} />
      <CtaFinalSection
        title={opts.cta_title    || undefined}
        subtitle={opts.cta_subtitle || undefined}
      />
    </>
  )
}
