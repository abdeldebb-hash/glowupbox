import { NextResponse } from 'next/server'

export async function GET() {
  const url   = process.env.TURSO_DATABASE_URL ?? 'MANQUANT'
  const token = process.env.TURSO_AUTH_TOKEN   ?? 'MANQUANT'

  const httpUrl = url.replace('libsql://', 'https://')

  try {
    const res = await fetch(`${httpUrl}/v2/pipeline`, {
      method:  'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          { type: 'execute', stmt: { sql: 'SELECT 1 AS ok' } },
          { type: 'close' },
        ],
      }),
      cache: 'no-store',
    })

    const text = await res.text()
    return NextResponse.json({
      status: res.status,
      url_prefix: url.substring(0, 30),
      token_prefix: token.substring(0, 20),
      response: text.substring(0, 500),
    })
  } catch (e) {
    return NextResponse.json({ error: String(e), url_prefix: url.substring(0, 30) })
  }
}
