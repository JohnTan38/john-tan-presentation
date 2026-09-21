import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Page from '../app/page'
import { Header } from '../src/components/Header'

describe('Selarang Halfway House Case Manager profile', () => {
  it('renders the recruiter story as one navigable evidence-led document', () => {
    render(<Page />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Guiding Reintegration with Empathy, Structure, and Purpose.',
      }),
    ).toBeVisible()
    expect(screen.getByRole('img', { name: /yellow ribbon singapore - selarang halfway house/i })).toBeVisible()
    expect(screen.getByText('Candidate Profile Prepared For')).toBeVisible()
    expect(screen.getAllByText(/Yellow Ribbon Industries/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Case Manager/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Selarang Halfway House/).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: 'Graduate Diploma in Social Work' })).toBeVisible()
    expect(screen.getAllByText(/Singapore University of Social Sciences \(SUSS\)/).length).toBeGreaterThan(0)
    expect(screen.getByText('Currently enrolled')).toBeVisible()
    expect(screen.getByText('Formal Social Work Study · Current Enrolment')).toBeVisible()

    for (const id of [
      'fit',
      'alignment',
      'pathway',
      'vignette',
      'evidence',
      'mission',
      'experience',
      'credentials',
      'contact',
    ]) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }
    expect(document.body).not.toHaveTextContent(/Care Corner|Jojo|365 Cancer Prevention Society/i)
  })

  it('shows every role-fit proof, care step, and official Yellow Ribbon mission pillar', () => {
    render(<Page />)

    for (const title of [
      'Psychology-Informed Group Facilitation',
      'Holistic Casework & Family Reintegration',
      'Employer Partnerships & Job-Site Visits',
      'SPS Co-Case Management & Inter-Agency Coordination',
      'Disciplined Statutory Documentation',
    ]) {
      expect(screen.getAllByRole('heading', { level: 3, name: title }).length).toBeGreaterThan(0)
    }

    expect(screen.getByRole('list', { name: 'Care-support pathway' })).toBeVisible()
    for (const pillar of [
      'Beyond Second Chances',
      'Restorative Reintegration',
      'Institutional Integrity & Governance',
    ]) {
      expect(screen.getByRole('heading', { level: 3, name: pillar })).toBeVisible()
    }
  })

  it('renders the 10-point job alignment matrix and case vignette', () => {
    render(<Page />)

    expect(screen.getByRole('heading', { name: '10-Point Selarang Job Scope Alignment' })).toBeVisible()
    expect(screen.getByRole('list', { name: 'Job scope responsibilities mapping' })).toBeVisible()
    expect(screen.getByRole('heading', { name: /Selarang Case Vignette/i })).toBeVisible()
    expect(screen.getByRole('tab', { name: '2. The Intervention' })).toBeVisible()
  })

  it('provides real contact, WhatsApp, and application-document links', () => {
    render(<Page />)

    expect(screen.getAllByRole('link', { name: /email john/i })[0]).toHaveAttribute('href', 'mailto:sxk2929@gmail.com')
    expect(screen.getAllByRole('link', { name: /call john/i })[0]).toHaveAttribute('href', 'tel:+6598891383')
    expect(screen.getAllByRole('link', { name: /chat with john on whatsapp/i })[0]).toHaveAttribute(
      'href',
      'https://wa.me/6598891383',
    )
    expect(screen.getAllByRole('link', { name: /download resume/i })[0]).toHaveAttribute(
      'href',
      '/docs/John_Tan_Resume_Case_Manager_Selarang_Halfway_House.pdf',
    )
    expect(screen.getAllByRole('link', { name: /download cover letter/i })[0]).toHaveAttribute(
      'href',
      '/docs/John_Tan_Cover_Letter_Case_Manager_Selarang_Halfway_House.pdf',
    )
    expect(screen.queryByRole('link', { name: /linkedin/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/linkedin/i)).not.toBeInTheDocument()
  })

  it('opens and closes the mobile navigation by selection and Escape', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const menuButton = screen.getByRole('button', { name: 'Open navigation' })
    await user.click(menuButton)
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    await user.click(screen.getByRole('link', { name: 'Evidence' }))
    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false')
  })
})
