import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Accountability Manual',
  description:
    'Practical lessons on consent, boundaries, bystander intervention, and how to actively practise respect in everyday life. For everyone.',
  keywords: [
    'consent',
    'boundaries',
    'bystander intervention',
    'gender equality',
    'women safety India',
    'accountability',
    'respect',
  ],
  authors: [{ name: 'The Accountability Manual' }],
  openGraph: {
    title: 'The Accountability Manual',
    description:
      'A practical guide on consent, boundaries, and being a better human in everyday situations.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Accountability Manual',
    description: 'Practical lessons on consent, respect, and bystander intervention.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#202020',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
