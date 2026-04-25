import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Samiran Das - YouTube Packaging Specialist',
  description:
    'I help creators and brands package videos with stronger thumbnails and titles that drive better clicks.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="site">{children}</div>
      </body>
    </html>
  );
}
