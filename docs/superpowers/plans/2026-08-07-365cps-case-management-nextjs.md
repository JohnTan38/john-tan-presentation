# 365CPS Case Management Profile Next.js Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a production-ready Next.js professional profile for John Tan's Assistant Program Facilitator application to 365 Cancer Prevention Society Singapore.

**Architecture:** Replace the current Vite SPA with a statically renderable Next.js App Router page. Keep verified content in typed immutable data, render static sections as Server Components, and isolate navigation, evidence filtering, and optional motion into small Client Components.

**Tech Stack:** Next.js latest stable, React 19, TypeScript, Motion, Vitest, Testing Library, ESLint, Playwright, CSS, Vercel.

## Global Constraints

- Use the exact target title `Assistant Program Facilitator` in the recruiter-facing hero.
- Use 365 Cancer Prevention Society Singapore as the target organisation.
- Use the official 365CPS logo from `https://www.365cps.org.sg/wp-content/uploads/2025/10/365-black.svg` only beside `Application prepared for` or `Prepared for`.
- Use official brand tokens: primary `#B20411`, dark red `#5D0004`, blush `#FFE9EA`, coral `#FF646B`, cream `#F9F3E4`, gold `#D5C593`, ink `#0C111D`, secondary ink `#464659`, and white `#FFFFFF`.
- Use Urbanist as the primary family and Edu QLD Beginner only as a restrained accent.
- Do not claim 365CPS employment, endorsement, oncology expertise, clinical credentials, crisis outcomes, or completed cancer case-management outcomes.
- Do not expose Jojo's name or employment relationship.
- Preserve verified contact details, career chronology, language capability, and supplied PDFs.
- Support keyboard navigation, WCAG 2.2 AA contrast, reduced motion, and widths from 320 through 1440 CSS pixels.
- Do not add a database, authentication, contact-form backend, CMS, analytics provider, or external runtime service.
- Preserve `.vercel/` in `.gitignore`.

---

## File Structure

- `app/layout.tsx` — root document, fonts, canonical and social metadata.
- `app/page.tsx` — Server Component composing the profile.
- `app/globals.css` — tokens, layout, responsive behavior, interactions, and reduced motion.
- `app/not-found.tsx` — branded 404 fallback.
- `app/icon.svg` — candidate-owned favicon.
- `app/opengraph-image.tsx` — generated social card.
- `app/robots.ts`, `app/sitemap.ts` — crawler metadata.
- `src/data/profile.ts` — typed immutable content contract.
- `src/components/Header.tsx` — responsive navigation Client Component.
- `src/components/EvidenceFinder.tsx` — evidence search/filter Client Component.
- `src/components/MotionReveal.tsx` — reduced-motion-aware enhancement boundary.
- `src/components/ContactLinks.tsx` — document/contact links.
- `src/components/ProfileSections.tsx` — focused static section components.
- `public/brand/365cps-logo.svg` — official local logo copy.
- `tests/profile.test.ts` — content and claim-safety contract.
- `tests/app.test.tsx` — semantic application and interaction contract.
- `tests/metadata.test.ts` — metadata route behavior.
- `tests/styles.test.ts` — visual/accessibility token contract.
- `e2e/profile.spec.ts` — desktop/mobile production smoke flows.
- `playwright.config.ts` — production web-server test configuration.
- `next.config.ts`, `eslint.config.mjs`, `vitest.config.ts`, `tsconfig.json` — framework and quality configuration.
- `package.json` — deterministic development, checking, production, and smoke scripts.

---

### Task 1: Establish the 365CPS Content Contract

**Files:**
- Modify: `tests/profile.test.ts`
- Modify: `src/data/profile.ts`

**Interfaces:**
- Produces: `profile`, `languages`, `roleFit`, `casePathway`, `evidenceItems`, `missionAlignment`, `career`, `capabilityGroups`, and `credentials` as readonly serializable data.
- Consumes: repository role brief and verified candidate details.

