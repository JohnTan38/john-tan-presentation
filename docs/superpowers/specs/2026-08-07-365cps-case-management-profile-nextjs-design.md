# 365CPS Case Management Profile — Next.js Design

## Purpose

Rebuild John Tan's professional profile as a recruiter-focused application for the Assistant Program Facilitator position at 365 Cancer Prevention Society Singapore (365CPS). The page must demonstrate a credible transition into social services through current active-ageing practice, social-service training, dependable programme delivery, structured documentation, stakeholder coordination, and empathetic community engagement.

The page has one job: help a 365CPS hiring stakeholder quickly understand John's fit and move to a resume download, cover-letter review, LinkedIn visit, phone call, email, or interview conversation.

## Source Hierarchy

Content and brand decisions use these sources in descending order of authority:

1. The user's instructions in the active conversation.
2. `public/docs/case-management-executive.txt` for role requirements and approved profile amendments.
3. `src/data/profile.ts` and the packaged application PDFs for verified personal details and career evidence.
4. The official 365CPS website for organisation language, identity, mission, programmes, and values:
   - <https://www.365cps.org.sg/about-us/>
   - <https://www.365cps.org.sg/vision-and-mission/>
   - <https://www.365cps.org.sg/care-support/>
5. Official Next.js and OpenAI Codex documentation for implementation and verification practices.

Where the supplied job text conflicts internally between adults over 45, young adults, and the later seniors-focused amendment, the approved amendment controls the candidate story. The page will describe transferable support for adults and seniors without inventing an age-specific caseload or clinical outcomes.

## Audience and Success Criteria

The primary audience is the 365CPS hiring team. Within the first viewport, a visitor must understand:

- John is applying for an Assistant Program Facilitator role.
- His current NTUC Health Active Ageing Centre work is the lead evidence.
- His earlier technology and finance experience strengthens documentation, coordination, judgement, and follow-through.
- He has intentionally completed social-service training.
- Resume, cover letter, LinkedIn, email, and phone actions are immediately available.

The complete page must be easy to scan on mobile and desktop, function with keyboard navigation, respect reduced-motion preferences, avoid horizontal overflow at 320 CSS pixels, and deploy successfully on Vercel.

## Product Direction

The chosen concept is **The Continuum of Care**: a polished case-support dossier that feels human, calm, and operationally precise. It retains the strongest evidence-led structure of the existing profile while replacing the Care Corner programme identity with 365CPS's real visual language and mission context.

The design must not imitate the 365CPS website page-for-page. It will use the organisation's logo, colors, typography, and values as a respectful application context while maintaining a distinct candidate-owned layout.

## Content Architecture

1. **Sticky header** — John Tan identity, concise section navigation, and a direct contact action. The 365CPS logo appears in an `Application prepared for` lockup, never as the site's owner mark.
2. **Hero thesis** — John, target role, 365CPS context, a short transition statement, language capability, and primary actions. The visual companion is an application brief mapping current practice, social-service preparation, and operational depth.
3. **Role-fit evidence** — verified evidence mapped to client support, programme facilitation, documentation, stakeholder coordination, community engagement, and centre operations.
4. **Care-support pathway** — listen and understand, plan and coordinate, connect resources, record and follow through, and learn and improve. It describes a transferable working method rather than claiming completed oncology casework.
5. **Evidence finder** — an accessible client-side search and category filter for the underlying evidence. Categories reflect the target role: Client support, Programmes, Documentation, Partnerships, and Operations.
6. **Mission alignment** — concise mapping to 365CPS's tri-fold mission of cancer prevention, cancer fighting, and cancer education, plus the organisation's values of compassion, integrity, stewardship, honour, and excellence. Copy describes alignment and readiness, not prior employment or endorsement.
7. **Career transition** — current NTUC Health AAC work first, followed by ST Engineering and finance roles, with explicit explanation of how earlier experience transfers into social-service delivery.
8. **Credentials and communication** — Diploma in Social Service, higher education, accolades, language capability, and digital confidence.
9. **Closing invitation** — a concise interview-oriented statement and the same reliable contact/document actions.

## Visual System

The visual system derives from the official 365CPS Elementor design tokens downloaded from the organisation's current site on 7 August 2026.

### Brand Tokens

