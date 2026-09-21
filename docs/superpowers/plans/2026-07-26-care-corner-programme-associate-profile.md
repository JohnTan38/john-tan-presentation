# Care Corner Associate (Programme) Profile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the SUSS homepage with a production-ready Care Corner Associate (Programme), Active Ageing Centre application profile that makes John Tan's verified role fit easy to understand and search.

**Architecture:** Retain the static React/Vite application and its current component/data separation. Store every factual claim in typed local data, compose a semantic single page in `App.tsx`, isolate evidence filtering in a focused component, and derive the responsive visual system from Care Corner-inspired tokens without adding dependencies.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Motion 12, Vitest 4, Testing Library, CSS, Playwright CLI.

## Global Constraints

- Replace the SUSS homepage rather than adding a second route.
- Add no dependencies, backend, database, analytics, contact form, schemas, or APIs.
- Publish exactly: `English fluent; Mandarin and Cantonese conversational.`
- Do not invent metrics, programme outcomes, clinical duties, or door-knocking experience.
- Do not imply Care Corner endorsement or employment.
- Use `#14284B`, `#C8102E`, `#A9DDE2`, `#CEC8EA`, `#F4F7F8`, and `#172233` as the visual token foundation.
- Preserve keyboard access, visible focus, reduced motion, and 320-pixel responsive support.
- Use only verified content from the role brief, supplied resume, supplied cover letter, and official Care Corner AAC information.
- Do not reconstruct or hotlink a Care Corner logo; use a text employer label unless an official local asset exists.
- Do not describe deployment as successful until the production URL passes smoke checks.

## File Structure

- Modify `src/data/profile.ts`: typed source of truth for profile, fit evidence, domains, pathway, career, credentials, and languages.
- Create `src/components/EvidenceFinder.tsx`: local query/category filtering, result count, empty state, and reset.
- Modify `src/components/Header.tsx`: Care Corner-specific section navigation.
- Modify `src/components/ContactLinks.tsx`: resume and cover-letter actions with stable filenames.
- Modify `src/components/ProjectRoute.tsx`: programme-day pathway rendering.
- Modify `src/App.tsx`: Care Corner page composition and semantic sections.
- Replace `src/styles.css`: Neighbourhood Programme Desk token system, responsive layouts, interactions, and reduced-motion safeguards.
- Modify `index.html`: Care Corner-specific title and metadata.
- Modify `package.json`: Care Corner-specific package identity only; scripts and dependencies remain unchanged.
- Modify `tests/profile.test.ts`: content and unsupported-claim contract.
- Modify `tests/App.test.tsx`: page structure, actions, and navigation.
- Create `tests/evidence-finder.test.tsx`: evidence search/filter/empty/reset behaviour.
- Modify `tests/accessibility.test.tsx`: landmarks, section names, skip link, and encoding.
- Modify `tests/styles.test.ts`: visual tokens and responsive safeguards.
- Modify `tests/favicon.test.ts` and `tests/deployment.test.ts` only where SUSS metadata or static asset paths are asserted.
- Copy the supplied resume and cover letter to `public/docs/John_Tan_Resume_CareCorner_Associate_Programme.pdf` and `public/docs/John_Tan_CoverLetter_CareCorner_Associate_Programme.pdf`.

---

### Task 1: Establish the Care Corner content and asset contract

**Files:**
- Modify: `src/data/profile.ts`
- Modify: `tests/profile.test.ts`
- Modify: `tests/deployment.test.ts`
- Modify: `package.json`
- Modify: `index.html`
- Create: `public/docs/John_Tan_Resume_CareCorner_Associate_Programme.pdf`
- Create: `public/docs/John_Tan_CoverLetter_CareCorner_Associate_Programme.pdf`

**Interfaces:**
- Produces: `EvidenceCategory`, `EvidenceItem`, `ProgrammeDomain`, `PathwayStep`, `CareerItem`, and `Credential` types.
- Produces: `profile`, `roleFit`, `programmeDomains`, `evidenceItems`, `programmePathway`, `career`, `credentials`, `capabilityGroups`, and `languages`.
- `profile.resume` is `/docs/John_Tan_Resume_CareCorner_Associate_Programme.pdf`.
- `profile.coverLetter` is `/docs/John_Tan_CoverLetter_CareCorner_Associate_Programme.pdf`.