- [x] **Step 1: Replace the existing employer test with a failing 365CPS content contract**

```ts
expect(profile).toMatchObject({
  targetRole: 'Assistant Program Facilitator',
  targetOrganisation: '365 Cancer Prevention Society Singapore',
})
expect(casePathway.map(({ title }) => title)).toEqual([
  'Listen & understand',
  'Plan & coordinate',
  'Connect resources',
  'Record & follow through',
  'Learn & improve',
])
expect(JSON.stringify({ profile, roleFit, evidenceItems })).not.toMatch(
  /oncology expertise|clinical credentials|completed cancer case management|Jojo/i,
)
```

- [x] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- --run tests/profile.test.ts`

Expected: FAIL because the current data targets Care Corner and does not export `casePathway` or `missionAlignment`.

- [x] **Step 3: Implement the typed 365CPS data model**

Define literal union types for evidence categories and pathway titles. Lead with current NTUC Health evidence; reframe technology and finance as documentation, data stewardship, stakeholder judgement, and operational follow-through. Include official mission/value labels only as alignment statements.

- [x] **Step 4: Re-run the focused test and confirm GREEN**

Run: `npm test -- --run tests/profile.test.ts`

Expected: PASS with zero failing assertions.

- [x] **Step 5: Record the task checkpoint**

Run: `git rev-parse --is-inside-work-tree`

Expected in this workspace: command reports that no Git repository exists, so retain the verified working tree without initializing or committing.

---

### Task 2: Migrate Tooling and Metadata to Next.js (complete)

**Files:**
- Modify: `package.json`, `package-lock.json`, `tsconfig.json`, `.gitignore`
- Create: `next.config.ts`, `eslint.config.mjs`, `vitest.config.ts`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/icon.svg`, `app/opengraph-image.tsx`, `app/globals.css`
- Modify: `tests/deployment.test.ts` into `tests/metadata.test.ts`
- Remove after green: `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`

**Interfaces:**
- Produces: Next.js root route, metadata routes, and scripts `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:run`, `test:e2e`, and `check`.
- Consumes: content exports from Task 1.

- [x] **Step 1: Write failing metadata and script tests**

```ts
expect(packageJson.scripts).toMatchObject({
  dev: 'next dev',
  build: 'next build',
  start: 'next start',
  lint: 'eslint .',
  typecheck: 'tsc --noEmit',
})
expect(metadata.title).toContain('365CPS')
expect(robots().rules).toEqual({ userAgent: '*', allow: '/' })
expect(sitemap()[0]?.url).toBe('https://john-tan-presentation.vercel.app')
```

