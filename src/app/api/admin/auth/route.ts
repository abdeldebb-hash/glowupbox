import { NextResponse } from 'next/server'
import { cookies }      from 'next/headers'
import { getSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (
    email    !== process.env.ADMIN_EMAIL    ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
  }

  const store = await cookies()
  store.set(SESSION_COOKIE_NAME(), getSessionToken(), {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   60 * 60 * 24 * 7, // 7 jours
    path:     '/',
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const store = await cookies()
  store.delete(SESSION_COOKIE_NAME())
  return NextResponse.json({ ok: true })
}