- Primary 365 red: `#B20411`.
- Dark red: `#5D0004`.
- Warm blush: `#FFE9EA`.
- Coral support: `#FF646B`.
- Warm cream: `#F9F3E4`.
- Gold support: `#D5C593`.
- Deep ink: `#0C111D`.
- Secondary ink: `#464659`.
- White: `#FFFFFF`.

Red is the only dominant accent. Cream and gold provide warmth; blush provides low-contrast section atmosphere; dark ink maintains professional legibility. Coral appears only in small data markers and pathway nodes.

### Typography

- Primary display and body family: `Urbanist`, matching the official 365CPS identity.
- Human accent: `Edu QLD Beginner`, used sparingly for one short handwritten-style phrase or annotation, never for core content or controls.
- System fallbacks: `Arial`, `Helvetica`, and `sans-serif`.

Fonts will be loaded through `next/font/google` so Next.js self-hosts the generated font files and avoids a browser-time Google Fonts request.

### Logo Treatment

Use the official black 365CPS logo asset from:

`https://www.365cps.org.sg/wp-content/uploads/2025/10/365-black.svg`

The asset will be copied to `public/brand/365cps-logo.svg` and rendered with `next/image` using intrinsic dimensions. It must not be recolored, cropped, stretched, animated, or combined with John's monogram. It always sits beside the label `Application prepared for` or `Prepared for`, which prevents the page from implying that it is an official 365CPS property.

### Layout and Signature

The signature element is a continuous red **care thread** that moves from the hero application brief through five case-support waypoints. The line encodes follow-through rather than decoration: each waypoint maps to a real stage in the proposed working method.

The hero uses an asymmetric two-column layout at wide sizes: a decisive candidate thesis on the left and a compact evidence dossier on the right. Supporting sections alternate between restrained white surfaces and warm cream fields. Cards use thin warm-grey borders, limited shadow, and small radii rather than pervasive glassmorphism.

The page will avoid the generic dark-neon, beige-editorial, and dashboard-card aesthetics. Its one visual risk is the oversized vertical `365` rhythm in the hero backdrop, derived from the organisation's name and rendered as low-contrast typography behind the application dossier. It disappears on small screens and never competes with the official logo.

### Motion

Motion is concentrated in one orchestrated hero entrance and subtle section reveals. Evidence-filter results update without layout-jarring transitions. Hover movement is limited to two pixels. All optional animation is disabled under `prefers-reduced-motion: reduce`.

## Next.js Architecture

Migrate from Vite to the latest stable Next.js release available through `next@latest`, using App Router and TypeScript.

- `app/layout.tsx` owns global metadata, canonical URL, social metadata, fonts, and the root document.
- `app/page.tsx` is a Server Component that composes the static profile.
- Static presentation components remain Server Components.
- `Header`, `EvidenceFinder`, and motion wrappers are isolated Client Components.
- `src/data/profile.ts` remains the single typed content source.
- `app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`, `app/icon.svg`, and `app/opengraph-image.tsx` provide production discovery and fallback surfaces.
- Public PDFs, the official logo copy, and supporting image assets live beneath `public/` at stable URLs.
- No database, authentication, CMS, analytics provider, form backend, or external runtime service is required.

The page will render statically wherever possible. Client components receive serializable props only. The default Node.js runtime is retained; no Edge runtime is needed.

## Data Flow and Component Boundaries

`src/data/profile.ts` exports typed immutable objects for profile identity, contact actions, role-fit evidence, care pathway, mission alignment, career, credentials, and languages. Server Components render that data directly. `EvidenceFinder` receives only its evidence array and holds local query/category state. No component fetches data at runtime.

Each component has one responsibility:

- `Header` manages responsive navigation state and accessible menu labels.
- `ContactLinks` renders stable document and contact anchors.
- `Hero` renders the candidate thesis and application brief.
- `RoleFit` presents recruiter-scannable evidence.
- `CarePathway` renders the ordered working method.
- `EvidenceFinder` searches and filters verified evidence.
- `MissionAlignment` maps candidate behavior to official 365CPS values.
- `CareerTransition` explains the mid-career transition without hiding chronology.
- `Credentials` presents qualifications and communication readiness.
- `MotionReveal` contains optional client-side reveal behavior.

## Error and Fallback Behavior

