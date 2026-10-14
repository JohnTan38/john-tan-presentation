import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Page from '../app/page'
import { Header } from '../src/components/Header'

describe('SWK512 practicum profile page', () => {
  it('renders every planned section', () => {
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1, name: /400-hour practicum/i })).toBeVisible()
    for (const id of ['competencies', 'contract', 'schedule', 'evaluation', 'supervision', 'stance', 'background', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }
    expect(document.body).not.toHaveTextContent(/Selarang|Yellow Ribbon|Prison Service/i)
  })

  it('switches competencies with clicks and arrow keys', async () => {
    const user = userEvent.setup()
    render(<Page />)
    const tablist = screen.getByRole('tablist', { name: 'SWK512 practicum competencies' })
    const tabs = within(tablist).getAllByRole('tab')
    expect(tabs).toHaveLength(6)
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Ethical and professional behaviour')

    await user.click(tabs[4])
    expect(tabs[4]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Evidence brief')

    await user.keyboard('{ArrowDown}')
    expect(tabs[5]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[5]).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('shows what is due in a chosen week of the hours grid', async () => {
    const user = userEvent.setup()
    render(<Page />)
    const weeks = within(screen.getByRole('group', { name: 'Practicum weeks' })).getAllByRole('button')
    expect(weeks).toHaveLength(40)

    const status = screen.getAllByRole('status')[0]
    expect(status).toHaveTextContent('From 11 Jan 2027, hours 1 to 10')

    await user.click(screen.getByRole('button', { name: 'Week 8, phase 1, submission due' }))
    expect(status).toHaveTextContent('hours 71 to 80')
    expect(status).toHaveTextContent('Practicum learning contract (A1)')

    await user.click(screen.getByRole('button', { name: 'Week 40, phase 4, submission due' }))
    expect(status).toHaveTextContent('From 11 Oct 2027, hours 391 to 400')
  })

  it('maps every assignment in the learning-contract table', () => {
    render(<Page />)
    const table = screen.getByRole('region', { name: 'Assignment and competency matrix' })
    expect(within(table).getAllByRole('row')).toHaveLength(13)
  })

  it('provides contact and resume links', () => {
    render(<Page />)
    expect(screen.getAllByRole('link', { name: /email john/i })[0]).toHaveAttribute('href', 'mailto:sxk2929@gmail.com')
    expect(screen.getAllByRole('link', { name: /call john/i })[0]).toHaveAttribute('href', 'tel:+6598891383')
    expect(screen.getAllByRole('link', { name: /download resume/i })[0]).toHaveAttribute(
      'href',
      '/docs/John_Tan_Resume_SWK512_Practicum.pdf',
    )
  })

  it('opens and closes the mobile navigation', async () => {
    const user = userEvent.setup()
    render(<Header />)
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    await user.click(within(screen.getByRole('navigation', { name: 'Mobile navigation' })).getByRole('link', { name: 'Schedule' }))
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
  })
})
