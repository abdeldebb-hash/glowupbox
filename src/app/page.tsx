import { prisma }              from '@/lib/db'
import { HeroSection }         from '@/components/sections/HeroSection'
import { TickerSection }        from '@/components/sections/TickerSection'
import { ProfilesSection }      from '@/components/sections/ProfilesSection'
import { ProcessSection }       from '@/components/sections/ProcessSection'
import { BoxsSection }          from '@/components/sections/BoxsSection'
import { BoutiqueSection }      from '@/components/sections/BoutiqueSection'
import { B2BSection }           from '@/components/sections/B2BSection'
import { TestimonialsSection }  from '@/components/sections/TestimonialsSection'
import { CtaFinalSection }      from '@/components/sections/CtaFinalSection'
import type { BoxItem }         from '@/components/sections/BoxsSection'
import type { ProductItem }     from '@/components/sections/BoutiqueSection'

export const dynamic = 'force-dynamic'

async function getData() {
  try {
    const [boxes, products] = await Promise.all([
      prisma.box.findMany({ where: { active: true }, orderBy: { order: 'asc' }, take: 3 }),
      prisma.product.findMany({ where: { active: true }, orderBy: { order: 'asc' }, take: 4 }),
    ])

    const boxItems: BoxItem[] = boxes.map(b => ({
      img:       b.image ?? '/images/peau-sensible.jpg',
      tag:       b.skinLabel || b.skinType,
      name:      b.name,
      desc:      b.description,
      products:  (() => { try { return JSON.parse(b.products) as string[] } catch { return [] } })(),
      slug:      b.slug,
      waMessage: b.waMessage,
    }))

    const productItems: ProductItem[] = products.map(p => ({
      id:    p.id,
      img:   p.image ?? '/images/acc-ice-roller.jpg',
      cat:   p.catLabel || p.category,
      name:  p.name,
      price: p.price,
      desc:  p.description,
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
