export type CompetencyId = 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6'

export type Competency = {
  readonly id: CompetencyId
  readonly number: number
  readonly title: string
  readonly objective: string
  readonly activities: readonly string[]
  readonly indicators: readonly string[]
  readonly foundation: string
}

export type Assignment = {
  readonly code: string
  readonly title: string
  readonly description: string
  readonly dueWeek: number
  /** Set for work submitted every week rather than once. */
  readonly ongoing?: boolean
  /** Part of the SUSS practicum portfolio. */
  readonly portfolio?: boolean
  readonly competencies: readonly CompetencyId[]
}

export type Phase = {
  readonly number: number
  readonly title: string
  readonly weeks: readonly [number, number]
  readonly hours: number
  readonly focus: string
  readonly milestones: readonly string[]
}

export type EvaluationArea = {
  readonly area: string
  readonly tools: string
  readonly by: string
  readonly when: string
}

export type SupervisionItem = {
  readonly forum: string
  readonly cadence: string
  readonly purpose: string
}

export type CareerItem = {
  readonly period: string
  readonly role: string
  readonly organisation: string
  readonly summary: string
}

export type Credential = {
  readonly qualification: string
  readonly institution: string
  readonly period: string
  readonly detail?: string
}

export const profile = {
  name: 'John Tan',
  role: 'Social work practicum candidate',
  course: 'SWK512 Social Work Practicum and Field Seminar',
  programme: 'Graduate Diploma in Social Work',
  university: 'Singapore University of Social Sciences (SUSS)',
  totalHours: 400,
  weeks: 40,
  hoursPerWeek: 10,
  startDate: '2027-01-11',
  period: '11 January to 15 October 2027',
  location: 'Singapore',
  email: 'sxk2929@gmail.com',
  phoneDisplay: '+65 9889 1383',
  phoneHref: '+6598891383',
  whatsappHref: 'https://wa.me/6598891383',
  website: 'https://john-tan-profile.vercel.app',
  resume: '/docs/John_Tan_Resume_SWK512_Practicum.pdf',
  headline: 'A 400-hour practicum, planned so that every hour teaches something.',
  summary:
    'I am a Graduate Diploma in Social Work student at SUSS, working in an Active Ageing Centre and moving into social service after careers in technology and banking. I am looking for a practicum placement where I can practise casework and group work under supervision, and learn how an agency, its clients and its policies fit together.',
} as const

export const languages = 'English (fluent), Mandarin and Cantonese (conversational)'

