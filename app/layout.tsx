import type { Metadata, Viewport } from 'next'
import { Cairo, IBM_Plex_Sans_Arabic } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Nyova',
  description: 'Nyova — download the app, share your feedback, and join our community on Discord.',
  generator: 'v0.app',
  icons: {
    icon: '/nyova-icon.png',
    shortcut: '/nyova-icon.png',
    apple: '/nyova-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#5865F2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className={`dark ${cairo.variable} ${plexArabic.variable}`}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1993476341545713"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
