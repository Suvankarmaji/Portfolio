import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const description =
  'Portfolio of Suvankar Maji, AI/ML and Data Science student at VIT Vellore: machine learning, deep learning, generative AI (LLMs, RAG) and full-stack projects with React and FastAPI.'

export const metadata: Metadata = {
  title: 'Suvankar Maji | AI/ML & Data Science Portfolio',
  description,
  authors: [{ name: 'Suvankar Maji' }],
  keywords: [
    'Suvankar Maji',
    'AI/ML',
    'Data Science',
    'Machine Learning',
    'Generative AI',
    'RAG',
    'React',
    'FastAPI',
    'VIT Vellore',
    'Portfolio',
  ],
  openGraph: {
    title: 'Suvankar Maji | AI/ML & Data Science Portfolio',
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Suvankar Maji | AI/ML & Data Science Portfolio',
    description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
