import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const icon = readFileSync(resolve(process.cwd(), 'app/icon.svg'), 'utf8')

describe('site identity asset', () => {
  it('provides an accessible, self-contained candidate icon in the 365CPS red', () => {
    expect(icon).toContain('<svg')
    expect(icon).toContain('aria-label="John Tan"')
    expect(icon.toLowerCase()).toContain('#b20411')
    expect(icon).toContain('fill="#fff"')
  })
})
