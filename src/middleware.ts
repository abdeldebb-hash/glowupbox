import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SECRET        = process.env.ADMIN_SECRET ?? 'glow-secret-bo-2025'
const SESSION_TOKEN = Buffer.from(SECRET).toString('base64')

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  const session = req.cookies.get('admin_session')
  if (!session || session.value !== SESSION_TOKEN) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
