# Assistant Program Facilitator Profile Refresh

## Objective

Refresh John Tan's 365 Cancer Prevention Society Singapore application profile so the target position is consistently presented as **Assistant Program Facilitator**, while preserving **Programme Associate** as the verified current NTUC Health employment title. Add current SUSS social-work study, lighten the visual identity, regenerate the downloadable application documents, and retain the existing production quality gates.

## Content Scope

- Replace every recruiter-facing and technical occurrence of the former target job title with `Assistant Program Facilitator`.
- Update page content, metadata, Open Graph content, footer text, package identity, tests, PDF generator copy, PDF metadata, PDF headers, downloadable filenames, and public download paths.
- Preserve `Programme Associate` wherever it refers to John's verified NTUC Health employment.
- Add the credential `Graduate Diploma in Social Work` at `Singapore University of Social Sciences (SUSS)` with the status `Currently enrolled`.
- Present the current SUSS enrolment before completed qualifications without inventing a start date, expected completion date, grades, modules, placements, or professional registration.
- Preserve all existing claim-safety boundaries, contact information, employment chronology, languages, and 365CPS logo treatment.

## Visual Direction

The refreshed profile retains the established Continuum of Care structure but changes its emotional temperature from dark institutional red to an approachable warm rose spectrum.

### Palette

- Rosewater canvas: `#FFF7F7`
- Warm blush: `#FFE4E8`
- Petal pink: `#FFC9D1`
- Medium rose: `#D94F60`
- Official 365CPS red: `#B20411`
- Deep berry for accessible emphasis: `#7A1420`
- Deep ink: `#0C111D`
- Secondary ink: `#464659`
- White: `#FFFFFF`

The official red remains a restrained identity anchor. Large backgrounds use light-to-medium warm pink/red gradients. Deep berry replaces nearly black red surfaces where sufficient contrast is required. Text uses deep ink or white according to verified contrast needs.

### Layout and Signature

- Preserve the asymmetric recruiter-facing hero, application dossier, evidence structure, care pathway, mission alignment, career timeline, credentials, and closing invitation.
- Retain the oversized `365` backdrop and care-thread signature as the distinctive visual device.
- Convert the hero, pathway, career, and contact atmospheres to lighter layered gradients without weakening hierarchy or contrast.
- Keep Urbanist as the primary family and Edu QLD Beginner as the restrained human accent.
- Maintain 44-pixel touch targets, visible focus states, reduced motion, and overflow safety from 320 through 1440 CSS pixels.

## PDF Deliverables

- Create `John_Tan_Resume_Assistant_Program_Facilitator.pdf`.
- Create `John_Tan_Cover_Letter_Assistant_Program_Facilitator.pdf`.
- Replace the target title in PDF headings, body copy, document metadata, and running headers.
- Add current SUSS enrolment to the resume education section and reference it accurately in the cover letter.
- Preserve the verified NTUC Health title `Programme Associate` in both documents.
- Apply the lighter rose palette to PDF headers, rules, and supporting surfaces while retaining professional legibility.
- Extract text from both PDFs to verify content, render every page to PNG, and inspect for clipping, overlap, broken glyphs, poor spacing, and misleading content.
- Move superseded target-role PDFs out of the public download directory after the new assets pass validation.

## Testing Strategy

Implementation follows red-green test-first increments:

1. Update the content contract to require the new target title and SUSS credential, then observe the expected failures.
2. Update metadata and application tests to require the new title and new PDF paths, then observe the expected failures.
3. Update the visual contract to require the lighter palette, then observe the expected failures.
4. Implement the content, metadata, styling, PDF generator, and public assets.
5. Run focused tests, the full Vitest suite, TypeScript, ESLint, the Next.js production build, and Playwright desktop/mobile tests.
6. Confirm the development server and production server return the updated title and all new assets return HTTP 200.
7. Inspect fresh 1440-by-1000 and 390-by-844 screenshots and every regenerated PDF page.

## Acceptance Criteria

- No former target-title occurrence remains in deployable code, tests, metadata, filenames, or generated documents.
- `Programme Associate` remains the NTUC Health employment title.
- The SUSS Graduate Diploma appears as current enrolment on the website and resume, with no unsupported dates or outcomes.
- The page uses visibly lighter warm pink/red gradients while retaining accessible text contrast and the official 365CPS logo context.
- New resume and cover-letter links work and the PDFs contain the correct title and credential.
- Unit, accessibility, browser, type, lint, build, security, and runtime checks pass with zero failures.

## Boundaries

- Do not change historical employment titles.
- Do not imply completion of the SUSS programme, social-work registration, clinical expertise, oncology experience, 365CPS employment, or 365CPS endorsement.
- Do not add dates or course details that the user did not provide.
- Do not add services, analytics, authentication, storage, or other dependencies.
