# Assistant Program Facilitator Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retarget the complete 365CPS application to Assistant Program Facilitator, add current SUSS social-work enrolment, introduce a lighter warm rose visual system, and regenerate verified downloadable documents.

**Architecture:** Preserve the existing Next.js App Router and typed immutable profile model. Change the target-role contract at the data boundary so metadata, UI, tests, and generated assets agree; keep the verified NTUC Health role unchanged. Retain the existing component structure and implement the palette refresh entirely through the established CSS token system.

**Tech Stack:** Next.js 16.3, React 19, TypeScript, CSS, Vitest, Testing Library, Playwright, ReportLab, PyPDF, PyMuPDF.

## Global Constraints

- Use the exact target title `Assistant Program Facilitator`.
- Preserve `Programme Associate` as the NTUC Health employment title.
- Add `Graduate Diploma in Social Work`, `Singapore University of Social Sciences (SUSS)`, with status `Currently enrolled` and no invented dates.
- Use rosewater `#FFF7F7`, warm blush `#FFE4E8`, petal pink `#FFC9D1`, medium rose `#D94F60`, official red `#B20411`, deep berry `#7A1420`, ink `#0C111D`, secondary ink `#464659`, and white.
- Preserve claim-safety boundaries, contact details, chronology, language capability, logo context, accessibility, reduced motion, and widths from 320 through 1440 CSS pixels.
- Do not add dependencies or external services.
- This workspace is not a Git repository; record verified checkpoints without commits.

---

### Task 1: Retarget the Typed Content and Metadata Contract

**Files:**
- Modify: `tests/profile.test.ts`
- Modify: `tests/metadata.test.ts`
- Modify: `tests/App.test.tsx`
- Modify: `e2e/profile.spec.ts`
- Modify: `src/data/profile.ts`
- Modify: `app/layout.tsx`
- Modify: `app/opengraph-image.tsx`
- Modify: `app/page.tsx`
- Modify: `src/components/ContactLinks.tsx`
- Modify: `package.json`, `package-lock.json`

**Interfaces:**
- Produces `profile.targetRole === 'Assistant Program Facilitator'`.
- Produces `profile.resume === '/docs/John_Tan_Resume_Assistant_Program_Facilitator.pdf'` and the matching cover-letter path.
- Adds a current credential object without changing the existing `Credential` shape.

- [x] **Step 1: Change content and metadata assertions before production code**

Require the exact new target title, new document paths, the current SUSS credential, and continued presence of the NTUC Health `Programme Associate` role. Change the package name expectation to `john-tan-365cps-assistant-program-facilitator-profile`.

- [x] **Step 2: Run focused tests and confirm RED**

Run: `npm test -- --run tests/profile.test.ts tests/metadata.test.ts tests/App.test.tsx`

Expected: failures show the old target title, old download paths, missing SUSS credential, and old package identity.

- [x] **Step 3: Implement the content and metadata changes**

Update the target role and context, insert this credential first:

```ts
{
  qualification: 'Graduate Diploma in Social Work',
  institution: 'Singapore University of Social Sciences (SUSS)',
  period: 'Currently enrolled',
  detail: 'Current formal study in social work.',
  featured: true,
}
```

Remove `featured` from the completed Diploma in Social Service so only the current qualification receives the lead treatment. Update page metadata, Open Graph text, footer copy, contact download filenames, package identity, and E2E asset paths.

- [x] **Step 4: Re-run focused tests and confirm GREEN**

Run: `npm test -- --run tests/profile.test.ts tests/metadata.test.ts tests/App.test.tsx`

Expected: all focused tests pass.

---

### Task 2: Implement the Lighter Warm Rose Visual System

