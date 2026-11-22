// Session admin : token signé HMAC-SHA256 « expiration.signature ».
// Web Crypto uniquement → utilisable dans le middleware (edge) et les routes Node.

export const SESSION_COOKIE = 'admin_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 jours (secondes)

function getSecret(): string {
  const s = process.env.ADMIN_SECRET
  if (!s || s.length < 16) {
    throw new Error('ADMIN_SECRET manquant ou trop court (16 caractères minimum)')
  }
  return s
}

const enc = new TextEncoder()

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(getSecret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  )
  return toHex(await crypto.subtle.sign('HMAC', key, enc.encode(payload)))
}

// Comparaison en temps constant
export function safeEqual(a: string, b: string): boolean {
  const x = enc.encode(a)
  const y = enc.encode(b)
  let diff = x.length ^ y.length
  const n = Math.max(x.length, y.length)
  for (let i = 0; i < n; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0)
  return diff === 0
}

export async function createSessionToken(): Promise<string> {
  const exp = String(Date.now() + SESSION_MAX_AGE * 1000)
  return `${exp}.${await sign(exp)}`
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const [exp, sig] = token.split('.')
  if (!exp || !sig || !/^\d+$/.test(exp)) return false
  if (Number(exp) < Date.now()) return false
  return safeEqual(sig, await sign(exp))
}
