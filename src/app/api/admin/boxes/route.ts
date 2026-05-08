import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/db'
import { slugify }      from '@/lib/utils'

export async function GET() {
  try {
    const boxes = await prisma.box.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(boxes)
  } catch {
    return NextResponse.json({ error: 'DB non disponible' }, { status: 503 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const box  = await prisma.box.create({
      data: {
        name:        data.name,
        slug:        slugify(data.name),
        description: data.description ?? '',
        skinType:    data.skinType    ?? '',
        skinLabel:   data.skinLabel   ?? '',
        tag:         data.tag         ?? '',
        accroche:    data.accroche    ?? '',
        products:    JSON.stringify(data.products ?? []),
        image:       data.image       ?? null,
        active:      data.active      ?? true,
        order:       data.order       ?? 0,
        waMessage:   data.waMessage   ?? '',
      },
    })
    return NextResponse.json(box, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
