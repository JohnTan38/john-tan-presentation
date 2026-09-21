import type { Metadata, Viewport } from 'next'
import { Edu_QLD_Beginner, Urbanist } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'

const siteUrl = 'https://john-tan-presentation.vercel.app'

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-urbanist',
})

const humanAccent = Edu_QLD_Beginner({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-human-accent',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'John Tan | Selarang Halfway House Case Manager',
    template: '%s | John Tan',
  },
  description:
    'John Tan’s professional profile and case management portfolio for the Case Manager position at Selarang Halfway House (Yellow Ribbon Industries / Yellow Ribbon Singapore). Currently pursuing Graduate Diploma in Social Work at SUSS.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'John Tan | Selarang Halfway House Case Manager',
    description:
      'Grounded social work practice (SUSS), active community casework, and executive operating depth dedicated to the rehabilitation and reintegration of Selarang Halfway House residents.',
    siteName: 'John Tan — Selarang Halfway House Case Manager Profile',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'John Tan Selarang Halfway House Case Manager Application Profile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Tan | Selarang Halfway House Case Manager',
    description: 'Guiding Reintegration with Empathy, Structure, and Purpose.',
    images: ['/opengraph-image'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F59E0B',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${humanAccent.variable}`}>
      <body>{children}</body>
    </html>
  )
}
