'use client'

import { useState } from 'react'
import {
  jobAlignmentMatrix,
} from '../data/profile'

const categories = [
  'All',
  'Rehabilitation & CBP',
  'Holistic Casework',
  'Employment & Visits',
  'SPS & Multi-Agency',
  'Statutory & Records',
] as const

type CategoryFilter = (typeof categories)[number]

export function JobAlignmentMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')
  const [expandedDuties, setExpandedDuties] = useState<Record<number, boolean>>({
    1: true,
    3: true,
    5: true,
  })

  const toggleDuty = (dutyNumber: number) => {
    setExpandedDuties((prev) => ({
      ...prev,
      [dutyNumber]: !prev[dutyNumber],
    }))
  }

  const expandAll = () => {
    const allExpanded: Record<number, boolean> = {}
    jobAlignmentMatrix.forEach((duty) => {
      allExpanded[duty.dutyNumber] = true
    })
    setExpandedDuties(allExpanded)
  }

  const collapseAll = () => {
    setExpandedDuties({})
  }

  const filteredDuties = jobAlignmentMatrix.filter((duty) => {
    if (selectedCategory === 'All') return true
    return duty.category === selectedCategory
  })

  return (
    <section className="section section--alignment" id="alignment" aria-labelledby="alignment-title">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">Direct Requirements Mapping</p>
          <h2 id="alignment-title">10-Point Selarang Job Scope Alignment</h2>
          <p>
            An explicit, duty-by-duty verification showing how John Tan’s SUSS social work studies, active community practice,
            and executive operating depth directly satisfy every responsibility in the Selarang Halfway House Case Manager scope.
          </p>
        </div>

        <div className="matrix-toolbar">
          <div className="matrix-filters" aria-label="Filter duties by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${selectedCategory === cat ? 'filter-chip--active' : ''}`}
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="matrix-toggles">
            <button type="button" className="matrix-toggle-btn" onClick={expandAll}>
              Expand All
            </button>
            <button type="button" className="matrix-toggle-btn" onClick={collapseAll}>
              Collapse All
            </button>
          </div>
        </div>

        <div className="alignment-grid" role="list" aria-label="Job scope responsibilities mapping">
          {filteredDuties.map((duty) => {
            const isExpanded = !!expandedDuties[duty.dutyNumber]
            return (
              <article
                key={duty.dutyNumber}
                className={`alignment-card glass-card ${isExpanded ? 'alignment-card--expanded' : ''}`}
                role="listitem"
              >
                <div
                  className="alignment-card__header"
                  onClick={() => toggleDuty(duty.dutyNumber)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleDuty(duty.dutyNumber)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-controls={`duty-content-${duty.dutyNumber}`}
                >
                  <div className="alignment-card__header-main">
                    <span className="duty-badge">Duty #{duty.dutyNumber < 10 ? `0${duty.dutyNumber}` : duty.dutyNumber}</span>
                    <span className="duty-category-pill">{duty.category}</span>
                    <h3 className="duty-title">{duty.title}</h3>
                  </div>
                  <button
                    type="button"
                    className="duty-accordion-btn"
                    aria-label={isExpanded ? `Collapse duty ${duty.dutyNumber}` : `Expand duty ${duty.dutyNumber}`}
                    tabIndex={-1}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      width="18"
                      height="18"
                      className={`chevron-icon ${isExpanded ? 'chevron-icon--rotated' : ''}`}
                    >
                      <path d="M5 7.5L10 12.5L15 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div
                  id={`duty-content-${duty.dutyNumber}`}
                  className={`alignment-card__content ${isExpanded ? 'alignment-card__content--open' : ''}`}
                >
                  <div className="duty-section duty-section--req">
                    <span className="duty-label">Selarang Halfway House Scope</span>
                    <p className="duty-requirement-text">{duty.officialRequirement}</p>
                  </div>

                  <div className="duty-section duty-section--match">
                    <span className="duty-label duty-label--match">John Tan’s Transferable Strength</span>
                    <p className="duty-match-text">{duty.candidateMatch}</p>
                  </div>

                  <div className="duty-section duty-section--suss">
                    <span className="duty-label duty-label--suss">SUSS Social Work Direct Application</span>
                    <p className="duty-suss-text">{duty.sussRelevance}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
