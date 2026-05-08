import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file     = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })

    const bytes  = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    const result = await cloudinary.uploader.upload(base64, {
      folder:         'glowupbox',
      transformation: [{ quality: 'auto', fetch_format: 'webp' }],
    })

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
