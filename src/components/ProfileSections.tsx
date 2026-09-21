import Image from 'next/image'
import {
  capabilityGroups,
  career,
  casePathway,
  credentials,
  languages,
  missionAlignment,
  profile,
  roleFit,
} from '../data/profile'
import { ContactLinks } from './ContactLinks'
import { MotionReveal } from './MotionReveal'

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  readonly id: string
  readonly eyebrow: string
  readonly title: string
  readonly intro: string
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <p>{intro}</p>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__ribbon-bg" aria-hidden="true">
        <svg viewBox="0 0 400 400" className="hero__ribbon-svg" fill="none">
          <path
            d="M50 350 C100 200, 250 100, 350 50 C280 180, 180 280, 50 350 Z"
            fill="url(#heroRibbonGrad)"
            opacity="0.08"
          />
          <defs>
            <linearGradient id="heroRibbonGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="care-thread care-thread--hero" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="shell hero__layout">
        <MotionReveal className="hero__copy">
          <div className="hero__eyebrow-wrapper">
            <span className="hero-tag">Candidate Dossier</span>
            <span className="hero-role-tag">{profile.targetRole} · {profile.targetFacility}</span>
          </div>
          <h1 id="hero-title">{profile.headline}</h1>
          <p className="hero__role">{profile.targetRoleContext}</p>
          <p className="hero__summary">{profile.summary}</p>

          <div className="hero__highlights">
            <div className="hero-highlight-pill hero-highlight-pill--primary">
              <span className="pill-dot" />
              <strong>SUSS Graduate Diploma in Social Work</strong> (Currently Pursuing)
            </div>
            <div className="hero-highlight-pill">
              <span className="pill-dot" />
              <strong>Active Ground Casework</strong> (NTUC Health AAC)
            </div>
            <div className="hero-highlight-pill">
              <span className="pill-dot" />
              <strong>High-Stakes Governance & Traceability</strong> (ST Engineering · Banking Director)
            </div>
          </div>

          <p className="language-proof">
            <span>Languages</span>
            {languages}
          </p>
          <ContactLinks />
        </MotionReveal>

        <MotionReveal className="application-dossier glass-card">
          <div className="application-for">
            <span className="application-for__sub">Candidate Profile Prepared For</span>
            <div className="application-for__brand">
              <Image
                src="/brand/yellow-ribbon-logo.svg"
                alt="Yellow Ribbon Singapore - Selarang Halfway House logo"
                width={260}
                height={65}
                priority
              />
            </div>
            <strong>{profile.targetOrganisation}</strong>
          </div>
          <p className="dossier__label">Candidate Brief</p>
          <blockquote>
            “Empathetic human connection, guided by psychology-informed interventions and uncompromising documentation discipline.”
          </blockquote>
          <dl className="dossier__facts">
            <div>
              <dt>Target Position</dt>
              <dd>Case Manager</dd>
            </div>
            <div>
              <dt>Facility</dt>
              <dd>Selarang Halfway House</dd>
            </div>
            <div>
              <dt>Academic Focus</dt>
              <dd className="dossier__highlight">Grad Dip in Social Work (SUSS)</dd>
            </div>
            <div>
              <dt>Current Practice</dt>
              <dd>NTUC Health Active Ageing Centre</dd>
            </div>
            <div>
              <dt>Prior Governance</dt>
              <dd>Director (Banking) & Software Engineer</dd>
            </div>
          </dl>
          <div className="dossier__footer">
            <span className="dossier__name">{profile.name}</span>
            <span className="dossier__location">{profile.location} · Available Immediately</span>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}

