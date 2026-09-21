import { describe, expect, it } from 'vitest'
import {
  capabilityGroups,
  career,
  casePathway,
  credentials,
  evidenceItems,
  jobAlignmentMatrix,
  languages,
  missionAlignment,
  profile,
  roleFit,
} from '../src/data/profile'

const publishedContent = JSON.stringify({
  capabilityGroups,
  career,
  casePathway,
  credentials,
  evidenceItems,
  jobAlignmentMatrix,
  languages,
  missionAlignment,
  profile,
  roleFit,
})

describe('Selarang Halfway House Case Manager profile content', () => {
  it('targets the approved role and facility with dedicated application assets', () => {
    expect(profile).toMatchObject({
      targetRole: 'Case Manager',
      targetFacility: 'Selarang Halfway House',
      resume: '/docs/John_Tan_Resume_Case_Manager_Selarang_Halfway_House.pdf',
      coverLetter: '/docs/John_Tan_Cover_Letter_Case_Manager_Selarang_Halfway_House.pdf',
    })
    expect(profile.targetOrganisation).toContain('Yellow Ribbon')
    expect(profile.headline).toBe('Guiding Reintegration with Empathy, Structure, and Purpose.')
  })

  it('emphasizes current enrolment in Graduate Diploma in Social Work at SUSS', () => {
    expect(credentials[0]).toMatchObject({
      qualification: 'Graduate Diploma in Social Work',
      institution: 'Singapore University of Social Sciences (SUSS)',
      period: 'Currently enrolled',
      featured: true,
    })
    expect(credentials[1]).toMatchObject({
      qualification: 'Diploma in Social Service',
      institution: 'Hua Mei Training Academy, Tsao Foundation',
      period: 'Jan 2026 — Jun 2026',
    })
    expect(career[0]).toMatchObject({
      period: 'Jun 2026 — Present',
      role: 'Programme Associate',
      organisation: 'NTUC Health — Active Ageing Centre',
    })
    expect(languages).toBe('English fluent; Mandarin and Cantonese conversational.')
  })

  it('maps all 10 core job responsibilities from MyCareersFuture in the alignment matrix', () => {
    expect(jobAlignmentMatrix).toHaveLength(10)
    for (let i = 1; i <= 10; i++) {
      const duty = jobAlignmentMatrix.find((d) => d.dutyNumber === i)
      expect(duty).toBeDefined()
      expect(duty?.officialRequirement.length).toBeGreaterThan(20)
      expect(duty?.candidateMatch.length).toBeGreaterThan(20)
      expect(duty?.sussRelevance).toContain('SUSS')
    }
  })

  it('maps the Selarang 5-stage reintegration pathway and correctional evidence categories', () => {
    expect(casePathway.map(({ step }) => step)).toEqual(['01', '02', '03', '04', '05'])
    expect(casePathway[0].title).toBe('Intake & Bio-Psycho-Social Assessment')
    expect(casePathway[1].title).toBe('Psychology-Informed CBP Interventions')
    expect(casePathway[2].title).toBe('Employment Stability & Job-Site Visits')
    expect(casePathway[3].title).toBe('SPS Co-Case Conferences & Progress Reviews')
    expect(casePathway[4].title).toBe('Community Re-Entry & Sustainable Desistance')

    expect(new Set(evidenceItems.map(({ category }) => category))).toEqual(
      new Set([
        'Rehabilitation & CBP',
        'Holistic Casework',
        'Employment & Visits',
        'SPS & Multi-Agency',
        'Statutory & Records',
      ]),
    )
    expect(roleFit).toHaveLength(5)
  })

  it('aligns with Yellow Ribbon core values without overstating experience', () => {
    for (const title of ['Beyond Second Chances', 'Restorative Reintegration', 'Institutional Integrity & Governance']) {
      expect(missionAlignment.map(({ title: t }) => t)).toContain(title)
    }
    for (const val of ['Hope', 'Dignity', 'Second Chances', 'Empathy', 'Integrity']) {
      expect(publishedContent).toContain(val)
    }
    expect(publishedContent).not.toMatch(/Care Corner|Jojo|oncology|365 Cancer Prevention Society/i)
  })
})
