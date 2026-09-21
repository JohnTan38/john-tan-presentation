# Case Management Career Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build and verify a production-ready React career site targeted at the Assistant Program Facilitator role at 365 Cancer Prevention Society.

**Architecture:** Replace the single-file slide deck with a Vite React TypeScript application. Keep content in typed data, compose the page from focused sections, animate with Framer Motion, and deploy the generated `dist` directory as a static Vercel application.

**Tech Stack:** React 19, TypeScript, Vite, Framer Motion, Vitest, Testing Library, CSS.

## Global Constraints

- Use the exact target title `Assistant Program Facilitator`.
- Incorporate every item in the amendment section of `public/docs/case-management-executive.txt`.
- Use `public/images/john-tan-tech-social.png` as the supplied infographic.
- Use light green hues, gradients, glassmorphism, smooth motion, and subtle hover elevation.
- Do not make unsupported claims about oncology or clinical case-management experience.
- Support keyboard access, reduced motion, mobile through desktop, and static Vercel deployment.
- Preserve `.vercel` in `.gitignore`; do not commit local Vercel linkage metadata.

---

### Task 1: Scaffold And Content Contract

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `src/data/profile.ts`
- Create: `tests/profile.test.ts`
- Modify: `.gitignore`, `vercel.json`

**Interfaces:**
- Produces: typed exports `profile`, `roleFit`, `career`, `credentials`, and `casePathway` for presentation components.

- [x] Write `tests/profile.test.ts` asserting the target title, 365 Cancer Prevention Society, all amendment dates and organisations, senior engagement terminology, and absence of youth-focused copy.
- [x] Run `npm test -- --run tests/profile.test.ts` and verify it fails because `src/data/profile.ts` does not exist.
- [x] Add the package scripts and configuration, install approved dependencies, and implement the minimal typed content exports.
- [x] Re-run the focused test and confirm it passes.

### Task 2: Semantic Page And Interactions

**Files:**
- Create: `src/main.tsx`, `src/App.tsx`, `src/components/Header.tsx`, `src/components/SectionHeading.tsx`, `src/components/GlassCard.tsx`, `src/components/ContactLinks.tsx`
- Create: `tests/App.test.tsx`, `tests/setup.ts`
- Modify: `index.html`

**Interfaces:**
- Consumes: typed data exports from `src/data/profile.ts`.
- Produces: section anchors `top`, `fit`, `impact`, `approach`, `journey`, `credentials`, and `contact`; mobile-menu button named `Open navigation` or `Close navigation`.

- [x] Write component tests asserting all semantic landmarks, working contact protocols, navigation targets, menu behavior, infographic alt text, and no missing amendment content.
- [x] Run the App test and verify it fails because the new React entry points do not exist.
- [x] Implement the semantic component tree and accessible interactions with Framer Motion.
- [x] Re-run the App test and confirm it passes.

### Task 3: Care Continuum Visual System

**Files:**
- Create: `src/styles.css`
- Modify: `src/App.tsx`, `src/components/Header.tsx`

**Interfaces:**
- Consumes: the semantic class names and section IDs from Task 2.
- Produces: responsive layouts at 320, 768, and 1440 pixels; visible focus; reduced-motion overrides; glass-card hover elevation.

- [x] Add a static CSS contract test checking the required design tokens, responsive breakpoints, focus visibility, hover elevation, and reduced-motion rule.
- [x] Run the contract test and verify it fails because `src/styles.css` does not exist.
- [x] Implement the Care Continuum tokens, typography, layered gradients, frosted surfaces, responsive grids, and motion safeguards.
- [x] Re-run all unit tests and confirm they pass.

### Task 4: Production And Browser Verification

**Files:**
- Modify as needed: application and deployment files identified by failing checks.

**Interfaces:**
- Consumes: the complete application.
- Produces: validated `dist` output and browser-tested user flows.

- [x] Run `npm test -- --run`, `npm run build`, and a clean `npm start` smoke check.
- [x] Start the development server and inspect desktop and mobile renders in a real browser.
- [x] Exercise every navigation and contact control; confirm the image loads, section links resolve, mobile navigation opens and closes, keyboard focus works, and the console has no errors.
- [x] Review the final React code for component structure, hooks, accessibility, TypeScript safety, and avoidable bundle weight.
- [x] Audit every objective requirement against current files and runtime evidence, then report any environmental limitations accurately.
