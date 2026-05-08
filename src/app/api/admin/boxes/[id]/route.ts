import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/db'
import { slugify }      from '@/lib/utils'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const box = await prisma.box.findUnique({ where: { id: Number(id) } })
    if (!box) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(box)
  } catch {
    return NextResponse.json({ error: 'DB non disponible' }, { status: 503 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const box  = await prisma.box.update({
      where: { id: Number(id) },
      data: {
        name:        data.name,
        slug:        slugify(data.name),
        description: data.description,
        skinType:    data.skinType,
        skinLabel:   data.skinLabel,
        tag:         data.tag,
        accroche:    data.accroche,
        products:    JSON.stringify(data.products ?? []),
        image:       data.image ?? null,
        active:      data.active,
        order:       Number(data.order) || 0,
        waMessage:   data.waMessage,
      },
    })
    return NextResponse.json(box)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.box.delete({ where: { id: Number(id) } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
