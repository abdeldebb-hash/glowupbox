import { notFound }     from 'next/navigation'
import { prisma }        from '@/lib/db'
import { ProductForm }   from '../ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let product = null
  try { product = await prisma.product.findUnique({ where: { id: Number(id) } }) } catch {}
  if (!product) notFound()
  return <ProductForm product={product} />
}
