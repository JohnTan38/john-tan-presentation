import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const styles = readFileSync(resolve(process.cwd(), 'app/globals.css'), 'utf8')

describe('visual contract', () => {
  it('uses the harbour navy palette and the two typefaces', () => {
    for (const token of ['--navy-800: #0f2a47', '--paper: #f4f6f3', '--teal: #2e7a73', '--marigold: #e0a23a']) {
      expect(styles.toLowerCase()).toContain(token)
    }
    expect(styles).toContain('var(--font-serif)')
    expect(styles).toContain('var(--font-sans)')
  })

  it('lays out the 40-week hours grid', () => {
    expect(styles).toMatch(/\.hours__grid\s*\{[^}]*repeat\(40/)
    expect(styles).toMatch(/\.hours__week\s*\{[^}]*repeat\(10/)
  })

  it('includes keyboard, responsive and reduced-motion safeguards', () => {
    expect(styles).toMatch(/:focus-visible[\s\S]*outline:/)
    expect(styles).toContain('@media (max-width: 960px)')
    expect(styles).toContain('@media (max-width: 720px)')
    expect(styles).toMatch(/prefers-reduced-motion: reduce[\s\S]*animation-duration:\s*0\.01ms/)
  })
})
