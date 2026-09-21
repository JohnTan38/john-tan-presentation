export type EvidenceCategory =
  | 'Rehabilitation & CBP'
  | 'Holistic Casework'
  | 'Employment & Visits'
  | 'SPS & Multi-Agency'
  | 'Statutory & Records'

export type EvidenceItem = {
  readonly title: string
  readonly summary: string
  readonly evidence: string
  readonly category: EvidenceCategory
  readonly jobDutyRef?: number
}

export type JobAlignmentDuty = {
  readonly dutyNumber: number
  readonly title: string
  readonly officialRequirement: string
  readonly candidateMatch: string
  readonly sussRelevance: string
  readonly category: EvidenceCategory
}

export type CasePathwayStep = {
  readonly step: string
  readonly title: string
  readonly description: string
  readonly keyActions: readonly string[]
}

export type MissionItem = {
  readonly title: string
  readonly commitment: string
  readonly values: readonly string[]
}

export type CareerItem = {
  readonly period: string
  readonly role: string
  readonly organisation: string
  readonly summary: string
  readonly current?: boolean
}

export type Credential = {
  readonly qualification: string
  readonly institution: string
  readonly period: string
  readonly detail?: string
  readonly featured?: boolean
}

export type CaseVignetteStep = {
  readonly phase: string
  readonly situation: string
  readonly intervention: string
  readonly outcome: string
}

export const profile = {
  name: 'John Tan',
  targetRole: 'Case Manager',
  targetRoleContext: 'Rehabilitation, Reintegration & Case Management',
  targetFacility: 'Selarang Halfway House',
  targetOrganisation: 'Yellow Ribbon Industries (wholly owned by Yellow Ribbon Singapore)',
  location: 'Singapore',
  email: 'sxk2929@gmail.com',
  phoneDisplay: '+65 9889 1383',
  phoneHref: '+6598891383',
  whatsappHref: 'https://wa.me/6598891383',
  linkedin: 'https://www.linkedin.com/in/john-tan-02763732',
  website: 'https://john-tan-presentation.vercel.app',
  resume: '/docs/John_Tan_Resume_Case_Manager_Selarang_Halfway_House.pdf',
  coverLetter: '/docs/John_Tan_Cover_Letter_Case_Manager_Selarang_Halfway_House.pdf',
  headline: 'Guiding Reintegration with Empathy, Structure, and Purpose.',
  summary:
    'A dedicated social-service practitioner currently pursuing the Graduate Diploma in Social Work at SUSS, combining active ground casework with senior operating depth across technology and regulated banking. Ready to support the Senior/Assistant Director and Lead Case Manager in delivering high-impact rehabilitation, psychology-informed CBP programmes, employer partnerships, and meticulous statutory reporting for residents of Selarang Halfway House.',
} as const

export const languages = 'English fluent; Mandarin and Cantonese conversational.'