- [ ] **Step 1: Replace the SUSS profile tests with failing Care Corner content tests**

```ts
expect(profile).toMatchObject({
  targetRole: 'Associate (Programme), Active Ageing Centre',
  targetOrganisation: 'Care Corner Singapore',
  resume: '/docs/John_Tan_Resume_CareCorner_Associate_Programme.pdf',
  coverLetter: '/docs/John_Tan_CoverLetter_CareCorner_Associate_Programme.pdf',
})
expect(languages).toBe('English fluent; Mandarin and Cantonese conversational.')
expect(roleFit).toHaveLength(5)
expect(programmeDomains.map(({ name }) => name)).toEqual([
  'Physical', 'Intellectual', 'Emotional', 'Social', 'Vocational',
])
expect(JSON.stringify({ profile, roleFit, evidenceItems })).not.toMatch(
  /SUSS|door-knocking experience|clinical expertise/i,
)
```

- [ ] **Step 2: Run the focused tests and verify the old SUSS contract fails**

Run: `npm run test:run -- tests/profile.test.ts tests/deployment.test.ts`

Expected: FAIL because `targetRole`, `targetOrganisation`, Care Corner asset paths, and new exports do not exist.

- [ ] **Step 3: Implement the typed Care Corner content**

Define exact interfaces:

```ts
export type EvidenceCategory = 'Programme' | 'Outreach' | 'Volunteers' | 'Administration' | 'Operations'
export type EvidenceItem = {
  title: string
  summary: string
  evidence: string
  category: EvidenceCategory
}
export type ProgrammeDomain = { name: 'Physical' | 'Intellectual' | 'Emotional' | 'Social' | 'Vocational'; description: string }
export type PathwayStep = { step: string; title: 'Prepare' | 'Welcome' | 'Facilitate' | 'Record' | 'Improve'; description: string }
export type CareerItem = { period: string; role: string; organisation: string; summary: string; current?: boolean }
export type Credential = { qualification: string; institution: string; period: string; detail?: string; featured?: boolean }
```

Populate:

```ts
export const profile = {
  name: 'John Tan',
  targetRole: 'Associate (Programme), Active Ageing Centre',
  targetOrganisation: 'Care Corner Singapore',
  location: 'Singapore',
  email: 'sxk2929@gmail.com',
  phoneDisplay: '+65 9889 1383',
  phoneHref: '+6598891383',
  linkedin: 'https://www.linkedin.com/in/john-tan-02763732',
  website: 'https://john-tan-presentation.vercel.app',
  resume: '/docs/John_Tan_Resume_CareCorner_Associate_Programme.pdf',
  coverLetter: '/docs/John_Tan_CoverLetter_CareCorner_Associate_Programme.pdf',
  headline: 'Programmes that help seniors stay active, connected, and seen.',
  summary: 'A social-service practitioner combining current NTUC Health Active Ageing Centre experience with mature programme coordination, stakeholder management, and documentation discipline.',
} as const

export const languages = 'English fluent; Mandarin and Cantonese conversational.'
```

Create five `roleFit` items covering programme delivery, outreach readiness and senior rapport, volunteers/partners, records, and centre operations. Create at least eight `evidenceItems` distributed across all five categories, five `programmeDomains`, the five `programmePathway` stages, the verified four-entry career history, capability groups, and credentials from the approved spec.

- [ ] **Step 4: Copy the supplied PDFs and update static metadata**

Use PowerShell `Copy-Item` with exact source and destination paths. Update:

```json
"name": "john-tan-care-corner-programme-associate-profile"
```

Set `index.html` title and description to:

```html
<title>John Tan | Care Corner Associate (Programme)</title>
<meta name="description" content="John Tan's application profile for Associate (Programme), Active Ageing Centre at Care Corner Singapore." />
```

- [ ] **Step 5: Run focused tests**

Run: `npm run test:run -- tests/profile.test.ts tests/deployment.test.ts`

Expected: PASS with both public PDF assets present and no SUSS content in the typed profile source.

- [ ] **Step 6: Record the task**

The workspace has no active Git repository. Note Task 1 completion in this plan instead of running a commit command.

### Task 2: Build the accessible evidence finder

**Files:**
- Create: `src/components/EvidenceFinder.tsx`
- Create: `tests/evidence-finder.test.tsx`