export const competencies: readonly Competency[] = [
  {
    id: 'C1',
    number: 1,
    title: 'Ethical and professional behaviour',
    objective:
      'Make practice decisions that I can explain against the Code of Professional Ethics, agency policy and Singapore law, and use supervision to examine how my own values and biases shape those decisions.',
    activities: [
      'Read and discuss agency policies on confidentiality, consent, safeguarding and record keeping in week 1–2',
      'Keep a fortnightly reflection journal that names one value tension met in practice',
      'Analyse one ethical dilemma from placement using a structured decision-making model',
    ],
    indicators: [
      'Field Educator rates professional conduct as Good or better at mid-practicum and final evaluation',
      'Every case note meets agency standards for consent, confidentiality and timeliness',
      'Ethical dilemma analysis identifies competing principles and a reasoned course of action',
    ],
    foundation:
      'Fifteen years in regulated banking taught me to work inside strict compliance rules and to escalate early. I am still learning how those habits translate to client confidentiality and self-determination.',
  },
  {
    id: 'C2',
    number: 2,
    title: 'Applying knowledge and skills with client systems',
    objective:
      'Engage, assess, intervene and terminate with individuals, families and groups under supervision, using a person-in-environment view that looks at the person and their surroundings together.',
    activities: [
      'Carry a supervised caseload of 2–3 individuals or families from intake to closure',
      'Write multidimensional assessments covering biological, psychological, social, environmental and spiritual factors, with strengths and resources',
      'Co-facilitate, then lead, at least one group or programme session',
    ],
    indicators: [
      'Process recording and Field Educator feedback show purposeful engagement, empathy and questioning',
      'Assessments link each identified need to the environment, not only to the person',
      'Intervention plans have goals agreed with clients and reviewed at set dates',
    ],
    foundation:
      'At the NTUC Health Active Ageing Centre I facilitate group activities, carry out needs screening and make referrals. Placement is where I want to deepen this into full casework.',
  },
  {
    id: 'C3',
    number: 3,
    title: 'Organisation, service delivery and change',
    objective:
      'Understand how my placement agency is structured, funded and governed, how clients move through its services, and how the agency adapts to new needs or policy.',
    activities: [
      'Map the agency’s structure, funding sources, service pathway and referral partners',
      'Attend case conferences, team meetings and at least one inter-agency meeting',
      'Identify one service gap or process improvement and discuss it with my Field Educator',
    ],
    indicators: [
      'Agency profile explains the client journey from referral to closure accurately',
      'I can name the agency’s key partners and when to refer to them',
      'A change proposal is reviewed by my Field Educator for feasibility',
    ],
    foundation:
      'I have led teams, operational reviews and change programmes in large organisations. I want to see how these work in a mission-driven social service setting with limited resources.',
  },
  {
    id: 'C4',
    number: 4,
    title: 'Evaluating practice with individuals, families, groups, organisations and communities',
    objective:
      'Measure whether my work is helping, at the level of a single client, a group or programme, and the service as a whole, and use what I find to adjust.',
    activities: [
      'Set measurable goals with each client and review them using goal attainment scaling',
      'Collect pre- and post-session feedback for one group or programme',
      'Review one agency outcome measure and how it is reported',
    ],
    indicators: [
      'Each closed case has a written review of goals against outcomes',
      'Group evaluation reports what changed and what I would do differently',
      'Practice evaluation is discussed in supervision before case closure',
    ],
    foundation:
      'In engineering and banking I worked with metrics and audits every day. I want to learn which measures matter to clients and how to use them without losing sight of the person.',
  },
  {
    id: 'C5',
    number: 5,
    title: 'Practice-informed research and research-informed practice',
    objective:
      'Use research evidence to choose and justify assessments and interventions, and notice questions from practice that research could answer.',
    activities: [
      'Write a short evidence brief on an intervention used with my caseload or client group',
      'Cite current literature and Singapore data in assessments and case studies (APA style)',
      'Record practice questions that arise and discuss one in field seminar',
    ],
    indicators: [
      'Evidence brief compares at least three peer-reviewed or official sources',
      'Case study explains why the chosen intervention fits this client and context',
      'One practice question is developed into a researchable question',
    ],
    foundation:
      'I am comfortable reading research and working with data, and I write in APA style. I want to practise turning evidence into choices with real clients.',
  },
  {
    id: 'C6',
    number: 6,
    title: 'Policy practice, programme planning and implementation',
    objective:
      'Understand the Singapore policies that shape my clients’ lives and the agency’s work, and take part in planning, running and reviewing a programme.',
    activities: [
      'Write a policy brief on one national scheme relevant to the agency’s clients',
      'Help plan and deliver a programme or activity, including budget, risk and logistics',
      'Note where policy helps or blocks clients and raise this in supervision',
    ],
    indicators: [
      'Policy brief explains eligibility, gaps and one practical recommendation',
      'Programme plan includes objectives, a risk assessment and an evaluation method',
      'Field Educator confirms my contribution to programme delivery',
    ],
    foundation:
      'I coordinate community partners and volunteers for programmes at the Active Ageing Centre, and my business background covers planning and budgeting. Policy analysis is where I most want to grow.',
  },
] as const

