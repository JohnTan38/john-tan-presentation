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

    expect(packageJson.name).toBe('john-tan-selarang-halfway-house-case-manager-profile')
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

  it('publishes recruiter-facing canonical and social metadata for Selarang Case Manager', () => {
    expect(metadata.metadataBase?.toString()).toBe('https://john-tan-presentation.vercel.app/')
    expect(metadata.title).toMatchObject({
      default: 'John Tan | Selarang Halfway House Case Manager',
      template: '%s | John Tan',
    })
    expect(metadata.description).toContain('Case Manager')
    expect(metadata.description).toContain('Selarang Halfway House')
    expect(metadata.alternates).toMatchObject({ canonical: '/' })
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      url: '/',
      title: 'John Tan | Selarang Halfway House Case Manager',
    })
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' })
    expect(viewport).toMatchObject({ themeColor: '#F59E0B' })
  })

  it('allows indexing and exposes the one canonical profile URL', () => {
    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://john-tan-presentation.vercel.app/sitemap.xml',
    })
    expect(sitemap()).toEqual([
      {
        url: 'https://john-tan-presentation.vercel.app',
        lastModified: '2026-08-07',
        changeFrequency: 'monthly',
        priority: 1,
      },
    ])
  })
})