- [x] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- --run tests/metadata.test.ts`

Expected: FAIL because Next.js metadata files and scripts do not exist.

- [x] **Step 3: Replace Vite dependencies and configuration**

Install `next@latest`, `eslint`, `eslint-config-next`, and `@playwright/test`; remove Vite packages. Retain React, React DOM, Motion, Vitest, jsdom, and Testing Library. Configure Vitest with jsdom and the existing setup file.

- [x] **Step 4: Implement the root Server Component and metadata routes**

Use a Server Component `app/layout.tsx` with `Urbanist` and `Edu_QLD_Beginner` from `next/font/google`, a canonical URL, description, Open Graph/Twitter configuration, and theme color. Implement `robots`, `sitemap`, branded not-found UI, and a 1200-by-630 `ImageResponse` social card on the default Node.js runtime.

- [x] **Step 5: Re-run the metadata test and confirm GREEN**

Run: `npm test -- --run tests/metadata.test.ts`

Expected: PASS.

- [x] **Step 6: Run TypeScript and resolve framework-boundary errors**

Run: `npm run typecheck`

Expected: exit 0; no async Client Components and no non-serializable Server-to-Client props.

---

### Task 3: Build the Semantic Profile and Client Interactions (complete)

**Files:**
- Create: `src/components/Header.tsx`, `src/components/EvidenceFinder.tsx`, `src/components/MotionReveal.tsx`, `src/components/ContactLinks.tsx`, `src/components/ProfileSections.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/App.test.tsx`, `tests/accessibility.test.tsx`, `tests/evidence-finder.test.tsx`, `tests/setup.ts`
- Remove after green: obsolete `src/App.tsx`, `src/components/GlassCard.tsx`, `src/components/ProjectRoute.tsx`, `src/components/SectionHeading.tsx`

**Interfaces:**
- `Header(): JSX.Element` owns mobile menu state and exposes `aria-expanded`.
- `EvidenceFinder({ items }: { items: readonly EvidenceItem[] }): JSX.Element` owns query/category state.
- `MotionReveal({ children, className }: { children: ReactNode; className?: string }): JSX.Element` enhances content without hiding it pre-hydration.
- `ContactLinks({ context?: 'hero' | 'footer' }): JSX.Element` renders consistent contact/document actions.
- `ProfileSections` exports `Hero`, `RoleFit`, `CarePathway`, `MissionAlignment`, `CareerTransition`, and `Credentials` Server Components.

- [x] **Step 1: Write failing semantic and interaction tests**

```tsx
render(<Page />)
expect(screen.getByRole('heading', { level: 1, name: /care that follows through/i })).toBeVisible()
expect(screen.getByRole('img', { name: /365 cancer prevention society/i })).toBeVisible()
expect(screen.getByText(/application prepared for/i)).toBeVisible()
expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute('href', profile.resume)
```

For the header, verify open, Escape close, link selection close, and accurate `aria-expanded`. For the evidence finder, verify combined text/category filtering, literal result counts, empty guidance, and reset.

- [x] **Step 2: Run component tests and confirm RED**

Run: `npm test -- --run tests/App.test.tsx tests/accessibility.test.tsx tests/evidence-finder.test.tsx`

Expected: FAIL because the new page and 365CPS interactions are absent.

- [x] **Step 3: Implement the smallest semantic page that satisfies the tests**

Use one `h1`, named `section` elements, a skip link, real anchors for contact actions, and local `next/image` assets. Static content remains in Server Components; add `'use client'` only to the three interactive boundaries.

- [x] **Step 4: Re-run component tests and confirm GREEN**

Run: `npm test -- --run tests/App.test.tsx tests/accessibility.test.tsx tests/evidence-finder.test.tsx`

Expected: PASS with zero warnings about invalid HTML, hydration, or missing React keys.

- [x] **Step 5: Refactor focused component boundaries while tests remain green**

Run: `npm test -- --run`

Expected: the full Vitest suite passes after obsolete Care Corner assertions are replaced.

---

### Task 4: Implement the Official Brand System and Assets (complete)

**Files:**
- Create: `public/brand/365cps-logo.svg`
- Modify: `app/globals.css`, `app/page.tsx`, `src/components/ProfileSections.tsx`
- Modify: `tests/styles.test.ts`, `tests/favicon.test.ts`

**Interfaces:**
- Produces CSS custom properties `--brand-red`, `--brand-red-dark`, `--brand-blush`, `--brand-coral`, `--brand-cream`, `--brand-gold`, `--ink`, `--ink-secondary`, and `--surface`.
- Produces responsive layouts and the semantic `.care-thread` signature.

- [x] **Step 1: Write failing behavior-oriented visual contract tests**

Assert that rendered primary actions and focus rings use the official primary token, that the logo file resolves and has its intrinsic 117-by-70 view box, that reduced-motion CSS disables smooth scrolling and transitions, and that responsive CSS includes the required 1024, 768, and 480 pixel adaptations.

- [x] **Step 2: Run visual tests and confirm RED**

Run: `npm test -- --run tests/styles.test.ts tests/favicon.test.ts`

Expected: FAIL because the current Care Corner tokens and visual structures remain.

- [x] **Step 3: Copy the official logo into the production asset tree**

Copy the already downloaded official source from `tmp/365-black.svg` to `public/brand/365cps-logo.svg` without modifying its contents.

- [x] **Step 4: Implement the Continuum of Care CSS system**

Build the asymmetric hero, application dossier, care thread, recruiter-scannable evidence grid, warm mission section, timeline, credentials, contact panel, and responsive mobile order. Keep hover elevation to two pixels, enforce visible focus, ensure interactive targets are at least 44 CSS pixels on touch layouts, and disable all optional movement for reduced motion.

- [x] **Step 5: Re-run visual and full unit tests and confirm GREEN**

Run: `npm test -- --run`

Expected: all Vitest files pass.

---

### Task 5: Add Production Browser Smoke Coverage (complete)

**Files:**
- Create: `playwright.config.ts`, `e2e/profile.spec.ts`
- Modify: `package.json`

**Interfaces:**
- Produces `npm run test:e2e` against `npm run start` on port 3000 after a production build.

- [x] **Step 1: Write the Playwright smoke test before relying on it**

```ts
test('desktop profile completes the recruiter path', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Care that follows through')
  await page.getByRole('button', { name: 'Documentation' }).click()
  await expect(page.getByRole('status')).toContainText('evidence')
  expect(errors).toEqual([])
})
```

Add mobile menu, document response, first-party asset response, overflow, and reduced-motion tests with literal expected outcomes.

- [x] **Step 2: Run the smoke suite and confirm failures expose missing behavior or configuration**

Run: `npm run build && npm run test:e2e`

Expected initial result: FAIL until production server configuration and all selectors/assets align.

- [x] **Step 3: Make the minimal production and selector fixes**

Configure Playwright `webServer.command` as `npm run start`, `reuseExistingServer: false`, and projects for desktop Chromium and a mobile Chromium viewport. Fix only application behavior shown broken by the smoke tests.

- [x] **Step 4: Re-run the full smoke suite and confirm GREEN**

Run: `npm run build && npm run test:e2e`

Expected: all desktop and mobile smoke tests pass with zero failures.

---

### Task 6: Production Verification and Quality Review (complete)

**Files:**
- Modify only files implicated by a failing verification or confirmed review finding.
- Update: `docs/superpowers/plans/2026-08-07-365cps-case-management-nextjs.md` checkbox state.

**Interfaces:**
- Produces verified release evidence for tests, lint, types, build, runtime, UI, and requirements.

- [x] **Step 1: Run the complete deterministic quality gate**

Run: `npm run check`

Expected: Vitest, TypeScript, ESLint, Next production build, and Playwright all exit 0.

- [x] **Step 2: Start the built application and run HTTP smoke checks**

Run `npm run start`, then verify `/`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/brand/365cps-logo.svg`, the resume, and the cover letter return HTTP 200.

- [x] **Step 3: Capture and inspect desktop and mobile screenshots**

Capture 1440-by-1000 and 390-by-844 full-page screenshots. Inspect hierarchy, clipping, overflow, font loading, logo integrity, CTA visibility, evidence states, and section rhythm. Fix confirmed visual defects and repeat the relevant tests.

- [x] **Step 4: Perform code-quality review**

Review correctness, regressions, security headers, RSC boundaries, accessibility, performance, unused Vite artifacts, unsupported claims, and missing tests. Add a failing regression test before fixing any confirmed defect.

- [x] **Step 5: Audit every design requirement**

Map each requirement in `docs/superpowers/specs/2026-08-07-365cps-case-management-profile-nextjs-design.md` to current files, test output, runtime responses, or screenshots. Treat indirect evidence as incomplete.

- [x] **Step 6: Prepare Vercel handoff**

Confirm native Next.js detection, `.vercel/` ignore, and security headers. Report that the Vercel CLI is unavailable locally and recommend `npm i -g vercel` for `vercel env pull`, `vercel deploy`, and `vercel logs`; do not claim a live deployment without deployment evidence.
