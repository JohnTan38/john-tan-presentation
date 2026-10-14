import { describe, expect, it } from 'vitest'
import {
  assignments,
  assignmentsDueInWeek,
  career,
  competencies,
  credentials,
  evaluationAreas,
  hourBreakdown,
  phaseForWeek,
  phases,
  practiceStance,
  profile,
  supervisionPlan,
} from '../src/data/practicum'

const published = JSON.stringify({ assignments, career, competencies, credentials, evaluationAreas, phases, practiceStance, profile, supervisionPlan })

describe('SWK512 practicum plan', () => {
  it('targets the SUSS practicum with a practicum resume', () => {
    expect(profile.course).toBe('SWK512 Social Work Practicum and Field Seminar')
    expect(profile.university).toBe('Singapore University of Social Sciences (SUSS)')
    expect(profile.resume).toBe('/docs/John_Tan_Resume_SWK512_Practicum.pdf')
  })

  it('covers all six practicum competencies, each with objective, activities, indicators and assignments', () => {
    expect(competencies.map((c) => c.id)).toEqual(['C1', 'C2', 'C3', 'C4', 'C5', 'C6'])
    for (const c of competencies) {
      expect(c.objective.length).toBeGreaterThan(40)
      expect(c.activities.length).toBeGreaterThanOrEqual(3)
      expect(c.indicators.length).toBeGreaterThanOrEqual(3)
      expect(assignments.some((a) => a.competencies.includes(c.id))).toBe(true)
    }
  })

  it('adds up to exactly 400 hours across contiguous phases', () => {
    expect(phases.reduce((sum, p) => sum + p.hours, 0)).toBe(profile.totalHours)
    expect(profile.weeks * profile.hoursPerWeek).toBe(profile.totalHours)
    for (const p of phases) {
      expect((p.weeks[1] - p.weeks[0] + 1) * profile.hoursPerWeek).toBe(p.hours)
    }
    expect(phases[0].weeks[0]).toBe(1)
    expect(phases.at(-1)?.weeks[1]).toBe(profile.weeks)
  })

  it('schedules every one-off assignment inside the placement and in a phase', () => {
    for (const a of assignments) {
      expect(a.dueWeek).toBeGreaterThanOrEqual(1)
      expect(a.dueWeek).toBeLessThanOrEqual(profile.weeks)
      expect(phaseForWeek(a.dueWeek)).toBeDefined()
    }
    expect(assignmentsDueInWeek(8).map((a) => a.code)).toEqual(['A1'])
    expect(assignmentsDueInWeek(1).map((a) => a.code)).toEqual([])
    expect(() => phaseForWeek(41)).toThrow(RangeError)
  })

  it('follows the SUSS hours structure and milestones', () => {
    expect(hourBreakdown.reduce((sum, b) => sum + b.hours, 0)).toBe(400)
    expect(hourBreakdown.map((b) => b.hours)).toEqual([365, 20, 15])
    const contract = assignments.find((a) => a.code === 'A1')!
    const midpoint = assignments.find((a) => a.code === 'A6')!
    expect(contract.dueWeek * profile.hoursPerWeek).toBe(80)
    expect(midpoint.dueWeek * profile.hoursPerWeek).toBeGreaterThanOrEqual(180)
    expect(midpoint.dueWeek * profile.hoursPerWeek).toBeLessThanOrEqual(200)
    expect(assignments.filter((a) => a.portfolio).map((a) => a.code)).toEqual(['A1', 'A3', 'A4', 'A6', 'A12'])
  })

  it('has evaluation, monitoring and supervision content', () => {
    expect(evaluationAreas.length).toBeGreaterThanOrEqual(6)
    expect(supervisionPlan.map((s) => s.forum)).toContain('Individual supervision')
  })

  it('does not carry over claims from the Selarang job application', () => {
    expect(published).not.toMatch(/SPS|Selarang|Yellow Ribbon|zero log backlog|six years|CBP/)
  })
})
