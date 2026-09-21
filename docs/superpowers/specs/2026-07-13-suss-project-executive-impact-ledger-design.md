# SUSS Project Executive Impact Ledger Design

## Purpose

Rebuild John Tan's existing career portfolio into an interview-ready application site for the Project Executive (2-year contract) role in the S R Nathan School of Human Development at the Singapore University of Social Sciences (SUSS). The site must make his fit evident within the first screen and support that positioning with concise, factual evidence from his NTUC Health Active Ageing Centre work, project delivery background, and social-work studies.

The primary audience is the SUSS hiring team. The page's single job is to secure an interview by showing that John combines on-the-ground eldercare exposure, disciplined project administration, stakeholder coordination, reliable documentation, and a deliberate transition into social services.

## Source Of Truth

Content must remain consistent with:

- `C:\Users\admin\Downloads\John_Tan_Resume_SUSS_Project_Executive.pdf`.
- The official SUSS Project Executive posting at `https://careers.suss.edu.sg/job/Project-Executive-%281-year-contract%29/1358157766/`.
- The official SUSS brand guidance at `https://www.suss.edu.sg/about/about-suss/who-we-are/suss-logo-and-colours`.

The implementation must not invent clinical, research, procurement, budget-management, or programme-outcome claims. Familiarity with tools such as SPSS, NVivo, and Qualtrics must be described as readiness to learn, not existing proficiency.

## Success Criteria

A recruiter should understand the target role, value proposition, current social-service experience, August 2026 SUSS matriculation, and contact path without scrolling beyond the first desktop viewport. The full page must:

- Map the role's core responsibilities to evidence that is supported by the resume.
- Present NTUC Health AAC experience as the bridge between project discipline and community-based ageing work.
- Treat the Post-Graduate Diploma in Social Work at SUSS, matriculating in August 2026, as a major credential.
- Translate software-engineering and banking experience into relevant project-execution strengths without letting those sectors dominate the story.
- Offer working email, telephone, LinkedIn, and resume-download actions.
- Remain accessible, responsive, performant, and usable with motion disabled.
- Build and run as the existing static Vite application on Vercel.

## Architecture

Keep the existing Vite, React 19, TypeScript, Motion, Vitest, and Testing Library stack. Do not add runtime dependencies. Preserve the existing separation between typed content in `src/data/profile.ts`, presentation components in `src/components`, page composition in `src/App.tsx`, and the global visual system in `src/styles.css`.

The application remains a semantic single-page document rendered entirely from local data and static assets. No backend, database, analytics service, or contact form is required. SUSS brand assets and the supplied resume are copied into `public` so the production build is self-contained.

## Information Architecture

### Header

Use a compact sticky header with John Tan's name, the target role, section navigation, a resume action, and an accessible mobile menu. The official SUSS logo may appear only as application context. It must use the official digital master, retain its exclusion zone, and remain visually subordinate to John's identity.

### Hero

Lead with the thesis, **Project discipline. Human-centred purpose.** Identify the application as targeting the SUSS Project Executive role and immediately explain the three-part fit:

1. Current NTUC Health AAC programme and community experience.
2. More than two decades of structured project delivery and stakeholder coordination.
3. Post-Graduate Diploma in Social Work at SUSS, matriculating in August 2026.

The first viewport includes email, phone, LinkedIn, and resume-download actions. A compact evidence panel summarises the role, SUSS school context, current AAC exposure, and social-work learning trajectory without using unsupported statistics.

### Role-Fit Ledger

Render six recruiter-scannable evidence entries that map SUSS accountabilities to John's verified experience:

- Project administration and coordination.
- Timeline, milestone, and deliverable tracking.
- Internal and community-partner liaison.
- Attendance records, programme feedback, and documentation.
- Workshop, meeting, and event logistics.
- Reporting, presentations, and data discipline.

Each entry contains a responsibility, a concise value statement, and one factual proof point. The section must avoid inflated percentage scores or decorative proficiency meters.

### Social Impact In Practice

Present NTUC Health AAC as the central career-transition proof. Cover senior wellness programme planning across active-ageing domains, liaison with NHG, HPB, RN, and ICCP, attendance and feedback records, volunteer-instructor recruitment, and the in-centre cafe membership-campaign concept. Use an editorial layout rather than the existing tall infographic, which is tailored to the previous Care Corner narrative.

### Project Delivery System

Use a semantic ordered sequence with five stages: Plan, Coordinate, Deliver, Document, Improve. On desktop, the sequence appears as a connected ledger or route; on mobile, it becomes a vertical timeline. Hover and focus may reveal supporting evidence, but all content must remain available without hover and without JavaScript animation.

### Transferable Operating Depth

Translate earlier work into SUSS-relevant outcomes:

- ST Engineering: project milestones, dependencies, technical documentation, reports, presentations, and cross-functional coordination.
- Banking: stakeholder relationships, compliance discipline, operational accuracy, and accountable execution.

This section should communicate mature judgement and reliability while keeping eldercare and community engagement as the narrative centre.

### Learning Trajectory

