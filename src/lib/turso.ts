const TURSO_URL   = (process.env.TURSO_DATABASE_URL   ?? '').trim()
const TURSO_TOKEN = (process.env.TURSO_AUTH_TOKEN ?? '').trim().replace(/\s/g, '')

type TursoValue = string | number | boolean | null

interface TursoRow { [col: string]: TursoValue }

export async function tursoQuery(sql: string, args: TursoValue[] = []): Promise<TursoRow[]> {
  const httpUrl = TURSO_URL.replace('libsql://', 'https://')
  const res = await fetch(`${httpUrl}/v2/pipeline`, {
    method:  'POST',
    headers: {
      Authorization: `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        { type: 'execute', stmt: { sql, args: args.map(v => ({ type: typeof v === 'number' ? 'integer' : v === null ? 'null' : 'text', value: v === null ? null : String(v) })) } },
        { type: 'close' },
      ],
    }),
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Turso error: ${res.status}`)

  const data = await res.json()
  const result = data.results?.[0]
  if (!result || result.type === 'error') throw new Error(result?.error?.message ?? 'Query failed')

  const cols: string[] = result.response?.result?.cols?.map((c: { name: string }) => c.name) ?? []
  const rows = result.response?.result?.rows ?? []

  return rows.map((row: unknown[]) => {
    const obj: TursoRow = {}
    cols.forEach((col, i) => {
      const cell = row[i] as { type: string; value: string | null } | null
      if (!cell) { obj[col] = null; return }
      obj[col] = cell.type === 'null' ? null : cell.type === 'integer' || cell.type === 'float' ? Number(cell.value) : cell.value ?? null
    })
    return obj
  })
}

export async function tursoExec(sql: string, args: TursoValue[] = []): Promise<number> {
  const httpUrl = TURSO_URL.replace('libsql://', 'https://')
  const res = await fetch(`${httpUrl}/v2/pipeline`, {
    method:  'POST',
    headers: {
      Authorization: `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        { type: 'execute', stmt: { sql, args: args.map(v => ({ type: typeof v === 'number' ? 'integer' : v === null ? 'null' : 'text', value: v === null ? null : String(v) })) } },
        { type: 'close' },
      ],
    }),
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Turso error: ${res.status}`)
  const data = await res.json()
  return data.results?.[0]?.response?.result?.last_insert_rowid ?? 0
}
