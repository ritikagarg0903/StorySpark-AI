# StorySpark AI

An adaptive English reading game for young learners, built for the Nerdy AI Hackathon. Children explore illustrated stories, learn vocabulary through spaced retrieval, answer contextual comprehension questions, switch character perspectives, and receive a personalized next story plus a grown-up recap.

## Current mode

The app runs in **free development mode**. AI interactions use reviewed local content with realistic loading and fallback behavior. No API key or external request is required.

## Features

- Three illustrated story worlds across three difficulty levels
- Tap-to-learn vocabulary and explicit word mastery
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

## Future live AI mode

The live implementation will keep API calls server-side and use an environment variable named `OPENAI_API_KEY`. It will preserve all reviewed local fallbacks and never send a learner's name or unrestricted child-authored text to the model.

## Privacy

No account is required. The learner's display name and progress live only in React memory and disappear when the page is refreshed or closed.
