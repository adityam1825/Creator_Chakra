
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Creator Chakra | AI Creator Operating System',
  description: 'The AI-powered creator platform that tells you exactly what to create, how to perform it, when to post it, and how to make it go viral.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-background text-foreground selection:bg-purple-100 selection:text-purple-700 overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
