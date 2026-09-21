import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const styles = readFileSync(resolve(process.cwd(), 'app/globals.css'), 'utf8')

describe('Selarang Halfway House profile visual contract', () => {
  it('uses the Yellow Ribbon Singapore corporate palette, fonts, and glassmorphism tokens', () => {
    for (const token of [
      '--yr-gold: #f59e0b',
      '--yr-gold-dark: #b45309',
      '--slate-900: #0f172a',
      '--emerald-600: #059669',
      '--glass-bg:',
      '--glass-border:',
      '--glass-shadow:',
    ]) {
      expect(styles.toLowerCase()).toContain(token)
    }

    expect(styles).toContain('var(--font-urbanist)')
    expect(styles).toContain('var(--font-human-accent)')
  })

  it('defines the distinctive hero, dossier, alignment matrix, and vignette layouts', () => {
    expect(styles).toMatch(/\.application-dossier\s*\{[\s\S]*border-radius:/)
    expect(styles).toMatch(/\.alignment-card\s*\{[\s\S]*padding:/)
    expect(styles).toMatch(/\.case-pathway\s*\{[\s\S]*grid-template-columns:/)
    expect(styles).toMatch(/\.vignette-card\s*\{[\s\S]*padding:/)
    expect(styles).toMatch(/\.hero\s*\{[^}]*background:\s*linear-gradient/)
    expect(styles).toMatch(/\.section--alignment\s*\{[^}]*background:\s*linear-gradient/)
    expect(styles).toMatch(/\.section--pathway\s*\{[^}]*background:\s*linear-gradient/)
    expect(styles).toMatch(/\.contact\s*\{[^}]*background:\s*linear-gradient/)
  })

  it('includes keyboard, responsive, and reduced-motion safeguards', () => {
    expect(styles).toMatch(/:focus-visible[\s\S]*outline:/)
    expect(styles).toContain('@media (max-width: 960px)')
    expect(styles).toContain('@media (max-width: 720px)')
    expect(styles).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*scroll-behavior:\s*auto/)
    expect(styles).toMatch(/prefers-reduced-motion:[\s\S]*animation-duration:\s*0\.01ms/)
  })
})