export const jobAlignmentMatrix: readonly JobAlignmentDuty[] = [
  {
    dutyNumber: 1,
    title: 'Rehabilitation & Reintegration Programme Delivery',
    officialRequirement:
      'Support the delivery of rehabilitation and reintegration programmes, working with the Senior/Assistant Director (Programme) and Lead Case Manager to ensure residents are meaningfully engaged throughout their stay at the Halfway House.',
    candidateMatch:
      'Applies hands-on facilitation and programme delivery experience from NTUC Health Active Ageing Centre. Seasoned in engaging residents with diverse backgrounds, maintaining high participation rates, and aligning day-to-day sessions with core institutional rehabilitative milestones.',
    sussRelevance:
      'Grounded in SUSS Social Work modules on Direct Practice and Human Behaviour, ensuring evidence-based engagement adapted to residents’ stages of change.',
    category: 'Rehabilitation & CBP',
  },
  {
    dutyNumber: 2,
    title: 'Programme Quality & Integrity Safeguarding',
    officialRequirement:
      'Safeguard programme quality and integrity, monitoring delivery and participation to ensure programmes achieve their intended rehabilitative outcomes.',
    candidateMatch:
      'Brings six years of software engineering at ST Engineering and executive governance in banking, enforcing strict protocol compliance, qualitative feedback loops, and metrics-driven programme evaluation.',
    sussRelevance:
      'SUSS Social Work Research & Evaluation framework enables systematic outcome measurement and fidelity auditing for correctional interventions.',
    category: 'Rehabilitation & CBP',
  },
  {
    dutyNumber: 3,
    title: 'Holistic Case Management & Family Linkages',
    officialRequirement:
      'Provide holistic case management, assessing residents’ needs and delivering timely information and referral to link residents and their families with appropriate services and community resources.',
    candidateMatch:
      'Conducts bio-psycho-social assessments and family needs identification in current social service practice. Adept at navigating Singapore’s social service ecosystem (FSCs, SSO, AIC, MSF, Yellow Ribbon Community Project) to connect residents with financial, housing, and counselling aid.',
    sussRelevance:
      'SUSS Social Work Casework Practice provides systemic assessment frameworks (ecological systems perspective) to support resident-family reconciliation and holistic stabilization.',
    category: 'Holistic Casework',
  },
  {
    dutyNumber: 4,
    title: 'Reintegration Guidance, Home & Job-Site Visits',
    officialRequirement:
      'Guide residents in key reintegration areas, including accommodation, conduct, and employment, through home visits (where applicable), job-site visits, and regular follow-ups with employers to monitor work performance.',
    candidateMatch:
      'Experienced in conducting ground outreach and stakeholder liaison. Possesses the executive maturity to engage corporate employers constructively, mediate workplace challenges, conduct structured job-site checks, and assess home environments with cultural sensitivity.',
    sussRelevance:
      'Applies strengths-based empowerment models from SUSS to foster resident self-efficacy while upholding accountability in conduct and workplace stability.',
    category: 'Employment & Visits',
  },
  {
    dutyNumber: 5,
    title: 'Psychology-Informed Correctional Programmes (CBP)',
    officialRequirement:
      'Facilitate group-based correctional programmes, including psychology-informed interventions for residents under the Community-Based Programme (CBP).',
    candidateMatch:
      'Facilitates interactive group workshops and psycho-social interventions at NTUC Health. Competent in applying cognitive-behavioural principles, motivational interviewing, and relapse prevention techniques to address criminogenic needs.',
    sussRelevance:
      'SUSS Social Work Group Work and Interventions coursework covers group dynamics, conflict de-escalation, psycho-education, and structured correctional curriculum facilitation.',
    category: 'Rehabilitation & CBP',
  },
  {
    dutyNumber: 6,
    title: 'Outreach, Partner & Volunteer Coordination',
    officialRequirement:
      'Plan and coordinate outreach activities and events, working with programme partners, service providers, and volunteers to support residents’ rehabilitation and community engagement.',
    candidateMatch:
      'Demonstrated track record of onboarding community partners (NHG, HPB, Silver Generation Office) and recruiting specialist volunteer instructors. Coordinates logistics, volunteer briefings, and community inclusion events with high operational reliability.',
    sussRelevance:
      'SUSS Community Development & Inter-Agency Collaboration training informs volunteer stewardship, donor engagement, and multi-partner coordination.',
    category: 'SPS & Multi-Agency',
  },
  {
    dutyNumber: 7,
    title: 'Safety, Well-Being & Risk Management',
    officialRequirement:
      'Ensure residents’ safety and well-being during group activities, programmes, and events organised by the Halfway House.',
    candidateMatch:
      'Over a decade of risk management in high-stakes banking (Director at ABN AMRO, VP at Citibank) coupled with daily centre safety protocols. Trained in de-escalating interpersonal tensions, recognizing emotional distress signals, and maintaining secure residential boundaries.',
    sussRelevance:
      'SUSS Social Work Code of Ethics and Trauma-Informed Care principles ensure proactive safety monitoring and immediate crisis intervention protocols.',
    category: 'Holistic Casework',
  },
  {
    dutyNumber: 8,
    title: 'Progress Monitoring & SPS Case Conferences',
    officialRequirement:
      'Monitor and evaluate residents’ progress, contributing to internal case discussions and attending case conferences with relevant SPS officers.',
    candidateMatch:
      'Accustomed to co-case management and high-stakes multi-agency reviews. Synthesizes behavioural observations into clear case conference briefs, collaborating seamlessly with Singapore Prison Service (SPS) Reintegration Officers to evaluate CBP compliance and readiness for community step-down.',
    sussRelevance:
      'SUSS Social Work Multi-Disciplinary Practice prepares practitioners to articulate case formulations, risk-need levels, and desistance progress to correctional officers.',
    category: 'SPS & Multi-Agency',
  },
  {
    dutyNumber: 9,
    title: 'Statutory Case Records & Organisational Compliance',
    officialRequirement:
      'Maintain accurate and up-to-date case records, ensuring all case files and documentation are completed in accordance with organisational and statutory requirements.',
    candidateMatch:
      'Exceptional documentation discipline honed across six years of software engineering at ST Engineering and regulated banking audits. Records timely case notes, maintains resident confidentiality, and completes statutory case logs without backlog.',
    sussRelevance:
      'SUSS Social Work legal frameworks and strict adherence to the Singapore Association of Social Workers (SASW) Code of Ethics regarding documentation accuracy, client consent, and legal compliance.',
    category: 'Statutory & Records',
  },
  {
    dutyNumber: 10,
    title: 'Timely Reporting: Progress, Attendance & Outcomes',
    officialRequirement:
      'Prepare timely reports and updates, including residents’ progress, attendance, and programme participation, for reporting and submission purposes.',
    candidateMatch:
      'Proven ability to produce concise executive reports, statistical attendance tracking, and evaluative summaries for leadership and statutory authorities under tight deadlines.',
    sussRelevance:
      'Combines SUSS social work narrative reporting with quantitative tracking tools to produce reliable, audit-ready submissions for Yellow Ribbon Industries leadership.',
    category: 'Statutory & Records',
  },
] as const

