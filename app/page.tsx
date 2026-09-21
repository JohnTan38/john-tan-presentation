import { CaseVignette } from '@/src/components/CaseVignette'
import { EvidenceFinder } from '@/src/components/EvidenceFinder'
import { Header } from '@/src/components/Header'
import { JobAlignmentMatrix } from '@/src/components/JobAlignmentMatrix'
import {
  CarePathway,
  CareerTransition,
  Contact,
  Credentials,
  Hero,
  MissionAlignment,
  RoleFit,
} from '@/src/components/ProfileSections'
import { evidenceItems, profile } from '@/src/data/profile'

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <RoleFit />
        <JobAlignmentMatrix />
        <CarePathway />
        <CaseVignette />
        <section className="section section--evidence" id="evidence" aria-labelledby="evidence-title">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">Verified Competencies</p>
              <h2 id="evidence-title">Find the Proof Behind the Profile</h2>
              <p>
                Search specific evidence across correctional group work, casework assessments, employer visits, SPS co-management, and statutory documentation.
              </p>
            </div>
            <EvidenceFinder items={evidenceItems} />
          </div>
        </section>
        <MissionAlignment />
        <CareerTransition />
        <Credentials />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="shell site-footer__inner">
          <a className="candidate-brand" href="#top" aria-label="John Tan, back to top">
            <span className="candidate-brand__mark" aria-hidden="true">JT</span>
            <div className="candidate-brand__details">
              <span className="candidate-brand__name">{profile.name}</span>
              <span className="candidate-brand__title">Case Manager Candidate · Selarang Halfway House</span>
            </div>
          </a>
          <p className="site-footer__org">
            Yellow Ribbon Industries · Singapore Prison Service Co-Management
          </p>
          <a
            href={profile.website}
            target="_blank"
            rel="noreferrer"
            className="site-footer__link"
          >
            john-tan-presentation.vercel.app
          </a>
        </div>
      </footer>
    </>
  )
}
