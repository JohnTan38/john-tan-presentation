# SUSS Project Executive Impact Ledger Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, and deploy an interview-ready SUSS Project Executive portfolio that maps John Tan's verified eldercare, project-delivery, and social-work credentials to the role.

**Architecture:** Retarget the existing static Vite/React single-page application without adding dependencies. Keep factual copy in typed data, render it through focused semantic components, and implement the Impact Ledger visual system in the existing global stylesheet. Package the resume and official SUSS logo as local public assets, then verify the production preview and deployed Vercel URL with Vitest and Playwright CLI.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Motion 12, Vitest 4, Testing Library, CSS, Playwright CLI, Vercel.

## Global Constraints

- Use the exact target `Project Executive (2-year contract)` and `S R Nathan School of Human Development, SUSS` context.
- Treat `C:\Users\admin\Downloads\John_Tan_Resume_SUSS_Project_Executive.pdf` as the factual resume source.
- Use the official SUSS digital logo master without reconstruction or modification.
- Use sampled SUSS blue and red with SUSS lime, light blue, and neutral grey supporting colours.
- State `Matriculating August 2026` for the SUSS Post-Graduate Diploma in Social Work; do not imply completed matriculation or admission beyond the resume.
- Do not invent clinical, research, procurement, budget-management, programme-outcome, or research-tool proficiency claims.
- Keep the current Vite/React/Motion stack and add no dependencies, backend, analytics, database, or contact form.
- Support keyboard navigation, reduced motion, WCAG AA contrast, and layouts down to 320 CSS pixels.
- Preserve working email, phone, LinkedIn, website, and resume-download links.
- Do not submit a job application, contact SUSS, commit credentials, or commit `.vercel` metadata.
- The workspace is not a Git repository; replace commit steps with file and verification checkpoints.

---

## File Map

- Modify `src/data/profile.ts`: typed SUSS-specific content contract and verified evidence.
- Modify `src/App.tsx`: semantic page composition and Motion orchestration.
- Modify `src/components/Header.tsx`: SUSS-context desktop/mobile navigation and resume action.
- Modify `src/components/ContactLinks.tsx`: contact and resume-download actions.
- Modify `src/components/GlassCard.tsx`: preserve reusable semantic glass surface.
- Modify `src/components/SectionHeading.tsx`: preserve accessible section-heading API.
- Create `src/components/ProjectRoute.tsx`: accessible Plan/Coordinate/Deliver/Document/Improve sequence.
- Modify `src/styles.css`: complete Impact Ledger tokens, layouts, states, and responsive rules.
- Modify `index.html`: SUSS-specific title, description, theme colour, and social metadata.
- Modify `package.json`: accurate project identity and explicit check script.
- Modify `public/favicon.svg`: SUSS-aligned John Tan application identity, without reconstructing the SUSS mark.
- Create `public/images/suss-logo.png`: unmodified official digital master.
- Create `public/docs/John_Tan_Resume_SUSS_Project_Executive.pdf`: stable production resume download.
- Modify `tests/profile.test.ts`: factual content contract.
- Modify `tests/App.test.tsx`: semantic UI and interaction contract.
- Modify `tests/accessibility.test.tsx`: accessible names, focusable actions, and copy encoding.
- Modify `tests/styles.test.ts`: visual-system and responsive CSS contract.
- Modify `tests/deployment.test.ts`: scripts, metadata, assets, and Vercel configuration.

---

### Task 1: SUSS Content Contract And Static Assets

**Files:**
- Modify: `src/data/profile.ts`
- Modify: `tests/profile.test.ts`
- Create: `public/images/suss-logo.png`
- Create: `public/docs/John_Tan_Resume_SUSS_Project_Executive.pdf`

**Interfaces:**
- Produces `profile`, `roleFit`, `socialImpact`, `projectRoute`, `career`, `capabilityGroups`, and `credentials` typed exports.
- `profile.resume` is `/docs/John_Tan_Resume_SUSS_Project_Executive.pdf`; `profile.sussLogo` is `/images/suss-logo.png`.
- All later components consume these exports without embedding factual career copy in JSX.

- [ ] **Step 1: Replace the profile test with the failing SUSS content contract**