export function RoleFit() {
  return (
    <section className="section section--fit" id="fit" aria-labelledby="fit-title">
      <div className="shell">
        <SectionHeading
          id="fit-title"
          eyebrow="Target Competencies"
          title="Evidence for High-Impact Case Management"
          intro="Five operational pillars matching the daily demands of Selarang Halfway House: psychology-informed group work, holistic family linkages, employer job-site engagement, SPS co-management, and statutory record keeping."
        />
        <div className="role-grid">
          {roleFit.map((item, index) => (
            <MotionReveal className="role-card glass-card" key={item.title}>
              <div className="role-card__meta">
                <span className="role-card__index">0{index + 1}</span>
                <span className="role-card__category">{item.category}</span>
                {item.jobDutyRef ? (
                  <span className="role-card__duty-badge">Duty #{item.jobDutyRef < 10 ? `0${item.jobDutyRef}` : item.jobDutyRef}</span>
                ) : null}
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="role-card__proof">
                <span>In Practice</span>
                <p>{item.evidence}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CarePathway() {
  return (
    <section className="section section--pathway" id="pathway" aria-labelledby="pathway-title">
      <div className="shell">
        <SectionHeading
          id="pathway-title"
          eyebrow="Correctional Reintegration Model"
          title="A 5-Stage Pathway from Admission to Sustainable Desistance"
          intro="A structured, psychology-informed casework rhythm designed for Selarang Halfway House residents under the Community-Based Programme (CBP)."
        />
        <ol className="case-pathway" aria-label="Care-support pathway">
          {casePathway.map((item) => (
            <li key={item.step} className="case-pathway__card glass-card">
              <span className="case-pathway__index">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="case-pathway__actions">
                <span className="actions-label">Key Actions:</span>
                <ul>
                  {item.keyActions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function MissionAlignment() {
  return (
    <section className="section section--mission" id="mission" aria-labelledby="mission-title">
      <div className="shell mission-layout">
        <div className="mission-intro">
          <SectionHeading
            id="mission-title"
            eyebrow="Yellow Ribbon Singapore Philosophy"
            title="Beyond Second Chances: Rebuilding Lives and Restoring Hope"
            intro="Deeply committed to the core philosophy of Yellow Ribbon Singapore and Selarang Halfway House—fostering community acceptance, personal accountability, and purposeful social reintegration."
          />
          <div className="mission-quote glass-card">
            <p className="human-note">“Every individual possesses the capacity for change when met with genuine belief, practical structure, and unwavering community support.”</p>
          </div>
        </div>
        <div className="mission-grid">
          {missionAlignment.map((item) => (
            <article key={item.title} className="mission-card glass-card">
              <p className="mission-grid__values">{item.values.join(' · ')}</p>
              <h3>{item.title}</h3>
              <p>{item.commitment}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CareerTransition() {
  return (
    <section className="section section--experience" id="experience" aria-labelledby="experience-title">
      <div className="shell experience-layout">
        <div className="experience-copy">
          <SectionHeading
            id="experience-title"
            eyebrow="Career Transition & Operating Depth"
            title="A Deliberate Move into Social Service"
            intro="Current community social-service practice leads the story. Prior executive leadership across technology and global banking contributes uncompromising statutory discipline, calm crisis resolution, and executive stakeholder liaison."
          />
          <div className="capability-groups">
            {capabilityGroups.map((group) => (
              <div key={group.label} className="capability-card glass-card">
                <h3>{group.label}</h3>
                <p>{group.skills.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
        <ol className="career-timeline" aria-label="Career history">
          {career.map((item) => (
            <li key={`${item.period}-${item.role}`} className="career-timeline__item glass-card">
              <div className="career-timeline__meta">
                <span className="career-period">{item.period}</span>
                {item.current ? <span className="current-badge">Current Practice</span> : null}
              </div>
              <h3>{item.role}</h3>
              <p className="career-timeline__organisation">{item.organisation}</p>
              <p>{item.summary}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Credentials() {
  return (
    <section className="section section--credentials" id="credentials" aria-labelledby="credentials-title">
      <div className="shell">
        <SectionHeading
          id="credentials-title"
          eyebrow="Academic & Professional Qualifications"
          title="Lifelong Learning Grounded in Social Work"
          intro="Formal social work education at SUSS provides the theoretical and ethical foundation for direct casework practice, complemented by professional social service diplomas and executive credentials."
        />
        <div className="credentials-layout">
          <div className="credentials-grid">
            {credentials.map((item) => (
              <article
                className={`credential-card glass-card${item.featured ? ' credential-card--featured' : ''}`}
                key={`${item.qualification}-${item.institution}`}
              >
                {item.featured ? (
                  <span className="credential-tag">Formal Social Work Study · Current Enrolment</span>
                ) : null}
                <p className="credential-card__period">{item.period}</p>
                <h3>{item.qualification}</h3>
                <p className="credential-card__institution">{item.institution}</p>
                {item.detail ? <p className="credential-card__detail">{item.detail}</p> : null}
              </article>
            ))}
          </div>
          <aside className="communication-card glass-card" aria-label="Languages and digital readiness">
            <p className="eyebrow">Communication & Digital Systems</p>
            <h3>{languages}</h3>
            <p className="communication-sub">
              Fluent English for high-level statutory reporting, executive case conference briefs, and inter-agency documentation;
              conversational Mandarin and Cantonese for empathetic ground engagement with residents, senior employers, and extended family members.
            </p>
            <div className="tool-chips">
              <span>Electronic Case Management</span>
              <span>SPS Compliance Logs</span>
              <span>Statistical Reporting</span>
              <span>Trauma-Informed Practice</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="shell contact__inner">
        <p className="eyebrow">A Thoughtful Case Manager · A Dependable Pair of Hands</p>
        <h2 id="contact-title">Ready to Serve at Selarang Halfway House</h2>
        <p>
          I welcome the opportunity to discuss with the Senior/Assistant Director (Programme) and Lead Case Manager how my SUSS social work grounding,
          active community casework, and executive operating maturity will contribute to Selarang Halfway House’s rehabilitative mission.
        </p>
        <ContactLinks context="footer" />
      </div>
    </section>
  )
}
