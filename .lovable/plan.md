
Add a concise, high-impact statement to the Intentional Leader page that reinforces the course's origin and adaptive nature.

## What I'll add

A new bold callout/quote block with this message:

> "We've taken everything from hundreds of hours of podcast interviews and production and distilled it into one easy-to-follow course that builds itself around you — that you can implement on day one."

## Where it goes

Inside `src/routes/intentional-leader.tsx`, placed at the top of the **HOW IT WORKS** section (right above the 4-card feature grid that contains Podcast-Driven, 5-Minute Friday, Adaptive AI, and Conversational Guidebook). This is the natural home because the statement frames *how* the course was built and *how* it works — it sets up the four feature cards that follow.

## Visual treatment

- Centered, max-width container so the line breathes
- Large Playfair display serif (matches existing section headers)
- A short accent rule above and the phrase **"built itself around you"** and **"day one"** highlighted in the existing deep green brand color (`hsl(var(--ial-green-deep))`)
- Subtle fade/slide-in on scroll to match the rest of the page's motion language
- No new dependencies, no layout shifts to surrounding sections

## Tracking

Tag the wrapper with `data-track-section="how_it_works_intro"` so the existing `usePageAnalytics` hook automatically records when visitors read it (section visibility event). No new tracking code required.

## Files touched

- `src/routes/intentional-leader.tsx` — insert one new block at the top of the How It Works section
