# Storyblocks Search

A simple search interface for the Storyblocks API built with Next.js 15 and TypeScript.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Storyblocks API credentials from https://developer.storyblocks.com/register

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Assumptions & Trade-offs

- **Regular `<img>` tags instead of Next.js `Image` component**: Used standard HTML img elements to avoid the complexity of configuring remote image domains for external APIs. This simplifies deployment and works reliably with unknown image sources, though it foregoes Next.js image optimizations.
- **Images only**: Focused on the images endpoint to reduce scope. The Storyblocks API also supports video and audio endpoints, but implementing multiple content types would add complexity in both the API integration and UI components.

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- React 18
- daisyUI

## AI Tools Used

- Claude for project structure and development