**Files:**
- Modify: `tests/styles.test.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Produces the CSS tokens `--rosewater`, `--brand-blush`, `--brand-petal`, `--brand-rose`, `--brand-red`, and `--brand-berry`.
- Preserves existing component class names and responsive behavior.

- [x] **Step 1: Change visual contract assertions before CSS**

Require the six approved rose tokens and require gradient backgrounds for `.hero`, `.section--pathway`, `.section--experience`, and `.contact`.

- [x] **Step 2: Run the visual test and confirm RED**

Run: `npm test -- --run tests/styles.test.ts`

Expected: failures identify missing rosewater, petal, rose, berry, and lighter-gradient rules.

- [x] **Step 3: Implement the token and surface refresh**

Use rosewater and blush for the page canvas and evidence surfaces; use petal-to-medium-rose gradients for large atmospheres; reserve official red for identity markers and active controls; use deep berry or ink for accessible text. Preserve the oversized `365`, dossier, care thread, layout, focus, reduced-motion, and touch-target rules.

- [x] **Step 4: Re-run the visual and component suites**

Run: `npm test -- --run tests/styles.test.ts tests/App.test.tsx tests/accessibility.test.tsx`

Expected: all tests pass.

---

### Task 3: Regenerate and Validate the Application PDFs

**Files:**
- Modify: `scripts/build_application_pdfs.py`
- Create: `public/docs/John_Tan_Resume_Assistant_Program_Facilitator.pdf`
- Create: `public/docs/John_Tan_Cover_Letter_Assistant_Program_Facilitator.pdf`
- Create: `output/pdf/John_Tan_Resume_Assistant_Program_Facilitator.pdf`
- Create: `output/pdf/John_Tan_Cover_Letter_Assistant_Program_Facilitator.pdf`
- Remove after validation: superseded public/output target-role PDFs.

**Interfaces:**
- `python scripts/build_application_pdfs.py` generates both stable filenames in `output/pdf/` and copies them into `public/docs/`.
- Extracted resume text must contain `Assistant Program Facilitator`, `Graduate Diploma in Social Work`, `Singapore University of Social Sciences (SUSS)`, `Currently enrolled`, and `Programme Associate`.

- [x] **Step 1: Update the generator source and filenames**

Replace target-title headings, metadata, cover-letter paragraphs, output filenames, and running headers. Add the SUSS credential before completed education. Replace dark-maroon PDF surfaces with petal, rose, and deep-berry accents while retaining readable ink text.

- [x] **Step 2: Generate both documents**

Run: `python scripts/build_application_pdfs.py`

Expected: two new files in both `output/pdf/` and `public/docs/`.

- [x] **Step 3: Extract and validate document content**

Use PyPDF to assert the new title and SUSS credential are present in both appropriate documents, `Programme Associate` remains in both where current employment is described, and the former target title is absent.

- [x] **Step 4: Render and inspect every page**

Use PyMuPDF at 1.5x scale into `tmp/pdfs/`. Inspect every PNG for clipping, overlap, broken glyphs, weak contrast, spacing, page headers, footers, and page numbers.

- [x] **Step 5: Remove superseded public/output PDFs**

After successful content and visual validation, remove only the four exact superseded target-role PDF paths. Confirm `public/docs/` contains only the new resume and cover letter.

---

### Task 4: Clean Stale Target References and Verify Production

**Files:**
- Modify: active 2026-08-07 specification and plan documents where the former target role is described.
- Modify only implementation files implicated by a failing check.

**Interfaces:**
- Produces a deployable tree with no former target title in app, source, tests, E2E, package metadata, PDF generator, public filenames, or current generated PDFs.

- [x] **Step 1: Scan for stale target references**

Run a case-insensitive search for the superseded target title across `app`, `src`, `tests`, `e2e`, `scripts`, package metadata, public assets, generated PDFs, and current specifications/plans.

Expected: no current target-role occurrence remains; historical source/archive material is excluded from the deployable check.

- [x] **Step 2: Run the complete quality gate**

Run: `npm run check`

Expected: 21 or more Vitest assertions, TypeScript, ESLint, Next.js production build, and all Playwright desktop/mobile checks pass.

- [x] **Step 3: Run the security audit and development smoke check**

Run: `npm audit`, then launch `npm run dev` on isolated port 3010 and verify `/` returns HTTP 200 with title `John Tan | 365CPS Assistant Program Facilitator`.

- [x] **Step 4: Inspect final browser screenshots**

Inspect fresh `output/playwright/desktop-chromium-profile.png` at 1440-by-1000 and `output/playwright/mobile-chromium-profile.png` at 390-by-844. Verify the lighter warm palette, hierarchy, official logo integrity, title, SUSS credential, CTA visibility, and absence of overflow.

- [x] **Step 5: Complete the review checkpoint**

Report test counts, build status, runtime status, PDF page/content checks, security audit, and any residual deployment limitation. Record that no commit was possible because the directory has no Git repository.
