import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { requireApiAuth } from '@/lib/auth'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_BYTES = 5 * 1024 * 1024 // 5 Mo

export async function POST(req: Request) {
  const denied = await requireApiAuth()
  if (denied) return denied

  try {
    const formData = await req.formData()
    const file     = formData.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })

    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: 'Format non autorisé (JPEG, PNG, WebP, AVIF)' }, { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Fichier trop lourd (5 Mo max)' }, { status: 413 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    const result = await cloudinary.uploader.upload(base64, {
      folder:         'glowupbox',
      transformation: [{ quality: 'auto', fetch_format: 'webp' }],
    })

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
  } catch (e) {
    console.error('[upload]', e)
    return NextResponse.json({ error: 'Échec de l\'upload' }, { status: 500 })
  }
}
