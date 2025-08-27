import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Storyblocks Search',
  description: 'Search and discover assets',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
