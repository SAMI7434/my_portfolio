import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Samiran Das',
  description: 'Portfolio site for Samiran Das',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
