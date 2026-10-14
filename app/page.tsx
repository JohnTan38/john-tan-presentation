import { Header } from '@/src/components/Header'
import {
  Background,
  Competencies,
  Contact,
  Evaluation,
  Hero,
  LearningContract,
  Schedule,
  Stance,
  Supervision,
} from '@/src/components/Sections'
import { profile } from '@/src/data/practicum'

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Competencies />
        <LearningContract />
        <Schedule />
        <Evaluation />
        <Supervision />
        <Stance />
        <Background />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="shell site-footer__inner">
          <p>
            {profile.name}, {profile.programme} student, {profile.university}
          </p>
          <p>Practicum plan proposed for {profile.course}. Final objectives are agreed with the placement agency.</p>
        </div>
      </footer>
    </>
  )
}
