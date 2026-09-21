# Care Corner Associate (Programme) Profile Design

## Purpose

Replace the existing SUSS application homepage with an interview-focused profile for John Tan's application to the Care Corner Singapore Associate (Programme), Active Ageing Centre role (JR-00199).

The page has one job: help a Care Corner hiring manager quickly see John as a credible, low-risk candidate who already understands active-ageing programme delivery and adds unusually strong operational, stakeholder, documentation, and technology depth.

## Audience and Source of Truth

The primary audience is the Care Corner hiring team. Content must remain consistent with:

- `docs/superpowers/docs-care-corner/care-corner-program-associate.txt`.
- `docs/superpowers/docs-care-corner/John_Tan_Resume_CareCorner_Associate_Programme.pdf`.
- `docs/superpowers/docs-care-corner/John_Tan_CoverLetter_CareCorner_Associate_Programme.pdf`.
- Care Corner's official Active Ageing Centre information.
- Care Corner's official Associate (Programme), Active Ageing Centre posting, JR-00199.

The site may state that John is fluent in English and conversational in Mandarin and Cantonese. It must not invent programme outcomes, participation counts, door-knocking experience, clinical expertise, or stronger language proficiency.

## Success Criteria

Within the first desktop viewport, a hiring manager can identify:

- John Tan and the exact target role.
- Care Corner Singapore and Active Ageing Centre context.
- John's current hands-on NTUC Health AAC experience.
- His deliberate transition into social service.
- His confirmed language capability.
- Clear email, phone, LinkedIn, resume, and cover-letter actions.

The complete page must:

- Map Care Corner's responsibilities to verified evidence.
- Lead with senior-facing and AAC experience before earlier corporate roles.
- Explain how management and software delivery skills transfer to programme operations.
- Provide a useful, keyboard-accessible evidence search and category filters.
- Remain accessible and responsive from 320-pixel mobile screens through wide desktop layouts.
- Respect reduced-motion preferences.
- Pass the repository's unit, accessibility, style, build, and browser smoke checks.
- Remain deployable as the existing static Vite application.

## Architecture

Keep the existing React 19, Vite, TypeScript, Motion, Vitest, Testing Library, and static Vercel architecture. Add no dependencies, backend, database, analytics, or contact form.

Maintain the existing separation:

- `src/data/profile.ts` owns typed profile, evidence, experience, credential, language, and programme-domain content.
- `src/App.tsx` composes the semantic page and owns only page-level search/filter state.
- `src/components` contains reusable navigation, contact, surface, heading, and programme-pathway components.
- `src/styles.css` owns the token system, responsive layout, interaction states, and motion safeguards.

Resume and cover-letter PDFs are copied into `public/docs` with stable descriptive filenames. The Care Corner logo may appear only as contextual employer identification and must remain visually subordinate to John's identity. If a suitable official local logo asset is unavailable, use a carefully typeset text label rather than reconstructing or hotlinking the mark.

## Information Architecture

### Header

Use a compact sticky glass header with John Tan's identity, short section navigation, contact action, and accessible mobile menu. The navigation links to Role fit, Five domains, Evidence, Experience, and Credentials.

### Hero

Lead with the thesis:

> Programmes that help seniors stay active, connected, and seen.

Identify the page as an application for Associate (Programme), Active Ageing Centre at Care Corner Singapore. Summarise current NTUC Health AAC experience, social-service studies, and mature operating depth. Show “English fluent; Mandarin and Cantonese conversational” in a visible proof label.

Provide email, phone, LinkedIn, resume, and cover-letter actions. A contextual application card summarises the role, current practice, and social-service direction without unsupported scores or statistics.

### Role-Fit Snapshot

Show five recruiter-scannable evidence cards:

1. Programme delivery across active-ageing domains.
2. Community outreach and senior engagement readiness.
3. Volunteer and community-partner coordination.
4. Accurate attendance, activity, and feedback records.
5. Safe, organised, welcoming centre operations.

Each card contains one concise responsibility statement and one verified proof point. Outreach wording must distinguish supported readiness and partner-facing experience from unverified door-knocking claims.

### Five-Domain Programme Board

Present Physical, Intellectual, Emotional, Social, and Vocational as a cohesive programme board. Map each domain to relevant current AAC practice or credible delivery capability. Do not imply that every listed example has already been independently led by John when the source only supports assistance or facilitation.

### Community Evidence Finder

Provide a local text search and category chips for Programme, Outreach, Volunteers, Administration, and Operations.

- Search matches titles, summaries, evidence, and category terms.
- Category filters are mutually exclusive, with an All option.
- Filtering updates a visible result count.
- An empty result explains that no evidence matches and provides a Reset search button.
- Search and filters are usable by keyboard and assistive technology.
- No query or user data leaves the browser.

### Programme-Day Pathway

Show a five-stage operational sequence:

1. Prepare — confirm purpose, participants, space, materials, and partners.
2. Welcome — create a warm environment and build rapport with seniors.
3. Facilitate — support activities, workshops, volunteers, and changing needs.
4. Record — capture attendance, feedback, actions, and follow-up accurately.
5. Improve — use observations and feedback to strengthen the next programme.

The pathway must remain understandable without animation or hover.

### Transferable Operating Depth

