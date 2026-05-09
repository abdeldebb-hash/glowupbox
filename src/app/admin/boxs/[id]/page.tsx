import { notFound }  from 'next/navigation'
import { tursoQuery } from '@/lib/turso'
import { BoxForm }    from '../BoxForm'

export default async function EditBoxPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rows = await tursoQuery('SELECT * FROM Box WHERE id=? LIMIT 1', [Number(id)]).catch(() => [])
  if (!rows.length) notFound()
  const b = rows[0]

  const box = {
    id:          Number(b.id),
    name:        String(b.name),
    slug:        String(b.slug),
    description: String(b.description),
    skinType:    String(b.skinType),
    skinLabel:   String(b.skinLabel ?? ''),
    tag:         String(b.tag ?? ''),
    accroche:    String(b.accroche ?? ''),
    products:    String(b.products ?? '[]'),
    image:       b.image ? String(b.image) : null,
    active:      Number(b.active) === 1,
    order:       Number(b.order ?? 0),
    waMessage:   String(b.waMessage ?? ''),
    createdAt:   new Date(String(b.createdAt)),
    updatedAt:   new Date(String(b.updatedAt)),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <BoxForm box={box as any} />
}