**Interfaces:**
- Consumes: `EvidenceItem` and `EvidenceCategory` from `src/data/profile.ts`.
- Produces: `EvidenceFinder({ items }: { items: EvidenceItem[] }): JSX.Element`.
- Uses single-select categories: `'All' | EvidenceCategory`.

- [ ] **Step 1: Write failing interaction tests**

```tsx
render(<EvidenceFinder items={evidenceItems} />)
expect(screen.getByRole('status')).toHaveTextContent(`${evidenceItems.length} pieces of evidence`)

await user.type(screen.getByRole('searchbox', { name: /search evidence/i }), 'attendance')
expect(screen.getByRole('status')).toHaveTextContent(/1 piece of evidence/i)
expect(screen.getByText(/attendance/i)).toBeInTheDocument()

await user.click(screen.getByRole('button', { name: 'Volunteers' }))
expect(screen.getByRole('button', { name: 'Volunteers' })).toHaveAttribute('aria-pressed', 'true')

await user.clear(search)
await user.type(search, 'clinical diagnosis')
expect(screen.getByText(/no evidence matches/i)).toBeInTheDocument()
await user.click(screen.getByRole('button', { name: /reset search/i }))
expect(search).toHaveValue('')
```

- [ ] **Step 2: Run the new test and verify it fails**

Run: `npm run test:run -- tests/evidence-finder.test.tsx`

Expected: FAIL because `EvidenceFinder.tsx` does not exist.

- [ ] **Step 3: Implement query and category filtering**

Use:

```tsx
const categories = ['All', 'Programme', 'Outreach', 'Volunteers', 'Administration', 'Operations'] as const
const [query, setQuery] = useState('')
const [category, setCategory] = useState<(typeof categories)[number]>('All')
const normalisedQuery = query.trim().toLocaleLowerCase()
const filteredItems = items.filter((item) => {
  const matchesCategory = category === 'All' || item.category === category
  const haystack = `${item.title} ${item.summary} ${item.evidence} ${item.category}`.toLocaleLowerCase()
  return matchesCategory && (!normalisedQuery || haystack.includes(normalisedQuery))
})
```

Render a semantic `<search>` element, labelled search input, `aria-pressed` filter buttons, a polite result-count status, filtered articles, and the resettable empty state. Reset both query and category.

- [ ] **Step 4: Run the evidence-finder tests**

Run: `npm run test:run -- tests/evidence-finder.test.tsx`

Expected: PASS for initial count, query filtering, category filtering, empty state, and reset.

- [ ] **Step 5: Record the task**

Note Task 2 completion in this plan because Git metadata is unavailable.

### Task 3: Compose the Care Corner application experience

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/ContactLinks.tsx`
- Modify: `src/components/ProjectRoute.tsx`
- Modify: `tests/App.test.tsx`
- Modify: `tests/accessibility.test.tsx`

**Interfaces:**
- Consumes all Task 1 data exports.
- Consumes `EvidenceFinder` from Task 2.
- `ContactLinks` renders email, phone, LinkedIn, resume, and cover-letter links.
- `ProjectRoute` renders `programmePathway` as an ordered list labelled `Programme-day pathway`.

- [ ] **Step 1: Write failing page composition tests**

```tsx
expect(screen.getByRole('heading', {
  level: 1,
  name: 'Programmes that help seniors stay active, connected, and seen.',
})).toBeInTheDocument()
expect(screen.getByText('Care Corner Singapore')).toBeInTheDocument()
expect(screen.getByText('English fluent; Mandarin and Cantonese conversational.')).toBeInTheDocument()

for (const id of ['fit', 'domains', 'evidence', 'pathway', 'experience', 'credentials', 'contact']) {
  expect(document.getElementById(id)).toBeInTheDocument()
}