Place earlier experience after direct AAC evidence:

- ST Engineering: full lifecycle delivery, structured documentation, cross-functional requirements, implementation discipline, reports, and dependable follow-through.
- Banking leadership: stakeholder trust, time management, operational accuracy, new initiatives, compliance-minded judgement, and calm execution.

Describe these as transferable strengths, not substitutes for social-service practice.

### Credentials and Languages

Feature the Diploma in Social Service at Hua Mei Training Academy, Tsao Foundation, followed by the MBA from NTU and Bachelor of Science from NUS with PSC Scholarship. Include Microsoft Office and relevant digital/documentation capability.

Publish the exact language statement:

> English fluent; Mandarin and Cantonese conversational.

### Contact Close

End with a direct invitation to discuss John's contribution to Care Corner's Active Ageing Centre team. Repeat email, phone, LinkedIn, resume, and cover-letter actions.

## Visual System

The approved direction is **Neighbourhood Programme Desk**: warm, organised, human, and operational.

### Palette

- Care navy: `#14284B`.
- Care crimson: `#C8102E`.
- Neighbourhood aqua: `#A9DDE2`.
- Activity lilac: `#CEC8EA`.
- Canvas mist: `#F4F7F8`.
- Ink: `#172233`.

Use pale adjacent-colour gradients and quiet translucent surfaces. Crimson is reserved for actions, progress, and critical emphasis. Glassmorphism is selective: sticky navigation, the hero application card, and the evidence finder.

### Typography

Use a rounded, characterful system display stack for the hero and section theses, a highly legible humanist sans-serif body stack, and compact uppercase utility labels for operational metadata. Avoid loading external fonts or adding font packages.

### Layout and Signature

The page uses generous editorial spacing around compact operational modules. The signature element is a continuous “programme day” ribbon that passes through the hero application card and reappears as the Prepare → Welcome → Facilitate → Record → Improve pathway.

The ribbon represents real centre work and is the only expressive visual device. Cards, rules, labels, and filters stay disciplined so the result does not feel like a generic dashboard.

## Motion and Interaction

Concentrate motion in:

- One calm hero entrance.
- The programme-day ribbon/pathway reveal.
- Short search-result transitions and restrained card hover/focus feedback.

Use Motion's reduced-motion hook and CSS `prefers-reduced-motion`. Reduced-motion users receive immediate static content, no smooth scrolling, and no ambient or route-drawing animation.

## Accessibility and Responsive Behaviour

- Use semantic header, navigation, main, section, article, form/search, list, and footer elements.
- Give every major section a visible heading and accessible name.
- Preserve the skip link and strong visible focus indicators.
- Keep controls at practical touch sizes and avoid hover-only content.
- Maintain WCAG AA text contrast against actual translucent backgrounds.
- Expose accurate mobile navigation names and `aria-expanded` state.
- Give search results and counts clear assistive-technology semantics without noisy announcements.
- Prevent horizontal overflow at 320 CSS pixels.
- Reflow the hero, role cards, filters, pathway, timeline, and credentials for mobile.

## Error and Empty States

The static page has no runtime network data. The primary interactive empty state occurs when evidence search has no matches. It must:

- State that no evidence matches the current search.
- Keep the entered query visible.
- Offer a Reset search action.

Static asset tests verify the referenced resume and cover-letter files exist. Broken or unavailable employer artwork must fall back to a text label, not an invented logo.

## Testing and Verification

Use focused tests for:

- Exact Care Corner organisation and Associate (Programme), Active Ageing Centre role.
- The approved hero thesis and language statement.
- All five role-fit areas and five active-ageing domains.
- Verified NTUC Health AAC, partner, volunteer, record-keeping, and centre-operation evidence.
- Evidence search, category filtering, count updates, empty state, and reset.
- Email, phone, LinkedIn, resume, and cover-letter actions.
- Semantic landmarks, accessible section names, skip link, and mobile navigation.
- Care Corner visual tokens, glass treatments, responsive breakpoints, focus states, and reduced-motion rules.
- Removal of SUSS-specific content, assets, metadata, tests, and download paths.
- Static asset existence and Vercel-compatible output.

Final verification runs:

1. `npm run test:run`
2. `npm run build`
3. A clean production preview.
4. Desktop and mobile browser smoke paths.
5. Navigation, evidence search, category filters, reset, mobile menu, downloads, focus visibility, console errors, and horizontal overflow checks.
6. Final desktop and mobile screenshots saved under `output/playwright`.

Deployment is not considered verified until the production URL loads and the same core smoke checks pass. The Vercel CLI is not currently installed, so production deployment requires installing it or using the connected deployment tooling.

## Delivery Boundaries

- Replace the SUSS homepage rather than adding a second route.
- Do not add dependencies, external services, tracking, schemas, APIs, or a contact form.
- Do not submit an application or contact Care Corner.
- Do not claim Care Corner endorsement or employment.
- Do not invent metrics, programme outcomes, clinical duties, or door-knocking experience.
- Do not overstate Mandarin or Cantonese beyond conversational.
- Do not let banking or technology dominate the narrative.
- Do not use stock imagery, an AI-generated portrait, or a reconstructed Care Corner logo.
- Preserve the existing Vite deployment contract unless a verified build issue requires a minimal correction.
