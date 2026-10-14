import type { Metadata, Viewport } from 'next'
import { Newsreader, Public_Sans } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'

const siteUrl = 'https://john-tan-profile.vercel.app'

const serif = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

const sans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const title = 'John Tan | SUSS Social Work Practicum Candidate'
const description =
  'John Tan’s practicum profile for SUSS SWK512 Social Work Practicum and Field Seminar: learning objectives for six competencies, work assignments, a 400-hour schedule, evaluation and supervision plans.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | John Tan' },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title,
    description,
    siteName: 'John Tan, social work practicum profile',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'John Tan, SUSS social work practicum candidate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'A 400-hour practicum, planned so that every hour teaches something.',
    images: ['/opengraph-image'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F2A47',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