- A clear custom not-found page returns visitors to the profile.
- Evidence search shows an explanatory empty state and reset action.
- The page remains fully readable if client-side JavaScript or motion is unavailable; only filtering and mobile-menu enhancement depend on hydration.
- Document links use stable same-origin public paths and descriptive download labels.
- External links use `rel="noreferrer"` and expose their destination in accessible names when ambiguity is possible.
- Missing decorative imagery cannot hide any career evidence because all essential content is text.

## Accessibility and Responsive Requirements

- One `h1`, ordered heading levels, semantic landmarks, and named sections.
- Skip link targeting the main content.
- Minimum 44-by-44 CSS pixel interactive targets on touch layouts.
- Visible `:focus-visible` treatment with sufficient contrast.
- Buttons and menu controls expose accurate expanded, pressed, and accessible-name states.
- The official logo has descriptive alternative text; decorative thread elements are hidden from assistive technology.
- Color never carries meaning alone.
- Text contrast targets WCAG 2.2 AA.
- Layouts are explicitly checked at 320, 390, 768, 1024, and 1440 CSS pixels.
- Reduced-motion users receive no smooth scrolling or reveal animation.

## Testing and Review Strategy

Implementation follows test-first increments. Each behavior test must be observed failing for the intended reason before production code is added.

### Unit and Integration Tests

- Content contract: target role, 365CPS organisation, verified chronology, document paths, languages, mission terms, and forbidden unsupported claims.
- Application structure: all named sections, semantic landmarks, heading order, logo context, and primary actions.
- Evidence finder: query, category, combined filtering, result count, empty state, and reset.
- Header: open, close, Escape, navigation selection, focus behavior, and ARIA state.
- Metadata: canonical URL, title, description, social image, robots, and sitemap.
- Visual contract: official color tokens, font variables, focus rules, responsive breakpoints, and reduced motion.

### Browser Smoke Tests

Playwright covers production-mode desktop and mobile flows:

- Root page returns HTTP 200 and contains the target role.
- No browser console errors or failed first-party asset requests.
- Navigation reaches each section.
- Mobile menu opens, closes, and does not trap the page incorrectly.
- Evidence search and category filtering work.
- Resume, cover letter, logo, social image, and infographic return HTTP 200.
- Email, telephone, LinkedIn, and website links have correct destinations.
- No horizontal overflow at required viewports.
- Reduced-motion emulation removes optional animation.

### Production Gates

The release is not complete until all of these run successfully from a clean current worktree:

- Full Vitest suite with zero failures.
- Full Playwright smoke suite with zero failures.
- TypeScript check with zero errors.
- ESLint with zero errors.
- Next.js production build with exit code 0.
- Production server smoke check against built output.
- Desktop and mobile screenshot review.
- Code-quality review covering correctness, regression risk, accessibility, performance, and missing tests.
- Requirement-by-requirement completion audit against this specification.

## Vercel Delivery

Vercel should use native Next.js framework detection. Obsolete Vite rewrites and output-directory configuration will be removed. Security headers will be retained through the current supported Vercel project configuration mechanism, and `.vercel/` remains ignored because it contains local project linkage.

The local environment does not currently have the Vercel CLI installed. Local production build and browser verification provide the fallback validation path. Final deployment verification can use `vercel deploy` and `vercel logs` after installing the CLI with `npm i -g vercel`.

## Boundaries

- Do not claim 365CPS employment, endorsement, oncology expertise, clinical credentials, crisis-intervention outcomes, or completed cancer case-management outcomes.
- Do not describe current NTUC Health work beyond evidence present in repository sources.
- Do not publish Jojo's name or employment relationship from the draft email.
- Do not reproduce client testimonials or sensitive personal stories from the 365CPS site.
- Do not add dependencies beyond those required for Next.js, testing, linting, and the existing motion behavior without explicit approval.
- Do not add a contact form, database, external analytics, CMS, or new cloud service.
- Do not alter the supplied resume or cover-letter content as part of the website migration.

## Definition of Done

The work is complete only when the approved 365CPS visual identity and logo treatment are implemented, the role-specific candidate narrative is accurate, the current Vite application is fully migrated to Next.js App Router, all required assets and metadata are present, every automated and browser test passes, the production build succeeds, desktop and mobile visual review finds no release-blocking issue, and the final quality audit finds no unresolved correctness or accessibility defect.
