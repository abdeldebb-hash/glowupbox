import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Seules exceptions publiques : la page de login et l'endpoint de connexion
  if (pathname.startsWith('/admin/login') || pathname === '/api/admin/auth') {
    return NextResponse.next()
  }

  const ok = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value)
  if (ok) return NextResponse.next()

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] }
