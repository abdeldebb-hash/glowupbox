import { NextResponse } from 'next/server'
import { cookies }      from 'next/headers'
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, safeEqual } from '@/lib/session'

// Limite basique en mémoire : 5 échecs / 15 min / IP.
// (best-effort : par instance serverless, mais freine le brute-force simple)
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILS = 5
const fails = new Map<string, { n: number; reset: number }>()

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const rec = fails.get(ip)
  if (rec && rec.reset > now && rec.n >= MAX_FAILS) {
    return NextResponse.json({ error: 'Trop de tentatives, réessayez plus tard' }, { status: 429 })
  }

  let email = '', password = ''
  try {
    const body = await req.json()
    email    = String(body?.email ?? '')
    password = String(body?.password ?? '')
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }

  const expectedEmail = process.env.ADMIN_EMAIL
  const expectedPass  = process.env.ADMIN_PASSWORD
  if (!expectedEmail || !expectedPass) {
    return NextResponse.json({ error: 'Configuration serveur incomplète' }, { status: 500 })
  }

  const okEmail = safeEqual(email, expectedEmail)
  const okPass  = safeEqual(password, expectedPass)
  if (!okEmail || !okPass) {
    fails.set(ip, rec && rec.reset > now ? { n: rec.n + 1, reset: rec.reset } : { n: 1, reset: now + WINDOW_MS })
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
  }

  fails.delete(ip)
  const store = await cookies()
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   SESSION_MAX_AGE,
    path:     '/',
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
  return NextResponse.json({ ok: true })
}