export const roleFit: readonly EvidenceItem[] = [
  {
    title: 'Psychology-Informed Group Facilitation',
    category: 'Rehabilitation & CBP',
    jobDutyRef: 5,
    summary: 'Facilitates structured, cognitive-behavioural group interventions that build self-efficacy and prosocial problem solving.',
    evidence:
      'Conducts psycho-social group sessions at NTUC Health Active Ageing Centre, integrating motivational interviewing and empathetic challenge to address behavioural barriers.',
  },
  {
    title: 'Holistic Casework & Family Reintegration',
    category: 'Holistic Casework',
    jobDutyRef: 3,
    summary: 'Assesses multi-layered needs and coordinates timely linkages to community support, housing, and family reconciliation.',
    evidence:
      'Grounded in SUSS Graduate Diploma in Social Work casework models, conducting bio-psycho-social assessments and linking vulnerable clients to FSCs, SSOs, and specialist medical care.',
  },
  {
    title: 'Employer Partnerships & Job-Site Visits',
    category: 'Employment & Visits',
    jobDutyRef: 4,
    summary: 'Builds supportive employer relationships, conducts regular workplace check-ins, and guides resident conduct on the job.',
    evidence:
      'Brings corporate leadership from Citibank and ABN AMRO to communicate comfortably with SME and corporate employers, resolving workplace friction and sustaining employment placements.',
  },
  {
    title: 'SPS Co-Case Management & Inter-Agency Coordination',
    category: 'SPS & Multi-Agency',
    jobDutyRef: 8,
    summary: 'Contributes rigorous case evaluations to SPS case conferences, ensuring unified supervision and community transition.',
    evidence:
      'Comfortable presenting structured case summaries in regulated multi-stakeholder environments, aligning Halfway House interventions with Singapore Prison Service correctional goals.',
  },
  {
    title: 'Disciplined Statutory Documentation',
    category: 'Statutory & Records',
    jobDutyRef: 9,
    summary: 'Ensures resident case files, supervision logs, and statutory reports are audit-ready, accurate, and submitted on schedule.',
    evidence:
      'Six years of high-consequence engineering documentation at ST Engineering combined with financial governance at ABN AMRO guarantees impeccable case records and data integrity.',
  },
] as const