expect(screen.getAllByRole('link', { name: /download resume/i })[0]).toHaveAttribute(
  'href',
  '/docs/John_Tan_Resume_CareCorner_Associate_Programme.pdf',
)
expect(screen.getAllByRole('link', { name: /download cover letter/i })[0]).toHaveAttribute(
  'href',
  '/docs/John_Tan_CoverLetter_CareCorner_Associate_Programme.pdf',
)
expect(document.body).not.toHaveTextContent(/SUSS/i)
```

Keep the existing mobile-menu interaction test, updating the clicked destination to `Evidence finder`.

- [ ] **Step 2: Run page and accessibility tests to verify they fail**

Run: `npm run test:run -- tests/App.test.tsx tests/accessibility.test.tsx`

Expected: FAIL because the rendered page still targets SUSS and lacks Care Corner sections and cover-letter actions.

- [ ] **Step 3: Update navigation and download actions**

Set header navigation to:

```ts
const navigation = [
  { href: '#fit', label: 'Role fit' },
  { href: '#domains', label: 'Five domains' },
  { href: '#evidence', label: 'Evidence finder' },
  { href: '#experience', label: 'Experience' },
  { href: '#credentials', label: 'Credentials' },
]
```

Update resume download filename to `John_Tan_Resume_CareCorner_Associate_Programme.pdf`. Add the cover-letter link and filename `John_Tan_CoverLetter_CareCorner_Associate_Programme.pdf`.

- [ ] **Step 4: Update the pathway component**

Map `programmePathway` into:

```tsx
<ol className="programme-pathway" aria-label="Programme-day pathway">
  {programmePathway.map((item) => (
    <li key={item.step} className="programme-pathway__step">
      <span className="programme-pathway__index">{item.step}</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </li>
  ))}