export const assignments: readonly Assignment[] = [
  {
    code: 'A1',
    title: 'Practicum learning contract',
    description: 'Behavioural learning objectives, work assignments with deadlines, evaluation plan and supervision plan, agreed with my Field Educator by about 80 hours.',
    dueWeek: 8,
    portfolio: true,
    competencies: ['C1', 'C3'],
  },
  {
    code: 'A2',
    title: 'Agency and organisational profile',
    description: 'Structure, funding, service pathway, partners and one area for organisational change.',
    dueWeek: 10,
    competencies: ['C3', 'C6'],
  },
  {
    code: 'A3',
    title: 'Reflection journal',
    description: 'Fortnightly entries using Gibbs’ reflective cycle, shared before supervision; at least eight go into the portfolio.',
    dueWeek: 1,
    ongoing: true,
    portfolio: true,
    competencies: ['C1', 'C4'],
  },
  {
    code: 'A4',
    title: 'Process recording',
    description: 'A transcribed client session of at least 30 minutes with my analysis of skills used and missed, drafted early for Field Educator feedback.',
    dueWeek: 16,
    portfolio: true,
    competencies: ['C1', 'C2'],
  },
  {
    code: 'A5',
    title: 'Multidimensional assessment reports',
    description: 'Person-in-environment assessments with strengths, needs and resources for two clients.',
    dueWeek: 18,
    competencies: ['C2', 'C5'],
  },
  {
    code: 'A6',
    title: 'Mid-practicum evaluation',
    description: 'Evaluation form completed with my Field Educator before the meeting with the Practice Educator, at about 180 to 200 hours.',
    dueWeek: 19,
    portfolio: true,
    competencies: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
  },
  {
    code: 'A7',
    title: 'Evidence brief',
    description: 'A literature-informed review of one intervention used with my clients.',
    dueWeek: 22,
    competencies: ['C5'],
  },
  {
    code: 'A8',
    title: 'Ethical dilemma analysis',
    description: 'A practice dilemma worked through a structured ethical decision-making model.',
    dueWeek: 25,
    competencies: ['C1'],
  },
  {
    code: 'A9',
    title: 'Group or programme plan and evaluation',
    description: 'Session plan, risk assessment, delivery notes and pre/post participant feedback.',
    dueWeek: 30,
    competencies: ['C2', 'C4', 'C6'],
  },
  {
    code: 'A10',
    title: 'Policy brief',
    description: 'Analysis of one Singapore scheme affecting the agency’s clients, with a recommendation.',
    dueWeek: 33,
    competencies: ['C3', 'C6'],
  },
  {
    code: 'A11',
    title: 'Case study',
    description: 'One case from engagement to termination, linking theory, evidence and outcome review.',
    dueWeek: 37,
    competencies: ['C2', 'C4', 'C5'],
  },
  {
    code: 'A12',
    title: 'Final evaluation and confirmation of hours',
    description: 'Final evaluation completed with my Field Educator against all six competencies, and the record of practicum and supervision hours.',
    dueWeek: 40,
    portfolio: true,
    competencies: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
  },
] as const

export const hourBreakdown = [
  { label: 'Work at the practicum site', hours: 365 },
  { label: 'Supervision, at least 10 hours individual', hours: 20 },
  { label: 'Field seminars, five of 3 hours', hours: 15 },
] as const

