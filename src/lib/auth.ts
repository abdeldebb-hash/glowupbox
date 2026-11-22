import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session'

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return verifySessionToken(store.get(SESSION_COOKIE)?.value)
}

// Pour les pages serveur : redirige vers le login
export async function requireAuth() {
  if (!(await isAuthenticated())) redirect('/admin/login')
}

// Pour les routes API : renvoie une 401 si non connecté, sinon null
export async function requireApiAuth(): Promise<NextResponse | null> {
  if (await isAuthenticated()) return null
  return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
}
