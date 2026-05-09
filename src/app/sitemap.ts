import { tursoQuery } from '@/lib/turso'
import type { MetadataRoute } from 'next'

const BASE = 'https://www.glowup-box.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [boxes, products, articles] = await Promise.all([
    tursoQuery('SELECT slug, updatedAt FROM Box WHERE active=1'),
    tursoQuery('SELECT id, updatedAt FROM Product WHERE active=1'),
    tursoQuery('SELECT slug, updatedAt FROM Article WHERE published=1'),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                        priority: 1.0, changeFrequency: 'weekly'  },
    { url: `${BASE}/boxs`,              priority: 0.9, changeFrequency: 'weekly'  },
    { url: `${BASE}/boutique`,          priority: 0.8, changeFrequency: 'weekly'  },
    { url: `${BASE}/blog`,              priority: 0.8, changeFrequency: 'weekly'  },
    { url: `${BASE}/conseil-peau`,      priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/b2b`,               priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/a-propos`,          priority: 0.6, changeFrequency: 'monthly' },
  ]

  const boxRoutes: MetadataRoute.Sitemap = boxes.map(b => ({
    url:             `${BASE}/boxs/${b.slug}`,
    lastModified:    b.updatedAt ? new Date(String(b.updatedAt)) : new Date(),
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map(p => ({
    url:             `${BASE}/boutique/${p.id}`,
    lastModified:    p.updatedAt ? new Date(String(p.updatedAt)) : new Date(),
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map(a => ({
    url:             `${BASE}/blog/${a.slug}`,
    lastModified:    a.updatedAt ? new Date(String(a.updatedAt)) : new Date(),
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  return [...staticRoutes, ...boxRoutes, ...productRoutes, ...articleRoutes]
}