Feature the Post-Graduate Diploma in Social Work at SUSS as the primary credential with the explicit wording **Matriculating August 2026**. Support it with the Diploma in Social Service, MBA, Bachelor of Science, and administrative/technical skills from the supplied resume. Avoid the ambiguous phrase "currently pursuing" before the August 2026 matriculation date.

### Contact Close

End with a direct invitation to discuss how John's AAC practice, social-work development, and project operating discipline can support community-based ageing research and engagement at SUSS. Repeat the accessible contact and resume actions.

## Visual System

The approved direction is **Impact Ledger**: a modern institutional editorial system that combines SUSS brand confidence with human-centred warmth.

- Use the official SUSS digital logo master without reconstructing or modifying it.
- Sample primary blue and red from the current official master artwork.
- Use SUSS secondary lime, light blue, and neutral grey as supporting colours.
- Build gradients from adjacent SUSS palette colours; do not introduce unrelated purple, orange, or generic neon gradients.
- Use an off-white or very pale blue-grey canvas, deep blue ink, and high-contrast white surfaces.
- Apply glassmorphism selectively to evidence panels and the sticky header through translucent fills, fine borders, restrained blur, and subtle shadows.
- Use a clean humanist sans-serif for body copy and a distinctive editorial display face or typographic treatment for the hero thesis. Fonts must be locally dependable or loaded through existing browser-safe mechanisms without adding a package.
- Use fine rules, column guides, evidence labels, status chips, and document-like metadata because these devices express the role's record-keeping and project-control responsibilities.

The deliberate aesthetic risk is a large, animated project route that passes behind and through the hero evidence panel, connecting the words Plan, Coordinate, Deliver, Document, and Improve. It serves as the site's signature and makes project execution visible rather than decorative.

## Motion And Interaction

Concentrate motion into an orchestrated hero entrance and the project-delivery route. Secondary sections use restrained opacity and vertical reveal transitions. Cards may rise slightly and sharpen their border on hover. Navigation and mobile-menu transitions must feel continuous and complete within a short duration.

Respect `prefers-reduced-motion` and Motion's reduced-motion hook. When reduction is requested, remove ambient movement, route drawing, parallax, and smooth scrolling while keeping all content and interaction states intact.

## Accessibility And Responsive Behaviour

- Use semantic header, navigation, main, section, ordered-list, article, footer, link, and button elements.
- Give every major section an accessible name through a visible heading.
- Provide a skip link and visible focus indicators.
- Ensure the mobile navigation exposes accurate `aria-expanded` and accessible names.
- Keep all text at WCAG AA contrast against its actual background, including translucent surfaces.
- Make contact and download actions usable by keyboard and assistive technology.
- Avoid horizontal overflow at 320 CSS pixels.
- Preserve the content hierarchy at mobile, tablet, laptop, and wide-desktop widths.
- Do not depend on hover for essential content.
- Use meaningful alternative text only for informative imagery; decorative marks are hidden from assistive technology.

## Content And Error Handling

The site has no network data flow at runtime, so production error states are limited to missing static assets. Tests must assert that the resume path and SUSS logo path referenced by components exist in `public`. If the official logo cannot be obtained from the official brand package, use an application-context text label instead of reconstructing or hotlinking the logo.

The resume download uses a stable, descriptive filename and the HTML `download` attribute. External profile links open safely with `rel="noreferrer"` when using a new tab. Email and phone actions use `mailto:` and `tel:` links.

## Testing And Verification

Use test-driven development for changed behaviour and content contracts. Vitest and Testing Library must cover:

- Exact target role and SUSS organisation/school context.
- All six role-fit responsibilities and their evidence.
- NTUC Health AAC experience and verified partner names.
- August 2026 SUSS matriculation wording.
- Working contact protocols and resume download.
- Semantic landmarks and accessible section names.
- Mobile-menu open, close, and navigation behaviour.
- Absence of the previous Care Corner employer target and unsupported claims.
- Required design tokens, responsive breakpoints, focus states, glass treatment, and reduced-motion overrides.
- Package scripts, metadata, static asset presence, and Vercel output configuration.

Browser verification uses Playwright CLI against a clean production preview. It covers desktop and mobile first viewports, all navigation links, the mobile menu, resume download affordance, external links, keyboard focus, image loading, console errors, and horizontal overflow. Capture final desktop and mobile screenshots under `output/playwright/` for visual review.

Run the following final checks from a clean state:

1. `npm run test:run`
2. `npm run build`
3. `npm start`
4. Playwright desktop and mobile smoke paths against the preview server.

After local verification, deploy with `npx vercel --prod`, then smoke-test the returned production URL. The deployment must not be described as successful until the production URL loads, required content is present, key controls work, and the browser console has no application errors.

## Delivery Boundaries

- Do not add dependencies, schemas, APIs, analytics, or cloud services.
- Do not change the public contact details present in the supplied resume.
- Do not claim SUSS endorsement, employment, admission completion, or research-tool proficiency.
- Do not submit a job application or communicate with SUSS.
- Do not preserve Care Corner-specific content merely for backward compatibility; this site is being retargeted to SUSS.
- Do not use arbitrary stock imagery or AI-generated portraits.
- Do not commit `.vercel` linkage metadata or credentials.
- Deployment is authorised only for this production-ready site and its existing Vercel project context.

