import { prisma }      from '@/lib/db'
import { BoxesClient } from './BoxesClient'
import type { BoxData } from './BoxesClient'

export const dynamic = 'force-dynamic'

async function getBoxes(): Promise<BoxData[]> {
  try {
    const rows = await prisma.box.findMany({
      where:   { active: true },
      orderBy: { order: 'asc' },
    })
    return rows.map(b => ({
      id:          b.id,
      name:        b.name,
      slug:        b.slug,
      skinType:    b.skinType,
      skinLabel:   b.skinLabel,
      description: b.description,
      products:    (() => { try { return JSON.parse(b.products) as string[] } catch { return [] } })(),
      img:         b.image ?? '/images/peau-sensible.jpg',
      waMessage:   b.waMessage,
    }))
  } catch {
    return []
  }
}

export default async function BoxsPage() {
  const boxes = await getBoxes()
  return <BoxesClient boxes={boxes} />
}
