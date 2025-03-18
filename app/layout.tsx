import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Omnigo - Votre copilote stratégique vers la réussite",
  description:
    "Omnigo vous guide efficacement et durablement vers vos objectifs commerciaux et marketing grâce à l'analyse de données, l'automatisation et l'intelligence artificielle.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="light" style={{ colorScheme: "light" }}>
      <body className={`${inter.className} omnigo-light-theme`}>
        {children}
      </body>
    </html>
  )
}



import './globals.css'