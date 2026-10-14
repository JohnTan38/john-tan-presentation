'use client'

import { useId, useState } from 'react'
import { assignments, competencies, type CompetencyId } from '../data/practicum'

export function CompetencyExplorer() {
  const [active, setActive] = useState<CompetencyId>('C1')
  const baseId = useId()
  const current = competencies.find((c) => c.id === active) ?? competencies[0]
  const linked = assignments.filter((a) => a.competencies.includes(current.id))

  const move = (offset: number) => {
    const index = competencies.findIndex((c) => c.id === active)
    const next = competencies[(index + offset + competencies.length) % competencies.length]
    setActive(next.id)
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus()
  }

  return (
    <div className="competencies">
      <div
        className="competencies__tabs"
        role="tablist"
        aria-label="SWK512 practicum competencies"
        aria-orientation="vertical"
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            event.preventDefault()
            move(1)
          } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            event.preventDefault()
            move(-1)
          }
        }}
      >
        {competencies.map((c) => (
          <button
            key={c.id}
            id={`${baseId}-tab-${c.id}`}
            type="button"
            role="tab"
            aria-selected={c.id === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={c.id === active ? 0 : -1}
            className="competencies__tab"
            onClick={() => setActive(c.id)}
          >
            <span className="competencies__num" aria-hidden="true">
              {c.number}
            </span>
            {c.title}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${current.id}`}
        className="competencies__panel"
        tabIndex={0}
        key={current.id}
      >
        <h3>{current.title}</h3>
        <p className="competencies__objective">{current.objective}</p>

        <div className="competencies__cols">
          <div>
            <h4>What I will do</h4>
            <ul>
              {current.activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>How we will know</h4>
            <ul>
              {current.indicators.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <h4>Linked work assignments</h4>
        <ul className="competencies__assignments">
          {linked.map((a) => (
            <li key={a.code}>
              <span className="code">{a.code}</span> {a.title}
              <span className="competencies__due">{a.ongoing ? 'every week' : `week ${a.dueWeek}`}</span>
            </li>
          ))}
        </ul>

        <aside className="competencies__foundation">
          <h4>What I bring, honestly</h4>
          <p>{current.foundation}</p>
        </aside>
      </div>
    </div>
  )
}
