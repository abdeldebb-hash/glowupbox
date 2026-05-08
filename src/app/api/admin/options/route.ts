import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/db'

export async function GET() {
  try {
    const options = await prisma.option.findMany()
    const map: Record<string, string> = {}
    options.forEach(o => { map[o.key] = o.value })
    return NextResponse.json(map)
  } catch {
    return NextResponse.json({}, { status: 503 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json() as Record<string, string>
    await Promise.all(
      Object.entries(data).map(([key, value]) =>
        prisma.option.upsert({
          where:  { key },
          update: { value },
          create: { key, value },
        })
      )
    )
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
