import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Page from '../app/page'

describe('accessibility basics', () => {
  it('gives every major section an accessible name', () => {
    render(<Page />)
    for (const name of [
      'Six competencies, one learning objective each',
      'How the work assignments build each competency',
      'Submission schedule across four phases',
      'Evaluation plan',
      'Supervision plan and shared responsibilities',
      'How I intend to practise',
      'Background',
      'Talk to me about a placement',
    ]) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument()
    }
  })

  it('has one h1 and a skip link', () => {
    render(<Page />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content')
  })

  it('publishes clean text', () => {
    render(<Page />)
    expect(document.body.textContent).not.toMatch(/Ãƒ|Â·|undefined|NaN/)
  })
})
