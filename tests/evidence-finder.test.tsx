import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { EvidenceFinder } from '../src/components/EvidenceFinder'
import { evidenceItems } from '../src/data/profile'

describe('case-management evidence finder', () => {
  it('combines category and text filters against real evidence', async () => {
    const user = userEvent.setup()
    render(<EvidenceFinder items={evidenceItems} />)

    await user.click(screen.getByRole('button', { name: 'Statutory & Records' }))
    await user.type(screen.getByRole('searchbox', { name: /search verified competencies/i }), 'attendance')

    expect(screen.getByRole('status')).toHaveTextContent('1 piece of evidence')
    expect(screen.getByRole('heading', { name: 'Attendance & Progress Reporting' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Disciplined Statutory Documentation' })).not.toBeInTheDocument()
  })

  it('filters by one accessible category at a time', async () => {
    const user = userEvent.setup()
    render(<EvidenceFinder items={evidenceItems} />)

    await user.click(screen.getByRole('button', { name: 'SPS & Multi-Agency' }))

    expect(screen.getByRole('button', { name: 'SPS & Multi-Agency' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('status')).toHaveTextContent('2 pieces of evidence')
  })

  it('explains an empty result and resets both controls', async () => {
    const user = userEvent.setup()
    render(<EvidenceFinder items={evidenceItems} />)
    const search = screen.getByRole('searchbox', { name: /search verified competencies/i })

    await user.click(screen.getByRole('button', { name: 'Employment & Visits' }))
    await user.type(search, 'nonexistent medical term')
    expect(screen.getByText(/no evidence matches/i)).toBeVisible()

    await user.click(screen.getByRole('button', { name: /reset search/i }))
    expect(search).toHaveValue('')
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('status')).toHaveTextContent(`${evidenceItems.length} pieces of evidence`)
  })
})