export const phases: readonly Phase[] = [
  {
    number: 1,
    title: 'Orientation and learning contract',
    weeks: [1, 8],
    hours: 80,
    focus: 'Learn the agency, its policies and its people. Observe practice, begin first client contacts with my Field Educator present, and agree the learning contract.',
    milestones: ['Agency orientation and policy reading', 'First field seminar', 'Learning contract agreed at about 80 hours (A1)'],
  },
  {
    number: 2,
    title: 'Assessment and direct practice',
    weeks: [9, 20],
    hours: 120,
    focus: 'Carry a small supervised caseload, write assessments and build intervention plans with clients.',
    milestones: [
      'Agency profile (A2)',
      'Process recording drafted for feedback (A4)',
      'Assessment reports (A5)',
      'Mid-practicum evaluation at about 180 to 200 hours (A6)',
    ],
  },
  {
    number: 3,
    title: 'Intervention, groups and programmes',
    weeks: [21, 33],
    hours: 130,
    focus: 'Deliver interventions, lead a group or programme session, and connect casework to research and policy.',
    milestones: ['Evidence brief (A7)', 'Ethical dilemma analysis (A8)', 'Group or programme evaluation (A9)', 'Policy brief (A10)'],
  },
  {
    number: 4,
    title: 'Evaluation and termination',
    weeks: [34, 40],
    hours: 70,
    focus: 'Review outcomes with clients, close or transfer cases well, complete the final evaluation and submit the portfolio.',
    milestones: ['Planned termination and case transfer', 'Case study (A11)', 'Final evaluation and hours confirmation (A12)', 'Practicum portfolio submitted'],
  },
] as const

export const evaluationAreas: readonly EvaluationArea[] = [
  {
    area: 'Professional conduct and ethics',
    tools: 'Field Educator observation, reflection journal, ethical dilemma analysis',
    by: 'Field Educator',
    when: 'Ongoing; rated at mid-practicum and final',
  },
  {
    area: 'Engagement and interviewing skills',
    tools: 'Process recording, direct observation, client feedback where appropriate',
    by: 'Field Educator and student',
    when: 'Before mid-practicum',
  },
  {
    area: 'Assessment and intervention planning',
    tools: 'Assessment reports, intervention plans, case notes',
    by: 'Field Educator',
    when: 'From about 80 hours',
  },
  {
    area: 'Evaluation of practice',
    tools: 'Goal attainment scaling, pre/post programme feedback, case reviews',
    by: 'Student, reviewed in supervision',
    when: 'At each case review and closure',
  },
  {
    area: 'Use of research and policy',
    tools: 'Evidence brief, policy brief, case study',
    by: 'Field Educator',
    when: 'Phases 3 and 4',
  },
  {
    area: 'Documentation and report writing',
    tools: 'Sample audit of case notes against agency standards',
    by: 'Field Educator',
    when: 'Monthly',
  },
  {
    area: 'All six competencies',
    tools: 'Mid-practicum evaluation form; final evaluation on a four-point scale from Excellent to Poor, or not yet observed',
    by: 'Field Educator with student; Practice Educator at mid-practicum',
    when: 'About 180–200 hours, and at the end',
  },
] as const

export const progressMonitoring: readonly string[] = [
  'A weekly log of work, supervision and seminar hours, reviewed with my Field Educator.',
  'Each supervision session ends with agreed actions that open the next one.',
  'The learning contract is reviewed at mid-practicum and objectives adjusted if needed.',
  'I arrange the mid-practicum meeting with the Practice Educator and complete the form with my Field Educator beforehand.',
  'Concerns are raised early with my Field Educator and, if needed, with the Practice Educator.',
]

export const supervisionPlan: readonly SupervisionItem[] = [
  {
    forum: 'Individual supervision',
    cadence: 'Fortnightly, about one hour',
    purpose: 'Case discussion, skill feedback, ethics and reflection. I send my agenda, journal entry and any recordings a day ahead. Planned to give at least 20 hours in total, well above the 10-hour individual minimum.',
  },
  {
    forum: 'Informal check-ins',
    cadence: 'On placement days, as needed',
    purpose: 'Quick guidance before or after client contact, and immediate escalation of risk.',
  },
  {
    forum: 'Direct observation',
    cadence: 'At least twice before mid-practicum',
    purpose: 'My Field Educator observes a session and gives specific feedback on practice.',
  },
  {
    forum: 'SUSS field seminars',
    cadence: 'Five sessions of 3 hours',
    purpose: 'Peer learning across settings, presentations and linking theory to practice. Attendance is compulsory, so I plan placement days around them.',
  },
  {
    forum: 'Mid-practicum meeting',
    cadence: 'Once, at about 180–200 hours',
    purpose: 'Student, Field Educator and Practice Educator review progress against the learning contract.',
  },
] as const

