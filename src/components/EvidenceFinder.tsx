'use client'

import { useMemo, useState } from 'react'
import type { EvidenceCategory, EvidenceItem } from '../data/profile'

const categories = [
  'All',
  'Rehabilitation & CBP',
  'Holistic Casework',
  'Employment & Visits',
  'SPS & Multi-Agency',
  'Statutory & Records',
] as const

type CategoryFilter = (typeof categories)[number]

type EvidenceFinderProps = {
  readonly items: readonly EvidenceItem[]
}

export function EvidenceFinder({ items }: EvidenceFinderProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('All')

  const filteredItems = useMemo(() => {
    const normalisedQuery = query.trim().toLocaleLowerCase()
    return items.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const haystack = `${item.title} ${item.summary} ${item.evidence} ${item.category}`.toLocaleLowerCase()
      return matchesCategory && (!normalisedQuery || haystack.includes(normalisedQuery))
    })
  }, [category, items, query])

  const resultLabel = `${filteredItems.length} ${filteredItems.length === 1 ? 'piece' : 'pieces'} of evidence`

  const reset = () => {
    setQuery('')
    setCategory('All')
  }

  return (
    <div className="evidence-finder glass-card">
      <form className="evidence-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="evidence-query">Search verified competencies & case experience</label>
        <div className="evidence-search__field">
          <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20">
            <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="m13 13 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            id="evidence-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try SUSS, CBP, SPS, employer visits, or documentation"
          />
        </div>
      </form>

      <div className="evidence-filters" aria-label="Filter evidence by category">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`filter-chip ${category === item ? 'filter-chip--active' : ''}`}
            aria-pressed={category === item}
            onClick={() => setCategory(item as EvidenceCategory | 'All')}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="evidence-count" role="status" aria-live="polite">
        {resultLabel}
      </p>

      {filteredItems.length ? (
        <div className="evidence-results">
          {filteredItems.map((item) => (
            <article className="evidence-result glass-card" key={`${item.category}-${item.title}`}>
              <div className="evidence-result__header">
                <span className="evidence-result__category">{item.category}</span>
                {item.jobDutyRef ? (
                  <span className="evidence-result__duty-ref">Matches Duty #{item.jobDutyRef < 10 ? `0${item.jobDutyRef}` : item.jobDutyRef}</span>
                ) : null}
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="evidence-result__proof">
                <span>Demonstrated Practice</span>
                <p>{item.evidence}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="evidence-empty">
          <p>No evidence matches this search.</p>
          <span>Try a broader keyword or reset the filter to view all verified competencies.</span>
          <button type="button" className="button button--secondary" onClick={reset}>
            Reset search
          </button>
        </div>
      )}
    </div>
  )
}
