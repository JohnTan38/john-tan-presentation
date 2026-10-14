'use client'

import { useEffect, useState } from 'react'
import { profile } from '../data/practicum'

const navigation = [
  { href: '#competencies', label: 'Competencies' },
  { href: '#contract', label: 'Assignments' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#evaluation', label: 'Evaluation' },
  { href: '#supervision', label: 'Supervision' },
  { href: '#background', label: 'Background' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a className="brand" href="#top" aria-label="John Tan, back to top">
          <span className="brand__mark" aria-hidden="true">
            JT
          </span>
          <span className="brand__name">{profile.name}</span>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button--small" href="#contact">
          Contact
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>
      {open ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <div className="shell">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}>
              Contact
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
