'use client'

import { useState } from 'react'
import { assignmentsDueInWeek, phaseForWeek, phases, profile } from '../data/practicum'

const weeks = Array.from({ length: profile.weeks }, (_, index) => index + 1)
const cells = Array.from({ length: profile.hoursPerWeek }, (_, index) => index)
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Monday of a 1-based practicum week, formatted without locale or time-zone drift. */
export function weekStart(week: number): string {
  const date = new Date(`${profile.startDate}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + (week - 1) * 7)
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

export function HoursGrid() {
  const [week, setWeek] = useState(1)
  const phase = phaseForWeek(week)
  const due = assignmentsDueInWeek(week)
  const firstHour = (week - 1) * profile.hoursPerWeek + 1
  const lastHour = week * profile.hoursPerWeek

  return (
    <figure className="hours" aria-labelledby="hours-caption">
      <figcaption id="hours-caption" className="hours__caption">
        <span className="hours__total">{profile.totalHours} hours</span>
        <span>
          About {profile.hoursPerWeek} hours a week across the {profile.weeks}-week practicum period, {profile.period}.
          Each square is one hour; choose a week to see what happens in it.
        </span>
      </figcaption>

      <div className="hours__grid" role="group" aria-label="Practicum weeks">
        {weeks.map((w) => {
          const p = phaseForWeek(w)
          const hasDue = assignmentsDueInWeek(w).length > 0
          return (
            <button
              key={w}
              type="button"
              className={`hours__week hours__week--p${p.number}${w === week ? ' hours__week--active' : ''}`}
              aria-pressed={w === week}
              aria-label={`Week ${w}, phase ${p.number}${hasDue ? ', submission due' : ''}`}
              onClick={() => setWeek(w)}
              style={{ ['--w' as string]: w }}
            >
              {cells.map((c) => (
                <span key={c} className="hours__cell" aria-hidden="true" />
              ))}
              {hasDue ? <span className="hours__due" aria-hidden="true" /> : null}
            </button>
          )
        })}
      </div>

      <ul className="hours__legend" aria-label="Phases">
        {phases.map((p) => (
          <li key={p.number} className={`hours__legend-item hours__legend-item--p${p.number}`}>
            <span className="hours__swatch" aria-hidden="true" />
            Phase {p.number}: {p.title}
          </li>
        ))}
        <li className="hours__legend-item hours__legend-item--due">
          <span className="hours__swatch" aria-hidden="true" />
          Submission due
        </li>
      </ul>

      <div className="hours__detail" role="status" aria-live="polite">
        <p className="hours__detail-week">
          Week {week}
          <span>
            From {weekStart(week)}, hours {firstHour} to {lastHour}
          </span>
        </p>
        <p className="hours__detail-phase">
          Phase {phase.number}, {phase.title.toLowerCase()}. {phase.focus}
        </p>
        <p className="hours__detail-due">
          {due.length
            ? `Due this week: ${due.map((a) => `${a.title} (${a.code})`).join(', ')}.`
            : 'No submission due this week.'}
        </p>
      </div>
    </figure>
  )
}
