import {
  assignments,
  career,
  competencies,
  credentials,
  evaluationAreas,
  hourBreakdown,
  languages,
  phases,
  practiceStance,
  profile,
  progressMonitoring,
  roles,
  supervisionPlan,
} from '../data/practicum'
import { CompetencyExplorer } from './CompetencyExplorer'
import { ContactLinks } from './ContactLinks'
import { HoursGrid } from './HoursGrid'

function Heading({ id, title, intro }: { readonly id: string; readonly title: string; readonly intro?: string }) {
  return (
    <div className="heading">
      <h2 id={id}>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="shell">
        <div className="hero__intro">
          <div className="hero__copy">
            <p className="hero__kicker">
              Practicum candidate, SUSS {profile.course.split(' ')[0]}
            </p>
            <h1 id="hero-title">{profile.headline}</h1>
            <p className="hero__summary">{profile.summary}</p>
            <ContactLinks />
          </div>
          <dl className="hero__facts">
            <div>
              <dt>Programme</dt>
              <dd>
                {profile.programme}, {profile.university}
              </dd>
            </div>
            <div>
              <dt>Placement sought</dt>
              <dd>{profile.totalHours} hours, {profile.period}; open to any practice setting</dd>
            </div>
            <div>
              <dt>Current practice</dt>
              <dd>NTUC Health, Active Ageing Centre</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>{languages}</dd>
            </div>
          </dl>
        </div>
        <HoursGrid />
      </div>
    </section>
  )
}

export function Competencies() {
  return (
    <section className="section" id="competencies" aria-labelledby="competencies-title">
      <div className="shell">
        <Heading
          id="competencies-title"
          title="Six competencies, one learning objective each"
          intro="These are the SWK512 practicum competencies. For each one I have set what I want to learn, what I will do on placement, and how my supervisor and I will judge progress."
        />
        <CompetencyExplorer />
      </div>
    </section>
  )
}

