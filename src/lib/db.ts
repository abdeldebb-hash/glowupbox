import { PrismaClient } from '@prisma/client'

function createPrisma() {
  const url = process.env.TURSO_DATABASE_URL ?? ''

  if (url.startsWith('libsql://')) {
    // Production : Turso cloud
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient }    = require('@libsql/client')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaLibSQL }    = require('@prisma/adapter-libsql')
    const libsql = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN })
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({ adapter } as never)
  }

  // Dev local : SQLite fichier
  return new PrismaClient()
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? createPrisma()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