```ts
import { describe, expect, it } from 'vitest'
import {
  capabilityGroups,
  career,
  credentials,
  profile,
  projectRoute,
  roleFit,
  socialImpact,
} from '../src/data/profile'

const content = JSON.stringify({ capabilityGroups, career, credentials, profile, projectRoute, roleFit, socialImpact })

describe('SUSS Project Executive content', () => {
  it('targets the approved role and school', () => {
    expect(profile.targetRole).toBe('Project Executive (2-year contract)')
    expect(profile.targetOrganisation).toBe('S R Nathan School of Human Development, SUSS')
    expect(profile.resume).toBe('/docs/John_Tan_Resume_SUSS_Project_Executive.pdf')
  })

  it('maps every core responsibility to verified evidence', () => {
    expect(roleFit.map(({ title }) => title)).toEqual([
      'Project administration',
      'Timeline control',
      'Stakeholder liaison',
      'Programme records',
      'Event logistics',
      'Reporting discipline',
    ])
    expect(content).toContain('NHG')
    expect(content).toContain('HPB')
    expect(content).toContain('RN')
    expect(content).toContain('ICCP')
  })

  it('states the social-work learning status precisely', () => {
    expect(credentials[0]).toMatchObject({
      qualification: 'Post-Graduate Diploma in Social Work',
      institution: 'Singapore University of Social Sciences (SUSS)',
      period: 'Matriculating August 2026',
    })
    expect(content).not.toMatch(/currently pursuing/i)
  })

  it('removes the previous Care Corner target and unsupported claims', () => {
    expect(content).not.toContain('Care Corner')
    expect(content).not.toMatch(/proficient in (SPSS|NVivo|Qualtrics)/i)
    expect(projectRoute.map(({ title }) => title)).toEqual(['Plan', 'Coordinate', 'Deliver', 'Document', 'Improve'])
  })
})
```

- [ ] **Step 2: Run the focused test and verify the expected failure**

Run: `npm run test:run -- tests/profile.test.ts`

Expected: FAIL because the current Care Corner values and exports do not match the SUSS contract.

- [ ] **Step 3: Implement the typed SUSS content exports**

Use explicit interfaces with this public shape:

```ts
export type EvidenceItem = { title: string; summary: string; evidence: string; tag: string }
export type RouteStep = { step: string; title: 'Plan' | 'Coordinate' | 'Deliver' | 'Document' | 'Improve'; description: string }
export type CareerItem = { period: string; role: string; organisation: string; summary: string; current?: boolean }
export type Credential = { qualification: string; institution: string; period: string; detail?: string; featured?: boolean }

export const profile = {
  name: 'John Tan',
  targetRole: 'Project Executive (2-year contract)',
  targetOrganisation: 'S R Nathan School of Human Development, SUSS',
  location: 'Singapore',
  email: 'sxk2929@gmail.com',
  phoneDisplay: '+65 9889 1383',
  phoneHref: '+6598891383',
  linkedin: 'https://www.linkedin.com/in/john-tan-02763732',
  website: 'https://john-tan-presentation.vercel.app',
  resume: '/docs/John_Tan_Resume_SUSS_Project_Executive.pdf',
  sussLogo: '/images/suss-logo.png',
  headline: 'Project discipline. Human-centred purpose.',
  summary: 'An ageing-and-community practitioner combining current NTUC Health AAC experience, meticulous project coordination, and an August 2026 SUSS social-work learning pathway.',
} as const
```

Populate the remaining arrays only with proof in the approved spec and supplied resume. Use `Matriculating August 2026`, describe SPSS/NVivo/Qualtrics as tools John can quickly learn, and keep the NTUC Health programme work central.

- [ ] **Step 4: Copy and verify static assets**

Copy the supplied PDF to `public/docs/John_Tan_Resume_SUSS_Project_Executive.pdf`. Download the official SUSS logo package from the brand hub, extract the current unmodified horizontal full-colour PNG to `public/images/suss-logo.png`, and verify both files have non-zero size. If the package is not retrievable, use the official current PNG at `https://www.suss.edu.sg/images/default-source/dept_aboutsuss/image-%283%29.png?sfvrsn=24a1a908_1` without editing its pixels.

- [ ] **Step 5: Run the focused content test**

Run: `npm run test:run -- tests/profile.test.ts`

Expected: PASS with 4 tests and no warnings.

- [ ] **Step 6: Checkpoint**

Record the changed files and confirm no files outside Task 1 changed.

---

### Task 2: Semantic Impact Ledger Page And Interactions

**Files:**
- Modify: `tests/App.test.tsx`
- Modify: `tests/accessibility.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/ContactLinks.tsx`
- Create: `src/components/ProjectRoute.tsx`

**Interfaces:**
- Consumes the Task 1 data exports.
- Produces section IDs `fit`, `impact`, `delivery`, `experience`, `learning`, and `contact`.
- `ProjectRoute` has no props and renders `projectRoute` as an ordered list.
- Header mobile trigger names are exactly `Open navigation` and `Close navigation`.

- [ ] **Step 1: Write failing recruiter-story and interaction tests**

