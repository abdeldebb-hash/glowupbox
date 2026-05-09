import { PrismaClient }      from '@prisma/client'
import { PrismaLibSQL }       from '@prisma/adapter-libsql'
import { createClient }       from '@libsql/client'

function createPrisma() {
  const url   = process.env.TURSO_DATABASE_URL ?? ''
  const token = process.env.TURSO_AUTH_TOKEN   ?? ''

  if (url.startsWith('libsql://')) {
    const libsql  = createClient({ url, authToken: token })
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({ adapter } as never)
  }

  return new PrismaClient()
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? createPrisma()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
