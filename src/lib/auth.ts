import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SESSION_COOKIE = 'admin_session'
const SECRET        = process.env.ADMIN_SECRET ?? 'glow-secret-bo-2025'

export function getSessionToken(): string {
  return Buffer.from(SECRET).toString('base64')
}

export async function requireAuth() {
  const store  = await cookies()
  const cookie = store.get(SESSION_COOKIE)
  if (!cookie || cookie.value !== getSessionToken()) {
    redirect('/admin/login')
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const store  = await cookies()
  const cookie = store.get(SESSION_COOKIE)
  return !!(cookie && cookie.value === getSessionToken())
}

export function SESSION_COOKIE_NAME() { return SESSION_COOKIE }
