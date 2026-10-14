import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { metadata, viewport } from '../app/layout'
import robots from '../app/robots'
import sitemap from '../app/sitemap'

const packageJsonSource = readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')

describe('Next.js production surface', () => {
  it('runs development and production through Next.js with one complete quality gate', () => {
    const packageJson = JSON.parse(packageJsonSource)

    expect(packageJson.name).toBe('john-tan-suss-practicum-profile')
    expect(packageJson.scripts).toMatchObject({
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'eslint .',
      typecheck: 'tsc --noEmit',
      test: 'vitest',
      'test:run': 'vitest run',
      'test:pdf': 'python scripts/test_application_pdfs.py',
      'test:e2e': 'playwright test',
      check: 'npm run test:run && npm run test:pdf && npm run typecheck && npm run lint && npm run build && npm run test:e2e',
    })
  })

  it('publishes canonical and social metadata for the SWK512 practicum', () => {
    expect(metadata.metadataBase?.toString()).toBe('https://john-tan-profile.vercel.app/')
    expect(metadata.title).toMatchObject({
      default: 'John Tan | SUSS Social Work Practicum Candidate',
      template: '%s | John Tan',
    })
    expect(metadata.description).toContain('SWK512')
    expect(metadata.description).toContain('400-hour')
    expect(metadata.alternates).toMatchObject({ canonical: '/' })
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      url: '/',
      title: 'John Tan | SUSS Social Work Practicum Candidate',
    })
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' })
    expect(viewport).toMatchObject({ themeColor: '#0F2A47' })
  })

  it('allows indexing and exposes the one canonical profile URL', () => {
    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://john-tan-profile.vercel.app/sitemap.xml',
    })
    expect(sitemap()).toEqual([
      {
        url: 'https://john-tan-profile.vercel.app',
        lastModified: '2026-10-14',
        changeFrequency: 'monthly',
        priority: 1,
      },
    ])
  })
})
