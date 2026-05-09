import { PrismaClient } from '@prisma/client'

function createPrisma() {
  const url   = process.env.TURSO_DATABASE_URL ?? ''
  const token = process.env.TURSO_AUTH_TOKEN   ?? ''

  if (url.startsWith('libsql://')) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient } = require('@libsql/client/http')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaLibSQL } = require('@prisma/adapter-libsql')
    const libsql  = createClient({ url, authToken: token })
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({ adapter } as never)
  }

  return new PrismaClient()
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? createPrisma()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
