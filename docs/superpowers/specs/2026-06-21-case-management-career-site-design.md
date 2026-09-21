# Case Management Career Site Design

## Purpose

Rebuild John Tan's presentation as a recruiter-friendly career website focused on securing an Assistant Program Facilitator position at 365 Cancer Prevention Society. The page must communicate empathy, structured case support, programme delivery, community engagement, and a credible mid-career transition from technology and finance into social services.

## Audience And Success Criteria

The primary audience is the 365 Cancer Prevention Society hiring team. A visitor should understand within the first screen which role John is pursuing, why his background is relevant, and how to contact him. The complete page must remain easy to scan on desktop and mobile, work with keyboard navigation, respect reduced-motion preferences, and build as a static Vercel deployment.

## Architecture

Use a Vite React application with TypeScript and Framer Motion. Content lives in typed data structures, while focused components render navigation, reusable glass cards, career history, credentials, and contact actions. CSS provides the visual system and responsive behavior without adding a component framework.

The existing full-screen slide deck is replaced by one semantic scrolling document. This improves recruiter scanning, mobile usability, deep linking through section anchors, accessibility, and search indexing.

## Content Structure

1. Sticky navigation with section links and a direct contact action.
2. Hero identifying John, the target Assistant Program Facilitator role, the 365 Cancer Prevention Society context, and his transition into social care.
3. Role-alignment section mapping experience to client support, programme delivery, documentation, and stakeholder coordination.
4. Social-impact section featuring the supplied `john-tan-tech-social.png` infographic and senior engagement, active ageing, befriending, buddying, cognitive mentorship, and community outreach.
5. A case-support pathway showing listen and assess, coordinate care, follow through, and learn and improve. It describes transferable operating discipline without claiming unverified clinical case-management experience.
6. Career journey updated to show Program Associate, NTUC Health AAC, from June 2026 to present; Software Engineer (Generative AI), ST Engineering, from January 2019 to December 2025; and the remaining finance roles.
7. Expertise reframed from technical expertise to social impact, connecting structured thinking, data stewardship, communication, and programme evaluation to service delivery.
8. Credentials including the Diploma in Social Service from Hua Mei Training Academy, Tsao Foundation, January to June 2026, alongside existing academic and professional qualifications.
9. Closing contact section with working email, phone, LinkedIn, and website links.

## Visual System

The direction is called **Care Continuum**. A flowing green line and connected waypoint language express consistent follow-through across assessment, referrals, programmes, and community support.

- Canvas: `#F4FBF5` soft mint white.
- Surface: translucent `rgba(255, 255, 255, 0.72)` frosted glass.
- Primary: `#167A5B` care green.
- Secondary: `#4FAF79` active green.
- Accent: `#B9E769` optimistic lime used sparingly.
- Ink: `#16352C` deep green-black.
- Muted: `#5D746C` supporting copy.
- Display type: Fraunces for warm, human emphasis.
- Body and utility type: Manrope for clarity and compact labels.

Cards use background blur, thin white borders, and soft shadows. Hover raises applicable tiles by four pixels. Motion is concentrated in the hero path and section reveals, with all nonessential movement disabled for reduced-motion users.

## Interaction And Accessibility

- Sticky section navigation scrolls to semantic landmarks and collapses into an accessible mobile menu.
- Email, telephone, LinkedIn, and website controls use real links rather than scripted substitutes.
- All buttons expose visible focus states and meaningful accessible names.
- The infographic has useful alternative text and remains zoomable through a link to the source image.
- Motion uses transform and opacity, avoids layout thrashing, and respects `prefers-reduced-motion`.
- Content remains usable without hover and at viewport widths down to 320 pixels.

## Testing And Deployment

Vitest and Testing Library cover required content, navigation, mobile-menu behavior, accessible links, and the amendment requirements. Browser smoke checks cover desktop and mobile layouts, all controls, section navigation, console errors, image loading, and horizontal overflow. `npm run build`, `npm start`, and `npm run dev` must work. Vercel serves the Vite `dist` output with SPA fallback and security headers. `.vercel` remains ignored because it contains local linkage metadata.

## Boundaries

The page will not claim employment, clinical credentials, oncology expertise, or case-management outcomes not present in the supplied material. It will not use 365 Cancer Prevention Society or NTUC Health logos in a way that implies endorsement. No backend, database, analytics, contact form, or new cloud service is required.
