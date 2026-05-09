import { tursoQuery }              from '@/lib/turso'
import { HeroSection }             from '@/components/sections/HeroSection'
import { TickerSection }           from '@/components/sections/TickerSection'
import { ProfilesSection }         from '@/components/sections/ProfilesSection'
import { ProcessSection }          from '@/components/sections/ProcessSection'
import { BoxsSection }             from '@/components/sections/BoxsSection'
import { BoutiqueSection }         from '@/components/sections/BoutiqueSection'
import { B2BSection }              from '@/components/sections/B2BSection'
import { TestimonialsSection }     from '@/components/sections/TestimonialsSection'
import { CtaFinalSection }         from '@/components/sections/CtaFinalSection'
import type { BoxItem }            from '@/components/sections/BoxsSection'
import type { ProductItem }        from '@/components/sections/BoutiqueSection'

export const dynamic = 'force-dynamic'

async function getData() {
  try {
    const [boxes, products] = await Promise.all([
      tursoQuery('SELECT * FROM Box WHERE active=1 ORDER BY "order" ASC LIMIT 3'),
      tursoQuery('SELECT * FROM Product WHERE active=1 ORDER BY "order" ASC LIMIT 4'),
    ])

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

    return { boxes: boxItems, products: productItems }
  } catch {
    return { boxes: [], products: [] }
  }
}

export default async function HomePage() {
  const { boxes, products } = await getData()

  return (
    <>
      <HeroSection />
      <TickerSection />
      <ProfilesSection />
      <ProcessSection />
      <BoxsSection boxes={boxes} />
      <BoutiqueSection products={products} />
      <B2BSection />
      <TestimonialsSection />
      <CtaFinalSection />
    </>
  )
}