export function LearningContract() {
  return (
    <section className="section section--tint" id="contract" aria-labelledby="contract-title">
      <div className="shell">
        <Heading
          id="contract-title"
          title="How the work assignments build each competency"
          intro="Each assignment evidences at least one competency, so nothing is written only to be filed. Items marked as portfolio documents are required by SUSS; the rest are my proposals, to be agreed with my Field Educator."
        />
        <div className="matrix" tabIndex={0} role="region" aria-label="Assignment and competency matrix">
          <table>
            <caption className="sr-only">Work assignments mapped to the six practicum competencies</caption>
            <thead>
              <tr>
                <th scope="col">Assignment</th>
                <th scope="col">Due</th>
                {competencies.map((c) => (
                  <th scope="col" key={c.id} title={c.title}>
                    <span aria-hidden="true">{c.number}</span>
                    <span className="sr-only">{c.title}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.code}>
                  <th scope="row">
                    <span className="code">{a.code}</span> {a.title}
                    {a.portfolio ? <span className="tag">Portfolio document</span> : null}
                    <span className="matrix__desc">{a.description}</span>
                  </th>
                  <td className="matrix__due">{a.ongoing ? 'Fortnightly' : `Week ${a.dueWeek}`}</td>
                  {competencies.map((c) => (
                    <td key={c.id} className="matrix__mark">
                      {a.competencies.includes(c.id) ? (
                        <>
                          <span className="dot" aria-hidden="true" />
                          <span className="sr-only">Builds {c.title}</span>
                        </>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ol className="matrix__key" aria-label="Competency key">
          {competencies.map((c) => (
            <li key={c.id}>{c.title}</li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Schedule() {
  return (
    <section className="section" id="schedule" aria-labelledby="schedule-title">
      <div className="shell">
        <Heading
          id="schedule-title"
          title="Submission schedule across four phases"
          intro="Milestones are set by hours clocked, so the plan holds even if the weekly pace changes. Hours lost to public holidays or leave do not count and are made up in later weeks."
        />
        <div className="breakdown" aria-label="How the 400 hours are made up">
          <div className="breakdown__bar" aria-hidden="true">
            {hourBreakdown.map((b) => (
              <span key={b.label} style={{ flexGrow: b.hours }} />
            ))}
          </div>
          <ul>
            {hourBreakdown.map((b) => (
              <li key={b.label}>
                <strong>{b.hours} hours</strong> {b.label.toLowerCase()}
              </li>
            ))}
          </ul>
        </div>
        <ol className="phases">
          {phases.map((p) => (
            <li key={p.number} className={`phase phase--p${p.number}`}>
              <div className="phase__head">
                <span className="phase__num" aria-hidden="true">
                  {p.number}
                </span>
                <div>
                  <h3>{p.title}</h3>
                  <p className="phase__meta">
                    Weeks {p.weeks[0]} to {p.weeks[1]}, hours {(p.weeks[0] - 1) * profile.hoursPerWeek + 1} to{' '}
                    {p.weeks[1] * profile.hoursPerWeek}
                  </p>
                </div>
              </div>
              <p>{p.focus}</p>
              <ul>
                {p.milestones.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Evaluation() {
  return (
    <section className="section section--tint" id="evaluation" aria-labelledby="evaluation-title">
      <div className="shell">
        <Heading
          id="evaluation-title"
          title="Evaluation plan"
          intro="What is assessed, with which tools, by whom and when. Formal ratings use the SUSS mid-practicum and final evaluation forms."
        />
        <div className="eval">
          <div className="eval__table" tabIndex={0} role="region" aria-label="Evaluation areas and tools">
            <table>
              <thead>
                <tr>
                  <th scope="col">Area evaluated</th>
                  <th scope="col">Tools and evidence</th>
                  <th scope="col">Assessed by</th>
                  <th scope="col">When</th>
                </tr>
              </thead>
              <tbody>
                {evaluationAreas.map((e) => (
                  <tr key={e.area}>
                    <th scope="row">{e.area}</th>
                    <td>{e.tools}</td>
                    <td>{e.by}</td>
                    <td>{e.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className="eval__monitor">
            <h3>How progress is monitored</h3>
            <ul>
              {progressMonitoring.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export function Supervision() {
  return (
    <section className="section" id="supervision" aria-labelledby="supervision-title">
      <div className="shell">
        <Heading
          id="supervision-title"
          title="Supervision plan and shared responsibilities"
          intro="Supervision is where most of the learning happens. I come prepared, and I bring what went badly as readily as what went well."
        />
        <div className="supervision">
          <dl className="supervision__list">
            {supervisionPlan.map((s) => (
              <div key={s.forum}>
                <dt>
                  {s.forum}
                  <span>{s.cadence}</span>
                </dt>
                <dd>{s.purpose}</dd>
              </div>
            ))}
          </dl>
          <div className="roles">
            {roles.map((r) => (
              <div key={r.who} className="roles__item">
                <h3>{r.who}</h3>
                <ul>
                  {r.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Stance() {
  return (
    <section className="section section--navy" id="stance" aria-labelledby="stance-title">
      <div className="shell">
        <Heading
          id="stance-title"
          title="How I intend to practise"
          intro="Guided by the Code of Professional Ethics for social workers in Singapore, and by three working commitments."
        />
        <div className="stance">
          {practiceStance.map((s) => (
            <div key={s.title} className="stance__item">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Background() {
  return (
    <section className="section" id="background" aria-labelledby="background-title">
      <div className="shell">
        <Heading
          id="background-title"
          title="Background"
          intro="Social service is my second career. Earlier work gave me organisation, documentation and stakeholder skills; social work training is giving me the rest."
        />
        <div className="background">
          <div>
            <h3>Experience</h3>
            <ol className="timeline">
              {career.map((c) => (
                <li key={c.role}>
                  <p className="timeline__period">{c.period}</p>
                  <p className="timeline__role">
                    {c.role}, {c.organisation}
                  </p>
                  <p>{c.summary}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3>Education</h3>
            <ul className="creds">
              {credentials.map((c) => (
                <li key={c.qualification}>
                  <p className="timeline__period">{c.period}</p>
                  <p className="timeline__role">{c.qualification}</p>
                  <p>{c.institution}</p>
                  {c.detail ? <p className="creds__detail">{c.detail}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="section section--navy contact" id="contact" aria-labelledby="contact-title">
      <div className="shell">
        <h2 id="contact-title">Talk to me about a placement</h2>
        <p>
          I would welcome a conversation with practicum coordinators and field supervisors in any setting. I can share my
          learning contract draft and adapt it to your agency.
        </p>
        <ContactLinks context="footer" />
      </div>
    </section>
  )
}
