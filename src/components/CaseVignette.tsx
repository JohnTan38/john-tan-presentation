'use client'

import { useState } from 'react'
import { caseVignette } from '../data/profile'

export function CaseVignette() {
  const [activeTab, setActiveTab] = useState<'situation' | 'intervention' | 'outcome'>('intervention')

  return (
    <section className="section section--vignette" id="vignette" aria-labelledby="vignette-title">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">Practice in Action</p>
          <h2 id="vignette-title">Selarang Case Vignette: Workplace Crisis & Relapse Intervention</h2>
          <p>
            A realistic illustration of how John Tan applies trauma-informed de-escalation, proactive employer engagement,
            and close Singapore Prison Service (SPS) alignment to resolve critical resident crises during Community-Based Programmes.
          </p>
        </div>

        <div className="vignette-card glass-card">
          <div className="vignette-header">
            <span className="vignette-badge">CBP Case Scenario</span>
            <h3 className="vignette-title">{caseVignette.phase}</h3>
          </div>

          <div className="vignette-tabs" role="tablist" aria-label="Case vignette breakdown">
            <button
              type="button"
              role="tab"
              id="tab-situation"
              aria-selected={activeTab === 'situation'}
              aria-controls="panel-situation"
              className={`vignette-tab ${activeTab === 'situation' ? 'vignette-tab--active' : ''}`}
              onClick={() => setActiveTab('situation')}
            >
              1. The Situation
            </button>
            <button
              type="button"
              role="tab"
              id="tab-intervention"
              aria-selected={activeTab === 'intervention'}
              aria-controls="panel-intervention"
              className={`vignette-tab ${activeTab === 'intervention' ? 'vignette-tab--active' : ''}`}
              onClick={() => setActiveTab('intervention')}
            >
              2. The Intervention
            </button>
            <button
              type="button"
              role="tab"
              id="tab-outcome"
              aria-selected={activeTab === 'outcome'}
              aria-controls="panel-outcome"
              className={`vignette-tab ${activeTab === 'outcome' ? 'vignette-tab--active' : ''}`}
              onClick={() => setActiveTab('outcome')}
            >
              3. The Outcome
            </button>
          </div>

          <div className="vignette-panels">
            {activeTab === 'situation' && (
              <div id="panel-situation" role="tabpanel" aria-labelledby="tab-situation" className="vignette-panel">
                <div className="vignette-panel__icon">
                  <svg aria-hidden="true" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div>
                  <h4>CBP Resident Vulnerability & Workplace Trigger</h4>
                  <p>{caseVignette.situation}</p>
                  <div className="vignette-callout">
                    <strong>Critical Risk Factors:</strong> Impulsive job abandonment, violation of CBP release conditions, heightened vulnerability to relapse, loss of income.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'intervention' && (
              <div id="panel-intervention" role="tabpanel" aria-labelledby="tab-intervention" className="vignette-panel">
                <div className="vignette-panel__icon vignette-panel__icon--success">
                  <svg aria-hidden="true" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h4>Multi-Pronged Case Management Intervention</h4>
                  <p>{caseVignette.intervention}</p>
                  <div className="vignette-pillars">
                    <div className="vignette-pillar">
                      <span className="pillar-num">A</span>
                      <h5>Resident Grounding</h5>
                      <p>Trauma-informed active listening, emotion regulation, cognitive restructuring.</p>
                    </div>
                    <div className="vignette-pillar">
                      <span className="pillar-num">B</span>
                      <h5>Job-Site Employer Liaison</h5>
                      <p>Executive communication with supervisor, clarifying expectations & feedback pathways.</p>
                    </div>
                    <div className="vignette-pillar">
                      <span className="pillar-num">C</span>
                      <h5>SPS Co-Management</h5>
                      <p>Proactive update to SPS Reintegration Officer, updating case logs & risk monitoring.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'outcome' && (
              <div id="panel-outcome" role="tabpanel" aria-labelledby="tab-outcome" className="vignette-panel">
                <div className="vignette-panel__icon vignette-panel__icon--gold">
                  <svg aria-hidden="true" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <div>
                  <h4>Measurable Rehabilitative Success</h4>
                  <p>{caseVignette.outcome}</p>
                  <div className="vignette-results-grid">
                    <div className="vignette-result-stat">
                      <strong>100%</strong>
                      <span>Employment Retention</span>
                    </div>
                    <div className="vignette-result-stat">
                      <strong>0</strong>
                      <span>Disciplinary Infractions</span>
                    </div>
                    <div className="vignette-result-stat">
                      <strong>Safe</strong>
                      <span>Step-down to Home Detention</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