Update `tests/App.test.tsx` to assert the heading `Project discipline. Human-centred purpose.`, SUSS organisation context, every section ID and navigation target, the six evidence headings, all five route steps, the SUSS logo source and alt text, contact protocols, resume download attribute, and mobile menu open/close behaviour. Use Testing Library roles and accessible names rather than class selectors.

Update `tests/accessibility.test.tsx` to assert that every major section is exposed as a named region, the skip link targets `#main-content`, the logo says `SUSS application context`, and the rendered text has no mojibake patterns.

- [ ] **Step 2: Run both UI test files and verify failure**

Run: `npm run test:run -- tests/App.test.tsx tests/accessibility.test.tsx`

Expected: FAIL because current JSX still renders the Care Corner narrative and lacks the new route/component contracts.

- [ ] **Step 3: Implement `ProjectRoute`**

```tsx
import { motion, useReducedMotion } from 'motion/react'
import { projectRoute } from '../data/profile'

export function ProjectRoute() {
  const reduceMotion = useReducedMotion()

  return (
    <ol className="project-route" aria-label="Project delivery system">
      {projectRoute.map((item, index) => (
        <motion.li
          key={item.step}
          className="project-route__step"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
        >
          <span className="project-route__index">{item.step}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </motion.li>
      ))}
    </ol>
  )
}
```

- [ ] **Step 4: Implement the semantic page and navigation**

Compose `src/App.tsx` in the approved order: sticky header; hero; role-fit ledger; NTUC Health impact; project route; transferable experience; learning trajectory; contact close; footer. Reuse `GlassCard`, `SectionHeading`, and `ContactLinks`. Keep the hero's primary content server-independent, use Motion only for transform/opacity, and pass `false` initial states when reduced motion is requested.

Update `Header` navigation labels to `Role fit`, `AAC practice`, `Delivery system`, `Experience`, `Learning`, and `Contact`. Close the mobile menu after any navigation selection.

Update `ContactLinks` so it renders Email, Call, LinkedIn, and Download resume links; the resume link must include `download="John_Tan_Resume_SUSS_Project_Executive.pdf"`.

- [ ] **Step 5: Run focused UI tests**

Run: `npm run test:run -- tests/App.test.tsx tests/accessibility.test.tsx`

Expected: PASS with no React warnings.

- [ ] **Step 6: Checkpoint**

Inspect the component tree for one component per responsibility, named exports for reusable components, semantic interactive elements, and no copied factual strings that belong in `profile.ts`.

---

### Task 3: Impact Ledger Visual System

**Files:**
- Modify: `tests/styles.test.ts`
- Modify: `src/styles.css`
- Modify: `public/favicon.svg`

**Interfaces:**
- Consumes the semantic classes from Task 2.
- Produces SUSS palette custom properties, glass surfaces, desktop/mobile grids, visible focus, and reduced-motion rules.
- Breakpoints are `960px`, `768px`, and `480px`; minimum supported width is `320px`.

- [ ] **Step 1: Replace the CSS contract with failing Impact Ledger assertions**

Assert named tokens `--suss-blue`, `--suss-red`, `--suss-lime`, `--suss-sky`, `--canvas`, `--ink`, and `--glass`; a SUSS-adjacent gradient; `backdrop-filter: blur`; role-ledger and route grids; `:focus-visible`; hover elevation; `@media (max-width: 960px)`, `768px`, and `480px`; and `@media (prefers-reduced-motion: reduce)` that disables animations and smooth scrolling.

- [ ] **Step 2: Run the CSS test and verify failure**

Run: `npm run test:run -- tests/styles.test.ts`

Expected: FAIL because the current Care Corner tokens and selectors do not satisfy the Impact Ledger contract.

- [ ] **Step 3: Implement the complete stylesheet**

Define the sampled official SUSS palette at `:root`; use a pale blue-grey canvas, deep-blue ink, limited red emphasis, lime/sky highlights, and white translucent surfaces. Implement:

