'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

const navigation = [
  { href: '#fit', label: 'Role Fit' },
  { href: '#alignment', label: 'Job Alignment' },
  { href: '#pathway', label: 'Reintegration Model' },
  { href: '#vignette', label: 'Case Vignette' },
  { href: '#evidence', label: 'Evidence' },
  { href: '#mission', label: 'Yellow Ribbon' },
  { href: '#experience', label: 'Journey' },
  { href: '#credentials', label: 'Qualifications' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <a className="candidate-brand" href="#top" aria-label="John Tan, back to top">
          <span className="candidate-brand__mark" aria-hidden="true">JT</span>
          <div className="candidate-brand__details">
            <span className="candidate-brand__name">John Tan</span>
            <span className="candidate-brand__title">Case Manager · Selarang Halfway House</span>
          </div>
        </a>
        <nav className="desktop-navigation" aria-label="Primary navigation" aria-hidden={open}>
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-contact button button--primary" href="#contact">
          Let’s Talk
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
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="shell">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ))}
              <a href="#contact" className="mobile-nav-contact" onClick={() => setOpen(false)}>
                Let’s Talk
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
