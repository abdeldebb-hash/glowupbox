import { notFound } from 'next/navigation'
import { prisma }   from '@/lib/db'
import { BoxForm }  from '../BoxForm'

export default async function EditBoxPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let box = null
  try { box = await prisma.box.findUnique({ where: { id: Number(id) } }) } catch {}
  if (!box) notFound()
  return <BoxForm box={box} />
}
