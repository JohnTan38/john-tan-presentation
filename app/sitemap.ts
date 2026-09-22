import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://john-tan-profile.vercel.app',
      lastModified: '2026-08-07',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
