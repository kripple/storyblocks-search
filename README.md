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

## Assumptions

- **Keywords have no special characters**: Stripped the search input value of everything but letters, numbers, and spaces.

## Trade-offs

- **Regular `<img>` tags instead of Next.js `Image` component**: Used standard HTML img elements to avoid the complexity of configuring remote image domains for external APIs. This simplifies development at the cost of Next.js image optimizations.
- **Images only**: Focused on the images endpoint to reduce scope. The Storyblocks API also supports video and audio endpoints, but implementing multiple content types would add complexity in both the API integration and UI components.
- **No deployment setup**: Kept the project local-only to focus on core functionality within the timeboxed scope. While the app could be deployed to platforms like Vercel or Netlify, setting up deployment pipelines and environment variable management would add complexity.
- **Simple hardcoded mocks instead of MSW**: Used hardcoded conditional mocking rather than a more robust tool like Mock Service Worker (MSW) due to time constraints. MSW would provide better test isolation and more maintainable mocks for a production application.
- **Single page results only**: To limit scope, the app fetches and displays only the first page of up to 20 search results.
- **Dynamic user ID generation**: For simplicity, requests randomly generate a user_id.
- **Keywords only**: The Storyblocks API supports a number of filters and advanced search options, but this application only performs a keyword search with default sorting.
- **Single endpoint implementation**: Used only the images `search` endpoint to reduce project complexity and stay within scope. While the Storyblocks API offers separate endpoints for asset details, implementing both search and details endpoints would have required additional API route setup, error handling, and state management.

## Tools & Technologies

- Frontend framework: Next.js 15 + App Router
- Programming language: TypeScript
- UI/Design: daisyUI
- Testing: Playwright
- AI: Claude (for project structure and development)

## Demo

![App Demo](demo.gif)

The application demonstrates:

- **Image Search**: Search Storyblocks' image library using keywords
- **Responsive Grid**: Dynamically sized image cards that adapt to screen size while maintaining aspect ratios
- **Full-Screen Preview**: Click any image to view a full-screen preview with title
- **Loading States**: Visual feedback during search operations
- **Error Handling**: Graceful handling of API errors and empty results
- **Input Sanitization**: Automatically filters special characters from search queries

To run the app locally, follow the Getting Started instructions above.