export const evidenceItems: readonly EvidenceItem[] = [
  ...roleFit,
  {
    title: 'Community Outreach & Volunteer Stewardship',
    category: 'SPS & Multi-Agency',
    jobDutyRef: 6,
    summary: 'Recruits, briefs, and oversees volunteer instructors and community partners to enrich halfway house programming.',
    evidence:
      'Successfully onboarded specialised volunteer instructors and coordinated with healthcare partners (NHG, HPB) at NTUC Health AAC with zero operational hitches.',
  },
  {
    title: 'Crisis De-escalation & Resident Safety',
    category: 'Holistic Casework',
    jobDutyRef: 7,
    summary: 'De-escalates interpersonal tensions calmly and maintains a safe, structured residential environment.',
    evidence:
      'Experienced in managing high-stakes conflict and emotional distress in fast-paced corporate and community environments using trauma-informed listening.',
  },
  {
    title: 'Attendance & Progress Reporting',
    category: 'Statutory & Records',
    jobDutyRef: 10,
    summary: 'Generates real-time attendance logs, incident reports, and progress updates for programme leadership.',
    evidence:
      'Established digital attendance tracking workflows and authored executive progress reports for management reviews at NTUC Health AAC and ST Engineering.',
  },
  {
    title: 'Reintegration Accommodation & Home Assessments',
    category: 'Employment & Visits',
    jobDutyRef: 4,
    summary: 'Conducts respectful home visits to assess post-release accommodation stability and family dynamics.',
    evidence:
      'Trained in family system assessments through Tsao Foundation Diploma and SUSS Social Work coursework, addressing household stress factors early.',
  },
  {
    title: 'Programme Quality Auditing & Evaluation',
    category: 'Rehabilitation & CBP',
    jobDutyRef: 2,
    summary: 'Monitors curriculum adherence and participant engagement to safeguard rehabilitative outcomes.',
    evidence:
      'Applies quality-assurance disciplines from enterprise software engineering to track programme fidelity, participant retention, and rehabilitative benchmarks.',
  },
] as const

export const casePathway: readonly CasePathwayStep[] = [
  {
    step: '01',
    title: 'Intake & Bio-Psycho-Social Assessment',
    description:
      'Conduct a thorough assessment of the resident’s criminogenic risks, social history, family ties, mental health, and employment readiness upon admission to Selarang Halfway House.',
    keyActions: ['Risk-Need-Responsivity review', 'Family mapping & contact verification', 'Baseline goal setting with Lead Case Manager'],
  },
  {
    step: '02',
    title: 'Psychology-Informed CBP Interventions',
    description:
      'Engage resident in group-based correctional programmes, addressing cognitive distortions, anger management, relapse prevention, and prosocial problem-solving under the Community-Based Programme.',
    keyActions: ['Group facilitation with motivational interviewing', 'Weekly reflection journaling', 'Behavioural self-monitoring'],
  },
  {
    step: '03',
    title: 'Employment Stability & Job-Site Visits',
    description:
      'Support resident in securing meaningful work with Yellow Ribbon partner employers; conduct regular job-site visits and employer check-ins to reinforce positive workplace conduct.',
    keyActions: ['Employer relationship maintenance', 'On-site performance check-ins', 'Mediation of workplace stressors'],
  },
  {
    step: '04',
    title: 'SPS Co-Case Conferences & Progress Reviews',
    description:
      'Collaborate closely with Singapore Prison Service (SPS) Reintegration Officers, presenting objective case updates, urine test records, and developmental milestones in formal case discussions.',
    keyActions: ['Joint SPS case conferences', 'Statutory compliance tracking', 'Adjustment of individual care plan'],
  },
  {
    step: '05',
    title: 'Community Re-Entry & Sustainable Desistance',
    description:
      'Facilitate secure step-down into independent accommodation, link resident with community aftercare networks (FSCs, Yellow Ribbon alumni, religious/befriending groups), and ensure family reunification.',
    keyActions: ['Home visits & housing handover', 'Community aftercare hand-off', 'Relapse prevention safety plan'],
  },
] as const

export const caseVignette: CaseVignetteStep = {
  phase: 'CBP Resident Workplace Stress & Relapse Risk Intervention',
  situation:
    'A 34-year-old Selarang Halfway House resident on the Community-Based Programme reported severe conflict with a warehouse supervisor, triggering intense feelings of inadequacy and relapse urges. He contemplated walking off the job.',
  intervention:
    '1) De-escalation & Grounding: John conducted an immediate 1-to-1 supportive session using trauma-informed active listening to de-escalate anxiety and validate emotional strain without excusing avoidance. 2) Employer Liaison: John conducted a respectful job-site visit to clarify expectations with the supervisor, establishing clear communication protocols. 3) SPS Alignment: Notified the assigned SPS Reintegration Officer during regular case check-in, documenting proactive steps taken.',
  outcome:
    'The resident retained his employment, completed his halfway house tenure without disciplinary breach, and was successfully stepped down to home detention with family support.',
}