export const roles = [
  {
    who: 'Me, as student',
    responsibilities: [
      'Arrive prepared, keep accurate hours and case records, and meet deadlines',
      'Arrange the mid-practicum meeting and complete each evaluation form on time',
      'Bring questions and mistakes to supervision openly, and follow agency policy and the Code of Professional Ethics',
    ],
  },
  {
    who: 'Field Educator',
    responsibilities: [
      'Orientate me to the agency and develop the learning contract with me',
      'Assign cases and responsibilities matched to my learning needs',
      'Provide regular supervision and feedback, and complete the mid-practicum and final evaluations',
    ],
  },
  {
    who: 'Practice Educator (SUSS)',
    responsibilities: [
      'Support the learning contract and liaise with the agency',
      'Conduct the mid-practicum evaluation meeting',
      'Link practice to the field seminars and coursework',
    ],
  },
] as const

export const practiceStance = [
  {
    title: 'Person and environment together',
    text: 'I assess the person and their surroundings side by side: family, housing, money, health access, community and policy. Change can be needed in either.',
  },
  {
    title: 'Multidimensional, not diagnostic',
    text: 'I describe needs and strengths across several dimensions rather than labelling people. Diagnosis belongs to those qualified to make it.',
  },
  {
    title: 'Reflect, then act',
    text: 'I use Gibbs’ reflective cycle each week: what happened, what I felt, what it means, and what I will do differently next time.',
  },
] as const

export const career: readonly CareerItem[] = [
  {
    period: 'Jun 2026 to present',
    role: 'Programme Associate',
    organisation: 'NTUC Health, Active Ageing Centre',
    summary: 'Facilitate group activities for seniors, carry out needs screening and referrals, and coordinate community partners and volunteers.',
  },
  {
    period: '2019 to 2025',
    role: 'Software Engineer (Generative AI)',
    organisation: 'ST Engineering, Singapore',
    summary: 'Built enterprise systems with structured documentation, data governance and audit-ready reporting.',
  },
  {
    period: '2009 to 2018',
    role: 'Director',
    organisation: 'ABN AMRO Bank, Singapore',
    summary: 'Led governance and regulatory compliance work involving many stakeholders under tight deadlines.',
  },
  {
    period: '2003 to 2009',
    role: 'Vice President',
    organisation: 'Citibank, Singapore',
    summary: 'Led operational risk reviews, stakeholder communication and teams.',
  },
] as const

export const credentials: readonly Credential[] = [
  {
    qualification: 'Graduate Diploma in Social Work',
    institution: 'Singapore University of Social Sciences (SUSS)',
    period: 'Currently enrolled',
    detail: 'Casework, group work, social policy, human behaviour and professional ethics.',
  },
  {
    qualification: 'Diploma in Social Service',
    institution: 'Hua Mei Training Academy, Tsao Foundation',
    period: 'Jan to Jun 2026',
    detail: 'Bio-psycho-social assessment, counselling principles and community casework.',
  },
  {
    qualification: 'Master of Business Administration',
    institution: 'Nanyang Technological University',
    period: '2003',
    detail: 'Dean’s Honours List',
  },
  {
    qualification: 'Bachelor of Science',
    institution: 'National University of Singapore',
    period: '1994',
    detail: 'Public Service Commission Scholarship',
  },
] as const

/** Phase number for a given 1-based week. */
export function phaseForWeek(week: number): Phase {
  const found = phases.find((phase) => week >= phase.weeks[0] && week <= phase.weeks[1])
  if (!found) throw new RangeError(`Week ${week} is outside the ${profile.weeks}-week plan`)
  return found
}

/** Assignments due in a given week. */
export function assignmentsDueInWeek(week: number): readonly Assignment[] {
  return assignments.filter((assignment) => !assignment.ongoing && assignment.dueWeek === week)
}
