import type { Metadata, Viewport } from 'next'
import { Cairo, IBM_Plex_Sans_Arabic } from 'next/font/google'
import Script from 'next/script'
import { CookieConsentBanner } from '@/components/cookie-consent'
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
  description: 'Nyova — download the Executor, share your feedback, and join our community on Discord.',
  generator: 'v0.app',
  icons: {
    icon: '/nyova-icon.png',
    shortcut: '/nyova-icon.png',
    apple: '/nyova-icon.png',
  },
  other: {
    'google-adsense-account': 'ca-pub-1993476341545713',
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
        {/* Google Consent Mode: ads/analytics storage default to "denied"
            until the visitor accepts cookies in the banner below. This must
            run before the AdSense script so Google respects the default. */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
            });
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1993476341545713"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-background font-sans antialiased">
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  )
}
