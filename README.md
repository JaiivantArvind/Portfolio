# Jaiivant Arvind — Portfolio

A single-page portfolio built with React 19, TypeScript, Vite, Tailwind CSS v4 and Framer Motion.

It shows selected projects with architecture breakdowns, a searchable skill matrix, experience and
education, a résumé preview (print or download), and a contact form.

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

On Windows, `start.bat` installs dependencies if needed and starts the dev server.

## Scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Development server with hot reload            |
| `npm run build`   | Type-check and produce the production build   |
| `npm run preview` | Serve the production build locally            |
| `npm run lint`    | ESLint over the source                        |

## Where the content lives

All visible content is in `src/data/`:

- `resume.ts`: name, role, contact details, project cards, experience, education
- `projectDetails.ts`: the deep-dive pages (architecture, challenges, metrics)
- `techMatrixData.ts`: the skill matrix and the project links for each skill

Project links to GitHub repositories and live demos are optional: add `github` or `demoUrl`
to an entry in `projectDetails.ts` and the buttons appear automatically.

## Accessibility and performance notes

- Keyboard: all project, skill and filter controls are buttons; modals trap focus and return it on close.
- Motion: respects the operating-system "reduce motion" setting. The cursor text effect is only
  enabled on fine-pointer devices.
- Fonts are self-hosted (`@fontsource`); no third-party requests are made on page load.
- Contrast: secondary text meets WCAG AA.

## Project layout

```
src/
  components/   page sections, modals, command palette, Asciify effect
  data/         all content (see above)
  lib/          shared logic (skill-to-project matching)
  utils/        toast helper
public/         favicon, background image, social-share image, résumé PDF
docs/plan.md    working notes from development
```