</ol>
```

Retain `useReducedMotion` for optional entry motion while ensuring all content renders immediately in the accessibility tree.

- [ ] **Step 5: Replace page composition**

Build semantic sections in this exact order:

1. `hero`: Care Corner label, approved thesis, summary, language proof, contact links, application context card, and decorative programme ribbon.
2. `fit`: five role-fit cards.
3. `domains`: five active-ageing domains.
4. `evidence`: `EvidenceFinder`.
5. `pathway`: `ProjectRoute`.
6. `experience`: AAC-first timeline and transferable capability groups.
7. `credentials`: social-service education first, then prior degrees and language/digital capability.
8. `contact`: interview invitation and repeated contact actions.

Use visible headings:

```ts
[
  'Ready for the work behind a vibrant centre',
  'Five dimensions of active ageing',
  'Find the evidence that matters',
  'A dependable programme-day rhythm',
  'Experience that strengthens delivery',
  'Learning with purpose',
]
```

- [ ] **Step 6: Run page and accessibility tests**

Run: `npm run test:run -- tests/App.test.tsx tests/accessibility.test.tsx`

Expected: PASS with Care Corner copy, accessible regions, mobile navigation, contact paths, and no SUSS text.

- [ ] **Step 7: Record the task**

Note Task 3 completion in this plan because Git metadata is unavailable.

### Task 4: Implement the Neighbourhood Programme Desk visual system

**Files:**
- Modify: `src/styles.css`
- Modify: `tests/styles.test.ts`

**Interfaces:**
- Consumes class names rendered by Task 2 and Task 3.
- Produces the Care Corner token contract and responsive behaviour.

- [ ] **Step 1: Write failing visual-contract tests**

```ts
for (const token of [
  '--care-navy: #14284b',
  '--care-crimson: #c8102e',
  '--neighbourhood-aqua: #a9dde2',
  '--activity-lilac: #cec8ea',
  '--canvas-mist: #f4f7f8',
  '--ink: #172233',
]) {
  expect(styles.toLowerCase()).toContain(token)
}
expect(styles).toMatch(/\.programme-ribbon[\s\S]*position:\s*absolute/)
expect(styles).toMatch(/\.evidence-finder[\s\S]*backdrop-filter:\s*blur\(/)
expect(styles).toMatch(/\.programme-pathway\s*\{[\s\S]*grid-template-columns:/)
expect(styles).toContain('@media (max-width: 960px)')
expect(styles).toContain('@media (max-width: 720px)')
expect(styles).toContain('@media (max-width: 480px)')
expect(styles).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*scroll-behavior:\s*auto/)
```

- [ ] **Step 2: Run the style test and verify it fails**

Run: `npm run test:run -- tests/styles.test.ts`

Expected: FAIL because the stylesheet still exposes SUSS tokens and layouts.

- [ ] **Step 3: Replace the global token and base system**

Define:

```css
:root {
  --care-navy: #14284b;
  --care-crimson: #c8102e;
  --neighbourhood-aqua: #a9dde2;
  --activity-lilac: #cec8ea;
  --canvas-mist: #f4f7f8;
  --ink: #172233;
  --muted: #596776;
  --glass: rgba(255, 255, 255, 0.76);
  --line: rgba(20, 40, 75, 0.13);
  --shadow: 0 24px 70px rgba(20, 40, 75, 0.11);
  --font-display: 'Aptos Display', 'Arial Rounded MT Bold', 'Trebuchet MS', sans-serif;
  --font-body: 'Aptos', 'Segoe UI', Arial, sans-serif;
}
```

Use mist canvas gradients, an accessible crimson focus outline, a sticky translucent header, reusable shell, buttons, section headings, and glass-card hover that does not conceal content.

- [ ] **Step 4: Implement section, search, and pathway layouts**

Style:

- Two-column hero with a large display thesis and quieter application card.
- A single absolute `.programme-ribbon` as the hero signature.
- Five-card fit and domain grids with intentional asymmetry at wide widths.
- `.evidence-finder` glass surface with labelled input, wrap-safe filter chips, result count, and readable result cards.
- Connected five-column `.programme-pathway` on desktop, two columns on tablet, and one-column vertical flow on mobile.
- AAC-first timeline, credential grid, language panel, and high-contrast contact close.

- [ ] **Step 5: Implement responsive and motion safeguards**

At `960px`, collapse hero and split layouts. At `720px`, use single-column evidence and credential layouts and simplify the ribbon. At `480px`, stack contact actions, preserve 44-pixel controls, and remove nonessential ribbon segments. Add:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 6: Run the style and complete unit suite**

Run: `npm run test:run`

Expected: PASS with no SUSS visual-contract assertions and all content, interaction, accessibility, metadata, and deployment tests green.

- [ ] **Step 7: Record the task**

Note Task 4 completion in this plan because Git metadata is unavailable.

### Task 5: Build and visually verify the production experience

**Files:**
- Modify only if verification reveals an in-scope defect.
- Create: `output/playwright/care-corner-programme-associate-desktop.png`
- Create: `output/playwright/care-corner-programme-associate-mobile.png`

**Interfaces:**
- Consumes the production `dist` generated by Tasks 1-4.
- Produces verified desktop and mobile screenshots and a concise test report.

- [ ] **Step 1: Run the complete automated gate**

Run: `npm run check`

Expected: all Vitest tests PASS, TypeScript build PASS, and Vite production bundle created in `dist`.

- [ ] **Step 2: Start a clean production preview**

Run: `npm start`

Expected: Vite preview listens on `http://localhost:3000` without application errors.

- [ ] **Step 3: Verify the desktop path**

At 1440×1000:

- Confirm the first viewport contains target role, Care Corner, current AAC proof, language proof, and all primary actions.
- Navigate every header anchor.
- Search for `attendance`, filter by `Volunteers`, trigger an empty query, and reset.
- Confirm resume and cover-letter links resolve.
- Tab through the header, hero actions, search, filters, and reset with visible focus.
- Confirm no console errors and `document.documentElement.scrollWidth <= window.innerWidth`.
- Save `output/playwright/care-corner-programme-associate-desktop.png`.

- [ ] **Step 4: Verify the mobile path**

At 390×844:

- Confirm no horizontal overflow.
- Open and close the mobile menu; follow `Evidence finder`.
- Confirm the hero, application card, search controls, filters, pathway, credentials, and contact actions reflow without clipped text.
- Repeat the evidence empty-state reset.
- Save `output/playwright/care-corner-programme-associate-mobile.png`.

- [ ] **Step 5: Critique screenshots and remove one unnecessary accessory**

Review hierarchy, contrast, density, spacing, ribbon prominence, card consistency, and mobile tap targets. If any decorative element competes with programme evidence, remove or soften it. Re-run the focused visual path after every correction.

- [ ] **Step 6: Re-run the final gate**

Run: `npm run check`

Expected: PASS after visual corrections.

- [ ] **Step 7: Report deployment status accurately**

The Vercel CLI is not installed. Recommend `npm i -g vercel` to unlock `vercel env pull`, `vercel deploy`, and `vercel logs`. Do not install it or claim a production deployment unless the user authorizes installation or connected deployment tooling completes and verifies the deployment.

