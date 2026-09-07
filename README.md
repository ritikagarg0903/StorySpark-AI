# StorySpark AI

An adaptive English reading game for readers ages 9–13, built for the Nerdy AI Hackathon. Learners investigate illustrated, five-chapter stories, build vocabulary through spaced retrieval, answer page-grounded comprehension questions, switch character perspectives, and receive a personalized next story plus a grown-up recap.

## Current mode

The app runs in **free development mode**. AI interactions use reviewed local content with realistic loading and fallback behavior. No API key or external request is required.

## Features

- Three illustrated, five-chapter story worlds across Explorer, Pathfinder, and Trailblazer levels
- Tap **any word** for a context-aware meaning; highlighted learning words also include mastery checks
- Spaced vocabulary retrieval through later stories
- “Prove It” contextual comprehension questions
- “You're the Villain Now!” perspective challenge
- Fix-the-mistake and what-if comprehension activities
- Transparent adaptive story selection
- Personalized next-story simulation
- Actionable grown-up recap
- Session-only name with no persistent storage
- Responsive and reduced-motion-friendly interface

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The `dist` directory can be deployed directly to Vercel or Netlify.

## Gemini live mode

Two Vercel server functions are included:

- `/api/define-word` returns an age-appropriate meaning based on the visible sentence.
- `/api/generate-story` creates a validated five-page story with vocabulary and comprehension activities.

Add `GEMINI_API_KEY` in **Vercel → Project Settings → Environment Variables**, then redeploy. Optionally set `GEMINI_MODEL`; the default is `gemini-3.7-flash`. Never place the key in frontend code or commit it to GitHub.

If Gemini is unavailable, reviewed local stories remain usable. The learner's display name is never sent to Gemini.

## Privacy

No account is required. The learner's display name and progress live only in React memory and disappear when the page is refreshed or closed.