```css
:root {
  --suss-blue: #243c96;
  --suss-red: #e2232a;
  --suss-lime: #b8d548;
  --suss-sky: #73c8e5;
  --canvas: #f5f7fb;
  --ink: #14214d;
  --glass: rgba(255, 255, 255, 0.78);
}

:focus-visible { outline: 3px solid var(--suss-red); outline-offset: 4px; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Before finalising the token values, sample the current official logo image; update the blue/red values if the digital master differs. Build the hero route signature with CSS lines and nodes, keep body copy at readable line lengths, and ensure glass blur never lowers contrast beneath WCAG AA.

- [ ] **Step 4: Update the favicon**

Keep the favicon as a John Tan `JT` identity in SUSS-adjacent blue/red. Preserve the existing accessible `aria-label="JT"`; do not reproduce the SUSS logo.

- [ ] **Step 5: Run the full unit suite**

Run: `npm run test:run`

Expected: all Vitest files pass with zero failed tests and zero warnings.

- [ ] **Step 6: Checkpoint**

Review at 320, 390, 768, 1024, and 1440 CSS pixels for readable type, no overlap, complete focus states, and no horizontal overflow.

---

### Task 4: Production Metadata, Scripts, And Static Verification

**Files:**
- Modify: `tests/deployment.test.ts`
- Modify: `index.html`
- Modify: `package.json`
- Verify: `vercel.json`
- Verify: `Dockerfile`

**Interfaces:**
- Produces scripts `dev`, `build`, `start`, `test`, `test:run`, and `check`.
- `check` runs `npm run test:run` followed by `npm run build`.
- Vercel continues to build `dist` as a Vite static deployment.

- [ ] **Step 1: Write failing deployment assertions**

Assert package name `john-tan-suss-project-executive-portfolio`, script `check`, SUSS-specific title/description/theme metadata, Vite output configuration, security headers, ignore rules, Docker build commands, and non-empty public resume/logo assets.

- [ ] **Step 2: Run the deployment test and verify failure**

Run: `npm run test:run -- tests/deployment.test.ts`

Expected: FAIL on the current Care Corner package identity and HTML metadata.

- [ ] **Step 3: Update metadata and scripts**

Set the package name to `john-tan-suss-project-executive-portfolio` and add `"check": "npm run test:run && npm run build"`. Update `index.html` with the title `John Tan | SUSS Project Executive`, a recruiter-focused description, `theme-color` matching `--suss-blue`, and Open Graph/Twitter text metadata. Do not add a remote tracking script or remote image dependency.

- [ ] **Step 4: Run focused deployment tests and full check**

Run: `npm run test:run -- tests/deployment.test.ts`

Expected: PASS.

Run: `npm run check`

Expected: all tests pass and Vite production build exits 0.

- [ ] **Step 5: Checkpoint**

Confirm `dist` contains the SUSS logo and resume at their expected paths, and confirm neither `.vercel` nor credentials appear in generated output.

---

### Task 5: Production Preview, Playwright, Review, And Deployment

**Files:**
- Create or update screenshots under `output/playwright/`
- Modify application files only when a failing smoke check has a reproducible cause.

**Interfaces:**
- Consumes the production `dist` build and `npm start` preview at `http://127.0.0.1:3000`.
- Produces verified desktop/mobile screenshots and a production Vercel URL.

- [ ] **Step 1: Start a clean production preview**

Run `npm start` in a persistent terminal session. Verify the server reports the preview URL and no startup error.

- [ ] **Step 2: Run Playwright desktop smoke coverage**

Open the preview at 1440x1000. Snapshot before interactions. Verify the hero heading, organisation context, logo, resume action, every named region, and all navigation targets. Activate each internal navigation link, the resume affordance, and external-contact affordances without transmitting data. Check browser logs for errors and evaluate `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

Capture `output/playwright/suss-project-executive-desktop.png`.

- [ ] **Step 3: Run Playwright mobile smoke coverage**

Open the preview at 390x844. Verify no horizontal overflow; open the mobile menu; activate a section link; verify the menu closes and the target exists; tab through primary actions; confirm visible focus and readable card stacking.

Capture `output/playwright/suss-project-executive-mobile.png`.

- [ ] **Step 4: Review code and visual quality**

Review all changed TSX against component responsibility, hook rules, TypeScript safety, semantic HTML, keyboard behaviour, image optimisation appropriate to Vite, and avoidable rerenders. Review screenshots against the approved Impact Ledger spec for hierarchy, SUSS palette fidelity, content density, clipping, contrast, and motion restraint. Fix only verified issues, adding a failing test first for behavioural regressions.

- [ ] **Step 5: Run fresh final verification**

Run `npm run test:run` and read the complete result. Run `npm run build` and confirm exit 0. Restart `npm start`, rerun the desktop/mobile smoke paths, and confirm zero application console errors.

- [ ] **Step 6: Deploy to Vercel**

Run `npx vercel --prod`. This may require network approval and Vercel authentication. Record the production URL returned by the CLI. Do not alter project settings beyond what the deployment requires.

- [ ] **Step 7: Verify production**

Open the returned HTTPS URL with Playwright CLI. Verify the hero, SUSS organisation context, role-fit ledger, resume asset response, mobile navigation, and console logs. Only report deployment success after these checks pass.

- [ ] **Step 8: Final checkpoint**

Report files changed, exact commands run, test/build/smoke results, production URL, and any environmental limitation. Recommend installing the Vercel CLI globally with `npm i -g vercel` for future `vercel env pull`, `vercel deploy`, and `vercel logs` workflows, while noting that this deployment used `npx vercel --prod` as authorised.