export const missionAlignment: readonly MissionItem[] = [
  {
    title: 'Beyond Second Chances',
    commitment:
      'Championing an environment at Selarang Halfway House where every resident is treated with dignity, uncovering intrinsic worth, and developing the prosocial capabilities necessary to step beyond their past.',
    values: ['Hope', 'Dignity', 'Second Chances'],
  },
  {
    title: 'Restorative Reintegration',
    commitment:
      'Bridging residents back to their families and communities through holistic casework, practical employment stability, stable accommodation, and trauma-informed guidance.',
    values: ['Empathy', 'Responsibility', 'Reconciliation'],
  },
  {
    title: 'Institutional Integrity & Governance',
    commitment:
      'Upholding the highest standards of safety, statutory record keeping, and close co-case management with Singapore Prison Service officers to ensure secure, dependable rehabilitation.',
    values: ['Integrity', 'Excellence', 'Accountability'],
  },
] as const

export const career: readonly CareerItem[] = [
  {
    period: 'Jun 2026 — Present',
    role: 'Programme Associate',
    organisation: 'NTUC Health — Active Ageing Centre',
    summary:
      'Facilitates psycho-social and active-ageing group programmes, conducts client needs assessments, coordinates healthcare and community partners, manages activity safety, and maintains meticulous participation records.',
    current: true,
  },
  {
    period: 'Jan 2019 — Dec 2025',
    role: 'Software Engineer (Generative AI)',
    organisation: 'ST Engineering, Singapore',
    summary:
      'Engineered mission-critical software solutions with strict process documentation, systematic quality assurance, cross-functional project management, and comprehensive data integrity.',
  },
  {
    period: '2009 — 2018',
    role: 'Director',
    organisation: 'ABN AMRO Bank, Singapore',
    summary:
      'Led complex institutional relationships, high-stakes operational governance, time-sensitive crisis de-escalation, and inter-agency regulatory alignment across global financial markets.',
  },
  {
    period: '2003 — 2009',
    role: 'Vice President',
    organisation: 'Citibank, Singapore',
    summary:
      'Developed mature interpersonal judgement, analytical rigor, stakeholder consensus building, and accountability in high-compliance environments.',
  },
] as const

export const capabilityGroups = [
  {
    label: 'Rehabilitation & CBP Group Work',
    skills: [
      'Psychology-informed interventions',
      'Cognitive-behavioural concepts',
      'Motivational interviewing',
      'Group dynamics & facilitation',
      'Relapse prevention planning',
    ],
  },
  {
    label: 'Holistic Casework & Family Support',
    skills: [
      'Bio-psycho-social assessments',
      'Community resource mapping (FSC/SSO)',
      'Family mediation & reconciliation',
      'Trauma-informed care',
      'Active listening & de-escalation',
    ],
  },
  {
    label: 'Reintegration & Employer Engagement',
    skills: [
      'Job-site visit protocols',
      'Employer liaison & performance tracking',
      'Accommodation & home visits',
      'Conduct guidance & monitoring',
      'Desistance support',
    ],
  },
  {
    label: 'Governance & SPS Co-Case Management',
    skills: [
      'SPS case conference collaboration',
      'Statutory case files & audits',
      'Accurate attendance logging',
      'Incident reporting & risk mitigation',
      'Strict confidentiality (SASW/PDPA)',
    ],
  },
] as const

export const credentials: readonly Credential[] = [
  {
    qualification: 'Graduate Diploma in Social Work',
    institution: 'Singapore University of Social Sciences (SUSS)',
    period: 'Currently enrolled',
    detail: 'Advanced formal education in social work direct practice, casework, group intervention, social policy, and ethical frameworks.',
    featured: true,
  },
  {
    qualification: 'Diploma in Social Service',
    institution: 'Hua Mei Training Academy, Tsao Foundation',
    period: 'Jan 2026 — Jun 2026',
    detail: 'Comprehensive grounding in person-centred care, community casework, psycho-social interventions, and eldercare/social support.',
  },
  {
    qualification: 'Master of Business Administration (MBA)',
    institution: 'Nanyang Technological University',
    period: '2003',
    detail: 'Dean’s Honours List · Advanced organizational leadership, governance, and strategy.',
  },
  {
    qualification: 'Bachelor of Science',
    institution: 'National University of Singapore (NUS)',
    period: '1994',
    detail: 'Public Service Commission (PSC) Scholarship holder.',
  },
] as const
