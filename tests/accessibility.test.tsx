import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Page from '../app/page'

describe('profile accessibility and claim safety', () => {
  it('gives every major section an accessible name', () => {
    render(<Page />)

    for (const name of [
      'Evidence for High-Impact Case Management',
      '10-Point Selarang Job Scope Alignment',
      'A 5-Stage Pathway from Admission to Sustainable Desistance',
      'Selarang Case Vignette: Workplace Crisis & Relapse Intervention',
      'Find the Proof Behind the Profile',
      'Beyond Second Chances: Rebuilding Lives and Restoring Hope',
      'A Deliberate Move into Social Service',
      'Lifelong Learning Grounded in Social Work',
      'Ready to Serve at Selarang Halfway House',
    ]) {
      expect(screen.getByRole('region', { name })).toBeVisible()
    }
  })

  it('provides one main heading, a skip link, and contextual logo ownership', () => {
    render(<Page />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content')
    const logo = screen.getByRole('img', { name: /yellow ribbon singapore - selarang halfway house logo/i })
    expect(logo.closest('.application-for')).toHaveTextContent('Candidate Profile Prepared For')
  })

  it('publishes clean text without unsupported or malformed claims', () => {
    render(<Page />)

    expect(screen.getAllByText('English fluent; Mandarin and Cantonese conversational.').length).toBeGreaterThan(0)
    expect(document.body.textContent).not.toMatch(
      /Ãƒ|Â·|Care Corner|oncology expertise|completed cancer case management|Jojo|365 Cancer Prevention Society/i,
    )
  })
})
