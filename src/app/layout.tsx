import type { Metadata } from 'next';

import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Storyblocks Search',
  description: 'Search and discover assets',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="cmyk">
      <body className="bg-base-200 text-base-content min-h-screen p-1 sm:p-2 md:p-4">
        {children}
      </body>
    </html>
  );
}
